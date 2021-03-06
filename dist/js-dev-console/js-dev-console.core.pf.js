/*!
 template
 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){var e="undefined"===typeof HTMLTemplateElement;/Trident/.test(navigator.userAgent)&&function(){var a=Document.prototype.importNode;Document.prototype.importNode=function(){var c=a.apply(this,arguments);if(c.nodeType===Node.DOCUMENT_FRAGMENT_NODE){var f=this.createDocumentFragment();f.appendChild(c);return f}return c}}();var g=Node.prototype.cloneNode,t=Document.prototype.createElement,u=Document.prototype.importNode,l=function(){if(!e){var a=document.createElement("template"),c=document.createElement("template");
c.content.appendChild(document.createElement("div"));a.content.appendChild(c);a=a.cloneNode(!0);return 0===a.content.childNodes.length||0===a.content.firstChild.content.childNodes.length||!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment)}}(),b=function(){};if(e){var d=document.implementation.createHTMLDocument("template"),m=!0,n=document.createElement("style");n.textContent="template{display:none;}";var p=document.head;p.insertBefore(n,p.firstElementChild);b.prototype=Object.create(HTMLElement.prototype);
var v=!document.createElement("div").hasOwnProperty("innerHTML");b.decorate=function(a){if(!a.content){a.content=d.createDocumentFragment();for(var c;c=a.firstChild;)a.content.appendChild(c);if(v)a.__proto__=b.prototype;else if(a.cloneNode=function(a){return b._cloneNode(this,a)},m)try{q(a),r(a)}catch(f){m=!1}b.bootstrap(a.content)}};var q=function(a){Object.defineProperty(a,"innerHTML",{get:function(){for(var a="",b=this.content.firstChild;b;b=b.nextSibling)a+=b.outerHTML||b.data.replace(w,x);return a},
set:function(a){d.body.innerHTML=a;for(b.bootstrap(d);this.content.firstChild;)this.content.removeChild(this.content.firstChild);for(;d.body.firstChild;)this.content.appendChild(d.body.firstChild)},configurable:!0})},r=function(a){Object.defineProperty(a,"outerHTML",{get:function(){return"<template>"+this.innerHTML+"</template>"},set:function(a){if(this.parentNode){d.body.innerHTML=a;for(a=document.createDocumentFragment();d.body.firstChild;)a.appendChild(d.body.firstChild);this.parentNode.replaceChild(a,
this)}else throw Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");},configurable:!0})};q(b.prototype);r(b.prototype);b.bootstrap=function(a){a=a.querySelectorAll("template");for(var c=0,f=a.length,d;c<f&&(d=a[c]);c++)b.decorate(d)};document.addEventListener("DOMContentLoaded",function(){b.bootstrap(document)});Document.prototype.createElement=function(){var a=t.apply(this,arguments);"template"===a.localName&&b.decorate(a);return a};var w=/[&\u00A0<>]/g,
x=function(a){switch(a){case "&":return"&amp;";case "<":return"&lt;";case ">":return"&gt;";case "\u00a0":return"&nbsp;"}}}if(e||l)b._cloneNode=function(a,b){var c=g.call(a,!1);this.decorate&&this.decorate(c);b&&(c.content.appendChild(g.call(a.content,!0)),this.fixClonedDom(c.content,a.content));return c},b.prototype.cloneNode=function(a){return b._cloneNode(this,a)},b.fixClonedDom=function(a,b){if(b.querySelectorAll)for(var c=b.querySelectorAll("template"),d=a.querySelectorAll("template"),e=0,g=d.length,
h,k;e<g;e++)k=c[e],h=d[e],this.decorate&&this.decorate(k),h.parentNode.replaceChild(k.cloneNode(!0),h)},Node.prototype.cloneNode=function(a){if(this instanceof DocumentFragment)if(a)var c=this.ownerDocument.importNode(this,!0);else return this.ownerDocument.createDocumentFragment();else c=g.call(this,a);a&&b.fixClonedDom(c,this);return c},Document.prototype.importNode=function(a,c){if("template"===a.localName)return b._cloneNode(a,c);var d=u.call(this,a,c);c&&b.fixClonedDom(d,a);return d},l&&(window.HTMLTemplateElement.prototype.cloneNode=
function(a){return b._cloneNode(this,a)});e&&(window.HTMLTemplateElement=b)})();
/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);
/*!
Array.prototype.find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
*/
Array.prototype.find||Object.defineProperty(Array.prototype,"find",{writable:!0,configurable:!0,value:function(c,e){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),f=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<f;){var d=b[a];if(c.call(e,d,a,b))return d;a++}}});
/*!
Array.prototype.includes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
*/
Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{writable:!0,configurable:!0,value:function(r,e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if(0===n)return!1;var i,o,a=0|e,u=Math.max(0<=a?a:n-Math.abs(a),0);for(;u<n;){if((i=t[u])===(o=r)||"number"==typeof i&&"number"==typeof o&&isNaN(i)&&isNaN(o))return!0;u++}return!1}});
/*! object-assign */
"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(d,f){if(null==d)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(d),b=1;b<arguments.length;b++){var a=arguments[b];if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e},writable:!0,configurable:!0});
/*!
String.prototype.startsWith
*/
String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{writable:!0,configurable:!0,value:function(b,a){return this.substr(!a||0>a?0:+a,b.length)===b}});
/*!
String.prototype.endsWith
*/
String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{writable:!0,configurable:!0,value:function(b,a){if(void 0===a||a>this.length)a=this.length;return this.substring(a-b.length,a)===b}});
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */
(function(z,A){z.ES6Promise=A()})(this,function(){function z(){return function(){return process.nextTick(l)}}function A(){return"undefined"!==typeof B?function(){B(l)}:C()}function R(){var a=0,b=new J(l),c=document.createTextNode("");b.observe(c,{characterData:!0});return function(){c.data=a=++a%2}}function S(){var a=new MessageChannel;a.port1.onmessage=l;return function(){return a.port2.postMessage(0)}}function C(){var a=setTimeout;return function(){return a(l,1)}}function l(){for(var a=0;a<p;a+=
  2)(0,q[a])(q[a+1]),q[a]=void 0,q[a+1]=void 0;p=0}function T(){try{var a=Function("return this")().require("vertx");B=a.runOnLoop||a.runOnContext;return A()}catch(b){return C()}}function D(a,b){var c=this,e=new this.constructor(r);void 0===e[x]&&K(e);var d=c._state;if(d){var f=arguments[d-1];k(function(){return L(d,e,f,c._result)})}else E(c,e,a,b);return e}function F(a){if(a&&"object"===typeof a&&a.constructor===this)return a;var b=new this(r);v(b,a);return b}function r(){}function M(a){try{return a.then}catch(b){return n.error=
  b,n}}function U(a,b,c,e){try{a.call(b,c,e)}catch(d){return d}}function V(a,b,c){k(function(a){var d=!1,e=U(c,b,function(c){d||(d=!0,b!==c?v(a,c):m(a,c))},function(b){d||(d=!0,h(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,h(a,e))},a)}function W(a,b){b._state===w?m(a,b._result):b._state===t?h(a,b._result):E(b,void 0,function(b){return v(a,b)},function(b){return h(a,b)})}function N(a,b,c){b.constructor===a.constructor&&c===D&&b.constructor.resolve===F?W(a,b):c===n?(h(a,n.error),n.error=
  null):void 0===c?m(a,b):"function"===typeof c?V(a,b,c):m(a,b)}function v(a,b){if(a===b)h(a,new TypeError("You cannot resolve a promise with itself"));else{var c=typeof b;null===b||"object"!==c&&"function"!==c?m(a,b):N(a,b,M(b))}}function X(a){a._onerror&&a._onerror(a._result);G(a)}function m(a,b){a._state===u&&(a._result=b,a._state=w,0!==a._subscribers.length&&k(G,a))}function h(a,b){a._state===u&&(a._state=t,a._result=b,k(X,a))}function E(a,b,c,e){var d=a._subscribers,f=d.length;a._onerror=null;
  d[f]=b;d[f+w]=c;d[f+t]=e;0===f&&a._state&&k(G,a)}function G(a){var b=a._subscribers,c=a._state;if(0!==b.length){for(var e,d,f=a._result,g=0;g<b.length;g+=3)e=b[g],d=b[g+c],e?L(c,e,d,f):d(f);a._subscribers.length=0}}function L(a,b,c,e){var d="function"===typeof c,f=void 0,g=void 0,k=void 0,l=void 0;if(d){try{f=c(e)}catch(Y){n.error=Y,f=n}f===n?(l=!0,g=f.error,f.error=null):k=!0;if(b===f){h(b,new TypeError("A promises callback cannot return that same promise."));return}}else f=e,k=!0;b._state===u&&
  (d&&k?v(b,f):l?h(b,g):a===w?m(b,f):a===t&&h(b,f))}function Z(a,b){try{b(function(b){v(a,b)},function(b){h(a,b)})}catch(c){h(a,c)}}function K(a){a[x]=O++;a._state=void 0;a._result=void 0;a._subscribers=[]}var H=void 0,P=H=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},p=0,B=void 0,I=void 0,k=function(a,b){q[p]=a;q[p+1]=b;p+=2;2===p&&(I?I(l):Q())},y=(H="undefined"!==typeof window?window:void 0)||{},J=y.MutationObserver||y.WebKitMutationObserver;y=
  "undefined"===typeof self&&"undefined"!==typeof process&&"[object process]"==={}.toString.call(process);var aa="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel,q=Array(1E3),Q=void 0;Q=y?z():J?R():aa?S():void 0===H&&"function"===typeof require?T():C();var x=Math.random().toString(36).substring(2),u=void 0,w=1,t=2,n={error:null},O=0,ba=function(){function a(a,c){this._instanceConstructor=a;this.promise=new a(r);this.promise[x]||K(this.promise);
  P(c)?(this._remaining=this.length=c.length,this._result=Array(this.length),0===this.length?m(this.promise,this._result):(this.length=this.length||0,this._enumerate(c),0===this._remaining&&m(this.promise,this._result))):h(this.promise,Error("Array Methods must be provided an Array"))}a.prototype._enumerate=function(a){for(var b=0;this._state===u&&b<a.length;b++)this._eachEntry(a[b],b)};a.prototype._eachEntry=function(a,c){var b=this._instanceConstructor,d=b.resolve;d===F?(d=M(a),d===D&&a._state!==
  u?this._settledAt(a._state,c,a._result):"function"!==typeof d?(this._remaining--,this._result[c]=a):b===g?(b=new b(r),N(b,a,d),this._willSettleAt(b,c)):this._willSettleAt(new b(function(b){return b(a)}),c)):this._willSettleAt(d(a),c)};a.prototype._settledAt=function(a,c,e){var b=this.promise;b._state===u&&(this._remaining--,a===t?h(b,e):this._result[c]=e);0===this._remaining&&m(b,this._result)};a.prototype._willSettleAt=function(a,c){var b=this;E(a,void 0,function(a){return b._settledAt(w,c,a)},function(a){return b._settledAt(t,
  c,a)})};return a}(),g=function(){function a(b){this[x]=O++;this._result=this._state=void 0;this._subscribers=[];if(r!==b){if("function"!==typeof b)throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(this instanceof a)Z(this,b);else throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");}}a.prototype["catch"]=function(a){return this.then(null,a)};a.prototype["finally"]=
  function(a){var b=this.constructor;return this.then(function(c){return b.resolve(a()).then(function(){return c})},function(c){return b.resolve(a()).then(function(){throw c;})})};return a}();g.prototype.then=D;g.all=function(a){return(new ba(this,a)).promise};g.race=function(a){var b=this;return P(a)?new b(function(c,e){for(var d=a.length,f=0;f<d;f++)b.resolve(a[f]).then(c,e)}):new b(function(a,b){return b(new TypeError("You must pass an array to race."))})};g.resolve=F;g.reject=function(a){var b=
  new this(r);h(b,a);return b};g._setScheduler=function(a){I=a};g._setAsap=function(a){k=a};g._asap=k;g.polyfill=function(){var a=void 0;if("undefined"!==typeof global)a=global;else if("undefined"!==typeof self)a=self;else try{a=Function("return this")()}catch(e){throw Error("polyfill failed because global object is unavailable in this environment");}var b=a.Promise;if(b){var c=null;try{c=Object.prototype.toString.call(b.resolve())}catch(e){}if("[object Promise]"===c&&!b.cast)return}a.Promise=g};g.Promise=
  g;g.polyfill();return g});
/*! whatwg-fetch, 2.0.3
https://github.com/github/fetch
Copyright (c) 2014-2016 GitHub, Inc. - MIT License */
(function(e){function l(a){"string"!==typeof a&&(a=String(a));if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function q(a){"string"!==typeof a&&(a=String(a));return a}function n(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};g.iterable&&(b[Symbol.iterator]=function(){return b});return b}function d(a){this.map={};a instanceof d?a.forEach(function(a,c){this.append(c,a)},this):Array.isArray(a)?
a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function p(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function r(a){return new Promise(function(b,c){a.onload=function(){b(a.result)};a.onerror=function(){c(a.error)}})}function w(a){var b=new FileReader,c=r(b);b.readAsArrayBuffer(a);return c}function x(a){a=new Uint8Array(a);for(var b=Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(a[c]);
return b.join("")}function t(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);b.set(new Uint8Array(a));return b.buffer}function u(){this.bodyUsed=!1;this._initBody=function(a){if(this._bodyInit=a)if("string"===typeof a)this._bodyText=a;else if(g.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(g.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(g.arrayBuffer&&
g.blob&&y(a))this._bodyArrayBuffer=t(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(g.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||z(a)))this._bodyArrayBuffer=t(a);else throw Error("unsupported BodyInit type");else this._bodyText="";this.headers.get("content-type")||("string"===typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&
this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))};g.blob&&(this.blob=function(){var a=p(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):
this.blob().then(w)});this.text=function(){var a=p(this);if(a)return a;if(this._bodyBlob){a=this._bodyBlob;var b=new FileReader,c=r(b);b.readAsText(a);return c}if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");return Promise.resolve(this._bodyText)};g.formData&&(this.formData=function(){return this.text().then(A)});this.json=function(){return this.text().then(JSON.parse)};return this}function k(a,b){b=
b||{};var c=b.body;if(a instanceof k){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url;this.credentials=a.credentials;b.headers||(this.headers=new d(a.headers));this.method=a.method;this.mode=a.mode;c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=String(a);this.credentials=b.credentials||this.credentials||"omit";if(b.headers||!this.headers)this.headers=new d(b.headers);var v=b.method||this.method||"GET",g=v.toUpperCase();this.method=-1<B.indexOf(g)?g:v;this.mode=
b.mode||this.mode||null;this.referrer=null;if(("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}function A(a){var b=new FormData;a.trim().split("&").forEach(function(a){if(a){var c=a.split("=");a=c.shift().replace(/\+/g," ");c=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(a),decodeURIComponent(c))}});return b}function C(a){var b=new d;a.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(a){var c=
a.split(":");if(a=c.shift().trim())c=c.join(":").trim(),b.append(a,c)});return b}function h(a,b){b||(b={});this.type="default";this.status=void 0===b.status?200:b.status;this.ok=200<=this.status&&300>this.status;this.statusText="statusText"in b?b.statusText:"OK";this.headers=new d(b.headers);this.url=b.url||"";this._initBody(a)}if(!e.fetch){var D="Symbol"in e&&"iterator"in Symbol,m;if(m="FileReader"in e&&"Blob"in e)try{new Blob,m=!0}catch(a){m=!1}var g={searchParams:"URLSearchParams"in e,iterable:D,
blob:m,formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(g.arrayBuffer){var E="[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]".split(";");var y=function(a){return a&&DataView.prototype.isPrototypeOf(a)};var z=ArrayBuffer.isView||function(a){return a&&-1<E.indexOf(Object.prototype.toString.call(a))}}d.prototype.append=function(a,b){a=l(a);b=q(b);var c=
this.map[a];this.map[a]=c?c+","+b:b};d.prototype["delete"]=function(a){delete this.map[l(a)]};d.prototype.get=function(a){a=l(a);return this.has(a)?this.map[a]:null};d.prototype.has=function(a){return this.map.hasOwnProperty(l(a))};d.prototype.set=function(a,b){this.map[l(a)]=q(b)};d.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)};d.prototype.keys=function(){var a=[];this.forEach(function(b,c){a.push(c)});return n(a)};d.prototype.values=
function(){var a=[];this.forEach(function(b){a.push(b)});return n(a)};d.prototype.entries=function(){var a=[];this.forEach(function(b,c){a.push([c,b])});return n(a)};g.iterable&&(d.prototype[Symbol.iterator]=d.prototype.entries);var B="DELETE GET HEAD OPTIONS POST PUT".split(" ");k.prototype.clone=function(){return new k(this,{body:this._bodyInit})};u.call(k.prototype);u.call(h.prototype);h.prototype.clone=function(){return new h(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),
url:this.url})};h.error=function(){var a=new h(null,{status:0,statusText:""});a.type="error";return a};var F=[301,302,303,307,308];h.redirect=function(a,b){if(-1===F.indexOf(b))throw new RangeError("Invalid status code");return new h(null,{status:b,headers:{location:a}})};e.Headers=d;e.Request=k;e.Response=h;e.fetch=function(a,b){return new Promise(function(c,d){var e=new k(a,b),f=new XMLHttpRequest;f.onload=function(){var a={status:f.status,statusText:f.statusText,headers:C(f.getAllResponseHeaders()||
"")};a.url="responseURL"in f?f.responseURL:a.headers.get("X-Request-URL");c(new h("response"in f?f.response:f.responseText,a))};f.onerror=function(){d(new TypeError("Network request failed"))};f.ontimeout=function(){d(new TypeError("Network request failed"))};f.open(e.method,e.url,!0);"include"===e.credentials?f.withCredentials=!0:"omit"===e.credentials&&(f.withCredentials=!1);"responseType"in f&&g.blob&&(f.responseType="blob");e.headers.forEach(function(a,b){f.setRequestHeader(b,a)});f.send("undefined"===
typeof e._bodyInit?null:e._bodyInit)})};e.fetch.polyfill=!0}})("undefined"!==typeof self?self:this);
/*!
requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
MIT license
*/
(function(a){for(var f=0,c=["ms","moz","webkit","o"],b=0;b<c.length&&!a.requestAnimationFrame;++b)a.requestAnimationFrame=a[c[b]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[b]+"CancelAnimationFrame"]||a[c[b]+"CancelRequestAnimationFrame"];a.requestAnimationFrame||(a.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-f)),g=a.setTimeout(function(){b(d+e)},e);f=d+e;return g});a.cancelAnimationFrame||(a.cancelAnimationFrame=function(a){clearTimeout(a)})})(window);
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);
/*! window.performance.now
http://opensource.org/licenses/MIT
Copyright Paul Irish 2015 */
!function(){if("performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var n=Date.now();performance.timing&&performance.timing.navigationStart&&(n=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-n}}}();
/*!
 * Element.remove()
 * https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
 */
(function(b){b.forEach(function(a){a.hasOwnProperty("remove")||Object.defineProperty(a,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){null!==this.parentNode&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);
/*!
Object.entries
*/
Object.entries||(Object.entries=function(c){for(var b=Object.keys(c),a=b.length,d=Array(a);a--;)d[a]=[b[a],c[b[a]]];return d});
/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='js-dev-console']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
this && this.__extends || function() {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b) {
      b.hasOwnProperty(p) && (d[p] = b[p]);
    }
  };
}();

(function(window, document, Context, namespace) {
  'use strict';
  /**
     * SSR Attribute Names
     */
  var SSR_VNODE_ID = 'data-ssrv';
  var SSR_CHILD_ID = 'data-ssrc';
  /**
     * Default style mode id
     */  var DEFAULT_STYLE_MODE = '$';
  /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  /**
     * Key Name to Key Code Map
     */  var KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };
  function initStyleTemplate(domApi, cmpMeta, cmpConstructor) {
    var style = cmpConstructor.style;
    if (style) {
      // we got a style mode for this component, let's create an id for this style
      var styleModeId = cmpConstructor.is + (cmpConstructor.styleMode || DEFAULT_STYLE_MODE);
      if (!cmpMeta[styleModeId]) {
        true;
        // ie11's template polyfill doesn't fully do the trick and there's still issues
        // so instead of trying to clone templates with styles in them, we'll just
        // keep a map of the style text as a string to create <style> elements for es5 builds
        cmpMeta[styleModeId] = style;
      }
    }
  }
  function attachStyles(plt, domApi, cmpMeta, modeName, elm, customStyle, styleElm) {
    // first see if we've got a style for a specific mode
    var styleModeId = cmpMeta.tagNameMeta + (modeName || DEFAULT_STYLE_MODE);
    var styleTemplate = cmpMeta[styleModeId];
    if (!styleTemplate) {
      // didn't find a style for this mode
      // now let's check if there's a default style for this component
      styleModeId = cmpMeta.tagNameMeta + DEFAULT_STYLE_MODE;
      styleTemplate = cmpMeta[styleModeId];
    }
    if (styleTemplate) {
      // cool, we found a style template element for this component
      var styleContainerNode = domApi.$head;
      // if this browser supports shadow dom, then let's climb up
      // the dom and see if we're within a shadow dom
            if (domApi.$supportsShadowDom) {
        if (1 /* ShadowDom */ === cmpMeta.encapsulation) {
          // we already know we're in a shadow dom
          // so shadow root is the container for these styles
          styleContainerNode = elm.shadowRoot;
        } else {
          // climb up the dom and see if we're in a shadow dom
          while (elm = domApi.$parentNode(elm)) {
            if (elm.host && elm.host.shadowRoot) {
              // looks like we are in shadow dom, let's use
              // this shadow root as the container for these styles
              styleContainerNode = elm.host.shadowRoot;
              break;
            }
          }
        }
      }
      // if this container element already has these styles
      // then there's no need to apply them again
      // create an object to keep track if we'ready applied this component style
            var appliedStyles = plt.componentAppliedStyles.get(styleContainerNode) || {};
      if (!appliedStyles[styleModeId]) {
        true;
        // es5 builds are not usig <template> because of ie11 issues
        // instead the "template" is just the style text as a string
        // create a new style element and add as innerHTML
        styleElm = domApi.$createElement('style');
        styleElm.innerHTML = styleTemplate;
        (true, customStyle) && !customStyle.supportsCssVars && customStyle.addStyle(styleElm);
        // let's make sure we put the styles below the <style data-styles> element
        // so any visibility css overrides the default
        var dataStyles = styleContainerNode.querySelectorAll('[data-styles]');
        domApi.$insertBefore(styleContainerNode, styleElm, dataStyles.length && dataStyles[dataStyles.length - 1].nextSibling || styleContainerNode.firstChild);
        // remember we don't need to do this again for this element
                appliedStyles[styleModeId] = true;
        plt.componentAppliedStyles.set(styleContainerNode, appliedStyles);
      }
    }
  }
  var isDef = function(v) {
    return null != v;
  };
  var toLowerCase = function(str) {
    return str.toLowerCase();
  };
  var noop = function() {};
  function createDomApi(App, win, doc) {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    if (!App.ael) {
      App.ael = function(elm, eventName, cb, opts) {
        return elm.addEventListener(eventName, cb, opts);
      };
      App.rel = function(elm, eventName, cb, opts) {
        return elm.removeEventListener(eventName, cb, opts);
      };
    }
    var unregisterListenerFns = new WeakMap();
    var domApi = {
      $documentElement: doc.documentElement,
      $head: doc.head,
      $body: doc.body,
      $supportsEventOptions: false,
      $nodeType: function(node) {
        return node.nodeType;
      },
      $createElement: function(tagName) {
        return doc.createElement(tagName);
      },
      $createElementNS: function(namespace, tagName) {
        return doc.createElementNS(namespace, tagName);
      },
      $createTextNode: function(text) {
        return doc.createTextNode(text);
      },
      $createComment: function(data) {
        return doc.createComment(data);
      },
      $insertBefore: function(parentNode, childNode, referenceNode) {
        return parentNode.insertBefore(childNode, referenceNode);
      },
      // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
      // and it's polyfilled in es5 builds
      $remove: function(node) {
        return node.remove();
      },
      $appendChild: function(parentNode, childNode) {
        return parentNode.appendChild(childNode);
      },
      $childNodes: function(node) {
        return node.childNodes;
      },
      $parentNode: function(node) {
        return node.parentNode;
      },
      $nextSibling: function(node) {
        return node.nextSibling;
      },
      $previousSibling: function(node) {
        return node.previousSibling;
      },
      $tagName: function(elm) {
        return toLowerCase(elm.nodeName);
      },
      $getTextContent: function(node) {
        return node.textContent;
      },
      $setTextContent: function(node, text) {
        return node.textContent = text;
      },
      $getAttribute: function(elm, key) {
        return elm.getAttribute(key);
      },
      $setAttribute: function(elm, key, val) {
        return elm.setAttribute(key, val);
      },
      $setAttributeNS: function(elm, namespaceURI, qualifiedName, val) {
        return elm.setAttributeNS(namespaceURI, qualifiedName, val);
      },
      $removeAttribute: function(elm, key) {
        return elm.removeAttribute(key);
      },
      $elementRef: function(elm, referenceName) {
        if ('child' === referenceName) {
          return elm.firstElementChild;
        }
        if ('parent' === referenceName) {
          return domApi.$parentElement(elm);
        }
        if ('body' === referenceName) {
          return domApi.$body;
        }
        if ('document' === referenceName) {
          return doc;
        }
        if ('window' === referenceName) {
          return win;
        }
        return elm;
      },
      $addEventListener: function(assignerElm, eventName, listenerCallback, useCapture, usePassive, attachTo, eventListenerOpts, splt) {
        // remember the original name before we possibly change it
        var assignersEventName = eventName;
        var attachToElm = assignerElm;
        // get the existing unregister listeners for
        // this element from the unregister listeners weakmap
                var assignersUnregListeners = unregisterListenerFns.get(assignerElm);
        assignersUnregListeners && assignersUnregListeners[assignersEventName] && 
        // removed any existing listeners for this event for the assigner element
        // this element already has this listener, so let's unregister it now
        assignersUnregListeners[assignersEventName]();
        if ('string' === typeof attachTo) {
          // attachTo is a string, and is probably something like
          // "parent", "window", or "document"
          // and the eventName would be like "mouseover" or "mousemove"
          attachToElm = domApi.$elementRef(assignerElm, attachTo);
        } else if ('object' === typeof attachTo) {
          // we were passed in an actual element to attach to
          attachToElm = attachTo;
        } else {
          // depending on the event name, we could actually be attaching
          // this element to something like the document or window
          splt = eventName.split(':');
          if (splt.length > 1) {
            // document:mousemove
            // parent:touchend
            // body:keyup.enter
            attachToElm = domApi.$elementRef(assignerElm, splt[0]);
            eventName = splt[1];
          }
        }
        if (!attachToElm) {
          // somehow we're referencing an element that doesn't exist
          // let's not continue
          return;
        }
        var eventListener = listenerCallback;
        // test to see if we're looking for an exact keycode
                splt = eventName.split('.');
        if (splt.length > 1) {
          // looks like this listener is also looking for a keycode
          // keyup.enter
          eventName = splt[0];
          eventListener = function(ev) {
            // wrap the user's event listener with our own check to test
            // if this keyboard event has the keycode they're looking for
            ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
          };
        }
        // create the actual event listener options to use
        // this browser may not support event options
                eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture;
        // ok, good to go, let's add the actual listener to the dom element
                App.ael(attachToElm, eventName, eventListener, eventListenerOpts);
        assignersUnregListeners || 
        // we don't already have a collection, let's create it
        unregisterListenerFns.set(assignerElm, assignersUnregListeners = {});
        // add the unregister listener to this element's collection
                assignersUnregListeners[assignersEventName] = function() {
          // looks like it's time to say goodbye
          attachToElm && App.rel(attachToElm, eventName, eventListener, eventListenerOpts);
          assignersUnregListeners[assignersEventName] = null;
        };
      },
      $removeEventListener: function(elm, eventName) {
        // get the unregister listener functions for this element
        var assignersUnregListeners = unregisterListenerFns.get(elm);
        assignersUnregListeners && (
        // this element has unregister listeners
        eventName ? 
        // passed in one specific event name to remove
        assignersUnregListeners[eventName] && assignersUnregListeners[eventName]() : 
        // remove all event listeners
        Object.keys(assignersUnregListeners).forEach(function(assignersEventName) {
          assignersUnregListeners[assignersEventName] && assignersUnregListeners[assignersEventName]();
        }));
      }
    };
    true;
    domApi.$attachShadow = function(elm, shadowRootInit) {
      return elm.attachShadow(shadowRootInit);
    };
    domApi.$supportsShadowDom = !!domApi.$documentElement.attachShadow;
    true;
    win.location.search.indexOf('shadow=false') > 0 && (
    // by adding ?shadow=false it'll force the slot polyfill
    // only add this check when in dev mode
    domApi.$supportsShadowDom = false);
    true;
    if ('function' !== typeof win.CustomEvent) {
      // CustomEvent polyfill
      win.CustomEvent = function(event, data, evt) {
        evt = doc.createEvent('CustomEvent');
        evt.initCustomEvent(event, data.bubbles, data.cancelable, data.detail);
        return evt;
      };
      win.CustomEvent.prototype = win.Event.prototype;
    }
    domApi.$dispatchEvent = function(elm, eventName, data) {
      return elm && elm.dispatchEvent(new win.CustomEvent(eventName, data));
    };
    false, false;
    domApi.$parentElement = function(elm, parentNode) {
      // if the parent node is a document fragment (shadow root)
      // then use the "host" property on it
      // otherwise use the parent node
      return (parentNode = domApi.$parentNode(elm)) && 11 /* DocumentFragment */ === domApi.$nodeType(parentNode) ? parentNode.host : parentNode;
    };
    return domApi;
  }
  function parseComponentLoader(cmpRegistryData, cmpRegistry, i, d) {
    // tag name will always be lower case
    var cmpMeta = {
      tagNameMeta: cmpRegistryData[0],
      membersMeta: {
        // every component defaults to always have
        // the mode and color properties
        // but only color should observe any attribute changes
        'color': {
          attribName: 'color'
        }
      }
    };
    // map of the bundle ids
    // can contain modes, and array of esm and es5 bundle ids
        cmpMeta.bundleIds = cmpRegistryData[1];
    // parse member meta
    // this data only includes props that are attributes that need to be observed
    // it does not include all of the props yet
        var memberData = cmpRegistryData[3];
    if (memberData) {
      for (i = 0; i < memberData.length; i++) {
        d = memberData[i];
        cmpMeta.membersMeta[d[0]] = {
          memberType: d[1],
          reflectToAttr: !!d[2],
          attribName: 'string' === typeof d[3] ? d[3] : d[3] ? d[0] : 0,
          propType: d[4]
        };
      }
    }
    // encapsulation
        cmpMeta.encapsulation = cmpRegistryData[4];
    cmpRegistryData[5] && (
    // parse listener meta
    cmpMeta.listenersMeta = cmpRegistryData[5].map(parseListenerData));
    return cmpRegistry[cmpMeta.tagNameMeta] = cmpMeta;
  }
  function parseListenerData(listenerData) {
    return {
      eventName: listenerData[0],
      eventMethodName: listenerData[1],
      eventDisabled: !!listenerData[2],
      eventPassive: !!listenerData[3],
      eventCapture: !!listenerData[4]
    };
  }
  function parsePropertyValue(propType, propValue) {
    // ensure this value is of the correct prop type
    // we're testing both formats of the "propType" value because
    // we could have either gotten the data from the attribute changed callback,
    // which wouldn't have Constructor data yet, and because this method is reused
    // within proxy where we don't have meta data, but only constructor data
    if (isDef(propValue) && 'object' !== typeof propValue) {
      if (propType === Boolean || 3 /* Boolean */ === propType) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return 'false' !== propValue && ('' === propValue || !!propValue);
      }
      if (propType === Number || 4 /* Number */ === propType) {
        // force it to be a number
        return parseFloat(propValue);
      }
      if (propType === String || 2 /* String */ === propType) {
        // could have been passed as a number or boolean
        // but we still want it as a string
        return propValue.toString();
      }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
        return propValue;
  }
  function proxyComponentInstance(plt, cmpConstructor, elm, instance, hostSnapshot, properties, memberName) {
    // at this point we've got a specific node of a host element, and created a component class instance
    // and we've already created getters/setters on both the host element and component class prototypes
    // let's upgrade any data that might have been set on the host element already
    // and let's have the getters/setters kick in and do their jobs
    // let's automatically add a reference to the host element on the instance
    plt.hostElementMap.set(instance, elm);
    // create the values object if it doesn't already exist
    // this will hold all of the internal getter/setter values
        plt.valuesMap.has(elm) || plt.valuesMap.set(elm, {});
    // get the properties from the constructor
    // and add default "mode" and "color" properties
        properties = Object.assign({
      color: {
        type: String
      }
    }, cmpConstructor.properties);
    // always set mode
        properties.mode = {
      type: String
    };
    // define each of the members and initialize what their role is
        for (memberName in properties) {
      defineMember(plt, properties[memberName], elm, instance, memberName, hostSnapshot);
    }
  }
  function initComponentInstance(plt, elm, hostSnapshot, instance, componentConstructor, queuedEvents, i) {
    try {
      // using the user's component class, let's create a new instance
      componentConstructor = plt.getComponentMeta(elm).componentConstructor;
      instance = new componentConstructor();
      // ok cool, we've got an host element now, and a actual instance
      // and there were no errors creating the instance
      // let's upgrade the data on the host element
      // and let the getters/setters do their jobs
            proxyComponentInstance(plt, componentConstructor, elm, instance, hostSnapshot);
      false;
      false;
    } catch (e) {
      // something done went wrong trying to create a component instance
      // create a dumby instance so other stuff can load
      // but chances are the app isn't fully working cuz this component has issues
      instance = {};
      plt.onError(e, 7 /* InitInstanceError */ , elm, true);
    }
    plt.instanceMap.set(elm, instance);
    return instance;
  }
  function initComponentLoaded(plt, elm, hydratedCssClass, instance, onReadyCallbacks) {
    if (true, !allChildrenHaveConnected(plt, elm)) {
      // this check needs to be done when using the customElements polyfill
      // since the polyfill uses MutationObserver which causes the
      // connectedCallbacks to fire async, which isn't ideal for the code below
      return;
    }
    // all is good, this component has been told it's time to finish loading
    // it's possible that we've already decided to destroy this element
    // check if this element has any actively loading child elements
        if (!plt.hasLoadedMap.has(elm) && (instance = plt.instanceMap.get(elm)) && !plt.isDisconnectedMap.has(elm) && (!elm['s-ld'] || !elm['s-ld'].length)) {
      // cool, so at this point this element isn't already being destroyed
      // and it does not have any child elements that are still loading
      // ensure we remove any child references cuz it doesn't matter at this point
      delete elm['s-ld'];
      // sweet, this particular element is good to go
      // all of this element's children have loaded (if any)
      // elm._hasLoaded = true;
            plt.hasLoadedMap.set(elm, true);
      try {
        // fire off the ref if it exists
        callNodeRefs(plt.vnodeMap.get(elm));
        // fire off the user's elm.componentOnReady() callbacks that were
        // put directly on the element (well before anything was ready)
                if (onReadyCallbacks = plt.onReadyCallbacksMap.get(elm)) {
          onReadyCallbacks.forEach(function(cb) {
            return cb(elm);
          });
          plt.onReadyCallbacksMap.delete(elm);
        }
        true;
        // fire off the user's componentDidLoad method (if one was provided)
        // componentDidLoad only runs ONCE, after the instance's element has been
        // assigned as the host element, and AFTER render() has been called
        // we'll also fire this method off on the element, just to
        instance.componentDidLoad && instance.componentDidLoad();
      } catch (e) {
        plt.onError(e, 4 /* DidLoadError */ , elm);
      }
      // add the css class that this element has officially hydrated
            elm.classList.add(hydratedCssClass);
      // ( •_•)
      // ( •_•)>⌐■-■
      // (⌐■_■)
      // load events fire from bottom to top
      // the deepest elements load first then bubbles up
            propagateComponentLoaded(plt, elm);
    }
  }
  function allChildrenHaveConnected(plt, elm) {
    // Note: in IE11 <svg> does not have the "children" property
    for (var i = 0; i < elm.childNodes.length; i++) {
      if (1 /* ElementNode */ === elm.childNodes[i].nodeType) {
        if (plt.getComponentMeta(elm.childNodes[i]) && !plt.hasConnectedMap.has(elm.childNodes[i])) {
          // this is a defined componnent
          // but it hasn't connected yet
          return false;
        }
        if (!allChildrenHaveConnected(plt, elm.childNodes[i])) {
          // one of the defined child components hasn't connected yet
          return false;
        }
      }
    }
    // everything has connected, we're good
        return true;
  }
  function propagateComponentLoaded(plt, elm, index, ancestorsActivelyLoadingChildren) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    var ancestorHostElement = plt.ancestorHostElementMap.get(elm);
    if (ancestorHostElement) {
      // ok so this element already has a known ancestor host element
      // let's make sure we remove this element from its ancestor's
      // known list of child elements which are actively loading
      ancestorsActivelyLoadingChildren = ancestorHostElement['s-ld'] || ancestorHostElement.$activeLoading;
      if (ancestorsActivelyLoadingChildren) {
        index = ancestorsActivelyLoadingChildren.indexOf(elm);
        index > -1 && 
        // yup, this element is in the list of child elements to wait on
        // remove it so we can work to get the length down to 0
        ancestorsActivelyLoadingChildren.splice(index, 1);
        // the ancestor's initLoad method will do the actual checks
        // to see if the ancestor is actually loaded or not
        // then let's call the ancestor's initLoad method if there's no length
        // (which actually ends up as this method again but for the ancestor)
                if (!ancestorsActivelyLoadingChildren.length) {
          ancestorHostElement['s-init'] && ancestorHostElement['s-init']();
          // $initLoad deprecated 2018-04-02
                    ancestorHostElement.$initLoad && ancestorHostElement.$initLoad();
        }
      }
      plt.ancestorHostElementMap.delete(elm);
    }
  }
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */  var stack = [];
  function h(nodeName, vnodeData, child) {
    var children = null;
    var lastSimple = false;
    var simple = false;
    for (var i = arguments.length; i-- > 2; ) {
      stack.push(arguments[i]);
    }
    while (stack.length > 0) {
      if ((child = stack.pop()) && void 0 !== child.pop) {
        for (i = child.length; i--; ) {
          stack.push(child[i]);
        }
      } else {
        'boolean' === typeof child && (child = null);
        (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false));
        simple && lastSimple ? children[children.length - 1].vtext += child : null === children ? children = [ simple ? {
          vtext: child
        } : child ] : children.push(simple ? {
          vtext: child
        } : child);
        lastSimple = simple;
      }
    }
    var vkey;
    var vname;
    if (null != vnodeData) {
      // normalize class / classname attributes
      vnodeData.className && (vnodeData.class = vnodeData.className);
      if ('object' === typeof vnodeData.class) {
        for (i in vnodeData.class) {
          vnodeData.class[i] && stack.push(i);
        }
        vnodeData.class = stack.join(' ');
        stack.length = 0;
      }
      null != vnodeData.key && (vkey = vnodeData.key);
      null != vnodeData.name && (vname = vnodeData.name);
    }
    if ('function' === typeof nodeName) {
      // nodeName is a functional component
      return nodeName(Object.assign({}, vnodeData, {
        children: children
      }));
    }
    return {
      vtag: nodeName,
      vchildren: children,
      vtext: void 0,
      vattrs: vnodeData,
      vkey: vkey,
      vname: vname,
      elm: void 0,
      ishost: false
    };
  }
  function render(plt, cmpMeta, elm, instance, isUpdateRender) {
    try {
      // if this component has a render function, let's fire
      // it off and generate the child vnodes for this host element
      // note that we do not create the host element cuz it already exists
      var hostMeta = cmpMeta.componentConstructor.host;
      var reflectHostAttr = void 0;
      false;
      if (instance.render || instance.hostData || hostMeta || reflectHostAttr) {
        // tell the platform we're actively rendering
        // if a value is changed within a render() then
        // this tells the platform not to queue the change
        plt.activeRender = true;
        var vnodeChildren = instance.render && instance.render();
        var vnodeHostData = void 0;
        true;
        // user component provided a "hostData()" method
        // the returned data/attributes are used on the host element
        vnodeHostData = instance.hostData && instance.hostData();
        false;
        // tell the platform we're done rendering
        // now any changes will again queue
        plt.activeRender = false;
        false;
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // if we haven't already created a vnode, then we give the renderer the actual element
        // if this is a re-render, then give the renderer the last vnode we already created
        var oldVNode = plt.vnodeMap.get(elm) || {};
        oldVNode.elm = elm;
        var hostVNode = h(null, vnodeHostData, vnodeChildren);
        false;
        // each patch always gets a new vnode
        // the host element itself isn't patched because it already exists
        // kick off the actual render and any DOM updates
        plt.vnodeMap.set(elm, plt.render(oldVNode, hostVNode, isUpdateRender, cmpMeta.componentConstructor.encapsulation));
      }
      true;
      // attach the styles this component needs, if any
      // this fn figures out if the styles should go in a
      // shadow root or if they should be global
      plt.attachStyles(plt, plt.domApi, cmpMeta, instance.mode, elm);
      // it's official, this element has rendered
      elm['s-rn'] = true;
      elm.$onRender && (
      // $onRender deprecated 2018-04-02
      elm['s-rc'] = elm.$onRender);
      if (elm['s-rc']) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        elm['s-rc'].forEach(function(cb) {
          return cb();
        });
        elm['s-rc'] = null;
      }
    } catch (e) {
      plt.activeRender = false;
      plt.onError(e, 8 /* RenderError */ , elm, true);
    }
  }
  function queueUpdate(plt, elm) {
    // only run patch if it isn't queued already
    if (!plt.isQueuedForUpdate.has(elm)) {
      plt.isQueuedForUpdate.set(elm, true);
      // run the patch in the next tick
      // vdom diff and patch the host element for differences
            plt.isAppLoaded ? 
      // app has already loaded
      // let's queue this work in the dom write phase
      plt.queue.write(function() {
        return update(plt, elm);
      }) : 
      // app hasn't finished loading yet
      // so let's use next tick to do everything
      // as fast as possible
      plt.queue.tick(function() {
        return update(plt, elm);
      });
    }
  }
  function update(plt, elm, isInitialLoad, instance, ancestorHostElement, userPromise) {
    // no longer queued for update
    plt.isQueuedForUpdate.delete(elm);
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
        if (!plt.isDisconnectedMap.has(elm)) {
      instance = plt.instanceMap.get(elm);
      isInitialLoad = !instance;
      if (isInitialLoad) {
        ancestorHostElement = plt.ancestorHostElementMap.get(elm);
        ancestorHostElement && ancestorHostElement.$rendered && (
        // $rendered deprecated 2018-04-02
        ancestorHostElement['s-rn'] = true);
        if (ancestorHostElement && !ancestorHostElement['s-rn']) {
          // this is the intial load
          // this element has an ancestor host element
          // but the ancestor host element has NOT rendered yet
          // so let's just cool our jets and wait for the ancestor to render
          (ancestorHostElement['s-rc'] = ancestorHostElement['s-rc'] || []).push(function() {
            // this will get fired off when the ancestor host element
            // finally gets around to rendering its lazy self
            update(plt, elm);
          });
          // $onRender deprecated 2018-04-02
                    ancestorHostElement.$onRender = ancestorHostElement['s-rc'];
          return;
        }
        // haven't created a component instance for this host element yet!
        // create the instance from the user's component class
        // https://www.youtube.com/watch?v=olLxrojmvMg
                instance = initComponentInstance(plt, elm, plt.hostSnapshotMap.get(elm));
        true;
        // fire off the user's componentWillLoad method (if one was provided)
        // componentWillLoad only runs ONCE, after instance's element has been
        // assigned as the host element, but BEFORE render() has been called
        try {
          instance.componentWillLoad && (userPromise = instance.componentWillLoad());
        } catch (e) {
          plt.onError(e, 3 /* WillLoadError */ , elm);
        }
      } else {
        false;
      }
      userPromise && userPromise.then ? 
      // looks like the user return a promise!
      // let's not actually kick off the render
      // until the user has resolved their promise
      userPromise.then(function() {
        return renderUpdate(plt, elm, instance, isInitialLoad);
      }) : 
      // user never returned a promise so there's
      // no need to wait on anything, let's do the render now my friend
      renderUpdate(plt, elm, instance, isInitialLoad);
    }
  }
  function renderUpdate(plt, elm, instance, isInitialLoad) {
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    render(plt, plt.getComponentMeta(elm), elm, instance, !isInitialLoad);
    try {
      if (isInitialLoad) {
        // so this was the initial load i guess
        elm['s-init']();
        // componentDidLoad just fired off
            } else {
        false;
        callNodeRefs(plt.vnodeMap.get(elm));
      }
    } catch (e) {
      // derp
      plt.onError(e, 6 /* DidUpdateError */ , elm, true);
    }
  }
  function defineMember(plt, property, elm, instance, memberName, hostSnapshot, hostAttributes, hostAttrValue) {
    function getComponentProp(values) {
      // component instance prop/state getter
      // get the property value directly from our internal values
      values = plt.valuesMap.get(plt.hostElementMap.get(this));
      return values && values[memberName];
    }
    function setComponentProp(newValue, elm) {
      // component instance prop/state setter (cannot be arrow fn)
      elm = plt.hostElementMap.get(this);
      if (elm) {
        if (property.state || property.mutable) {
          setValue(plt, elm, memberName, newValue);
        } else {
          true;
          console.warn('@Prop() "' + memberName + '" on "' + elm.tagName + '" cannot be modified.');
        }
      }
    }
    if (property.type || property.state) {
      var values = plt.valuesMap.get(elm);
      if (!property.state) {
        !property.attr || void 0 !== values[memberName] && '' !== values[memberName] || 
        // check the prop value from the host element attribute
        (hostAttributes = hostSnapshot && hostSnapshot.$attributes) && isDef(hostAttrValue = hostAttributes[property.attr]) && (
        // looks like we've got an attribute value
        // let's set it to our internal values
        values[memberName] = parsePropertyValue(property.type, hostAttrValue));
        true;
        // client-side
        // within the browser, the element's prototype
        // already has its getter/setter set, but on the
        // server the prototype is shared causing issues
        // so instead the server's elm has the getter/setter
        // directly on the actual element instance, not its prototype
        // so on the browser we can use "hasOwnProperty"
        if (elm.hasOwnProperty(memberName)) {
          // @Prop or @Prop({mutable:true})
          // property values on the host element should override
          // any default values on the component instance
          void 0 === values[memberName] && (values[memberName] = elm[memberName]);
          // for the client only, let's delete its "own" property
          // this way our already assigned getter/setter on the prototype kicks in
                    delete elm[memberName];
        }
      }
      instance.hasOwnProperty(memberName) && void 0 === values[memberName] && (
      // @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      values[memberName] = instance[memberName]);
      property.watchCallbacks && (values[WATCH_CB_PREFIX + memberName] = property.watchCallbacks.slice());
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
            definePropertyGetterSetter(instance, memberName, getComponentProp, setComponentProp);
    } else if (true, property.elementRef) {
      // @Element()
      // add a getter to the element reference using
      // the member name the component meta provided
      definePropertyValue(instance, memberName, elm);
    } else if (true, property.method) {
      // @Method()
      // add a property "value" on the host element
      // which we'll bind to the instance's method
      definePropertyValue(elm, memberName, instance[memberName].bind(instance));
    } else {
      false;
      false;
    }
  }
  function setValue(plt, elm, memberName, newVal, values, instance, watchMethods) {
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    values = plt.valuesMap.get(elm);
    values || plt.valuesMap.set(elm, values = {});
    var oldVal = values[memberName];
    // check our new property value against our internal value
        if (newVal !== oldVal) {
      // gadzooks! the property's value has changed!!
      // set our new value!
      // https://youtu.be/dFtLONl4cNc?t=22
      values[memberName] = newVal;
      instance = plt.instanceMap.get(elm);
      if (instance) {
        // get an array of method names of watch functions to call
        watchMethods = values[WATCH_CB_PREFIX + memberName];
        if (true, watchMethods) {
          // this instance is watching for when this property changed
          for (var i = 0; i < watchMethods.length; i++) {
            try {
              // fire off each of the watch methods that are watching this property
              instance[watchMethods[i]].call(instance, newVal, oldVal, memberName);
            } catch (e) {
              console.error(e);
            }
          }
        }
        !plt.activeRender && elm['s-rn'] && 
        // looks like this value actually changed, so we've got work to do!
        // but only if we've already rendered, otherwise just chill out
        // queue that we need to do an update, but don't worry about queuing
        // up millions cuz this function ensures it only runs once
        queueUpdate(plt, elm);
      }
    }
  }
  function definePropertyValue(obj, propertyKey, value) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'value': value
    });
  }
  function definePropertyGetterSetter(obj, propertyKey, get, set) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'get': get,
      'set': set
    });
  }
  var WATCH_CB_PREFIX = 'wc-';
  function updateAttribute(elm, memberName, newValue) {
    var isXlinkNs = memberName !== (memberName = memberName.replace(/^xlink\:?/, ''));
    var isBooleanAttr = BOOLEAN_ATTRS[memberName];
    if (!isBooleanAttr || newValue && 'false' !== newValue) {
      if ('function' !== typeof newValue) {
        isBooleanAttr && (newValue = '');
        isXlinkNs ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(memberName), newValue) : elm.setAttribute(memberName, newValue);
      }
    } else {
      isXlinkNs ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(memberName)) : elm.removeAttribute(memberName);
    }
  }
  var BOOLEAN_ATTRS = {
    'allowfullscreen': 1,
    'async': 1,
    'autofocus': 1,
    'autoplay': 1,
    'checked': 1,
    'controls': 1,
    'disabled': 1,
    'enabled': 1,
    'formnovalidate': 1,
    'hidden': 1,
    'multiple': 1,
    'noresize': 1,
    'readonly': 1,
    'required': 1,
    'selected': 1,
    'spellcheck': 1
  };
  var XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
  function setAccessor(plt, elm, memberName, oldValue, newValue, isSvg, isHostElement, i, ilen) {
    if ('class' !== memberName || isSvg) {
      if ('style' === memberName) {
        // Style
        oldValue = oldValue || EMPTY_OBJ;
        newValue = newValue || EMPTY_OBJ;
        for (i in oldValue) {
          newValue[i] || (elm.style[i] = '');
        }
        for (i in newValue) {
          newValue[i] !== oldValue[i] && (elm.style[i] = newValue[i]);
        }
      } else if ('o' !== memberName[0] || 'n' !== memberName[1] || !/[A-Z]/.test(memberName[2]) || memberName in elm) {
        if ('list' !== memberName && 'type' !== memberName && !isSvg && (memberName in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue) || false) {
          // Properties
          // - list and type are attributes that get applied as values on the element
          // - all svgs get values as attributes not props
          // - check if elm contains name or if the value is array, object, or function
          var cmpMeta = plt.getComponentMeta(elm);
          if (cmpMeta && cmpMeta.membersMeta && cmpMeta.membersMeta[memberName]) {
            // we know for a fact that this element is a known component
            // and this component has this member name as a property,
            // let's set the known @Prop on this element
            // set it directly as property on the element
            setProperty(elm, memberName, newValue);
            false;
          } else if ('ref' !== memberName) {
            // this member name is a property on this element, but it's not a component
            // this is a native property like "value" or something
            // also we can ignore the "ref" member name at this point
            setProperty(elm, memberName, null == newValue ? '' : newValue);
            null != newValue && false !== newValue || elm.removeAttribute(memberName);
          }
        } else {
          null != newValue ? 
          // Element Attributes
          updateAttribute(elm, memberName, newValue) : !isSvg || null != newValue && false !== newValue || 
          // remove svg attribute
          elm.removeAttribute(memberName);
        }
      } else {
        // Event Handlers
        // so if the member name starts with "on" and the 3rd characters is
        // a capital letter, and it's not already a member on the element,
        // then we're assuming it's an event listener
        // standard event
        // the JSX attribute could have been "onMouseOver" and the
        // member name "onmouseover" is on the element's prototype
        // so let's add the listener "mouseover", which is all lowercased
        memberName = toLowerCase(memberName) in elm ? toLowerCase(memberName.substring(2)) : toLowerCase(memberName[2]) + memberName.substring(3);
        newValue ? newValue !== oldValue && 
        // add listener
        plt.domApi.$addEventListener(elm, memberName, newValue) : 
        // remove listener
        plt.domApi.$removeEventListener(elm, memberName);
      }
    } else 
    // Class
    if (oldValue !== newValue) {
      var oldList_1 = null == oldValue || '' === oldValue ? EMPTY_ARR : oldValue.trim().split(/\s+/);
      var newList = null == newValue || '' === newValue ? EMPTY_ARR : newValue.trim().split(/\s+/);
      var classList = null == elm.className || '' === elm.className ? EMPTY_ARR : elm.className.trim().split(/\s+/);
      for (i = 0, ilen = oldList_1.length; i < ilen; i++) {
        -1 === newList.indexOf(oldList_1[i]) && (classList = classList.filter(function(c) {
          return c !== oldList_1[i];
        }));
      }
      for (i = 0, ilen = newList.length; i < ilen; i++) {
        -1 === oldList_1.indexOf(newList[i]) && (classList = classList.concat([ newList[i] ]));
      }
      elm.className = classList.join(' ');
    }
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */  function setProperty(elm, name, value) {
    try {
      elm[name] = value;
    } catch (e) {}
  }
  function updateElement(plt, oldVnode, newVnode, isSvgMode, memberName) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    var elm = 11 /* DocumentFragment */ === newVnode.elm.nodeType && newVnode.elm.host ? newVnode.elm.host : newVnode.elm;
    var oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
    var newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
    // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
      newVnodeAttrs && null != newVnodeAttrs[memberName] || null == oldVnodeAttrs[memberName] || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode, newVnode.ishost);
    }
    // add new & update changed attributes
        for (memberName in newVnodeAttrs) {
      memberName in oldVnodeAttrs && newVnodeAttrs[memberName] === ('value' === memberName || 'checked' === memberName ? elm[memberName] : oldVnodeAttrs[memberName]) || setAccessor(plt, elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.ishost);
    }
  }
  var isSvgMode = false;
  function createRendererPatch(plt, domApi) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(oldParentVNode, newParentVNode, childIndex, parentElm, i, elm, childNode, newVNode, oldVNode) {
      newVNode = newParentVNode.vchildren[childIndex];
      if (true, !useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if ('slot' === newVNode.vtag) {
          scopeId && 
          // scoped css needs to add its scoped id to the parent element
          domApi.$setAttribute(parentElm, scopeId + '-slot', '');
          newVNode.vchildren ? 
          // slot element has fallback content
          // still create an element that "mocks" the slot element
          newVNode.isSlotFallback = true : 
          // slot element does not have fallback content
          // create an html comment we'll use to always reference
          // where actual slot content should sit next to
          newVNode.isSlotReference = true;
        }
      }
      if (isDef(newVNode.vtext)) {
        // create text node
        newVNode.elm = domApi.$createTextNode(newVNode.vtext);
      } else if (true, newVNode.isSlotReference) {
        // create a slot reference html text node
        newVNode.elm = domApi.$createTextNode('');
      } else {
        // create element
        elm = newVNode.elm = (true, isSvgMode || 'svg' === newVNode.vtag ? domApi.$createElementNS('http://www.w3.org/2000/svg', newVNode.vtag) : domApi.$createElement((true, 
        newVNode.isSlotFallback ? 'slot-fb' : newVNode.vtag)));
        true;
        isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
        // add css classes, attrs, props, listeners, etc.
        updateElement(plt, null, newVNode, isSvgMode);
        isDef(scopeId) && elm['s-si'] !== scopeId && 
        // if there is a scopeId and this is the initial render
        // then let's add the scopeId as an attribute
        domApi.$setAttribute(elm, elm['s-si'] = scopeId, '');
        false;
        if (newVNode.vchildren) {
          for (i = 0; i < newVNode.vchildren.length; ++i) {
            // create the node
            childNode = createElm(oldParentVNode, newVNode, i, elm);
            // return node could have been null
                        if (childNode) {
              false;
              // append our new node
              domApi.$appendChild(elm, childNode);
              false;
            }
          }
        }
        (true, 'svg' === newVNode.vtag) && (
        // Only reset the SVG context when we're exiting SVG element
        isSvgMode = false);
      }
      true;
      newVNode.elm['s-hn'] = hostTagName;
      if (newVNode.isSlotFallback || newVNode.isSlotReference) {
        // remember the content reference comment
        newVNode.elm['s-sr'] = true;
        // remember the content reference comment
                newVNode.elm['s-cr'] = contentRef;
        // remember the slot name, or empty string for default slot
                newVNode.elm['s-sn'] = newVNode.vname || '';
        // check if we've got an old vnode for this slot
                oldVNode = oldParentVNode && oldParentVNode.vchildren && oldParentVNode.vchildren[childIndex];
        oldVNode && oldVNode.vtag === newVNode.vtag && oldParentVNode.elm && 
        // we've got an old slot vnode and the wrapper is being replaced
        // so let's move the old slot content back to it's original location
        putBackInOriginalLocation(oldParentVNode.elm);
      }
      return newVNode.elm;
    }
    function putBackInOriginalLocation(parentElm, recursive, i, childNode) {
      plt.tmpDisconnected = true;
      var oldSlotChildNodes = domApi.$childNodes(parentElm);
      for (i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
          // this child node in the old element is from another component
          // remove this node from the old slot's parent
          domApi.$remove(childNode);
          // and relocate it back to it's original location
                    domApi.$insertBefore(parentReferenceNode(childNode), childNode, referenceNode(childNode));
          // remove the old original location comment entirely
          // later on the patch function will know what to do
          // and move this to the correct spot in need be
                    domApi.$remove(childNode['s-ol']);
          childNode['s-ol'] = null;
          checkSlotRelocate = true;
        }
        recursive && putBackInOriginalLocation(childNode, recursive);
      }
      plt.tmpDisconnected = false;
    }
    function addVnodes(parentElm, before, parentVNode, vnodes, startIdx, endIdx, containerElm, childNode) {
      // $defaultHolder deprecated 2018-04-02
      var contentRef = parentElm['s-cr'] || parentElm.$defaultHolder;
      containerElm = contentRef && domApi.$parentNode(contentRef) || parentElm;
      containerElm.shadowRoot && (containerElm = containerElm.shadowRoot);
      for (;startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
          childNode = isDef(vnodes[startIdx].vtext) ? domApi.$createTextNode(vnodes[startIdx].vtext) : createElm(null, parentVNode, startIdx, parentElm);
          if (childNode) {
            vnodes[startIdx].elm = childNode;
            domApi.$insertBefore(containerElm, childNode, referenceNode(before));
          }
        }
      }
    }
    function removeVnodes(vnodes, startIdx, endIdx, node) {
      for (;startIdx <= endIdx; ++startIdx) {
        if (isDef(vnodes[startIdx])) {
          node = vnodes[startIdx].elm;
          true;
          // we're removing this element
          // so it's possible we need to show slot fallback content now
          checkSlotFallbackVisibility = true;
          node['s-ol'] ? 
          // remove the original location comment
          domApi.$remove(node['s-ol']) : 
          // it's possible that child nodes of the node
          // that's being removed are slot nodes
          putBackInOriginalLocation(node, true);
          // remove the vnode's element from the dom
          domApi.$remove(node);
        }
      }
    }
    function updateChildren(parentElm, oldCh, newVNode, newCh, idxInOld, i, node, elmToMove) {
      var oldStartIdx = 0, newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (null == oldStartVnode) {
          // Vnode might have been moved left
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (null == oldEndVnode) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (null == newStartVnode) {
          newStartVnode = newCh[++newStartIdx];
        } else if (null == newEndVnode) {
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          patchVNode(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          patchVNode(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          // Vnode moved right
          'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldStartVnode.elm));
          patchVNode(oldStartVnode, newEndVnode);
          domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          // Vnode moved left
          'slot' !== oldStartVnode.vtag && 'slot' !== newEndVnode.vtag || putBackInOriginalLocation(domApi.$parentNode(oldEndVnode.elm));
          patchVNode(oldEndVnode, newStartVnode);
          domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          // createKeyToOldIdx
          idxInOld = null;
          for (i = oldStartIdx; i <= oldEndIdx; ++i) {
            if (oldCh[i] && isDef(oldCh[i].vkey) && oldCh[i].vkey === newStartVnode.vkey) {
              idxInOld = i;
              break;
            }
          }
          if (isDef(idxInOld)) {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.vtag !== newStartVnode.vtag) {
              node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
            } else {
              patchVNode(elmToMove, newStartVnode);
              oldCh[idxInOld] = void 0;
              node = elmToMove.elm;
            }
            newStartVnode = newCh[++newStartIdx];
          } else {
            // new element
            node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
            newStartVnode = newCh[++newStartIdx];
          }
          node && domApi.$insertBefore(parentReferenceNode(oldStartVnode.elm), node, referenceNode(oldStartVnode.elm));
        }
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newVNode, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
    function isSameVnode(vnode1, vnode2) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      if (vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey) {
        true;
        if ('slot' === vnode1.vtag) {
          return vnode1.vname === vnode2.vname;
        }
        return true;
      }
      return false;
    }
    function referenceNode(node) {
      true;
      if (node && node['s-ol']) {
        // this node was relocated to a new location in the dom
        // because of some other component's slot
        // but we still have an html comment in place of where
        // it's original location was according to it's original vdom
        return node['s-ol'];
      }
      return node;
    }
    function parentReferenceNode(node) {
      return domApi.$parentNode(node['s-ol'] ? node['s-ol'] : node);
    }
    function patchVNode(oldVNode, newVNode, defaultHolder) {
      var elm = newVNode.elm = oldVNode.elm;
      var oldChildren = oldVNode.vchildren;
      var newChildren = newVNode.vchildren;
      true;
      // test if we're rendering an svg element, or still rendering nodes inside of one
      // only add this to the when the compiler sees we're using an svg somewhere
      isSvgMode = newVNode.elm && isDef(domApi.$parentElement(newVNode.elm)) && void 0 !== newVNode.elm.ownerSVGElement;
      isSvgMode = 'svg' === newVNode.vtag || 'foreignObject' !== newVNode.vtag && isSvgMode;
      if (isDef(newVNode.vtext)) {
        true, (defaultHolder = elm['s-cr'] || elm.$defaultHolder /* $defaultHolder deprecated 2018-04-02 */) ? 
        // this element has slotted content
        domApi.$setTextContent(domApi.$parentNode(defaultHolder), newVNode.vtext) : oldVNode.vtext !== newVNode.vtext && 
        // update the text content for the text only vnode
        // and also only if the text is different than before
        domApi.$setTextContent(elm, newVNode.vtext);
      } else {
        // element node
        'slot' !== newVNode.vtag && 
        // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(plt, oldVNode, newVNode, isSvgMode);
        if (isDef(oldChildren) && isDef(newChildren)) {
          // looks like there's child vnodes for both the old and new vnodes
          updateChildren(elm, oldChildren, newVNode, newChildren);
        } else if (isDef(newChildren)) {
          // no old child vnodes, but there are new child vnodes to add
          isDef(oldVNode.vtext) && 
          // the old vnode was text, so be sure to clear it out
          domApi.$setTextContent(elm, '');
          // add the new vnode children
                    addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        } else {
          isDef(oldChildren) && 
          // no new child vnodes, but there are old child vnodes to remove
          removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
      }
      true;
      // reset svgMode when svg node is fully patched
      isSvgMode && 'svg' === newVNode.vtag && (isSvgMode = false);
    }
    function updateFallbackSlotVisibility(elm, childNode, childNodes, i, ilen, j, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (1 /* ElementNode */ === domApi.$nodeType(childNode)) {
          if (childNode['s-sr']) {
            // this is a slot fallback node
            // get the slot name for this slot reference node
            slotNameAttr = childNode['s-sn'];
            // by default always show a fallback slot node
            // then hide it if there are other slots in the light dom
                        childNode.hidden = false;
            for (j = 0; j < ilen; j++) {
              if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                // this sibling node is from a different component
                nodeType = domApi.$nodeType(childNodes[j]);
                if ('' !== slotNameAttr) {
                  // this is a named fallback slot node
                  if (1 /* ElementNode */ === nodeType && slotNameAttr === domApi.$getAttribute(childNodes[j], 'slot')) {
                    childNode.hidden = true;
                    break;
                  }
                } else 
                // this is a default fallback slot node
                // any element or text node (with content)
                // should hide the default fallback slot node
                if (1 /* ElementNode */ === nodeType || 3 /* TextNode */ === nodeType && '' !== domApi.$getTextContent(childNodes[j]).trim()) {
                  childNode.hidden = true;
                  break;
                }
              }
            }
          }
          // keep drilling down
                    updateFallbackSlotVisibility(childNode);
        }
      }
    }
    var relocateNodes = [];
    function relocateSlotContent(elm, childNodes, childNode, node, i, ilen, j, hostContentNodes, slotNameAttr, nodeType) {
      childNodes = domApi.$childNodes(elm);
      for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr'])) {
          // first got the content reference comment node
          // then we got it's parent, which is where all the host content is in now
          hostContentNodes = domApi.$childNodes(domApi.$parentNode(node));
          slotNameAttr = childNode['s-sn'];
          for (j = hostContentNodes.length - 1; j >= 0; j--) {
            node = hostContentNodes[j];
            if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
              // let's do some relocating to its new home
              // but never relocate a content reference node
              // that is suppose to always represent the original content location
              nodeType = domApi.$nodeType(node);
              if (((3 /* TextNode */ === nodeType || 8 /* CommentNode */ === nodeType) && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && null === domApi.$getAttribute(node, 'slot') && '' === slotNameAttr || 1 /* ElementNode */ === nodeType && domApi.$getAttribute(node, 'slot') === slotNameAttr) && !relocateNodes.some(function(r) {
                return r.nodeToRelocate === node;
              })) {
                // made some changes to slots
                // let's make sure we also double check
                // fallbacks are correctly hidden or shown
                checkSlotFallbackVisibility = true;
                node['s-sn'] = slotNameAttr;
                // add to our list of nodes to relocate
                                relocateNodes.push({
                  slotRefNode: childNode,
                  nodeToRelocate: node
                });
              }
            }
          }
        }
        1 /* ElementNode */ === domApi.$nodeType(childNode) && relocateSlotContent(childNode);
      }
    }
    // internal variables to be reused per patch() call
        var useNativeShadowDom, scopeId, isUpdate, checkSlotFallbackVisibility, checkSlotRelocate, hostTagName, contentRef;
    return function patch(oldVNode, newVNode, isUpdatePatch, encapsulation, ssrPatchId, i, relocateNode, orgLocationNode, refNode) {
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      isUpdate = isUpdatePatch;
      hostTagName = domApi.$tagName(oldVNode.elm);
      contentRef = oldVNode.elm['s-cr'];
      false;
      true;
      // get the scopeId
      scopeId = 'scoped' === encapsulation || 'shadow' === encapsulation && !domApi.$supportsShadowDom ? 'data-' + domApi.$tagName(oldVNode.elm) : null;
      // always reset
            checkSlotRelocate = checkSlotFallbackVisibility = false;
      true;
      // use native shadow dom only if the component wants to use it
      // and if this browser supports native shadow dom
      useNativeShadowDom = 'shadow' === encapsulation && domApi.$supportsShadowDom;
      isUpdate || (true, useNativeShadowDom ? 
      // this component SHOULD use native slot/shadow dom
      // this browser DOES support native shadow dom
      // and this is the first render
      // let's create that shadow root
      oldVNode.elm = domApi.$attachShadow(oldVNode.elm, {
        mode: 'open'
      }) : (true, scopeId) && 
      // this host element should use scoped css
      // add the scope attribute to the host
      domApi.$setAttribute(oldVNode.elm, scopeId + '-host', ''));
      // synchronous patch
            patchVNode(oldVNode, newVNode);
      false;
      true;
      if (checkSlotRelocate) {
        relocateSlotContent(newVNode.elm);
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          if (!relocateNode.nodeToRelocate['s-ol']) {
            // add a reference node marking this node's original location
            // keep a reference to this node for later lookups
            orgLocationNode = domApi.$createTextNode('');
            orgLocationNode['s-nr'] = relocateNode.nodeToRelocate;
            domApi.$insertBefore(domApi.$parentNode(relocateNode.nodeToRelocate), relocateNode.nodeToRelocate['s-ol'] = orgLocationNode, relocateNode.nodeToRelocate);
          }
        }
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
                plt.tmpDisconnected = true;
        for (i = 0; i < relocateNodes.length; i++) {
          relocateNode = relocateNodes[i];
          // by default we're just going to insert it directly
          // after the slot reference node
                    var parentNodeRef = domApi.$parentNode(relocateNode.slotRefNode);
          var insertBeforeNode = domApi.$nextSibling(relocateNode.slotRefNode);
          orgLocationNode = relocateNode.nodeToRelocate['s-ol'];
          while (orgLocationNode = domApi.$previousSibling(orgLocationNode)) {
            refNode = orgLocationNode['s-nr'];
            if (refNode && refNode['s-sn'] === relocateNode.nodeToRelocate['s-sn'] && parentNodeRef === domApi.$parentNode(refNode)) {
              insertBeforeNode = domApi.$nextSibling(refNode);
              break;
            }
          }
          if ((!insertBeforeNode && parentNodeRef !== domApi.$parentNode(relocateNode.nodeToRelocate) || domApi.$nextSibling(relocateNode.nodeToRelocate) !== insertBeforeNode) && relocateNode.nodeToRelocate !== insertBeforeNode) {
            // remove the node from the dom
            domApi.$remove(relocateNode.nodeToRelocate);
            // add it back to the dom but in its new home
                        domApi.$insertBefore(parentNodeRef, relocateNode.nodeToRelocate, insertBeforeNode);
          }
        }
        // done moving nodes around
        // allow the disconnect callback to work again
                plt.tmpDisconnected = false;
      }
      checkSlotFallbackVisibility && updateFallbackSlotVisibility(newVNode.elm);
      // always reset
            relocateNodes.length = 0;
      // return our new vnode
      return newVNode;
    };
  }
  function callNodeRefs(vNode, isDestroy) {
    if (vNode) {
      vNode.vattrs && vNode.vattrs.ref && vNode.vattrs.ref(isDestroy ? null : vNode.elm);
      vNode.vchildren && vNode.vchildren.forEach(function(vChild) {
        callNodeRefs(vChild, isDestroy);
      });
    }
  }
  function createVNodesFromSsr(plt, domApi, rootElm) {
    var allSsrElms = rootElm.querySelectorAll('[' + SSR_VNODE_ID + ']');
    var ilen = allSsrElms.length;
    var elm, ssrVNodeId, ssrVNode, i, j, jlen;
    if (ilen > 0) {
      plt.hasLoadedMap.set(rootElm, true);
      for (i = 0; i < ilen; i++) {
        elm = allSsrElms[i];
        ssrVNodeId = domApi.$getAttribute(elm, SSR_VNODE_ID);
        ssrVNode = {};
        ssrVNode.vtag = domApi.$tagName(ssrVNode.elm = elm);
        plt.vnodeMap.set(elm, ssrVNode);
        for (j = 0, jlen = elm.childNodes.length; j < jlen; j++) {
          addChildSsrVNodes(domApi, elm.childNodes[j], ssrVNode, ssrVNodeId, true);
        }
      }
    }
  }
  function addChildSsrVNodes(domApi, node, parentVNode, ssrVNodeId, checkNestedElements) {
    var nodeType = domApi.$nodeType(node);
    var previousComment;
    var childVNodeId, childVNodeSplt, childVNode;
    if (checkNestedElements && 1 /* ElementNode */ === nodeType) {
      childVNodeId = domApi.$getAttribute(node, SSR_CHILD_ID);
      if (childVNodeId) {
        // split the start comment's data with a period
        childVNodeSplt = childVNodeId.split('.');
        // ensure this this element is a child element of the ssr vnode
                if (childVNodeSplt[0] === ssrVNodeId) {
          // cool, this element is a child to the parent vnode
          childVNode = {};
          childVNode.vtag = domApi.$tagName(childVNode.elm = node);
          // this is a new child vnode
          // so ensure its parent vnode has the vchildren array
                    parentVNode.vchildren || (parentVNode.vchildren = []);
          // add our child vnode to a specific index of the vnode's children
                    parentVNode.vchildren[childVNodeSplt[1]] = childVNode;
          // this is now the new parent vnode for all the next child checks
                    parentVNode = childVNode;
          // if there's a trailing period, then it means there aren't any
          // more nested elements, but maybe nested text nodes
          // either way, don't keep walking down the tree after this next call
                    checkNestedElements = '' !== childVNodeSplt[2];
        }
      }
      // keep drilling down through the elements
            for (var i = 0; i < node.childNodes.length; i++) {
        addChildSsrVNodes(domApi, node.childNodes[i], parentVNode, ssrVNodeId, checkNestedElements);
      }
    } else if (3 /* TextNode */ === nodeType && (previousComment = node.previousSibling) && 8 /* CommentNode */ === domApi.$nodeType(previousComment)) {
      // split the start comment's data with a period
      childVNodeSplt = domApi.$getTextContent(previousComment).split('.');
      // ensure this is an ssr text node start comment
      // which should start with an "s" and delimited by periods
            if ('s' === childVNodeSplt[0] && childVNodeSplt[1] === ssrVNodeId) {
        // cool, this is a text node and it's got a start comment
        childVNode = {
          vtext: domApi.$getTextContent(node)
        };
        childVNode.elm = node;
        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
                parentVNode.vchildren || (parentVNode.vchildren = []);
        // add our child vnode to a specific index of the vnode's children
                parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
      }
    }
  }
  function createQueueClient(App, win) {
    var now = function() {
      return win.performance.now();
    };
    var resolved = Promise.resolve();
    var highPriority = [];
    var domReads = [];
    var domWrites = [];
    var domWritesLow = [];
    var congestion = 0;
    var rafPending = false;
    App.raf || (App.raf = win.requestAnimationFrame.bind(win));
    function consume(queue) {
      for (var i = 0; i < queue.length; i++) {
        try {
          queue[i]();
        } catch (e) {
          console.error(e);
        }
      }
      queue.length = 0;
    }
    function consumeTimeout(queue, timeout) {
      var i = 0;
      while (i < queue.length && now() < timeout) {
        try {
          queue[i++]();
        } catch (e) {
          console.error(e);
        }
      }
      i === queue.length ? queue.length = 0 : 0 !== i && queue.splice(0, i);
    }
    function flush() {
      congestion++;
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      // DOM READS!!!
            consume(domReads);
      var start = now() + 7 * Math.ceil(congestion * (1 / 22));
      // DOM WRITES!!!
            consumeTimeout(domWrites, start);
      consumeTimeout(domWritesLow, start);
      if (domWrites.length > 0) {
        domWritesLow.push.apply(domWritesLow, domWrites);
        domWrites.length = 0;
      }
      (rafPending = domReads.length + domWrites.length + domWritesLow.length > 0) ? 
      // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next tick
      App.raf(flush) : congestion = 0;
    }
    return {
      tick: function(cb) {
        // queue high priority work to happen in next tick
        // uses Promise.resolve() for next tick
        highPriority.push(cb);
        1 === highPriority.length && resolved.then(function() {
          return consume(highPriority);
        });
      },
      read: function(cb) {
        // queue dom reads
        domReads.push(cb);
        if (!rafPending) {
          rafPending = true;
          App.raf(flush);
        }
      },
      write: function(cb) {
        // queue dom writes
        domWrites.push(cb);
        if (!rafPending) {
          rafPending = true;
          App.raf(flush);
        }
      }
    };
  }
  function generateDevInspector(App, namespace, win, plt) {
    var devInspector = win.devInspector = win.devInspector || {};
    devInspector.apps = devInspector.apps || [];
    devInspector.apps.push(generateDevInspectorApp(App, namespace, plt));
    devInspector.getInstance || (devInspector.getInstance = function(elm) {
      return Promise.all(devInspector.apps.map(function(app) {
        return app.getInstance(elm);
      })).then(function(results) {
        return results.find(function(instance) {
          return !!instance;
        });
      });
    });
    devInspector.getComponents || (devInspector.getComponents = function() {
      var appsMetadata = [];
      devInspector.apps.forEach(function(app) {
        appsMetadata.push(app.getComponents());
      });
      return Promise.all(appsMetadata).then(function(appMetadata) {
        var allMetadata = [];
        appMetadata.forEach(function(metadata) {
          metadata.forEach(function(m) {
            allMetadata.push(m);
          });
        });
        return allMetadata;
      });
    });
    return devInspector;
  }
  function generateDevInspectorApp(App, namespace, plt) {
    var app = {
      namespace: namespace,
      getInstance: function(elm) {
        if (elm && elm.tagName) {
          return Promise.all([ getComponentMeta(plt, elm.tagName), getComponentInstance(plt, elm) ]).then(function(results) {
            if (results[0] && results[1]) {
              var cmp = {
                meta: results[0],
                instance: results[1]
              };
              return cmp;
            }
            return null;
          });
        }
        return Promise.resolve(null);
      },
      getComponent: function(tagName) {
        return getComponentMeta(plt, tagName);
      },
      getComponents: function() {
        return Promise.all(App.components.map(function(cmp) {
          return getComponentMeta(plt, cmp[0]);
        })).then(function(metadata) {
          return metadata.filter(function(m) {
            return m;
          });
        });
      }
    };
    return app;
  }
  function getMembersMeta(properties) {
    return Object.keys(properties).reduce(function(membersMap, memberKey) {
      var prop = properties[memberKey];
      var category;
      var member = {
        name: memberKey
      };
      if (prop.state) {
        category = 'states';
        member.watchers = prop.watchCallbacks || [];
      } else if (prop.elementRef) {
        category = 'elements';
      } else if (prop.method) {
        category = 'methods';
      } else {
        category = 'props';
        var type = 'any';
        if (prop.type) {
          type = prop.type;
          'function' === typeof prop.type && (type = prop.type.name);
        }
        member.type = type.toLowerCase();
        member.mutable = prop.mutable || false;
        member.connect = prop.connect || '-';
        member.context = prop.connect || '-';
        member.watchers = prop.watchCallbacks || [];
      }
      membersMap[category].push(member);
      return membersMap;
    }, {
      props: [],
      states: [],
      elements: [],
      methods: []
    });
  }
  function getComponentMeta(plt, tagName) {
    var elm = {
      tagName: tagName
    };
    var internalMeta = plt.getComponentMeta(elm);
    if (!internalMeta || !internalMeta.componentConstructor) {
      return Promise.resolve(null);
    }
    var cmpCtr = internalMeta.componentConstructor;
    var members = getMembersMeta(cmpCtr.properties || {});
    var listeners = (internalMeta.listenersMeta || []).map(function(listenerMeta) {
      return {
        event: listenerMeta.eventName,
        capture: listenerMeta.eventCapture,
        disabled: listenerMeta.eventDisabled,
        passive: listenerMeta.eventPassive,
        method: listenerMeta.eventMethodName
      };
    });
    var emmiters = cmpCtr.events || [];
    var meta = Object.assign({
      tag: cmpCtr.is,
      bundle: internalMeta.bundleIds || 'unknown',
      encapsulation: cmpCtr.encapsulation || 'none'
    }, members, {
      events: {
        emmiters: emmiters,
        listeners: listeners
      }
    });
    return Promise.resolve(meta);
  }
  function getComponentInstance(plt, elm) {
    return Promise.resolve(plt.instanceMap.get(elm));
  }
  function initCoreComponentOnReady(plt, App) {
    // create the function the HTMLElement.prototype.componentOnReady will end up calling
    App.componentOnReady = function(elm, resolve) {
      if (plt.getComponentMeta(elm) && !plt.hasLoadedMap.has(elm)) {
        // this is a known component and the
        // host element hasn't finished loading yet
        var onReadyCallbacks = plt.onReadyCallbacksMap.get(elm) || [];
        onReadyCallbacks.push(resolve);
        plt.onReadyCallbacksMap.set(elm, onReadyCallbacks);
      } else {
        // either the host element has already loaded
        // or it's not even a component
        resolve(elm);
      }
    };
    // drain the queue that could have been filled up before the core fully loaded
        App.$r && App.$r.forEach(function(r) {
      return App.componentOnReady(r[0], r[1]);
    });
    // remove the queue now that the core file has initialized
        App.$r = null;
  }
  function attributeChangedCallback(membersMeta, elm, attribName, oldVal, newVal, propName, memberMeta) {
    // only react if the attribute values actually changed
    if (membersMeta && oldVal !== newVal) {
      // using the known component meta data
      // look up to see if we have a property wired up to this attribute name
      for (propName in membersMeta) {
        memberMeta = membersMeta[propName];
        // normalize the attribute name w/ lower case
                if (memberMeta.attribName && toLowerCase(memberMeta.attribName) === toLowerCase(attribName)) {
          // cool we've got a prop using this attribute name, the value will
          // be a string, so let's convert it to the correct type the app wants
          elm[propName] = parsePropertyValue(memberMeta.propType, newVal);
          break;
        }
      }
    }
  }
  function useShadowDom(supportsNativeShadowDom, cmpMeta) {
    return supportsNativeShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulation;
  }
  function useScopedCss(supportsNativeShadowDom, cmpMeta) {
    if (2 /* ScopedCss */ === cmpMeta.encapsulation) {
      return true;
    }
    if (1 /* ShadowDom */ === cmpMeta.encapsulation && !supportsNativeShadowDom) {
      return true;
    }
    return false;
  }
  function initHostSnapshot(domApi, cmpMeta, elm, hostSnapshot, attribName) {
    true;
    // host element has been connected to the DOM
    if (!elm['s-cr'] && !domApi.$getAttribute(elm, SSR_VNODE_ID) && !useShadowDom(domApi.$supportsShadowDom, cmpMeta)) {
      // only required when we're NOT using native shadow dom (slot)
      // this host element was NOT created with SSR
      // let's pick out the inner content for slot projection
      // create a node to represent where the original
      // content was first placed, which is useful later on
      elm['s-cr'] = domApi.$createTextNode('');
      elm['s-cr']['s-cn'] = true;
      domApi.$insertBefore(elm, elm['s-cr'], domApi.$childNodes(elm)[0]);
    }
    if (!domApi.$supportsShadowDom && 1 /* ShadowDom */ === cmpMeta.encapsulation) {
      true, true;
      // it's possible we're manually forcing the slot polyfill
      // but this browser may already support the read-only shadowRoot
      // do an extra check here, but only for dev mode on the client
      'shadowRoot' in HTMLElement.prototype || (elm.shadowRoot = elm);
    }
    hostSnapshot = {
      $id: elm['s-id'],
      $attributes: {}
    };
    cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(function(memberName) {
      (attribName = cmpMeta.membersMeta[memberName].attribName) && (hostSnapshot.$attributes[attribName] = domApi.$getAttribute(elm, attribName));
    });
    return hostSnapshot;
  }
  function connectedCallback(plt, cmpMeta, elm) {
    false;
    // this element just connected, which may be re-connecting
    // ensure we remove it from our map of disconnected
    plt.isDisconnectedMap.delete(elm);
    if (!plt.hasConnectedMap.has(elm)) {
      // first time we've connected
      plt.hasConnectedMap.set(elm, true);
      elm['s-id'] || (
      // assign a unique id to this host element
      // it's possible this was already given an element id
      elm['s-id'] = plt.nextId());
      // register this component as an actively
      // loading child to its parent component
            registerWithParentComponent(plt, elm);
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
            plt.queue.tick(function() {
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        return plt.requestBundle(cmpMeta, elm, initHostSnapshot(plt.domApi, cmpMeta, elm));
      });
    }
  }
  function registerWithParentComponent(plt, elm, ancestorHostElement) {
    // find the first ancestor host element (if there is one) and register
    // this element as one of the actively loading child elements for its ancestor
    ancestorHostElement = elm;
    while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) {
      // climb up the ancestors looking for the first registered component
      if (plt.isDefinedComponent(ancestorHostElement)) {
        // we found this elements the first ancestor host element
        // if the ancestor already loaded then do nothing, it's too late
        if (!plt.hasLoadedMap.has(elm)) {
          // keep a reference to this element's ancestor host element
          // elm._ancestorHostElement = ancestorHostElement;
          plt.ancestorHostElementMap.set(elm, ancestorHostElement);
          // ensure there is an array to contain a reference to each of the child elements
          // and set this element as one of the ancestor's child elements it should wait on
                    ancestorHostElement.$activeLoading && (
          // $activeLoading deprecated 2018-04-02
          ancestorHostElement['s-ld'] = ancestorHostElement.$activeLoading);
          (ancestorHostElement['s-ld'] = ancestorHostElement['s-ld'] || []).push(elm);
        }
        break;
      }
    }
  }
  function disconnectedCallback(plt, elm, instance) {
    // only disconnect if we're not temporarily disconnected
    // tmpDisconnected will happen when slot nodes are being relocated
    if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
      // ok, let's officially destroy this thing
      // set this to true so that any of our pending async stuff
      // doesn't continue since we already decided to destroy this node
      // elm._hasDestroyed = true;
      plt.isDisconnectedMap.set(elm, true);
      // double check that we've informed the ancestor host elements
      // that they're good to go and loaded (cuz this one is on its way out)
            propagateComponentLoaded(plt, elm);
      // since we're disconnecting, call all of the JSX ref's with null
            callNodeRefs(plt.vnodeMap.get(elm), true);
      // detatch any event listeners that may have been added
      // because we're not passing an exact event name it'll
      // remove all of this element's event, which is good
            plt.domApi.$removeEventListener(elm);
      plt.hasListenersMap.delete(elm);
      true;
      // call instance componentDidUnload
      // if we've created an instance for this
      instance = plt.instanceMap.get(elm);
      instance && 
      // call the user's componentDidUnload if there is one
      instance.componentDidUnload && instance.componentDidUnload();
      // clear any references to other elements
      // more than likely we've already deleted these references
      // but let's double check there pal
      [ plt.ancestorHostElementMap, plt.onReadyCallbacksMap, plt.hostSnapshotMap ].forEach(function(wm) {
        return wm.delete(elm);
      });
    }
  }
  function isDisconnected(domApi, elm) {
    while (elm) {
      if (!domApi.$parentNode(elm)) {
        return 9 /* DocumentNode */ !== domApi.$nodeType(elm);
      }
      elm = domApi.$parentNode(elm);
    }
  }
  function proxyHostElementPrototype(plt, membersMeta, hostPrototype) {
    false;
    membersMeta && Object.keys(membersMeta).forEach(function(memberName) {
      // add getters/setters
      var memberType = membersMeta[memberName].memberType;
      1 /* Prop */ === memberType || 2 /* PropMutable */ === memberType ? 
      // @Prop() or @Prop({ mutable: true })
      definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
        // host element getter (cannot be arrow fn)
        // yup, ugly, srynotsry
        return (plt.valuesMap.get(this) || {})[memberName];
      }, function setHostElementProp(newValue) {
        // host element setter (cannot be arrow fn)
        setValue(plt, this, memberName, newValue);
      }) : 6 /* Method */ === memberType && 
      // @Method()
      // add a placeholder noop value on the host element's prototype
      // incase this method gets called before setup
      definePropertyValue(hostPrototype, memberName, noop);
    });
  }
  function initHostElement(plt, cmpMeta, HostElementConstructor, hydratedCssClass) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    HostElementConstructor.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      connectedCallback(plt, cmpMeta, this);
    };
    true;
    HostElementConstructor.attributeChangedCallback = function(attribName, oldVal, newVal) {
      // the browser has just informed us that an attribute
      // on the host element has changed
      attributeChangedCallback(cmpMeta.membersMeta, this, attribName, oldVal, newVal);
    };
    HostElementConstructor.disconnectedCallback = function() {
      // the element has left the builing
      disconnectedCallback(plt, this);
    };
    HostElementConstructor['s-init'] = function() {
      initComponentLoaded(plt, this, hydratedCssClass);
    };
    HostElementConstructor.forceUpdate = function() {
      queueUpdate(plt, this);
    };
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
        proxyHostElementPrototype(plt, cmpMeta.membersMeta, HostElementConstructor);
  }
  function proxyController(domApi, controllerComponents, ctrlTag) {
    return {
      'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
      'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
    };
  }
  function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
    return function() {
      var args = arguments;
      return loadComponent(domApi, controllerComponents, ctrlTag).then(function(ctrlElm) {
        return ctrlElm[proxyMethodName].apply(ctrlElm, args);
      });
    };
  }
  function loadComponent(domApi, controllerComponents, ctrlTag) {
    return new Promise(function(resolve) {
      var ctrlElm = controllerComponents[ctrlTag];
      ctrlElm || (ctrlElm = domApi.$body.querySelector(ctrlTag));
      if (!ctrlElm) {
        ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
        domApi.$appendChild(domApi.$body, ctrlElm);
      }
      ctrlElm.componentOnReady(resolve);
    });
  }
  /*
    Extremely simple css parser. Intended to be not more than what we need
    and definitely not necessarily correct =).
    */
  /* tslint:disable */
  var StyleNode = /** @class */ function() {
    function StyleNode() {
      this.rules = null;
      this.start = 0;
      this.end = 0;
      this.parent = null;
      this.previous = null;
      this.parsedCssText = '';
      this.cssText = '';
      this.parsedSelector = '';
      this.atRule = false;
      this.selector = '';
      this.type = 0;
      this.keyframesName = '';
    }
    return StyleNode;
  }();
  // given a string of css, return a simple rule tree
    function parse(text) {
    text = clean(text);
    return parseCss(lex(text), text);
  }
  // remove stuff we don't care about that may hinder parsing
    function clean(cssText) {
    return cssText.replace(COMMENTS_RX, '').replace(PORT_RX, '');
  }
  // super simple {...} lexer that returns a node tree
    function lex(text) {
    var root = new StyleNode();
    root.start = 0;
    root.end = text.length;
    var n = root;
    for (var i = 0, l = text.length; i < l; i++) {
      if (text[i] === OPEN_BRACE) {
        n.rules || (n.rules = []);
        var p = n;
        var previous = p.rules[p.rules.length - 1] || null;
        n = new StyleNode();
        n.start = i + 1;
        n.parent = p;
        n.previous = previous;
        p.rules.push(n);
      } else if (text[i] === CLOSE_BRACE) {
        n.end = i + 1;
        n = n.parent || root;
      }
    }
    return root;
  }
  // add selectors/cssText to node tree
    function parseCss(node, text) {
    var t = text.substring(node.start, node.end - 1);
    node.parsedCssText = node.cssText = t.trim();
    if (node.parent) {
      var ss = node.previous ? node.previous.end : node.parent.start;
      t = text.substring(ss, node.start - 1);
      t = _expandUnicodeEscapes(t);
      t = t.replace(MULTI_SPACES_RX, ' ');
      t = t.substring(t.lastIndexOf(';') + 1);
      var s = node.parsedSelector = node.selector = t.trim();
      node.atRule = 0 === s.indexOf(AT_START);
      // note, support a subset of rule types...
            if (node.atRule) {
        if (0 === s.indexOf(MEDIA_START)) {
          node.type = 4 /* MEDIA_RULE */;
        } else if (s.match(KEYFRAMES_RULE_RX)) {
          node.type = 7 /* KEYFRAMES_RULE */;
          node.keyframesName = node.selector.split(MULTI_SPACES_RX).pop();
        }
      } else {
        0 === s.indexOf(VAR_START) ? node.type = 1e3 /* MIXIN_RULE */ : node.type = 1 /* STYLE_RULE */;
      }
    }
    var r$ = node.rules;
    if (r$) {
      for (var i = 0, l = r$.length, r = void 0; i < l && (r = r$[i]); i++) {
        parseCss(r, text);
      }
    }
    return node;
  }
  /**
     * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
     * expanded form that doesn't require trailing space `\000033`
     */  function _expandUnicodeEscapes(s) {
    return s.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
      var code = arguments[1], repeat = 6 - code.length;
      while (repeat--) {
        code = '0' + code;
      }
      return '\\' + code;
    });
  }
  /**
     * stringify parsed css.
     */  function stringify(node, preserveProperties, text) {
    void 0 === text && (text = '');
    // calc rule cssText
        var cssText = '';
    if (node.cssText || node.rules) {
      var r$ = node.rules;
      if (r$) {
        for (var i = 0, l = r$.length, r = void 0; i < l && (r = r$[i]); i++) {
          cssText = stringify(r, preserveProperties, cssText);
        }
      } else {
        cssText = preserveProperties ? node.cssText : removeCustomProps(node.cssText);
        cssText = cssText.trim();
        cssText && (cssText = '  ' + cssText + '\n');
      }
    }
    // emit rule if there is cssText
        if (cssText) {
      node.selector && (text += node.selector + ' ' + OPEN_BRACE + '\n');
      text += cssText;
      node.selector && (text += CLOSE_BRACE + '\n\n');
    }
    return text;
  }
  function removeCustomProps(cssText) {
    cssText = removeCustomPropAssignment(cssText);
    return removeCustomPropApply(cssText);
  }
  function removeCustomPropAssignment(cssText) {
    return cssText.replace(CUSTOM_PROP_RX, '');
  }
  function removeCustomPropApply(cssText) {
    return cssText.replace(VAR_APPLY_RX, '');
  }
  var StyleInfo = /** @class */ function() {
    function StyleInfo(ast) {
      this.styleRules = ast || null;
      this.styleProperties = null;
    }
    StyleInfo.get = function(node) {
      return node ? node[infoKey] : null;
    };
    StyleInfo.set = function(node, styleInfo) {
      node[infoKey] = styleInfo;
      return styleInfo;
    };
    return StyleInfo;
  }();
  var OPEN_BRACE = '{';
  var CLOSE_BRACE = '}';
  // helper regexp's
    var COMMENTS_RX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim;
  var PORT_RX = /@import[^;]*;/gim;
  var CUSTOM_PROP_RX = /(?:^[^;\-\s}]+)?--[\w-]*?\s*:\s*(?:(?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+(?:[;\n]|$))/gim;
  var VAR_APPLY_RX = /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim;
  var KEYFRAMES_RULE_RX = /^@[^\s]*keyframes/;
  var MULTI_SPACES_RX = /\s+/g;
  var VAR_START = '--';
  var MEDIA_START = '@media';
  var AT_START = '@';
  var infoKey = '__styleInfo';
  function toCssText(win, rules, callback) {
    if (!rules) {
      return '';
    }
    'string' === typeof rules && (rules = parse(rules));
    callback && forEachRule(win, rules, callback);
    return stringify(rules, false);
  }
  function rulesForStyle(style) {
    !style.__cssRules && style.textContent && (style.__cssRules = parse(style.textContent));
    return style.__cssRules || null;
  }
  function forEachRule(win, node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
    if (!node) {
      return;
    }
    var skipRules = false;
    var type = node.type;
    if (onlyActiveRules && 4 /* MEDIA_RULE */ === type) {
      var matchMedia = node.selector.match(MEDIA_MATCH);
      matchMedia && (
      // if rule is a non matching @media rule, skip subrules
      win.matchMedia(matchMedia[1]).matches || (skipRules = true));
    }
    1 /* STYLE_RULE */ === type ? styleRuleCallback(node) : keyframesRuleCallback && 7 /* KEYFRAMES_RULE */ === type ? keyframesRuleCallback(node) : 1e3 /* MIXIN_RULE */ === type && (skipRules = true);
    var r$ = node.rules;
    if (r$ && !skipRules) {
      for (var i = 0, l = r$.length, r = void 0; i < l && (r = r$[i]); i++) {
        forEachRule(win, r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
      }
    }
  }
  /**
     * Walk from text[start] matching parens and
     * returns position of the outer end paren
     */  function findMatchingParen(text, start) {
    var level = 0;
    for (var i = start, l = text.length; i < l; i++) {
      if ('(' === text[i]) {
        level++;
      } else if (')' === text[i] && 0 === --level) {
        return i;
      }
    }
    return -1;
  }
  function processVariableAndFallback(str, callback) {
    // find 'var('
    var start = str.indexOf('var(');
    if (-1 === start) {
      // no var?, everything is prefix
      return callback(str, '', '', '');
    }
    // ${prefix}var(${inner})${suffix}
        var end = findMatchingParen(str, start + 3);
    var inner = str.substring(start + 4, end);
    var prefix = str.substring(0, start);
    // suffix may have other variables
        var suffix = processVariableAndFallback(str.substring(end + 1), callback);
    var comma = inner.indexOf(',');
    // value and fallback args should be trimmed to match in property lookup
        if (-1 === comma) {
      // variable, no fallback
      return callback(prefix, inner.trim(), '', suffix);
    }
    // var(${value},${fallback})
        var value = inner.substring(0, comma).trim();
    var fallback = inner.substring(comma + 1).trim();
    return callback(prefix, value, fallback, suffix);
  }
  var MEDIA_MATCH = /@media\s(.*)/;
  /* tslint:disable */  var StyleProperties = /** @class */ function() {
    function StyleProperties(win) {
      this.win = win;
      this.SAFE_TOKEN = '__!__';
      this.matchesSelector = function(p) {
        return p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.webkitMatchesSelector;
      }(win.Element.prototype);
    }
    // decorate a single rule with property info
        StyleProperties.prototype.decorateRule = function(rule) {
      if (rule.propertyInfo) {
        return rule.propertyInfo;
      }
      var info = {}, properties = {};
      var hasProperties = this.collectProperties(rule, properties);
      if (hasProperties) {
        info.properties = properties;
        // TODO(sorvell): workaround parser seeing mixins as additional rules
                rule.rules = null;
      }
      info.cssText = rule.parsedCssText;
      rule.propertyInfo = info;
      return info;
    };
    // collects the custom properties from a rule's cssText
        StyleProperties.prototype.collectProperties = function(rule, properties) {
      var info = rule.propertyInfo;
      if (!info) {
        var m = void 0;
        var cssText = rule.parsedCssText;
        var value = void 0;
        var a = void 0;
        while (m = VAR_ASSIGN.exec(cssText)) {
          // note: group 2 is var, 3 is mixin
          value = (m[2] || m[3]).trim();
          // value of 'inherit' or 'unset' is equivalent to not setting the property here
                    'inherit' === value && 'unset' === value || (properties[m[1].trim()] = value);
          a = true;
        }
        return a;
      }
      if (info.properties) {
        Object.assign(properties, info.properties);
        return true;
      }
    };
    // turns custom properties into realized values.
        StyleProperties.prototype.reify = function(props) {
      // big perf optimization here: reify only *own* properties
      // since this object has __proto__ of the element's scope properties
      var names = Object.getOwnPropertyNames(props);
      for (var i = 0, n = void 0; i < names.length; i++) {
        n = names[i];
        props[n] = this.valueForProperty(props[n], props);
      }
    };
    StyleProperties.prototype.hasNonNestedSemicolon = function(property) {
      return this.getParts(property).length > 2;
    };
    // given a property value, returns the reified value
    // a property value may be:
    // (1) a literal value like: red or 5px;
    // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
    // var(--a, var(--b));
        StyleProperties.prototype.valueForProperty = function(property, props) {
      var _this = this;
      // case (1) default
            if (property) {
        if (this.hasNonNestedSemicolon(property)) {
          property = this.valueForProperties(property, props);
        } else {
          // case (2) variable
          var fn = function(prefix, value, fallback, suffix) {
            if (!value) {
              return prefix + suffix;
            }
            var propertyValue = _this.valueForProperty(props[value], props);
            // if value is "initial", then the variable should be treated as unset
                        propertyValue && 'initial' !== propertyValue || (
            // fallback may be --a or var(--a) or literal
            propertyValue = _this.valueForProperty(props[fallback] || fallback, props) || fallback);
            return prefix + (propertyValue || '') + suffix;
          };
          property = processVariableAndFallback(property, fn);
        }
      }
      return property && property.trim() || '';
    };
    StyleProperties.prototype.sanitizeSemicolons = function(property, startIndex) {
      var openingParen = property.indexOf('(', startIndex);
      if (-1 === openingParen) {
        return property;
      }
      var closingParens = findMatchingParen(property, openingParen);
      var safeArea = property.substr(openingParen, closingParens - openingParen);
      var sanitizedSafeArea = safeArea.replace(';', this.SAFE_TOKEN);
      var safeProp = property.replace(safeArea, sanitizedSafeArea);
      return this.sanitizeSemicolons(safeProp, closingParens + 2);
    };
    StyleProperties.prototype.getParts = function(property) {
      var _this = this;
      var safeProp = this.sanitizeSemicolons(property, 0);
      return safeProp.split(';').map(function(part) {
        return part.replace(_this.SAFE_TOKEN, ';');
      });
    };
    // note: we do not yet support mixin within mixin
        StyleProperties.prototype.valueForProperties = function(property, props) {
      var parts = this.getParts(property);
      for (var i = 0, p = void 0; i < parts.length; i++) {
        if (p = parts[i]) {
          var colon = p.indexOf(':');
          if (-1 !== colon) {
            var pp = p.substring(colon);
            pp = pp.trim();
            pp = this.valueForProperty(pp, props) || pp;
            p = p.substring(0, colon) + pp;
          }
          parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? 
          // strip trailing ;
          p.slice(0, -1) : p || '';
        }
      }
      return parts.join(';');
    };
    // Test if the rules in these styles matches the given `element` and if so,
    // collect any custom properties into `props`.
        StyleProperties.prototype.propertyDataFromStyles = function(rules, element) {
      var _this = this;
      var props = {};
      // generates a unique key for these matches
            var o = [];
      // note: active rules excludes non-matching @media rules
            forEachRule(this.win, rules, function(rule) {
        // TODO(sorvell): we could trim the set of rules at declaration
        // time to only include ones that have properties
        rule.propertyInfo || _this.decorateRule(rule);
        // match element against transformedSelector: selector may contain
        // unwanted uniquification and parsedSelector does not directly match
        // for :host selectors.
                try {
          var selectorToMatch = rule.transformedSelector || rule.parsedSelector;
          if (element && rule.propertyInfo.properties && selectorToMatch && _this.matchesSelector.call(element, selectorToMatch)) {
            _this.collectProperties(rule, props);
            // produce numeric key for these matches for lookup
                        addToBitMask(rule.index, o);
          }
        } catch (e) {
          console.error(e);
        }
      }, null, true);
      return {
        properties: props,
        key: o
      };
    };
    StyleProperties.prototype.applyCustomStyle = function(style, properties) {
      var _this = this;
      var rules = rulesForStyle(style);
      style.textContent = toCssText(this.win, rules, function(rule) {
        var css = rule.cssText = rule.parsedCssText;
        if (rule.propertyInfo && rule.propertyInfo.cssText) {
          // remove property assignments
          // so next function isn't confused
          // NOTE: we have 3 categories of css:
          // (1) normal properties,
          // (2) custom property assignments (--foo: red;),
          // (3) custom property usage: border: var(--foo); @apply(--foo);
          // In elements, 1 and 3 are separated for efficiency; here they
          // are not and this makes this case unique.
          css = removeCustomPropAssignment(css);
          // replace with reified properties, scenario is same as mixin
                    rule.cssText = _this.valueForProperties(css, properties);
        }
      });
    };
    return StyleProperties;
  }();
  function addToBitMask(n, bits) {
    var o = parseInt(n / 32, 10);
    var v = 1 << n % 32;
    bits[o] = (bits[o] || 0) | v;
  }
  var VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
  var CustomStyle = /** @class */ function() {
    function CustomStyle(win, doc) {
      this.win = win;
      this.customStyles = [];
      this.enqueued = false;
      this.flushCallbacks = [];
      this.supportsCssVars = !!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'));
      if (!this.supportsCssVars) {
        this.documentOwner = doc.documentElement;
        var ast = new StyleNode();
        ast.rules = [];
        this.documentOwnerStyleInfo = StyleInfo.set(this.documentOwner, new StyleInfo(ast));
        this.styleProperties = new StyleProperties(win);
      }
    }
    CustomStyle.prototype.flushCustomStyles = function() {
      var customStyles = this.processStyles();
      // early return if custom-styles don't need validation
            if (!this.enqueued) {
        return;
      }
      this.updateProperties(this.documentOwner, this.documentOwnerStyleInfo);
      this.applyCustomStyles(customStyles);
      this.enqueued = false;
      while (this.flushCallbacks.length) {
        this.flushCallbacks.shift()();
      }
    };
    CustomStyle.prototype.applyCustomStyles = function(customStyles) {
      for (var i = 0; i < customStyles.length; i++) {
        var c = customStyles[i];
        var s = this.getStyleForCustomStyle(c);
        s && this.styleProperties.applyCustomStyle(s, this.documentOwnerStyleInfo.styleProperties);
      }
    };
    CustomStyle.prototype.updateProperties = function(host, styleInfo) {
      var owner = this.documentOwner;
      var ownerStyleInfo = StyleInfo.get(owner);
      var ownerProperties = ownerStyleInfo.styleProperties;
      var props = Object.create(ownerProperties || null);
      var propertyData = this.styleProperties.propertyDataFromStyles(ownerStyleInfo.styleRules, host);
      var propertiesMatchingHost = propertyData.properties;
      Object.assign(props, propertiesMatchingHost);
      this.styleProperties.reify(props);
      styleInfo.styleProperties = props;
    };
    CustomStyle.prototype.addStyle = function(style) {
      var _this = this;
      return new Promise(function(resolve) {
        if (style.__seen) {
          resolve();
        } else {
          style.__seen = true;
          _this.customStyles.push(style);
          _this.flushCallbacks.push(resolve);
          if (!_this.enqueued) {
            _this.enqueued = true;
            _this.win.requestAnimationFrame(function() {
              _this.enqueued && _this.flushCustomStyles();
            });
          }
        }
      });
    };
    CustomStyle.prototype.getStyleForCustomStyle = function(customStyle) {
      if (customStyle.__cached) {
        return customStyle.__cached;
      }
      return customStyle.getStyle ? customStyle.getStyle() : customStyle;
    };
    CustomStyle.prototype.processStyles = function() {
      var cs = this.customStyles;
      for (var i = 0; i < cs.length; i++) {
        var customStyle = cs[i];
        if (customStyle.__cached) {
          continue;
        }
        var style = this.getStyleForCustomStyle(customStyle);
        if (style) {
          this.transformCustomStyleForDocument(style);
          customStyle.__cached = style;
        }
      }
      return cs;
    };
    CustomStyle.prototype.transformCustomStyleForDocument = function(style) {
      var ast = rulesForStyle(style);
      this.documentOwnerStyleInfo.styleRules.rules.push(ast);
    };
    return CustomStyle;
  }();
  function initCssVarShim(win, doc, customStyle, callback) {
    customStyle.supportsCssVars ? callback() : win.requestAnimationFrame(function() {
      var promises = [];
      var linkElms = doc.querySelectorAll('link[rel="stylesheet"][href]');
      for (var i = 0; i < linkElms.length; i++) {
        promises.push(loadLinkStyles(doc, customStyle, linkElms[i]));
      }
      var styleElms = doc.querySelectorAll('style');
      for (i = 0; i < styleElms.length; i++) {
        promises.push(customStyle.addStyle(styleElms[i]));
      }
      Promise.all(promises).then(function() {
        callback();
      });
    });
  }
  function loadLinkStyles(doc, customStyle, linkElm) {
    var url = linkElm.href;
    return fetch(url).then(function(rsp) {
      return rsp.text();
    }).then(function(text) {
      if (hasCssVariables(text)) {
        var styleElm = doc.createElement('style');
        hasRelativeUrls(text) && (text = fixRelativeUrls(text, url));
        styleElm.innerHTML = text;
        linkElm.parentNode.insertBefore(styleElm, linkElm);
        return customStyle.addStyle(styleElm).then(function() {
          linkElm.parentNode.removeChild(linkElm);
        });
      }
      return Promise.resolve();
    }).catch(function(err) {
      console.error(err);
    });
  }
  // This regexp tries to determine when a variable is declared, for example:
  //
  // .my-el { --highlight-color: green; }
  //
  // but we don't want to trigger when a classname uses "--" or a pseudo-class is
  // used. We assume that the only characters that can preceed a variable
  // declaration are "{", from an opening block, ";" from a preceeding rule, or a
  // space. This prevents the regexp from matching a word in a selector, since
  // they would need to start with a "." or "#". (We assume element names don't
  // start with "--").
    var CSS_VARIABLE_REGEXP = /[\s;{]--[-a-zA-Z0-9]+\s*:/m;
  function hasCssVariables(css) {
    return css.indexOf('var(') > -1 || CSS_VARIABLE_REGEXP.test(css);
  }
  // This regexp find all url() usages with relative urls
    var CSS_URL_REGEXP = /url[\s]*\([\s]*['"]?(?!http)([^\'\"\)]*)[\s]*['"]?\)[\s]*/gim;
  function hasRelativeUrls(css) {
    return CSS_URL_REGEXP.test(css);
  }
  function fixRelativeUrls(css, originalUrl) {
    //Get the basepath from the original import url
    var basePath = originalUrl.replace(/[^/]*$/, '');
    //Replace the relative url, with the new relative url
        return css.replace(CSS_URL_REGEXP, function(fullMatch, url) {
      //The new relative path is the base path + uri
      //TODO: normalize relative URL
      var relativeUrl = basePath + url;
      return fullMatch.replace(url, relativeUrl);
    });
  }
  function createPlatformMainLegacy(namespace, Context, win, doc, resourcesUrl, hydratedCssClass) {
    var cmpRegistry = {
      'html': {}
    };
    var bundleQueue = [];
    var loadedBundles = {};
    var pendingBundleRequests = {};
    var controllerComponents = {};
    var App = win[namespace] = win[namespace] || {};
    var domApi = createDomApi(App, win, doc);
    // set App Context
        Context.isServer = Context.isPrerender = !(Context.isClient = true);
    Context.window = win;
    Context.location = win.location;
    Context.document = doc;
    Context.resourcesUrl = Context.publicPath = resourcesUrl;
    false;
    false;
    // add the h() fn to the app's global namespace
    App.h = h;
    App.Context = Context;
    // keep a global set of tags we've already defined
        var globalDefined = win.$definedCmps = win.$definedCmps || {};
    // internal id increment for unique ids
        var ids = 0;
    // create the platform api which is used throughout common core code
        var plt = {
      domApi: domApi,
      defineComponent: defineComponent,
      emitEvent: Context.emit,
      getComponentMeta: function(elm) {
        return cmpRegistry[domApi.$tagName(elm)];
      },
      getContextItem: function(contextKey) {
        return Context[contextKey];
      },
      isClient: true,
      isDefinedComponent: function(elm) {
        return !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm));
      },
      onError: function(err, type, elm) {
        return console.error(err, type, elm && elm.tagName);
      },
      nextId: function() {
        return namespace + ids++;
      },
      propConnect: function(ctrlTag) {
        return proxyController(domApi, controllerComponents, ctrlTag);
      },
      queue: Context.queue = createQueueClient(App, win),
      requestBundle: requestBundle,
      ancestorHostElementMap: new WeakMap(),
      componentAppliedStyles: new WeakMap(),
      hasConnectedMap: new WeakMap(),
      hasListenersMap: new WeakMap(),
      hasLoadedMap: new WeakMap(),
      hostElementMap: new WeakMap(),
      hostSnapshotMap: new WeakMap(),
      instanceMap: new WeakMap(),
      isDisconnectedMap: new WeakMap(),
      isQueuedForUpdate: new WeakMap(),
      onReadyCallbacksMap: new WeakMap(),
      queuedEvents: new WeakMap(),
      vnodeMap: new WeakMap(),
      valuesMap: new WeakMap()
    };
    // create the renderer that will be used
        plt.render = createRendererPatch(plt, domApi);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
        var rootElm = domApi.$documentElement;
    rootElm['s-ld'] = [];
    rootElm['s-rn'] = true;
    // this will fire when all components have finished loaded
        rootElm['s-init'] = function() {
      plt.hasLoadedMap.set(rootElm, App.loaded = plt.isAppLoaded = true);
      domApi.$dispatchEvent(win, 'appload', {
        detail: {
          namespace: namespace
        }
      });
    };
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
        createVNodesFromSsr(plt, domApi, rootElm);
    function defineComponent(cmpMeta, HostElementConstructor) {
      if (!globalDefined[cmpMeta.tagNameMeta]) {
        // keep a map of all the defined components
        globalDefined[cmpMeta.tagNameMeta] = true;
        // initialize the members on the host element prototype
                initHostElement(plt, cmpMeta, HostElementConstructor.prototype, hydratedCssClass);
        true;
        // add which attributes should be observed
        var observedAttributes = [];
        // at this point the membersMeta only includes attributes which should
        // be observed, it does not include all props yet, so it's safe to
        // loop through all of the props (attrs) and observed them
                for (var propName in cmpMeta.membersMeta) {
          cmpMeta.membersMeta[propName].attribName && observedAttributes.push(
          // add this attribute to our array of attributes we need to observe
          cmpMeta.membersMeta[propName].attribName);
        }
        // set the array of all the attributes to keep an eye on
        // https://www.youtube.com/watch?v=RBs21CFBALI
                HostElementConstructor.observedAttributes = observedAttributes;
        // define the custom element
        win.customElements.define(cmpMeta.tagNameMeta, HostElementConstructor);
      }
    }
    function setLoadedBundle(bundleId, value) {
      loadedBundles[bundleId] = value;
    }
    function getLoadedBundle(bundleId) {
      if (null == bundleId) {
        return null;
      }
      return loadedBundles[bundleId.replace(/^\.\//, '')];
    }
    function isLoadedBundle(id) {
      if ('exports' === id || 'require' === id) {
        return true;
      }
      return !!getLoadedBundle(id);
    }
    /**
         * Execute a bundle queue item
         * @param name
         * @param deps
         * @param callback
         */    function execBundleCallback(name, deps, isComponent, callback) {
      var bundleExports = {};
      try {
        callback.apply(null, deps.map(function(d) {
          if ('exports' === d) {
            return bundleExports;
          }
          if ('require' === d) {
            return userRequire;
          }
          return getLoadedBundle(d);
        }));
      } catch (e) {
        console.error(e);
      }
      // If name is undefined then this callback was fired by component callback
            if (void 0 === name) {
        return;
      }
      setLoadedBundle(name, bundleExports);
      // If name contains chunk then this callback was associated with a dependent bundle loading
      // let's add a reference to the constructors on each components metadata
      // each key in moduleImports is a PascalCased tag name
            isComponent && Object.keys(bundleExports).forEach(function(pascalCasedTagName) {
        var normalizedTagName = pascalCasedTagName.replace(/-/g, '').toLowerCase();
        var registryTags = Object.keys(cmpRegistry);
        for (var i = 0; i < registryTags.length; i++) {
          var normalizedRegistryTag = registryTags[i].replace(/-/g, '').toLowerCase();
          if (normalizedRegistryTag === normalizedTagName) {
            var cmpMeta = cmpRegistry[registryTags[i]];
            if (cmpMeta) {
              // get the component constructor from the module
              cmpMeta.componentConstructor = bundleExports[pascalCasedTagName];
              initStyleTemplate(domApi, cmpMeta, cmpMeta.componentConstructor);
            }
            break;
          }
        }
      });
    }
    function userRequire(ids, resolve) {
      loadBundle(void 0, ids, resolve, false);
    }
    /**
         * Check to see if any items in the bundle queue can be executed
         */    function checkQueue() {
      for (var i = bundleQueue.length - 1; i > -1; i--) {
        var _a = bundleQueue[i], bundleId = _a[0], dependentsList = _a[1], isComponent = _a[2], importer = _a[3];
        dependentsList.every(function(dep) {
          return isLoadedBundle(dep);
        }) && !isLoadedBundle(bundleId) && execBundleCallback(bundleId, dependentsList, isComponent, importer);
      }
    }
    /**
         * This function is called anytime a JS file is loaded
         */    function loadBundle(bundleId, dependentsList, importer, isComponent) {
      void 0 === isComponent && (isComponent = !bundleId.startsWith('chunk'));
      var missingDependents = dependentsList.filter(function(d) {
        return !isLoadedBundle(d);
      });
      missingDependents.forEach(function(d) {
        requestUrl(resourcesUrl + d.replace('.js', '.es5.js'));
      });
      bundleQueue.push([ bundleId, dependentsList, isComponent, importer ]);
      // If any dependents are not yet met then queue the bundle execution
            0 === missingDependents.length && checkQueue();
    }
    App.loadBundle = loadBundle;
    var customStyle;
    var requestBundleQueue = [];
    true;
    customStyle = new CustomStyle(win, doc);
    initCssVarShim(win, doc, customStyle, function() {
      // loaded all the css, let's run all the request bundle callbacks
      while (requestBundleQueue.length) {
        requestBundleQueue.shift()();
      }
      // set to null to we know we're loaded
            requestBundleQueue = null;
    });
    // This is executed by the component's connected callback.
    function requestBundle(cmpMeta, elm) {
      // set the "mode" property
      elm.mode || (
      // looks like mode wasn't set as a property directly yet
      // first check if there's an attribute
      // next check the app's global
      elm.mode = domApi.$getAttribute(elm, 'mode') || Context.mode);
      // remember a "snapshot" of this host element's current attributes/child nodes/slots/etc
            initHostSnapshot(plt.domApi, cmpMeta, elm);
      var bundleId = 'string' === typeof cmpMeta.bundleIds ? cmpMeta.bundleIds : cmpMeta.bundleIds[elm.mode];
      if (getLoadedBundle(bundleId)) {
        // sweet, we've already loaded this bundle
        queueUpdate(plt, elm);
      } else {
        // never seen this bundle before, let's start the request
        // and add it to the callbacks to fire when it has loaded
        bundleQueue.push([ void 0, [ bundleId ], false, function() {
          queueUpdate(plt, elm);
        } ]);
        // when to request the bundle depends is we're using the css shim or not
                true, customStyle.supportsCssVars ? 
        // not using css shim, so no need to wait on css shim to finish
        // figure out which bundle to request and kick it off
        requestComponentBundle(cmpMeta, bundleId) : 
        // using css shim, so we've gotta wait until it's ready
        requestBundleQueue ? 
        // add this to the loadBundleQueue to run when css is ready
        requestBundleQueue.push(function() {
          requestComponentBundle(cmpMeta, bundleId);
        }) : 
        // css already all loaded
        requestComponentBundle(cmpMeta, bundleId);
      }
    }
    function requestComponentBundle(cmpMeta, bundleId) {
      // create the url we'll be requesting
      // always use the es5/jsonp callback module
      requestUrl(resourcesUrl + bundleId + (useScopedCss(domApi.$supportsShadowDom, cmpMeta) ? '.sc' : '') + '.es5.js');
    }
    // Use JSONP to load in bundles
        function requestUrl(url) {
      var tmrId;
      var scriptElm;
      function onScriptComplete() {
        clearTimeout(tmrId);
        scriptElm.onerror = scriptElm.onload = null;
        domApi.$remove(scriptElm);
        // remove from our list of active requests
                pendingBundleRequests[url] = false;
      }
      if (!pendingBundleRequests[url]) {
        // we're not already actively requesting this url
        // let's kick off the bundle request and
        // remember that we're now actively requesting this url
        pendingBundleRequests[url] = true;
        // create a sript element to add to the document.head
                scriptElm = domApi.$createElement('script');
        scriptElm.charset = 'utf-8';
        scriptElm.async = true;
        scriptElm.src = url;
        // create a fallback timeout if something goes wrong
                tmrId = setTimeout(onScriptComplete, 12e4);
        // add script completed listener to this script element
                scriptElm.onerror = scriptElm.onload = onScriptComplete;
        // inject a script tag in the head
        // kick off the actual request
                domApi.$appendChild(domApi.$head, scriptElm);
      }
    }
    true;
    plt.attachStyles = function(plt, domApi, cmpMeta, modeName, elm) {
      attachStyles(plt, domApi, cmpMeta, modeName, elm, customStyle);
    };
    true;
    generateDevInspector(App, namespace, window, plt);
    // register all the components now that everything's ready
    (App.components || []).map(function(data) {
      return parseComponentLoader(data, cmpRegistry);
    }).forEach(function(cmpMeta) {
      // es5 way of extending HTMLElement
      function HostElement(self) {
        return HTMLElement.call(this, self);
      }
      HostElement.prototype = Object.create(HTMLElement.prototype, {
        constructor: {
          value: HostElement,
          configurable: true
        }
      });
      plt.defineComponent(cmpMeta, HostElement);
    });
    // create the componentOnReady fn
        initCoreComponentOnReady(plt, App);
    // notify that the app has initialized and the core script is ready
    // but note that the components have not fully loaded yet
        App.initialized = true;
  }
  true;
  // es5 build which does not use es module imports or dynamic imports
  // and requires the es5 way of extending HTMLElement
  createPlatformMainLegacy(namespace, Context, window, document, resourcesUrl, hydratedCssClass);
})(window, document, Context, namespace);
})({},"JsDevConsole","hydrated");