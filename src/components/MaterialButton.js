import {GluonElement, html} from "gluonjs";
import {keyframes, style, slotted} from "@material/button/mdc-button.scss";
import * as ripple from "@material/ripple/index";

(function () {

  const head = document.head;
  const style = document.createElement('style');

  style.type = 'text/css';
  style.appendChild(document.createTextNode(keyframes));

  head.appendChild(style);

})();

class MaterialButton extends GluonElement {

  constructor() {
    super();
    this.isText = true;
    this.props = {
      disabled: false,
      raised: false
    }
  }

  static get observedAttributes() {
    return ['disabled', 'raised'];
  }

  get template() {
    if (!this.isText) {
      return html`<style>${keyframes}${slotted}</style><slot></slot>`;
    }
    return html`<style>${keyframes}${style}</style><button class="mdc-button" disabled="${this.disabled}"><slot></slot></button>`;
  }

  get disabled() {
    return this.props.disabled;
  }

  set disabled(val) {
    this.props.disabled = (val != null);
    this.render();
  }

  get raised() {
    return this.props.raised ? 'mdc-button--raised' : '';
  }

  set raised(val) {
    if (val != null && this.button) {
      this.button.classList.add('mdc-button--raised')
    } else {
      this.button.classList.remove('mdc-button--raised')
    }
    this.render();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'disabled') {
      this.disabled = newValue;
    }
    if (this.shadowRoot != null && attr == 'raised') {
      this.raised = newValue;
    }
  }

  connectedCallback() {
    super.connectedCallback()
    const slot = this.shadowRoot.querySelector('slot');

    if (slot != null && slot.assignedNodes().length == 1) {
      this.button = this.shadowRoot.querySelector('.mdc-button')
      new ripple.MDCRipple(this.button)
    }

    else if (slot != null && slot.assignedNodes().length == 3) {
      this.isText = false;
      this.button = this.querySelector('button, a, input');
      this.button.classList.add('mdc-button');
      new ripple.MDCRipple(this.button)
    }

    else if (slot != null && slot.assignedNodes().length > 3) {
      throw new Error('Cannot reflext complex light dom')
    }

    MaterialButton.observedAttributes.forEach(attr => {
      this.attributeChangedCallback(attr, null, this.getAttribute(attr));
    });

    this.render();
  }

}

customElements.define(MaterialButton.is, MaterialButton);