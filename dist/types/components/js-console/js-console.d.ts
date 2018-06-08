import '../../stencil.core';
import "datalist-polyfill";
export declare class JsConsole {
    url: string;
    first: string;
    last: string;
    pattern: string;
    private patternListeners;
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
    fixed: boolean;
    display: boolean;
    elements: {
        textArea: HTMLInputElement;
        scrollMarker: HTMLDivElement;
        history: HTMLDivElement;
    };
    inputBase: string;
    counter: number;
    log: Function;
    horizontal: boolean;
    completionOptions: Array<any>;
    proxy(method: any, name: any, handler: any): any;
    constructor();
    watchHandler(newValue: string, oldValue: string): void;
    handleOnPatternChange(newValue: string): void;
    updateOrientation(): boolean;
    componentDidLoad(): void;
    handleConsoleEvent(method: any, args: any): void;
    getInputEntry(): string;
    setInputEntry(val: any): void;
    getOutputEntry(): {
        command: string;
        value: any;
        type: string;
    };
    clearCompletionOptions(): void;
    handleKeyboard(event: Event): void;
    handleSubmit(): void;
    promptChange(_: Event): void;
    updateAutoCompleteOptions(): void;
    updateAutoCompleteOptionsUtil(): void;
    handleHistoryClick(i: any): void;
    handlePromptClick(event: TouchEvent | MouseEvent): void;
    clear(event?: Event): void;
    hostData(): {
        class: {
            fixed: boolean;
        };
    };
    render(): JSX.Element;
}
