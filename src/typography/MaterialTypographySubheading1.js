import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographySubheading1 extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--subheading1'
    ]
  }

}

customElements.define(MaterialTypographySubheading1.is, MaterialTypographySubheading1);