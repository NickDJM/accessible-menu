
    <a name="TreeviewItem"></a>

## TreeviewItem ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
A basic navigation link contained inside of a Treeview.

**Kind**: global class  
**Extends**: [<code>BaseMenuItem</code>](#BaseMenuItem)  

* [TreeviewItem](#TreeviewItem) ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [new TreeviewItem(options)](#new_TreeviewItem_new)
    * [.dom](#BaseMenuItem+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuItem+elements) : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) : <code>boolean</code>
    * [.initialize()](#TreeviewItem+initialize)
    * [.focus()](#TreeviewItem+focus)
    * [.blur()](#TreeviewItem+blur)

<a name="new_TreeviewItem_new"></a>

### new TreeviewItem(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu item. |
| options.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| options.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| options.parentMenu | [<code>Treeview</code>](#Treeview) |  | The parent menu. |
| [options.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [options.childMenu] | [<code>Treeview</code>](#Treeview) \| <code>null</code> | <code></code> | The child menu. |
| [options.toggle] | [<code>TreeviewToggle</code>](#TreeviewToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu item immediately upon creation. |

<a name="BaseMenuItem+dom"></a>

### treeviewItem.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>dom</code>](#BaseMenuItem+dom)  
<a name="BaseMenuItem+elements"></a>

### treeviewItem.elements : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
The elements within the menu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>elements</code>](#BaseMenuItem+elements)  
<a name="BaseMenuItem+isSubmenuItem"></a>

### treeviewItem.isSubmenuItem : <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>TreeviewItem</code>](#TreeviewItem)  
**Overrides**: [<code>isSubmenuItem</code>](#BaseMenuItem+isSubmenuItem)  
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
  