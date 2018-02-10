import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographyHeadline extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.headline
    ]
  }

  get classes() {
    return [
      'mdc-typography--headline'
    ]
  }

}

customElements.define(MaterialTypographyHeadline.is, MaterialTypographyHeadline);