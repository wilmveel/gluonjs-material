import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyDisplay1 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--display1'
    ]
  }

}

customElements.define(MaterialTypographyDisplay1.is, MaterialTypographyDisplay1);