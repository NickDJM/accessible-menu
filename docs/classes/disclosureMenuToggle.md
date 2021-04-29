# DisclosureMenuToggle Class

The menu toggle class used in Disclosure Menus.

Extends all functionality for the [BaseMenuToggle](baseMenuToggle.md) class.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuToggleElement | The toggle element in the DOM. | HTMLElement | true | `undefined` |
| parentElement | The element containing the controlled menu. | HTMLElement | true | `undefined` |
| controlledMenu | The menu controlled by this toggle. | DisclosureMenu | true | `undefined` |
| openClass | The class to apply when the controlled menu is "open". | string\|string[]\|null | false | `"show"` |
| closeClass | The class to apply when the controlled menu is "closed". | string\|string[]\|null | false | `"hide"` |
| parentMenu | The menu containing this toggle. | DisclosureMenu\|null | false | `null` |

## Available getters

See [BaseMenuToggle](baseMenuToggle.md#available-getters) for a list of inherited getters.

## Available setters

See [BaseMenuToggle](baseMenuToggle.md#available-setters) for a list of inherited setters.

## Available methods

See [BaseMenuToggle](baseMenuToggle.md#available-methods) for a list of inherited methods.
