/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultTemplateFactory */
/* harmony export (immutable) */ __webpack_exports__["h"] = render;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// The first argument to JS template tags retain identity across multiple
// calls to a tag for the same literal, so we can cache work done per literal
// in a Map.
const templateCaches = new Map();
/* harmony export (immutable) */ __webpack_exports__["i"] = templateCaches;

/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html');
/* unused harmony export html */

/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg');
/* unused harmony export svg */

/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, partCallback = defaultPartCallback) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.partCallback = partCallback;
    }
    /**
     * Returns a string of HTML used to create a <template> element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isTextBinding = true;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            html += s;
            // We're in a text position if the previous string closed its tags.
            // If it doesn't have any tags, then we use the previous text position
            // state.
            const closing = findTagClose(s);
            isTextBinding = closing > -1 ? closing < s.length : isTextBinding;
            html += isTextBinding ? nodeMarker : marker;
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = TemplateResult;

/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTMl in an <svg> tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the <svg> tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = SVGTemplateResult;

/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function defaultTemplateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = new Map();
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.get(result.strings);
    if (template === undefined) {
        template = new Template(result, result.getTemplateElement());
        templateCache.set(result.strings, template);
    }
    return template;
}
/**
 * Renders a template to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result a TemplateResult created by evaluating a template tag like
 *     `html` or `svg.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param templateFactory a function to create a Template or retreive one from
 *     cache.
 */
