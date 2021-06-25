<a name="TreeviewItem"></a>

## TreeviewItem ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
A basic navigation link contained inside of a Treeview.

**Kind**: global class  
**Extends**: [<code>BaseMenuItem</code>](#BaseMenuItem)  

* [TreeviewItem](#TreeviewItem) ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [new TreeviewItem(param0)](#new_TreeviewItem_new)
    * [.dom](#BaseMenuItem+dom) ⇒ <code>object</code>
    * [.elements](#BaseMenuItem+elements) ⇒ <code>object</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) ⇒ <code>boolean</code>
    * [.initialize()](#TreeviewItem+initialize)
    * [.focus()](#TreeviewItem+focus)
    * [.blur()](#TreeviewItem+blur)

<a name="new_TreeviewItem_new"></a>

### new TreeviewItem(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu item object. |
| param0.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| param0.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| param0.parentMenu | [<code>Treeview</code>](#Treeview) |  | The parent menu. |
| [param0.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [param0.childMenu] | [<code>Treeview</code>](#Treeview) \| <code>null</code> | <code></code> | The child menu. |
| [param0.toggle] | [<code>TreeviewToggle</code>](#TreeviewToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |
| [param0.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu item immediately upon creation. |

<a name="BaseMenuItem+dom"></a>

### treeviewItem.dom ⇒ <code>object</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>dom</code>](#BaseMenuItem+dom)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenuItem+elements"></a>

### treeviewItem.elements ⇒ <code>object</code>
The elements within the menu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>elements</code>](#BaseMenuItem+elements)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenuItem+isSubmenuItem"></a>

### treeviewItem.isSubmenuItem ⇒ <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>isSubmenuItem</code>](#BaseMenuItem+isSubmenuItem)  
**Returns**: <code>boolean</code> - - The submenu flag.  
<a name="TreeviewItem+initialize"></a>

### treeviewItem.initialize()
Initialize the menu item by setting its role and tab index.

**Kind**: instance method of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>initialize</code>](#BaseMenuItem+initialize)  
<a name="TreeviewItem+focus"></a>

### treeviewItem.focus()
Focuses the menu item's link and set proper tabIndex.

**Kind**: instance method of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>focus</code>](#BaseMenuItem+focus)  
<a name="TreeviewItem+blur"></a>

### treeviewItem.blur()
Blurs the menu item's link and set proper tabIndex.

**Kind**: instance method of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>blur</code>](#BaseMenuItem+blur)  
