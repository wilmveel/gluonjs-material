import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCDialogFoundation} from "@material/dialog";
import DialogStyle from "@material/dialog/mdc-dialog";


class MaterialDialogFooter extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      DialogStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-dialog__footer'
    ]
  }

  connectedCallback(){
    super.connectedCallback();
  }

}


customElements.define(MaterialDialogFooter.is, MaterialDialogFooter);



