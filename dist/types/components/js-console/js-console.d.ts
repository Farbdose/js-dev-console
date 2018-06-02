import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
export declare class JsConsole {
    url: string;
    first: string;
    last: string;
    openOnPattern: string;
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
    autoCompleteOptions: Array<string>;
    fixed: boolean;
    display: boolean;
    elements: {
        textArea: HTMLInputElement;
        scrollMarker: HTMLDivElement;
        history: HTMLDivElement;
    };
    inputBase: string;
    counter: number;
    log: any;
    horizontal: boolean;
    proxy(context: any, method: any, name: any, handler: any): () => void;
    constructor();
    watchHandler(newValue: string, oldValue: string): void;
    handleOnPatternChange(newValue: string): void;
    updateOrientation(): boolean;
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
    hostData(): {
        class: {
            fixed: boolean;
        };
        style: {
            display: string;
        };
    };
    render(): JSX.Element;
}
