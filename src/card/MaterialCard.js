import {MaterialElement} from "../MaterialElement";

import MaterialStyle from "../../MaterialStyles.js";
import * as MaterialCardStyle from "./MaterialCardStyle.js";

class MaterialCard extends MaterialElement {

  get styles() {
    return [
      MaterialCardStyle.card,
      MaterialStyle.block
    ]
  }

  get classes() {
    return [
      'mdc-card'
    ]
  }

}

customElements.define(MaterialCard.is, MaterialCard);



