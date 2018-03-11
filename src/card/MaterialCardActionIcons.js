import {MaterialElement} from "../MaterialElement";

import CardStyle from "@material/card/mdc-card";
import {MaterialStyle} from "../MaterialStyle";

const block = `:host {display:block}`

class MaterialCardActionIcons extends MaterialElement {

  get styles() {
    return [
      CardStyle.action_icons,
      MaterialStyle.block
    ]
  }

  get classes() {
    return [
      'mdc-card__action-icons'
    ]
  }

}

customElements.define(MaterialCardActionIcons.is, MaterialCardActionIcons);