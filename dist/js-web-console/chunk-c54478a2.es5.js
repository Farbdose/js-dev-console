/*! Built with http://stenciljs.com */
JsWebConsole.loadBundle('chunk-c54478a2.js', ['exports'], function (exports) {
    var h = window.JsWebConsole.h;
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
    exports.props = props;
});
