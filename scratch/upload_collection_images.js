const fs = require('fs');
const path = require('path');

const configPath = path.join(process.env.APPDATA, 'shopify-cli-kit-nodejs', 'Config', 'config.json');
const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const sess = JSON.parse(cfg.sessionStore);
const appKey = Object.keys(sess['accounts.shopify.com']['94d0c903-ccf1-4488-8d2d-fadf16dc3c03'].applications).find(k => k.includes('mavoraa'));
const token = sess['accounts.shopify.com']['94d0c903-ccf1-4488-8d2d-fadf16dc3c03'].applications[appKey].accessToken;

async function gql(query, variables = {}) {
  const res = await fetch('https://mavoraa-q1i1jp5q.myshopify.com/admin/api/2024-10/graphql.json', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  return await res.json();
}

async function uploadAndSetImage(collectionId, filename, localPath, altText) {
  console.log(`Starting upload for ${filename} to ${collectionId}...`);
  // 1. Staged upload create
  const stageRes = await gql(`
    mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
      stagedUploadsCreate(input: $input) {
        stagedTargets {
          url
          resourceUrl
          parameters {
            name
            value
          }
        }
        userErrors { field message }
      }
    }
  `, {
    input: [{
      resource: "COLLECTION_IMAGE",
      filename: filename,
      mimeType: "image/jpeg",
      httpMethod: "POST"
    }]
  });

  const target = stageRes.data.stagedUploadsCreate.stagedTargets[0];
  if (!target) {
    throw new Error("No target returned: " + JSON.stringify(stageRes));
  }

  const keyParam = target.parameters.find(p => p.name === 'key').value;
  const fullUrl = target.url + keyParam;
  console.log("Full staged URL:", fullUrl);

  // 2. Upload to GCS using FormData
  const fileBytes = fs.readFileSync(localPath);
  const formData = new FormData();
  for (const p of target.parameters) {
    formData.append(p.name, p.value);
  }
  const blob = new Blob([fileBytes], { type: "image/jpeg" });
  formData.append("file", blob, filename);

  const uploadRes = await fetch(target.url, {
    method: "POST",
    body: formData
  });

  console.log(`Upload status for ${filename}:`, uploadRes.status);
  if (uploadRes.status !== 201 && uploadRes.status !== 200 && uploadRes.status !== 204) {
    const txt = await uploadRes.text();
    throw new Error(`Upload failed: ${uploadRes.status} ${txt}`);
  }

  // 3. Update collection image
  const updateRes = await gql(`
    mutation collectionUpdate($input: CollectionInput!) {
      collectionUpdate(input: $input) {
        collection {
          id
          title
          image {
            url
            altText
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `, {
    input: {
      id: collectionId,
      image: {
        src: fullUrl,
        altText: altText
      }
    }
  });

  console.log("Collection update result:", JSON.stringify(updateRes, null, 2));
  return updateRes;
}

async function updateAllCollections() {
  const collectionsData = [
    {
      id: "gid://shopify/Collection/343796973758",
      filename: "shopify-col-wellness.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-wellness.jpg"),
      altText: "Health & Wellness"
    },
    {
      id: "gid://shopify/Collection/343787569342",
      filename: "shopify-col-beauty.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-beauty.jpg"),
      altText: "Beauty & Personal Care"
    },
    {
      id: "gid://shopify/Collection/343797006526",
      filename: "shopify-col-kitchen.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-kitchen.jpg"),
      altText: "Home & Kitchen"
    },
    {
      id: "gid://shopify/Collection/343797039294",
      filename: "shopify-col-tech.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-tech.jpg"),
      altText: "Smart Tech & Gadgets"
    },
    {
      id: "gid://shopify/Collection/343797072062",
      filename: "shopify-col-pet.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-pet.jpg"),
      altText: "Pet Essentials"
    },
    {
      id: "gid://shopify/Collection/343797104830",
      filename: "shopify-col-baby.jpg",
      localPath: path.join(__dirname, "../assets/shopify-col-baby.jpg"),
      altText: "Baby, Kids & Toys"
    }
  ];

  for (const item of collectionsData) {
    try {
      await uploadAndSetImage(item.id, item.filename, item.localPath, item.altText);
      console.log(`Successfully updated ${item.altText}`);
    } catch (e) {
      console.error(`Failed to update ${item.altText}:`, e);
    }
  }
}

updateAllCollections().catch(console.error);

