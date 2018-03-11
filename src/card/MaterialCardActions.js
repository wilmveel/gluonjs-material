import {MaterialElement} from "../MaterialElement";

import CardStyle from "@material/card/mdc-card";
import {MaterialStyle} from "../MaterialStyle";

class MaterialCardActions extends MaterialElement {

  get styles() {
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