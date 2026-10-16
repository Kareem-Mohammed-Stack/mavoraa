/* Scroll-direction header. Reconnects cleanly after Shopify Theme Editor updates. */
if (!customElements.get('orca-sticky-header')) {
  customElements.define('orca-sticky-header', class extends HTMLElement {
    connectedCallback() {
      this.header = this.closest('.section-header');
      if (!this.header) return;
      this.header.classList.remove('shopify-section-header-sticky', 'shopify-section-header-hidden', 'scrolled-past-header', 'animate');
      this.alwaysSticky = ['always', 'reduce-logo-size'].includes(this.dataset.stickyType);
      this.startTop = this.header.offsetTop;
      this.lastScroll = Math.max(0, window.scrollY);
      this.direction = 0;
      this.distance = 0;
      this.events = new AbortController();
      const signal = this.events.signal;

      this.measure = () => {
        this.headerHeight = this.header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${this.headerHeight}px`);
      };
      this.measure();
      this.observer = new ResizeObserver(this.measure);
      this.observer.observe(this.header);
      this.querySelectorAll('details').forEach((details) => {
        details.addEventListener('toggle', () => {
          details.querySelector(':scope > summary')?.setAttribute('aria-expanded', String(details.open));
        }, { signal });
      });
      window.addEventListener('resize', () => {
        const drawer = this.querySelector('header-drawer[data-breakpoint="tablet"]');
        const details = drawer?.querySelector('details');
        if (window.innerWidth >= 990 && details?.open) {
          drawer.closeMenuDrawer(new Event('resize'), details.querySelector('summary'));
        }
      }, { signal });
      if (this.dataset.stickyType === 'none') return;
      this.header.classList.toggle('shopify-section-header-sticky', this.alwaysSticky);

      window.addEventListener('scroll', () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.onScroll();
        });
      }, { passive: true, signal });
      this.addEventListener('focusin', () => {
        if (this.header.classList.contains('shopify-section-header-hidden')) this.reveal();
      }, { signal });
      this.addEventListener('preventHeaderReveal', () => {
        this.preventRevealUntil = performance.now() + 150;
      }, { signal });
      this.onScroll();
    }

    disconnectedCallback() {
      this.events?.abort();
      this.observer?.disconnect();
      cancelAnimationFrame(this.frame);
    }

    onScroll() {
      const scroll = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = scroll - this.lastScroll;
      this.lastScroll = scroll;
      const pastHeader = scroll > this.startTop + this.headerHeight;
      this.header.classList.toggle('scrolled-past-header', pastHeader);

      if (!pastHeader) {
        this.header.classList.remove('shopify-section-header-hidden', 'animate');
        this.header.classList.toggle('shopify-section-header-sticky', this.alwaysSticky);
        this.distance = 0;
        return;
      }
      if (this.alwaysSticky) return;

      // Keep open menus, search and keyboard interactions in view.
      if (this.querySelector('details[open], :focus-visible') || this.preventHide) {
        this.distance = 0;
        this.reveal();
        return;
      }
      const direction = Math.sign(delta);
      if (direction !== this.direction) this.distance = 0;
      this.direction = direction;
      this.distance += Math.abs(delta);
      if (this.distance < 8) return;
      if (direction > 0) {
        this.header.classList.add('shopify-section-header-sticky', 'shopify-section-header-hidden', 'animate');
      } else if (direction < 0 && !(performance.now() < this.preventRevealUntil)) {
        this.reveal();
      }
    }

    reveal() {
      if (this.dataset.stickyType === 'none') return;
      this.header.classList.add('shopify-section-header-sticky', 'animate');
      this.header.classList.remove('shopify-section-header-hidden');
    }
  });
}

// Categories Dropdown Interactions: Hover/Click toggle, Click Outside, Escape key
function initCategoriesDropdown() {
  const container = document.getElementById('HeaderCategoriesDropdown');
  if (!container) return;
  const trigger = document.getElementById('HeaderCategoriesTrigger');
  const menu = document.getElementById('HeaderCategoriesMenu');
  if (!trigger || !menu) return;

  function openDropdown() {
    container.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    container.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (container.classList.contains('is-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  if (trigger._toggleHandler) {
    trigger.removeEventListener('click', trigger._toggleHandler);
  }
  trigger._toggleHandler = toggleDropdown;
  trigger.addEventListener('click', toggleDropdown);

  container.addEventListener('mouseenter', openDropdown);
  container.addEventListener('mouseleave', closeDropdown);

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (container.classList.contains('is-open')) {
        closeDropdown();
        trigger.focus();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCategoriesDropdown);
} else {
  initCategoriesDropdown();
}
document.addEventListener('shopify:section:load', initCategoriesDropdown);

