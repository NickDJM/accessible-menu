# BaseMenuToggle Class

A link or button that controls the visibility of a menu.

The BaseMenuToggle class holds all of the universal menu toggle properties and functions. It is not intended to be used by itself in the DOM-- use [DisclosureMenuToggle](disclosureMenuToggle.md) or [MenubarToggle](menubarToggle.md) instead.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuToggleElement | The toggle element in the DOM. | HTMLElement | true | `undefined` |
| parentElement | The element containing the controlled menu. | HTMLElement | true | `undefined` |
| controlledMenu | The menu controlled by this toggle. | BaseMenu | true | `undefined` |
| parentMenu | The menu containing this toggle. | BaseMenu\|null | false | `null` |

## Available getters

| Getter |  Description | Type |
| --- | --- | --- |
| dom | The DOM elements within the toggle. | object |
| elements | The elements within the toggle. | object |
| isOpen | The open state on the menu. | boolean |

## Available setters

### isOpen

Set the open state on the menu.

#### Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| value | The open state. | boolean | true | `undefined` |

## Available methods

### initialize

The initialize method does a lot of setup on the menu toggle.

The most basic setup steps are to ensure that the toggle has "aria-haspopup" set to "true", "aria-expanded" _initially_ set to "false and, if the toggle element is not a `<button>`, set the "role" to "button".

The next step to the initialization is to ensure both the toggle and the menu it controlls have IDs.

If they do not, the following steps take place:

- Generate a random 10 character string,
- Get the innerText of the toggle,
- Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
- Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`

Once the ID's have been generated, the menu's "aria-labelledby" is set to the toggle's ID, and the toggle's "aria-controls" is set to the menu's ID.

Finally, the collapse method is called to make sure the submenu is closed.

### expand

Expands the controlled menu.

Sets the toggle's "aria-expanded" to "true", adds the open class to the toggle's parent menu item and controlled menu, and removed the closed class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuExpand` which bubbles and contains the toggle object in `event.detail`.

#### exapand Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| emit | A toggle to emit the expand event once expanded. | boolean | false | `true` |

### collapse

Collapses the controlled menu.

Sets the toggle's "aria-expanded" to "false", adds the closed class to the toggle's parent menu item and controlled menu, and removed the open class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuCollapse` which bubbles and contains the toggle object in `event.detail`.

#### collapse Parameters

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| emit | A toggle to emit the collapse event once collapsed. | boolean | false | `true` |

### open

Sets the open state of the toggle to "true", runs the [expand](#expand) and [closeSiblings](#closeSiblings) methods.

Will also set the controlled menu's focus state to "self" and the parent menu's focus state to "none".

### preview

Sets the open state of the toggle to "true", runs the [expand](#expand) and [closeSiblings](#closeSiblings) methods.

Will also set the controlled menu's focus state to "none" and the parent menu's focus state to "self".

### close

Sets the open state of the toggle to "false", runs the [collapse](#collapse) and [closeChildren](#closeChildren) methods, blurs the controlled menu and sets it's current child index to 0.

Will also set the parent menu's focus state to "self".

### toggle

Toggles between the [open](#open) and [close](#close) methods depending on the toggle's open state.

### closeSiblings

Runs through all of the parent menu's submenu toggles and closes all of them (except for itself).

### closeChildren

Runs through all of the controlled menu's submenu toggles and closes all of them.

## Custom Events

### Expand

A custom event that is triggered when the toggle's `expand()` method is called.

Passes the toggle (`this`) as a property in the `details` property of the event.

| Name | Bubbles | Details |
| --- | --- | --- |
| accessibleMenuExpand | true | `{ toggle: this }` |

### Collapse

A custom event that is triggered when the toggle's `collapse()` method is called.

Passes the toggle (`this`) as a property in the `details` property of the event.

| Name | Bubbles | Details |
| --- | --- | --- |
| accessibleMenuCollapse | true | `{ toggle: this }` |
