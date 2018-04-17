import {MaterialElement, html} from "../MaterialElement.js";
import TextFieldStyle from "./MaterialTextfieldStyle.js";
import {MDCTextFieldFoundation} from "./MaterialTextfieldBehaviour.js";
import {MDCFloatingLabelFoundation} from "../floating-label/MaterialFloatingLabelBehaviour.js";
import {MDCLineRippleFoundation} from "../line-ripple/MaterialLineRippleBehaviour.js";

MaterialElement.globalStyle(TextFieldStyle.keyframes)


class MaterialTextfield extends MaterialElement {

  get initStyles() {
    return [
      TextFieldStyle.keyframes,
      TextFieldStyle.host,
      TextFieldStyle.slotted,
      TextFieldStyle.label,
      TextFieldStyle.line
    ]
  }

  get initClasses() {
    return ['mdc-text-field'];
  }

  get content() {
    return html`<slot></slot>
    <label for="my-text-field" class="mdc-floating-label"> 13Text Field</label>
    <div class="mdc-line-ripple" style="transform-origin: 199px center 0px;"></div>`;
  }

  connectedCallback() {
    super.connectedCallback()

    this.input = this.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');
    this.bottom = this.shadowRoot.querySelector('.mdc-line-ripple');


    if (this.label) {
      this.labelFoundation = new MDCFloatingLabelFoundation({
        addClass: (className) => this.label.classList.add(className),
        removeClass: (className) => this.label.classList.remove(className),
        getWidth: () => this.label.offsetWidth,
        registerInteractionHandler: (evtType, handler) => {
          this.label.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: (evtType, handler) => {
          this.label.removeEventListener(evtType, handler);
        },
      });
      this.labelFoundation.init();
    }

    if (this.bottom) {
      this.bottomLineFoundation = new MDCLineRippleFoundation({
        addClass: (className) => this.bottom.classList.add(className),
        removeClass: (className) => this.bottom.classList.remove(className),
        hasClass: (className) => this.bottom.classList.contains(className),
        setStyle: (property, value) => {
          this.bottom.style[property] = value;
        },
        registerEventHandler: (evtType, handler) => {
          this.bottom.addEventListener(evtType, handler);
        },
        deregisterEventHandler: (evtType, handler) => {
          this.bottom.removeEventListener(evtType, handler);
        },
      });
      this.bottomLineFoundation.init();
    }


    this.foundation = new MDCTextFieldFoundation(
      {
        addClass: (className) => this.classList.add(className),
        removeClass: (className) => this.classList.remove(className),
        hasClass: (className) => this.classList.contains(className),

        registerTextFieldInteractionHandler: (evtType, handler) => {
          this.addEventListener(evtType, handler);
        },
        deregisterTextFieldInteractionHandler: (evtType, handler) => {
          this.removeEventListener(evtType, handler);
        },
        isFocused: () => {
          return document.activeElement === this.input;
        },

        isRtl: () =>
          window
            .getComputedStyle(this)
            .getPropertyValue('direction') === 'rtl',

        // deactivateLineRipple: () => {
        //   if (this.bottom) {
        //     this.bottom.deactivate();
        //   }
        // },
        // activateLineRipple: () => {
        //   if (this.bottom) {
        //     this.bottom.activate();
        //   }
        // },
        // setLineRippleTransformOrigin: normalizedX => {
        //   if (this.bottom) {
        //     this.bottom.setRippleCenter(normalizedX);
        //   }
        // },
        registerInputInteractionHandler: (evtType, handler) => {
          this.input.addEventListener(evtType, handler);
        },
        deregisterInputInteractionHandler: (evtType, handler) => {
          this.input.removeEventListener(evtType, handler);
        },
        registerValidationAttributeChangeHandler: handler => {
          const observer = new MutationObserver(handler);
          const targetNode = this.input;
          const config = {attributes: true};
          observer.observe(targetNode, config);
          return observer;
        },
        deregisterValidationAttributeChangeHandler: observer => {
          observer.disconnect();
        },
        shakeLabel: shouldShake => {
          this.labelFoundation.shake(shouldShake);
        },
        floatLabel: shouldFloat => {
          this.labelFoundation.float(shouldFloat);
        },
        hasLabel: () => {
          return !!this.label;
        },
        getLabelWidth: () => {
          return this.labelFoundation.getWidth();
        },
        getNativeInput: () => {
          return this.input;
        },
        hasOutline: () => !!this.hasOutline,
        // notchOutline: (notchWidth, isRtl) =>
        //   this.outlineFoundation.notch(notchWidth, isRtl),
        // closeOutline: () => this.outlineFoundation.closeNotch(),
      },
      {
        bottomLine: this.bottomLineFoundation,
        helperText: this.helperTextFoundation,
        icon: this.iconFoundation,
        label: this.labelFoundation,
        outline: this.outlineFoundation,
      },
    );


    this.foundation.init()
  }

}

customElements.define(MaterialTextfield.is, MaterialTextfield);