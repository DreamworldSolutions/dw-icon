# @dreamworld/dw-icon

A LitElement-based web component that renders Material Icons (Filled, Outlined) and Material Symbols, with a built-in static registry for registering custom SVG icons and overriding existing ones.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-icon
```

The component delegates icon rendering to `@material/mwc-icon`, which requires the Material Icons font to be loaded via Google Fonts. Add the appropriate `<link>` tags to your HTML `<head>` depending on which icon sets you use:

```html
<!-- Required for default (Filled) icons -->
<link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">

<!-- Required when using iconFont="OUTLINED" -->
<link href="https://fonts.googleapis.com/css?family=Material+Icons+Outlined&display=block" rel="stylesheet">

<!-- Required when using the symbol attribute -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

Then import the component as an ES module:

```javascript
import '@dreamworld/dw-icon';
```

Or import the class directly if you need to call static methods:

```javascript
import { DwIcon } from '@dreamworld/dw-icon';
```

---

### Basic Usage

```html
<!-- Material Icon (Filled, default) -->
<dw-icon name="perm_media"></dw-icon>

<!-- Specific size -->
<dw-icon name="perm_media" size="48"></dw-icon>

<!-- Active state -->
<dw-icon name="perm_media" active></dw-icon>

<!-- Disabled state -->
<dw-icon name="perm_media" disabled></dw-icon>

<!-- Outlined variant -->
<dw-icon name="mark_as_unread" iconFont="OUTLINED"></dw-icon>

<!-- Material Symbols -->
<dw-icon name="phone_iphone" symbol></dw-icon>
```

---

### API Reference

#### Properties / Attributes

| Attribute  | Type    | Default    | Reflected | Description                                                                                          |
|------------|---------|------------|-----------|------------------------------------------------------------------------------------------------------|
| `name`     | String  | —          | No        | Icon identifier. Accepts a Material Icon name, a registered custom icon key, or legacy dot-notation (e.g. `navigator.more_vert`). |
| `size`     | Number  | `24`       | No        | Icon size in pixels. Sets `--mdc-icon-size`, `--dw-icon-width`, and `--dw-icon-height` via inline style. |
| `disabled` | Boolean | `false`    | No        | Disables pointer events and applies `--dw-icon-color-disabled`. Takes priority over `active`.        |
| `active`   | Boolean | `false`    | No        | Applies `--dw-icon-color-active`.                                                                    |
| `iconFont` | String  | `'FILLED'` | Yes       | Selects the icon font. Accepted values: `'FILLED'` (default) or `'OUTLINED'`.                        |
| `symbol`   | Boolean | `false`    | Yes       | When `true`, switches the font to `Material Symbols Outlined` via `--mdc-icon-font`.                  |

> `disabled` has higher precedence than `active`. When both are set, the icon renders in the disabled style.

#### Static Methods

| Method      | Signature                        | Return | Description                                                                                                                 |
|-------------|----------------------------------|--------|-----------------------------------------------------------------------------------------------------------------------------|
| `addIcons`  | `addIcons(iconsMap: Object): void` | `void` | Merges `iconsMap` into the global icon registry. Keys are icon names (optionally suffixed with `_<size>` for size variants). |

#### Events

No custom events are dispatched. Internally, `mousedown` and `touchstart` events have their propagation stopped at the host element to prevent unintended parent interactions.

#### Slots

None.

#### CSS Custom Properties

| Property                  | Description                             |
|---------------------------|-----------------------------------------|
| `--dw-icon-color`         | Default icon color.                     |
| `--dw-icon-color-active`  | Icon color when the `active` attribute is set.   |
| `--dw-icon-color-disabled`| Icon color when the `disabled` attribute is set. |

```css
dw-icon {
  --dw-icon-color: rgba(0, 0, 0, 0.6);
  --dw-icon-color-active: rgba(0, 0, 0, 0.87);
  --dw-icon-color-disabled: rgba(0, 0, 0, 0.38);
}
```

