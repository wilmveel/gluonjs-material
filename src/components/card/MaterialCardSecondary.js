import {MaterialElement, html} from "../MaterialElement";

import cardStyle from "@material/card/mdc-card";
import typographyStyle from "@material/typography/mdc-typography";

const block = `:host {display:block}`

class MaterialCardSecondary extends MaterialElement {

  get template() {
    return html`<style>${this.blockStyle}${cardStyle.secondary}${typographyStyle.typography}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__secondary');
    this.classList.add('mdc-typography--body1');
  }

}

customElements.define(MaterialCardSecondary.is, MaterialCardSecondary);
