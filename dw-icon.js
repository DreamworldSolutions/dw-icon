/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, LitElement, html } from 'lit-element';

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
      active: { type: Boolean }
    }
  }

  render(){
    return html `
      ${this.size ? html `
        <style>
          mwc-icon {
            --mdc-icon-size: ${this.size}px;
          }
        </style>
      ` : ''}
      <mwc-icon>${this._renderIcon(this.name, this.size)}</mwc-icon>
    `
  }

  /**
   * set '_iconsMap' property
   * @param {Object} iconsMap 
   */
  static addIcons(iconsMap){
    this._iconsMap = iconsMap;
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
}

window.customElements.define('dw-icon', DwIcon);