---

### Configuration Options

#### Icon size variants

When registering custom icons, a size-specific entry can be provided by appending `_<size>` to the key. The component resolves icon keys in this order:

1. `<name>_<size>` — size-specific variant
2. `<name>` — default variant
3. `<name>` passed directly to `mwc-icon` as a Material Icon name (fallback)

```javascript
DwIcon.addIcons({
  my_icon: svg`<svg viewBox="0 0 24 24">...</svg>`,    // used when size is unset or ≠ 16
  my_icon_16: svg`<svg viewBox="0 0 16 16">...</svg>`  // used when size="16"
});
```

---

### Advanced Usage

#### Adding custom SVG icons

Register custom icons **before** any `<dw-icon>` element renders them (e.g., from your app shell):

```javascript
import { DwIcon } from '@dreamworld/dw-icon';
import { svg } from '@dreamworld/pwa-helpers/lit.js';

DwIcon.addIcons({
  wellness_community: svg`<svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5..."></path>
  </svg>`,
  star_32: svg`<svg height="32px" viewBox="0 0 32 32" width="32px">
    <path d="M30,10h-9.031L18,1.672..."></path>
  </svg>`
});
```

```html
<dw-icon name="wellness_community"></dw-icon>
<dw-icon name="star" size="32"></dw-icon>
```

#### Overriding existing Material Icons

Use the same Material Icon name as the key to replace it with a custom SVG:

```javascript
DwIcon.addIcons({
  perm_media: svg`<svg viewBox="0 0 24 24"><!-- custom svg --></svg>`
});
```

#### Backward-compatible dot-notation names

Legacy icon names in `category.icon_name` format are supported. The component strips the category prefix and uses only the icon name portion:

```html
<!-- Resolves to "more_vert" -->
<dw-icon name="navigator.more_vert"></dw-icon>
```

> Names with more than one `.` separator will throw an error.

#### Material Symbols

Set the `symbol` attribute to switch to the `Material Symbols Outlined` font (requires the corresponding Google Fonts `<link>` in your HTML):

```html
<dw-icon name="phone_iphone" symbol></dw-icon>
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

#### Custom Element (Web Component)

`DwIcon` extends `LitElement` and registers as the `<dw-icon>` custom element. It delegates all icon rendering to `<mwc-icon>` from `@material/mwc-icon`, acting as a configurable adapter around it.

#### Icon Registry Pattern

A static class property `_iconsMap` holds the global registry of custom SVG icons. `addIcons` performs a shallow merge into this registry, making icons available to all instances immediately. The lookup in `_renderIcon` checks size-specific keys first, falls back to the base key, and finally falls through to the raw name (which `mwc-icon` resolves as a Material Icon ligature).

```
DwIcon._iconsMap = {
  "my_icon":    <svg ...>,   // default (24px)
  "my_icon_16": <svg ...>    // size variant
}
```

#### Reflected Attribute → CSS Selector Pattern

`iconFont` and `symbol` use `reflect: true`, which causes LitElement to write the attribute to the DOM. This allows the component's own shadow-DOM stylesheet to use `:host([iconfont='OUTLINED'])` and `:host([symbol])` attribute selectors to set `--mdc-icon-font`, switching the underlying font without any JavaScript branching in the render path.

#### CSS Token Delegation

The component exposes three consumer-facing CSS custom properties (`--dw-icon-color`, `--dw-icon-color-active`, `--dw-icon-color-disabled`) and maps them onto `mwc-icon`'s `color` property and the SVG `fill` attribute, with state variants driven by `:host([active])` and `:host([disabled])` selectors.

#### Event Suppression

`mousedown` and `touchstart` (registered as passive) listeners on the host call `e.stopPropagation()`. This prevents pointer events from bubbling to ancestor components (e.g., list items or buttons with their own ripple effects).