function render(result, container, templateFactory = defaultTemplateFactory) {
    const template = templateFactory(result);
    let instance = container.__templateInstance;
    // Repeat render, just call update()
    if (instance !== undefined && instance.template === template &&
        instance._partCallback === result.partCallback) {
        instance.update(result.values);
        return;
    }
    // First render, create a new TemplateInstance and append it
    instance =
        new TemplateInstance(template, result.partCallback, templateFactory);
    container.__templateInstance = instance;
    const fragment = instance._clone();
    instance.update(result.values);
    removeNodes(container, container.firstChild);
    container.appendChild(fragment);
}
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-posisitions, not attribute positions,
 * in template.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#attributes-0
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-character
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = /[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;
/**
 * Finds the closing index of the last closed HTML tag.
 * This has 3 possible return values:
 *   - `-1`, meaning there is no tag in str.
 *   - `string.length`, meaning the last opened tag is unclosed.
 *   - Some positive number < str.length, meaning the index of the closing '>'.
 */
function findTagClose(str) {
    const close = str.lastIndexOf('>');
    const open = str.indexOf('<', close + 1);
    return open > -1 ? str.length : close;
}
/**
 * A placeholder for a dynamic expression in an HTML template.
 *
 * There are two built-in part types: AttributePart and NodePart. NodeParts
 * always represent a single dynamic expression, while AttributeParts may
 * represent as many expressions are contained in the attribute.
 *
 * A Template's parts are mutable, so parts can be replaced or modified
 * (possibly to implement different template semantics). The contract is that
 * parts can only be replaced, not removed, added or reordered, and parts must
 * always consume the correct number of values in their `update()` method.
 *
 * TODO(justinfagnani): That requirement is a little fragile. A
 * TemplateInstance could instead be more careful about which values it gives
 * to Part.update().
 */
class TemplatePart {
    constructor(type, index, name, rawName, strings) {
        this.type = type;
        this.index = index;
        this.name = name;
        this.rawName = rawName;
        this.strings = strings;
    }
}
/* unused harmony export TemplatePart */

/**
 * An updateable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const content = this.element.content;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(content, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
               NodeFilter.SHOW_TEXT */, null, false);
        let index = -1;
        let partIndex = 0;
        const nodesToRemove = [];
        // The actual previous node, accounting for removals: if a node is removed
        // it will never be the previousNode.
        let previousNode;
        // Used to set previousNode at the top of the loop.
        let currentNode;
        while (walker.nextNode()) {
            index++;
            previousNode = currentNode;
            const node = currentNode = walker.currentNode;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (!node.hasAttributes()) {
                    continue;
                }
                const attributes = node.attributes;
                // Per https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                // attributes are not guaranteed to be returned in document order. In
                // particular, Edge/IE can return them out of order, so we cannot assume
                // a correspondance between part index and attribute index.
                let count = 0;
                for (let i = 0; i < attributes.length; i++) {
                    if (attributes[i].value.indexOf(marker) >= 0) {
                        count++;
                    }
                }
                while (count-- > 0) {
                    // Get the template literal section leading up to the first
                    // expression in this attribute attribute
                    const stringForPart = result.strings[partIndex];
                    // Find the attribute name
                    const attributeNameInPart = lastAttributeNameRegex.exec(stringForPart)[1];
                    // Find the corresponding attribute
                    const attribute = attributes.getNamedItem(attributeNameInPart);
                    const stringsForAttributeValue = attribute.value.split(markerRegex);
                    this.parts.push(new TemplatePart('attribute', index, attribute.name, attributeNameInPart, stringsForAttributeValue));
                    node.removeAttribute(attribute.name);
                    partIndex += stringsForAttributeValue.length - 1;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const nodeValue = node.nodeValue;
                if (nodeValue.indexOf(marker) < 0) {
                    continue;
                }
                const parent = node.parentNode;
                const strings = nodeValue.split(markerRegex);
                const lastIndex = strings.length - 1;
                // We have a part for each match found
                partIndex += lastIndex;
                // We keep this current node, but reset its content to the last
                // literal part. We insert new literal nodes before this so that the
                // tree walker keeps its position correctly.
                node.textContent = strings[lastIndex];
                // Generate a new text node for each literal section
                // These nodes are also used as the markers for node parts
                for (let i = 0; i < lastIndex; i++) {
                    parent.insertBefore(document.createTextNode(strings[i]), node);
                    this.parts.push(new TemplatePart('node', index++));
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */ &&
                node.nodeValue === marker) {
                const parent = node.parentNode;
                // Add a new marker node to be the startNode of the Part if any of the
                // following are true:
                //  * We don't have a previousSibling
                //  * previousSibling is being removed (thus it's not the
                //    `previousNode`)
                //  * previousSibling is not a Text node
                //
                // TODO(justinfagnani): We should be able to use the previousNode here
                // as the marker node and reduce the number of extra nodes we add to a
                // template. See https://github.com/PolymerLabs/lit-html/issues/147
                const previousSibling = node.previousSibling;
                if (previousSibling === null || previousSibling !== previousNode ||
                    previousSibling.nodeType !== Node.TEXT_NODE) {
                    parent.insertBefore(document.createTextNode(''), node);
                }
                else {
                    index--;
                }
                this.parts.push(new TemplatePart('node', index++));
                nodesToRemove.push(node);
                // If we don't have a nextSibling add a marker node.
                // We don't have to check if the next node is going to be removed,
                // because that node will induce a new marker if so.
                if (node.nextSibling === null) {
                    parent.insertBefore(document.createTextNode(''), node);
                }
                else {
                    index--;
                }
                currentNode = previousNode;
                partIndex++;
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Template;

/**
 * Returns a value ready to be inserted into a Part from a user-provided value.
 *
 * If the user value is a directive, this invokes the directive with the given
 * part. If the value is null, it's converted to undefined to work better
 * with certain DOM APIs, like textContent.
 */
const getValue = (part, value) => {
    // `null` as the value of a Text node will render the string 'null'
    // so we convert it to undefined
    if (isDirective(value)) {
        value = value(part);
        return directiveValue;
    }
    return value === null ? undefined : value;
};
/* harmony export (immutable) */ __webpack_exports__["g"] = getValue;

const directive = (f) => {
    f.__litDirective = true;
    return f;
};
/* unused harmony export directive */

const isDirective = (o) => typeof o === 'function' && o.__litDirective === true;
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const directiveValue = {};
/* harmony export (immutable) */ __webpack_exports__["f"] = directiveValue;

const isPrimitiveValue = (value) => value === null ||
    !(typeof value === 'object' || typeof value === 'function');
class AttributePart {
    constructor(instance, element, name, strings) {
        this.instance = instance;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.size = strings.length - 1;
        this._previousValues = [];
    }
    _interpolate(values, startIndex) {
        const strings = this.strings;
        const l = strings.length - 1;
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const v = getValue(this, values[startIndex + i]);
            if (v && v !== directiveValue &&
                (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
                for (const t of v) {
                    // TODO: we need to recursively call getValue into iterables...
                    text += t;
                }
            }
            else {
                text += v;
            }
        }
        return text + strings[l];
    }
    _equalToPreviousValues(values, startIndex) {
        for (let i = startIndex; i < startIndex + this.size; i++) {
            if (this._previousValues[i] !== values[i] ||
                !isPrimitiveValue(values[i])) {
                return false;
            }
        }
        return true;
    }
    setValue(values, startIndex) {
        if (this._equalToPreviousValues(values, startIndex)) {
            return;
        }
        const s = this.strings;
        let value;
        if (s.length === 2 && s[0] === '' && s[1] === '') {
            // An expression that occupies the whole attribute value will leave
            // leading and trailing empty strings.
            value = getValue(this, values[startIndex]);
            if (Array.isArray(value)) {
                value = value.join('');
            }
        }
        else {
            value = this._interpolate(values, startIndex);
        }
        if (value !== directiveValue) {
            this.element.setAttribute(this.name, value);
        }
        this._previousValues = values;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AttributePart;

class NodePart {
    constructor(instance, startNode, endNode) {
        this.instance = instance;
        this.startNode = startNode;
        this.endNode = endNode;
        this._previousValue = undefined;
    }
    setValue(value) {
        value = getValue(this, value);
        if (value === directiveValue) {
            return;
        }
        if (isPrimitiveValue(value)) {
            // Handle primitive values
            // If the value didn't change, do nothing
            if (value === this._previousValue) {
                return;
            }
            this._setText(value);
        }
        else if (value instanceof TemplateResult) {
            this._setTemplateResult(value);
        }
        else if (Array.isArray(value) || value[Symbol.iterator]) {
            this._setIterable(value);
        }
        else if (value instanceof Node) {
            this._setNode(value);
        }
        else if (value.then !== undefined) {
            this._setPromise(value);
        }
        else {
            // Fallback, will render the string representation
            this._setText(value);
        }
    }
    _insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    _setNode(value) {
        if (this._previousValue === value) {
            return;
        }
        this.clear();
        this._insert(value);
        this._previousValue = value;
    }
    _setText(value) {
        const node = this.startNode.nextSibling;
        value = value === undefined ? '' : value;
        if (node === this.endNode.previousSibling &&
            node.nodeType === Node.TEXT_NODE) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if _previousValue is
            // primitive?
            node.textContent = value;
        }
        else {
            this._setNode(document.createTextNode(value));
        }
        this._previousValue = value;
    }
    _setTemplateResult(value) {
        const template = this.instance._getTemplate(value);
        let instance;
        if (this._previousValue && this._previousValue.template === template) {
            instance = this._previousValue;
        }
        else {
            instance = new TemplateInstance(template, this.instance._partCallback, this.instance._getTemplate);
            this._setNode(instance._clone());
            this._previousValue = instance;
        }
        instance.update(value.values);
    }
    _setIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _previousValue is an array, then the previous render was of an
        // iterable and _previousValue will contain the NodeParts from the previous
        // render. If _previousValue is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this._previousValue)) {
            this.clear();
            this._previousValue = [];
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._previousValue;
        let partIndex = 0;
        for (const item of value) {
            // Try to reuse an existing part
            let itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                // If we're creating the first item part, it's startNode should be the
                // container's startNode
                let itemStart = this.startNode;
                // If we're not creating the first part, create a new separator marker
                // node, and fix up the previous part's endNode to point to it
                if (partIndex > 0) {
                    const previousPart = itemParts[partIndex - 1];
                    itemStart = previousPart.endNode = document.createTextNode('');
                    this._insert(itemStart);
                }
                itemPart = new NodePart(this.instance, itemStart, this.endNode);
                itemParts.push(itemPart);
            }
            itemPart.setValue(item);
            partIndex++;
        }
        if (partIndex === 0) {
            this.clear();
            this._previousValue = undefined;
        }
        else if (partIndex < itemParts.length) {
            const lastPart = itemParts[partIndex - 1];
            // Truncate the parts array so _previousValue reflects the current state
            itemParts.length = partIndex;
            this.clear(lastPart.endNode.previousSibling);
            lastPart.endNode = this.endNode;
        }
    }
    _setPromise(value) {
        this._previousValue = value;
        value.then((v) => {
            if (this._previousValue === value) {
                this.setValue(v);
            }
        });
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/* unused harmony export NodePart */

const defaultPartCallback = (instance, templatePart, node) => {
    if (templatePart.type === 'attribute') {
        return new AttributePart(instance, node, templatePart.name, templatePart.strings);
    }
    else if (templatePart.type === 'node') {
        return new NodePart(instance, node, node.nextSibling);
    }
    throw new Error(`Unknown part type ${templatePart.type}`);
};
/* harmony export (immutable) */ __webpack_exports__["e"] = defaultPartCallback;

/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, partCallback, getTemplate) {
        this._parts = [];
        this.template = template;
        this._partCallback = partCallback;
        this._getTemplate = getTemplate;
    }
    update(values) {
        let valueIndex = 0;
        for (const part of this._parts) {
            if (part.size === undefined) {
                part.setValue(values[valueIndex]);
                valueIndex++;
            }
            else {
                part.setValue(values, valueIndex);
                valueIndex += part.size;
            }
        }
    }
    _clone() {
        const fragment = document.importNode(this.template.element.content, true);
        const parts = this.template.parts;
        if (parts.length > 0) {
            // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
            // null
            const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT |
                   NodeFilter.SHOW_TEXT */, null, false);
            let index = -1;
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                while (index < part.index) {
                    index++;
                    walker.nextNode();
                }
                this._parts.push(this._partCallback(this, part, walker.currentNode));
            }
        }
        return fragment;
    }
}
/* unused harmony export TemplateInstance */

