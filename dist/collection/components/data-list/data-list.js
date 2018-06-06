export class ObjectGui {
    constructor() {
        this.data = [];
        this.datatogo = [];
        this.chunks = [];
        this.chunkSize = 10;
    }
    watchHandler(newValue, oldValue) {
        if (newValue != oldValue) {
            this.handleDataChange(newValue);
        }
    }
    handleDataChange(newValue) {
        this.elements.datalist.innerHTML = "";
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
            let chunk = document.createElement("div");
            chunk.innerHTML = this.datatogo.splice(0, this.chunkSize).map((e) => {
                return "<option value='" + e + "'></option>";
            }).join("\n");
            this.elements.datalist.appendChild(chunk);
            this.dataToGoTimeout = requestAnimationFrame(() => {
                this.handleDataToGoChange();
            });
        }
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
