import { Component, Element, Method, Prop, State, Watch } from '@stencil/core';
import { props } from "../utils";

@Component({
	tag: 'object-gui',
	styleUrl: 'object-gui.scss'
})
export class ObjectGui {

	@Prop() parent: any;
	@Prop() excludeProto: any;
	@Prop() isLast: boolean = true;
	@Prop() index: number = undefined;
	@Prop() obj: any;
	@Prop() tick: boolean = true;
	@State() expanded: boolean = undefined;
	@State() value: any;
	@State() highlight: boolean = false;
	@State() inViewPort: boolean = true;
	@State() propCache: Array<string> = [];
	@State() ownPropertyLength: number = 0;
	@Element() el: HTMLElement;

	updateInterval: {
		value: number,
		base: number,
		min: number,
		max: number,
		factor: number
	};

	externalRender: boolean = false;
	timer: any;
	intervalTimer: any;
	childBase: any;
	key: string = undefined;
	static baseObjectProps: string = Object.getOwnPropertyNames(Object.prototype).join("");
	static baseArrayProps: string = Object.getOwnPropertyNames(Array.prototype).join("");

	constructor() {
		this.updateInterval = {
			value: 200,
			base: 200,
			min: 100,
			max: 1000 + Math.round(Math.random() * 100),
			factor: 1.1
		};
	}

	@Watch('tick')
	tickHandler() {
		this.update();
	}

	@Watch('obj')
	objHandler() {
		this.update();
	}

	@Watch('index')
	keyHandler() {
		this.update();
	}

	componentWillLoad() {
		this.update();
	}

	componentDidUnload() {
		if (this.intervalTimer) {
			clearTimeout(this.intervalTimer);
		}
	}

	static isObject(a: any) {
		return typeof a === "object" && a !== null;
	}

	static isNumber(a: any) {
		return ((!!a) && isFinite(a)) || a === Infinity;
	}

	static isString(a: any) {
		return typeof a === "string";
	}

	static isUndefined(a: any) {
		return typeof a === "undefined";
	}

	static isFunction(a: any) {
		return typeof a === "function";
	}

	static isNull(a: any) {
		return a === null;
	}

	static isNaN(a: number): boolean {
		return a !== a;
	}

	thisIsAGetter() {
		return !!Object.getOwnPropertyDescriptor(this.obj, this.key).get;
	}

	static isEqual(a: any, b: any) {
		// both are NaN
		if (a !== a && b !== b) {
			return true;
		}

		return a === b;
	}

	@Method()
	update() {
		if (this.intervalTimer) {
			clearTimeout(this.intervalTimer);
		}

		this.key = (this.index >= 0) ? (this.parent ? this.parent.getPropCache()[this.index] : props(this.obj, this.excludeProto)[this.index]) : undefined;
		//console.log("key", this.index, this.index>=0, Object.keys(this.obj), Object.keys(this.obj)[this.index], this.key);

		let value = this.obj;
		if (this.key) {
			try {
				value = this.obj[this.key];
			} catch (e) {
				//TODO add support for getters and setters
				value = undefined; //this.excludeProto[this.key];
			}
		} else {
			if (typeof this.expanded === "undefined") {
				this.expanded = true;
			}
		}

		let doUpdate = () => {
			this.childBase = [];
			this.propCache = [];
			if (ObjectGui.isObject(value)) {
				this.propCache = props(value, this.excludeProto);
				this.propCache.forEach((_, i) => {
					this.childBase.push(i);
				});
			}

			setTimeout(() => {
				let children = this.el.querySelectorAll("object-gui");
				for (let i = 0, len = children.length; i < len; i++) {
					children[i].update();
				}
			});

			this.updateInterval.value = this.updateInterval.base;
		};

		if (!ObjectGui.isEqual(this.value, value)) {
			this.externalRender = true;
			this.value = value;
			doUpdate();
		} else {
			let ownPropLen = ObjectGui.isObject(value) ? Object.getOwnPropertyNames(value).length : 0;
			if (ownPropLen != this.ownPropertyLength) {
				this.ownPropertyLength = ownPropLen;
				doUpdate();
			} else {

				this.updateInterval.value = Math.min(
					this.updateInterval.max,
					this.updateInterval.value * this.updateInterval.factor
				);
			}
		}

		this.inViewPort = this.objIsInViewport();

		if (this.tick) {
			this.intervalTimer = setTimeout(() => {
				this.update();
			}, this.updateInterval.value);
		}
	}

