<a name="BaseMenuItem"></a>

## BaseMenuItem
A basic navigation link contained inside of a Menu.

**Kind**: global class  

* [BaseMenuItem](#BaseMenuItem)
    * [new BaseMenuItem(param0)](#new_BaseMenuItem_new)
    * [.dom](#BaseMenuItem+dom) ⇒ <code>object</code>
    * [.elements](#BaseMenuItem+elements) ⇒ <code>object</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) ⇒ <code>boolean</code>
    * [.initialize()](#BaseMenuItem+initialize)
    * [.focus()](#BaseMenuItem+focus)
    * [.blur()](#BaseMenuItem+blur)

<a name="new_BaseMenuItem_new"></a>

### new BaseMenuItem(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu item object. |
| param0.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| param0.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| param0.parentMenu | [<code>BaseMenu</code>](#BaseMenu) |  | The parent menu. |
| [param0.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [param0.childMenu] | [<code>BaseMenu</code>](#BaseMenu) \| <code>null</code> | <code></code> | The child menu. |
| [param0.toggle] | [<code>BaseMenuToggle</code>](#BaseMenuToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |

<a name="BaseMenuItem+dom"></a>

### baseMenuItem.dom ⇒ <code>object</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenuItem+elements"></a>

### baseMenuItem.elements ⇒ <code>object</code>
The elements within the menu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenuItem+isSubmenuItem"></a>

### baseMenuItem.isSubmenuItem ⇒ <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
**Returns**: <code>boolean</code> - - The submenu flag.  
<a name="BaseMenuItem+initialize"></a>

### baseMenuItem.initialize()
Initialize the menu item.

**Kind**: instance method of [<code>BaseMenuItem</code>](#BaseMenuItem)  
<a name="BaseMenuItem+focus"></a>

### baseMenuItem.focus()
Focuses the menu item's link if triggering event is valid.

**Kind**: instance method of [<code>BaseMenuItem</code>](#BaseMenuItem)  
<a name="BaseMenuItem+blur"></a>

### baseMenuItem.blur()
Blurs the menu item's link if triggering event is valid.

**Kind**: instance method of [<code>BaseMenuItem</code>](#BaseMenuItem)  
