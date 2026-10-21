# Validation

This API is provided by Core. Import it from `@accessible-ecosystem/core/validate.js`.

## Overview

These functions return the same result shape:

| Property | Type      | Description                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| status   | `boolean` | Whether the check passed.                                        |
| errors   | `Error[]` | The errors found during validation. Empty when the check passes. |

By default, a failed check throws the first error. Pass `{ shouldThrow: false }` as the final argument to receive the result instead. A successful check returns `{ status: true, errors: [] }` in either mode.

::: info Pass values in an object

Validation functions that check elements or values expect them to be passed inside of an object. This is to achieve two things:

1. It allows for more than one element or value to be passed to the function for validation, and more importantly,
2. It allows for the function to directly identify the name of the element or value that failed validation so we can communicate that to the user.

The functions `isValidEventType` and `hasValidRootDOMElement` take a component directly instead of an object of named values.

:::

```js
import { isValidInstance } from "@accessible-ecosystem/core/validate.js";

const elements = {
  menuElement: "not an HTMLElement",
};

const result = isValidInstance(HTMLElement, elements, { shouldThrow: false });

console.log(result.status); // false
console.log(result.errors[0].message);
// menuElement must be an instance of HTMLElement. "string" given.
```

Without `{ shouldThrow: false }`, this example throws a `TypeError` instead of returning a result. The errors array contains error objects, not message strings. Read an error's `message` property when you need its text.

The optional final argument is shared by every function on this page:

| Parameter           | Type      | Description                                                                       | Default |
| ------------------- | --------- | --------------------------------------------------------------------------------- | ------- |
| options             | `object`  | Validation options.                                                               | `{}`    |
| options.shouldThrow | `boolean` | Throw the first error when validation fails. Set to `false` to return the result. | `true`  |

## isValidInstance

Checks whether the provided elements are instances of a constructor.

```js
/**
 * @param  {Function} constructor    - The constructor to check for.
 * @param  {object}   elements       - The element(s) to check.
 * @param  {object}   [options = {}] - The shared validation options described above.
 * @return {object}                  - The result of the check.
 */
isValidInstance(constructor, elements, options);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking instanceof with more descriptive error messages to help debugging.

## isValidType

Check to see if the provided values are of a specific type.

```js
/**
 * @param  {string} type           - The type to check for.
 * @param  {object} values         - The value(s) to check.
 * @param  {object} [options = {}] - The shared validation options described above.
 * @return {object}                - The result of the check.
 */
isValidType(type, values, options);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking typeof with more descriptive error messages to help debugging.

## isQuerySelector

Checks to see if the provided values are valid query selectors.

```js
/**
 * @param  {Object<string>} values         - The value(s) to check.
 * @param  {object}         [options = {}] - The shared validation options described above.
 * @return {object}                        - The result of the check.
 */
isQuerySelector(values, options);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

## isValidClassList

Checks that each named value is a class token or an array of class tokens. A token cannot contain whitespace. Empty strings and empty arrays are accepted.

```js
/**
 * @param  {Object<string, (string|string[])>} values         - The value(s) to check.
 * @param  {object}                            [options = {}] - The shared validation options described above.
 * @return {object}                                           - The result of the check.
 */
isValidClassList(values, options);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

## isValidState

Check to see if the provided values are valid focus states for a menu.

```js
/**
 * @param  {Object<string>} values         - The value(s) to check.
 * @param  {object}         [options = {}] - The shared validation options described above.
 * @return {object}                        - The result of the check.
 */
isValidState(values, options);
```

Available states are: `"none"`, `"self"`, and `"child"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

## isValidEvent

Check to see if the provided values are valid event types for a menu.

```js
/**
 * @param  {Object<string>} values         - The value(s) to check.
 * @param  {object}         [options = {}] - The shared validation options described above.
 * @return {object}                        - The result of the check.
 */
isValidEvent(values, options);
```

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

## isValidHoverType

Check to see if the provided values are valid hover types for a menu.

```js
/**
 * @param  {Object<string>} values         - The value(s) to check.
 * @param  {object}         [options = {}] - The shared validation options described above.
 * @return {object}                        - The result of the check.
 */
isValidHoverType(values, options);
```

Available types are: `"off"`, `"on"`, and `"dynamic"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

You can read more about [supported hover types](../hover-types) in the docs.

## isTag

Checks whether the provided elements use a specific tag. Tag names are case-insensitive.

```js
/**
 * @param  {string}              tagName        - The name of the tag.
 * @param  {Object<HTMLElement>} elements       - The element(s) to check.
 * @param  {object}              [options = {}] - The shared validation options described above.
 * @return {object}                             - The result of the check.
 */
isTag(tagName, elements, options);
```

The elements [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

## isValidEventType

Check to see if the provided event type is valid for dispatching.

```js
isValidEventType(eventType, component, options);
```

| Parameter                      | Type        | Description                             |
| ------------------------------ | ----------- | --------------------------------------- |
| `eventType`                    | `string`    | The event type to check.                |
| `component`                    | `Component` | The component to check.                 |
| `[options = {}]`               | `object`    | Additional options.                     |
| `[options.shouldThrow = true]` | `boolean`   | Whether to throw on error or return it. |

Returns the validation result described in the [overview](#overview).

## hasValidRootDOMElement

Checks that the component's configured root DOM key exists in its `_dom` object. This checks the key, not the type of the value stored under it.

```js
hasValidRootDOMElement(component, options);
```

| Parameter                    | Type        | Description                             |
| ---------------------------- | ----------- | --------------------------------------- |
| `component`                  | `Component` | The component to check.                 |
| `[options = {}]`             | `object`    | Additional options.                     |
| `[options.shouldThrow=true]` | `boolean`   | Whether to throw on error or return it. |

Returns the validation result described in the [overview](#overview).
