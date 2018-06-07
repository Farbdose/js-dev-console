/*! Built with http://stenciljs.com */
JsDevConsole.loadBundle('chunk-1227a63c.js', ['exports'], function (exports) {
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
    // https://gist.github.com/nmsdvid/8807205
    function debounce(callback, time, interval) {
        if (time === void 0) { time = 250; }
        if (interval === void 0) { interval = null; }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(interval);
            interval = setTimeout(function () { return callback.apply(void 0, args); }, time);
        };
    }
    exports.props = props;
    exports.debounce = debounce;
    exports.uniq = uniq;
});
