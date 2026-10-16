const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const artifactDir = 'C:\\Users\\zezos\\.gemini\\antigravity\\brain\\f95ef814-f6c0-4f10-8685-3274478ed418';
const repoDir = 'C:\\Users\\zezos\\OneDrive\\Desktop\\orca\\Mavoraa';

const cssBase = fs.readFileSync(path.join(repoDir, 'assets', 'base.css'), 'utf8');
const cssHeader = fs.readFileSync(path.join(repoDir, 'assets', 'orca-header.css'), 'utf8');

// Categories data matching the store
const categories = [
  { handle: 'health-wellness', title: 'Health & Wellness', count: '14 products', img: 'shopify-col-wellness.jpg' },
  { handle: 'beauty-personal-care', title: 'Beauty & Personal Care', count: '10 products', img: 'shopify-col-beauty.jpg' },
  { handle: 'home-kitchen', title: 'Home & Kitchen', count: '15 products', img: 'shopify-col-kitchen.jpg' },
  { handle: 'smart-tech-gadgets', title: 'Smart Tech & Gadgets', count: '13 products', img: 'shopify-col-tech.jpg' },
  { handle: 'pet-essentials', title: 'Pet Essentials', count: '8 products', img: 'shopify-col-pet.jpg' },
  { handle: 'baby-kids-toys', title: "Baby & Kids' Toys", count: '8 products', img: 'shopify-col-baby.jpg' }
];

