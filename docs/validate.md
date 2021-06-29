## Functions

<dl>
<dt><a href="#isValidInstance">isValidInstance(contructor, elements)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check to see if the provided elements have a specific contructor.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>This is essentially just a wrapper function around checking instanceof with
more descriptive error message to help debugging.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isValidType">isValidType(type, values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check to see if the provided values are of a specific type.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>This is essentially just a wrapper function around checking typeof with
more descriptive error message to help debugging.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isCSSSelector">isCSSSelector(values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks to see if the provided values are valid CSS selectors.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isValidClassList">isValidClassList(values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks to see if the provided value is either a string or an array of strings.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isValidState">isValidState(values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check to see if the provided values are valid focus states for a menu.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isValidEvent">isValidEvent(values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check to see if the provided values are valid event types for a menu.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isValidHoverType">isValidHoverType(values)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check to see if the provided values are valid hover types for a menu.</p>
<p>The values must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
<p>Will return true is the check is successful.</p>
</dd>
<dt><a href="#isTag">isTag(tagName, elements)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks to see if the provided elements are using a specific tag.</p>
<p>The elements must be provided inside of an object
so the variable name can be retrieved in case of errors.</p>
</dd>
<dt><a href="#isEventSupported">isEventSupported(event, element)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks to see if an event is supported by a node.</p>
</dd>
</dl>

<a name="isValidInstance"></a>

## isValidInstance(contructor, elements) ⇒ <code>boolean</code>
Check to see if the provided elements have a specific contructor.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking instanceof with
more descriptive error message to help debugging.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| contructor | <code>object</code> | The constructor to check for. |
| elements | <code>object</code> | The element(s) to check. |

<a name="isValidType"></a>

## isValidType(type, values) ⇒ <code>boolean</code>
Check to see if the provided values are of a specific type.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

This is essentially just a wrapper function around checking typeof with
more descriptive error message to help debugging.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type to check for. |
| values | <code>object</code> | The value(s) to check. |

<a name="isCSSSelector"></a>

## isCSSSelector(values) ⇒ <code>boolean</code>
Checks to see if the provided values are valid CSS selectors.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object.&lt;string&gt;</code> | The value(s) to check. |

<a name="isValidClassList"></a>

## isValidClassList(values) ⇒ <code>boolean</code>
Checks to see if the provided value is either a string or an array of strings.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object.&lt;string, Array.&lt;string&gt;&gt;</code> | The value(s) to check. |

<a name="isValidState"></a>

## isValidState(values) ⇒ <code>boolean</code>
Check to see if the provided values are valid focus states for a menu.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object.&lt;string&gt;</code> | The value(s) to check. |

<a name="isValidEvent"></a>

## isValidEvent(values) ⇒ <code>boolean</code>
Check to see if the provided values are valid event types for a menu.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object.&lt;string&gt;</code> | The value(s) to check. |

<a name="isValidHoverType"></a>

## isValidHoverType(values) ⇒ <code>boolean</code>
Check to see if the provided values are valid hover types for a menu.

The values must be provided inside of an object
so the variable name can be retrieved in case of errors.

Will return true is the check is successful.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>object.&lt;string&gt;</code> | The value(s) to check. |

<a name="isTag"></a>

## isTag(tagName, elements) ⇒ <code>boolean</code>
Checks to see if the provided elements are using a specific tag.

The elements must be provided inside of an object
so the variable name can be retrieved in case of errors.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result of the check.  

| Param | Type | Description |
| --- | --- | --- |
| tagName | <code>string</code> | The name of the tag. |
| elements | <code>object.&lt;HTMLEelement&gt;</code> | The element(s) to check. |

<a name="isEventSupported"></a>

## isEventSupported(event, element) ⇒ <code>boolean</code>
Checks to see if an event is supported by a node.

**Kind**: global function  
**Returns**: <code>boolean</code> - - The result.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | The event type. |
| element | <code>HTMLElement</code> | The element to check. |