/**
 * Reparents nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), into another container (could be the same container), before
 * `beforeNode`. If `beforeNode` is null, it appends the nodes to the
 * container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    let node = start;
    while (node !== end) {
        const n = node.nextSibling;
        container.insertBefore(node, before);
        node = n;
    }
};
/* unused harmony export reparentNodes */

/**
 * Removes nodes, starting from `startNode` (inclusive) to `endNode`
 * (exclusive), from `container`.
 */
const removeNodes = (container, startNode, endNode = null) => {
    let node = startNode;
    while (node !== endNode) {
        const n = node.nextSibling;
        container.removeChild(node);
        node = n;
    }
};
/* unused harmony export removeNodes */

//# sourceMappingURL=lit-html.js.map

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b"]; });


class MaterialElement extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  static globalStyle(val) {

    const head = document.head;
    const style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(val));

    head.appendChild(style);
  }

  static get configurationAttributes() {
    return [];
  }

  static get observedAttributes() {
    return this.configurationAttributes;
  }

  get styles() {
    return [];
  }

  get classes() {
    return [];
  }

  get content() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<slot></slot>`;
  }

  get template(){
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${this.styles.join('')}</style>${this.content}`;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(this.shadowRoot){
      this[attr] = newValue;
    }
    this.render()
  }

  connectedCallback() {
    super.connectedCallback()
    this.classes.forEach(c => this.classList.add(c));
    this.constructor.configurationAttributes.forEach(attr => this[attr] = this.getAttribute(attr))
  }

}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialStyle; });
const MaterialStyle = {
  block: ':host {display: block};\n'
};




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return h; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lit_html_lib_shady_render_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lit_html_lib_lit_extended_js__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__lit_html_lib_lit_extended_js__["a"]; });
const e=Symbol("tag"),s=Symbol("needsRender"),i=t=>t.replace(/([a-z])([A-Z])|(.)([A-Z][a-z])/g,"$1$3-$2$4").toLowerCase(),o=t=>{t.$={},t.shadowRoot.querySelectorAll("[id]").forEach(e=>{t.$[e.id]=e})};class h extends HTMLElement{static get is(){return this.hasOwnProperty(e)&&this[e]||(this[e]=i(this.name))}connectedCallback(){"template"in this&&(this.attachShadow({mode:"open"}),this.render({sync:!0}),o(this))}async render({sync:e=!1}={}){this[s]=!0,e||await 0,this[s]&&(this[s]=!1,Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_lib_shady_render_js__["a" /* render */])(this.template,this.shadowRoot,this.constructor.is))}}
//# sourceMappingURL=gluon.js.map


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = render;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lit_html_js__ = __webpack_require__(0);
/* unused harmony reexport html */
/* unused harmony reexport svg */
/* unused harmony reexport TemplateResult */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = `${result.type}--${scopeName}`;
    let templateCache = __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["i" /* templateCaches */].get(cacheKey);
    if (templateCache === undefined) {
        templateCache = new Map();
        __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["i" /* templateCaches */].set(cacheKey, templateCache);
    }
    let template = templateCache.get(result.strings);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (typeof window.ShadyCSS === 'object') {
            window.ShadyCSS.prepareTemplate(element, scopeName);
        }
        template = new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["c" /* Template */](result, element);
        templateCache.set(result.strings, template);
    }
    return template;
};
function render(result, container, scopeName) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["h" /* render */])(result, container, shadyTemplateFactory(scopeName));
}
//# sourceMappingURL=shady-render.js.map

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lit_html_js__ = __webpack_require__(0);
/* unused harmony reexport render */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */


