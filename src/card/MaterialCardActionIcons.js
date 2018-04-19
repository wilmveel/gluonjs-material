import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialCardStyle from "./MaterialCardStyle.js";
class MaterialCardActionIcons extends MaterialElement {

  get initStyles() {
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