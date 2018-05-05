import '../../stencil.core';
export declare class JsConsole {
    url: string;
    first: string;
    last: string;
    test: any;
    el: HTMLElement;
    inputs: Array<string>;
    outputs: Array<{
        command: string;
        value: any;
        type: string;
    }>;
    historyIndex: number;
    input: any;
    rows: number;
    elements: {
        textArea: HTMLInputElement;
        scrollMarker: HTMLDivElement;
        history: HTMLDivElement;
    };
    inputBase: string;
    counter: number;
    log: any;
    proxy(context: any, method: any, name: any, handler: any): () => void;
    constructor();
    componentDidLoad(): void;
    handleConsoleEvent(args: any): void;
    getInputEntry(): string;
    setInputEntry(val: any): void;
    getOutputEntry(): {
        command: string;
        value: any;
        type: string;
    };
    handleInputChange(event: any): void;
    getAutoCompleteOptions(command: string): any[];
    handleHistoryClick(i: any): void;
    render(): JSX.Element;
}
