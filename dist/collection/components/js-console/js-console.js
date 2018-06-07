import { debounce, props, uniq } from "../utils";
import "datalist-polyfill";
export class JsConsole {
    constructor() {
        this.url = "https://github.com/Farbdose/js-dev-console";
        this.pattern = null; //null, resize
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
        this.fixed = false;
        this.display = false;
        this.inputBase = "";
        this.counter = 0;
        this.log = () => {
        };
        this.horizontal = true;
        //this.log = console.log;
        ["log", "debug", "warn", "error"].forEach((key) => {
            console[key] = this.proxy(console, console[key], key, (args) => this.handleConsoleEvent(args));
        });
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
        this.handleOnPatternChange(this.pattern);
        this.updateAutoCompleteOptions = debounce(() => this.updateAutoCompleteOptionsUtil(), 300);
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
    clearCompletionOptions() {
        this.completionOptions = [];
    }
    handleKeyboard(event) {
        let tArea = this.elements.textArea;
        if (event["key"] === 'Escape') {
            this.clear();
            event.preventDefault();
        }
        else if (event["key"] === 'ArrowUp') {
            if (this.historyIndex < this.inputs.length - 1) {
                this.clearCompletionOptions();
                if (tArea.value.substr(0, tArea.selectionStart).split("\n").length == 1) {
                    this.historyIndex += 1;
                    this.input = this.getInputEntry();
                }
                event.preventDefault();
            }
        }
        else if (event["key"] === 'ArrowDown') {
            if (this.historyIndex > 0) {
                this.clearCompletionOptions();
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
            this.clearCompletionOptions();
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
    }
    updateAutoCompleteOptionsUtil() {
        console.info("Updating autocomplete", this.input);
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
                //res.length = 100;
                res = res.map((e) => {
                    base = base.replace(/^this\.?/, "");
                    if (base == "") {
                        matches[3] = matches[3] ? matches[3].replace(/^\./, "") : "";
                    }
                    return prefix + base + matches[3] + (matches[4] || "") + e;
                });
                if (prop == "") {
                    res = res.filter((e) => {
                        return !/^window\.(Audio|CSS|HTML|IDB|Media|RTC|SVG|DOM|MIDI|Performance|Payment|USB|Text|Presentation|WebGL|on)/.test(e);
                    });
                }
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
        this.completionOptions = res;
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
            class: { fixed: this.fixed }
        };
    }
    render() {
        return this.display ? (h("form", { onSubmit: (_) => this.handleSubmit(), action: "javascript:void(0);" },
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
                            h("pre", { class: "output log" }, entry.value.map((e) => {
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
                            h("pre", { class: "output " + entry.type }, "" + entry.value))));
                }
            })),
            h("div", { class: "bottom-wrapper" },
                h("div", { class: "history" },
                    h("div", { class: { "popup": true, "open": this.showHistory } }, this.inputs.slice(0, -1).map((entry, i) => {
                        return (h("span", { onClick: (_) => this.handleHistoryClick(i) }, entry));
                    }))),
                h("span", { class: { "prompt": true, "open": this.showHistory }, onTouchStart: (e) => this.handlePromptClick(e), onMouseDown: (e) => this.handlePromptClick(e) }, ">"),
                h("input", { autoCapitalize: "off", autoCorrect: "off", autoComplete: "off", list: "completionOptions", id: "input-area", class: "input-area", spellCheck: false, size: 250, value: this.input, onInput: (event) => this.promptChange(event), onKeyDown: (event) => this.handleKeyboard(event) }),
                h("data-list", { data: this.completionOptions, name: "completionOptions" }),
                h("span", { class: "clear", onTouchStart: (e) => this.clear(e), onMouseDown: (e) => this.clear(e) },
                    h("span", null, "\u2715"))),
            h("div", { class: "scroll-marker" }))) : "";
    }
    static get is() { return "js-console"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "completionOptions": {
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
        "outputs": {
            "state": true
        },
        "pattern": {
            "type": String,
            "attr": "pattern",
            "watchCallbacks": ["watchHandler"]
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
    static get style() { return "/**style-placeholder:js-console:**/"; }
}
