import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialCardStyle from "./MaterialCardStyle.js";

class MaterialCardActionButtons extends MaterialElement {

  get initStyles() {
    return [
      MaterialCardStyle.action_buttons,
      MaterialStyle.block
    ]
  }

  get initClasses() {
    return [
      'mdc-card__action-buttons'
    ]
  }

}

customElements.define(MaterialCardActionButtons.is, MaterialCardActionButtons);