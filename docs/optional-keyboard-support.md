# Optional Keyboard Support

Accessible Menu supports keyboard navigation out of the box. However, for Disclosure Menus and Top Link Disclosure Menus there are addional keybindings that are optional in the ARIA Authoring Practices Guide (APG).

Specifically, the APG states that the following keybindings should be optional:

- **<kbd>Down Arrow</kbd>** : Moves focus to the next item.
- **<kbd>Right Arrow</kbd>** : Moves focus to the next item.
- **<kbd>Up Arrow</kbd>** : Moves focus to the previous item.
- **<kbd>Left Arrow</kbd>** : Moves focus to the previous item.
- **<kbd>Home</kbd>** : Moves focus to the first item.
- **<kbd>End</kbd>** : Moves focus to the last item.

See the [Keyboard Support](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/#kbd_label) section for a full breakdown of the optional key support.

To enable these optional keybindings, you can use the `optionalKeySupport` option.

```js
// DisclosureMenu is used in this example.
// TopLinkDisclosureMenu supports the optionalKeySupport option as well.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  optionalKeySupport: true, // Default: false.
});
```
