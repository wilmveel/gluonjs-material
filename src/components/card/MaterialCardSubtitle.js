import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCardSubtitle extends GluonElement {

  get template() {
    return html`<style>${block}${style.subtitle}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__subtitle');
    this.classList.add('mdc-typography--subheading1');
  }

}

customElements.define(MaterialCardSubtitle.is, MaterialCardSubtitle);