/**
 * Interprets a template literal as a lit-extended HTML template.
 */
const html = (strings, ...values) => new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["d" /* TemplateResult */](strings, values, 'html', extendedPartCallback);
/* harmony export (immutable) */ __webpack_exports__["a"] = html;

/**
 * Interprets a template literal as a lit-extended SVG template.
 */
const svg = (strings, ...values) => new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["b" /* SVGTemplateResult */](strings, values, 'svg', extendedPartCallback);
/* unused harmony export svg */

/**
 * A PartCallback which allows templates to set properties and declarative
 * event handlers.
 *
 * Properties are set by default, instead of attributes. Attribute names in
 * lit-html templates preserve case, so properties are case sensitive. If an
 * expression takes up an entire attribute value, then the property is set to
 * that value. If an expression is interpolated with a string or other
 * expressions then the property is set to the string result of the
 * interpolation.
 *
 * To set an attribute instead of a property, append a `$` suffix to the
 * attribute name.
 *
 * Example:
 *
 *     html`<button class$="primary">Buy Now</button>`
 *
 * To set an event handler, prefix the attribute name with `on-`:
 *
 * Example:
 *
 *     html`<button on-click=${(e)=> this.onClickHandler(e)}>Buy Now</button>`
 *
 */
const extendedPartCallback = (instance, templatePart, node) => {
    if (templatePart.type === 'attribute') {
        if (templatePart.rawName.startsWith('on-')) {
            const eventName = templatePart.rawName.slice(3);
            return new EventPart(instance, node, eventName);
        }
        if (templatePart.name.endsWith('$')) {
            const name = templatePart.name.slice(0, -1);
            return new __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["a" /* AttributePart */](instance, node, name, templatePart.strings);
        }
        if (templatePart.name.endsWith('?')) {
            const name = templatePart.name.slice(0, -1);
            return new BooleanAttributePart(instance, node, name, templatePart.strings);
        }
        return new PropertyPart(instance, node, templatePart.rawName, templatePart.strings);
    }
    return Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["e" /* defaultPartCallback */])(instance, templatePart, node);
};
/* unused harmony export extendedPartCallback */

