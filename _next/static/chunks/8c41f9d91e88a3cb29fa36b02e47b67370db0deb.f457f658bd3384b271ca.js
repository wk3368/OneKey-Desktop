(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[19],{"+ut1":function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return u})),r.d(t,"c",(function(){return a})),r.d(t,"d",(function(){return i.c}));var o=r("ERkP"),n=r("4Vpd"),c=r("eCku");const s=e=>{const{0:t,1:r}=Object(o.useState)([]),{device:s,accountsState:u}=Object(n.k)((e=>({device:e.suite.device,accountsState:e.wallet.accounts})));return Object(o.useEffect)((()=>{if(s){const t=c.n(s.state,u),o=e?c.q(e):[],n=c.A(t.concat(o));r(n)}}),[s,e,u]),{accounts:t}},u=()=>{const{device:e,accounts:t}=Object(n.k)((e=>({device:e.suite.device,accounts:e.wallet.accounts})));return Object(o.useMemo)((()=>e?c.n(e.state,t):[]),[t,e])},a=()=>{const{fiat:e,localCurrency:t}=Object(n.k)((e=>({fiat:e.wallet.fiat,localCurrency:e.wallet.settings.localCurrency})));return{fiat:e,localCurrency:t}};var i=r("KwZe")},KwZe:function(e,t,r){"use strict";r.d(t,"a",(function(){return h})),r.d(t,"b",(function(){return P})),r.d(t,"c",(function(){return D}));var o=r("zjfJ"),n=r("ERkP"),c=r("geiN"),s=r("4Vpd"),u=r("Rv+5"),a=r("W29j"),i=r("aQMI"),l=r("NJYH"),p=r("QO0o");function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=r("V/3t");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=r("+8Xb");function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=r("Atbx");function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const h=Object(n.createContext)(null);h.displayName="SendContext";const k=e=>{const{account:t,network:r}=e.selectedAccount,{symbol:o,networkType:n}=t,c=e.fees[o],s=Object(p.i)(n,c);return{account:t,network:r,coinFees:c,feeInfo:C(C({},c),{},{levels:s}),feeOutdated:!1,fiatRates:e.fiat.coins.find((e=>e.symbol===o)),localCurrencyOption:{value:e.localCurrency,label:e.localCurrency.toUpperCase()},isLoading:!1,isDirty:!1,online:e.online}},P=e=>{const{0:t,1:r}=Object(n.useState)(k(e)),o=Object(n.useRef)(void 0),{getDraft:f,saveDraft:d,removeDraft:m,getLastUsedFeeLevel:w,setLastUsedFeeLevel:h,signTransaction:P}=Object(s.b)({getDraft:u.d,saveDraft:u.h,removeDraft:u.g,getLastUsedFeeLevel:a.e,setLastUsedFeeLevel:a.h,signTransaction:u.k}),{localCurrencyOption:D}=t,L=Object(c.c)({mode:"onChange",shouldUnregister:!1}),{control:R,reset:E,register:F,getValues:x,errors:S}=L,V=Object(c.b)({control:R,name:"outputs"}),q=Object(n.useCallback)((e=>{const r={};if(!e||!e.selectedFee){const e=w();e&&(r.selectedFee=e.label,"custom"===e.label&&(r.feePerUnit=e.feePerUnit,r.feeLimit=e.feeLimit))}return C(C(C({},((e,t)=>{var r;return C(C({},i.f),{},{options:Object(l.a)("RBF")&&null!==(r=t.features)&&void 0!==r&&r.includes("rbf")?["bitcoinRBF","broadcast"]:["broadcast"],outputs:[C(C({},i.e),{},{currency:e})]})})(D,t.network)),e),r)}),[w,D,t.network]),I=Object(n.useCallback)((e=>{r(C(C({},t),e))}),[t]),M=(({control:e,getValues:t,setValue:r,clearErrors:o,fiatRates:c})=>{const s=Object(n.useCallback)(((e,o)=>{const{outputs:n}=t(),s=n?n[e]:void 0;if(!s||"payment"!==s.type)return;const{fiat:u,currency:a}=s;if("string"!==typeof u)return;const i=`outputs[${e}].fiat`;if(!o)return void(u.length>0&&r(i,""));if(!c||!c.current)return;const l=Object(O.b)(o,a.value,c.current.rates);l&&r(i,l,{shouldValidate:!0})}),[t,r,c]),u=Object(n.useCallback)(((e,t)=>{r(`outputs[${e}].amount`,t,{shouldValidate:t.length>0,shouldDirty:!0}),s(e,t)}),[s,r]),a=Object(n.useCallback)(((e,t)=>{o([`outputs[${e}].amount`,`outputs[${e}].fiat`]),t||(r(`outputs[${e}].amount`,""),r(`outputs[${e}].fiat`,"")),r("setMaxOutputId",t?void 0:e)}),[o,r]),i=Object(n.useCallback)((t=>{const{current:n}=e.defaultValuesRef;n&&n[t]&&(n[t]=""),r(t,""),o(t)}),[e,r,o]);return{calculateFiat:s,setAmount:u,resetDefaultValue:i,setMax:a,getDefaultValue:(e,r)=>{if(void 0!==r){const o=t(e);return void 0!==o?o:r}return t(e)},toggleOption:e=>{if(!Object(l.a)("RBF")&&"bitcoinRBF"===e)return;const o=t("options")||[],n=o.includes(e);r("options",n?o.filter((t=>t!==e)):[...o,e])}}})(C(C({},L),{},{fiatRates:t.fiatRates})),{composeDraft:T,draftSaveRequest:U,setDraftSaveRequest:$,composeRequest:A,composedLevels:B,setComposedLevels:N,onFeeLevelChange:J}=(({getValues:e,setValue:t,setError:r,errors:o,clearErrors:c,state:a,account:i,updateContext:l,setAmount:f})=>{const{0:b,1:O}=Object(n.useState)(void 0),d=Object(n.useRef)(void 0),j=Object(n.useRef)(0),{0:m,1:v}=Object(n.useState)(void 0),{0:g,1:w}=Object(n.useState)(!1),C=Object(s.d)(),{composeTransaction:h}=Object(s.b)({composeTransaction:u.b}),k=Object(n.useCallback)((async e=>{l({isLoading:!0,isDirty:!0}),O(void 0);const t=await h(e,a);O(t),l({isLoading:!1,isDirty:!0})}),[a,h,l]),P=Object(n.useCallback)((async()=>{const t=j.current,r=await C((async()=>{if(Object.keys(o).length>0)return;const t=e();return w(!0),h(t,a)}));t===j.current&&(r&&O(r),l({isLoading:!1}))}),[a,l,C,o,e,h]);Object(n.useEffect)((()=>{d.current&&(P(),d.current=void 0)}),[d,P]);const D=Object(n.useCallback)((n=>{const s=e();if("error"===n.type){const{error:e,errorMessage:t}=n;return t?void(m?r(m,{type:"compose",message:t}):s.outputs&&s.outputs.forEach(((e,o)=>{r(`outputs[${o}].amount`,{type:"compose",message:t})}))):void console.warn("Compose unexpected error",e)}const u=Object(p.d)(o);u.length>0&&c(u),t("estimatedFeeLimit",n.estimatedFeeLimit);const{setMaxOutputId:a}=s;"number"===typeof a&&n.max&&(f(a,n.max),w(!0))}),[m,e,f,o,r,c,t]);Object(n.useEffect)((()=>{if(!b)return;const r=e(),{selectedFee:o,setMaxOutputId:n}=r;let c=b[o||"normal"];if((!o||"number"===typeof n&&"custom"!==o)&&"error"===c.type){const e=Object.keys(b).find((e=>"error"!==b[e].type));if(e){if(c=b[e],t("selectedFee",e),"custom"===e){const{feePerByte:e,feeLimit:r}=c;t("feePerUnit",e),t("feeLimit",r)}w(!0)}}c&&D(c)}),[b,e,t,D]);const L=Object(n.useCallback)(((e,t)=>{if(b){if("custom"===t){const t=b[e||"normal"];O(y(y({},b),{},{custom:t}))}else{const e=b[t||"normal"];D(e)}l({isDirty:!0}),w(!0)}}),[b,D,l]);return Object(n.useEffect)((()=>{if(a.account===i)return;if(!a.isDirty)return void l({account:i});O(void 0),d.current="outputs[0].amount",j.current++;const e=Object(p.d)(o);e.length>0&&c(e),l({account:i,isLoading:!0})}),[a.account,a.isDirty,i,c,o,l]),{composeDraft:k,composeRequest:(e="outputs[0].amount")=>{O(void 0),d.current=e,j.current++;const t=Object(p.d)(o);t.length>0&&c(t),v(e),l({isLoading:!0,isDirty:!0})},draftSaveRequest:g,setDraftSaveRequest:w,composedLevels:b,setComposedLevels:O,onFeeLevelChange:L}})(C(C({},L),{},{state:t,account:e.selectedAccount.account,updateContext:I,setAmount:M.setAmount})),_=(({outputsFieldArray:e,register:t,unregister:r,getValues:o,setValue:c,reset:s,clearErrors:u,localCurrencyOption:a,composeRequest:l})=>{const p=Object(n.useCallback)((()=>{e.append(b(b({},i.e),{},{currency:a}))}),[a,e]),f=Object(n.useCallback)((t=>{const r=o(),{setMaxOutputId:n}=r;n===t&&c("setMaxOutputId",void 0),"number"===typeof n&&n>t&&c("setMaxOutputId",n-1),c(`outputs[${t}]`,i.e),e.remove(t)}),[o,c,e]),{fields:O}=e;return Object(n.useEffect)((()=>(O.forEach(((e,r)=>{t({name:`outputs[${r}].type`,type:"custom"}),c(`outputs[${r}].type`,e.type)})),()=>{O.forEach(((e,t)=>{r(`outputs[${t}].type`)}))})),[O,t,r,c]),{addOutput:p,removeOutput:f,addOpReturn:()=>{const t=o(),r=t.outputs[t.outputs.length-1];r.address.length>0||r.amount.length>0?e.append(b({},i.d)):s(b(b({},t),{},{outputs:[i.d]}),{errors:!0})},removeOpReturn:e=>{const t=o();t.outputs.length>1?f(e):(u("outputs[0]"),s(b(b({},t),{},{outputs:[b(b({},i.e),{},{currency:a})]}),{errors:!0})),l("outputs[0].amount")}}})(C(C({},L),{},{outputsFieldArray:V,localCurrencyOption:D,composeRequest:A})),{changeFeeLevel:K}=Object(g.a)(C({defaultValue:void 0,feeInfo:t.feeInfo,saveLastUsedFee:!0,onChange:J,composedLevels:B,composeRequest:A},L)),Q=Object(n.useCallback)((()=>{N(void 0),m(),h(),r(k(e))}),[e,m,h,N]),{importTransaction:Z}=(({network:e,tokens:t,localCurrencyOption:r,fiatRates:o})=>{const{importRequest:n}=Object(s.b)({importRequest:u.e});return{importTransaction:async()=>{const c=await n();if(!c)return;const s=c.map((n=>{const c=v(v({},i.e),{},{currency:r,address:n.address||""});if(n.currency){const r=n.currency.toLowerCase();if(r===e.symbol)c.amount=n.amount||"",o&&o.current&&(c.fiat=Object(O.b)(c.amount,c.currency.value,o.current.rates)||"");else if(j.b.currencies.find((e=>e===r))&&o&&o.current&&Object.keys(o.current.rates).includes(r))c.currency={value:r,label:r.toUpperCase()},c.fiat=n.amount||"",c.amount=Object(O.a)(c.fiat,r,o.current.rates,e.decimals)||"";else if(t){const e=t.find((e=>e.symbol===r));e&&(c.token=e.address,c.amount=n.amount||"")}c.amount&&c.fiat||console.warn("import error",r,c)}return c}));return"bitcoin"===e.networkType?s:[s[0]]}}})({network:t.network,tokens:t.account.tokens,fiatRates:t.fiatRates,localCurrencyOption:D}),z=Object(n.useCallback)((async()=>{const e=x(),t=B?B[e.selectedFee||"normal"]:void 0;if(t&&"final"===t.type){I({isLoading:!0});const r=await P(e,t);I({isLoading:!1}),r&&Q()}}),[x,B,P,Q,I]),H=Object(n.useCallback)((e=>F(e)),[F]);return Object(n.useEffect)((()=>{const e=f(),t=q(e);E(t),e&&(o.current=e)}),[f,q,E]),Object(n.useEffect)((()=>{F({name:"setMaxOutputId",type:"custom"}),F({name:"options",type:"custom"})}),[F]),Object(n.useEffect)((()=>{o.current&&(T(o.current),o.current=void 0)}),[o,T]),Object(n.useEffect)((()=>{U&&(0===Object.keys(S).length&&d(x()),$(!1))}),[U,$,d,x,S]),C(C(C(C({},t),L),{},{register:H,outputs:V.fields,composedLevels:B,updateContext:I,resetContext:Q,changeFeeLevel:K,composeTransaction:A,loadTransaction:async()=>{const e=await Z();if(!e)return;N(void 0);const t=q({outputs:e});E(t),I({isLoading:!1,isDirty:!0});await R.trigger()&&A()},signTransaction:z},M),_)},D=()=>{const e=Object(n.useContext)(h);if(null===e)throw Error("useSendFormContext used without Context");return e}}}]);
//# sourceMappingURL=8c41f9d91e88a3cb29fa36b02e47b67370db0deb.f457f658bd3384b271ca.js.map