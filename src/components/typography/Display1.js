import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

class MaterialTypographyDisplay1 extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      TypographyStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-typography--display1'
    ]
  }

}

customElements.define(MaterialTypographyDisplay1.is, MaterialTypographyDisplay1);