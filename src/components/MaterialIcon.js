import {GluonElement, html} from "gluonjs";
import * as slotedCssUtil from "../utils/SlotedCssUtil";

const slotStyle = slotedCssUtil(style)

class MaterialIcon extends GluonElement {

  get template() {
    return html`<i class="material-icons">favorite</i>`;
  }

  connectedCallback() {
    super.connectedCallback()
  }
}

customElements.define(MaterialIcon.is, MaterialIcon);