# dw-icon

An element, used to show an icon in Dreamworld Apps.

## Usage
```js
npm install --save @dreamworld/dw-icon
```

```html
<dw-icon name="action_alarm"></dw-icon>
```

It internally uses `@material/mwc-icon` to render material icons. But, User is allowed to override any of the 
material icon (if necessary). And can add any application specific icons as well.

## Properties
- name (String)
- size (Number)
- disabled (Boolean)
- active (Boolean)

## Custom CSS Properties

```
--dw-icon-color-active
--dw-icon-color
--dw-icon-color-disabled
```

## Size 
By default icon is rendered in `24px` size. You can render it in different size when needed.


```html
<dw-icon name="action_alarm" size="16"></dw-icon>
```

> If application specific icon 

## Add application icons 
```js
DwIcon.addIcons({
    {icon_name}: {svgIcon}
});
```

e.g.

```js
DwIcon.addIcons({
    kerika_chat: svg``
});
```
`icon_name` is used to set different sized icons. e.g.
```js
DwIcon.addIcons({
    kerika_chat: {svgIcon},
    kerika_chat_16: {svgIcon}
});
```

`kerika_chat` is default sized (24px) icon. While `kerika_chat_16` is of 16px size.

> Icon must be added before it's usage. So, add application specific icons from app-shell only.

## Override material icons
This could be done in the same way as **Add application icons**. Just use material icon's name as `name`.