async function test() {
  const r = await fetch("https://mavoraa-q1i1jp5q.myshopify.com/collections/health-wellness");
  console.log("Status:", r.status);
  const text = await r.text();
  console.log("Title in HTML:", text.match(/<title>([^<]*)<\/title>/)?.[1]);
}
test();
