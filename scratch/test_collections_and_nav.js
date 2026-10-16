const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\zezos\\.gemini\\antigravity\\brain\\f95ef814-f6c0-4f10-8685-3274478ed418';
const repoDir = 'C:\\Users\\zezos\\OneDrive\\Desktop\\orca\\Mavoraa';

const cssBase = fs.readFileSync(path.join(repoDir, 'assets', 'base.css'), 'utf8');
const cssHeader = fs.readFileSync(path.join(repoDir, 'assets', 'orca-header.css'), 'utf8');
const cssCollections = fs.readFileSync(path.join(repoDir, 'assets', 'orca-collections.css'), 'utf8');

// The 6 actual Shopify collections
const collections = [
  {
    handle: 'health-wellness',
    title: 'Health & Wellness',
    count: '14 products',
    cutout: 'orca-cutout-wellness.png',
    thumb: 'shopify-col-wellness.jpg',
    productClass: 'orca-cat-card__product--wellness'
  },
  {
    handle: 'beauty-personal-care',
    title: 'Beauty & Personal Care',
    count: '10 products',
    cutout: 'orca-cutout-straightener.png',
    thumb: 'shopify-col-beauty.jpg',
    productClass: 'orca-cat-card__product--straightener'
  },
  {
    handle: 'home-kitchen',
    title: 'Home & Kitchen',
    count: '15 products',
    cutout: 'orca-cutout-kitchen.png',
    thumb: 'shopify-col-kitchen.jpg',
    productClass: 'orca-cat-card__product--kitchen'
  },
  {
    handle: 'smart-tech-gadgets',
    title: 'Smart Tech & Gadgets',
    count: '13 products',
    cutout: 'orca-cutout-tech.png',
    thumb: 'shopify-col-tech.jpg',
    productClass: 'orca-cat-card__product--tech'
  },
  {
    handle: 'pet-essentials',
    title: 'Pet Essentials',
    count: '8 products',
    cutout: 'orca-cutout-petbed.png',
    thumb: 'shopify-col-pet.jpg',
    productClass: 'orca-cat-card__product--petbed'
  },
  {
    handle: 'baby-kids-toys',
    title: 'Baby, Kids & Toys',
    count: '8 products',
    cutout: 'orca-cutout-kids-figurine.png',
    thumb: 'shopify-col-baby.jpg',
    productClass: 'orca-cat-card__product--kids-figurine'
  }
];

