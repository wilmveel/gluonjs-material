import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographyBody1 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--body1'
    ]
  }

}

customElements.define(MaterialTypographyBody1.is, MaterialTypographyBody1);