import {MaterialElement} from "../MaterialElement.js";
import MaterialStyle from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyTitle extends MaterialElement {

  get initStyles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--title'
    ]
  }

}

customElements.define(MaterialTypographyTitle.is, MaterialTypographyTitle);