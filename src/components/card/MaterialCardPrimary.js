import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardPrimary extends GluonElement {

  get template() {
    return html`<style>${block}${style.primary}${style.primary_slotted}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('mdc-card__primary');
  }

}

customElements.define(MaterialCardPrimary.is, MaterialCardPrimary);
