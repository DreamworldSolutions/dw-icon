import { LitElement, html, css } from '@dreamworld/pwa-helpers/lit.js';
import { styleMap } from 'lit/directives/style-map.js';

// These are the mwc element needed by this element.
import '@material/mwc-icon';

export class DwIcon extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: inline-flex;
        }
        mwc-icon svg {
          fill: var(--dw-icon-color);
          width: var(--dw-icon-width, 24px);
          height: var(--dw-icon-height, 24px);
        }
        mwc-icon {
          color: var(--dw-icon-color);
        }
        :host([active]) mwc-icon svg {
          fill: var(--dw-icon-color-active);
        }
        :host([active]) mwc-icon {
          color: var(--dw-icon-color-active);
        }
        :host([disabled]) mwc-icon svg {
          fill: var(--dw-icon-color-disabled);
        }
        :host([disabled]) mwc-icon {
          color: var(--dw-icon-color-disabled);
        }
        :host([disabled]) {
          pointer-events: none;
        }

        :host([iconfont='OUTLINED']) {
          --mdc-icon-font: 'Material Icons Outlined';
        }

        :host([symbol]) {
          --mdc-icon-font: 'Material Symbols Outlined';
        }
      `
    ];
  }

  static get properties() {
    return {
      /**
       * name of icon
       */
      name: { type: String },

      /**
       * size of icon
       */
      size: { type: Number },

      /**
       * `true` if icon is disabled
       */
      disabled: { type: Boolean },

      /**
       * `true` if icon is active
       */
      active: { type: Boolean },

      /**
       * Type of the icon. By default it shows FILLED icon.
       * Possible values: FILLED and OUTLINED
       */
      iconFont: { type: String, reflect: true },

      /**
       * When it's `true`, shows `Material Symbols` icon.
       * [Reference](https://fonts.google.com/icons?icon.set=Material+Symbols)
       */
      symbol: { type: Boolean, reflect: true }
    }
  }

  constructor(){
    super();
    this.iconFont = 'FILLED';
  }

  render(){
    return html`
      <mwc-icon style=${this.size ? styleMap({ '--mdc-icon-size': `${this.size}px`, '--dw-icon-width': `${this.size}px`, '--dw-icon-height': `${this.size}px` }) : ''}>${this._renderIcon(this._getIconName(this.name), this.size)}</mwc-icon>
    `;
  }

  /**
   * set '_iconsMap' property
   * @param {Object} iconsMap
   */
  static addIcons(iconsMap){
    this._iconsMap = {...this._iconsMap, ...iconsMap};
  }

  /**
   *
   * @param {String} name
   * @param {String} size
   * @return {String} return icon
   */
  _renderIcon(name, size){
    if(this.constructor._iconsMap && this.constructor._iconsMap[`${name}_${size}`]){
      return this.constructor._iconsMap[`${name}_${size}`];
    }

    if(this.constructor._iconsMap && this.constructor._iconsMap[name]){
      return this.constructor._iconsMap[name];
    }

    return name;
  }

  /**
   * Support For `getIcon` backward compatible because in old icon name pased `{categoryName}.{iconName}`.
   * @returns {String} icon name.
   */
  _getIconName(iconName) {
    if(!iconName) {
      return '';
    }

    let aIcon = iconName.split('.');
    if(aIcon.length > 2) {
      throw new Error('valid icon name is passed.');
    }
    return aIcon[aIcon.length - 1];
  }
}

customElements.define('dw-icon', DwIcon);
