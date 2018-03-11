import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCDialogFoundation} from "@material/dialog";
import DialogStyle from "@material/dialog/mdc-dialog";


class MaterialDialogHeader extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      DialogStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-dialog__header'
    ]
  }

  connectedCallback(){
    super.connectedCallback();
  }

}


customElements.define(MaterialDialogHeader.is, MaterialDialogHeader);



