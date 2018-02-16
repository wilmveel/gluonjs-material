import {MaterialElement} from "../MaterialElement";
import {MaterialStyle} from "../MaterialStyle";

import {MDCToolbarFoundation, util} from "@material/toolbar";

import ToolbarStyle from "@material/toolbar/mdc-toolbar";

class MaterialToolbar extends MaterialElement {

  get styles() {
    return [
      ToolbarStyle.host,
      ToolbarStyle.slotted
    ]
  }

  get classes() {
    return [
      'mdc-toolbar',
      'mdc-toolbar--fixed'
    ]
  }

  connectedCallback() {
    super.connectedCallback()

    this.foundation = new MDCToolbarFoundation({
      addClass: (className) => this.classList.add(className),
      removeClass: (className) => this.classList.remove(className),
      hasClass: (className) => this.classList.contains(className),

      registerScrollHandler: (handler) => {
        window.addEventListener('scroll', handler, util.applyPassive())
      },
      deregisterScrollHandler: (handler) => {
        window.removeEventListener('scroll', handler, util.applyPassive())
      },
      registerResizeHandler: (handler) => {
        window.addEventListener('resize', handler)
      },
      deregisterResizeHandler: (handler) => {
        window.removeEventListener('resize', handler)
      },

      getViewportWidth: () => {
        return window.innerWidth
      },
      getViewportScrollY: () => {
        return window.pageYOffset
      },

      getOffsetHeight: () => {
        return this.offsetHeight
      },
      getFirstRowElementOffsetHeight: () => {
        let el = this.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR)
        return (el) ? el.offsetHeight : undefined
      },
      // notifyChange: (evtData) => {
      //   this.$emit('change', evtData)
      // },
      setStyle: (property, value) => {
        this.style[property] = value;
      },
      setStyleForTitleElement: (property, value) => {
        let el = this.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR)
        if (el) el.style.setProperty(property, value)
      },
      setStyleForFlexibleRowElement: (property, value) => {
        let el = this.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR)
        if (el) el.style.setProperty(property, value)
      },
      setStyleForFixedAdjustElement: (property, value) => {
        //this.$set(this.adjustStyles, property, value)
        this.style.setProperty(property, value)
      }
    })
    this.foundation.init()
  }
}

customElements.define(MaterialToolbar.is, MaterialToolbar);