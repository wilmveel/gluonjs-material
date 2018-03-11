import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCDialogFoundation} from "@material/dialog";

import DialogStyle from "@material/dialog/mdc-dialog";


class MaterialDialogBody extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      DialogStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-dialog__body'
    ]
  }

  connectedCallback(){
    super.connectedCallback();
  }

}


customElements.define(MaterialDialogBody.is, MaterialDialogBody);



