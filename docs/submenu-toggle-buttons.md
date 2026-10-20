# Separate links and toggles in submenus

A menu item can have a link to a page and a separate button to open its submenu. This lets someone follow the link without opening the submenu, or open the submenu without leaving the page.

[Top Link Disclosure Menus](./top-link-disclosure-menus) use this pattern at the top level by default. Below the top level, a link acts as the submenu toggle instead. You can use separate links and buttons at every level by setting `submenuSubtogglesSelector` to `"button"`.

## Set up the menu

Place the link, button, and submenu inside the same list item. Give each button a name that tells someone which submenu it controls.

::: code-group

```html
<nav id="creature-menu" aria-label="Creature Classifications">
  <ul>
    <li><a href="#humanoids">Humanoids</a></li>
    <li>
      <a href="#dragons">Dragons</a>
      <button type="button" aria-label="Toggle Dragons submenu"></button>
      <ul>
        <li>
          <a href="#chromatic-dragons">Chromatic Dragons</a>
          <button
            type="button"
            aria-label="Toggle Chromatic Dragons submenu"
          ></button>
          <ul>
            <li><a href="#red-dragons">Red Dragons</a></li>
            <li><a href="#black-dragons">Black Dragons</a></li>
          </ul>
        </li>
        <li><a href="#metallic-dragons">Metallic Dragons</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

```js
import { TopLinkDisclosureMenu } from "accessible-menu";

const menu = document.querySelector("#creature-menu ul");

const disclosureMenu = new TopLinkDisclosureMenu({
  menuElement: menu,
  submenuSubtogglesSelector: "button",
});
```

:::

The Dragons button opens the first submenu. The Chromatic Dragons button opens the submenu inside it. Both links keep their normal navigation behaviour.

Accessible Menu sets up the buttons' `aria-expanded` and `aria-controls` attributes. This example only shows the menu structure and configuration. Accessible Menu does not provide CSS to style it or hide and show its submenus. See [Opening and Closing the Menu](./opening-and-closing) for how the open and closed classes are applied.

## Choose which elements act as toggles

Top Link Disclosure Menu uses two selector options:

- `submenuTogglesSelector` chooses toggles in the root menu. Its default is `"button"`.
- `submenuSubtogglesSelector` chooses toggles at every level below the root menu. Its default is `"a"`.

Setting `submenuSubtogglesSelector` to `null` uses the same selector as `submenuTogglesSelector`. This is useful if you use a custom selector, such as a class, and want it to apply at every level. The selector must match the toggle elements in your markup.

These options choose the elements that open submenus. Separate navigation links and toggle items are part of Top Link Disclosure Menu's behaviour. The other built-in menu types use combined submenu items by default.