/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart extends __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["a" /* AttributePart */] {
    setValue(values, startIndex) {
        const s = this.strings;
        if (s.length === 2 && s[0] === '' && s[1] === '') {
            const value = Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["g" /* getValue */])(this, values[startIndex]);
            if (value === __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["f" /* directiveValue */]) {
                return;
            }
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
        }
        else {
            throw new Error('boolean attributes can only contain a single expression');
        }
    }
}
/* unused harmony export BooleanAttributePart */

class PropertyPart extends __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["a" /* AttributePart */] {
    setValue(values, startIndex) {
        const s = this.strings;
        let value;
        if (this._equalToPreviousValues(values, startIndex)) {
            return;
        }
        if (s.length === 2 && s[0] === '' && s[1] === '') {
            // An expression that occupies the whole attribute value will leave
            // leading and trailing empty strings.
            value = Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["g" /* getValue */])(this, values[startIndex]);
        }
        else {
            // Interpolation, so interpolate
            value = this._interpolate(values, startIndex);
        }
        if (value !== __WEBPACK_IMPORTED_MODULE_0__lit_html_js__["f" /* directiveValue */]) {
            this.element[this.name] = value;
        }
        this._previousValues = values;
    }
}
/* unused harmony export PropertyPart */

class EventPart {
    constructor(instance, element, eventName) {
        this.instance = instance;
        this.element = element;
        this.eventName = eventName;
    }
    setValue(value) {
        const listener = Object(__WEBPACK_IMPORTED_MODULE_0__lit_html_js__["g" /* getValue */])(this, value);
        const previous = this._listener;
        if (listener === previous) {
            return;
        }
        this._listener = listener;
        if (previous != null) {
            this.element.removeEventListener(this.eventName, previous);
        }
        if (listener != null) {
            this.element.addEventListener(this.eventName, listener);
        }
    }
}
/* unused harmony export EventPart */

