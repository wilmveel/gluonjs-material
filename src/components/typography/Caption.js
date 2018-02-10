import {MaterialElement, html} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import TypographyStyle from "@material/typography/mdc-typography";

const block = `:host {display:block}`

class MaterialTypographyCaption extends MaterialElement {

  get styles() {
    return [
      TypographyStyle.caption
    ]
  }

  get classes() {
    return [
      'mdc-typography--caption'
    ]
  }
}

customElements.define(MaterialTypographyCaption.is, MaterialTypographyCaption);