function generateHtml(options = {}) {
  const { isDropdownOpen = false, isDrawerOpen = false, isSubmenuOpen = false, activeLink = 'home' } = options;

  const catItemsHtml = categories.map(cat => `
    <li role="none">
      <a href="/collections/${cat.handle}" role="menuitem" class="header__category-card">
        <div class="header__category-thumb">
          <img src="assets/${cat.img}" alt="${cat.title}" width="38" height="38">
        </div>
        <div class="header__category-info">
          <span class="header__category-name">${cat.title}</span>
          <span class="header__category-count">${cat.count}</span>
        </div>
        <svg class="header__category-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </a>
    </li>
  `).join('');

  const drawerCatItemsHtml = categories.map(cat => `
    <li>
      <a href="/collections/${cat.handle}" class="menu-drawer__menu-item link link--text list-menu__item">
        ${cat.title}
      </a>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mavoraa Navbar Preview</title>
  <style>
    :root {
      --color-primary: #E24C13;
      --color-foreground: 32, 32, 32;
      --color-background: 255, 255, 255;
      --font-body-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --font-heading-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --orca-header-opacity: 0.98;
      --page-width: 1400px;
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

    /* Page preview mock body content */
    .hero-mock {
      padding: 80px 30px;
      text-align: center;
      background: linear-gradient(180deg, #f7f7f8 0%, #ebecee 100%);
    }
    .hero-mock h1 {
      font-size: 38px;
      margin-bottom: 12px;
      color: #121212;
    }
    .hero-mock p {
      font-size: 16px;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

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

    ${isDrawerOpen ? `
      .menu-drawer {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 330px !important;
        height: 100vh !important;
        background: #ffffff !important;
        box-shadow: 12px 0 36px rgba(0, 0, 0, 0.16) !important;
        transform: translate3d(0, 0, 0) !important;
        visibility: visible !important;
        z-index: 9999 !important;
        overflow-y: auto !important;
      }
      .menu-drawer-container details[open] {
        display: block;
      }
    ` : ''}

    ${isSubmenuOpen ? `
      .menu-drawer__submenu {
        position: absolute !important;
        inset: 0 !important;
        background: #ffffff !important;
        transform: translate3d(0, 0, 0) !important;
        visibility: visible !important;
        z-index: 10000 !important;
        overflow-y: auto !important;
      }
    ` : ''}
  </style>
</head>
<body>
  <div class="section-header">
    <div class="header-wrapper orca-header-wrapper">
      <header id="site-header" class="header orca-header header--middle-center header--mobile-center page-width">
        <!-- 1. Mobile Hamburger Drawer Button -->
        <header-drawer data-breakpoint="tablet">
          <details id="Details-menu-drawer-container" class="menu-drawer-container"${isDrawerOpen ? ' open' : ''}>
            <summary class="header__icon header__icon--menu header__icon--summary link focus-inset" aria-label="Menu">
              <span>
                <svg class="orca-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </span>
            </summary>
            <div id="menu-drawer" class="gradient menu-drawer motion-reduce" style="${isDrawerOpen ? 'transform: none; visibility: visible;' : ''}">
              <div class="menu-drawer__inner-container">
                <div class="menu-drawer__navigation-container">
                  <nav class="menu-drawer__navigation" aria-label="Mobile Navigation">
                    <div class="orca-drawer-heading">
                      <span class="orca-drawer-heading__label">Menu</span>
                      <span class="orca-drawer-heading__brand">Mavoraa</span>
                    </div>

                    <ul class="menu-drawer__menu has-submenu list-menu" role="list">
                      <!-- 1. Home -->
                      <li>
                        <a href="/" class="menu-drawer__menu-item link link--text list-menu__item${activeLink === 'home' ? ' menu-drawer__menu-item--active is-active' : ''}">
                          Home
                        </a>
                      </li>

                      <!-- 2. Categories with Submenu -->
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
                              <!-- Back Button -->
                              <button type="button" class="menu-drawer__close-button link link--text">
                                <svg class="icon icon-arrow-back" width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Back to Menu</span>
                              </button>

                              <ul class="menu-drawer__menu list-menu" role="list">
                                ${drawerCatItemsHtml}
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

                      <!-- 3. All Products -->
                      <li>
                        <a href="/collections/all" class="menu-drawer__menu-item link link--text list-menu__item${activeLink === 'all-products' ? ' menu-drawer__menu-item--active is-active' : ''}">
                          All Products
                        </a>
                      </li>

                      <!-- 4. Contact -->
                      <li>
                        <a href="/pages/contact" class="menu-drawer__menu-item link link--text list-menu__item${activeLink === 'contact' ? ' menu-drawer__menu-item--active is-active' : ''}">
                          Contact
                        </a>
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

        <!-- 2. Desktop Navigation (Order: Home → Categories → All Products → Contact) -->
        <nav class="header__inline-menu header__modern-nav" aria-label="Navigation">
          <ul class="header__nav-list" role="list">
            <!-- 1. Home -->
            <li class="header__nav-item">
              <a href="/" class="header__nav-link${activeLink === 'home' ? ' is-active' : ''}" ${activeLink === 'home' ? 'aria-current="page"' : ''}>
                <span class="header__nav-text">Home</span>
              </a>
            </li>

            <!-- 2. Categories with Dropdown -->
            <li class="header__nav-item header__menu-categories" id="HeaderCategoriesDropdown">
              <button type="button" class="header__nav-link header__nav-link--categories${activeLink === 'categories' ? ' is-active' : ''}" aria-expanded="${isDropdownOpen ? 'true' : 'false'}" id="HeaderCategoriesTrigger">
                <svg class="header__cat-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                  <rect x="2.5" y="2.5" width="6" height="6" rx="1.5"/>
                  <rect x="11.5" y="2.5" width="6" height="6" rx="1.5"/>
                  <rect x="2.5" y="11.5" width="6" height="6" rx="1.5"/>
                  <rect x="11.5" y="11.5" width="6" height="6" rx="1.5"/>
                </svg>
                <span class="header__nav-text">Categories</span>
                <svg class="header__caret-icon" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M1 1L5 5L9 1"/>
                </svg>
              </button>

              <!-- Dropdown Card -->
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
                  ${catItemsHtml}
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

            <!-- 3. All Products -->
            <li class="header__nav-item">
              <a href="/collections/all" class="header__nav-link${activeLink === 'all-products' ? ' is-active' : ''}">
                <span class="header__nav-text">All Products</span>
              </a>
            </li>

            <!-- 4. Contact -->
            <li class="header__nav-item">
              <a href="/pages/contact" class="header__nav-link${activeLink === 'contact' ? ' is-active' : ''}">
                <span class="header__nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </nav>

        <!-- 3. Centered Logo -->
        <div class="header__heading">
          <a href="/" class="header__heading-link link link--text">
            <div class="header__heading-logo-wrapper">
              <img src="assets/brand-logo.png" alt="Mavoraa" class="header__heading-logo" width="96" height="96" style="max-height: 52px; width: auto; object-fit: contain;">
            </div>
          </a>
        </div>

        <!-- 4. Icons (Account and Cart on the Right) -->
        <div class="header__icons">
          <!-- Account Icon -->
          <a href="/account" class="header__icon header__icon--account link" aria-label="Account">
            <svg class="orca-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>

          <!-- Cart Icon with Count Bubble -->
          <a href="/cart" class="header__icon header__icon--cart link" id="cart-icon-bubble" aria-label="Cart">
            <svg class="orca-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <div class="cart-count-bubble">
              <span aria-hidden="true">2</span>
            </div>
          </a>
        </div>
      </header>
    </div>
  </div>

  <main class="hero-mock">
    <h1>Welcome to Mavoraa</h1>
    <p>Premium curated lifestyle essentials with high-end modern design.</p>
  </main>
</body>
</html>`;
}

// 1. Desktop Standard Navbar (1400x450)
fs.writeFileSync(path.join(repoDir, 'test-nav-desktop.html'), generateHtml({ activeLink: 'home' }));
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,450 --screenshot="${path.join(artifactDir, 'navbar-desktop-clean.png')}" "${path.join(repoDir, 'test-nav-desktop.html')}"`);
console.log('Generated navbar-desktop-clean.png');

// 2. Desktop Dropdown Open (1400x650)
fs.writeFileSync(path.join(repoDir, 'test-nav-dropdown.html'), generateHtml({ isDropdownOpen: true, activeLink: 'categories' }));
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=1400,650 --screenshot="${path.join(artifactDir, 'navbar-desktop-dropdown.png')}" "${path.join(repoDir, 'test-nav-dropdown.html')}"`);
console.log('Generated navbar-desktop-dropdown.png');

