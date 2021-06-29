
    <a name="BaseMenuItem"></a>

## BaseMenuItem
A basic navigation link contained inside of a Menu.

**Kind**: global class  

* [BaseMenuItem](#BaseMenuItem)
    * [new BaseMenuItem(options)](#new_BaseMenuItem_new)
    * [.dom](#BaseMenuItem+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuItem+elements) : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) : <code>boolean</code>
    * [.initialize()](#BaseMenuItem+initialize)
    * [.focus()](#BaseMenuItem+focus)
    * [.blur()](#BaseMenuItem+blur)

<a name="new_BaseMenuItem_new"></a>

### new BaseMenuItem(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu item. |
| options.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| options.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| options.parentMenu | [<code>BaseMenu</code>](#BaseMenu) |  | The parent menu. |
| [options.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [options.childMenu] | [<code>BaseMenu</code>](#BaseMenu) | <code></code> | The child menu. |
| [options.toggle] | [<code>BaseMenuToggle</code>](#BaseMenuToggle) | <code></code> | The controller for the child menu. |

<a name="BaseMenuItem+dom"></a>

### baseMenuItem.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
<a name="BaseMenuItem+elements"></a>

### baseMenuItem.elements : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
The elements within the menu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
<a name="BaseMenuItem+isSubmenuItem"></a>

### baseMenuItem.isSubmenuItem : <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>BaseMenuItem</code>](#BaseMenuItem)  
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
  