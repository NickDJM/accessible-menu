<script setup>
  import { ref, onMounted } from "vue";
  import { DisclosureMenu } from "../index.js";

  const singleLevel = ref(null);

  onMounted(() => {
    const disclosureMenu = new DisclosureMenu({
      menuElement: singleLevel.value,
    });
  });
</script>

# Disclosure Menus

Disclosure Menus are Accessible Menu's implementation of [Disclosure Navigation Menus](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/).

@todo: Write a basic description of what this menu is, and provide examples of how to set up a single-level menu, a multi-level menu, a collapsible menu, and other variations.

## Single-level Disclosure Menu

The following is an example of how you would set up a single-level Disclosure Menu.

::: code-group

```html
<nav id="disclosure-menu-single-level" aria-label="Single-level Disclosure Menu">
  <ul class="menu">
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Mammals</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Reptiles</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Amphibians</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Birds</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Fish</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Contact</a></li>
  </ul>
</nav>
```

```js
import { DisclosureMenu } from "accessible-menu";

const menu = document.querySelector("#example-menu .menu");

const disclosureMenu = new DisclosureMenu({
  menuElement: menu,
});
```

:::

### Live Example {#single-level-live-example}

<nav id="disclosure-menu-single-level" aria-label="Single-level Disclosure Menu" class="example-menu disclosure-menu">
  <ul ref="singleLevel" class="menu">
    <li class="menu-item"><a class="menu-link" href="#">About</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Mammals</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Reptiles</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Amphibians</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Birds</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Fish</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Map</a></li>
    <li class="menu-item"><a class="menu-link" href="#">Contact</a></li>
  </ul>
</nav>
