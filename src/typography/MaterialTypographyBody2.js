import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyBody2 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--body2'
    ]
  }

}

customElements.define(MaterialTypographyBody2.is, MaterialTypographyBody2);