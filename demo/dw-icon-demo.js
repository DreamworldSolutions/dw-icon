/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css, LitElement, html, svg } from 'lit-element';
import { DwIcon } from '../dw-icon';

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
      `
    ];
  }

  render(){
    return html `
      <h4>Material icon </h4>
      <dw-icon name="3d_rotation"></dw-icon>

      <h4>Active icon </h4>
      <dw-icon name="perm_media" active class="activeIcon"></dw-icon>

      <h4>Disabled icon </h4>
      <dw-icon name="search" disabled class="disabledIcon"></dw-icon>

      <h4>Custom icon </h4>
      <dw-icon name="wellness_community" id="customIcon"></dw-icon>

      <h4>Custom icon  with 48 size</h4>
      <dw-icon name="twitter" id="sizeIcon" size="48"></dw-icon>

      <h4>Material icon with 48 size</h4>
      <dw-icon name="3d_rotation" size="48"></dw-icon>
    `
  }

  firstUpdated(){
    DwIcon.addIcons(
      { 
        'wellness_community': svg `<svg height="24" viewBox="0 0 24 24" width="24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>`,
        'twitter_48': svg`<svg width="48px" height="48px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">  <image id="image0" width="48" height="48" x="0" y="0"
              xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
              cwAACxMAAAsTAQCanBgAAAAHdElNRQfjCBwKBxlQBtu7AAAB3UlEQVRYw+2WPWhTURiGn1aaiOmi
              RehgERwCNllCGk2HUlDBUFqHgtChVETooIMgoS6COFQXh0K7VUHpUtBODo1NK3QICqF0KGinoBZL
              K2g0NJA2P9chBZPce8/PDdnue6bLeb/n/c53f7jgypWrlqvNcWWEK/QAGZJs6RR2KngCfMSoWQl6
              APBwm2ey4k8MSxzXyNXhDQx+cJ83/KZCSFwcxqDAkMDh548J/389ATyigDsYGBSI2Tre28JLPOUm
              r7krCnh0bC4yjddi/4Kg++paFI9ossb6mahpf1yCf0WHOOBynb3MC4J1+1NC/CwK2jaVpYjTSzsA
              94QBN1QCrlOxLM6T5h1rwoCrcvx5OngovZF2K2IGtjdcj7FDgA2Vo1poV24Zcdy9wS+VHnzsOQ74
              YAVsHFGexw7HAwk12wlWHZ7gomonHhYc4NN6x42xxJFWwLgO/jkpvlPSwH8Vf6QbNag9oFHdJ2JO
              C7+si4c2ZpXx3zirHwAQJcmhFJ8n7AxflZeXQnyOgWbwfaSE+H0uOUWf45YEbrBGty62n3mWWCcj
              nXyWB6bvmJL8vJW+YAfMcKaZyXcTJ03REr3CBD4dmP3P70lCBOniNKf4S5afbPKFcjOdu3LlqkX6
              B/NiPyvDhzlzAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA4LTI4VDEwOjA3OjI1KzAzOjAwB+dy
              OQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wOC0yOFQxMDowNzoyNSswMzowMHa6yoUAAAAASUVO
              RK5CYII=" />
          </svg>`
      }
    )
  }
}

window.customElements.define('dw-icon-demo', DwIconDemo);
