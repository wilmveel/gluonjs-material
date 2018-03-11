import {MaterialElement} from "../MaterialElement";

import CardStyle from "@material/card/mdc-card";
import {MaterialStyle} from "../MaterialStyle";

const block = `:host {display:block}`

class MaterialCardActionButtons extends MaterialElement {

  get styles() {
    return [
      CardStyle.action_buttons,
      MaterialStyle.block
    ]
  }

  get classes() {
    return [
      'mdc-card__action-buttons'
    ]
  }

}

customElements.define(MaterialCardActionButtons.is, MaterialCardActionButtons);