import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `lit-cards-grid`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class LitCardsGrid extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'lit-cards-grid',
      },
    };
  }
}

window.customElements.define('lit-cards-grid', LitCardsGrid);
