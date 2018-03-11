import {MaterialElement} from "../MaterialElement.js";
import {MDCRipple} from "../ripple/MaterialRippleBehaviour.js";
import ButtonStyle from "./MaterialButtonStyle.js";

MaterialElement.globalStyle(ButtonStyle.keyframes)

console.log(ButtonStyle);

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

  get initStyles() {
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

  get initClasses() {
    if (!this.hasSlotted) {
      return ['mdc-button'];
    }
    return [];
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
    new MDCRipple(this.element);
    this.render();
  }

}

customElements.define(MaterialButton.is, MaterialButton);