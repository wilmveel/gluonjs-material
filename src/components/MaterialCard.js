import {GluonElement, html} from "gluonjs";
import style from "@material/card/mdc-card";
import * as slotedCssUtil from "../utils/SlotedCssUtil";

const slotStyle = slotedCssUtil(style)

class MaterialCard extends GluonElement {

  get template() {
    return html`<style>${style}${slotStyle}</style><div class="mdc-card"><slot></slot></div>`;
  }

}

class MaterialCardMedia extends GluonElement {
  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__media');
  }
}

class MaterialCardPrimary extends GluonElement {

  get template() {
    return html`<style>${slotStyle}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__primary');
  }

}

class MaterialCardSupportingText extends GluonElement {

  get template() {
    return html`<style>${style}</style><section class="mdc-card__supporting-text"><slot></slot></section>`;
  }

}

class MaterialCardActions extends GluonElement {

  static get observedAttributes() {
    return ['vertical'];
  }

  get template() {
    return html`<style>${style}${slotStyle}</style><slot></slot>`;
  }

  set vertical(val) {

    if (val != null) {
      this.classList.add('mdc-card__actions--vertical')
    } else {
      this.classList.remove('mdc-card__actions--vertical')
    }
    this.render();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'vertical') {
      this.vertical = newValue;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.classList.add('mdc-card__actions');

    const buttons = this.querySelectorAll('material-button');
    buttons.forEach(el => el.classList.add('mdc-card__actions'))

    MaterialCardActions.observedAttributes.forEach(attr => {
      this.attributeChangedCallback(attr, null, this.getAttribute(attr));
    });

    this.render()
  }
}

customElements.define(MaterialCard.is, MaterialCard);
customElements.define(MaterialCardMedia.is, MaterialCardMedia);
customElements.define(MaterialCardPrimary.is, MaterialCardPrimary);
customElements.define(MaterialCardSupportingText.is, MaterialCardSupportingText);
customElements.define(MaterialCardActions.is, MaterialCardActions);