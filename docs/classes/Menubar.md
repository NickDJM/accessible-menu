<a name="Menubar"></a>

## Menubar ⇐ [<code>BaseMenu</code>](#BaseMenu)
An accessible menubar navigation in the DOM.

See [Navigation Menubar Example](https://www.w3.org/TR/wai-aria-practices-1.2/examples/menubar/menubar-1/menubar-1.html)

**Kind**: global class  
**Extends**: [<code>BaseMenu</code>](#BaseMenu)  

* [Menubar](#Menubar) ⇐ [<code>BaseMenu</code>](#BaseMenu)
    * [new Menubar(options)](#new_Menubar_new)
    * [.dom](#BaseMenu+dom) : <code>object.&lt;HTMLElement, Array.&lt;HTMLElement&gt;&gt;</code>
    * [.selectors](#BaseMenu+selectors) : <code>object.&lt;string&gt;</code>
    * [.elements](#BaseMenu+elements) : <code>object.&lt;BaseMenu, BaseMenuToggle, Array.&lt;BaseMenuItem&gt;, Array.&lt;BaseMenuToggle&gt;&gt;</code>
    * [.openClass](#BaseMenu+openClass) : <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [.closeClass](#BaseMenu+closeClass) : <code>string</code> \| <code>Array.&lt;string&gt;</code>
    * [.isTopLevel](#BaseMenu+isTopLevel) : <code>boolean</code>
    * [.currentChild](#BaseMenu+currentChild) : <code>number</code>
    * [.focusState](#BaseMenu+focusState) : <code>string</code>
    * [.currentEvent](#BaseMenu+currentEvent) : <code>string</code>
    * [.currentMenuItem](#BaseMenu+currentMenuItem) : [<code>BaseMenuItem</code>](#BaseMenuItem)
    * [.hoverType](#BaseMenu+hoverType) : <code>string</code>
    * [.hoverDelay](#BaseMenu+hoverDelay) : <code>number</code>
    * [.shouldFocus](#BaseMenu+shouldFocus) : <code>boolean</code>
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

### new Menubar(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the menu. |
| options.menuElement | <code>HTMLElement</code> |  | The menu element in the DOM. |
| [options.menuItemSelector] | <code>string</code> | <code>&quot;li&quot;</code> | The CSS selector string for menu items. |
| [options.menuLinkSelector] | <code>string</code> | <code>&quot;a&quot;</code> | The CSS selector string for menu links. |
| [options.submenuItemSelector] | <code>string</code> |  | The CSS selector string for menu items containing submenus. |
| [options.submenuToggleSelector] | <code>string</code> | <code>&quot;a&quot;</code> | The CSS selector string for submenu toggle buttons/links. |
| [options.submenuSelector] | <code>string</code> | <code>&quot;ul&quot;</code> | The CSS selector string for submenus. |
| [options.controllerElement] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | The element controlling the menu in the DOM. |
| [options.containerElement] | <code>HTMLElement</code> \| <code>null</code> | <code></code> | The element containing the menu in the DOM. |
| [options.openClass] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>&quot;show&quot;</code> | The class to apply when a menu is "open". |
| [options.closeClass] | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>null</code> | <code>&quot;hide&quot;</code> | The class to apply when a menu is "closed". |
| [options.isTopLevel] | <code>boolean</code> | <code>false</code> | A flag to mark the root menu. |
| [options.parentMenu] | [<code>Menubar</code>](#Menubar) \| <code>null</code> | <code></code> | The parent menu to this menu. |
| [options.hoverType] | <code>string</code> | <code>&quot;off&quot;</code> | The type of hoverability a menu has. |
| [options.hoverDelay] | <code>number</code> | <code>250</code> | The delay for closing menus if the menu is hoverable (in miliseconds). |
| [options.initialize] | <code>boolean</code> | <code>true</code> | A flag to initialize the menu immediately upon creation. |

<a name="BaseMenu+dom"></a>

### menubar.dom : <code>object.&lt;HTMLElement, Array.&lt;HTMLElement&gt;&gt;</code>
The DOM elements within the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>dom</code>](#BaseMenu+dom)  
<a name="BaseMenu+selectors"></a>

### menubar.selectors : <code>object.&lt;string&gt;</code>
The CSS selectors available to the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>selectors</code>](#BaseMenu+selectors)  
<a name="BaseMenu+elements"></a>

### menubar.elements : <code>object.&lt;BaseMenu, BaseMenuToggle, Array.&lt;BaseMenuItem&gt;, Array.&lt;BaseMenuToggle&gt;&gt;</code>
The elements within the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>elements</code>](#BaseMenu+elements)  
<a name="BaseMenu+openClass"></a>

### menubar.openClass : <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "open".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's open class(es).

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>openClass</code>](#BaseMenu+openClass)  
<a name="BaseMenu+closeClass"></a>

### menubar.closeClass : <code>string</code> \| <code>Array.&lt;string&gt;</code>
The class(es) to apply when the menu is "closed".

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's close class(es).

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>closeClass</code>](#BaseMenu+closeClass)  
<a name="BaseMenu+isTopLevel"></a>

### menubar.isTopLevel : <code>boolean</code>
A flag marking the root menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>isTopLevel</code>](#BaseMenu+isTopLevel)  
<a name="BaseMenu+currentChild"></a>

### menubar.currentChild : <code>number</code>
The index of the currently selected menu item in the menu.

- Attempting to set a value < -1 will set the `currentChild` to -1.
- Attempting to set a value >= the number of menu items will set the `currentChild` to the number of menu items - 1.

If the current menu has a parent menu _and_ the menu's current event is `"mouse"`,
The parent menu will have it's current child updated as well to help with transitioning
between mouse and keyboard naviation.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentChild</code>](#BaseMenu+currentChild)  
<a name="BaseMenu+focusState"></a>

### menubar.focusState : <code>string</code>
The current state of the menu's focus.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focusState</code>](#BaseMenu+focusState)  
<a name="BaseMenu+currentEvent"></a>

### menubar.currentEvent : <code>string</code>
This last event triggered on the menu.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentEvent</code>](#BaseMenu+currentEvent)  
<a name="BaseMenu+currentMenuItem"></a>

### menubar.currentMenuItem : [<code>BaseMenuItem</code>](#BaseMenuItem)
The currently selected menu item.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>currentMenuItem</code>](#BaseMenu+currentMenuItem)  
<a name="BaseMenu+hoverType"></a>

### menubar.hoverType : <code>string</code>
The type of hoverability for the menu.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hoverability.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>hoverType</code>](#BaseMenu+hoverType)  
<a name="BaseMenu+hoverDelay"></a>

### menubar.hoverDelay : <code>number</code>
The delay time (in miliseconds) used for mouseout events to take place.

This functions differently for root vs. submenus.
Submenus will always inherit their root menu's hover delay.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>hoverDelay</code>](#BaseMenu+hoverDelay)  
<a name="BaseMenu+shouldFocus"></a>

### menubar.shouldFocus : <code>boolean</code>
A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.

Will return false unless any of the following criteria are met:
- The menu's `currentEvent` is `"keyboard"`.
- The menu's `currentEvent` is `"character"`.
- The menu's `currentEvent` is `"mouse"` _and_ the menu's `hoverType` is `"dynamic"`.

**Kind**: instance property of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>shouldFocus</code>](#BaseMenu+shouldFocus)  
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

This will set the actual `domElement` property, so all existing items in a given `domElement` property will be removed when this is run.

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

This is an additive function, so existing items in a given `domElement` property will not be touched.

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

Utiliizes [setDOMElementType](setDOMElementType), [clearDOMElementType](clearDOMElementType), and [addDOMElementType](addDOMElementType).

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

- Adds a `focus` listener to every menu item so when it gains focus, it will set the item's containing menu to a "self" focus state, any parent menu to a "child" focus state, and any child menu to a "none" focus state.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleFocus</code>](#BaseMenu+handleFocus)  
<a name="BaseMenu+handleHover"></a>

### menubar.handleHover()
Handles hover events throughout the menu for proper use.

Adds `mouseenter` listeners to all menu items and `mouseleave` listeners to all submenu items which function differently depending on the menu's [hoverType](hoverType).

**Hover Type "on"**
- When a `mouseenter` event triggers on any menu item the menu's [currentChild](currentChild) value will change to that menu item.
- When a `mouseenter` event triggers on a submenu item the `preview()` method for the submenu item's toggle will be called.
- When a `mouseleave` event triggers on an open submenu item the `close()` method for the submenu item's toggle will be called after a delay set by the menu's [hoverDelay](hoverDelay).

**Hover Type "dynamic"**
- When a `mouseenter` event triggers on any menu item the menu's [currentChild](currentChild) value will change to that menu item.
- When a `mouseenter` event triggers on any menu item, and the menu's [focusState](focusState) is not `"none"`, the menu item will be focused.
- When a `mouseenter` event triggers on a submenu item, and a submenu is already open, the `preview()` method for the submenu item's toggle will be called.
- When a `mouseenter` event triggers on a submenu item, and no submenu is open, no submenu-specific methods will be called.
- When a `mouseleave` event triggers on an open submenu item that is not a root-level submenu item the `close()` method for the submenu item's toggle will be called and the submenu item will be focused after a delay set by the menu's [hoverDelay](hoverDelay).
- When a `mouseleave` event triggers on an open submenu item that is a root-level submenu item no submenu-specific methods will be called.

**Hover Type "off"**
All `mouseenter` and `mouseleave` events are ignored.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>handleHover</code>](#BaseMenu+handleHover)  
<a name="BaseMenu+focus"></a>

### menubar.focus()
Focus the menu.

Sets the menu's [focusState](focusState) to `"self"` and focusses the menu if the menu's [shouldFocus](shouldFocus) vallue is `true`.

**Kind**: instance method of [<code>Menubar</code>](#Menubar)  
**Overrides**: [<code>focus</code>](#BaseMenu+focus)  
<a name="BaseMenu+blur"></a>

### menubar.blur()
Unfocus the menu.

Sets the menu's [focusState](focusState) to `"none"` and blurs the menu if the menu's [shouldFocus](shouldFocus) vallue is `true`.

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
