<a name="Menubar"></a>

## Menubar ⇐ [<code>BaseMenu</code>](#BaseMenu)
An accessible menubar navigation in the DOM.

See [Navigation Menubar Example](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html)

**Kind**: global class  
**Extends**: [<code>BaseMenu</code>](#BaseMenu)  

* [Menubar](#Menubar) ⇐ [<code>BaseMenu</code>](#BaseMenu)
    * [new Menubar(param0)](#new_Menubar_new)
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
    * [.initialize()](#Menubar+initialize)
    * [.handleClick()](#Menubar+handleClick)
    * [.handleKeydown()](#Menubar+handleKeydown)
    * [.handleKeyup()](#Menubar+handleKeyup)
    * [.focusNextChild()](#Menubar+focusNextChild)
    * [.focusPreviousChild()](#Menubar+focusPreviousChild)
    * [.focusNextChildWithCharacter(char)](#Menubar+focusNextChildWithCharacter)
    * [.validate()](#BaseMenu+validate) ⇒ <code>boolean</code>
    * [.setDOMElementType(elementType, base, filter)](#BaseMenu+setDOMElementType)
    * [.addDOMElementType(elementType, base, filter)](#BaseMenu+addDOMElementType)
    * [.clearDOMElementType(elementType)](#BaseMenu+clearDOMElementType)
    * [.setDOMElements()](#BaseMenu+setDOMElements)
    * [.findRootMenu(menu)](#BaseMenu+findRootMenu)
    * [.createChildElements()](#BaseMenu+createChildElements)
    * [.handleFocus()](#BaseMenu+handleFocus)
    * [.handleHover()](#BaseMenu+handleHover)
    * [.focus()](#BaseMenu+focus)
    * [.blur()](#BaseMenu+blur)
    * [.focusCurrentChild()](#BaseMenu+focusCurrentChild)
    * [.focusChild(index)](#BaseMenu+focusChild)
    * [.focusFirstChild()](#BaseMenu+focusFirstChild)
    * [.focusLastChild()](#BaseMenu+focusLastChild)
    * [.blurCurrentChild()](#BaseMenu+blurCurrentChild)
    * [.focusController()](#BaseMenu+focusController)
    * [.focusContainer()](#BaseMenu+focusContainer)
    * [.closeChildren()](#BaseMenu+closeChildren)
    * [.blurChildren()](#BaseMenu+blurChildren)

<a name="new_Menubar_new"></a>

### new Menubar(param0)

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
| [param0.parentMenu] | [<code>Menubar</code>](#Menubar) \| <code>null</code> | <code></code> | The parent menu to this menu. |
| [param0.hoverType] | <code>string</code> | <code>&quot;\&quot;off\&quot;&quot;</code> | The type of hoverability a menu has. |
| [param0.hoverDelay] | <code>number</code> | <code>250</code> | The delay for closing menus if the menu is hoverable (in miliseconds). |
| [param0.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu immediately upon creation. |

<a name="BaseMenu+dom"></a>

### menubar.dom ⇒ <code>object</code>
The DOM elements within the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>dom</code>](#BaseMenu+dom)  
**Returns**: <code>object</code> - - The DOM elements.  
<a name="BaseMenu+selectors"></a>

### menubar.selectors ⇒ <code>object</code>
The CSS selectors available to the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>selectors</code>](#BaseMenu+selectors)  
**Returns**: <code>object</code> - - The selectors.  
<a name="BaseMenu+elements"></a>

### menubar.elements ⇒ <code>object</code>
The elements within the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>elements</code>](#BaseMenu+elements)  
**Returns**: <code>object</code> - - The elements.  
<a name="BaseMenu+openClass"></a>

### menubar.openClass ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "open".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's open class(es).

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>openClass</code>](#BaseMenu+openClass)  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - - The class(es).  
<a name="BaseMenu+closeClass"></a>

### menubar.closeClass ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "closed".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's close class(es).

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>closeClass</code>](#BaseMenu+closeClass)  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - - The class(es).  
<a name="BaseMenu+isTopLevel"></a>

### menubar.isTopLevel ⇒ <code>boolean</code>
A flag marking the root menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>isTopLevel</code>](#BaseMenu+isTopLevel)  
**Returns**: <code>boolean</code> - - The top-level flag.  
<a name="BaseMenu+currentChild"></a>

### menubar.currentChild ⇒ <code>number</code>
The index of the currently selected menu item in the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentChild</code>](#BaseMenu+currentChild)  
**Returns**: <code>number</code> - - The index.  
<a name="BaseMenu+focusState"></a>

### menubar.focusState ⇒ <code>string</code>
The current state of the menu's focus.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusState</code>](#BaseMenu+focusState)  
**Returns**: <code>string</code> - - The state.  
<a name="BaseMenu+currentEvent"></a>

### menubar.currentEvent ⇒ <code>string</code>
This last event triggered on the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentEvent</code>](#BaseMenu+currentEvent)  
**Returns**: <code>string</code> - - The event type.  
<a name="BaseMenu+currentMenuItem"></a>

### menubar.currentMenuItem ⇒ [<code>BaseMenuItem</code>](#BaseMenuItem)
The currently selected menu item.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentMenuItem</code>](#BaseMenu+currentMenuItem)  
**Returns**: [<code>BaseMenuItem</code>](#BaseMenuItem) - - The menu item.  
<a name="BaseMenu+hoverType"></a>

### menubar.hoverType ⇒ <code>string</code>
The type of hoverability for the menu.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hoverability.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>hoverType</code>](#BaseMenu+hoverType)  
**Returns**: <code>string</code> - - The hover type.  
<a name="BaseMenu+hoverDelay"></a>

### menubar.hoverDelay ⇒ <code>number</code>
The delay time (in miliseconds) used for mouseout events to take place.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hover delay.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>hoverDelay</code>](#BaseMenu+hoverDelay)  
**Returns**: <code>number</code> - - The delay time.  
<a name="BaseMenu+shouldFocus"></a>

### menubar.shouldFocus ⇒ <code>boolean</code>
A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

Will return false unless any of the following criteria are met:
- The menu's currentEvent is "keyboard".
- The menu's currentEvent is "character".
- The menu's currentEvent is "mouse" _and_ the menu's hoverType is "dynamic".

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>shouldFocus</code>](#BaseMenu+shouldFocus)  
**Returns**: <code>boolean</code> - - The flag.  
<a name="Menubar+initialize"></a>

### menubar.initialize()
Initializes the menu.

This will also initialize all menu items and sub menus.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>initialize</code>](#BaseMenu+initialize)  
<a name="Menubar+handleClick"></a>

### menubar.handleClick()
Handles click events throughout the menu for proper use.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleClick</code>](#BaseMenu+handleClick)  
<a name="Menubar+handleKeydown"></a>

### menubar.handleKeydown()
Handles keydown events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleKeydown</code>](#BaseMenu+handleKeydown)  
<a name="Menubar+handleKeyup"></a>

### menubar.handleKeyup()
Handles keyup events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleKeyup</code>](#BaseMenu+handleKeyup)  
<a name="Menubar+focusNextChild"></a>

### menubar.focusNextChild()
Focus the menu's next child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusNextChild</code>](#BaseMenu+focusNextChild)  
<a name="Menubar+focusPreviousChild"></a>

### menubar.focusPreviousChild()
Focus the menu's previous child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusPreviousChild</code>](#BaseMenu+focusPreviousChild)  
<a name="Menubar+focusNextChildWithCharacter"></a>

### menubar.focusNextChildWithCharacter(char)
Focus the menu's next child starting with a specific letter.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  

| Param | Type | Description |
| --- | --- | --- |
| char | <code>string</code> | The character to look for. |

<a name="BaseMenu+validate"></a>

### menubar.validate() ⇒ <code>boolean</code>
Validates all aspects of the menu to ensure proper functionality.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>validate</code>](#BaseMenu+validate)  
**Returns**: <code>boolean</code> - - The result of the validation.  
<a name="BaseMenu+setDOMElementType"></a>

### menubar.setDOMElementType(elementType, base, filter)
Sets DOM elements within the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>setDOMElementType</code>](#BaseMenu+setDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to populate. |
| base | <code>HTMLElement</code> | The element used as the base for the querySelect. |
| filter | <code>function</code> | A filter to use to narrow down the DOM elements selected. |

<a name="BaseMenu+addDOMElementType"></a>

### menubar.addDOMElementType(elementType, base, filter)
Adds an element to DOM elements within the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>addDOMElementType</code>](#BaseMenu+addDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to populate. |
| base | <code>HTMLElement</code> | The element used as the base for the querySelect. |
| filter | <code>function</code> | A filter to use to narrow down the DOM elements selected. |

<a name="BaseMenu+clearDOMElementType"></a>

### menubar.clearDOMElementType(elementType)
Clears DOM elements within the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>clearDOMElementType</code>](#BaseMenu+clearDOMElementType)  

| Param | Type | Description |
| --- | --- | --- |
| elementType | <code>string</code> | The type of element to clear. |

<a name="BaseMenu+setDOMElements"></a>

### menubar.setDOMElements()
Sets all DOM elements within the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>setDOMElements</code>](#BaseMenu+setDOMElements)  
<a name="BaseMenu+findRootMenu"></a>

### menubar.findRootMenu(menu)
Finds the root menu element.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>findRootMenu</code>](#BaseMenu+findRootMenu)  

| Param | Type | Description |
| --- | --- | --- |
| menu | [<code>BaseMenu</code>](#BaseMenu) | The menu to check. |

<a name="BaseMenu+createChildElements"></a>

### menubar.createChildElements()
Creates and initializes all menu items and submenus.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>createChildElements</code>](#BaseMenu+createChildElements)  
<a name="BaseMenu+handleFocus"></a>

### menubar.handleFocus()
Handles focus events throughout the menu for proper menu use.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleFocus</code>](#BaseMenu+handleFocus)  
<a name="BaseMenu+handleHover"></a>

### menubar.handleHover()
Handles hover events throughout the menu for proper use.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleHover</code>](#BaseMenu+handleHover)  
<a name="BaseMenu+focus"></a>

### menubar.focus()
Focus the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focus</code>](#BaseMenu+focus)  
<a name="BaseMenu+blur"></a>

### menubar.blur()
Unfocus the menu.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>blur</code>](#BaseMenu+blur)  
<a name="BaseMenu+focusCurrentChild"></a>

### menubar.focusCurrentChild()
Focus the menu's current child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusCurrentChild</code>](#BaseMenu+focusCurrentChild)  
<a name="BaseMenu+focusChild"></a>

### menubar.focusChild(index)
Focuses the menu's child at a given index.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusChild</code>](#BaseMenu+focusChild)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the child to focus. |

<a name="BaseMenu+focusFirstChild"></a>

### menubar.focusFirstChild()
Focues the menu's first child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusFirstChild</code>](#BaseMenu+focusFirstChild)  
<a name="BaseMenu+focusLastChild"></a>

### menubar.focusLastChild()
Focus the menu's last child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusLastChild</code>](#BaseMenu+focusLastChild)  
<a name="BaseMenu+blurCurrentChild"></a>

### menubar.blurCurrentChild()
Blurs the menu's current child.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>blurCurrentChild</code>](#BaseMenu+blurCurrentChild)  
<a name="BaseMenu+focusController"></a>

### menubar.focusController()
Focus the menu's controller.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusController</code>](#BaseMenu+focusController)  
<a name="BaseMenu+focusContainer"></a>

### menubar.focusContainer()
Focus the menu's container.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusContainer</code>](#BaseMenu+focusContainer)  
<a name="BaseMenu+closeChildren"></a>

### menubar.closeChildren()
Close all submenu children.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>closeChildren</code>](#BaseMenu+closeChildren)  
<a name="BaseMenu+blurChildren"></a>

### menubar.blurChildren()
Blurs all children and submenu's children.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>blurChildren</code>](#BaseMenu+blurChildren)  
