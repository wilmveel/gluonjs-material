import {MaterialElement, html} from "../MaterialElement";

import IconToggleStyle from "@material/icon-toggle/mdc-icon-toggle";
import {MaterialStyle} from "../MaterialStyle";

import {MDCIconToggle} from "@material/icon-toggle/index";

MaterialElement.globalStyle(IconToggleStyle.keyframes)

class MaterialIconToggle extends MaterialElement {

  get styles() {
    return [
      IconToggleStyle.icon,
      MaterialStyle.block
    ]
  }

  get classes() {
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
      console.log(val)
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