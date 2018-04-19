import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialCardStyle from "./MaterialCardStyle.js";

class MaterialCardActionIcons extends MaterialElement {

  get initStyles() {
    return [
      MaterialCardStyle.action_icons,
      MaterialStyle.block
    ]
  }

  get initClasses() {
    return [
      'mdc-card__action-icons'
    ]
  }

}

customElements.define(MaterialCardActionIcons.is, MaterialCardActionIcons);