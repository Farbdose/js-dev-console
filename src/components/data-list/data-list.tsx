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

	@Watch('data')
	watchHandler(newValue: string, oldValue: string) {
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
			datalist: this.el.querySelector("#"+this.name)
		};
		this.handleDataChange(this.data);
	}

	handleDataToGoChange() {
		if(this.dataToGoTimeout) {
			cancelAnimationFrame(this.dataToGoTimeout);
		}

		if(this.datatogo.length > 0) {
			let chunk = document.createElement("div");
			chunk.innerHTML = this.datatogo.splice(0, this.chunkSize).map((e) => {
				return "<option value='"+e+"'></option>";
			}).join("\n");
			this.elements.datalist.appendChild(chunk);

			this.dataToGoTimeout = requestAnimationFrame(()=>{
				this.handleDataToGoChange();
			});
		}
	}

	render() {
		return (
			<datalist id={this.name}></datalist>
		);
	}
}
