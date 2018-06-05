/*! Built with http://stenciljs.com */
const { h } = window.JsDevConsole;

import { a as props } from './chunk-0e9febea.js';

class ObjectGui {
    constructor() {
        this.isLast = true;
        this.index = undefined;
        this.tick = true;
        this.expanded = undefined;
        this.highlight = false;
        this.inViewPort = true;
        this.propCache = [];
        this.ownPropertyLength = 0;
        this.externalRender = false;
        this.key = undefined;
        this.updateInterval = {
            value: 200,
            base: 200,
            min: 100,
            max: 1000 + Math.round(Math.random() * 100),
            factor: 1.1
        };
    }
    tickHandler() {
        this.update();
    }
    objHandler() {
        this.update();
    }
    keyHandler() {
        this.update();
    }
    componentWillLoad() {
        this.update();
    }
    componentDidUnload() {
        if (this.intervalTimer) {
            clearTimeout(this.intervalTimer);
        }
    }
    static isObject(a) {
        return typeof a === "object" && a !== null;
    }
    static isNumber(a) {
        return ((!!a) && isFinite(a)) || a === Infinity;
    }
    static isString(a) {
        return typeof a === "string";
    }
    static isUndefined(a) {
        return typeof a === "undefined";
    }
    static isFunction(a) {
        return typeof a === "function";
    }
    static isNull(a) {
        return a === null;
    }
    static isNaN(a) {
        return a !== a;
    }
    thisIsAGetter() {
        return !!Object.getOwnPropertyDescriptor(this.obj, this.key).get;
    }
    static isEqual(a, b) {
        // both are NaN
        if (a !== a && b !== b) {
            return true;
        }
        return a === b;
    }
    update() {
        if (this.intervalTimer) {
            clearTimeout(this.intervalTimer);
        }
        this.key = (this.index >= 0) ? (this.parent ? this.parent.getPropCache()[this.index] : props(this.obj, this.excludeProto)[this.index]) : undefined;
        //console.log("key", this.index, this.index>=0, Object.keys(this.obj), Object.keys(this.obj)[this.index], this.key);
        let value = this.obj;
        if (this.key) {
            try {
                value = this.obj[this.key];
            }
            catch (e) {
                //TODO add support for getters and setters
                value = undefined; //this.excludeProto[this.key];
            }
        }
        else {
            if (typeof this.expanded === "undefined") {
                this.expanded = true;
            }
        }
        let doUpdate = () => {
            this.childBase = [];
            this.propCache = [];
            if (ObjectGui.isObject(value)) {
                this.propCache = props(value, this.excludeProto);
                this.propCache.forEach((_, i) => {
                    this.childBase.push(i);
                });
            }
            setTimeout(() => {
                let children = this.el.querySelectorAll("object-gui");
                for (let i = 0, len = children.length; i < len; i++) {
                    children[i].update();
                }
            });
            this.updateInterval.value = this.updateInterval.base;
        };
        if (!ObjectGui.isEqual(this.value, value)) {
            this.externalRender = true;
            this.value = value;
            doUpdate();
        }
        else {
            let ownPropLen = ObjectGui.isObject(value) ? Object.getOwnPropertyNames(value).length : 0;
            if (ownPropLen != this.ownPropertyLength) {
                this.ownPropertyLength = ownPropLen;
                doUpdate();
            }
            else {
                this.updateInterval.value = Math.min(this.updateInterval.max, this.updateInterval.value * this.updateInterval.factor);
            }
        }
        this.inViewPort = this.objIsInViewport();
        if (this.tick) {
            this.intervalTimer = setTimeout(() => {
                this.update();
            }, this.updateInterval.value);
        }
    }
    objIsInViewport() {
        let rect = this.el.getBoundingClientRect();
        let pHeight = (window.innerHeight || document.documentElement.clientHeight);
        let marginFactor = 2;
        return (rect.top >= -rect.height - (pHeight * (marginFactor - 1)) &&
            rect.top <= rect.height + pHeight * marginFactor);
    }
    expandClick(event) {
        if (ObjectGui.isObject(this.value)) {
            this.expanded = !this.expanded;
        }
        event.preventDefault();
    }
    getType() {
        let val = this.value;
        let type = typeof val;
        if (ObjectGui.isFunction(val)) {
            return "f";
        }
        else if (Array.isArray(val)) {
            return "Array(" + val.length + ")";
        }
        else if (type === "object") {
            return this.value.constructor.name;
        }
        else {
            return type;
        }
    }
    startAnimation(callback) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                callback();
            });
        });
    }
    clearTimer(timer) {
        if (timer) {
            clearTimeout(timer);
        }
    }
    getPropCache() {
        return this.propCache;
    }
    render() {
        // TODO potential cause of trouble
        if (this.externalRender) {
            this.externalRender = false;
            this.clearTimer(this.timer);
            this.highlight = true;
            this.timer = setTimeout(() => {
                this.highlight = false;
            }, 300);
        }
        let val = this.value;
        let key = this.key;
        let isArray = Array.isArray(val);
        let type = typeof val;
        if (ObjectGui.isNull(val)) {
            type = "null";
        }
        if (val === Infinity) {
            type = "Infinity";
        }
        if (ObjectGui.isNaN(val)) {
            type = "NaN";
        }
        val = ObjectGui.isNull(val) ? "null" : val;
        val = ObjectGui.isUndefined(val) ? "undefined" : val;
        let isObj = ObjectGui.isObject(val) || ObjectGui.isFunction(val);
        let isFunction = ObjectGui.isFunction(val);
        let end = "";
        let wrappedChildren = "";
        let openingBraket = isArray ? "[" : "{";
        openingBraket = isFunction ? "(" : openingBraket;
        let closingBraket = isArray ? "]" : "}";
        closingBraket = isFunction ? ")" : closingBraket;
        let rightValue = (h("span", { class: { 'clickable': isObj && !isFunction }, onMouseDown: (e) => this.expandClick(e), onTouchStart: (e) => this.expandClick(e) },
            h("span", { class: {
                    "highlighted": this.highlight,
                    "top": isObj && this.expanded,
                    "highlight": true,
                    func: isFunction
                } },
                isObj ? (h("span", { class: "type" }, this.getType())) : (h("span", { class: type }, type === "string" && !isFunction ? '"' + val + '"' : val + "")),
                isObj ? " " : "",
                isFunction ? this.value.name : "",
                isObj ? openingBraket : "",
                isObj && !this.expanded ? (h("span", { class: "expand" }, "...")) : "",
                isObj && !this.expanded ? closingBraket : ""),
            (this.expanded || this.isLast) ? "" : ","));
        if (isObj) {
            if (this.expanded) {
                let children = this.childBase.map((_, i) => {
                    return (h("object-gui", { parent: this, obj: val, index: i, isLast: i + 1 == this.childBase.length, tick: this.inViewPort }));
                });
                wrappedChildren = (h("div", { class: { 'children': true, "highlighted": this.highlight, "highlight": true } }, children));
                end = (h("span", null,
                    h("span", { class: {
                            "end": true,
                            "highlighted": this.highlight,
                            "highlight": true
                        } }, closingBraket),
                    this.isLast ? "" : ","));
            }
        }
        let leftValue = (h("span", { class: { "no-select": Array.isArray(this.obj) } },
            key ? (h("span", { class: "key" }, key)) : "",
            key ? ": " : ""));
        return (h("div", { class: { "no-select": isFunction } },
            leftValue,
            rightValue,
            wrappedChildren,
            end));
    }
    static get is() { return "object-gui"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "excludeProto": {
            "type": "Any",
            "attr": "exclude-proto"
        },
        "expanded": {
            "state": true
        },
        "getPropCache": {
            "method": true
        },
        "highlight": {
            "state": true
        },
        "index": {
            "type": Number,
            "attr": "index",
            "watchCallbacks": ["keyHandler"]
        },
        "inViewPort": {
            "state": true
        },
        "isLast": {
            "type": Boolean,
            "attr": "is-last"
        },
        "obj": {
            "type": "Any",
            "attr": "obj",
            "watchCallbacks": ["objHandler"]
        },
        "ownPropertyLength": {
            "state": true
        },
        "parent": {
            "type": "Any",
            "attr": "parent"
        },
        "propCache": {
            "state": true
        },
        "tick": {
            "type": Boolean,
            "attr": "tick",
            "watchCallbacks": ["tickHandler"]
        },
        "update": {
            "method": true
        },
        "value": {
            "state": true
        }
    }; }
    static get style() { return "object-gui {\n  visibility: visible;\n  display: block;\n  font-family: Consolas, monospace; }\n  object-gui .key {\n    color: #005cc5; }\n  object-gui .string {\n    color: #d73a49; }\n  object-gui .number, object-gui .boolean {\n    color: blue; }\n  object-gui .func {\n    font-style: italic; }\n    object-gui .func .expand {\n      display: none; }\n  object-gui .type, object-gui .NaN, object-gui .Infinity, object-gui .null, object-gui .undefined {\n    color: #6f42c1; }\n  object-gui .undefined {\n    color: darkgrey; }\n  object-gui .type {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui .children {\n    display: table;\n    padding-left: 25px; }\n  object-gui .clickable {\n    cursor: pointer; }\n  object-gui .expand {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    background-color: darkgrey; }\n  object-gui .no-select {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui .highlight {\n    border-radius: 2px;\n    background-color: rgba(100, 80, 150, 0);\n    -webkit-transition: background-color 0.6s ease;\n    transition: background-color 0.6s ease; }\n    object-gui .highlight.top {\n      border-bottom-left-radius: 0;\n      border-bottom-right-radius: 0; }\n    object-gui .highlight.children {\n      border-top-right-radius: 0;\n      border-bottom-left-radius: 0; }\n    object-gui .highlight.end {\n      border-top-left-radius: 0;\n      border-top-right-radius: 0; }\n    object-gui .highlight.highlighted {\n      background-color: rgba(100, 80, 150, 0.2);\n      -webkit-transition: background-color 0.3s ease;\n      transition: background-color 0.3s ease; }"; }
}
ObjectGui.baseObjectProps = Object.getOwnPropertyNames(Object.prototype).join("");
ObjectGui.baseArrayProps = Object.getOwnPropertyNames(Array.prototype).join("");

export { ObjectGui };
