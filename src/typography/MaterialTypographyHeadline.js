import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyHeadline extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--headline'
    ]
  }

}

customElements.define(MaterialTypographyHeadline.is, MaterialTypographyHeadline);