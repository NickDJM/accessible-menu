<a name="MenubarItem"></a>

## MenubarItem ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
A basic navigation link contained inside of a [Menubar](Menubar.md).

**Kind**: global class  
**Extends**: [<code>BaseMenuItem</code>](#BaseMenuItem)  

* [MenubarItem](#MenubarItem) ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [new MenubarItem(options)](#new_MenubarItem_new)
    * [.dom](#BaseMenuItem+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuItem+elements) : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) : <code>boolean</code>
    * [.initialize()](#MenubarItem+initialize)
    * [.focus()](#MenubarItem+focus)
    * [.blur()](#MenubarItem+blur)

<a name="new_MenubarItem_new"></a>

### new MenubarItem(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu item. |
| options.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| options.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| options.parentMenu | [<code>Menubar</code>](#Menubar) |  | The parent menu. |
| [options.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [options.childMenu] | [<code>Menubar</code>](#Menubar) \| <code>null</code> | <code></code> | The child menu. |
| [options.toggle] | [<code>MenubarToggle</code>](#MenubarToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu item immediately upon creation. |

<a name="BaseMenuItem+dom"></a>

### menubarItem.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>dom</code>](#BaseMenuItem+dom)  
<a name="BaseMenuItem+elements"></a>

### menubarItem.elements : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
The elements within the menu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>elements</code>](#BaseMenuItem+elements)  
<a name="BaseMenuItem+isSubmenuItem"></a>

### menubarItem.isSubmenuItem : <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>MenubarItem</code>](#MenubarItem)  
**Overrides**: [<code>isSubmenuItem</code>](#BaseMenuItem+isSubmenuItem)  
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
