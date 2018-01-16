import { GluonElement, html } from 'gluonjs';
import style from '@material/button/mdc-button'
import * as ripple from '@material/ripple/index'

class MaterialButton extends GluonElement {



  get style() {
    return html`<style>${style}</style>`;
  }

  get template() {
    return html`${this.style}<button class="mdc-button">Button</button>`;
  }

  get icon(){
    return "left"
  }
  connectedCallback() {
    super.connectedCallback()

    const button = this.shadowRoot.querySelector('.mdc-button')
    new ripple.MDCRipple(button)

  }

}

customElements.define(MaterialButton.is, MaterialButton);