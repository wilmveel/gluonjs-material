import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardTitle extends GluonElement {

  static get observedAttributes() {
    return ['large'];
  }

  get template() {
    return html`<style>${block}${style.title}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__title');
    this.classList.add('mdc-card__title--large');
  }

}

customElements.define(MaterialCardTitle.is, MaterialCardTitle);
