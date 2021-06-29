
    <a name="MenubarToggle"></a>

## MenubarToggle ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
A link or button that controls the visibility of a Menubar.

**Kind**: global class  
**Extends**: [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

* [MenubarToggle](#MenubarToggle) ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
    * [new MenubarToggle(options)](#new_MenubarToggle_new)
    * [.dom](#BaseMenuToggle+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuToggle+elements) : [<code>object.&lt;BaseMenu&gt;</code>](#BaseMenu)
    * [.isOpen](#BaseMenuToggle+isOpen) : <code>boolean</code>
    * [.open()](#MenubarToggle+open)
    * [.preview()](#MenubarToggle+preview)
    * [.close()](#MenubarToggle+close)
    * [.initialize()](#BaseMenuToggle+initialize)
    * [.expand([emit])](#BaseMenuToggle+expand)
    * [.collapse([emit])](#BaseMenuToggle+collapse)
    * [.toggle()](#BaseMenuToggle+toggle)
    * [.closeSiblings()](#BaseMenuToggle+closeSiblings)
    * [.closeChildren()](#BaseMenuToggle+closeChildren)

<a name="new_MenubarToggle_new"></a>

### new MenubarToggle(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu toggle. |
| options.menuToggleElement | <code>HTMLElement</code> |  | The toggle element in the DOM. |
| options.parentElement | <code>HTMLElement</code> |  | The element containing the controlled menu. |
| options.controlledMenu | [<code>Menubar</code>](#Menubar) |  | The menu controlled by this toggle. |
| [options.parentMenu] | [<code>Menubar</code>](#Menubar) \| <code>null</code> | <code></code> | The menu containing this toggle. |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu toggle immediately upon creation. |

<a name="BaseMenuToggle+dom"></a>

### menubarToggle.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the toggle.

**Kind**: instance property of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>dom</code>](#BaseMenuToggle+dom)  
<a name="BaseMenuToggle+elements"></a>

### menubarToggle.elements : [<code>object.&lt;BaseMenu&gt;</code>](#BaseMenu)
The elements within the toggle.

**Kind**: instance property of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>elements</code>](#BaseMenuToggle+elements)  
<a name="BaseMenuToggle+isOpen"></a>

### menubarToggle.isOpen : <code>boolean</code>
The open state on the menu.

**Kind**: instance property of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>isOpen</code>](#BaseMenuToggle+isOpen)  
<a name="MenubarToggle+open"></a>

### menubarToggle.open()
Opens the controlled menu.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>open</code>](#BaseMenuToggle+open)  
<a name="MenubarToggle+preview"></a>

### menubarToggle.preview()
Opens the controlled menu without the current focus entering it.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>preview</code>](#BaseMenuToggle+preview)  
<a name="MenubarToggle+close"></a>

### menubarToggle.close()
Closes the controlled menu.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>close</code>](#BaseMenuToggle+close)  
<a name="BaseMenuToggle+initialize"></a>

### menubarToggle.initialize()
Initialize the toggle by ensuring WAI-ARIA values are set,
handling click events, and adding new keydown events.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>initialize</code>](#BaseMenuToggle+initialize)  
<a name="BaseMenuToggle+expand"></a>

### menubarToggle.expand([emit])
Expands the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>expand</code>](#BaseMenuToggle+expand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the expand event once expanded. |

<a name="BaseMenuToggle+collapse"></a>

### menubarToggle.collapse([emit])
Collapses the controlled menu.

Alters ARIA attributes and classes.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>collapse</code>](#BaseMenuToggle+collapse)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the collapse event once collapsed. |

<a name="BaseMenuToggle+toggle"></a>

### menubarToggle.toggle()
Toggles the open state of the controlled menu.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>toggle</code>](#BaseMenuToggle+toggle)  
<a name="BaseMenuToggle+closeSiblings"></a>

### menubarToggle.closeSiblings()
Closes all sibling menus.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>closeSiblings</code>](#BaseMenuToggle+closeSiblings)  
<a name="BaseMenuToggle+closeChildren"></a>

### menubarToggle.closeChildren()
Closes all child menus.

**Kind**: instance method of [<code>MenubarToggle</code>](#MenubarToggle)  
**Overrides**: [<code>closeChildren</code>](#BaseMenuToggle+closeChildren)  
  