import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographySubheading2 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.subheading1
    ]
  }

  get classes() {
    return [
      'mdc-typography--subheading1'
    ]
  }

}

customElements.define(MaterialTypographySubheading2.is, MaterialTypographySubheading2);