
    <a name="DisclosureMenuItem"></a>

## DisclosureMenuItem ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
A basic navigation link contained inside of a DisclosureMenu.

**Kind**: global class  
**Extends**: [<code>BaseMenuItem</code>](#BaseMenuItem)  

* [DisclosureMenuItem](#DisclosureMenuItem) ⇐ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [new DisclosureMenuItem(options)](#new_DisclosureMenuItem_new)
    * [.dom](#BaseMenuItem+dom) : <code>object.&lt;HTMLElement&gt;</code>
    * [.elements](#BaseMenuItem+elements) : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
    * [.isSubmenuItem](#BaseMenuItem+isSubmenuItem) : <code>boolean</code>
    * [.initialize()](#BaseMenuItem+initialize)
    * [.focus()](#BaseMenuItem+focus)
    * [.blur()](#BaseMenuItem+blur)

<a name="new_DisclosureMenuItem_new"></a>

### new DisclosureMenuItem(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu item. |
| options.menuItemElement | <code>HTMLElement</code> |  | The menu item in the DOM. |
| options.menuLinkElement | <code>HTMLElement</code> |  | The menu item's link in the DOM. |
| options.parentMenu | [<code>DisclosureMenu</code>](#DisclosureMenu) |  | The parent menu. |
| [options.isSubmenuItem] | <code>boolean</code> | <code>false</code> | A flag to mark if the menu item is controlling a submenu. |
| [options.childMenu] | [<code>DisclosureMenu</code>](#DisclosureMenu) \| <code>null</code> | <code></code> | The child menu. |
| [options.toggle] | [<code>DisclosureMenuToggle</code>](#DisclosureMenuToggle) \| <code>null</code> | <code></code> | The controller for the child menu. |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu item immediately upon creation. |

<a name="BaseMenuItem+dom"></a>

### disclosureMenuItem.dom : <code>object.&lt;HTMLElement&gt;</code>
The DOM elements within the menu item.

**Kind**: instance property of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>dom</code>](#BaseMenuItem+dom)  
<a name="BaseMenuItem+elements"></a>

### disclosureMenuItem.elements : <code>object.&lt;BaseMenu, BaseMenuToggle&gt;</code>
The elements within the menu item.

**Kind**: instance property of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>elements</code>](#BaseMenuItem+elements)  
<a name="BaseMenuItem+isSubmenuItem"></a>

### disclosureMenuItem.isSubmenuItem : <code>boolean</code>
A flag marking a submenu item.

**Kind**: instance property of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>isSubmenuItem</code>](#BaseMenuItem+isSubmenuItem)  
<a name="BaseMenuItem+initialize"></a>

### disclosureMenuItem.initialize()
Initialize the menu item.

**Kind**: instance method of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>initialize</code>](#BaseMenuItem+initialize)  
<a name="BaseMenuItem+focus"></a>

### disclosureMenuItem.focus()
Focuses the menu item's link if triggering event is valid.

**Kind**: instance method of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>focus</code>](#BaseMenuItem+focus)  
<a name="BaseMenuItem+blur"></a>

### disclosureMenuItem.blur()
Blurs the menu item's link if triggering event is valid.

**Kind**: instance method of [<code>DisclosureMenuItem</code>](#DisclosureMenuItem)  
**Overrides**: [<code>blur</code>](#BaseMenuItem+blur)  
  