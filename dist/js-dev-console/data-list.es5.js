/*! Built with http://stenciljs.com */
JsDevConsole.loadBundle('data-list', ['exports', './chunk-2ed43275.js'], function (exports, __chunk_1) {
    var h = window.JsDevConsole.h;
    var ObjectGui = /** @class */ (function () {
        function ObjectGui() {
            this.data = [];
            this.datatogo = [];
            this.chunks = [];
            this.chunkSize = 10;
            this.firstChunk = true;
        }
        ObjectGui.prototype.watchHandler = function (newValue, oldValue) {
            if (newValue != oldValue) {
                this.handleDataChange(newValue);
            }
        };
        ObjectGui.prototype.handleDataChange = function (newValue) {
            var _this = this;
            var toRemove = Array.from(this.elements.datalist.children);
            if (newValue && newValue.length > 0) {
                toRemove.shift();
            }
            toRemove.forEach(function (e) {
                _this.elements.datalist.removeChild(e);
            });
            this.firstChunk = true;
            this.datatogo = newValue.slice(0);
            this.handleDataToGoChange();
        };
        ObjectGui.prototype.componentDidLoad = function () {
            this.elements = {
                datalist: this.el.querySelector("#" + this.name)
            };
            this.handleDataChange(this.data);
        };
        ObjectGui.prototype.handleDataToGoChange = function () {
            var _this = this;
            if (this.dataToGoTimeout) {
                cancelAnimationFrame(this.dataToGoTimeout);
            }
            if (this.datatogo.length > 0) {
                var entries = this.datatogo.splice(0, this.chunkSize);
                var c = this.elements.datalist.firstElementChild;
                console.info(c);
                if (this.firstChunk && c) {
                    for (var i = 0; i < this.chunkSize; i++) {
                        if (i < entries.length) {
                            c.children[i].setAttribute("value", entries[i]);
                        }
                        else {
                            c.children[i].removeAttribute("value");
                        }
                    }
                }
                else {
                    var chunk = document.createElement("div");
                    var str = "";
                    for (var i = 0; i < this.chunkSize; i++) {
                        if (i < entries.length) {
                            str += "<option value='" + entries[i] + "'></option>";
                        }
                        else {
                            str += "<option></option>";
                        }
                    }
                    chunk.innerHTML = str;
                    this.elements.datalist.appendChild(chunk);
                }
                this.dataToGoTimeout = requestAnimationFrame(function () {
                    _this.handleDataToGoChange();
                });
            }
            this.firstChunk = false;
        };
        ObjectGui.prototype.render = function () {
            return (h("datalist", { id: this.name }));
        };
        Object.defineProperty(ObjectGui, "is", {
            get: function () { return "data-list"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectGui, "properties", {
            get: function () {
                return {
                    "chunks": {
                        "state": true
                    },
                    "data": {
                        "type": "Any",
                        "attr": "data",
                        "watchCallbacks": ["watchHandler"]
                    },
                    "datatogo": {
                        "state": true
                    },
                    "el": {
                        "elementRef": true
                    },
                    "name": {
                        "type": String,
                        "attr": "name"
                    }
                };
            },
            enumerable: true,
            configurable: true
        });
        return ObjectGui;
    }());
    var ObjectGui$1 = /** @class */ (function () {
        function ObjectGui$1() {
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
        ObjectGui$1.prototype.tickHandler = function () {
            this.update();
        };
        ObjectGui$1.prototype.objHandler = function () {
            this.update();
        };
        ObjectGui$1.prototype.keyHandler = function () {
            this.update();
        };
        ObjectGui$1.prototype.componentWillLoad = function () {
            this.update();
        };
        ObjectGui$1.prototype.componentDidUnload = function () {
            if (this.intervalTimer) {
                clearTimeout(this.intervalTimer);
            }
        };
        ObjectGui$1.isObject = function (a) {
            return typeof a === "object" && a !== null;
        };
        ObjectGui$1.isNumber = function (a) {
            return ((!!a) && isFinite(a)) || a === Infinity;
        };
        ObjectGui$1.isString = function (a) {
            return typeof a === "string";
        };
        ObjectGui$1.isUndefined = function (a) {
            return typeof a === "undefined";
        };
        ObjectGui$1.isFunction = function (a) {
            return typeof a === "function";
        };
        ObjectGui$1.isNull = function (a) {
            return a === null;
        };
        ObjectGui$1.isNaN = function (a) {
            return a !== a;
        };
        ObjectGui$1.prototype.thisIsAGetter = function () {
            return !!Object.getOwnPropertyDescriptor(this.obj, this.key).get;
        };
        ObjectGui$1.isEqual = function (a, b) {
            // both are NaN
            if (a !== a && b !== b) {
                return true;
            }
            return a === b;
        };
        ObjectGui$1.prototype.update = function () {
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
                if (ObjectGui$1.isObject(value)) {
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
            if (!ObjectGui$1.isEqual(this.value, value)) {
                this.externalRender = true;
                this.value = value;
                doUpdate();
            }
            else {
                var ownPropLen = ObjectGui$1.isObject(value) ? Object.getOwnPropertyNames(value).length : 0;
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
        ObjectGui$1.prototype.objIsInViewport = function () {
            var rect = this.el.getBoundingClientRect();
            var pHeight = (window.innerHeight || document.documentElement.clientHeight);
            var marginFactor = 2;
            return (rect.top >= -rect.height - (pHeight * (marginFactor - 1)) &&
                rect.top <= rect.height + pHeight * marginFactor);
        };
        ObjectGui$1.prototype.expandClick = function (event) {
            if (ObjectGui$1.isObject(this.value)) {
                this.expanded = !this.expanded;
            }
            event.preventDefault();
        };
        ObjectGui$1.prototype.getType = function () {
            var val = this.value;
            var type = typeof val;
            if (ObjectGui$1.isFunction(val)) {
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
        ObjectGui$1.prototype.startAnimation = function (callback) {
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    callback();
                });
            });
        };
        ObjectGui$1.prototype.clearTimer = function (timer) {
            if (timer) {
                clearTimeout(timer);
            }
        };
        ObjectGui$1.prototype.getPropCache = function () {
            return this.propCache;
        };
        ObjectGui$1.prototype.render = function () {
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
            if (ObjectGui$1.isNull(val)) {
                type = "null";
            }
            if (val === Infinity) {
                type = "Infinity";
            }
            if (ObjectGui$1.isNaN(val)) {
                type = "NaN";
            }
            val = ObjectGui$1.isNull(val) ? "null" : val;
            val = ObjectGui$1.isUndefined(val) ? "undefined" : val;
            var isObj = ObjectGui$1.isObject(val) || ObjectGui$1.isFunction(val);
            var isFunction = ObjectGui$1.isFunction(val);
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
        Object.defineProperty(ObjectGui$1, "is", {
            get: function () { return "object-gui"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectGui$1, "properties", {
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
        Object.defineProperty(ObjectGui$1, "style", {
            get: function () { return "object-gui {\n  visibility: visible;\n  display: block;\n  font-family: Consolas, monospace; }\n  object-gui .key {\n    color: #005cc5; }\n  object-gui .string {\n    color: #d73a49; }\n  object-gui .number, object-gui .boolean {\n    color: blue; }\n  object-gui .func {\n    font-style: italic; }\n    object-gui .func .expand {\n      display: none; }\n  object-gui .type, object-gui .NaN, object-gui .Infinity, object-gui .null, object-gui .undefined {\n    color: #6f42c1; }\n  object-gui .undefined {\n    color: darkgrey; }\n  object-gui .type {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui .children {\n    display: table;\n    padding-left: 25px; }\n  object-gui .clickable {\n    cursor: pointer; }\n  object-gui .expand {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    background-color: darkgrey; }\n  object-gui .no-select {\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none; }\n  object-gui > div {\n    white-space: nowrap; }\n  object-gui .highlight {\n    border-radius: 2px;\n    background-color: rgba(100, 80, 150, 0);\n    -webkit-transition: background-color 0.6s ease;\n    transition: background-color 0.6s ease; }\n    object-gui .highlight.top {\n      border-bottom-left-radius: 0;\n      border-bottom-right-radius: 0; }\n    object-gui .highlight.children {\n      border-top-right-radius: 0;\n      border-bottom-left-radius: 0; }\n    object-gui .highlight.end {\n      border-top-left-radius: 0;\n      border-top-right-radius: 0; }\n    object-gui .highlight.highlighted {\n      background-color: rgba(100, 80, 150, 0.2);\n      -webkit-transition: background-color 0.3s ease;\n      transition: background-color 0.3s ease; }"; },
            enumerable: true,
            configurable: true
        });
        return ObjectGui$1;
    }());
    ObjectGui$1.baseObjectProps = Object.getOwnPropertyNames(Object.prototype).join("");
    ObjectGui$1.baseArrayProps = Object.getOwnPropertyNames(Array.prototype).join("");
    exports.DataList = ObjectGui;
    exports.ObjectGui = ObjectGui$1;
    Object.defineProperty(exports, '__esModule', { value: true });
});
