# MenubarToggle Class

The menu toggle class used in Menubars.

Extends all functionality for the [BaseMenuToggle](baseMenuToggle.md) class.

## Parameters

All Parameters _must_ be contained in a single object.

| Paramter | Description | Type | Required | Default Value |
| --- | --- | --- | --- | --- |
| menuToggleElement | The toggle element in the DOM. | HTMLElement | true | `undefined` |
| parentElement | The element containing the controlled menu. | HTMLElement | true | `undefined` |
| controlledMenu | The menu controlled by this toggle. | Menubar | true | `undefined` |
| parentMenu | The menu containing this toggle. | Menubar\|null | false | `null` |
| initialize | A flag to initialize the menu toggle immediately upon creation. | boolean | false | `true` |

## Available getters

See [BaseMenuToggle](baseMenuToggle.md#available-getters) for a list of inherited getters.

## Available setters

See [BaseMenuToggle](baseMenuToggle.md#available-setters) for a list of inherited setters.

## Available methods

See [BaseMenuToggle](baseMenuToggle.md#available-methods) for a list of inherited methods.

### Initialize

Initialize will be called immediately upon creation unless `initialize: false` is passed as a parameter to the menu toggle.

The initialize function will run [BaseMenuToggles's initialize method](baseMenuToggle.md#initialize).
