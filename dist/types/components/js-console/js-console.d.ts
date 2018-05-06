import '../../stencil.core';
export declare class JsConsole {
    url: string;
    first: string;
    last: string;
    showHistory: boolean;
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
    autoCompleteOptions: Array<string>;
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
    handleKeyboard(event: Event): void;
    handleSubmit(): void;
    promptChange(_: Event): void;
    updateAutoCompleteOptions(): void;
    handleHistoryClick(i: any): void;
    handlePromptClick(event: TouchEvent | MouseEvent): void;
    clear(event?: Event): void;
    render(): JSX.Element;
}
