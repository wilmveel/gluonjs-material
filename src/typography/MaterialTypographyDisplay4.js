import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyDisplay4 extends MaterialElement {

  get initStyles() {
    return [
      TypographyStyle.host,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--display4'
    ]
  }

}

customElements.define(MaterialTypographyDisplay4.is, MaterialTypographyDisplay4);