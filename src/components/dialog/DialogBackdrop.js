import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCDialogFoundation} from "@material/dialog";
import DialogStyle from "@material/dialog/mdc-dialog";


class MaterialDialogBackdrop extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.block,
      DialogStyle.host
    ]
  }

  get classes() {
    return [
      'mdc-dialog__backdrop'
    ]
  }

  connectedCallback(){
    super.connectedCallback();
  }

}

customElements.define(MaterialDialogBackdrop.is, MaterialDialogBackdrop);