//# sourceMappingURL=lit-extended.js.map

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = {"host":":host(.mdc-typography--display4) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 7rem;\n  line-height: 7rem;\n  font-weight: 300;\n  letter-spacing: -0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--display4) {\n  margin: -1rem 0 3.5rem -0.085em;\n}\n\n:host(.mdc-typography--display3) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.5rem;\n  line-height: 3.5rem;\n  font-weight: 400;\n  letter-spacing: -0.02em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--display3) {\n  margin: -8px 0 64px -0.07em;\n}\n\n:host(.mdc-typography--display2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.8125rem;\n  line-height: 3rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--display2) {\n  margin: -0.5rem 0 4rem -0.07em;\n}\n\n:host(.mdc-typography--display1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--display1) {\n  margin: -0.5rem 0 4rem -0.07em;\n}\n\n:host(.mdc-typography--headline) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--headline) {\n  margin: -0.5rem 0 1rem -0.06em;\n}\n\n:host(.mdc-typography--title) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--title) {\n  margin: -0.5rem 0 1rem -0.05em;\n}\n\n:host(.mdc-typography--subheading2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--subheading2) {\n  margin: -0.5rem 0 1rem -0.06em;\n}\n\n:host(.mdc-typography--subheading1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.938rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--subheading1) {\n  margin: -0.313rem 0 0.813rem -0.06em;\n}\n\n:host(.mdc-typography--body2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--body2) {\n  margin: -0.25rem 0 0.75rem 0;\n}\n\n:host(.mdc-typography--body1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--body1) {\n  margin: -0.25rem 0 0.75rem 0;\n}\n\n:host(.mdc-typography--caption) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.08em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--caption) {\n  margin: -0.5rem 0 1rem -0.04em;\n}\n\n:host(.mdc-typography--button) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n\n:host(.mdc-typography--adjust-margin.mdc-typography--button) {\n  margin: inherit;\n}","slotted":"::slotted(.mdc-typography--display4) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 7rem;\n  line-height: 7rem;\n  font-weight: 300;\n  letter-spacing: -0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--display4) {\n  margin: -1rem 0 3.5rem -0.085em;\n}\n\n::slotted(.mdc-typography--display3) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 3.5rem;\n  line-height: 3.5rem;\n  font-weight: 400;\n  letter-spacing: -0.02em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--display3) {\n  margin: -8px 0 64px -0.07em;\n}\n\n::slotted(.mdc-typography--display2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.8125rem;\n  line-height: 3rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--display2) {\n  margin: -0.5rem 0 4rem -0.07em;\n}\n\n::slotted(.mdc-typography--display1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 2.125rem;\n  line-height: 2.5rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--display1) {\n  margin: -0.5rem 0 4rem -0.07em;\n}\n\n::slotted(.mdc-typography--headline) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.5rem;\n  line-height: 2rem;\n  font-weight: 400;\n  letter-spacing: normal;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--headline) {\n  margin: -0.5rem 0 1rem -0.06em;\n}\n\n::slotted(.mdc-typography--title) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1.25rem;\n  line-height: 2rem;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--title) {\n  margin: -0.5rem 0 1rem -0.05em;\n}\n\n::slotted(.mdc-typography--subheading2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--subheading2) {\n  margin: -0.5rem 0 1rem -0.06em;\n}\n\n::slotted(.mdc-typography--subheading1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.938rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--subheading1) {\n  margin: -0.313rem 0 0.813rem -0.06em;\n}\n\n::slotted(.mdc-typography--body2) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.5rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--body2) {\n  margin: -0.25rem 0 0.75rem 0;\n}\n\n::slotted(.mdc-typography--body1) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.04em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--body1) {\n  margin: -0.25rem 0 0.75rem 0;\n}\n\n::slotted(.mdc-typography--caption) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.75rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.08em;\n  text-decoration: inherit;\n  text-transform: inherit;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--caption) {\n  margin: -0.5rem 0 1rem -0.04em;\n}\n\n::slotted(.mdc-typography--button) {\n  font-family: Roboto, sans-serif;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.04em;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n\n::slotted(.mdc-typography--adjust-margin.mdc-typography--button) {\n  margin: inherit;\n}"}

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

