import {MaterialElement} from "../MaterialElement.js";
import {MaterialStyle} from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

class MaterialTypographyTitle extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--title'
    ]
  }

}

customElements.define(MaterialTypographyTitle.is, MaterialTypographyTitle);