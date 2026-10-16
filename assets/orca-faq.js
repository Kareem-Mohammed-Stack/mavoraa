if (!customElements.get('orca-faq-list')) {
  customElements.define(
    'orca-faq-list',
    class OrcaFaqList extends HTMLElement {
      connectedCallback() {
        if (this.bound) return;
        this.bound = true;
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.items = Array.from(this.querySelectorAll('details'));
        this.onSummaryClick = this.onSummaryClick.bind(this);

        this.items.forEach((item) => {
          const summary = item.querySelector('summary');
          if (!summary) return;
          if (item.open) item.classList.add('is-open');
          summary.addEventListener('click', this.onSummaryClick);
        });
        this.classList.add('is-ready');
      }

      disconnectedCallback() {
        if (!this.items) return;
        this.items.forEach((item) => {
          const summary = item.querySelector('summary');
          if (summary) summary.removeEventListener('click', this.onSummaryClick);
          this.clearClose(item);
        });
        this.bound = false;
      }

      onSummaryClick(event) {
        const item = event.currentTarget.closest('details');
        if (!(item instanceof HTMLDetailsElement) || !this.contains(item)) return;
        event.preventDefault();

        if (item.classList.contains('is-open')) {
          this.collapse(item);
          return;
        }

        this.items.forEach((other) => {
          if (other !== item && other.classList.contains('is-open')) this.collapse(other);
        });
        this.expand(item);
      }

      clearClose(item) {
        const closing = item._orcaFaqClose;
        if (!closing) return;
        closing.panel.removeEventListener('transitionend', closing.onEnd);
        clearTimeout(closing.timer);
        item._orcaFaqClose = null;
      }

      expand(item) {
        this.clearClose(item);
        const panel = item.querySelector('.orca-faq__panel');
        item.open = true;
        item.classList.remove('is-open');
        if (panel && !this.reduceMotion) panel.offsetHeight;
        item.classList.add('is-open');
      }

      collapse(item) {
        const panel = item.querySelector('.orca-faq__panel');
        this.clearClose(item);
        item.classList.remove('is-open');

        const finish = () => {
          this.clearClose(item);
          if (!item.classList.contains('is-open')) item.open = false;
        };

        if (this.reduceMotion || !panel) {
          finish();
          return;
        }

        const onEnd = (event) => {
          if (event.target !== panel || event.propertyName !== 'grid-template-rows') return;
          finish();
        };
        const timer = window.setTimeout(finish, 480);
        item._orcaFaqClose = { panel, onEnd, timer };
        panel.addEventListener('transitionend', onEnd);
      }
    }
  );
}
