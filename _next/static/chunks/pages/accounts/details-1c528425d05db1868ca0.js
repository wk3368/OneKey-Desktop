_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[38],{FgHO:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/accounts/details",function(){return a("fuZc")}])},fuZc:function(t,e,a){"use strict";a.r(e);var i=a("uDfI"),n=a("9OUN"),_=a("Tdcs"),c=a("ERkP"),d=a.n(c),l=a("j/s1"),o=a("nRYI"),T=a("9+6G"),s=a("4Vpd"),u=a("r1NI"),p=a("eCku"),E=a("Y3DR"),C=a("Tlkh"),r=a("Nr8f"),A=d.a.createElement;const P=l.default.div.withConfig({displayName:"details__AccountTypeLabel"})(["display:flex;align-items:center;justify-content:center;line-height:20px;div:first-child{padding-right:8px;}"]),R=Object(l.default)(u.f).withConfig({displayName:"details__StyledCard"})(["flex-direction:column;padding-top:",";padding-bottom:",";"],r.a,r.a),N=Object(l.default)(E.e).withConfig({displayName:"details__StyledRow"})(["padding-top:0;"]);var b=({selectedAccount:t,openModal:e})=>{const{device:a,isLocked:i}=Object(s.e)();if(!a||"loaded"!==t.status)return A(T.s,{title:"TR_ACCOUNT_DETAILS_HEADER",account:t});const{account:n}=t,_=!!a.authConfirm,c=Object(p.m)(n.accountType),d=Object(p.p)(n.path);let l="TR_ACCOUNT_DETAILS_TYPE_P2PKH",r="TR_ACCOUNT_TYPE_P2PKH",b=C.WIKI_P2PHK_URL;return"bech32"===d&&(l="TR_ACCOUNT_DETAILS_TYPE_BECH32",r="TR_ACCOUNT_TYPE_BECH32",b=C.WIKI_BECH32_URL),"p2sh"===d&&(l="TR_ACCOUNT_DETAILS_TYPE_P2SH",r="TR_ACCOUNT_TYPE_P2SH",b=C.WIKI_P2SH_URL),A(T.s,{title:"TR_ACCOUNT_DETAILS_HEADER",account:t},A(R,{title:A(u.J,{id:"TR_ACCOUNT_DETAILS_HEADER"}),largePadding:!0},A(N,null,A(E.h,{title:A(u.J,{id:"TR_ACCOUNT_DETAILS_TYPE_HEADER"}),description:A(u.J,{id:l}),learnMore:b}),A(P,null,A(o.P,{size:"small"},A(u.J,{id:c})),A(o.P,{size:"tiny"},A(u.J,{id:r})))),A(E.e,null,A(E.h,{title:A(u.J,{id:"TR_ACCOUNT_DETAILS_XPUB_HEADER"}),description:A(u.J,{id:"TR_ACCOUNT_DETAILS_XPUB"}),learnMore:C.WIKI_XPUB_URL}),A(E.b,null,A(E.a,{variant:"secondary","data-test":"@wallets/details/show-xpub-button",onClick:()=>e({type:"xpub",xpub:n.descriptor,accountPath:n.path,accountIndex:n.index,accountType:n.accountType,symbol:n.symbol,accountLabel:n.metadata.accountLabel}),isLoading:i()&&!_,isDisabled:_},A(u.J,{id:"TR_ACCOUNT_DETAILS_XPUB_BUTTON"}))))))};var O=Object(i.b)((t=>({selectedAccount:t.wallet.selectedAccount})),(t=>Object(n.b)({openModal:_.openModal},t)))(b);e.default=O}},[["FgHO",0,1,7,13,10,3,15,8,11,9,14,6,12,5,16,2,4]]]);
//# sourceMappingURL=details-1c528425d05db1868ca0.js.map