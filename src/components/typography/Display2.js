import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographyDisplay2 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--display2'
    ]
  }

}

customElements.define(MaterialTypographyDisplay2.is, MaterialTypographyDisplay2);