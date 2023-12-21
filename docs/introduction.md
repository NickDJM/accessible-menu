# Introduction

## What is Accessible Menu?

Accessible Menu is a JavaScript framework for generating WCAG-compliant navigation elements. It takes the menus you build in HTML and applies ARIA roles, attributes, and keybindings to them following the standards defined in the [ARIA Authoring Practices Guide (APG)](https://w3.org/WAI/ARIA/apg/).

Here is an example:

```html
<nav id="example-menu" aria-label="Example">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```js
import { DisclosureMenu } from "accessible-menu";

const menu = new DisclosureMenu({
  menuElement: document.querySelector("#example-menu");
});
```
