import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardSupportingText extends GluonElement {

  get template() {
    return html`<style>${block}${style.supporting_text}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__supporting-text');
  }

}

customElements.define(MaterialCardSupportingText.is, MaterialCardSupportingText);