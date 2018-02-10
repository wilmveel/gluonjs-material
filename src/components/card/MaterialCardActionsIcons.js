import {MaterialElement, html} from "../MaterialElement";
import style from "@material/card/mdc-card";

class MaterialCardActionsIcons extends MaterialElement {

  get template() {
    return html`<style>${this.blockStyle}${style.actions_icons}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('mdc-card__actions-icons');
  }
}

customElements.define(MaterialCardActionsIcons.is, MaterialCardActionsIcons);