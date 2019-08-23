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


## To add application icons ORto override material icons.
```js
DwIcon.addIcons({
    {name}: {svgIcon}
});
```

e.g.

```js
DwIcon.addIcons({
    kerika_chat: svg``
});
```
> Icon must be added before it's usage. So, add application specific icons from app-shell only.