const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\zezos\\.gemini\\antigravity\\brain\\f95ef814-f6c0-4f10-8685-3274478ed418';
const repoDir = 'C:\\Users\\zezos\\OneDrive\\Desktop\\orca\\Mavoraa';

const cssBase = fs.readFileSync(path.join(repoDir, 'assets', 'base.css'), 'utf8');
const cssHeader = fs.readFileSync(path.join(repoDir, 'assets', 'orca-header.css'), 'utf8');
const cssCollections = fs.readFileSync(path.join(repoDir, 'assets', 'orca-collections.css'), 'utf8');

const collections = [
  { handle: 'health-wellness', title: 'Health & Wellness', count: '14 products', cutout: 'orca-cutout-wellness.png', productClass: 'orca-cat-card__product--wellness' },
  { handle: 'beauty-personal-care', title: 'Beauty & Personal Care', count: '10 products', cutout: 'orca-cutout-straightener.png', productClass: 'orca-cat-card__product--straightener' },
  { handle: 'home-kitchen', title: 'Home & Kitchen', count: '15 products', cutout: 'orca-cutout-kitchen.png', productClass: 'orca-cat-card__product--kitchen' },
  { handle: 'smart-tech-gadgets', title: 'Smart Tech & Gadgets', count: '13 products', cutout: 'orca-cutout-tech.png', productClass: 'orca-cat-card__product--tech' },
  { handle: 'pet-essentials', title: 'Pet Essentials', count: '8 products', cutout: 'orca-cutout-petbed.png', productClass: 'orca-cat-card__product--petbed' },
  { handle: 'baby-kids-toys', title: 'Baby, Kids & Toys', count: '8 products', cutout: 'orca-cutout-kids-figurine.png', productClass: 'orca-cat-card__product--kids-figurine' }
];

