import {MaterialElement, html} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialIconToggleStyle from "./MaterialIconToggleStyle.js";

import {MDCIconToggle} from "./MaterialIconToggleBehaviour.js";

MaterialElement.globalStyle(MaterialIconToggleStyle.keyframes)

class MaterialIconToggle extends MaterialElement {

  get initStyles() {
    return [
      MaterialIconToggleStyle.icon,
      MaterialStyle.block
    ]
  }

  get initClasses() {
    return [
      'mdc-icon-toggle',
      'material-icons'
    ]
  }

  static get configurationAttributes() {
    return ['disabled'];
  }

  set disabled(val){
    if(val != null){
      this.classList.add('mdc-icon-toggle--disabled');
    }else{
      this.classList.remove('mdc-icon-toggle--disabled');
    }
  }

  connectedCallback(){
    MDCIconToggle.attachTo(this)
    super.connectedCallback();
  }

}

customElements.define(MaterialIconToggle.is, MaterialIconToggle);