import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographyDisplay3 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--display3'
    ]
  }

}

customElements.define(MaterialTypographyDisplay3.is, MaterialTypographyDisplay3);