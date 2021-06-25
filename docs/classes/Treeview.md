<a name="Treeview"></a>

## Treeview ⇐ [<code>BaseMenu</code>](#BaseMenu)
An accessible treeview navigation in the DOM.

See [Navigation Treeview Example Using Computed Properties](https://www.w3.org/TR/wai-aria-practices-1.2/examples/treeview/treeview-2/treeview-2a.html)

**Kind**: global class  
**Extends**: [<code>BaseMenu</code>](#BaseMenu)  

* [Treeview](#Treeview) ⇐ [<code>BaseMenu</code>](#BaseMenu)
    * [new Treeview(param0)](#new_Treeview_new)
    * [.dom](#BaseMenu+dom) ⇒ <code>object</code>
    * [.selectors](#BaseMenu+selectors) ⇒ <code>object</code>
    * [.elements](#BaseMenu+elements) ⇒ <code>object</code>
    * [.openClass](#BaseMenu+openClass) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [.closeClass](#BaseMenu+closeClass) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [.isTopLevel](#BaseMenu+isTopLevel) ⇒ <code>boolean</code>
    * [.currentChild](#BaseMenu+currentChild) ⇒ <code>number</code>
    * [.focusState](#BaseMenu+focusState) ⇒ <code>string</code>
    * [.currentEvent](#BaseMenu+currentEvent) ⇒ <code>string</code>
    * [.currentMenuItem](#BaseMenu+currentMenuItem) ⇒ [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [.hoverType](#BaseMenu+hoverType) ⇒ <code>string</code>
    * [.hoverDelay](#BaseMenu+hoverDelay) ⇒ <code>number</code>
    * [.shouldFocus](#BaseMenu+shouldFocus) ⇒ <code>boolean</code>
    * [.initialize()](#Treeview+initialize)
    * [.handleKeydown()](#Treeview+handleKeydown)
    * [.handleKeyup()](#Treeview+handleKeyup)
    * [.focusLastNode()](#Treeview+focusLastNode)
    * [.openChildren()](#Treeview+openChildren)
    * [.focusNextNodeWithCharacter(char)](#Treeview+focusNextNodeWithCharacter)
    * [.validate()](#BaseMenu+validate) ⇒ <code>boolean</code>
    * [.setDOMElementType(elementType, base, filter)](#BaseMenu+setDOMElementType)
    * [.addDOMElementType(elementType, base, filter)](#BaseMenu+addDOMElementType)
    * [.clearDOMElementType(elementType)](#BaseMenu+clearDOMElementType)
    * [.setDOMElements()](#BaseMenu+setDOMElements)
    * [.findRootMenu(menu)](#BaseMenu+findRootMenu)
    * [.createChildElements()](#BaseMenu+createChildElements)
    * [.handleFocus()](#BaseMenu+handleFocus)
    * [.handleClick()](#BaseMenu+handleClick)
    * [.handleHover()](#BaseMenu+handleHover)
    * [.focus()](#BaseMenu+focus)
    * [.blur()](#BaseMenu+blur)
    * [.focusCurrentChild()](#BaseMenu+focusCurrentChild)
    * [.focusChild(index)](#BaseMenu+focusChild)
    * [.focusFirstChild()](#BaseMenu+focusFirstChild)
    * [.focusLastChild()](#BaseMenu+focusLastChild)
    * [.focusNextChild()](#BaseMenu+focusNextChild)
    * [.focusPreviousChild()](#BaseMenu+focusPreviousChild)
    * [.blurCurrentChild()](#BaseMenu+blurCurrentChild)
    * [.focusController()](#BaseMenu+focusController)
    * [.focusContainer()](#BaseMenu+focusContainer)
    * [.closeChildren()](#BaseMenu+closeChildren)
    * [.blurChildren()](#BaseMenu+blurChildren)

<a name="new_Treeview_new"></a>

### new Treeview(param0)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| param0 | <code>object</code> |  | The menu object. |
| param0.menuElement | <code>HTMLElement</code> |  | The menu element in the DOM. |
| [param0.menuItemSelector] | <code>string</code> | <code>&quot;\&quot;li\&quot;&quot;</code> | The CSS selector string for menu items. |
| [param0.menuLinkSelector] | <code>string</code> | <code>&quot;\&quot;a\&quot;&quot;</code> | The CSS selector string for menu links. |
| [param0.submenuItemSelector] | <code>string</code> | <code>&quot;\&quot;\&quot;&quot;</code> | The CSS selector string for menu items containing submenus. |
| [param0.submenuToggleSelector] | <code>string</code> | <code>&quot;\&quot;a\&quot;&quot;</code> | The CSS selector string for submenu toggle buttons/links. |
| [param0.submenuSelector] | <code>string</code> | <code>&quot;\&quot;ul\&quot;&quot;</code> | The CSS selector string for submenus. |
| [param0.controllerElement] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | The element controlling the menu in the DOM. |
| [param0.containerElement] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | The element containing the menu in the DOM. |
| [param0.openClass] | <code>string</code> | <code>&quot;\&quot;show\&quot;&quot;</code> | The class to apply when a menu is "open". |
| [param0.closeClass] | <code>string</code> | <code>&quot;\&quot;hide\&quot;&quot;</code> | The class to apply when a menu is "closed". |
| [param0.isTopLevel] | <code>boolean</code> | <code>false</code> | A flag to mark the root menu. |
| [param0.parentMenu] | [<code>Treeview</code>](#Treeview) \| <code>null</code> | <code></code> | The parent menu to this menu. |
| [param0.hoverType] | <code>string</code> | <code>&quot;\&quot;off\&quot;&quot;</code> | The type of hoverability a menu has. |
| [param0.hoverDelay] | <code>number</code> | <code>250</code> | The delay for closing menus if the menu is hoverable (in miliseconds). |
| [param0.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu immediately upon creation. |

<a name="BaseMenu+dom"></a>

### treeview.dom ⇒ <code>object</code>
The DOM elements within the menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>dom</code>](#BaseMenu+dom)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenu+selectors"></a>

### treeview.selectors ⇒ <code>object</code>
The CSS selectors available to the menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>selectors</code>](#BaseMenu+selectors)  
**Returns**: <code>object</code> - - The selectors.  
<a name="BaseMenu+elements"></a>

### treeview.elements ⇒ <code>object</code>
The elements within the menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>elements</code>](#BaseMenu+elements)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenu+openClass"></a>

### treeview.openClass ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "open".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's open class(es).

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>openClass</code>](#BaseMenu+openClass)  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - - The class(es).  
<a name="BaseMenu+closeClass"></a>

### treeview.closeClass ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "closed".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's close class(es).

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>closeClass</code>](#BaseMenu+closeClass)  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - - The class(es).  
<a name="BaseMenu+isTopLevel"></a>

### treeview.isTopLevel ⇒ <code>boolean</code>
A flag marking the root menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>isTopLevel</code>](#BaseMenu+isTopLevel)  
**Returns**: <code>boolean</code> - - The top-level flag.  
<a name="BaseMenu+currentChild"></a>

### treeview.currentChild ⇒ <code>number</code>
The index of the currently selected menu item in the menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>currentChild</code>](#BaseMenu+currentChild)  
**Returns**: <code>number</code> - - The index.  
<a name="BaseMenu+focusState"></a>

### treeview.focusState ⇒ <code>string</code>
The current state of the menu's focus.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusState</code>](#BaseMenu+focusState)  
**Returns**: <code>string</code> - - The state.  
<a name="BaseMenu+currentEvent"></a>

### treeview.currentEvent ⇒ <code>string</code>
This last event triggered on the menu.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>currentEvent</code>](#BaseMenu+currentEvent)  
**Returns**: <code>string</code> - - The event type.  
<a name="BaseMenu+currentMenuItem"></a>

### treeview.currentMenuItem ⇒ [<code>BaseMenuItem</code>](#BaseMenuItem)
The currently selected menu item.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>currentMenuItem</code>](#BaseMenu+currentMenuItem)  
**Returns**: [<code>BaseMenuItem</code>](#BaseMenuItem) - - The menu item.  
<a name="BaseMenu+hoverType"></a>

### treeview.hoverType ⇒ <code>string</code>
The type of hoverability for the menu.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hoverability.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>hoverType</code>](#BaseMenu+hoverType)  
**Returns**: <code>string</code> - - The hover type.  
<a name="BaseMenu+hoverDelay"></a>

### treeview.hoverDelay ⇒ <code>number</code>
The delay time (in miliseconds) used for mouseout events to take place.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hover delay.

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>hoverDelay</code>](#BaseMenu+hoverDelay)  
**Returns**: <code>number</code> - - The delay time.  
<a name="BaseMenu+shouldFocus"></a>

### treeview.shouldFocus ⇒ <code>boolean</code>
A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

Will return false unless any of the following criteria are met:
- The menu's currentEvent is "keyboard".
- The menu's currentEvent is "character".
- The menu's currentEvent is "mouse" _and_ the menu's hoverType is "dynamic".

**Kind**: instance property of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>shouldFocus</code>](#BaseMenu+shouldFocus)  
**Returns**: <code>boolean</code> - - The flag.  
<a name="Treeview+initialize"></a>

### treeview.initialize()
Initializes the menu.

This will also initialize all menu items and sub menus.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>initialize</code>](#BaseMenu+initialize)  
<a name="Treeview+handleKeydown"></a>

### treeview.handleKeydown()
Handles keydown events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>handleKeydown</code>](#BaseMenu+handleKeydown)  
<a name="Treeview+handleKeyup"></a>

### treeview.handleKeyup()
Handles keyup events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>handleKeyup</code>](#BaseMenu+handleKeyup)  
<a name="Treeview+focusLastNode"></a>

### treeview.focusLastNode()
Focus the menu's last node of the entire expanded menu.

This includes all _open_ child menu items.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
<a name="Treeview+openChildren"></a>

### treeview.openChildren()
Open all submenu children.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
<a name="Treeview+focusNextNodeWithCharacter"></a>

### treeview.focusNextNodeWithCharacter(char)
Focus the menu's next node starting with a specific letter.

Wraps to the first node if no match is found after the current node.

This includes all _open_ child menu items.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> | The character to look for. |

<a name="BaseMenu+validate"></a>

### treeview.validate() ⇒ <code>boolean</code>
Validates all aspects of the menu to ensure proper functionality.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>validate</code>](#BaseMenu+validate)  
**Returns**: <code>boolean</code> - - The result of the validation.  
<a name="BaseMenu+setDOMElementType"></a>

### treeview.setDOMElementType(elementType, base, filter)
Sets DOM elements within the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>setDOMElementType</code>](#BaseMenu+setDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to populate. |
| base | <code>HTMLElement</code> | The element used as the base for the querySelect. |
| filter | <code>function</code> | A filter to use to narrow down the DOM elements selected. |

<a name="BaseMenu+addDOMElementType"></a>

### treeview.addDOMElementType(elementType, base, filter)
Adds an element to DOM elements within the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>addDOMElementType</code>](#BaseMenu+addDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to populate. |
| base | <code>HTMLElement</code> | The element used as the base for the querySelect. |
| filter | <code>function</code> | A filter to use to narrow down the DOM elements selected. |

<a name="BaseMenu+clearDOMElementType"></a>

### treeview.clearDOMElementType(elementType)
Clears DOM elements within the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>clearDOMElementType</code>](#BaseMenu+clearDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to clear. |

<a name="BaseMenu+setDOMElements"></a>

### treeview.setDOMElements()
Sets all DOM elements within the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>setDOMElements</code>](#BaseMenu+setDOMElements)  
<a name="BaseMenu+findRootMenu"></a>

### treeview.findRootMenu(menu)
Finds the root menu element.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>findRootMenu</code>](#BaseMenu+findRootMenu)  

| Param | Type | Description |
| --- | --- | --- |
| menu | [<code>BaseMenu</code>](#BaseMenu) | The menu to check. |

<a name="BaseMenu+createChildElements"></a>

### treeview.createChildElements()
Creates and initializes all menu items and submenus.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>createChildElements</code>](#BaseMenu+createChildElements)  
<a name="BaseMenu+handleFocus"></a>

### treeview.handleFocus()
Handles focus events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>handleFocus</code>](#BaseMenu+handleFocus)  
<a name="BaseMenu+handleClick"></a>

### treeview.handleClick()
Handles click events throughout the menu for proper use.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>handleClick</code>](#BaseMenu+handleClick)  
<a name="BaseMenu+handleHover"></a>

### treeview.handleHover()
Handles hover events throughout the menu for proper use.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>handleHover</code>](#BaseMenu+handleHover)  
<a name="BaseMenu+focus"></a>

### treeview.focus()
Focus the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focus</code>](#BaseMenu+focus)  
<a name="BaseMenu+blur"></a>

### treeview.blur()
Unfocus the menu.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>blur</code>](#BaseMenu+blur)  
<a name="BaseMenu+focusCurrentChild"></a>

### treeview.focusCurrentChild()
Focus the menu's current child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusCurrentChild</code>](#BaseMenu+focusCurrentChild)  
<a name="BaseMenu+focusChild"></a>

### treeview.focusChild(index)
Focuses the menu's child at a given index.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusChild</code>](#BaseMenu+focusChild)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the child to focus. |

<a name="BaseMenu+focusFirstChild"></a>

### treeview.focusFirstChild()
Focues the menu's first child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusFirstChild</code>](#BaseMenu+focusFirstChild)  
<a name="BaseMenu+focusLastChild"></a>

### treeview.focusLastChild()
Focus the menu's last child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusLastChild</code>](#BaseMenu+focusLastChild)  
<a name="BaseMenu+focusNextChild"></a>

### treeview.focusNextChild()
Focus the menu's next child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusNextChild</code>](#BaseMenu+focusNextChild)  
<a name="BaseMenu+focusPreviousChild"></a>

### treeview.focusPreviousChild()
Focus the menu's previous child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusPreviousChild</code>](#BaseMenu+focusPreviousChild)  
<a name="BaseMenu+blurCurrentChild"></a>

### treeview.blurCurrentChild()
Blurs the menu's current child.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>blurCurrentChild</code>](#BaseMenu+blurCurrentChild)  
<a name="BaseMenu+focusController"></a>

### treeview.focusController()
Focus the menu's controller.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusController</code>](#BaseMenu+focusController)  
<a name="BaseMenu+focusContainer"></a>

### treeview.focusContainer()
Focus the menu's container.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>focusContainer</code>](#BaseMenu+focusContainer)  
<a name="BaseMenu+closeChildren"></a>

### treeview.closeChildren()
Close all submenu children.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>closeChildren</code>](#BaseMenu+closeChildren)  
<a name="BaseMenu+blurChildren"></a>

### treeview.blurChildren()
Blurs all children and submenu's children.

**Kind**: instance method of [<code>Treeview</code>](#Treeview)  
**Overrides**: [<code>blurChildren</code>](#BaseMenu+blurChildren)  
