import {MaterialElement, html} from "../MaterialElement";

import style from "@material/icon-toggle/mdc-icon-toggle";

class MaterialIconToggle extends MaterialElement {

  static get configurationAttributes() {
    return ['ripple'];
  }

  get template() {
    return html`<style>${this.blockStyle}${style.icon}</style><slot></slot>`;
  }

  set ripple(val){
    if(val){
      this.classList.add('mdc-ripple-surface');
    }else{
      this.classList.remove('mdc-ripple-surface');
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('mdc-icon-toggle');
    this.classList.add('material-icons');
  }
}

customElements.define(MaterialIconToggle.is, MaterialIconToggle);