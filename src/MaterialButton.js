import { GluonElement, html } from 'gluonjs';
import style from '@material/button/mdc-button'
import * as ripple from '@material/ripple/index'

class MaterialButton extends GluonElement {

  constructor(){
    super();
    this.isText = true
  }

  get template() {
    if(!this.isText){
      return html`<style>${style}</style><slot></slot>`;
    }
    return html`<style>${style}</style><button class="mdc-button"><slot></slot></button>`;
  }

  get icon(){
    return "left"
  }

  connectedCallback() {
    super.connectedCallback()
    const slot = this.shadowRoot.querySelector( 'slot' );
    if(slot != null  && slot.assignedNodes().length > 1){
      console.log('assignedNodese', slot.assignedNodes())
      this.isText = false
      const button = this.querySelector( 'button, a' );
      button.classList.add('mdc-button');
      new ripple.MDCRipple(button)
    }else{
      const button = this.shadowRoot.querySelector('.mdc-button')
      new ripple.MDCRipple(button)
    }
    this.render()
  }

}

customElements.define(MaterialButton.is, MaterialButton);