import {MaterialElement} from "../MaterialElement";
import ButtonStyle from "@material/button/mdc-button";
import * as ripple from "@material/ripple/index";

MaterialElement.globalStyle(ButtonStyle.keyframes)

class MaterialButton extends MaterialElement {

  get hasSlotted() {
    const slot = this.shadowRoot.querySelector('slot');
    return slot != null && slot.assignedNodes().length > 1;
  }

  get element() {
    if (!this.hasSlotted) {
      return this;
    } else {
      return this.querySelector('button, a, input');
    }
  }

  get styles() {
    if (this.hasSlotted) {
      return [
        ButtonStyle.keyframes,
        ButtonStyle.slotted
      ]
    } else {
      return [
        ButtonStyle.keyframes,
        ButtonStyle.host
      ]
    }
  }

  get classes() {
    if (this.hasSlotted) {
      return []
    } else {
      return [
        'mdc-button'
      ]
    }
  }

  static get configurationAttributes() {
    return ['disabled', 'raised'];
  }

  set disabled(val) {
    if (val != null) {
      if(!this.element.hasAttribute("disabled")) {
        this.element.setAttribute('disabled', "")
      }
    } else {
      this.element.removeAttribute('disabled')
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set raised(val) {
    if (val != null) {
      this.element.classList.add('mdc-button--raised');
    } else {
      this.element.classList.remove('mdc-button--raised');
    }
  }


  connectedCallback() {
    super.connectedCallback()
    this.element.classList.add('mdc-button');
    new ripple.MDCRipple(this.element);
    this.render();
  }

}

customElements.define(MaterialButton.is, MaterialButton);