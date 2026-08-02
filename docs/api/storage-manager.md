# StorageManager

A utility class for storing and retrieving Accessible Menu data in the browser.
Instances can be scoped and registered on `window` for global access across the
library.

## Constructor

Constructs a new `StorageManager`.

```js
new StorageManager({
  scope,
  type,
  initialize,
});
```

The constructor will set up the storage scope and default type, then initialize
the instance (registering it on `window`) unless `initialize` is set to `false`.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the storage manager. | `undefined` |
| options.scope | `string` | The key used to register the storage on `window`. | `undefined` |
| options.type | `string`, `null` | The default storage type. | `"_default"` |
| options.initialize | `boolean` | Whether to call [initialize](#method--initialize) immediately. | `true` |

## Initialize

Registers the storage instance on `window` using its [scope](#getter--scope).

```js
StorageManager.initialize();
```

This allows other parts of the library to access the same instance via
`window[scope]`.

## Properties

### _scope <badge type="warning" text="protected" /> {#property--scope}

The scope key used when registering the storage on `window`.

```js
StorageManager._scope;
```

#### Type {#property--scope--type}

`string`

### _type <badge type="warning" text="protected" /> {#property--type}

The current storage type.

```js
StorageManager._type; // Default: `"_default"`.
```

#### Type {#property--type--type}

`string`

### _storage <badge type="warning" text="protected" /> {#property--storage}

The internal storage object keyed by type, then by optional key.

```js
StorageManager._storage; // Default: `{}`.
```

#### Type {#property--storage--type}

`object`

## Getters and Setters

### scope <badge type="warning" text="readonly" /> {#getter--scope}

The scope key used to register the storage on `window`.

::: code-group

```js [getter]
StorageManager.scope;
```

:::

See [_scope](#property--scope) for more information.

### type {#getter-setter--type}

The current storage type.

::: code-group

```js [getter]
StorageManager.type;
```

```js [setter]
StorageManager.type = "menus";
```

:::

See [_type](#property--type) for more information.

### storage <badge type="warning" text="readonly" /> {#getter--storage}

The internal storage object.

::: code-group

```js [getter]
StorageManager.storage;
```

:::

See [_storage](#property--storage) for more information.

## Methods

### initialize <badge type="tip" text="public" /> {#method--initialize}

Registers the storage instance on `window` using the current [scope](#getter--scope).

```js
StorageManager.initialize();
```

### get <badge type="tip" text="public" /> {#method--get}

Retrieve data from storage by type and optional key.

```js
StorageManager.get({
  type,
  key,
});
```

#### Parameters {#method--get--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for getting the storage. | `{}` |
| options.type | `string` | The type of storage to get. | `StorageManager.type` |
| options.key | `string`, `null` | The key to get the value from. If `null`, the whole type is returned. | `null` |

### set <badge type="tip" text="public" /> {#method--set}

Store data under a type and optional key. Creates the type storage object if it does
not already exist.

```js
StorageManager.set({
  type,
  key,
  data,
});
```

#### Parameters {#method--set--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for setting the storage. | `{}` |
| options.type | `string` | The type of storage to set. | `StorageManager.type` |
| options.key | `string`, `null` | The key to set the value to. If `null`, the entire type is replaced. | `null` |
| options.data | `object` | The data to set. | `{}` |

### clear <badge type="tip" text="public" /> {#method--clear}

Remove stored data by type and optional key.

```js
StorageManager.clear({
  type,
  key,
});
```

#### Parameters {#method--clear--parameters}

| Param | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for removing from storage. | `{}` |
| options.type | `string` | The type of storage to remove from. | `StorageManager.type` |
| options.key | `string`, `null` | The key to remove the value from. If `null`, the entire type is removed. | `null` |

### dispose <badge type="tip" text="public" /> {#method--dispose}

Remove the internal storage object and the instance reference. Use this when
the storage manager is no longer needed.

```js
StorageManager.dispose();
```
