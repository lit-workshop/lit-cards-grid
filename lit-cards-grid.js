import { LitElement, html, css } from "lit-element";
import "lit-card/lit-card";
import "lit-button-styles/lit-button-styles";
import "@polymer/iron-icons/iron-icons";

const PAG_ACTIONS = {
  firstPage: 'first-page',
  prevPage: 'prev-page',
  changeSize: 'change-size',
  nextPage: 'next-page',
  lastPage: 'last-page'
}

class LitCardsGrid extends LitElement {
  static get styles() {
    return css`
      :host {
        --primary-color: var(--card-primary-color, #0d47a1);
        --secundary-color: var(--card-secundary-color, #5472d3);
        --neutral-color: var(--card-nuetral-color, #ccc);
        --font-color: var(--card-font-color, #ffffff);
        --font-size: var(--card-font-size, 10px);
      }

      .row {
        margin: 5px;
      }

      .btn-primary {
        background-color: var(--primary-color);
        color: var(--font-color);
      }

      .pagination {
        margin: 0px 5px;
      }

      .container {
        display: grid;
        grid-template-columns: 1fr;
      }

      .buttons-set {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      @media (min-width: 600px) {
        .container {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (min-width: 850px) {
        .container {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `;
  }

  static get properties() {
    return {
      cards: { type: Array }
    };
  }

  renderGrid() {
    return html`
      ${this.cards.map(card => {
        return html`
          <div class="row">
            <lit-card .card=${card}></lit-card>
          </div>
        `;
      })}
    `;
  }

  renderButtonsSet() {
    return html`
      <button class="btn btn-primary pagination" name="${PAG_ACTIONS.firstPage}" @click="${this.handlePagination}">
        <iron-icon icon="first-page"></iron-icon>
      </button>
      <button class="btn btn-primary pagination" name="${PAG_ACTIONS.prevPage}" @click="${this.handlePagination}">
        <iron-icon icon="chevron-left"></iron-icon>
      </button>
      <select class="btn selection pagination" name="${PAG_ACTIONS.changeSize}" @change="${this.handlePagination}">
        <option selected value="6">6</option>
        <option value="9">9</option>
        <option value="18">18</option>
      </select>
      <button class="btn btn-primary pagination" name="${PAG_ACTIONS.nextPage}" @click="${this.handlePagination}">
        <iron-icon icon="chevron-right"></iron-icon>
      </button>
      <button class="btn btn-primary pagination" name="${PAG_ACTIONS.lastPage}" @click="${this.handlePagination}">
        <iron-icon icon="last-page"></iron-icon>
      </button>
    `;
  }

  render() {
    return html`
      <lit-button-styles></lit-button-styles>
      <div class="container">
        ${this.renderGrid()}
      </div>
      <div class="buttons-set">
        ${this.renderButtonsSet()}
      </div>
    `;
  }

  handlePagination(event) {
    const eventConfig = {
      bubbles: true,
      composed: true,
      detail: {}
    }

    let button = event.target;
    let pagEvent;
    let action;

    while (button.tagName !== 'BUTTON' && button.tagName !== 'SELECT') {
      button = button.parentNode;
    }

    action = button.getAttribute('name');
    eventConfig.detail.action = action;
    if (action === PAG_ACTIONS.changeSize) {
      eventConfig.detail.size = event.target.value;
    }

    pagEvent = new CustomEvent('pag-event', eventConfig);

    this.dispatchEvent(pagEvent);
  }
}

window.customElements.define("lit-cards-grid", LitCardsGrid);
