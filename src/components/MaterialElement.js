import {GluonElement, html} from "../../lib/gluon.js";

class MaterialElement extends GluonElement {

  constructor(){
    super();
  }
  static globalStyle(val) {

    const head = document.head;
    const style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(val));

    head.appendChild(style);
  }

  static get configurationAttributes() {
    return [];
  }

  static get observedAttributes() {
    return this.configurationAttributes;
  }

  get styles() {
    return [];
  }

  get classes() {
    return [];
  }

  get content() {
    return html`<slot></slot>`;
  }

  get template(){
    return html`<style>${this.styles.join('')}</style>${this.content}`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(this.shadowRoot){
      this[attr] = newValue;
    }
    this.render()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classes.forEach(c => this.classList.add(c));
    this.constructor.configurationAttributes.forEach(attr => this[attr] = this.getAttribute(attr))
  }

}

export {
  MaterialElement, html
}
