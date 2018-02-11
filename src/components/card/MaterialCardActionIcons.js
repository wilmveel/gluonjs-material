import {MaterialElement} from "../MaterialElement";

import CardStyle from "@material/card/mdc-card";
import {MaterialStyle} from "../MaterialStyle";

const block = `:host {display:block}`

class MaterialCardActionIcons extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      CardStyle.action_icons
    ]
  }

  get classes() {
    return [
      'mdc-card__action-icons'
    ]
  }

}

customElements.define(MaterialCardActionIcons.is, MaterialCardActionIcons);