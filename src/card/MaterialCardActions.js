import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialCardStyle from "./MaterialCardStyle.js";

class MaterialCardActions extends MaterialElement {

  get initStyles() {
    return [
      CardStyle.actions,
      MaterialStyle.block
    ]
  }

  get classes() {
    return [
      'mdc-card__actions'
    ]
  }

}

customElements.define(MaterialCardActions.is, MaterialCardActions);