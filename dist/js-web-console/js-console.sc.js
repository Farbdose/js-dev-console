/*! Built with http://stenciljs.com */
const { h } = window.JsWebConsole;

class JsConsole {
    constructor() {
        this.url = "https://github.com/Farbdose/js-dev-console";
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
        this.counter = 0;
        this.log = console.log;
        this.log = () => { };
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
        /*setTimeout(() => {
            throw "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\na\na";
        }, 300);

        setTimeout(() => {
            throw "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\nb\nb";
        }, 300);*/
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
    handleInputChange(event) {
        let tArea = this.elements.textArea;
        if (event.key === 'Escape') {
            this.input = "";
            if (this.outputs.length == 0) {
                this.inputs = [];
            }
            this.outputs = [];
        }
        else if (event.key === 'ArrowUp') {
            setTimeout(() => {
                if (tArea.value.substr(0, tArea.selectionStart).split("\n").length == 1) {
                    if (this.historyIndex < this.inputs.length - 1) {
                        this.historyIndex += 1;
                        this.input = this.getInputEntry();
                    }
                }
            });
        }
        else if (event.key === 'ArrowDown') {
            setTimeout(() => {
                if (tArea.value.substr(tArea.selectionStart, tArea.value.length).split("\n").length == 1) {
                    if (this.historyIndex > 0) {
                        this.historyIndex -= 1;
                        this.input = this.getInputEntry();
                    }
                }
            });
        }
        else if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
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
                setTimeout(() => {
                    this.elements.history.firstElementChild.lastElementChild.scrollIntoView(false);
                    this.elements.scrollMarker.scrollIntoView(false);
                }, 100);
            }
        }
        else if (event.key === 'Enter') {
            let val = tArea.value;
            this.input = val.substring(0, tArea.selectionStart) + "\n" + val.substring(tArea.selectionStart);
            this.rows = Math.ceil((tArea.scrollHeight - 14) / 14) + 1;
            this.setInputEntry(this.input);
        }
        else {
            setTimeout(() => {
                this.input = tArea.value;
                this.rows = Math.ceil((tArea.scrollHeight - 14) / 14);
                this.setInputEntry(this.input);
            });
        }
    }
    handleHistoryClick(i) {
        this.input = this.inputs[i];
        this.historyIndex = 0;
        this.elements.textArea.focus();
    }
    render() {
        return (h("div", null,
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
                                    case "string": return (h("span", null, e));
                                    case "number": return (h("span", { class: "number" }, e));
                                    case "boolean": return (h("span", { class: "boolean" }, e));
                                    default: return (h("object-gui", { obj: e }));
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
                    h("div", { class: "popup" }, this.inputs.slice(0, -1).map((entry, i) => {
                        return (h("span", { onClick: (_) => this.handleHistoryClick(i) }, entry));
                    }))),
                h("span", { class: "prompt" }, ">"),
                h("textarea", { id: "input-area", class: "input-area", autoFocus: true, spellCheck: false, value: this.input, rows: this.rows, onKeyDown: (event) => this.handleInputChange(event) })),
            h("div", { class: "scroll-marker" })));
    }
    static get is() { return "js-console"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "first": {
            "type": String,
            "attr": "first"
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
        "outputs": {
            "state": true
        },
        "rows": {
            "state": true
        },
        "test": {
            "state": true
        }
    }; }
    static get style() { return "[data-js-console-host] {\n  width: 100%;\n  position: absolute;\n  overflow: hidden;\n  font-family: Consolas, monospace;\n  font-size: 11px; }\n  [data-js-console-host]   .url[data-js-console] {\n    position: absolute;\n    right: 0;\n    top: 0; }\n  [data-js-console-host]   .scroll-mask[data-js-console] {\n    overflow: hidden;\n    width: 100%;\n    height: 100%; }\n  [data-js-console-host]   .scroll[data-js-console] {\n    width: 100%;\n    overflow-x: scroll;\n    overflow-y: hidden;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 100%;\n    margin-bottom: 0; }\n    \@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-ms-accelerator: true) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-moz-appearance: none) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        height: calc(100% + 12px);\n        margin-bottom: -12px; } }\n    \@supports (-webkit-appearance: none) {\n      [data-js-console-host]   .scroll[data-js-console]::-webkit-scrollbar {\n        display: none; } }\n  [data-js-console-host]   .entries[data-js-console] {\n    overflow: hidden; }\n  [data-js-console-host]   .output[data-js-console] {\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-bottom: 1px solid lightgrey;\n    min-width: calc(100% - 10px);\n    padding: 5px; }\n    [data-js-console-host]   .output.log[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.info[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.warn[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.debug[data-js-console]    > span[data-js-console]:not(:last-child) {\n      float: left;\n      margin-right: 5px; }\n    [data-js-console-host]   .output.info[data-js-console] {\n      color: blue;\n      background-color: rgba(0, 0, 255, 0.08); }\n    [data-js-console-host]   .output.warn[data-js-console] {\n      color: orange;\n      background-color: rgba(255, 165, 0, 0.08); }\n    [data-js-console-host]   .output.debug[data-js-console] {\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n    [data-js-console-host]   .output.error[data-js-console] {\n      white-space: pre;\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n  [data-js-console-host]   .bottom-wrapper[data-js-console] {\n    bottom: 0;\n    position: -webkit-sticky;\n    position: sticky;\n    background-color: white;\n    margin-top: -1px;\n    border-top: 1px solid lightgrey;\n    height: calc(1rem + 5px); }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]:not(:focus-within)   .history[data-js-console]   .popup[data-js-console] {\n      opacity: 0; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console], [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console] {\n      font-size: 1rem;\n      line-height: 1rem;\n      height: 1rem; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console] {\n      padding-left: 22px;\n      height: 0;\n      overflow: visible;\n      position: absolute; }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console] {\n        -webkit-transition: opacity 0.2s;\n        transition: opacity 0.2s;\n        position: absolute;\n        bottom: 0;\n        background-color: rgba(255, 255, 255, 0.5);\n        border-radius: 4px;\n        border: 1px solid rgba(84, 83, 76, 0.2);\n        font-size: 88%;\n        display: inline-block;\n        min-width: 120px;\n        min-height: 15px;\n        max-height: 50px;\n        overflow-y: auto; }\n        [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console]   span[data-js-console] {\n          display: block;\n          position: relative;\n          bottom: 0;\n          -webkit-transition: background-color 0.3s, color 0.3s;\n          transition: background-color 0.3s, color 0.3s;\n          background-color: rgba(0, 0, 255, 0); }\n          [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console]   span[data-js-console]:active {\n            -webkit-transition: background-color 0s, color 0s;\n            transition: background-color 0s, color 0s;\n            background-color: rgba(0, 0, 255, 0.5);\n            color: white; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console] {\n      -webkit-box-sizing: content-box;\n      box-sizing: content-box;\n      left: 0;\n      right: 0;\n      margin-top: 1px;\n      margin-bottom: 1px;\n      border: none;\n      width: calc(100% - 24px);\n      resize: none;\n      padding: 2px; }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console]:focus {\n        outline: none !important; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .prompt[data-js-console] {\n      -webkit-transform: scaleX(0.5);\n      transform: scaleX(0.5);\n      float: left;\n      color: blue;\n      font-size: 1.2rem;\n      margin: -1px 4px -1px 4px;\n      font-family: Consolas, monospace;\n      font-weight: 800; }"; }
}

export { JsConsole };
