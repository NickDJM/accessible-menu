<a name="TreeviewToggle"></a>

## TreeviewToggle ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
A link or button that controls the visibility of a [Treeview](Treeview.md).

**Kind**: global class  
**Extends**: [<code>BaseMenuToggle</code>](#BaseMenuToggle)  

* [TreeviewToggle](#TreeviewToggle) ⇐ [<code>BaseMenuToggle</code>](#BaseMenuToggle)
    * [new TreeviewToggle(options)](#new_TreeviewToggle_new)
    * [.dom](#BaseMenuToggle+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuToggle+elements) : [<code>object.&lt;BaseMenu&gt;</code>](#BaseMenu)
    * [.isOpen](#BaseMenuToggle+isOpen) : <code>boolean</code>
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

### new TreeviewToggle(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu toggle. |
| options.menuToggleElement | <code>HTMLElement</code> |  | The toggle element in the DOM. |
| options.parentElement | <code>HTMLElement</code> |  | The element containing the controlled menu. |
| options.controlledMenu | <code>TreeviewNavigation</code> |  | The menu controlled by this toggle. |
| [options.parentMenu] | <code>TreeviewNavigation</code> \| <code>null</code> | <code></code> | The menu containing this toggle. |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu toggle immediately upon creation. |

<a name="BaseMenuToggle+dom"></a>

### treeviewToggle.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the toggle.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>dom</code>](#BaseMenuToggle+dom)  
<a name="BaseMenuToggle+elements"></a>

### treeviewToggle.elements : [<code>object.&lt;BaseMenu&gt;</code>](#BaseMenu)
The elements within the toggle.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>elements</code>](#BaseMenuToggle+elements)  
<a name="BaseMenuToggle+isOpen"></a>

### treeviewToggle.isOpen : <code>boolean</code>
The open state on the menu.

**Kind**: instance property of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>isOpen</code>](#BaseMenuToggle+isOpen)  
<a name="BaseMenuToggle+initialize"></a>

### treeviewToggle.initialize()
Initialize the toggle by ensuring WAI-ARIA values are set, handling click events, and adding new keydown events.

Initialize does a lot of setup on the menu toggle.

The most basic setup steps are to ensure that the toggle has `aria-haspopup` set to `"true"`, `aria-expanded` initially set to `"false"` and, if the toggle element is not a `<button>`, set the `role` to `"button"`.

The next step to the initialization is to ensure both the toggle and the menu it controlls have IDs.

If they do not, the following steps take place:
- Generate a random 10 character string,
- Get the innerText of the toggle,
- Set the toggle's ID to: `${toggle-inner-text}-${the-random-string}-menu-button`
- Set the menu's ID to: `${toggle-inner-text}-${the-random-string}-menu`

Once the ID's have been generated, the menu's "aria-labelledby" is set to the toggle's ID, and the toggle's "aria-controls" is set to the menu's ID.

Finally, the collapse method is called to make sure the submenu is closed.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>initialize</code>](#BaseMenuToggle+initialize)  
<a name="BaseMenuToggle+expand"></a>

### treeviewToggle.expand([emit])
Expands the controlled menu.

Sets the toggle's `aria-expanded` to `"true"`, adds the open class to the toggle's parent menu item and controlled menu, and removed the closed class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuExpand` which bubbles and contains the toggle object in `event.detail`.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>expand</code>](#BaseMenuToggle+expand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the expand event once expanded. |

<a name="BaseMenuToggle+collapse"></a>

### treeviewToggle.collapse([emit])
Collapses the controlled menu.

Sets the toggle's `aria-expanded` to `"false"`, adds the closed class to the toggle's parent menu item and controlled menu, and removed the open class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuCollapse` which bubbles and contains the toggle object in `event.detail`.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>collapse</code>](#BaseMenuToggle+collapse)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the collapse event once collapsed. |

<a name="BaseMenuToggle+open"></a>

### treeviewToggle.open()
Opens the controlled menu.

Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`,
calls [expand](expand), and sets [isOpen](isOpen) to `true`.

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>open</code>](#BaseMenuToggle+open)  
<a name="BaseMenuToggle+preview"></a>

### treeviewToggle.preview()
Opens the controlled menu without the current focus entering it.

Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`, and calls [expand](expand)

**Kind**: instance method of [<code>TreeviewToggle</code>](#TreeviewToggle)  
**Overrides**: [<code>preview</code>](#BaseMenuToggle+preview)  
<a name="BaseMenuToggle+close"></a>

### treeviewToggle.close()
Closes the controlled menu.

Sets the controlled menu's focus state to `"none"` and the parent menu's focus state to `"self"`,
blurs the controlled menus and sets it's current child index to 0,
calls [collapse](collapse), and sets [isOpen](isOpen) to `false`.

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
