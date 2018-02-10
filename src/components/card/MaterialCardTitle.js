import {GluonElement, html} from "gluonjs";

import cardStyle from "@material/card/mdc-card";
import typographyStyle from "@material/typography/mdc-typography";

const block = `:host {display:block}`

class MaterialCardTitle extends GluonElement {

  static get configurationAttrubuters() {
    return ['large'];
  }

  get template() {
    return html`<style>${block}${cardStyle.title}${typographyStyle.typography}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__title');
    this.classList.add('mdc-typography--title');
  }

}

customElements.define(MaterialCardTitle.is, MaterialCardTitle);