module.exports = {"all":".mdc-card {\n  /* @alternate */\n  background-color: #fff;\n  background-color: var(--mdc-theme-background, #fff);\n  border-radius: 2px;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}\n\n.mdc-card--stroked {\n  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);\n  border: 1px solid #dbdbdb;\n}\n\n.mdc-card__media {\n  position: relative;\n  box-sizing: border-box;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.mdc-card__media::before {\n  display: block;\n  content: \"\";\n}\n\n.mdc-card__media:first-child {\n  border-top-left-radius: inherit;\n  border-top-right-radius: inherit;\n}\n\n.mdc-card__media:last-child {\n  border-bottom-left-radius: inherit;\n  border-bottom-right-radius: inherit;\n}\n\n.mdc-card__media--square::before {\n  margin-top: 100%;\n}\n\n.mdc-card__media--16-9::before {\n  margin-top: 56.25%;\n}\n\n.mdc-card__media-content {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  box-sizing: border-box;\n}\n\n.mdc-card__actions {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 52px;\n  padding: 8px;\n}\n\n.mdc-card__actions--full-bleed {\n  padding: 0;\n}\n\n.mdc-card__action-buttons,\n.mdc-card__action-icons {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n.mdc-card__action-icons {\n  /* @alternate */\n  color: rgba(0, 0, 0, 0.38);\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));\n  flex-grow: 1;\n  justify-content: flex-end;\n}\n\n.mdc-card__action-buttons + .mdc-card__action-icons {\n  margin-left: 16px;\n  margin-right: 0;\n}\n\n[dir=\"rtl\"] .mdc-card__action-buttons + .mdc-card__action-icons,\n.mdc-card__action-buttons + .mdc-card__action-icons[dir=\"rtl\"] {\n  margin-left: 0;\n  margin-right: 16px;\n}\n\n.mdc-card__action {\n  display: inline-flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n  min-width: auto;\n  cursor: pointer;\n  user-select: none;\n}\n\n.mdc-card__action:focus {\n  outline: none;\n}\n\n.mdc-card__action--button {\n  margin-left: 0;\n  margin-right: 8px;\n  padding: 0 8px;\n}\n\n[dir=\"rtl\"] .mdc-card__action--button,\n.mdc-card__action--button[dir=\"rtl\"] {\n  margin-left: 8px;\n  margin-right: 0;\n}\n\n.mdc-card__action--button:last-child {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n[dir=\"rtl\"] .mdc-card__action--button:last-child,\n.mdc-card__action--button:last-child[dir=\"rtl\"] {\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.mdc-card__actions--full-bleed .mdc-card__action--button {\n  justify-content: space-between;\n  width: 100%;\n  height: auto;\n  max-height: none;\n  margin: 0;\n  padding: 8px 16px;\n  text-align: left;\n}\n\n[dir=\"rtl\"] .mdc-card__actions--full-bleed .mdc-card__action--button,\n.mdc-card__actions--full-bleed .mdc-card__action--button[dir=\"rtl\"] {\n  text-align: right;\n}\n\n.mdc-card__action--icon {\n  margin: -6px 0;\n  padding: 12px;\n}\n\n.mdc-card__action--icon:not(:disabled) {\n  /* @alternate */\n  color: rgba(0, 0, 0, 0.38);\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));\n}","card":":host(.mdc-card) {\n  /* @alternate */\n  background-color: #fff;\n  background-color: var(--mdc-theme-background, #fff);\n  border-radius: 2px;\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n}","actions":":host(.mdc-card__actions) {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n  min-height: 52px;\n  padding: 8px;\n}\n\n:host(.mdc-card__actions--full-bleed) {\n  padding: 0;\n}\n\n:host(.mdc-card__actions--full-bleed .mdc-card__action--button) {\n  justify-content: space-between;\n  width: 100%;\n  height: auto;\n  max-height: none;\n  margin: 0;\n  padding: 8px 16px;\n  text-align: left;\n}\n\n:host(.mdc-card__actions--full-bleed .mdc-card__action--button[dir=\"rtl\"]) {\n  text-align: right;\n}","action_buttons":":host(.mdc-card__action-buttons) {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n:host(.mdc-card__action-buttons + .mdc-card__action-icons) {\n  margin-left: 16px;\n  margin-right: 0;\n}\n\n:host(.mdc-card__action-buttons + .mdc-card__action-icons[dir=\"rtl\"]) {\n  margin-left: 0;\n  margin-right: 16px;\n}","action_icons":":host(.mdc-card__action-icons) {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  box-sizing: border-box;\n}\n\n:host(.mdc-card__action-icons) {\n  /* @alternate */\n  color: rgba(0, 0, 0, 0.38);\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38));\n  flex-grow: 1;\n  justify-content: flex-end;\n}"}

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MaterialElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__ = __webpack_require__(2);





