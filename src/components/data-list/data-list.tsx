import { Component, Prop, State, Watch, Element } from '@stencil/core';

@Component({
	tag: 'data-list'
})
export class ObjectGui {

	@Element() el: HTMLElement;
	@Prop() data: Array<any> = [];
	@State() datatogo: Array<any> = [];
	@State() chunks: Array<any> = [];
	@Prop() name: string;
	chunkSize: number = 10;
	dataToGoTimeout: any;
	elements: {
		datalist: HTMLDataListElement
	};
	firstChunk: boolean = true;

	@Watch('data')
	watchHandler(newValue: string, oldValue: string) {
		if (newValue != oldValue) {
			this.handleDataChange(newValue);
		}
	}

	handleDataChange(newValue) {
		let toRemove = Array.from(this.elements.datalist.children);
		if(newValue && newValue.length > 0) {
			toRemove.shift();
		}
		toRemove.forEach((e) => {
			this.elements.datalist.removeChild(e);
		});
		this.firstChunk = true;
		this.datatogo = newValue.slice(0);
		this.handleDataToGoChange();
	}

	componentDidLoad() {
		this.elements = {
			datalist: this.el.querySelector("#"+this.name)
		};
		this.handleDataChange(this.data);
	}

	handleDataToGoChange() {
		if(this.dataToGoTimeout) {
			cancelAnimationFrame(this.dataToGoTimeout);
		}

		if(this.datatogo.length > 0) {
			let entries = this.datatogo.splice(0, this.chunkSize);
			let c = this.elements.datalist.firstElementChild;
			console.info(c);
			if(this.firstChunk && c) {
				for(let i=0; i<this.chunkSize; i++) {
					if(i<entries.length) {
						c.children[i].setAttribute("value", entries[i]);
					}else{
						c.children[i].removeAttribute("value");
					}
				}
			}else {
				let chunk = document.createElement("div");

				let str = "";
				for(let i=0; i<this.chunkSize; i++) {
					if(i<entries.length) {
						str += "<option value='" + entries[i] + "'></option>";
					}else{
						str += "<option></option>";
					}
				}
				chunk.innerHTML = str
				this.elements.datalist.appendChild(chunk);
			}

			this.dataToGoTimeout = requestAnimationFrame(()=>{
				this.handleDataToGoChange();
			});
		}

		this.firstChunk = false;
	}

	render() {
		return (
			<datalist id={this.name}></datalist>
		);
	}
}
