import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyDisplay2 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--display2'
    ]
  }

}

customElements.define(MaterialTypographyDisplay2.is, MaterialTypographyDisplay2);