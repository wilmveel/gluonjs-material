import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCTemporaryDrawerFoundation, util} from "@material/drawer/temporary";

import DrawerTemporaryStyle from "@material/drawer/temporary/mdc-temporary-drawer";

class MaterialDrawerTemporary extends MaterialElement {

  get styles() {
    return [
      MaterialStyle.host,
      DrawerTemporaryStyle.host,
      DrawerTemporaryStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-drawer',
      'mdc-drawer--temporary',
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.drawer = this.querySelector('material-drawer');

    const {FOCUSABLE_ELEMENTS, OPACITY_VAR_NAME} =
      MDCTemporaryDrawerFoundation.strings;

    this.foundation = new MDCTemporaryDrawerFoundation({
      addClass: (className) => this.classList.add(className),
      removeClass: (className) => this.classList.remove(className),
      hasClass: (className) => this.classList.contains(className),

      addBodyClass: (className) => document.body.classList.add(className),
      removeBodyClass: (className) => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),

      hasNecessaryDom: () => {
        return !!this.drawer
      },
      registerInteractionHandler: (evt, handler) => {
        this.addEventListener(util.remapEvent(evt), handler, util.applyPassive())
      },
      deregisterInteractionHandler: (evt, handler) => {
        this.removeEventListener(util.remapEvent(evt), handler, util.applyPassive())
      },

      registerDrawerInteractionHandler: (evt, handler) => {
        this.drawer.addEventListener(util.remapEvent(evt), handler)
      },
      deregisterDrawerInteractionHandler: (evt, handler) => {
        this.drawer.removeEventListener(util.remapEvent(evt), handler)
      },
      registerTransitionEndHandler: (handler) => {
        this.drawer.addEventListener('transitionend', handler)
      },
      deregisterTransitionEndHandler: (handler) => {
        this.drawer.removeEventListener('transitionend', handler)
      },

      registerDocumentKeydownHandler: (handler) => {
        document.addEventListener('keydown', handler)
      },
      deregisterDocumentKeydownHandler: (handler) => {
        document.removeEventListener('keydown', handler)
      },

      getDrawerWidth: () => {
        return this.drawer.offsetWidth
      },

      setTranslateX: (value) => {
        this.drawer.style.setProperty(
          util.getTransformPropertyName(),
          value === null ? null : `translateX(${value}px)`
        )
      },

      updateCssVariable: (value) => {
        if (util.supportsCssCustomProperties()) {
          this.style.setProperty(OPACITY_VAR_NAME, value)
        }
      },

      getFocusableElements: () => {
        return this.drawer.querySelectorAll(FOCUSABLE_ELEMENTS)
      },
      saveElementTabState: (el) => {
        util.saveElementTabState(el)
      },
      restoreElementTabState: (el) => {
        util.restoreElementTabState(el)
      },
      makeElementUntabbable: (el) => {
        el.setAttribute('tabindex', -1)
      },
      // notifyOpen: () => {
      //   this.$emit('change',true)
      //   this.$emit('open')
      // },
      // notifyClose: () => {
      //   this.$emit('change',false)
      //   this.$emit('close')
      // },
      // isRtl: () => {
      //   /* global getComputedStyle */
      //   return getComputedStyle(this.$el).getPropertyValue('direction') === 'rtl'
      // },
      // isDrawer: (el) => el === this.$refs.drawer,
    });

    this.foundation && this.foundation.init()


  }

  open() {
    this.foundation.open()
  }

  close() {
    this.foundation.close()
  }

}

customElements.define(MaterialDrawerTemporary.is, MaterialDrawerTemporary);
