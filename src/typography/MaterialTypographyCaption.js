import {MaterialElement} from "../MaterialElement.js";
import {MaterialStyle} from "../MaterialStyle.js";
import TypographyStyle from "./MaterialTypographyStyle.js";

const block = `:host {display:block}`

class MaterialTypographyCaption extends MaterialElement {

  get initStyles() {
    return [
      TypographyStyle.host,
      TypographyStyle.slotted
    ]
  }

  get initClasses() {
    return [
      'mdc-typography--caption'
    ]
  }
}

customElements.define(MaterialTypographyCaption.is, MaterialTypographyCaption);