import {MaterialElement} from "../MaterialElement.js";
import {MaterialStyle} from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyDisplay3 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--display3'
    ]
  }

}

customElements.define(MaterialTypographyDisplay3.is, MaterialTypographyDisplay3);