<a name="BaseMenuToggle"></a>

## BaseMenuToggle
A link or button that controls the visibility of a [BaseMenu](BaseMenu.md).

**Kind**: global class  

* [BaseMenuToggle](#BaseMenuToggle)
    * [new BaseMenuToggle(options)](#new_BaseMenuToggle_new)
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

<a name="new_BaseMenuToggle_new"></a>

### new BaseMenuToggle(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu toggle. |
| options.menuToggleElement | <code>HTMLElement</code> |  | The toggle element in the DOM. |
| options.parentElement | <code>HTMLElement</code> |  | The element containing the controlled menu. |
| options.controlledMenu | [<code>BaseMenu</code>](#BaseMenu) |  | The menu controlled by this toggle. |
| [options.parentMenu] | [<code>BaseMenu</code>](#BaseMenu) \| <code>null</code> | <code></code> | The menu containing this toggle. |

<a name="BaseMenuToggle+dom"></a>

### baseMenuToggle.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the toggle.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+elements"></a>

### baseMenuToggle.elements : [<code>object.&lt;BaseMenu&gt;</code>](#BaseMenu)
The elements within the toggle.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+isOpen"></a>

### baseMenuToggle.isOpen : <code>boolean</code>
The open state on the menu.

**Kind**: instance property of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+initialize"></a>

### baseMenuToggle.initialize()
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

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+expand"></a>

### baseMenuToggle.expand([emit])
Expands the controlled menu.

Sets the toggle's `aria-expanded` to `"true"`, adds the open class to the toggle's parent menu item and controlled menu, and removed the closed class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuExpand` which bubbles and contains the toggle object in `event.detail`.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
**Emits**: [<code>accessibleMenuExpand</code>](#event_accessibleMenuExpand)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the expand event once expanded. |

<a name="BaseMenuToggle+collapse"></a>

### baseMenuToggle.collapse([emit])
Collapses the controlled menu.

Sets the toggle's `aria-expanded` to `"false"`, adds the closed class to the toggle's parent menu item and controlled menu, and removed the open class from the toggle's parent menu item and controlled menu.

If `emit` is set to `true`, this will also emit a custom event called `accessibleMenuCollapse` which bubbles and contains the toggle object in `event.detail`.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
**Emits**: [<code>accessibleMenuCollapse</code>](#event_accessibleMenuCollapse)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [emit] | <code>boolean</code> | <code>true</code> | A toggle to emit the collapse event once collapsed. |

<a name="BaseMenuToggle+open"></a>

### baseMenuToggle.open()
Opens the controlled menu.

Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`,
calls [expand](expand), and sets [isOpen](isOpen) to `true`.

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+preview"></a>

### baseMenuToggle.preview()
Opens the controlled menu without the current focus entering it.

Sets the controlled menu's focus state to `"self"` and the parent menu's focus state to `"child"`, and calls [expand](expand)

**Kind**: instance method of [<code>BaseMenuToggle</code>](#BaseMenuToggle)  
<a name="BaseMenuToggle+close"></a>

### baseMenuToggle.close()
Closes the controlled menu.

Sets the controlled menu's focus state to `"none"` and the parent menu's focus state to `"self"`,
blurs the controlled menus and sets it's current child index to 0,
calls [collapse](collapse), and sets [isOpen](isOpen) to `false`.

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
