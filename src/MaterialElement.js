import {GluonElement, html} from "../../node_modules/gluonjs/gluon.js";

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

  get initStyles() {
    return [];
  }

  get initClasses() {
    return [];
  }

  get content() {
    return html`<slot></slot>`;
  }

  get template(){
    const styles = this.initStyles.map(x => html`<style>${x}</style>`);
    return html`${styles}${this.content}`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(this.shadowRoot){
      this[attr] = newValue;
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.initClasses.forEach(c => this.classList.add(c));
    this.constructor.configurationAttributes.forEach(attr => this[attr] = this.getAttribute(attr))
  }

}

export {
  MaterialElement, html
}
