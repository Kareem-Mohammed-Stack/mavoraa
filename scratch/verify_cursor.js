const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const repoDir = 'C:\\Users\\zezos\\OneDrive\\Desktop\\orca\\Mavoraa';

const cssBase = fs.readFileSync(path.join(repoDir, 'assets', 'base.css'), 'utf8');
const cssCollections = fs.readFileSync(path.join(repoDir, 'assets', 'orca-collections.css'), 'utf8');

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    ${cssBase}
    ${cssCollections}
  </style>
</head>
<body>
  <div class="orca-cats">
    <a href="/collections/test" class="orca-cat-card" id="test-card">
      <span class="orca-cat-card__scene" id="test-scene"></span>
      <span class="orca-cat-card__overlay" id="test-overlay"></span>
      <span class="orca-cat-card__stage" id="test-stage">
        <span class="orca-cat-card__product orca-cat-card__product--wellness" id="test-product">
          <span class="orca-cat-card__figure" id="test-figure">
            <img src="assets/orca-cutout-wellness.png" class="orca-cat-card__image" id="test-image">
          </span>
        </span>
      </span>
      <span class="orca-cat-card__footer" id="test-footer">
        <span class="orca-cat-card__copy" id="test-copy">
          <span class="orca-cat-card__title" id="test-title">Health & Wellness</span>
          <span class="orca-cat-card__count" id="test-count">14 products</span>
        </span>
        <span class="orca-cat-card__go" id="test-go"></span>
      </span>
    </a>
  </div>
  <script>
    const ids = ['test-card', 'test-scene', 'test-overlay', 'test-stage', 'test-product', 'test-figure', 'test-image', 'test-footer', 'test-copy', 'test-title', 'test-count', 'test-go'];
    const results = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      results[id] = window.getComputedStyle(el).cursor;
    }
    document.title = JSON.stringify(results);
  </script>
</body>
</html>`;

const testHtmlPath = path.join(repoDir, 'test-cursor.html');
fs.writeFileSync(testHtmlPath, html, 'utf8');

const output = execSync(`"${edge}" --headless --disable-gpu --dump-dom "file:///${testHtmlPath.replace(/\\/g, '/')}"`).toString();
const titleMatch = output.match(/<title>([^<]*)<\/title>/);
console.log('Computed Cursors:');
console.log(JSON.stringify(JSON.parse(titleMatch[1]), null, 2));

