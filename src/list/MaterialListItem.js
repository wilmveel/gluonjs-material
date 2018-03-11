import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import ListStyle from "@material/list/mdc-list";

class MaterialListItem extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      ListStyle.host,
      ListStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-list-item'
    ]
  }
}

customElements.define(MaterialListItem.is, MaterialListItem);