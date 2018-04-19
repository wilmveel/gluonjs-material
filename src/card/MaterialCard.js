import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import MaterialCardStyle from "./MaterialCardStyle.js";

class MaterialCard extends MaterialElement {

  get initStyles() {
    return [
      MaterialCardStyle.card,
      MaterialStyle.block
    ]
  }

  get initClasses() {
    return [
      'mdc-card'
    ]
  }

}

customElements.define(MaterialCard.is, MaterialCard);



