import { LitElement, html, css ,svg} from '@dreamworld/pwa-helpers/lit.js';
import { DwIcon } from '../dw-icon';

import '@material/mwc-icon';

DwIcon.addIcons(
  { 
    'wellness_community': svg `<svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>`,
    'star_32': svg`<svg height="32px" viewBox="0 0 32 32" width="32px">
    <path d="M30,10h-9.031L18,1.672C17.641,0.422,16.813,0,16,0s-1.641,0.422-2,1.672L11.031,10H2c-1.141,0-2,0.938-2,2  c0,0.859,0.438,1.359,1.19,2l6.623,5l-3.208,9C4.234,28.922,4,29.484,4,30c0,0.984,0.766,2,2,2c0.719,0,1.016-0.25,2-0.895l8-6.021  l8,6.021C24.984,31.75,25.281,32,26,32c1.234,0,2-1.016,2-2c0-0.516-0.234-1.078-0.605-2l-3.208-9l6.623-5  c0.753-0.641,1.19-1.141,1.19-2C32,10.938,31.141,10,30,10z M19.433,17.577l2.477,6.948L16,20.077l-5.909,4.448l2.477-6.948  L7.829,14h6.022L16,7.974L18.148,14h6.022L19.433,17.577z"/></svg>
      </svg>`
  }
);

export class DwIconDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        dw-icon {
          --dw-icon-color: rgba(0, 0, 0, 0.6);
        }
        .activeIcon {
          --dw-icon-color-active: rgba(0, 0, 0, 0.87);
        }
        .disabledIcon {
          --dw-icon-color-disabled: rgba(0, 0, 0, 0.38);
        }
         section div {
          margin: 10px 20px;
        }
        .container{
          display:flex;
          flex-direction: row;
        }
        .icon{
          display:flex;
          flex-direction: column;
          align-items: center;
        }
      `
    ];
  }

  render(){
    return html `
     <section>
      <h3> Material Icons </h3>
      <section class="container">
        <div class="icon">
          <h4>Default</h4>
          <dw-icon name="perm_media"></dw-icon>
        </div>

        <div class="icon">
          <h4>Active</h4>
          <dw-icon name="perm_media" active class="activeIcon"></dw-icon>
        </div>

        <div class="icon">
          <h4>Disabled</h4>
          <dw-icon name="perm_media" disabled class="disabledIcon"></dw-icon>
        </div>

        <div class="icon">
          <h4>Size: 48</h4>
          <dw-icon name="perm_media" size="48"></dw-icon>
        </div>
      </section>
    </section>
    <section>
      <h3> Custom SVG Icons </h3>
      <section class="container">
        <div class="icon">
          <h4>community</h4>
          <dw-icon name="wellness_community" id="customIcon"></dw-icon>
        </div>

        <div class="icon">
          <h4>star (32)</h4>
          <dw-icon name="star" id="sizeIcon" size="32"></dw-icon>
        </div>
      </section>
    </section>

    <section>
      <h3> Backward compatible for get Icon method</h3>
      <section class="container">
        <div class="icon">
          <h4>more vert</h4>
          <dw-icon name="navigator.more_vert"></dw-icon>
        </div>
        </div>
      </section>
    </section>

    <section>
      <h3> Outlined Icons</h3>
      <section class="container">
        <div class="icon">
          <h4>Media</h4>
          <dw-icon name="perm_media" iconFont="OUTLINED"></dw-icon>
        </div>

        <div class="icon">
          <h4>Mark as unread</h4>
          <dw-icon name="mark_as_unread" iconFont="OUTLINED"></dw-icon>
        </div>

        </div>
      </section>
    </section>

    <section>
      <h3> Material Symbols</h3>
      <section class="container">
        <div class="icon">
          <h4>Phone Iphone</h4>
          <dw-icon name="phone_iphone" symbol></dw-icon>
        </div>
      </section>
    </section>
    `
  }
}

window.customElements.define('dw-icon-demo', DwIconDemo); 