function generateMobileHtml(options = {}) {
  const { isDrawerOpen = false, isSubmenuOpen = false } = options;

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

  const drawerCatItems = collections.map(col => `
    <li>
      <a href="/collections/${col.handle}" class="menu-drawer__menu-item link link--text list-menu__item">
        ${col.title}
      </a>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mavoraa - Mobile Collections</title>
  <style>
    :root {
      --color-primary: #E24C13;
      --color-foreground: 32, 32, 32;
      --color-background: 255, 255, 255;
      --font-body-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --font-heading-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --orca-header-opacity: 0.98;
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

    ${isDrawerOpen ? `
      .menu-drawer-container details {
        display: block !important;
      }
      .menu-drawer {
        transform: translate3d(0, 0, 0) !important;
        visibility: visible !important;
      }
      .header-wrapper {
        position: static !important;
      }
    ` : ''}
  </style>
</head>
<body>
  <div class="section-header">
    <div class="orca-header-wrapper">
      <header class="header orca-header page-width">
        <header-drawer class="menu-drawer-container">
          <details id="Details-menu-drawer-container"${isDrawerOpen ? ' open' : ''}>
            <summary class="header__icon header__icon--menu header__icon--summary" aria-label="Menu">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="icon icon-hamburger" fill="none" viewBox="0 0 18 16" width="18" height="16">
                  <path d="M1 .5a.5.5 0 100 1h16a.5.5 0 100-1H1zM1 7.5a.5.5 0 100 1h16a.5.5 0 100-1H1zM1 14.5a.5.5 0 100 1h16a.5.5 0 100-1H1z" fill="currentColor"/>
                </svg>
              </span>
            </summary>
            <div id="menu-drawer" class="gradient menu-drawer motion-reduce" tabindex="-1">
              <div class="menu-drawer__inner-container">
                <div class="menu-drawer__navigation-container">
                  <nav class="menu-drawer__navigation" aria-label="Menu">
                    <div class="orca-drawer-heading">
                      <span class="orca-drawer-heading__label">Menu</span>
                      <span class="orca-drawer-heading__brand">Mavoraa</span>
                    </div>
                    <ul class="menu-drawer__menu has-submenu list-menu" role="list">
                      <li>
                        <a href="/" class="menu-drawer__menu-item link link--text list-menu__item is-active">Home</a>
                      </li>
                      <li>
                        <details id="Details-menu-drawer-categories"${isSubmenuOpen ? ' open' : ''}>
                          <summary id="HeaderDrawer-Categories" class="menu-drawer__menu-item list-menu__item link link--text">
                            <span class="menu-drawer__category-label">
                              <svg class="header__cat-icon" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                                <rect x="2.5" y="2.5" width="6" height="6" rx="1.5"/>
                                <rect x="11.5" y="2.5" width="6" height="6" rx="1.5"/>
                                <rect x="2.5" y="11.5" width="6" height="6" rx="1.5"/>
                                <rect x="11.5" y="11.5" width="6" height="6" rx="1.5"/>
                              </svg>
                              Categories
                            </span>
                            <svg class="icon icon-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </summary>
                          <div id="childlink-categories" class="menu-drawer__submenu has-submenu gradient" style="${isSubmenuOpen ? 'transform: none; visibility: visible;' : ''}">
                            <div class="menu-drawer__inner-submenu">
                              <button type="button" class="menu-drawer__close-button link link--text">
                                <svg class="icon-arrow-back" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Back to Menu</span>
                              </button>
                              <ul class="menu-drawer__menu list-menu" role="list">
                                ${drawerCatItems}
                                <li class="menu-drawer__explore-all">
                                  <a href="/collections" class="menu-drawer__menu-item link link--text" style="color: var(--color-primary, #E24C13); font-weight: 600;">
                                    Explore All Categories &rarr;
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </details>
                      </li>
                      <li>
                        <a href="/collections/all" class="menu-drawer__menu-item link link--text list-menu__item">All Products</a>
                      </li>
                      <li>
                        <a href="/pages/contact" class="menu-drawer__menu-item link link--text list-menu__item">Contact</a>
                      </li>
                    </ul>
                  </nav>
                  <div class="menu-drawer__utility-links">
                    <a href="/account" class="menu-drawer__account link">
                      <svg class="orca-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </header-drawer>
        <a href="/" class="header__heading-link">
          <svg class="header__heading-logo" width="110" height="38" viewBox="0 0 130 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="#E24C13">
              <path d="M65 4C61 4 58 7 58 11V16H54V28H76V16H72V11C72 7 69 4 65 4ZM62 16V11C62 9 63 8 65 8C67 8 68 9 68 11V16H62Z"/>
              <path d="M55 18H58V27H55V18ZM72 18H75V27H72V18Z"/>
            </g>
            <text x="65" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#E24C13" letter-spacing="2">MAVORAA</text>
          </svg>
        </a>
        <div class="header__icons">
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

  <div class="orca-cats color-background-1">
    <div class="page-width isolate section-padding" style="padding-top: 36px; padding-bottom: 50px;">
      <header class="orca-cats__header">
        <p class="orca-cats__eyebrow">Shop by category</p>
        <h2 class="orca-cats__title h1" style="font-size: 26px;">Browse the catalog</h2>
      </header>
      <ul class="orca-cats__grid" role="list">
        ${cardsHtml}
      </ul>
    </div>
  </div>
</body>
</html>`;
}

fs.writeFileSync(path.join(repoDir, 'test-mobile-cards.html'), generateMobileHtml({ isDrawerOpen: false }), 'utf8');
fs.writeFileSync(path.join(repoDir, 'test-mobile-submenu-all.html'), generateMobileHtml({ isDrawerOpen: true, isSubmenuOpen: true }), 'utf8');

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=500,1200 --screenshot="${artifactDir}\\collections-mobile-cards-all.png" "file:///${repoDir.replace(/\\/g, '/')}/test-mobile-cards.html"`);
console.log('Saved collections-mobile-cards-all.png');

execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=500,900 --screenshot="${artifactDir}\\collections-mobile-submenu-all.png" "file:///${repoDir.replace(/\\/g, '/')}/test-mobile-submenu-all.html"`);
console.log('Saved collections-mobile-submenu-all.png');
