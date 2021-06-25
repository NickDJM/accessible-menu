<a name="BaseMenuToggle"></a>

## BaseMenuToggle
A link or button that controls the visibility of a Menu.

**Kind**: global class  

* [BaseMenuToggle](#BaseMenuToggle)
    * [new BaseMenuToggle(param0)](#new_BaseMenuToggle_new)
    * [.dom](#BaseMenuToggle+dom) ⇒ <code>object</code>
    * [.elements](#BaseMenuToggle+elements) ⇒ <code>object</code>
    * [.isOpen](#BaseMenuToggle+isOpen) ⇒ <code>boolean</code>
    * [.isOpen](#BaseMenuToggle+isOpen)
    * [.initialize()](#BaseMenuToggle+initialize)
    * [.expand([emit])](#BaseMenuToggle+expand)
    * [.collapse([emit])](#BaseMenuToggle+collapse)
    * [.open()](#BaseMenuToggle+open)
    * [.preview()](#BaseMenuToggle+preview)
    * [.close()](#BaseMenuToggle+close)
    * [.toggle()](#BaseMenuToggle+toggle)
    * [.closeSiblings()](#BaseMenuToggle+closeSiblings)
    * [.closeChildren()](#BaseMenuToggle+closeChildren)

<a name="new_BaseMenuToggle_new"></a>

### new BaseMenuToggle(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu toggle object. |
| param0.menuToggleElement | <code>HTMLElement</code> |  | The toggle element in the DOM. |
| param0.parentElement | <code>HTMLElement</code> |  | The element containing the controlled menu. |
| param0.controlledMenu | [<code>BaseMenu</code>](#BaseMenu) |  | The menu controlled by this toggle. |
| [param0.parentMenu] | [<code>BaseMenu</code>](#BaseMenu) \| <code>null</code> | <code></code> | The menu containing this toggle. |

<a name="BaseMenuToggle+dom"></a>

### baseMenuToggle.dom ⇒ <code>object</code>
The DOM elements within the toggle.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenuToggle+elements"></a>

### baseMenuToggle.elements ⇒ <code>object</code>
The elements within the toggle.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenuToggle+isOpen"></a>

### baseMenuToggle.isOpen ⇒ <code>boolean</code>
The open state on the menu.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
**Returns**: <code>boolean</code> - - The open state.  
<a name="BaseMenuToggle+isOpen"></a>

### baseMenuToggle.isOpen
Set the open state on the menu.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>boolean</code> | The open state. |

<a name="BaseMenuToggle+initialize"></a>

### baseMenuToggle.initialize()
Initialize the toggle by ensuring WAI-ARIA values are set,
handling click events, and adding new keydown events.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+expand"></a>

### baseMenuToggle.expand([emit])
Expands the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the expand event once expanded. |

<a name="BaseMenuToggle+collapse"></a>

### baseMenuToggle.collapse([emit])
Collapses the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the collapse event once collapsed. |

<a name="BaseMenuToggle+open"></a>

### baseMenuToggle.open()
Opens the controlled menu.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+preview"></a>

### baseMenuToggle.preview()
Opens the controlled menu without the current focus entering it.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+close"></a>

### baseMenuToggle.close()
Closes the controlled menu.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+toggle"></a>

### baseMenuToggle.toggle()
Toggles the open state of the controlled menu.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+closeSiblings"></a>

### baseMenuToggle.closeSiblings()
Closes all sibling menus.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+closeChildren"></a>

### baseMenuToggle.closeChildren()
Closes all child menus.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
