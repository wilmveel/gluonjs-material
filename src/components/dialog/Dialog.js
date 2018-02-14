import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";
import {MDCDialogFoundation} from "@material/dialog";
import DialogStyle from "@material/dialog/mdc-dialog";


class MaterialDialog extends MaterialElement {

  constructor() {
    super();

    this.surface = this.querySelector('material-dialog-surface');

    this.foundation = new MDCDialogFoundation({
      addClass: (className) => this.classList.add(className),
      removeClass: (className) => this.classList.remove(className),

      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),

      eventTargetHasClass: (target, className) => target.classList.contains(className),

      registerInteractionHandler: (evt, handler) => this.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => this.removeEventListener(evt, handler),

      registerSurfaceInteractionHandler: (evt, handler) => this.surface.addEventListener(evt, handler),
      deregisterSurfaceInteractionHandler: (evt, handler) => this.surface.removeEventListener(evt, handler),

      registerDocumentKeydownHandler: (handler) => document.addEventListener('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => document.removeEventListener('keydown', handler),

      registerTransitionEndHandler: (handler) => this.surface.addEventListener('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.surface.removeEventListener('transitionend', handler),

      // notifyAccept: () => this.$emit('accept'),
      // notifyCancel: () => this.$emit('cancel'),
      // trapFocusOnSurface: () => this.focusTrap.activate(),
      // untrapFocusOnSurface: () => this.focusTrap.deactivate(),
      isDialog: (el) => (this.surface === el),
      // layoutFooterRipples: () => {
      //   this.$refs.accept.ripple.layout()
      //   this.cancel && this.$refs.cancel.ripple.layout()
      // }


    });
    this.foundation.init();

  }

  open() {
    this.foundation.open()
  }

  close() {
    this.foundation.close()
  }

  get styles() {
    return [
      DialogStyle.host,
      DialogStyle.slotted,
    ]
  }

  get classes() {
    return [
      'mdc-dialog'
    ]
  }

  connectedCallback() {
    super.connectedCallback();
  }

}


customElements.define(MaterialDialog.is, MaterialDialog);



