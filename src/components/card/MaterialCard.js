import {MaterialElement} from "../MaterialElement";

import CardStyle from "@material/card/mdc-card";
import {MaterialStyle} from "../MaterialStyle";

class MaterialCard extends MaterialElement {

  get styles() {
    return [
      CardStyle.card,
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



