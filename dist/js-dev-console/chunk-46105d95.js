/*! Built with http://stenciljs.com */
const { h } = window.JsDevConsole;

//https://stackoverflow.com/a/30158566/2422125
function props(obj, excludeProto) {
    let o = obj;
    let res = Object.getOwnPropertyNames(o);
    for (; o != null && o !== Object; o = Object.getPrototypeOf(o)) {
        let op = Object.getOwnPropertyNames(o);
        for (let i = 0; i < op.length; i++) {
            if (res.indexOf(op[i]) == -1 &&
                Object.getOwnPropertyDescriptor(o, op[i]).get) {
                res.push(op[i]);
            }
        }
    }
    let index = res.indexOf("__proto__");
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
    let prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];
    return a.filter((item) => {
        let type = typeof item;
        if (type in prims) {
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        }
        else {
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
        }
    });
}
// https://gist.github.com/nmsdvid/8807205
function debounce(callback, time = 250, interval = null) {
    return (...args) => {
        clearTimeout(interval);
        interval = setTimeout(() => callback(...args), time);
    };
}

export { props as a, debounce as b, uniq as c };