// 3. Mobile Header View (390x500)
fs.writeFileSync(path.join(repoDir, 'test-nav-mobile.html'), generateHtml({ activeLink: 'home' }));
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=390,500 --screenshot="${path.join(artifactDir, 'navbar-mobile-header.png')}" "${path.join(repoDir, 'test-nav-mobile.html')}"`);
console.log('Generated navbar-mobile-header.png');

// 4. Mobile Drawer Open (390x750)
fs.writeFileSync(path.join(repoDir, 'test-nav-drawer.html'), generateHtml({ isDrawerOpen: true, activeLink: 'home' }));
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=390,750 --screenshot="${path.join(artifactDir, 'navbar-mobile-drawer.png')}" "${path.join(repoDir, 'test-nav-drawer.html')}"`);
console.log('Generated navbar-mobile-drawer.png');

// 5. Mobile Categories Submenu Open with Back Button (390x750)
fs.writeFileSync(path.join(repoDir, 'test-nav-submenu.html'), generateHtml({ isDrawerOpen: true, isSubmenuOpen: true, activeLink: 'categories' }));
execSync(`"${edge}" --headless --disable-gpu --force-device-scale-factor=1 --window-size=390,750 --screenshot="${path.join(artifactDir, 'navbar-mobile-submenu.png')}" "${path.join(repoDir, 'test-nav-submenu.html')}"`);
console.log('Generated navbar-mobile-submenu.png');

