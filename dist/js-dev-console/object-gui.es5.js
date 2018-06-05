/*! Built with http://stenciljs.com */
JsDevConsole.loadBundle('object-gui', ['exports', './chunk-430d8506.js'], function (exports, __chunk_1) {
    var h = window.JsDevConsole.h;
    var ObjectGui = /** @class */ (function () {
        function ObjectGui() {
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
        ObjectGui.prototype.tickHandler = function () {
            this.update();
        };
        ObjectGui.prototype.objHandler = function () {
            this.update();
        };
        ObjectGui.prototype.keyHandler = function () {
            this.update();
        };
        ObjectGui.prototype.componentWillLoad = function () {
            this.update();
        };
        ObjectGui.prototype.componentDidUnload = function () {
            if (this.intervalTimer) {
                clearTimeout(this.intervalTimer);
            }
        };
        ObjectGui.isObject = function (a) {
            return typeof a === "object" && a !== null;
        };
        ObjectGui.isNumber = function (a) {
            return ((!!a) && isFinite(a)) || a === Infinity;
        };
        ObjectGui.isString = function (a) {
            return typeof a === "string";
        };
        ObjectGui.isUndefined = function (a) {
            return typeof a === "undefined";
        };
        ObjectGui.isFunction = function (a) {
            return typeof a === "function";
        };
        ObjectGui.isNull = function (a) {
            return a === null;
        };
        ObjectGui.isNaN = function (a) {
            return a !== a;
        };
        ObjectGui.prototype.thisIsAGetter = function () {
            return !!Object.getOwnPropertyDescriptor(this.obj, this.key).get;
        };
        ObjectGui.isEqual = function (a, b) {
            // both are NaN
            if (a !== a && b !== b) {
                return true;
            }
            return a === b;
        };
        ObjectGui.prototype.update = function () {
            var _this = this;
            if (this.intervalTimer) {
                clearTimeout(this.intervalTimer);
            }
            this.key = (this.index >= 0) ? (this.parent ? this.parent.getPropCache()[this.index] : __chunk_1.props(this.obj, this.excludeProto)[this.index]) : undefined;
            //console.log("key", this.index, this.index>=0, Object.keys(this.obj), Object.keys(this.obj)[this.index], this.key);
            var value = this.obj;
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
            var doUpdate = function () {
                _this.childBase = [];
                _this.propCache = [];
                if (ObjectGui.isObject(value)) {
                    _this.propCache = __chunk_1.props(value, _this.excludeProto);
                    _this.propCache.forEach(function (_, i) {
                        _this.childBase.push(i);
                    });
                }
                setTimeout(function () {
                    var children = _this.el.querySelectorAll("object-gui");
                    for (var i = 0, len = children.length; i < len; i++) {
                        children[i].update();
                    }
                });
                _this.updateInterval.value = _this.updateInterval.base;
            };
            if (!ObjectGui.isEqual(this.value, value)) {
                this.externalRender = true;
                this.value = value;
                doUpdate();
            }
            else {
                var ownPropLen = ObjectGui.isObject(value) ? Object.getOwnPropertyNames(value).length : 0;
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
                this.intervalTimer = setTimeout(function () {
                    _this.update();
                }, this.updateInterval.value);
            }
        };
        ObjectGui.prototype.objIsInViewport = function () {
            var rect = this.el.getBoundingClientRect();
            var pHeight = (window.innerHeight || document.documentElement.clientHeight);
            var marginFactor = 2;
            return (rect.top >= -rect.height - (pHeight * (marginFactor - 1)) &&
                rect.top <= rect.height + pHeight * marginFactor);
        };
        ObjectGui.prototype.expandClick = function (event) {
            if (ObjectGui.isObject(this.value)) {
                this.expanded = !this.expanded;
            }
            event.preventDefault();
        };
        ObjectGui.prototype.getType = function () {
            var val = this.value;
            var type = typeof val;
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
        };
        ObjectGui.prototype.startAnimation = function (callback) {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    callback();
                });
            });
        };
        ObjectGui.prototype.clearTimer = function (timer) {
            if (timer) {
                clearTimeout(timer);
            }
        };
        ObjectGui.prototype.getPropCache = function () {
            return this.propCache;
        };
        ObjectGui.prototype.render = function () {
            var _this = this;
            // TODO potential cause of trouble
            if (this.externalRender) {
                this.externalRender = false;
                this.clearTimer(this.timer);
                this.highlight = true;
                this.timer = setTimeout(function () {
                    _this.highlight = false;
                }, 300);
            }
            var val = this.value;
            var key = this.key;
            var isArray = Array.isArray(val);
            var type = typeof val;
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
            var isObj = ObjectGui.isObject(val) || ObjectGui.isFunction(val);
            var isFunction = ObjectGui.isFunction(val);
            var end = "";
            var wrappedChildren = "";
            var openingBraket = isArray ? "[" : "{";
            openingBraket = isFunction ? "(" : openingBraket;
            var closingBraket = isArray ? "]" : "}";
            closingBraket = isFunction ? ")" : closingBraket;
            var rightValue = (h("span", { class: { 'clickable': isObj && !isFunction }, onMouseDown: function (e) { return _this.expandClick(e); }, onTouchStart: function (e) { return _this.expandClick(e); } }, h("span", { class: {
                    "highlighted": this.highlight,
                    "top": isObj && this.expanded,
                    "highlight": true,
                    func: isFunction
                } }, isObj ? (h("span", { class: "type" }, this.getType())) : (h("span", { class: type }, type === "string" && !isFunction ? '"' + val + '"' : val + "")), isObj ? " " : "", isFunction ? this.value.name : "", isObj ? openingBraket : "", isObj && !this.expanded ? (h("span", { class: "expand" }, "...")) : "", isObj && !this.expanded ? closingBraket : ""), (this.expanded || this.isLast) ? "" : ","));
            if (isObj) {
                if (this.expanded) {
                    var children = this.childBase.map(function (_, i) {
                        return (h("object-gui", { parent: _this, obj: val, index: i, isLast: i + 1 == _this.childBase.length, tick: _this.inViewPort }));
                    });
                    wrappedChildren = (h("div", { class: { 'children': true, "highlighted": this.highlight, "highlight": true } }, children));
                    end = (h("span", null, h("span", { class: {
                            "end": true,
                            "highlighted": this.highlight,
                            "highlight": true
                        } }, closingBraket), this.isLast ? "" : ","));
                }
            }
            var leftValue = (h("span", { class: { "no-select": Array.isArray(this.obj) } }, key ? (h("span", { class: "key" }, key)) : "", key ? ": " : ""));
            return (h("div", { class: { "no-select": isFunction } }, leftValue, rightValue, wrappedChildren, end));
        };
        Object.defineProperty(ObjectGui, "is", {
            get: function () { return "object-gui"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectGui, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectGui, "style", {
            get: function () { return "object-gui {\n  visibility: visible;\n  display: block;\n  font-family: Consolas, monospace; }\n  object-gui .key {\n    color: #005cc5; }\n  object-gui .string {\n    color: #d73a49; }\n  object-gui .number, object-gui .boolean {\n    color: blue; }\n  object-gui .func {\n    font-style: italic; }\n    object-gui .func .expand {\n      display: none; }\n  object-gui .type, object-gui .NaN, object-gui .Infinity, object-gui .null, object-gui .undefined {\n    color: #6f42c1; }\n  object-gui .undefined {\n    color: darkgrey; }\n  object-gui .type {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui .children {\n    display: table;\n    padding-left: 25px; }\n  object-gui .clickable {\n    cursor: pointer; }\n  object-gui .expand {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    background-color: darkgrey; }\n  object-gui .no-select {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui .highlight {\n    border-radius: 2px;\n    background-color: rgba(100, 80, 150, 0);\n    -webkit-transition: background-color 0.6s ease;\n    transition: background-color 0.6s ease; }\n    object-gui .highlight.top {\n      border-bottom-left-radius: 0;\n      border-bottom-right-radius: 0; }\n    object-gui .highlight.children {\n      border-top-right-radius: 0;\n      border-bottom-left-radius: 0; }\n    object-gui .highlight.end {\n      border-top-left-radius: 0;\n      border-top-right-radius: 0; }\n    object-gui .highlight.highlighted {\n      background-color: rgba(100, 80, 150, 0.2);\n      -webkit-transition: background-color 0.3s ease;\n      transition: background-color 0.3s ease; }"; },
            enumerable: true,
            configurable: true
        });
        return ObjectGui;
    }());
    ObjectGui.baseObjectProps = Object.getOwnPropertyNames(Object.prototype).join("");
    ObjectGui.baseArrayProps = Object.getOwnPropertyNames(Array.prototype).join("");
    exports.ObjectGui = ObjectGui;
    Object.defineProperty(exports, '__esModule', { value: true });
});
