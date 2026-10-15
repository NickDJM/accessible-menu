# DOM Helpers

This API is provided by Core. Import it from `@accessible-ecosystem/core/domHelpers.js`. Accessible Menu no longer provides a local copy.

## addClass

Add a class or array of classes to an element.

```js
/**
 * @param {string|string[]} className - The class or classes to add.
 * @param {HTMLElement} element - The element to add the class to.classes.
 */
addClass(className, element);
```

## removeClass

Remove a class or array of classes from an element.

```js
/**
 * @param {string|string[]} className - The class or classes to remove.
 * @param {HTMLElement} element - The element to remove the class from.
 */
removeClass(className, element);
```

## selectAllFocusableElements

Select all focusable elements within a given context.

```js
function selectAllFocusableElements(context = document, fn = null) {}
```

| Parameter              | Type                              | Description                                                             |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `[context = document]` | `HTMLElement`                     | The context in which to search for focusable elements.                  |
| `[fn = null]`          | `?function(HTMLElement): boolean` | An optional addition filter function to process out focusable elements. |

Returns `HTMLElement[]` - An array of focusable elements.

## selectFirstFocusableElement

Select the first focusable element within a given context.

```js
function selectFirstFocusableElement(context = document, fn = null) {}
```

| Parameter              | Type                              | Description                                                             |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `[context = document]` | `HTMLElement`                     | The context in which to search for focusable elements.                  |
| `[fn = null]`          | `?function(HTMLElement): boolean` | An optional addition filter function to process out focusable elements. |

Returns `HTMLElement|boolean` - The first focusable element or false if none found.

## selectLastFocusableElement

Select the last focusable element within a given context.

```js
function selectLastFocusableElement(context = document, fn = null) {}
```

| Parameter              | Type                              | Description                                                             |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `[context = document]` | `HTMLElement`                     | The context in which to search for focusable elements.                  |
| `[fn = null]`          | `?function(HTMLElement): boolean` | An optional addition filter function to process out focusable elements. |

Returns `HTMLElement|boolean` - The last focusable element or false if none found.

## selectNextFocusableElement

Select the next focusable element relative to the given element within a context.

```js
function selectNextFocusableElement(element, context = document, fn = null) {}
```

| Parameter              | Type                              | Description                                                             |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `element`              | `HTMLElement`                     | The reference element.                                                  |
| `[context = document]` | `HTMLElement`                     | The context in which to search for focusable elements.                  |
| `[fn = null]`          | `?function(HTMLElement): boolean` | An optional addition filter function to process out focusable elements. |

Returns `HTMLElement|boolean` - The next focusable element or false if none found.

## selectPreviousFocusableElement

Select the previous focusable element relative to the given element within a context.

```js
function selectPreviousFocusableElement(
  element,
  context = document,
  fn = null
) {}
```

| Parameter              | Type                              | Description                                                             |
| ---------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `element`              | `HTMLElement`                     | The reference element.                                                  |
| `[context = document]` | `HTMLElement`                     | The context in which to search for focusable elements.                  |
| `[fn = null]`          | `?function(HTMLElement): boolean` | An optional addition filter function to process out focusable elements. |

Returns `HTMLElement|boolean` - The previous focusable element or false if none found.
