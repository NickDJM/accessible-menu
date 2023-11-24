# Event Handlers

## keyPress

Retrieves the pressed key from an event.

```js
/**
 * @param   {KeyboardEvent} event - The keyboard event.
 * @return  {string}              - The name of the key or an empty string.
 */
keyPress(event);
```

## preventEvent

Stops an event from taking action.

```js
/**
 * @param {Event} event - The event.
 */
preventEvent(event);
```

Calls both `event.preventDefault()` and `event.stopPropagation()`.
