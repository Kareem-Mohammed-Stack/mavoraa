const fs = require("fs");
const path = require("path");

const configPath = path.join(process.env.APPDATA, "shopify-cli-kit-nodejs", "Config", "config.json");
const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
const sess = JSON.parse(cfg.sessionStore);
const appKey = Object.keys(sess["accounts.shopify.com"]["94d0c903-ccf1-4488-8d2d-fadf16dc3c03"].applications).find(k => k.includes("mavoraa"));
const token = sess["accounts.shopify.com"]["94d0c903-ccf1-4488-8d2d-fadf16dc3c03"].applications[appKey].accessToken;

async function gql(query, variables = {}) {
  const res = await fetch("https://mavoraa-q1i1jp5q.myshopify.com/admin/api/2024-10/graphql.json", {
    method: "POST",
    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables })
  });
  return await res.json();
}

async function main() {
  const res = await gql(`{
    __type(name: "Mutation") {
      fields {
        name
        args {
          name
          type { name kind ofType { name kind } }
        }
      }
    }
  }`);
  const match = res.data.__type.fields.find(f => f.name === "collectionBulkPublish");
  console.log(JSON.stringify(match, null, 2));
}

main().catch(console.error);
