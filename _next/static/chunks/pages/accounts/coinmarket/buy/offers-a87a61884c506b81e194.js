_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[33],{"7FeR":function(e,t,i){"use strict";i.r(t);var a=i("cxan"),n=i("zjfJ"),r=i("ERkP"),o=i.n(r),l=i("uDfI"),d=i("9+6G"),s=i("j/s1"),u=i("uDP8"),c=i("4Vpd"),f=i("Il6f"),p=i("gzvV"),m=i("yXEX"),_=i("aNLf"),y=i("4iMl"),g=i("Rm8+"),b=i("BUnG");function O(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function v(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?O(Object(i),!0).forEach((function(t){Object(n.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):O(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}const E=Object(r.createContext)(null);E.displayName="CoinmarketBuyOffersContext";const x=()=>{const e=Object(r.useContext)(E);if(null===e)throw Error("CoinmarketBuyOffersContext used without Context");return e};var h=i("nRYI"),N=i("r1NI"),C=i("hxOz"),R=o.a.createElement;const T=s.default.div.withConfig({displayName:"Quote__Wrapper"})(["display:flex;flex-direction:column;border-radius:6px;flex:1;width:100%;min-height:150px;padding-bottom:16px;background:",";"],(e=>e.theme.BG_WHITE)),w=s.default.div.withConfig({displayName:"Quote__TagRow"})(["display:flex;min-height:30px;"]),I=(s.default.div.withConfig({displayName:"Quote__Tag"})(["margin-top:10px;height:35px;margin-left:-20px;border:1px solid tan;text-transform:uppercase;"]),s.default.div.withConfig({displayName:"Quote__Main"})(["display:flex;margin:0 30px;justify-content:space-between;padding-bottom:20px;border-bottom:1px solid ",";@media screen and (max-width:","){flex-direction:column;}"],(e=>e.theme.STROKE_GREY),h.variables.SCREEN_SIZE.SM)),S=s.default.div.withConfig({displayName:"Quote__Left"})(["display:flex;font-size:",";"],h.variables.FONT_SIZE.H2),j=s.default.div.withConfig({displayName:"Quote__Right"})(["display:flex;justify-content:flex-end;@media screen and (max-width:","){justify-content:center;padding-top:10px;}"],h.variables.SCREEN_SIZE.SM),A=s.default.div.withConfig({displayName:"Quote__Details"})(["display:flex;min-height:20px;flex-wrap:wrap;padding:10px 30px;@media screen and (max-width:","){flex-direction:column;}"],h.variables.SCREEN_SIZE.SM),F=s.default.div.withConfig({displayName:"Quote__Column"})(["display:flex;padding:10px 0;flex:1;flex-direction:column;justify-content:flex-start;"]),L=s.default.div.withConfig({displayName:"Quote__Heading"})(["display:flex;text-transform:uppercase;color:",";font-weight:",";padding-bottom:9px;"],(e=>e.theme.TYPE_LIGHT_GREY),h.variables.FONT_WEIGHT.DEMI_BOLD),Y=Object(s.default)(h.Button).withConfig({displayName:"Quote__StyledButton"})(["width:180px;@media screen and (max-width:","){width:100%;}"],h.variables.SCREEN_SIZE.SM),D=s.default.div.withConfig({displayName:"Quote__Value"})(["display:flex;align-items:center;color:",";font-weight:",";"],(e=>e.theme.TYPE_DARK_GREY),h.variables.FONT_WEIGHT.MEDIUM),B=s.default.div.withConfig({displayName:"Quote__Footer"})(["margin:0 30px;padding:10px 0;padding-top:23px;color:",";border-top:1px solid ",";font-weight:",";font-size:",";"],(e=>e.theme.TYPE_LIGHT_GREY),(e=>e.theme.STROKE_GREY),h.variables.FONT_WEIGHT.MEDIUM,h.variables.FONT_SIZE.SMALL),G=s.default.div.withConfig({displayName:"Quote__ErrorFooter"})(["display:flex;margin:0 30px;padding:10px 0;border-top:1px solid ",";color:",";"],(e=>e.theme.STROKE_GREY),(e=>e.theme.TYPE_RED)),P=Object(s.default)(h.Icon).withConfig({displayName:"Quote__StyledIcon"})(["padding-top:8px;"]),M=s.default.div.withConfig({displayName:"Quote__IconWrapper"})(["padding-right:3px;"]),U=s.default.div.withConfig({displayName:"Quote__ErrorText"})([""]),Q=Object(s.default)(N.B).withConfig({displayName:"Quote__StyledQuestionTooltip"})(["padding-left:4px;color:",";"],(e=>e.theme.TYPE_LIGHT_GREY));var k=({className:e,quote:t,wantCrypto:i})=>{const a=Object(h.useTheme)(),{selectQuote:n,providersInfo:r}=x(),{paymentMethod:o,exchange:l,error:s}=t;return R(T,{className:e},R(w,null,!1),R(I,null,s&&R(S,null,"N/A"),!s&&R(S,null,i?`${t.fiatStringAmount} ${t.fiatCurrency}`:`${Object(C.b)(Number(t.receiveStringAmount))} ${t.receiveCurrency}`),R(j,null,R(Y,{isDisabled:!!t.error,onClick:()=>n(t)},R(N.J,{id:"TR_BUY_GET_THIS_OFFER"})))),R(A,null,R(F,null,R(L,null,R(N.J,{id:"TR_BUY_PROVIDER"})),R(D,null,R(d.e,{exchange:l,providers:r}))),R(F,null,R(L,null,R(N.J,{id:"TR_BUY_PAID_BY"})),R(D,null,R(d.l,{method:o}))),R(F,null,R(L,null,R(N.J,{id:"TR_BUY_FEES"})," ",R(Q,{tooltip:"TR_OFFER_FEE_INFO"})),R(D,null,R(N.J,{id:"TR_BUY_ALL_FEES_INCLUDED"})))),s&&R(G,null,R(M,null,R(P,{icon:"CROSS",size:12,color:a.TYPE_RED})),R(U,null,function(e,t){if(e.error){if(t){if(e.minCrypto&&Number(e.receiveStringAmount)<e.minCrypto)return R(N.J,{id:"TR_BUY_OFFER_ERROR_MINIMUM_CRYPTO",values:{amount:Object(C.b)(Number(e.receiveStringAmount)),min:Object(C.b)(e.minCrypto),currency:e.receiveCurrency}});if(e.maxCrypto&&Number(e.receiveStringAmount)>e.maxCrypto)return R(N.J,{id:"TR_BUY_OFFER_ERROR_MAXIMUM_CRYPTO",values:{amount:Object(C.b)(Number(e.receiveStringAmount)),max:Object(C.b)(e.maxCrypto),currency:e.receiveCurrency}})}else{if(e.minFiat&&Number(e.fiatStringAmount)<e.minFiat)return R(N.J,{id:"TR_BUY_OFFER_ERROR_MINIMUM_FIAT",values:{amount:e.fiatStringAmount,min:e.minFiat,currency:e.fiatCurrency}});if(e.maxFiat&&Number(e.fiatStringAmount)>e.maxFiat)return R(N.J,{id:"TR_BUY_OFFER_ERROR_MAXIMUM_FIAT",values:{amount:e.fiatStringAmount,max:e.maxFiat,currency:e.fiatCurrency}})}return e.error}return""}(t,i))),t.infoNote&&!s&&R(B,null,t.infoNote))},V=o.a.createElement;const H=s.default.div.withConfig({displayName:"List__Wrapper"})([""]),W=s.default.div.withConfig({displayName:"List__Quotes"})([""]),q=Object(s.default)(k).withConfig({displayName:"List__StyledQuote"})(["margin-bottom:20px;"]),J=s.default.div.withConfig({displayName:"List__Header"})(["margin:36px 0 24px 0;display:flex;justify-content:space-between;"]),z=s.default.div.withConfig({displayName:"List__Left"})([""]),Z=s.default.div.withConfig({displayName:"List__Right"})(["display:flex;align-items:center;justify-content:flex-end;"]),$=s.default.div.withConfig({displayName:"List__SummaryRow"})(["display:flex;align-items:center;font-size:",";text-transform:uppercase;"],h.variables.FONT_SIZE.H2),K=s.default.div.withConfig({displayName:"List__OrigAmount"})(["color:",";font-size:",";"],(e=>e.theme.TYPE_LIGHT_GREY),h.variables.FONT_SIZE.SMALL),X=Object(s.default)(h.Icon).withConfig({displayName:"List__StyledIcon"})(["padding:0 10px;"]),ee=s.default.div.withConfig({displayName:"List__Text"})(["display:flex;padding-top:3px;align-items:center;"]),te=Object(s.default)(ee).withConfig({displayName:"List__Crypto"})(["padding-left:10px;"]),ie=Object(s.default)(ee).withConfig({displayName:"List__Receive"})(["padding-right:10px;"]),ae=Object(s.default)(h.CoinLogo).withConfig({displayName:"List__StyledCoinLogo"})([""]),ne=s.default.div.withConfig({displayName:"List__NoQuotes"})(["display:flex;justify-content:center;flex-direction:column;align-items:center;flex:1;"]);var re=({isAlternative:e,quotes:t})=>{const{account:i,quotesRequest:a,timer:n,REFETCH_INTERVAL_IN_SECONDS:r}=x();if(!a)return null;const{fiatStringAmount:l,fiatCurrency:s,cryptoStringAmount:u,wantCrypto:c,receiveCurrency:f}=a;return V(H,null,V(J,null,V(z,null,e?V(o.a.Fragment,null,V($,null,V(ee,null,c?"":`${t[0].fiatStringAmount} `,t[0].fiatCurrency),V(X,{icon:"ARROW_RIGHT"}),c&&V(ie,null,Object(C.b)(Number(t[0].receiveStringAmount))),V(ae,{size:21,symbol:i.symbol}),V(te,null,t[0].receiveCurrency)),!c&&V(K,null,"\u2248 ",l," ",s)):V($,null,V(ee,null,c?"":`${l} `,s),V(X,{icon:"ARROW_RIGHT"}),c&&V(ie,null,Object(C.b)(Number(u))),V(ae,{size:21,symbol:i.symbol}),V(te,null,f))),!e&&!n.isStopped&&V(Z,null,V(d.n,{isLoading:n.isLoading,refetchInterval:r,seconds:n.timeSpend.seconds,label:V(N.J,{id:"TR_BUY_OFFERS_REFRESH"})}))),V(W,null,0===(null===t||void 0===t?void 0:t.length)?V(ne,null,V(N.J,{id:"TR_BUY_NO_OFFERS"})):t.map((e=>V(q,{wantCrypto:c,key:`${e.exchange}-${e.paymentMethod}-${e.receiveCurrency}`,quote:e})))))},oe=o.a.createElement;const le=s.default.div.withConfig({displayName:"VerifyAddress__Wrapper"})(["display:flex;flex-direction:column;margin-top:10px;"]),de=s.default.div.withConfig({displayName:"VerifyAddress__CardContent"})(["display:flex;flex-direction:column;padding:24px;"]),se=s.default.div.withConfig({displayName:"VerifyAddress__LogoWrapper"})(["display:flex;align-items:center;padding:0 0 0 15px;"]),ue=s.default.div.withConfig({displayName:"VerifyAddress__AccountWrapper"})(["display:flex;padding:0 0 0 15px;flex-direction:column;"]),ce=s.default.div.withConfig({displayName:"VerifyAddress__Label"})(["display:flex;align-items:center;font-weight:",";"],h.variables.FONT_WEIGHT.MEDIUM),fe=Object(s.default)(N.B).withConfig({displayName:"VerifyAddress__StyledQuestionTooltip"})(["padding-left:3px;"]),pe=s.default.div.withConfig({displayName:"VerifyAddress__UpperCase"})(["text-transform:uppercase;padding:0 3px;"]),me=s.default.div.withConfig({displayName:"VerifyAddress__FiatWrapper"})(["padding:0 0 0 3px;"]),_e=Object(s.default)(ce).withConfig({displayName:"VerifyAddress__CustomLabel"})(["padding-bottom:12px;"]),ye=s.default.div.withConfig({displayName:"VerifyAddress__LabelText"})([""]),ge=Object(s.default)(h.DeviceImage).withConfig({displayName:"VerifyAddress__StyledDeviceImage"})(["padding:0 10px 0 0;"]),be=s.default.div.withConfig({displayName:"VerifyAddress__Amount"})(["display:flex;font-size:",";color:",";font-weight:",";"],h.variables.FONT_SIZE.TINY,(e=>e.theme.TYPE_LIGHT_GREY),h.variables.FONT_WEIGHT.MEDIUM),Oe=s.default.div.withConfig({displayName:"VerifyAddress__AccountName"})(["display:flex;font-weight:",";"],h.variables.FONT_WEIGHT.MEDIUM),ve=s.default.div.withConfig({displayName:"VerifyAddress__FakeInput"})(["display:flex;margin-bottom:20px;padding:5px;min-height:61px;align-items:center;border-radius:4px;border:solid 2px ",";background:",";"],(e=>e.theme.STROKE_GREY),(e=>e.theme.BG_WHITE)),Ee=s.default.div.withConfig({displayName:"VerifyAddress__ButtonWrapper"})(["display:flex;align-items:center;justify-content:center;padding-top:20px;border-top:1px solid ",";margin:20px 0;"],(e=>e.theme.STROKE_GREY)),xe=s.default.div.withConfig({displayName:"VerifyAddress__Confirmed"})(["display:flex;height:60px;font-size:",";font-weight:",";background:",";align-items:center;justify-content:center;"],h.variables.FONT_SIZE.BIG,h.variables.FONT_WEIGHT.MEDIUM,(e=>e.theme.BG_GREY));var he=()=>{var e;const{account:t,device:i,callInProgress:a,verifyAddress:n,selectedQuote:r,goToPayment:o,addressVerified:l}=x(),{symbol:d,formattedBalance:s}=t,{path:u,address:c}=Object(C.c)(t);return u&&c&&r?oe(le,null,oe(de,null,oe(_e,null,oe(ye,null,oe(N.J,{id:"TR_BUY_RECEIVING_ACCOUNT"})),oe(fe,{tooltip:"TR_BUY_RECEIVE_ACCOUNT_QUESTION_TOOLTIP"})),oe(ve,null,oe(se,null,oe(h.CoinLogo,{size:25,symbol:d})),oe(ue,null,oe(Oe,null,oe(N.a,{account:t})),oe(be,null,oe(N.p,null,s)," ",oe(pe,null,d)," \u2022",oe(me,null,oe(N.k,{amount:s,symbol:d}))))),oe(h.Input,{label:oe(ce,null,oe(N.J,{id:"TR_BUY_RECEIVING_ADDRESS"}),oe(fe,{tooltip:"TR_BUY_RECEIVE_ADDRESS_QUESTION_TOOLTIP"})),value:c,readOnly:!0}),l&&l===c&&oe(xe,null,i&&oe(ge,{height:25,trezorModel:1===(null===(e=i.features)||void 0===e?void 0:e.major_version)?1:2}),oe(N.J,{id:"TR_BUY_CONFIRMED_ON_TREZOR"}))),oe(Ee,null,(!l||l!==c)&&oe(h.Button,{isLoading:a,isDisabled:a,onClick:()=>n(t)},oe(N.J,{id:"TR_BUY_CONFIRM_ON_TREZOR"})),l&&l===c&&oe(h.Button,{isLoading:a,isDisabled:a,onClick:()=>o(c)},oe(N.J,{id:"TR_BUY_GO_TO_PAYMENT"})))):null},Ne=o.a.createElement;const Ce=s.default.div.withConfig({displayName:"SelectedOffer__Wrapper"})(["display:flex;margin-top:20px;@media screen and (max-width:","){flex-direction:column;}"],h.variables.SCREEN_SIZE.LG),Re=Object(s.default)(h.Card).withConfig({displayName:"SelectedOffer__StyledCard"})(["flex:1;padding:0;"]);var Te=()=>{const{account:e,selectedQuote:t,providersInfo:i}=x();return t?Ne(Ce,null,Ne(Re,null,Ne(he,null)),Ne(d.d,{selectedQuote:t,account:e,providers:i})):null},we=o.a.createElement;const Ie=s.default.div.withConfig({displayName:"Offers__Wrapper"})(["padding:16px 32px 32px 32px;@media screen and (max-width:","){padding:16px;}"],h.variables.SCREEN_SIZE.LG),Se=s.default.div.withConfig({displayName:"Offers__Divider"})(["display:flex;flex:1;align-items:center;cursor:default;padding:61px 0;"]),je=s.default.div.withConfig({displayName:"Offers__DividerLine"})(["height:1px;flex:1;background:",";"],(e=>e.theme.STROKE_GREY)),Ae=Object(s.default)(je).withConfig({displayName:"Offers__DividerLeft"})([""]),Fe=Object(s.default)(je).withConfig({displayName:"Offers__DividerRight"})([""]),Le=s.default.div.withConfig({displayName:"Offers__Currency"})(["color:",";text-transform:uppercase;padding-left:3px;"],(e=>e.theme.TYPE_DARK_GREY)),Ye=s.default.div.withConfig({displayName:"Offers__DividerMiddle"})(["display:flex;align-items:center;padding:5px 20px;color:",";font-weight:",";font-size:",";border-radius:25px;border:1px solid ",";background:",";text-align:center;"],(e=>e.theme.TYPE_LIGHT_GREY),h.variables.FONT_WEIGHT.MEDIUM,h.variables.FONT_SIZE.SMALL,(e=>e.theme.STROKE_GREY),(e=>e.theme.BG_WHITE)),De=s.default.div.withConfig({displayName:"Offers__NoQuotes"})(["display:flex;justify-content:center;flex-direction:column;min-height:550px;align-items:center;flex:1;"]);var Be=()=>{const{quotes:e,alternativeQuotes:t,selectedQuote:i}=x(),{setLayout:a}=Object(r.useContext)(N.r);return Object(r.useEffect)((()=>{a&&a("Trezor Suite | Trade",void 0,we(d.f,null))}),[a]),we(Ie,null,!i&&we(o.a.Fragment,null,0===(null===e||void 0===e?void 0:e.length)&&0===(null===t||void 0===t?void 0:t.length)?we(De,null,we(N.J,{id:"TR_BUY_NO_OFFERS"})):we(o.a.Fragment,null,we(re,{quotes:e}),t&&t.length>0&&we(o.a.Fragment,null,we(Se,null,we(Ae,null),we(Ye,null,we(N.J,{id:"TR_BUY_OTHER_OFFERS_IN"}),we(Le,null,t[0].fiatCurrency)),we(Fe,null)),we(re,{isAlternative:!0,quotes:t})))),i&&we(Te,null),we(d.j,null))},Ge=o.a.createElement;function Pe(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}function Me(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Pe(Object(i),!0).forEach((function(t){Object(n.a)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Pe(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}const Ue=s.default.div.withConfig({displayName:"offers__Wrapper"})(["display:flex;width:100%;flex-direction:column;"]),Qe=e=>{const{selectedAccount:t}=e,i=(e=>{const t=Object(f.a)(),{selectedAccount:i,quotesRequest:a,alternativeQuotes:n,quotes:o,providersInfo:l,device:d,addressVerified:s,isFromRedirect:O}=e,{account:E}=i,{isLocked:x}=Object(c.e)(),{0:h,1:N}=Object(r.useState)(x||!1),{0:C,1:R}=Object(r.useState)(),{0:T,1:w}=Object(r.useState)(o),{0:I,1:S}=Object(r.useState)(n),{saveTrade:j,setIsFromRedirect:A,openCoinmarketBuyConfirmModal:F,addNotification:L,saveTransactionDetailId:Y,verifyAddress:D,submitRequestForm:B,goto:G}=Object(c.b)({saveTrade:_.h,setIsFromRedirect:_.j,openCoinmarketBuyConfirmModal:_.c,addNotification:g.b,saveTransactionDetailId:_.i,submitRequestForm:_.k,verifyAddress:m.f,goto:y.c}),P=Object(c.k)((e=>e.suite.settings.debug.invityAPIUrl));return P&&u.a.setInvityAPIServer(P),Object(r.useEffect)((()=>{if(!a)return void G("wallet-coinmarket-buy",{symbol:E.symbol,accountIndex:E.index,accountType:E.accountType});const e=async()=>{if(!C){u.a.createInvityAPIKey(E.descriptor);const e=await u.a.getBuyQuotes(a),[i,n]=Object(p.g)(e);w(i),S(n),t.reset()}};O&&a&&(e(),A(!1)),t.isLoading||t.isStopped||(t.resetCount>=40&&t.stop(),30===t.timeSpend.seconds&&(t.loading(),e()))})),{goToPayment:async e=>{if(N(!0),!C)return;const t=await Object(p.b)(C,E),a=v(v({},C),{},{receiveAddress:e}),n=await u.a.doBuyTrade({trade:a,returnUrl:t});n&&n.trade&&n.trade.paymentId?n.trade.error?L({type:"error",error:n.trade.error}):(j(n.trade,E,(new Date).toISOString()),n.tradeForm&&B(n.tradeForm),Object(b.k)()&&(Y(n.trade.paymentId),G("wallet-coinmarket-buy-detail",i.params))):L({type:"error",error:"No response from the server"}),N(!1)},callInProgress:h,selectedQuote:C,verifyAddress:D,device:d,providersInfo:l,saveTrade:j,quotesRequest:a,addressVerified:s,quotes:T,alternativeQuotes:I,selectQuote:async e=>{const i=l&&e.exchange?l[e.exchange]:null;if(a&&await F(null===i||void 0===i?void 0:i.companyName))if(e.quoteId)R(e),t.stop();else{const t=await Object(p.a)(a,E),i=await u.a.doBuyTrade({trade:e,returnUrl:t});if(i)if("LOGIN_REQUEST"===i.trade.status&&i.tradeForm)B(i.tradeForm);else{const e=`[doBuyTrade] ${i.trade.status} ${i.trade.error}`;console.log(e)}else{const e="No response from the server";console.log(`[doBuyTrade] ${e}`),L({type:"error",error:e})}}},account:E,REFETCH_INTERVAL_IN_SECONDS:30,timer:t}})(Me(Me({},e),{},{selectedAccount:t}));return Ge(E.Provider,{value:i},Ge(Ue,null,Ge(Be,null)))};var ke=Object(l.b)((e=>{var t;return{selectedAccount:e.wallet.selectedAccount,device:e.suite.device,quotes:e.wallet.coinmarket.buy.quotes,alternativeQuotes:e.wallet.coinmarket.buy.alternativeQuotes,quotesRequest:e.wallet.coinmarket.buy.quotesRequest,isFromRedirect:e.wallet.coinmarket.buy.isFromRedirect,addressVerified:e.wallet.coinmarket.buy.addressVerified,providersInfo:null===(t=e.wallet.coinmarket.buy.buyInfo)||void 0===t?void 0:t.providerInfos}}))((e=>{const{selectedAccount:t}=e;return"loaded"!==t.status?Ge(d.s,{title:"TR_NAV_BUY",account:t}):Ge(Qe,Object(a.a)({},e,{selectedAccount:t}))}));t.default=ke},Il6f:function(e,t,i){"use strict";i.d(t,"a",(function(){return n}));var a=i("ERkP");const n=()=>{const{0:e,1:t}=Object(a.useState)(0),{0:i,1:n}=Object(a.useState)(!1),{0:r,1:o}=Object(a.useState)(!1),{0:l,1:d}=Object(a.useState)(0);Object(a.useEffect)((()=>{const a=setTimeout((()=>{t(e+1e3)}),1e3);return(r||i)&&clearTimeout(a),()=>{clearTimeout(a)}}));return{timeSpend:{seconds:e/1e3},resetCount:l,isStopped:r,isLoading:i,stop:()=>{o(!0)},reset:()=>{n(!1),d(l+1),t(0),o(!1)},loading:()=>{t(0),n(!0),o(!1)}}}},beEm:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/accounts/coinmarket/buy/offers",function(){return i("7FeR")}])}},[["beEm",0,1,7,13,10,3,15,8,11,9,14,6,12,5,16,2,4,17]]]);
//# sourceMappingURL=offers-a87a61884c506b81e194.js.map