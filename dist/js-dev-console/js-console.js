/*! Built with http://stenciljs.com */
const { h } = window.JsDevConsole;

import { a as props, b as uniq } from './chunk-0e9febea.js';

class JsConsole {
    constructor() {
        this.url = "https://github.com/Farbdose/js-dev-console";
        this.openOnPattern = null; //null, resize
        this.patternListeners = {};
        this.showHistory = false;
        this.test = {
            a: NaN,
            b: undefined,
            c: null,
            d: Infinity,
            e: true,
            f: false,
            g: function abc() {
                return "def";
            },
            abc: ["def", -1],
            ghi: 0,
            jkl: {
                dhi: ["abc", "def"]
            },
            waf: "dwqd"
        };
        this.inputs = [""];
        this.outputs = [];
        this.historyIndex = 0;
        this.input = "";
        this.rows = 1;
        this.autoCompleteOptions = [];
        this.fixed = false;
        this.display = false;
        this.inputBase = "";
        this.counter = 0;
        this.horizontal = true;
        this.log = console.log;
        this.log = () => {
        };
        ["log", "debug", "warn", "error"].forEach((key) => {
            console[key] = this.proxy(console, console[key], key, (args) => this.handleConsoleEvent(args));
        });
        setInterval(() => {
            this.counter += 1;
            this.test.jkl = [{ "afa": "Qff", "gfs": "Rsae" }, { "def": 2, "ff": 3 }][this.counter % 2];
        }, 150);
        if (!window["debug"]) {
            class Debug {
            }
            window["debug"] = new Debug();
        }
        window["debug"].JsConsole = this;
        window.onerror = this.proxy(window, window.onerror, "onerror", (args) => {
            args.method = "error";
            this.log(args);
            this.handleConsoleEvent(args);
        });
        this.updateOrientation();
        this.handleOnPatternChange("resize");
    }
    proxy(context, method, name, handler) {
        return function () {
            let args = Array.prototype.slice.apply(arguments);
            handler({ method: name, arguments: args });
            if (method) {
                method.apply(context, args);
            }
        };
    }
    watchHandler(newValue, oldValue) {
        if (newValue != oldValue) {
            this.handleOnPatternChange(newValue);
        }
    }
    handleOnPatternChange(newValue) {
        let l = this.patternListeners;
        if (newValue == "resize" && !(l.resize && l.resize.listener)) {
            l.resize = {
                listener: window.addEventListener("resize", () => {
                    if (this.updateOrientation()) {
                        let time = Math.floor(Date.now() / 1000);
                        console.info("Unlocking debug mode: " + (l.resize.counter + 1) + "/" + l.resize.target);
                        let diff = Math.abs(time - l.resize.lastChange);
                        if (diff >= 4 && diff <= 6) {
                            l.resize.counter += 1;
                            if (l.resize.counter == l.resize.target) {
                                this.display = true;
                                l.resize.counter = 0;
                                l.resize.target = 2;
                            }
                        }
                        else {
                            l.resize.counter = 0;
                        }
                        l.resize.lastChange = time;
                    }
                }),
                counter: 0,
                target: 5,
                lastChange: 0
            };
        }
        else {
            if (l && l.resize && l.resize.listener) {
                window.removeEventListener("resize", l.resize.listener);
            }
        }
    }
    updateOrientation() {
        let oldValue = this.horizontal;
        let newValue = window.innerWidth > window.innerHeight;
        this.horizontal = newValue;
        return oldValue != newValue;
    }
    componentDidLoad() {
        let r = this.el.shadowRoot;
        this.elements = {
            textArea: r.querySelector(".input-area"),
            scrollMarker: r.querySelector(".scroll-marker"),
            history: r.querySelector(".history")
        };
    }
    handleConsoleEvent(args) {
        this.log("Log: ", args.arguments[4]);
        switch (args.method) {
            case "log":
            case "info":
            case "warn":
            case "debug": {
                this.outputs = [...this.outputs, {
                        value: args.arguments,
                        command: "",
                        type: args.method
                    }];
                break;
            }
            case "error": {
                this.outputs = [...this.outputs, {
                        value: args.arguments[0] + ((args.arguments[4] ? args.arguments[4].stack : "") || "").replace(/^[^\n]+/, ""),
                        command: "",
                        type: "error"
                    }];
                break;
            }
            default:
                break;
        }
    }
    getInputEntry() {
        return this.inputs[this.inputs.length - 1 - this.historyIndex];
    }
    setInputEntry(val) {
        this.inputs[this.inputs.length - 1 - this.historyIndex] = val;
    }
    getOutputEntry() {
        let out = this.outputs.filter((entry) => {
            return entry.type != "native";
        });
        let i = out.length - this.historyIndex;
        return i > 0 ? out[i] : undefined;
    }
    handleKeyboard(event) {
        let tArea = this.elements.textArea;
        if (event["key"] === 'Escape') {
            this.clear();
            event.preventDefault();
        }
        else if (event["key"] === 'ArrowUp') {
            if (this.historyIndex < this.inputs.length - 1) {
                this.autoCompleteOptions = [];
                if (tArea.value.substr(0, tArea.selectionStart).split("\n").length == 1) {
                    this.historyIndex += 1;
                    this.input = this.getInputEntry();
                }
                event.preventDefault();
            }
        }
        else if (event["key"] === 'ArrowDown') {
            if (this.historyIndex > 0) {
                this.autoCompleteOptions = [];
                if (tArea.value.substr(tArea.selectionStart, tArea.value.length).split("\n").length == 1) {
                    this.historyIndex -= 1;
                    this.input = this.getInputEntry();
                }
                event.preventDefault();
            }
        }
    }
    handleSubmit() {
        if (this.input.trim().length > 0) {
            this.log("Evalutating: ", this.input);
            let command = this.input;
            command = command.replace(/(^|[^a-zA-Z])let /g, "$1var ");
            if (/^\s*\{/.test(command) && /\}\s*$/.test(command)) {
                command = "(" + command + ")";
            }
            let res = {
                command: command,
                value: undefined,
                type: ""
            };
            try {
                res.value = (function () {
                    return eval.apply(this, [command]);
                }());
                if (!res.value) {
                    res.value = command;
                    res.type = "simple";
                }
                else {
                    res.type = "object";
                }
            }
            catch (e) {
                res.type = "error";
                res.value = e.stack;
                this.log(e);
            }
            this.log("Output", res);
            let oldOutEntry = this.getOutputEntry();
            this.setInputEntry(oldOutEntry ? oldOutEntry.command : command);
            this.historyIndex = 0;
            this.setInputEntry(res.command);
            this.outputs = [...this.outputs, res];
            this.inputs = [...this.inputs, ""];
            this.input = "";
            this.autoCompleteOptions = [];
            setTimeout(() => {
                let lastHistChild = this.elements.history.firstElementChild.lastElementChild;
                if (lastHistChild) {
                    lastHistChild.scrollIntoView(false);
                }
                this.elements.scrollMarker.scrollIntoView(false);
            }, 100);
        }
    }
    promptChange(_) {
        this.input = this.elements.textArea.value;
        this.setInputEntry(this.input);
        this.updateAutoCompleteOptions();
    }
    updateAutoCompleteOptions() {
        //https://regex101.com/r/3fvjJu/10
        let reg = /(.*?)\b([_a-zA-Z]\w*(?:\.[_a-zA-Z]\w*(?!$)|\['[^'\r\n]+'\]|\["[^"\r\n]+"\]|\[\d+\])*)(?:(\.|(?:\[("|'|)))(|\d+|[_a-zA-Z]\w*|(?:(?!\4)[^\n\r])+))?($|\4|\4\])$/gm;
        let matches = reg.exec(this.input);
        let prefix = matches ? matches[1] : undefined;
        reg.lastIndex = 0;
        this.inputBase = this.input.replace(reg, "$1");
        reg.lastIndex = 0;
        if (matches) {
            matches[2] = "this." + matches[2];
            let wrappedCommand = matches.slice(2).join("");
            matches = reg.exec(wrappedCommand);
            reg.lastIndex = 0;
            //console.info(reg, wrappedCommand, matches, reg.exec(wrappedCommand));
        }
        let base = "";
        let prop;
        let res = [];
        if (matches) {
            base += matches[2] || "";
            prop = matches[5] || "";
        }
        try {
            res = props(function () {
                return eval.apply(this, [base]);
            }(), true);
        }
        catch (_) {
        }
        if (base && base != "") {
            if (res) {
                res = res.filter((p) => {
                    return prop ? (p.indexOf(prop) == 0) : true;
                });
                res.length = 100;
                res = res.map((e) => {
                    base = base.replace(/^this\.?/, "");
                    if (base == "") {
                        matches[3] = matches[3] ? matches[3].replace(/^\./, "") : "";
                    }
                    return prefix + base + matches[3] + (matches[4] || "") + e;
                });
            }
            else {
                res = [];
            }
        }
        else {
            res = res.map((e) => {
                return (prefix || this.input) + e.replace(/^this\.?/, "");
            });
        }
        res.sort();
        let hist = this.inputs.slice(0, -1);
        if (hist) {
            hist = hist.filter((p) => {
                return p.indexOf(this.input) == 0;
            });
            res = uniq(hist.concat(res));
        }
        let index = res.indexOf(this.input);
        if (index != -1) {
            res.splice(index, 1);
        }
        this.autoCompleteOptions = res; // ["> " + command, ">> " + wrappedCommand].concat(["base: " + base, "child: " + prop]).concat(res);
    }
    handleHistoryClick(i) {
        this.input = this.inputs[i];
        this.historyIndex = 0;
        this.elements.textArea.focus();
    }
    handlePromptClick(event) {
        this.showHistory = !this.showHistory;
        event.preventDefault();
    }
    clear(event) {
        this.input = "";
        if (this.outputs.length + this.inputs.length == 0) {
            this.display = false;
        }
        if (this.outputs.length == 0) {
            this.inputs = [];
        }
        this.outputs = [];
        if (event) {
            event.preventDefault();
        }
    }
    hostData() {
        return {
            class: { fixed: this.fixed },
            style: { display: this.display ? "block" : "none" }
        };
    }
    render() {
        return (h("form", { onSubmit: (_) => this.handleSubmit(), action: "javascript:void(0);" },
            h("div", { class: "url" },
                h("a", { href: this.url }, "Github")),
            h("div", { class: "scroll-mask" },
                h("div", { class: "scroll" },
                    h("div", { class: "output" },
                        h("object-gui", { obj: window["debug"], excludeProto: true })))),
            h("div", { class: "entries" }, this.outputs.map((entry) => {
                if (entry.type == "object") {
                    return (h("div", { class: "scroll-mask" },
                        h("div", { class: "scroll" },
                            h("div", { class: "output" },
                                h("object-gui", { obj: entry.value })))));
                }
                else if (entry.type == "log") {
                    return (h("div", { class: "scroll-mask" },
                        h("div", { class: "scroll" },
                            h("div", { class: "output log" }, entry.value.map((e) => {
                                switch (typeof e) {
                                    case "string":
                                        return (h("span", null, e));
                                    case "number":
                                        return (h("span", { class: "number" }, e));
                                    case "boolean":
                                        return (h("span", { class: "boolean" }, e));
                                    default:
                                        return (h("object-gui", { obj: e }));
                                }
                            })))));
                }
                else if (entry.type != "") {
                    return (h("div", { class: "scroll-mask" },
                        h("div", { class: "scroll" },
                            h("div", { class: "output " + entry.type }, "" + entry.value))));
                }
            })),
            h("div", { class: "bottom-wrapper" },
                h("div", { class: "history" },
                    h("div", { class: { "popup": true, "open": this.showHistory } }, this.inputs.slice(0, -1).map((entry, i) => {
                        return (h("span", { onClick: (_) => this.handleHistoryClick(i) }, entry));
                    }))),
                h("span", { class: { "prompt": true, "open": this.showHistory }, onTouchStart: (e) => this.handlePromptClick(e), onMouseDown: (e) => this.handlePromptClick(e) }, ">"),
                h("input", { autoCapitalize: "off", autoCorrect: "off", autoComplete: "off", list: "completionOptions", id: "input-area", class: "input-area", spellCheck: false, value: this.input, onInput: (event) => this.promptChange(event), onKeyDown: (event) => this.handleKeyboard(event) }),
                h("datalist", { id: "completionOptions" }, this.autoCompleteOptions.map((entry) => {
                    return (h("option", { value: entry }));
                })),
                h("span", { class: "clear", onTouchStart: (e) => this.clear(e), onMouseDown: (e) => this.clear(e) },
                    h("span", null, "\u2715"))),
            h("div", { class: "scroll-marker" })));
    }
    static get is() { return "js-console"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "autoCompleteOptions": {
            "state": true
        },
        "display": {
            "type": Boolean,
            "attr": "display",
            "mutable": true
        },
        "el": {
            "elementRef": true
        },
        "first": {
            "type": String,
            "attr": "first"
        },
        "fixed": {
            "type": Boolean,
            "attr": "fixed",
            "mutable": true
        },
        "historyIndex": {
            "state": true
        },
        "input": {
            "state": true
        },
        "inputs": {
            "state": true
        },
        "last": {
            "type": String,
            "attr": "last"
        },
        "openOnPattern": {
            "type": String,
            "attr": "open-on-pattern",
            "watchCallbacks": ["watchHandler"]
        },
        "outputs": {
            "state": true
        },
        "rows": {
            "state": true
        },
        "showHistory": {
            "state": true
        },
        "test": {
            "state": true
        }
    }; }
    static get style() { return ":host(.fixed) {\n  width: unset;\n  left: 0;\n  right: -1px;\n  bottom: 0;\n  max-height: 30vh;\n  position: fixed; }\n  :host(.fixed) form, :host(.fixed) .entries {\n    min-height: 100%; }\n\n:host {\n  width: calc(100% - 2px);\n  max-height: calc(100% - 2px);\n  position: absolute;\n  font-family: Consolas, monospace;\n  font-size: 11px;\n  visibility: visible;\n  border: 1px solid lightgrey;\n  overflow-y: auto;\n  background-color: rgba(255, 255, 255, 0.85);\n  opacity: 0.8; }\n  \@media (max-width: 700px) {\n    :host {\n      font-size: 100%; } }\n  :host .url {\n    position: absolute;\n    right: 0;\n    top: 0; }\n  :host .scroll-mask {\n    overflow: hidden;\n    width: 100%;\n    height: 100%; }\n  :host .scroll {\n    width: 100%;\n    overflow-x: scroll;\n    overflow-y: hidden;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 100%;\n    margin-bottom: 0; }\n    \@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n      :host .scroll {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-ms-accelerator: true) {\n      :host .scroll {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-moz-appearance: none) {\n      :host .scroll {\n        height: calc(100% + 12px);\n        margin-bottom: -12px; } }\n    \@supports (-webkit-appearance: none) {\n      :host .scroll::-webkit-scrollbar {\n        display: none; } }\n  :host .entries {\n    overflow: hidden; }\n  :host .output {\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-bottom: 1px solid lightgrey;\n    min-width: calc(100% - 10px);\n    padding: 5px; }\n    :host .output.log > span:not(:last-child), :host .output.info > span:not(:last-child), :host .output.warn > span:not(:last-child), :host .output.debug > span:not(:last-child) {\n      float: left;\n      margin-right: 5px; }\n    :host .output.info {\n      color: blue;\n      background-color: rgba(0, 0, 255, 0.08); }\n    :host .output.warn {\n      color: orange;\n      background-color: rgba(255, 165, 0, 0.08); }\n    :host .output.debug {\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n    :host .output.error {\n      white-space: pre;\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n  :host .bottom-wrapper {\n    bottom: 0;\n    position: -webkit-sticky;\n    position: sticky;\n    background-color: white;\n    margin-top: -1px;\n    border-top: 1px solid lightgrey;\n    width: 100%; }\n    :host .bottom-wrapper .clear {\n      font-size: 14px;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      cursor: pointer;\n      display: inline-block;\n      background-color: lightgrey;\n      border-radius: 10px;\n      width: 16px;\n      height: 16px;\n      position: relative;\n      margin-top: 2px; }\n      \@media (min-width: 700px) {\n        :host .bottom-wrapper .clear {\n          -webkit-transform: scale(0.9);\n          transform: scale(0.9); } }\n      :host .bottom-wrapper .clear span {\n        width: 16px;\n        height: 16px;\n        display: table-cell;\n        text-align: center;\n        vertical-align: middle;\n        -webkit-transform: translateY(-1px);\n        transform: translateY(-1px); }\n    :host .bottom-wrapper .history, :host .bottom-wrapper .input-area {\n      font-size: 16px;\n      line-height: 16px;\n      height: 16px; }\n    :host .bottom-wrapper .history {\n      padding-left: 22px;\n      height: 0;\n      overflow: visible;\n      position: absolute; }\n      :host .bottom-wrapper .history .popup {\n        -webkit-transition: opacity 0.15s;\n        transition: opacity 0.15s;\n        position: absolute;\n        bottom: 0;\n        background-color: rgba(255, 255, 255, 0.9);\n        border-radius: 4px;\n        border: 1px solid rgba(84, 83, 76, 0.3);\n        font-size: 88%;\n        display: inline-block;\n        min-width: 120px;\n        min-height: 15px;\n        max-height: 50px;\n        overflow-y: auto;\n        opacity: 0; }\n        :host .bottom-wrapper .history .popup.open {\n          opacity: 1; }\n        :host .bottom-wrapper .history .popup span {\n          white-space: nowrap;\n          display: block;\n          position: relative;\n          bottom: 0;\n          -webkit-transition: background-color 0.3s, color 0.3s;\n          transition: background-color 0.3s, color 0.3s;\n          background-color: rgba(0, 0, 255, 0); }\n          :host .bottom-wrapper .history .popup span:active {\n            -webkit-transition: background-color 0s, color 0s;\n            transition: background-color 0s, color 0s;\n            background-color: rgba(0, 0, 255, 0.5);\n            color: white; }\n    :host .bottom-wrapper .input-area {\n      border: none;\n      width: calc(100% - 24px - 20px);\n      resize: none;\n      padding: 2px;\n      -webkit-transform: translateY(-2px);\n      transform: translateY(-2px); }\n      :host .bottom-wrapper .input-area:focus {\n        outline: none !important; }\n    :host .bottom-wrapper .prompt {\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      cursor: pointer;\n      -webkit-transition: all 0.15s;\n      transition: all 0.15s;\n      -webkit-transform: scaleX(0.5);\n      transform: scaleX(0.5);\n      float: left;\n      color: blue;\n      font-size: 19.2px;\n      margin: -1px 4px -1px 4px;\n      font-family: Consolas, monospace;\n      font-weight: 800; }\n      \@media (max-width: 700px) {\n        :host .bottom-wrapper .prompt {\n          font-size: 120%; } }\n      :host .bottom-wrapper .prompt.open {\n        -webkit-transform: scaleY(0.5) rotateZ(-90deg);\n        transform: scaleY(0.5) rotateZ(-90deg); }"; }
}

export { JsConsole };
