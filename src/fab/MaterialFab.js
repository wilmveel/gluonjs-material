import {MaterialElement, html} from "../MaterialElement.js";
import {MaterialStyle} from "../MaterialStyle.js";
import FabStyle from "@material/fab/mdc-fab";
import * as ripple from "@material/ripple/index";

MaterialElement.globalStyle(FabStyle.keyframes);

class MaterialFab extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      FabStyle.keyframes,
      FabStyle.host,
      FabStyle.icon
    ]
  }

  get classes() {
    return [
      'mdc-fab',
      'material-icons'
    ]
  }

  get customStyle() {
    return html`<style>.mdc-fab__icon{height: 100%;}</style>`
  }

  get content() {
    return html`${this.customStyle}<span class="mdc-fab__icon"><slot></slot></span>`;
  }

  static get configurationAttributes() {
    return ['mini', 'ripple'];
  }

  set mini(val){
    if(val !== null){
      this.classList.add("mdc-fab--mini")
    }else {
      this.classList.remove("mdc-fab--mini")
    }
  }

  set ripple(val){
    if(val !== null){
      new ripple.MDCRipple(this);
    }

  }

  connectedCallback() {
    super.connectedCallback()

    this.render();
  }

}

customElements.define(MaterialFab.is, MaterialFab, {extends: 'button'});