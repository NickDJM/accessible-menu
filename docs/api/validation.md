# Validation

## Overview

All validation functions expect all elements/values they are validating to be passed to them inside of an object. This is to achieve two things:

1. It allows for more than one element to be passed to the function for validation, and (more importantly)
2. It allows for the function to directly identify the name of the the element/value that failed validation so we can communicate that to the user.

For example, if we wanted to validate that the `menuElement`, `controllerElement`, and `containerElement` options passed to the menu are valid instances of `HTMLElement`, we would do the following:

```js
// Set up a scenario that we know is going to fail.
const elements = {
  menuElement: "not an HTMLElement",
  controllerElement: document.querySelector("button"),
  containerElement: document.querySelector("nav"),
};

// Validate the elements.
const result = isValidInstance(HTMLElement, elements);
```

The result of this validation would be:

```js
{
  valid: false,
  message: 'menuElement must be an instance of HTMLElement. "string" given.',
}
```

This allows us to pass on a specific error message to the user so they know exactly which option the need to fix.

## isValidInstance

Check to see if the provided elements have a specific contructor.

```js
/**
 * @param  {object}                  contructor - The constructor to check for.
 * @param  {object}                  elements   - The element(s) to check.
 * @return {Object<boolean, string>}            - The result of the check.
 */
isValidInstance(contructor, elements);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking instanceof with more descriptive error message to help debugging.

Will return `{ status: true }` if the check is successful.

## isValidType

Check to see if the provided values are of a specific type.

```js
/**
 * @param  {string}                  type   - The type to check for.
 * @param  {object}                  values - The value(s) to check.
 * @return {Object<boolean, string>}        - The result of the check.
 */
isValidType(type, values);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking typeof with more descriptive error message to help debugging.

Will return `{ status: true }` if the check is successful.

## isQuerySelector

Checks to see if the provided values are valid query selectors.

```js
/**
 * @param  {Object<string>}          values - The value(s) to check.
 * @return {Object<boolean, string>}        - The result of the check.
 */
isQuerySelector(values);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `{ status: true }` if the check is successful.

## isValidClassList

Checks to see if the provided value is either a string or an array of strings.

```js
/**
 * @param  {Object<string, string[]>} values - The value(s) to check.
 * @return {Object<boolean, string>}         - The result of the check.
 */
isValidClassList(values);
```

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `{ status: true }` if the check is successful.

## isValidState

Check to see if the provided values are valid focus states for a menu.

```js
/**
 * @param  {Object<string>}          values - The value(s) to check.
 * @return {Object<boolean, string>}        - The result of the check.
 */
isValidState(values);
```

Available states are: `"none"`, `"self"`, and `"child"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `{ status: true }` if the check is successful.

## isValidEvent

Check to see if the provided values are valid event types for a menu.

```js
/**
 * @param  {Object<string>}          values - The value(s) to check.
 * @return {Object<boolean, string>}        - The result of the check.
 */
isValidEvent(values);
```

Available events are: `"none"`, `"mouse"`, `"keyboard"`, and `"character"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `{ status: true }` if the check is successful.

## isValidHoverType

Check to see if the provided values are valid hover types for a menu.

```js
/**
 * @param  {Object<string>}          values - The value(s) to check.
 * @return {Object<boolean, string>}        - The result of the check.
 */
isValidHoverType(values);
```

Available types are: `"off"`, `"on"`, and `"dynamic"`.

The values [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `{ status: true }` if the check is successful.

You can read more about [supported hover types](../hover-types) in the docs.

## isTag

Checks to see if the provided elements are using a specific tag.

```js
/**
 * @param  {string}               tagName - The name of the tag.
 * @param  {Object<HTMLElement>} elements - The element(s) to check.
 * @return {boolean}                      - The result of the check.
 */
isTag(tagName, elements);
```

The elements [must be provided inside of an object](#overview) so the variable name can be retrieved in case of errors.

Will return `true` if the check is successful.