function generateHtml(options = {}) {
  const { isDropdownOpen = false } = options;

  const cardsHtml = collections.map((col, idx) => `
    <li class="orca-cats__item" id="Slide-collections-${idx + 1}">
      <a href="/collections/${col.handle}" class="orca-cat-card">
        <span class="orca-cat-card__scene" style="background-image: url('assets/orca-collection-stage.png');" aria-hidden="true"></span>
        <span class="orca-cat-card__overlay" aria-hidden="true"></span>
        <span class="orca-cat-card__stage">
          <span class="orca-cat-card__product ${col.productClass}">
            <span class="orca-cat-card__figure">
              <img src="assets/${col.cutout}" alt="${col.title}" class="orca-cat-card__image" loading="lazy">
            </span>
          </span>
        </span>
        <span class="orca-cat-card__footer">
          <span class="orca-cat-card__copy">
            <span class="orca-cat-card__title">${col.title}</span>
            <span class="orca-cat-card__count">${col.count}</span>
          </span>
          <span class="orca-cat-card__go" aria-hidden="true">
            <svg class="orca-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </span>
      </a>
    </li>
  `).join('');

  const dropdownItems = collections.map(col => `
    <li role="none">
      <a href="/collections/${col.handle}" role="menuitem" class="header__category-card">
        <div class="header__category-thumb">
          <img src="assets/${col.thumb}" alt="${col.title}" width="38" height="38">
        </div>
        <div class="header__category-info">
          <span class="header__category-name">${col.title}</span>
          <span class="header__category-count">${col.count}</span>
        </div>
        <svg class="header__category-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </a>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mavoraa - All Shopify Collections</title>
  <style>
    :root {
      --color-primary: #E24C13;
      --color-foreground: 32, 32, 32;
      --color-background: 255, 255, 255;
      --font-body-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --font-heading-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --orca-header-opacity: 0.98;
      --page-width: 1300px;
    }
    body {
      margin: 0;
      padding: 0;
      background: #fbfbfb;
      font-family: var(--font-body-family);
      color: rgb(var(--color-foreground));
    }
    ${cssBase}
    ${cssHeader}
    ${cssCollections}

    ${isDropdownOpen ? `
      #HeaderCategoriesDropdown .header__dropdown-menu {
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
      }
      #HeaderCategoriesDropdown .header__caret-icon {
        transform: rotate(180deg) !important;
      }
    ` : ''}
  </style>
</head>
<body>
  <div class="section-header">
    <div class="orca-header-wrapper">
      <header class="header orca-header header--middle-center page-width">
        <nav class="header__inline-menu header__modern-nav" aria-label="Navigation">
          <ul class="header__nav-list" role="list">
            <li class="header__nav-item">
              <a href="/" class="header__nav-link is-active" aria-current="page">
                <span class="header__nav-text">Home</span>
              </a>
            </li>
            <li class="header__nav-item header__menu-categories" id="HeaderCategoriesDropdown">
              <button type="button" class="header__nav-link header__nav-link--categories" aria-expanded="${isDropdownOpen}">
                <svg class="header__cat-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/>
                  <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/>
                  <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/>
                  <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.8"/>
                </svg>
                <span class="header__nav-text">Categories</span>
                <svg class="header__caret-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="header__dropdown-menu" id="HeaderCategoriesMenu" role="menu">
                <div class="header__dropdown-header">
                  <span class="header__dropdown-badge">
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5"/>
                      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5"/>
                      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5"/>
                      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5"/>
                    </svg>
                    Featured Collections
                  </span>
                  <a href="/collections" class="header__dropdown-view-all">All Collections &rarr;</a>
                </div>
                <ul class="header__categories-grid" role="list">
                  ${dropdownItems}
                </ul>
                <div class="header__dropdown-footer">
                  <a href="/collections/all" class="header__dropdown-footer-btn">
                    <span>Explore All Products</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
            <li class="header__nav-item">
              <a href="/collections/all" class="header__nav-link">
                <span class="header__nav-text">All Products</span>
              </a>
            </li>
            <li class="header__nav-item">
              <a href="/pages/contact" class="header__nav-link">
                <span class="header__nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>
        <a href="/" class="header__heading-link">
          <div class="header__heading-logo-wrapper">
            <svg class="header__heading-logo" width="130" height="42" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="#E24C13">
                <path d="M65 4C61 4 58 7 58 11V16H54V28H76V16H72V11C72 7 69 4 65 4ZM62 16V11C62 9 63 8 65 8C67 8 68 9 68 11V16H62Z"/>
                <path d="M55 18H58V27H55V18ZM72 18H75V27H72V18Z"/>
              </g>
              <text x="65" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#E24C13" letter-spacing="2">MAVORAA</text>
            </svg>
          </div>
        </a>
        <div class="header__icons">
          <a href="/account" class="header__icon header__icon--account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
          <a href="/cart" class="header__icon header__icon--cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <div class="cart-count-bubble"><span>2</span></div>
          </a>
        </div>
      </header>
    </div>
  </div>

  <!-- Homepage Collections Section -->
  <div class="orca-cats color-background-1">
    <div class="page-width isolate section-padding" style="padding-top: 56px; padding-bottom: 72px;">
      <header class="orca-cats__header">
        <p class="orca-cats__eyebrow">Shop by category</p>
        <h2 class="orca-cats__title h1">Browse the catalog</h2>
        <p class="orca-cats__description">Home, wellness, and everyday products in one place.</p>
      </header>
      <ul class="orca-cats__grid" role="list">
        ${cardsHtml}
      </ul>
      <p class="orca-cats__all">
        <a href="/collections" class="orca-cats__all-link">
          View all collections <span aria-hidden="true">&rarr;</span>
        </a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

fs.writeFileSync(path.join(repoDir, 'test-collections-desktop.html'), generateHtml({ isDropdownOpen: false }), 'utf8');
fs.writeFileSync(path.join(repoDir, 'test-collections-dropdown.html'), generateHtml({ isDropdownOpen: true }), 'utf8');

console.log('Generated test HTML files. Capturing screenshots...');

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,1200 --screenshot="${artifactDir}\\collections-desktop-all.png" "file:///${repoDir.replace(/\\/g, '/')}/test-collections-desktop.html"`);
console.log('Saved collections-desktop-all.png');

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,1200 --screenshot="${artifactDir}\\collections-desktop-dropdown-all.png" "file:///${repoDir.replace(/\\/g, '/')}/test-collections-dropdown.html"`);
console.log('Saved collections-desktop-dropdown-all.png');

