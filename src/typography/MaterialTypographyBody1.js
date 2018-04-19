import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";

import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyBody1 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--body1'
    ]
  }

}

customElements.define(MaterialTypographyBody1.is, MaterialTypographyBody1);