export class ObjectGui {
    constructor() {
        this.data = [];
        this.datatogo = [];
        this.chunks = [];
        this.chunkSize = 50;
        this.firstChunk = true;
    }
    watchHandler(newValue, oldValue) {
        if (newValue != oldValue) {
            this.handleDataChange(newValue);
        }
    }
    handleDataChange(newValue) {
        let toRemove = Array.from(this.elements.datalist.children);
        toRemove.shift();
        toRemove.forEach((e) => {
            this.elements.datalist.removeChild(e);
        });
        this.firstChunk = true;
        this.datatogo = newValue.slice(0);
        this.handleDataToGoChange();
    }
    componentDidLoad() {
        this.elements = {
            datalist: this.el.querySelector("#" + this.name)
        };
        this.handleDataChange(this.data);
    }
    handleDataToGoChange() {
        if (this.dataToGoTimeout) {
            cancelAnimationFrame(this.dataToGoTimeout);
        }
        if (this.datatogo.length > 0) {
            let entries = this.datatogo.splice(0, this.chunkSize);
            let c = this.elements.datalist.firstElementChild;
            console.info(c);
            if (this.firstChunk && c) {
                for (let i = 0; i < this.chunkSize; i++) {
                    if (i < entries.length) {
                        c.children[i].setAttribute("value", entries[i]);
                    }
                    else {
                        c.children[i].setAttribute("value", null);
                    }
                }
            }
            else {
                let chunk = document.createElement("div");
                let str = "";
                for (let i = 0; i < this.chunkSize; i++) {
                    if (i < entries.length) {
                        str += "<option value='" + entries[i] + "'></option>";
                    }
                    else {
                        str += "<option value=null></option>";
                    }
                }
                chunk.innerHTML = str;
                this.elements.datalist.appendChild(chunk);
            }
            this.dataToGoTimeout = requestAnimationFrame(() => {
                this.handleDataToGoChange();
            });
        }
        this.firstChunk = false;
    }
    render() {
        return (h("datalist", { id: this.name }));
    }
    static get is() { return "data-list"; }
    static get properties() { return {
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
    }; }
}
