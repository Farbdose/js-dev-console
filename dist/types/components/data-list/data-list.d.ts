import '../../stencil.core';
export declare class ObjectGui {
    el: HTMLElement;
    data: Array<any>;
    datatogo: Array<any>;
    chunks: Array<any>;
    name: string;
    chunkSize: number;
    dataToGoTimeout: any;
    elements: {
        datalist: HTMLDataListElement;
    };
    watchHandler(newValue: string, oldValue: string): void;
    handleDataChange(newValue: any): void;
    componentDidLoad(): void;
    handleDataToGoChange(): void;
    render(): JSX.Element;
}
