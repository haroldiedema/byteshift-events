!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).ByteshiftEvents={})}(this,(function(e){"use strict";class t{constructor(e,t,s,i=!1){this.emitter=e,this.name=t,this.callback=s,this.isOnce=i}emit(...e){this.callback(...e),this.isOnce&&this.emitter.off(this)}unsubscribe(){this.emitter.off(this)}}e.EventEmitter=class{constructor(){this._events=new Map,this._emitted=new Set}once(e,t){return this.on(e,t,!0)}on(e,s,i){this._events.has(e)||this._events.set(e,new Set);const n=new t(this,e,s,i);return this._events.get(e).add(n),n}off(e){this._events.has(e.name)&&this._events.get(e.name).delete(e)}emit(e,...t){this._events.has(e)?(this._events.get(e).forEach((e=>e.emit(...t))),this._emitted.add(e)):this._emitted.add(e)}async when(e){return this._emitted.has(e)?Promise.resolve():new Promise((t=>{this.once(e,(()=>t()))}))}},e.EventSubscriber=t,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.js.map