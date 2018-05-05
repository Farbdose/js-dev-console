import { props } from "../utils";
export class JsConsole {
    constructor() {
        this.url = "https://github.com/Farbdose/js-dev-console";
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
        this.inputBase = "";
        this.counter = 0;
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
            this.clear();
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
                    let lastHistChild = this.elements.history.firstElementChild.lastElementChild;
                    if (lastHistChild) {
                        lastHistChild.scrollIntoView(false);
                    }
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
    getAutoCompleteOptions(command) {
        //https://regex101.com/r/3fvjJu/10
        let wrappedCommand = command;
        let reg = /(.*?)\b([_a-zA-Z]\w*(?:\.[_a-zA-Z]\w*(?!$)|\['[^'\r\n]+'\]|\["[^"\r\n]+"\]|\[\d+\])*)(?:(\.|(?:\[("|'|)))(|\d+|[_a-zA-Z]\w*|(?:(?!\4)[^\n\r])+))?($|\4|\4\])$/gm;
        let matches = reg.exec(command);
        let prefix = matches ? matches[1] : undefined;
        reg.lastIndex = 0;
        this.inputBase = command.replace(reg, "$1");
        reg.lastIndex = 0;
        if (matches) {
            matches[2] = "this." + matches[2];
            wrappedCommand = matches.slice(2).join("");
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
            res = res ? res.filter((p) => {
                return prop ? (p.indexOf(prop) == 0) : true;
            }).map((e) => {
                base = base.replace(/^this\.?/, "");
                if (base == "") {
                    matches[3] = matches[3] ? matches[3].replace(/^\./, "") : "";
                }
                return prefix + base + matches[3] + (matches[4] || "") + e;
            }) : [];
        }
        else {
            res = res.map((e) => {
                return (prefix || command) + e.replace(/^this\.?/, "");
            });
        }
        res.length = 100;
        return res; // ["> " + command, ">> " + wrappedCommand].concat(["base: " + base, "child: " + prop]).concat(res);
    }
    handleHistoryClick(i) {
        this.input = this.inputs[i];
        this.historyIndex = 0;
        this.elements.textArea.focus();
    }
    handlePromptClick() {
        this.showHistory = !this.showHistory;
    }
    clear() {
        this.input = "";
        if (this.outputs.length == 0) {
            this.inputs = [];
        }
        this.outputs = [];
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
                h("span", { class: { "prompt": true, "open": this.showHistory }, onClick: (_) => this.handlePromptClick() }, ">"),
                h("input", { list: "completionOptions", id: "input-area", class: "input-area", spellCheck: false, value: this.input, onChange: (event) => this.handleInputChange(event), onKeyDown: (event) => this.handleInputChange(event) }),
                h("datalist", { id: "completionOptions" }, this.getAutoCompleteOptions(this.input).map((entry) => {
                    return (h("option", { value: entry }));
                })),
                h("span", { class: "clear", onClick: (_) => this.clear() },
                    h("span", null, "x"))),
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
        "showHistory": {
            "state": true
        },
        "test": {
            "state": true
        }
    }; }
    static get style() { return "/**style-placeholder:js-console:**/"; }
}