	objIsInViewport() {
		let rect = this.el.getBoundingClientRect();
		let pHeight = (window.innerHeight || document.documentElement.clientHeight);
		let marginFactor = 2;

		return (
			rect.top >= -rect.height - (pHeight * (marginFactor - 1)) &&
			rect.top <= rect.height + pHeight * marginFactor
		);
	}

	expandClick() {
		if (ObjectGui.isObject(this.value)) {
			this.expanded = !this.expanded;
		}
	}

	getType() {
		let val = this.value;
		let type = typeof val;

		if (ObjectGui.isFunction(val)) {
			return "f";
		} else if (Array.isArray(val)) {
			return "Array(" + val.length + ")";
		} else if (type === "object") {
			return this.value.constructor.name;
		} else {
			return type;
		}
	}

	startAnimation(callback) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				callback();
			});
		});
	}

	clearTimer(timer) {
		if (timer) {
			clearTimeout(timer);
		}
	}

	@Method()
	getPropCache(): Array<string> {
		return this.propCache;
	}

	render() {
		// TODO potential cause of trouble
		if (this.externalRender) {
			this.externalRender = false;
			this.clearTimer(this.timer);

			this.highlight = true;
			this.timer = setTimeout(() => {
				this.highlight = false;
			}, 300);

		}

		let val = this.value;
		let key = this.key;

		let isArray = Array.isArray(val);

		let type: string = typeof val;
		if (ObjectGui.isNull(val)) {
			type = "null";
		}
		if (val === Infinity) {
			type = "Infinity";
		}
		if (ObjectGui.isNaN(val)) {
			type = "NaN";
		}

		val = ObjectGui.isNull(val) ? "null" : val;
		val = ObjectGui.isUndefined(val) ? "undefined" : val;
		let isObj = ObjectGui.isObject(val) || ObjectGui.isFunction(val);
		let isFunction = ObjectGui.isFunction(val);
		let end: any = "";
		let wrappedChildren: any = "";
		let openingBraket = isArray ? "[" : "{";
		openingBraket = isFunction ? "(" : openingBraket;
		let closingBraket = isArray ? "]" : "}";
		closingBraket = isFunction ? ")" : closingBraket;

		let rightValue = (
			<span class={{'clickable': isObj && !isFunction}} onClick={() => this.expandClick()}>
				<span class={{
					"highlighted": this.highlight,
					"top": isObj && this.expanded,
					"highlight": true,
					func: isFunction
				}}>
				{isObj ? (<span class="type">{this.getType()}</span>) : (
					<span class={type}>{type === "string" && !isFunction ? '"' + val + '"' : val + ""}</span>)}
					{isObj ? " " : ""}
					{isFunction ? this.value.name : ""}
					{isObj ? openingBraket : ""}
					{isObj && !this.expanded ? (<span class="expand">...</span>) : ""}
					{isObj && !this.expanded ? closingBraket : ""}
				</span>
				{(this.expanded || this.isLast) ? "" : ","}
			</span>
		);

		if (isObj) {
			if (this.expanded) {
				let children = this.childBase.map((_, i) => {
					return (
						<object-gui
							parent={this}
							obj={val}
							index={i}
							isLast={i + 1 == this.childBase.length}
							tick={this.inViewPort}>
						</object-gui>
					);
				});

				wrappedChildren = (
					<div class={{'children': true, "highlighted": this.highlight, "highlight": true}}>{children}</div>);
				end = (<span><span class={{
					"end": true,
					"highlighted": this.highlight,
					"highlight": true
				}}>{closingBraket}</span>{this.isLast ? "" : ","}</span>);
			}
		}

		let leftValue = (
			<span class={{"no-select": Array.isArray(this.obj)}}>
				{key ? (<span class="key">{key}</span>) : ""}
				{key ? ": " : ""}
			</span>
		);

		return (
			<div class={{"no-select": isFunction}}>
				{leftValue}{rightValue}
				{wrappedChildren}
				{end}
			</div>
		);
	}
}