const block = `:host {display:block}`

class MaterialCardActions extends __WEBPACK_IMPORTED_MODULE_0__MaterialElement__["a" /* MaterialElement */] {

  get styles() {
    return [
      __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__["a" /* MaterialStyle */].block,
      __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.actions
    ]
  }

  get classes() {
    return [
      'mdc-card__actions'
    ]
  }

}

customElements.define(MaterialCardActions.is, MaterialCardActions);

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MaterialCard__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialCardMedia__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MaterialCardPrimary__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MaterialCardSecondary__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__MaterialCardTitle__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__MaterialCardSubtitle__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MaterialCardSupportingText__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MaterialCardActions__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MaterialCardActionButtons__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MaterialCardActionIcons__ = __webpack_require__(42);













/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);



const block = `:host {display:block}`

class MaterialCard extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.card}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card');
  }

}









customElements.define(MaterialCard.is, MaterialCard);





/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);



const block = `:host {display:block}`

class MaterialCardMedia extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.media}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__media');
  }
}

customElements.define(MaterialCardMedia.is, MaterialCardMedia);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);



const block = `:host {display:block}`

class MaterialCardPrimary extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.primary}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.primary_slotted}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('mdc-card__primary');
  }

}

customElements.define(MaterialCardPrimary.is, MaterialCardPrimary);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MaterialElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography__);





const block = `:host {display:block}`

class MaterialCardSecondary extends __WEBPACK_IMPORTED_MODULE_0__MaterialElement__["a" /* MaterialElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0__MaterialElement__["b" /* html */]`<style>${this.blockStyle}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.secondary}${__WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography___default.a.typography}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__secondary');
    this.classList.add('mdc-typography--body1');
  }

}

customElements.define(MaterialCardSecondary.is, MaterialCardSecondary);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography__);





const block = `:host {display:block}`

class MaterialCardTitle extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  static get configurationAttrubuters() {
    return ['large'];
  }

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.title}${__WEBPACK_IMPORTED_MODULE_2__material_typography_mdc_typography___default.a.typography}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__title');
    this.classList.add('mdc-typography--title');
  }

}

customElements.define(MaterialCardTitle.is, MaterialCardTitle);


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);



const block = `:host {display:block}`

class MaterialCardSubtitle extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.subtitle}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__subtitle');
    this.classList.add('mdc-typography--subheading1');
  }

}

customElements.define(MaterialCardSubtitle.is, MaterialCardSubtitle);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gluonjs__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);



const block = `:host {display:block}`

class MaterialCardSupportingText extends __WEBPACK_IMPORTED_MODULE_0_gluonjs__["a" /* GluonElement */] {

  get template() {
    return __WEBPACK_IMPORTED_MODULE_0_gluonjs__["b" /* html */]`<style>${block}${__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.supporting_text}</style><slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback()
    this.classList.add('mdc-card__supporting-text');
  }

}

customElements.define(MaterialCardSupportingText.is, MaterialCardSupportingText);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MaterialElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__ = __webpack_require__(2);





const block = `:host {display:block}`

class MaterialCardActionButtons extends __WEBPACK_IMPORTED_MODULE_0__MaterialElement__["a" /* MaterialElement */] {

  get styles() {
    return [
      __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__["a" /* MaterialStyle */].block,
      __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.action_buttons
    ]
  }

  get classes() {
    return [
      'mdc-card__action-buttons'
    ]
  }

}

customElements.define(MaterialCardActionButtons.is, MaterialCardActionButtons);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MaterialElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__ = __webpack_require__(2);





const block = `:host {display:block}`

class MaterialCardActionIcons extends __WEBPACK_IMPORTED_MODULE_0__MaterialElement__["a" /* MaterialElement */] {

  get styles() {
    return [
      __WEBPACK_IMPORTED_MODULE_2__MaterialStyle__["a" /* MaterialStyle */].block,
      __WEBPACK_IMPORTED_MODULE_1__material_card_mdc_card___default.a.action_icons
    ]
  }

  get classes() {
    return [
      'mdc-card__action-icons'
    ]
  }

}

customElements.define(MaterialCardActionIcons.is, MaterialCardActionIcons);

/***/ })
/******/ ]);