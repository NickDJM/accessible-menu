<a name="TreeviewToggle"></a>

## TreeviewToggle ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
A link or button that controls the visibility of a TreeviewNavigation.

**Kind**: global class  
**Extends**: [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

* [TreeviewToggle](#TreeviewToggle) ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
    * [new TreeviewToggle(param0)](#new_TreeviewToggle_new)
    * [.dom](#BaseMenuToggle+dom) ⇒ <code>object</code>
    * [.elements](#BaseMenuToggle+elements) ⇒ <code>object</code>
    * [.isOpen](#BaseMenuToggle+isOpen) ⇒ <code>boolean</code>
    * [.initialize()](#BaseMenuToggle+initialize)
    * [.expand([emit])](#BaseMenuToggle+expand)
    * [.collapse([emit])](#BaseMenuToggle+collapse)
    * [.open()](#BaseMenuToggle+open)
    * [.preview()](#BaseMenuToggle+preview)
    * [.close()](#BaseMenuToggle+close)
    * [.toggle()](#BaseMenuToggle+toggle)
    * [.closeSiblings()](#BaseMenuToggle+closeSiblings)
    * [.closeChildren()](#BaseMenuToggle+closeChildren)

<a name="new_TreeviewToggle_new"></a>

### new TreeviewToggle(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu toggle object. |
| param0.menuToggleElement | <code>HTMLElement</code> |  | The toggle element in the DOM. |
| param0.parentElement | <code>HTMLElement</code> |  | The element containing the controlled menu. |
| param0.controlledMenu | <code>TreeviewNavigation</code> |  | The menu controlled by this toggle. |
| [param0.parentMenu] | <code>TreeviewNavigation</code> \| <code>null</code> | <code></code> | The menu containing this toggle. |
| [param0.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu toggle immediately upon creation. |

<a name="BaseMenuToggle+dom"></a>

### treeviewToggle.dom ⇒ <code>object</code>
The DOM elements within the toggle.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>dom</code>](#BaseMenuToggle+dom)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenuToggle+elements"></a>

### treeviewToggle.elements ⇒ <code>object</code>
The elements within the toggle.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>elements</code>](#BaseMenuToggle+elements)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenuToggle+isOpen"></a>

### treeviewToggle.isOpen ⇒ <code>boolean</code>
The open state on the menu.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>isOpen</code>](#BaseMenuToggle+isOpen)  
**Returns**: <code>boolean</code> - - The open state.  
<a name="BaseMenuToggle+initialize"></a>

### treeviewToggle.initialize()
Initialize the toggle by ensuring WAI-ARIA values are set,
handling click events, and adding new keydown events.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>initialize</code>](#BaseMenuToggle+initialize)  
<a name="BaseMenuToggle+expand"></a>

### treeviewToggle.expand([emit])
Expands the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>expand</code>](#BaseMenuToggle+expand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the expand event once expanded. |

<a name="BaseMenuToggle+collapse"></a>

### treeviewToggle.collapse([emit])
Collapses the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>collapse</code>](#BaseMenuToggle+collapse)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the collapse event once collapsed. |

<a name="BaseMenuToggle+open"></a>

### treeviewToggle.open()
Opens the controlled menu.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>open</code>](#BaseMenuToggle+open)  
<a name="BaseMenuToggle+preview"></a>

### treeviewToggle.preview()
Opens the controlled menu without the current focus entering it.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>preview</code>](#BaseMenuToggle+preview)  
<a name="BaseMenuToggle+close"></a>

### treeviewToggle.close()
Closes the controlled menu.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>close</code>](#BaseMenuToggle+close)  
<a name="BaseMenuToggle+toggle"></a>

### treeviewToggle.toggle()
Toggles the open state of the controlled menu.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>toggle</code>](#BaseMenuToggle+toggle)  
<a name="BaseMenuToggle+closeSiblings"></a>

### treeviewToggle.closeSiblings()
Closes all sibling menus.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>closeSiblings</code>](#BaseMenuToggle+closeSiblings)  
<a name="BaseMenuToggle+closeChildren"></a>

### treeviewToggle.closeChildren()
Closes all child menus.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>closeChildren</code>](#BaseMenuToggle+closeChildren)  
