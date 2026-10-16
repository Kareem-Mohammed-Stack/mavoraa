async function testAll() {
  const handles = [
    "health-wellness",
    "beauty-personal-care",
    "home-kitchen",
    "smart-tech-gadgets",
    "pet-essentials",
    "baby-kids-toys"
  ];
  for (const h of handles) {
    const url = `https://mavoraa-q1i1jp5q.myshopify.com/collections/${h}`;
    const r = await fetch(url);
    console.log(`${h}: status ${r.status}`);
  }
}
testAll();
