import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardMedia extends GluonElement {

  get template() {
    return html`<style>${block}${style.media}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__media');
  }
}

customElements.define(MaterialCardMedia.is, MaterialCardMedia);
