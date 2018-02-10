import {GluonElement, html} from "gluonjs";
import style from "@material/list/mdc-list";

class MaterialList extends GluonElement {

  get template() {
    return html`<style>${style}${slotStyle}</style><ul class="mdc-list"><slot></slot></ul>`;
  }

  connectedCallback() {
    super.connectedCallback()
  }
}

class MaterialListItem extends GluonElement {

  get template() {
    return html`<style>${style}${slotStyle}</style><li class="mdc-list-item"><slot></slot></li>`;
  }

  connectedCallback() {
    super.connectedCallback()
  }
}

customElements.define(MaterialList.is, MaterialList);
customElements.define(MaterialListItem.is, MaterialListItem);