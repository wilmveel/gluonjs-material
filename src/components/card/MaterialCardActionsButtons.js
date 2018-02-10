import {MaterialElement, html} from "../MaterialElement";
import style from "@material/card/mdc-card";

class MaterialCardActionsButtons extends MaterialElement {

  get template() {
    return html`<style>${this.blockStyle}${style.actions_buttons}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('mdc-card__actions-buttons');
  }
}

customElements.define(MaterialCardActionsButtons.is, MaterialCardActionsButtons);