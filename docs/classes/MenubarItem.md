<a name="MenubarItem"></a>

## MenubarItem ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
A basic navigation link contained inside of a Menubar.

**Kind**: global class  
**Extends**: [<code>BaseMenuItem</code>](#BaseMenuItem)  

* [MenubarItem](#MenubarItem) ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [new MenubarItem(param0)](#new_MenubarItem_new)
    * [.dom](#BaseMenuItem+dom) ⇒ <code>object</code>
    * [.elements](#BaseMenuItem+elements) ⇒ <code>object</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) ⇒ <code>boolean</code>
    * [.initialize()](#MenubarItem+initialize)
    * [.focus()](#MenubarItem+focus)
    * [.blur()](#MenubarItem+blur)

<a name="new_MenubarItem_new"></a>

### new MenubarItem(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu item object. |
| param0.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| param0.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| param0.parentMenu | [<code>Menubar</code>](#Menubar) |  | The parent menu. |
| [param0.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [param0.childMenu] | [<code>Menubar</code>](#Menubar) \| <code>null</code> | <code></code> | The child menu. |
| [param0.toggle] | [<code>MenubarToggle</code>](#MenubarToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |
| [param0.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu item immediately upon creation. |

<a name="BaseMenuItem+dom"></a>

### menubarItem.dom ⇒ <code>object</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>dom</code>](#BaseMenuItem+dom)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenuItem+elements"></a>

### menubarItem.elements ⇒ <code>object</code>
The elements within the menu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>elements</code>](#BaseMenuItem+elements)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenuItem+isSubmenuItem"></a>

### menubarItem.isSubmenuItem ⇒ <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>isSubmenuItem</code>](#BaseMenuItem+isSubmenuItem)  
**Returns**: <code>boolean</code> - - The submenu flag.  
<a name="MenubarItem+initialize"></a>

### menubarItem.initialize()
Initialize the menu item by setting its role and tab index.

**Kind**: instance method of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>initialize</code>](#BaseMenuItem+initialize)  
<a name="MenubarItem+focus"></a>

### menubarItem.focus()
Focuses the menu item's link and set proper tabIndex.

**Kind**: instance method of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>focus</code>](#BaseMenuItem+focus)  
<a name="MenubarItem+blur"></a>

### menubarItem.blur()
Blurs the menu item's link and set proper tabIndex.

**Kind**: instance method of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>blur</code>](#BaseMenuItem+blur)  
