/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface JsConsole {
      'first': string;
      'last': string;
    }
  }

  interface HTMLJsConsoleElement extends StencilComponents.JsConsole, HTMLStencilElement {}

  var HTMLJsConsoleElement: {
    prototype: HTMLJsConsoleElement;
    new (): HTMLJsConsoleElement;
  };
  interface HTMLElementTagNameMap {
    'js-console': HTMLJsConsoleElement;
  }
  interface ElementTagNameMap {
    'js-console': HTMLJsConsoleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'js-console': JSXElements.JsConsoleAttributes;
    }
  }
  namespace JSXElements {
    export interface JsConsoleAttributes extends HTMLAttributes {
      'first'?: string;
      'last'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface ObjectGui {
      'excludeProto': any;
      'getPropCache': () => string[];
      'index': number;
      'isLast': boolean;
      'obj': any;
      'parent': any;
      'tick': boolean;
    }
  }

  interface HTMLObjectGuiElement extends StencilComponents.ObjectGui, HTMLStencilElement {}

  var HTMLObjectGuiElement: {
    prototype: HTMLObjectGuiElement;
    new (): HTMLObjectGuiElement;
  };
  interface HTMLElementTagNameMap {
    'object-gui': HTMLObjectGuiElement;
  }
  interface ElementTagNameMap {
    'object-gui': HTMLObjectGuiElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'object-gui': JSXElements.ObjectGuiAttributes;
    }
  }
  namespace JSXElements {
    export interface ObjectGuiAttributes extends HTMLAttributes {
      'excludeProto'?: any;
      'index'?: number;
      'isLast'?: boolean;
      'obj'?: any;
      'parent'?: any;
      'tick'?: boolean;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
