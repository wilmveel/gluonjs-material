import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";

const block = `:host {display:block}`

class MaterialCard extends GluonElement {

  get template() {
    return html`<style>${block}${style.card}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card');
  }

}









customElements.define(MaterialCard.is, MaterialCard);



