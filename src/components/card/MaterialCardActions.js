import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardActions extends GluonElement {

  static get observedAttributes() {
    return ['vertical'];
  }

  get template() {
    return html`<slot></slot>`;
  }

  set vertical(val) {

    if (val != null) {
      this.classList.add('mdc-card__actions--vertical')
    } else {
      this.classList.remove('mdc-card__actions--vertical')
    }
    this.render();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'vertical') {
      this.vertical = newValue;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.classList.add('mdc-card__actions');

    const buttons = this.querySelectorAll('material-button');
    buttons.forEach(el => el.classList.add('mdc-card__actions'))

    MaterialCardActions.observedAttributes.forEach(attr => {
      this.attributeChangedCallback(attr, null, this.getAttribute(attr));
    });

    this.render()
  }
}

customElements.define(MaterialCardActions.is, MaterialCardActions);