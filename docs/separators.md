# Separators

A menu can contain a separator between groups of links. Separators do not act as links or submenu toggles.

By default, `menuItemsSelector` is `"li"`, so Accessible Menu treats every direct list item as an interactive menu item. It expects each one to contain a link or a submenu toggle. Use a more specific selector to exclude separators.

## Separators in a Menubar

Give the separator `role="separator"` and exclude it from `menuItemsSelector`:

::: code-group

```html [HTML]
<nav aria-label="Main navigation">
  <ul id="main-menu" aria-label="Main navigation">
    <li><a href="/home">Home</a></li>
    <li>
      <a href="/resources">Resources</a>
      <ul>
        <li><a href="/guides">Guides</a></li>
        <li role="separator" aria-orientation="horizontal"></li>
        <li><a href="/support">Support</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

```js [JavaScript]
import { Menubar } from "accessible-menu";

const menu = new Menubar({
  menuElement: document.querySelector("#main-menu"),
  menuItemsSelector: "li:not([role='separator'])",
});
```

:::

The selector includes the list items containing links and excludes the separator. Child menus inherit the selector, so it also applies to the separator inside the Resources submenu.

The separator remains in the HTML with its role unchanged. Accessible Menu does not create a menu item for it or include it in arrow-key navigation. This follows the [APG Menu and Menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), where separators are not focusable or interactive.

::: info Styling separators

Accessible Menu does not provide CSS. Your project controls how the separator looks.

:::

## Using a class selector

You can also give interactive list items a class, such as `menu-item`, and use `menuItemsSelector: ".menu-item"` instead. Leave that class off separator items. Every list item that should act as a link or submenu toggle must match your selector, including those inside submenus.
