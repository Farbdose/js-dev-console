/*! Built with http://stenciljs.com */
JsDevConsole.loadBundle('js-console', ['exports', './chunk-2ed43275.js'], function (exports, __chunk_1) {
    var h = window.JsDevConsole.h;
    /*
    * datalist-polyfill.js - https://github.com/mfranzke/datalist-polyfill
    * @license Copyright(c) 2017 by Maximilian Franzke
    * Supported by Christian, Johannes, @mitchhentges, @mertenhanisch, @ailintom, @Kravimir, Michael, @hryamzik, @ottoville, @IceCreamYou, @wlekin and @eddr - many thanks for that !
    */
    /*
    * A lightweight and library dependency free vanilla JavaScript datalist polyfill.
    * Tests for native support of an inputs elements datalist functionality.
    * Elsewhere the functionality gets emulated by a select element.
    */
    (function () {
        // feature detection
        var nativedatalist = ('list' in document.createElement('input')) &&
            !!(document.createElement('datalist') && window.HTMLDataListElement);
        // in case of that the feature doesn't exist, emulate it's functionality
        if (nativedatalist) {
            return false;
        }
        // emulate the two properties regarding the datalist and input elements
        // list property / https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement
        (function (constructor) {
            if (constructor &&
                constructor.prototype &&
                constructor.prototype.list === undefined) {
                Object.defineProperty(constructor.prototype, 'list', {
                    get: function () {
                        if (typeof (this) === 'object' && this instanceof constructor) {
                            var list = this.getAttribute('list');
                            return document.getElementById(list);
                        }
                        return null;
                    }
                });
            }
        })(window.HTMLInputElement);
        // options property / https://developer.mozilla.org/en/docs/Web/API/HTMLDataListElement
        (function (constructor) {
            if (constructor &&
                constructor.prototype &&
                constructor.prototype.options === undefined) {
                Object.defineProperty(constructor.prototype, 'options', {
                    get: function () {
                        if (typeof (this) === 'object' && this instanceof constructor) {
                            return this.getElementsByTagName('option');
                        }
                    }
                });
            }
        })(window.HTMLElement);
        // identify whether a select multiple is feasible
        var touched = false, 
        // speaking variables for the different keycodes
        keyENTER = 13, keyESC = 27, keyUP = 38, keyDOWN = 40, 
        // defining the text / value seperator for displaying the value and text values
        textValueSeperator = ' / ', 
        // and defining the different input types that are supported by this polyfill
        supportedTypes = ['text', 'email', 'number', 'search', 'tel', 'url'], 
        // classes for elements
        classNameInput = 'polyfilled', classNamePolyfillingSelect = 'polyfilling';
        // differentiate for touch interactions, adapted by https://medium.com/@david.gilbertson/the-only-way-to-detect-touch-with-javascript-7791a3346685
        window.addEventListener('touchstart', function onFirstTouch() {
            touched = true;
            window.removeEventListener('touchstart', onFirstTouch);
        });
        // function regarding the inputs interactions
        var inputInputList = function (event) {
            var eventTarget = event.target, eventTargetTagName = eventTarget.tagName.toLowerCase();
            // check for whether the events target was an input datalist
            if (eventTargetTagName && eventTargetTagName === 'input' && eventTarget.getAttribute('list')) {
                var list = eventTarget.getAttribute('list'), dataList = document.getElementById(list);
                // still check for an existing instance
                if (dataList !== null) {
                    var dataListSelect = dataList.getElementsByClassName(classNamePolyfillingSelect)[0];
                    // still check for an existing instance
                    if (dataListSelect !== undefined) {
                        // on an ESC key press within the input, let's break here and hide the datalist select
                        if (event.keyCode === keyESC) {
                            toggleVisibility(dataListSelect, false);
                            return;
                        }
                        var dataListOptions = dataList.querySelectorAll('option:not([disabled]):not(.message)'), inputValue = eventTarget.value, newSelectValues = document.createDocumentFragment(), disabledValues = document.createDocumentFragment(), visible = false, multipleEmails = (eventTarget.type === 'email' && eventTarget.multiple), keyOpen = (event.keyCode === keyUP || event.keyCode === keyDOWN);
                        // in case of type=email and multiple attribute, we would need to split the inputs value into pieces
                        if (multipleEmails) {
                            var multipleEntries = inputValue.split(','), relevantIndex = multipleEntries.length - 1;
                            inputValue = multipleEntries[relevantIndex].trim();
                        }
                        // if the input contains a value, than ...
                        if (inputValue !== '' || keyOpen) {
                            // ... create an array out of the options list
                            var nodeArray = Array.prototype.slice.call(dataListOptions);
                            // ... sort all entries and
                            nodeArray.sort(function (a, b) {
                                return a.value.localeCompare(b.value);
                            })
                                .forEach(function (opt) {
                                var optionValue = opt.value;
                                // ... put this option into the fragment that is meant to get inserted into the select
                                // "Each option element that is a descendant of the datalist element, that is not disabled, and whose value is a string that isn't the empty string, represents a suggestion. Each suggestion has a value and a label." (W3C)
                                if (optionValue !== '' && optionValue.toLowerCase()
                                    .indexOf(inputValue.toLowerCase()) !== -1 && opt.disabled === false) {
                                    var label = opt.getAttribute('label'), text = opt.text, textOptionPart = text.substr(0, optionValue.length + textValueSeperator.length), optionPart = optionValue + textValueSeperator;
                                    // the innertext should be value / text in case they are different
                                    if (text && !label && text !== optionValue && textOptionPart !== optionPart) {
                                        opt.innerText = optionValue + textValueSeperator + text;
                                    }
                                    else if (!opt.text) {
                                        // manipulating the option inner text, that would get displayed
                                        opt.innerText = label || optionValue;
                                    }
                                    newSelectValues.appendChild(opt);
                                    // ... and set the state of the select to get displayed in that case
                                    visible = true;
                                }
                                else {
                                    // ... or put this option that isn't relevant to the users into the fragment that is supposed to get inserted outside of the select
                                    disabledValues.appendChild(opt);
                                }
                            });
                            // input the options fragment into the datalists select
                            dataListSelect.appendChild(newSelectValues);
                            var dataListSelectOptionsLength = dataListSelect.options.length, firstEntry = 0, lastEntry = dataListSelectOptionsLength - 1;
                            dataListSelect.size = (dataListSelectOptionsLength > 10) ? 10 : dataListSelectOptionsLength;
                            dataListSelect.multiple = (!touched && dataListSelectOptionsLength < 2);
                            if (touched) {
                                // preselect best fitting index
                                dataListSelect.selectedIndex = firstEntry;
                            }
                            else if (dataListSelect.selectedIndex === -1) {
                                switch (event.keyCode) {
                                    case keyUP:
                                        dataListSelect.selectedIndex = lastEntry;
                                        break;
                                    case keyDOWN:
                                        dataListSelect.selectedIndex = firstEntry;
                                        break;
                                }
                            }
                            // input the unused options as siblings next to the select - and differentiate in between the regular, and the IE9 fix syntax upfront
                            var dataListAppend = dataList.getElementsByClassName('ie9_fix')[0] || dataList;
                            dataListAppend.appendChild(disabledValues);
                        }
                        // toggle the visibility of the datalist select according to previous checks
                        toggleVisibility(dataListSelect, visible);
                        // on arrow up or down keys, focus the select
                        if (keyOpen) {
                            dataListSelect.focus();
                        }
                    }
                }
            }
        };
        // focus or blur events
        var changesInputList = function (event) {
            var eventTarget = event.target, eventTargetTagName = eventTarget.tagName.toLowerCase(), inputType = eventTarget.type, inputStyles = window.getComputedStyle(eventTarget);
            // check for whether the events target was an input datalist and whether it's of one of the supported input types defined above
            if (eventTargetTagName && eventTargetTagName === 'input' && eventTarget.getAttribute('list') && supportedTypes.indexOf(inputType) > -1) {
                var eventType = event.type, list = eventTarget.getAttribute('list'), dataList = document.getElementById(list);
                // still check for an existing instance
                if (dataList !== null) {
                    var dataListSelect = dataList.getElementsByClassName(classNamePolyfillingSelect)[0], 
                    // either have the select set to the state to get displayed in case of that it would have been focused or because it's the target on the inputs blur
                    visible = (((eventType === 'focus' && eventTarget.value !== '') || (event.relatedTarget && event.relatedTarget === dataListSelect)) && dataListSelect && dataListSelect.options && dataListSelect.options.length), message = dataList.title;
                    // creating the select if there's no instance so far (e.g. because of that it hasn't been handled or it has been dynamically inserted)
                    if (dataListSelect === undefined) {
                        var rects = eventTarget.getClientRects(), 
                        // measurements
                        inputStyleMarginRight = parseFloat(inputStyles.getPropertyValue('margin-right')), inputStyleMarginLeft = parseFloat(inputStyles.getPropertyValue('margin-left'));
                        dataListSelect = document.createElement('select');
                        // setting a class for easier selecting that select afterwards
                        dataListSelect.setAttribute('class', classNamePolyfillingSelect);
                        // set general styling related definitions
                        dataListSelect.style.position = 'absolute';
                        // initially hiding the datalist select
                        toggleVisibility(dataListSelect, false);
                        // WAI ARIA attributes
                        dataListSelect.setAttribute('aria-live', 'polite');
                        dataListSelect.setAttribute('role', 'listbox');
                        if (!touched) {
                            dataListSelect.setAttribute('aria-multiselectable', 'false');
                        }
                        // the select should get positioned underneath the input field ...
                        if (inputStyles.getPropertyValue('display') === 'block') {
                            dataListSelect.style.marginTop = '-' + inputStyles.getPropertyValue('margin-bottom');
                        }
                        else {
                            if (inputStyles.getPropertyValue('direction') === 'rtl') {
                                dataListSelect.style.marginRight = '-' + (rects[0].width + inputStyleMarginLeft) + 'px';
                            }
                            else {
                                dataListSelect.style.marginLeft = '-' + (rects[0].width + inputStyleMarginRight) + 'px';
                            }
                            dataListSelect.style.marginTop = parseInt((rects[0].height + (eventTarget.offsetTop - dataList.offsetTop)), 10) + 'px';
                        }
                        // set the polyfilling selects border-radius equally as the one by the polyfilled input
                        dataListSelect.style.borderRadius = inputStyles.getPropertyValue('border-radius');
                        dataListSelect.style.minWidth = rects[0].width + 'px';
                        if (touched) {
                            var messageElement = document.createElement('option');
                            // ... and it's first entry should contain the localized message to select an entry
                            messageElement.innerText = message;
                            // ... and disable this option, as it shouldn't get selected by the user
                            messageElement.disabled = true;
                            // ... and assign a dividable class to it
                            messageElement.setAttribute('class', 'message');
                            // ... and finally insert it into the select
                            dataListSelect.appendChild(messageElement);
                        }
                        // add select to datalist element ...
                        dataList.appendChild(dataListSelect);
                        // ... and our upfollowing function to the change event
                        if (touched) {
                            dataListSelect.addEventListener('change', changeDataListSelect);
                        }
                        else {
                            dataListSelect.addEventListener('click', changeDataListSelect);
                        }
                        dataListSelect.addEventListener('blur', changeDataListSelect);
                        dataListSelect.addEventListener('keyup', changeDataListSelect);
                    }
                    // test for whether this input has already been enhanced by the polyfill
                    if (!new RegExp(' ' + classNameInput + ' ').test(' ' + eventTarget.className + ' ')) {
                        // plus we'd like to prevent autocomplete on the input datalist field
                        eventTarget.setAttribute('autocomplete', 'off');
                        // WAI ARIA attributes
                        eventTarget.setAttribute('role', 'textbox');
                        eventTarget.setAttribute('aria-haspopup', 'true');
                        eventTarget.setAttribute('aria-autocomplete', 'list');
                        eventTarget.setAttribute('aria-owns', list);
                        // bind the keyup event on the related datalists input
                        switch (eventType) {
                            case 'focus':
                                eventTarget.addEventListener('keyup', inputInputList);
                                eventTarget.addEventListener('focusout', changesInputList, true);
                                break;
                            case 'blur':
                                eventTarget.removeEventListener('keyup', inputInputList);
                                eventTarget.removeEventListener('focusout', changesInputList, true);
                                break;
                        }
                        // add class for identifying that this input is even already being polyfilled
                        eventTarget.className += ' ' + classNameInput;
                    }
                    // toggle the visibility of the datalist select according to previous checks
                    toggleVisibility(dataListSelect, visible);
                }
            }
        };
        // function regarding changes to the datalist polyfilling created select
        var changeDataListSelect = function (event) {
            var eventTarget = event.target, eventTargetTagName = eventTarget.tagName.toLowerCase();
            // check for whether the events target was a select or an option
            if (eventTargetTagName && (eventTargetTagName === 'select' || eventTargetTagName === 'option')) {
                var select = (eventTargetTagName === 'select') ? eventTarget : eventTarget.parentNode, datalist = select.parentNode, message = datalist.title, eventType = event.type, 
                // ENTER and ESC
                visible = (eventType === 'keyup' && (event.keyCode !== keyENTER && event.keyCode !== keyESC));
                // change or mouseup event or ENTER key
                if (eventType === 'change' || eventType === 'click' || (eventType === 'keyup' && event.keyCode === keyENTER)) {
                    var list = datalist.id, inputList = document.querySelector('input[list="' + list + '"]'), selectValue = select.value;
                    // input the selects value into the input on a change within the list
                    if (inputList !== null && typeof (selectValue) !== 'undefined' && selectValue.length > 0 && selectValue !== message) {
                        var inputListValue = inputList.value, lastSeperator, multipleEmails = (inputList.type === 'email' && inputList.multiple), evt;
                        // in case of type=email and multiple attribute, we need to set up the resulting inputs value differently
                        if (multipleEmails && (lastSeperator = inputListValue.lastIndexOf(',')) > -1) {
                            inputList.value = inputListValue.slice(0, lastSeperator) + ',' + selectValue;
                        }
                        else {
                            inputList.value = selectValue;
                        }
                        // create and dispatch the input event; divided for IE9 usage
                        if (typeof (Event) === 'function') {
                            evt = new Event('input', {
                                bubbles: true
                            });
                        }
                        else {
                            evt = document.createEvent('Event');
                            evt.initEvent('input', true, false);
                        }
                        inputList.dispatchEvent(evt);
                        // set the visibility to false afterwards, as we're done here
                        visible = false;
                    }
                }
                // toggle the visibility of the datalist select according to previous checks
                toggleVisibility(select, visible);
            }
        };
        // toggle the visibility of the datalist select
        var toggleVisibility = function (dataListSelect, visible) {
            if (visible) {
                dataListSelect.removeAttribute('hidden');
            }
            else {
                dataListSelect.setAttributeNode(document.createAttribute('hidden'));
            }
            dataListSelect.setAttribute('aria-hidden', (!visible).toString());
        };
        // binding the focus event - matching the input[list]s happens in the function afterwards
        document.addEventListener('focus', changesInputList, true);
    })();
    var JsConsole = /** @class */ (function () {
        function JsConsole() {
            var _this = this;
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
            this.log = function () {
            };
            this.horizontal = true;
            //this.log = console.info.bind(this);
            ["log", "debug", "warn", "error"].forEach(function (key) {
                console[key] = _this.proxy(console[key], key, function (method, args) { return _this.handleConsoleEvent(method, args); });
            });
            if (!window["debug"]) {
                var Debug = /** @class */ (function () {
                    function Debug() {
                    }
                    return Debug;
                }());
                window["debug"] = new Debug();
            }
            window["debug"].JsConsole = this;
            if (!window.onerror) {
                window.onerror = function () { };
            }
            window.onerror = this.proxy(window.onerror, "onerror", function (method, args) {
                method = "error";
                _this.log(args);
                _this.handleConsoleEvent(method, args);
            });
            this.updateOrientation();
        }
        JsConsole.prototype.proxy = function (method, name, handler) {
            return new Proxy(method, {
                apply: function (func, thisArg, argumentsList) {
                    handler(name, argumentsList);
                    return Reflect.apply(func, thisArg, argumentsList);
                }
            });
        };
        JsConsole.prototype.watchHandler = function (newValue, oldValue) {
            if (newValue != oldValue) {
                this.handleOnPatternChange(newValue);
            }
        };
        JsConsole.prototype.handleOnPatternChange = function (newValue) {
            var _this = this;
            var l = this.patternListeners;
            if (newValue == "resize" && !(l.resize && l.resize.listener)) {
                l.resize = {
                    listener: window.addEventListener("resize", function () {
                        if (_this.updateOrientation()) {
                            var time = Math.floor(Date.now() / 1000);
                            console.info("Unlocking debug mode: " + (l.resize.counter + 1) + "/" + l.resize.target);
                            var diff = Math.abs(time - l.resize.lastChange);
                            if (diff >= 4 && diff <= 6) {
                                l.resize.counter += 1;
                                if (l.resize.counter == l.resize.target) {
                                    _this.display = true;
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
        };
        JsConsole.prototype.updateOrientation = function () {
            var oldValue = this.horizontal;
            var newValue = window.innerWidth > window.innerHeight;
            this.horizontal = newValue;
            return oldValue != newValue;
        };
        JsConsole.prototype.componentDidLoad = function () {
            var _this = this;
            var r = this.el.shadowRoot;
            this.elements = {
                textArea: r.querySelector(".input-area"),
                scrollMarker: r.querySelector(".scroll-marker"),
                history: r.querySelector(".history")
            };
            this.handleOnPatternChange(this.pattern);
            this.updateAutoCompleteOptions = __chunk_1.debounce(function () { return _this.updateAutoCompleteOptionsUtil(); }, 200);
        };
        JsConsole.prototype.handleConsoleEvent = function (method, args) {
            this.log("Log: ", method, args);
            switch (method) {
                case "log":
                case "info":
                case "warn":
                case "debug": {
                    this.outputs = this.outputs.concat([{
                            value: args,
                            command: "",
                            type: method
                        }]);
                    break;
                }
                case "error": {
                    this.outputs = this.outputs.concat([{
                            value: args[0] + ((args[4] ? args[4].stack : "") || "").replace(/^[^\n]+/, ""),
                            command: "",
                            type: "error"
                        }]);
                    break;
                }
                default:
                    break;
            }
        };
        JsConsole.prototype.getInputEntry = function () {
            return this.inputs[this.inputs.length - 1 - this.historyIndex];
        };
        JsConsole.prototype.setInputEntry = function (val) {
            this.inputs[this.inputs.length - 1 - this.historyIndex] = val;
        };
        JsConsole.prototype.getOutputEntry = function () {
            var out = this.outputs.filter(function (entry) {
                return entry.type != "native";
            });
            var i = out.length - this.historyIndex;
            return i > 0 ? out[i] : undefined;
        };
        JsConsole.prototype.clearCompletionOptions = function () {
            this.completionOptions = [];
        };
        JsConsole.prototype.handleKeyboard = function (event) {
            var tArea = this.elements.textArea;
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
        };
        JsConsole.prototype.handleSubmit = function () {
            var _this = this;
            if (this.input.trim().length > 0) {
                this.log("Evalutating: ", this.input);
                var command_1 = this.input;
                command_1 = command_1.replace(/(^|[^a-zA-Z])let /g, "$1var ");
                if (/^\s*\{/.test(command_1) && /\}\s*$/.test(command_1)) {
                    command_1 = "(" + command_1 + ")";
                }
                var res = {
                    command: command_1,
                    value: undefined,
                    type: ""
                };
                try {
                    res.value = (function () {
                        return eval.apply(this, [command_1]);
                    }());
                    if (!res.value) {
                        res.value = command_1;
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
                var oldOutEntry = this.getOutputEntry();
                this.setInputEntry(oldOutEntry ? oldOutEntry.command : command_1);
                this.historyIndex = 0;
                this.setInputEntry(res.command);
                this.outputs = this.outputs.concat([res]);
                this.inputs = this.inputs.concat([""]);
                this.input = "";
                this.clearCompletionOptions();
                setTimeout(function () {
                    var lastHistChild = _this.elements.history.firstElementChild.lastElementChild;
                    if (lastHistChild) {
                        lastHistChild.scrollIntoView(false);
                    }
                    _this.elements.scrollMarker.scrollIntoView(false);
                }, 100);
            }
        };
        JsConsole.prototype.promptChange = function (_) {
            this.input = this.elements.textArea.value;
            this.setInputEntry(this.input);
            this.updateAutoCompleteOptions();
        };
        JsConsole.prototype.updateAutoCompleteOptions = function () {
        };
        JsConsole.prototype.updateAutoCompleteOptionsUtil = function () {
            var _this = this;
            console.info("Updating autocomplete", this.input);
            //https://regex101.com/r/3fvjJu/10
            var reg = /(.*?)\b([_a-zA-Z]\w*(?:\.[_a-zA-Z]\w*(?!$)|\['[^'\r\n]+'\]|\["[^"\r\n]+"\]|\[\d+\])*)(?:(\.|(?:\[("|'|)))(|\d+|[_a-zA-Z]\w*|(?:(?!\4)[^\n\r])+))?($|\4|\4\])$/gm;
            var matches = reg.exec(this.input);
            var prefix = matches ? matches[1] : undefined;
            reg.lastIndex = 0;
            this.inputBase = this.input.replace(reg, "$1");
            reg.lastIndex = 0;
            if (matches) {
                matches[2] = "this." + matches[2];
                var wrappedCommand = matches.slice(2).join("");
                matches = reg.exec(wrappedCommand);
                reg.lastIndex = 0;
                //console.info(reg, wrappedCommand, matches, reg.exec(wrappedCommand));
            }
            var base = "";
            var prop;
            var res = [];
            if (matches) {
                base += matches[2] || "";
                prop = matches[5] || "";
            }
            try {
                res = __chunk_1.props(function () {
                    return eval.apply(this, [base]);
                }(), true);
            }
            catch (_) {
            }
            if (base && base != "") {
                if (res) {
                    res = res.filter(function (p) {
                        return prop ? (p.indexOf(prop) == 0) : true;
                    });
                    //res.length = 100;
                    res = res.map(function (e) {
                        base = base.replace(/^this\.?/, "");
                        if (base == "") {
                            matches[3] = matches[3] ? matches[3].replace(/^\./, "") : "";
                        }
                        return prefix + base + matches[3] + (matches[4] || "") + e;
                    });
                    if (prop == "") {
                        res = res.filter(function (e) {
                            return !/^window\.(Audio|CSS|HTML|IDB|Media|RTC|SVG|DOM|MIDI|Performance|Payment|USB|Text|Presentation|WebGL|on)/.test(e);
                        });
                    }
                }
                else {
                    res = [];
                }
            }
            else {
                res = res.map(function (e) {
                    return (prefix || _this.input) + e.replace(/^this\.?/, "");
                });
            }
            if (res.length < 50) {
                res.sort();
                var hist = this.inputs.slice(0, -1);
                if (hist) {
                    hist = hist.filter(function (p) {
                        return p.indexOf(_this.input) == 0;
                    });
                    res = __chunk_1.uniq(hist.concat(res));
                }
                var index = res.indexOf(this.input);
                if (index != -1) {
                    res.splice(index, 1);
                }
                this.completionOptions = res;
            }
            else {
                this.completionOptions = [];
            }
        };
        JsConsole.prototype.handleHistoryClick = function (i) {
            this.input = this.inputs[i];
            this.historyIndex = 0;
            this.elements.textArea.focus();
        };
        JsConsole.prototype.handlePromptClick = function (event) {
            this.showHistory = !this.showHistory;
            event.preventDefault();
        };
        JsConsole.prototype.clear = function (event) {
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
        };
        JsConsole.prototype.hostData = function () {
            return {
                class: { fixed: this.fixed }
            };
        };
        JsConsole.prototype.render = function () {
            var _this = this;
            return this.display ? (h("form", { onSubmit: function (_) { return _this.handleSubmit(); }, action: "javascript:void(0);" }, h("div", { class: "url" }, h("a", { href: this.url }, "Github")), h("div", { class: "scroll-mask" }, h("div", { class: "scroll" }, h("div", { class: "output" }, h("object-gui", { obj: window["debug"], excludeProto: true })))), h("div", { class: "entries" }, this.outputs.map(function (entry) {
                if (entry.type == "object") {
                    return (h("div", { class: "scroll-mask" }, h("div", { class: "scroll" }, h("div", { class: "output" }, h("object-gui", { obj: entry.value })))));
                }
                else if (entry.type == "log") {
                    return (h("div", { class: "scroll-mask" }, h("div", { class: "scroll" }, h("pre", { class: "output log" }, entry.value.map(function (e) {
                        switch (typeof e) {
                            case "string":
                                return (h("span", { class: "string" }, "\"", e, "\""));
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
                    return (h("div", { class: "scroll-mask" }, h("div", { class: "scroll" }, h("pre", { class: "output " + entry.type }, "" + entry.value))));
                }
            })), h("div", { class: "bottom-wrapper" }, h("div", { class: "history" }, h("div", { class: { "popup": true, "open": this.showHistory } }, this.inputs.slice(0, -1).map(function (entry, i) {
                return (h("span", { onClick: function (_) { return _this.handleHistoryClick(i); } }, entry));
            }))), h("span", { class: { "prompt": true, "open": this.showHistory }, onTouchStart: function (e) { return _this.handlePromptClick(e); }, onMouseDown: function (e) { return _this.handlePromptClick(e); } }, ">"), h("input", { autoCapitalize: "off", autoCorrect: "off", autoComplete: "off", list: "completionOptions", id: "input-area", class: "input-area", spellCheck: false, value: this.input, onInput: function (event) { return _this.promptChange(event); }, onKeyDown: function (event) { return _this.handleKeyboard(event); } }), h("data-list", { data: this.completionOptions, name: "completionOptions" }), h("span", { class: "clear", onTouchStart: function (e) { return _this.clear(e); }, onMouseDown: function (e) { return _this.clear(e); } }, h("span", null, "\u2715"))), h("div", { class: "scroll-marker" }))) : "";
        };
        Object.defineProperty(JsConsole, "is", {
            get: function () { return "js-console"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsConsole, "encapsulation", {
            get: function () { return "shadow"; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsConsole, "properties", {
            get: function () {
                return {
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
                };
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JsConsole, "style", {
            get: function () { return ".fixed[data-js-console-host] {\n  width: unset;\n  left: -1px;\n  right: -1px;\n  bottom: -2px;\n  max-height: 30vh;\n  position: fixed; }\n  .fixed[data-js-console-host]   form[data-js-console], .fixed[data-js-console-host]   .entries[data-js-console] {\n    min-height: 100%; }\n\n[data-js-console-host] {\n  width: calc(100% - 2px);\n  max-height: calc(100% - 2px);\n  position: absolute;\n  font-family: Consolas, monospace;\n  font-size: 11px;\n  visibility: visible;\n  border: 1px solid lightgrey;\n  overflow-y: auto;\n  background-color: rgba(255, 255, 255, 0.85);\n  opacity: 0.8; }\n  \@media (max-width: 700px) {\n    [data-js-console-host] {\n      font-size: 100%; } }\n  [data-js-console-host]   .url[data-js-console] {\n    position: absolute;\n    right: 0;\n    top: 0; }\n  [data-js-console-host]   .scroll-mask[data-js-console] {\n    overflow: hidden;\n    width: 100%;\n    height: 100%; }\n  [data-js-console-host]   .scroll[data-js-console] {\n    width: 100%;\n    overflow-x: scroll;\n    overflow-y: hidden;\n    -webkit-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 100%;\n    margin-bottom: 0; }\n    \@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-ms-accelerator: true) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        -ms-overflow-style: -ms-autohiding-scrollbar; } }\n    \@supports (-moz-appearance: none) {\n      [data-js-console-host]   .scroll[data-js-console] {\n        height: calc(100% + 12px);\n        margin-bottom: -12px; } }\n    \@supports (-webkit-appearance: none) {\n      [data-js-console-host]   .scroll[data-js-console]::-webkit-scrollbar {\n        display: none; } }\n  [data-js-console-host]   pre[data-js-console] {\n    margin: 0;\n    display: inline-block;\n    font-family: Consolas, monospace; }\n  [data-js-console-host]   .entries[data-js-console] {\n    overflow: hidden; }\n  [data-js-console-host]   .output[data-js-console] {\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    border-bottom: 1px solid lightgrey;\n    min-width: calc(100% - 10px);\n    padding: 5px; }\n    [data-js-console-host]   .output.log[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.info[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.warn[data-js-console]    > span[data-js-console]:not(:last-child), [data-js-console-host]   .output.debug[data-js-console]    > span[data-js-console]:not(:last-child) {\n      float: left;\n      margin-right: 5px; }\n    [data-js-console-host]   .output.info[data-js-console] {\n      color: blue;\n      background-color: rgba(0, 0, 255, 0.08); }\n    [data-js-console-host]   .output.warn[data-js-console] {\n      color: orange;\n      background-color: rgba(255, 165, 0, 0.08); }\n    [data-js-console-host]   .output.debug[data-js-console] {\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n    [data-js-console-host]   .output.error[data-js-console] {\n      color: red;\n      background-color: rgba(255, 0, 0, 0.08); }\n    [data-js-console-host]   .output[data-js-console]   .string[data-js-console] {\n      color: #d73a49; }\n    [data-js-console-host]   .output[data-js-console]   .number[data-js-console], [data-js-console-host]   .output[data-js-console]   .boolean[data-js-console] {\n      color: blue; }\n  [data-js-console-host]   .bottom-wrapper[data-js-console] {\n    bottom: 0;\n    position: -webkit-sticky;\n    position: sticky;\n    background-color: white;\n    margin-top: -1px;\n    border-top: 1px solid lightgrey;\n    width: 100%; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .clear[data-js-console] {\n      font-size: 14px;\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      cursor: pointer;\n      display: inline-block;\n      background-color: lightgrey;\n      border-radius: 10px;\n      width: 16px;\n      height: 16px;\n      position: relative;\n      margin-top: 2px; }\n      \@media (min-width: 700px) {\n        [data-js-console-host]   .bottom-wrapper[data-js-console]   .clear[data-js-console] {\n          -webkit-transform: scale(0.9);\n          transform: scale(0.9); } }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .clear[data-js-console]   span[data-js-console] {\n        width: 16px;\n        height: 16px;\n        display: table-cell;\n        text-align: center;\n        vertical-align: middle;\n        -webkit-transform: translateY(-1px);\n        transform: translateY(-1px); }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console], [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console] {\n      font-size: 16px;\n      line-height: 16px;\n      height: 16px; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console] {\n      padding-left: 22px;\n      height: 0;\n      overflow: visible;\n      position: absolute; }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console] {\n        -webkit-transition: opacity 0.15s;\n        transition: opacity 0.15s;\n        position: absolute;\n        bottom: 0;\n        background-color: rgba(255, 255, 255, 0.9);\n        border-radius: 4px;\n        border: 1px solid rgba(84, 83, 76, 0.3);\n        font-size: 88%;\n        display: inline-block;\n        min-width: 120px;\n        min-height: 15px;\n        max-height: 50px;\n        overflow-y: auto;\n        opacity: 0; }\n        [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup.open[data-js-console] {\n          opacity: 1; }\n        [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console]   span[data-js-console] {\n          white-space: nowrap;\n          display: block;\n          position: relative;\n          bottom: 0;\n          -webkit-transition: background-color 0.3s, color 0.3s;\n          transition: background-color 0.3s, color 0.3s;\n          background-color: rgba(0, 0, 255, 0); }\n          [data-js-console-host]   .bottom-wrapper[data-js-console]   .history[data-js-console]   .popup[data-js-console]   span[data-js-console]:active {\n            -webkit-transition: background-color 0s, color 0s;\n            transition: background-color 0s, color 0s;\n            background-color: rgba(0, 0, 255, 0.5);\n            color: white; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console] {\n      border: none;\n      width: calc(100% - 24px - 20px);\n      resize: none;\n      padding: 2px;\n      -webkit-transform: translateY(-2px);\n      transform: translateY(-2px); }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .input-area[data-js-console]:focus {\n        outline: none !important; }\n    [data-js-console-host]   .bottom-wrapper[data-js-console]   .prompt[data-js-console] {\n      -webkit-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n      cursor: pointer;\n      -webkit-transition: all 0.15s;\n      transition: all 0.15s;\n      -webkit-transform: scaleX(0.5);\n      transform: scaleX(0.5);\n      float: left;\n      color: blue;\n      font-size: 19.2px;\n      margin: -1px 4px -1px 4px;\n      font-family: Consolas, monospace;\n      font-weight: 800; }\n      \@media (max-width: 700px) {\n        [data-js-console-host]   .bottom-wrapper[data-js-console]   .prompt[data-js-console] {\n          font-size: 23.04px; } }\n      [data-js-console-host]   .bottom-wrapper[data-js-console]   .prompt.open[data-js-console] {\n        -webkit-transform: scaleY(0.5) rotateZ(-90deg);\n        transform: scaleY(0.5) rotateZ(-90deg); }"; },
            enumerable: true,
            configurable: true
        });
        return JsConsole;
    }());
    exports.JsConsole = JsConsole;
    Object.defineProperty(exports, '__esModule', { value: true });
});
