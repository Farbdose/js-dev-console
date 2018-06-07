/*! Built with http://stenciljs.com */
JsDevConsole.loadBundle('chunk-51311e9d.js', ['exports'], function (exports) {
    var h = window.JsDevConsole.h;
    //https://stackoverflow.com/a/30158566/2422125
    function props(obj, excludeProto) {
        var o = obj;
        var res = Object.getOwnPropertyNames(o);
        for (; o != null && o !== Object; o = Object.getPrototypeOf(o)) {
            var op = Object.getOwnPropertyNames(o);
            for (var i = 0; i < op.length; i++) {
                if (res.indexOf(op[i]) == -1 &&
                    Object.getOwnPropertyDescriptor(o, op[i]).get) {
                    res.push(op[i]);
                }
            }
        }
        var index = res.indexOf("__proto__");
        if (index > -1) {
            //let propStr = Object.getOwnPropertyNames(obj["__proto__"]).join("");
            if (excludeProto || Array.isArray(obj) || obj.__proto__.constructor.name === "Object") {
                res.splice(index, 1);
            }
        }
        return res;
    }
    //https://stackoverflow.com/a/9229821/2422125
    function uniq(a) {
        var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];
        return a.filter(function (item) {
            var type = typeof item;
            if (type in prims) {
                return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            }
            else {
                return objs.indexOf(item) >= 0 ? false : objs.push(item);
            }
        });
    }
    // https://gist.github.com/anaibol/b511550e0d6faed05bf777a50ed37e59
    function debounce(func, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout;
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate)
                    func.apply(_this, args);
            }, wait);
            if (immediate && !timeout)
                func.apply(this, args.slice());
        };
    }
    exports.props = props;
    exports.debounce = debounce;
    exports.uniq = uniq;
});
