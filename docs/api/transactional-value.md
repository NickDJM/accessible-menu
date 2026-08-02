# TransactionalValue

A utility class that maintains a current value and a committed value.

Useful for tracking edits and determining if a value has diverged from its last committed state.

## Constructor

Constructs a new `TransactionalValue`.

```js
new TransactionalValue(initialValue, {
  equals,
});
```

The constructor sets the current and committed values to `initialValue` and
stores a comparator function used by [isDirty](#getter--isdirty).

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| initialValue | `any` | The starting (and initially committed) value. | `undefined` |
| options | `object` | Options for configuring the instance. | `{}` |
| options.equals | `function` | Custom equality comparator. | `Object.is` |

## Properties

### _equals <badge type="warning" text="protected" /> {#property--equals}

A comparator function used to check equality between the current and committed values.

```js
TransactionalValue._equals;
```

#### Type {#property--equals--type}

`function`

### _current <badge type="warning" text="protected" /> {#property--current}

The current, editable value.

```js
TransactionalValue._current;
```

#### Type {#property--current--type}

`any`

### _committed <badge type="warning" text="protected" /> {#property--committed}

The last committed (baseline) value.

```js
TransactionalValue._committed;
```

#### Type {#property--committed--type}

`any`

## Getters and Setters

### value {#getter-setter--value}

The current editable value.

::: code-group

```js [getter]
TransactionalValue.value;
```

```js [setter]
TransactionalValue.value = "next";
```

:::

See [_current](#property--current) for more information.

### committed <badge type="warning" text="readonly" /> {#getter--committed}

The last committed (baseline) value.

::: code-group

```js [getter]
TransactionalValue.committed;
```

:::

See [_committed](#property--committed) for more information.

### isDirty <badge type="warning" text="readonly" /> {#getter--isdirty}

Checks whether the current value differs from the committed one.

::: code-group

```js [getter]
TransactionalValue.isDirty;
```

:::

## Methods

### commit <badge type="tip" text="public" /> {#method--commit}

Commits the current value, setting it as the new baseline.

```js
TransactionalValue.commit();
```

### reset <badge type="tip" text="public" /> {#method--reset}

Resets the current value to the committed baseline.

```js
TransactionalValue.reset();
```

### update <badge type="tip" text="public" /> {#method--update}

Applies a functional update to the current value.

```js
TransactionalValue.update((current) => current + 1);
```

#### Parameters {#method--update--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| fn | `function` | A function that receives the previous value and returns the new one. | `undefined` |
