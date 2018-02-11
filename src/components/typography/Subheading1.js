import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographySubheading1 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--subheading1'
    ]
  }

}

customElements.define(MaterialTypographySubheading1.is, MaterialTypographySubheading1);