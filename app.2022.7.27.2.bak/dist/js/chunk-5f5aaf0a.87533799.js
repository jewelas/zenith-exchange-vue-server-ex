(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f5aaf0a"],{"502f":function(t,a,e){},7861:function(t,a,e){"use strict";var s=function(){var t=this,a=t._self._c;return a("c-dialog",{staticClass:"leverageTransfer-container",attrs:{showFlag:t.transferFlag,titleText:t.$t("assets.leverageTransfer.title"),confirmLoading:t.transferConfirmLoading,confirmDisabled:t.transferConfirmDisabled},on:{close:t.transferDialogClose,confirm:t.transferDialogConfirm}},[t.loading?a("div",{staticClass:"transfer-loadingBox"},[a("div",{staticClass:"transfer-loading"},[a("c-loading",{attrs:{size:"50"}})],1)]):a("section",{staticClass:"transfer-box"},[a("div",{staticClass:"transfer-mess a-4-bg"},[a("div",{staticClass:"even"},[a("c-redio",{attrs:{value:t.transferCoin===t.transferObj.baseCoin,name:t.transferObj.baseCoin},on:{click:t.transferCoinChange}}),a("span",{staticClass:"key e-1-cl",on:{click:function(a){return t.transferCoinChange(t.transferObj.baseCoin)}}},[t._v("\n          "+t._s(t.getShowCoin(t.transferObj.baseCoin))+"\n        ")])],1),a("div",{staticClass:"even"},[a("c-redio",{attrs:{value:t.transferCoin===t.transferObj.quoteCoin,name:t.transferObj.quoteCoin},on:{click:t.transferCoinChange}}),a("span",{staticClass:"key e-1-cl",on:{click:function(a){return t.transferCoinChange(t.transferObj.quoteCoin)}}},[t._v("\n          "+t._s(t.getShowCoin(t.transferObj.quoteCoin))+"\n        ")])],1)]),a("ul",{staticClass:"transfer-content a-4-bg"},[a("li",{staticClass:"transfer-page"},[a("div",{staticClass:"transfer-page-side"},[t._v(t._s(t.$t("assets.otcAccount.from")))]),a("div",{staticClass:"transfer-page-name e-1-cl"},[t._v(t._s(t.side.from))])]),a("li",{staticClass:"transfer-icon"},[a("svg",{staticClass:"icon icon-36",attrs:{"aria-hidden":"true"},on:{click:t.setTransferSide}},[a("use",{attrs:{"xlink:href":"#icon-f_4"}})])]),a("li",{staticClass:"transfer-page"},[a("div",{staticClass:"transfer-page-side"},[t._v(t._s(t.$t("assets.otcAccount.to")))]),a("div",{staticClass:"transfer-page-name e-1-cl"},[t._v(t._s(t.side.to))])])]),a("c-inputLine",{attrs:{name:"transferValue",value:t.transferValue,promptText:t.$t("assets.otcAccount.volume"),errorHave:!0,errorFlag:t.transferError,errorText:t.$t("assets.otcAccount.volumeError"),warningText:t.transferWarningText},on:{onchanges:t.inputLineChange}},[a("c-button",{attrs:{type:"text",height:"30px"},on:{click:t.allTransfer}},[t._v("\n        "+t._s(t.$t("assets.otcAccount.all"))+"\n      ")])],1)],1)])},n=[],i=e("c31c"),r=(e("a774"),{mixins:[i["a"]],mounted:function(){this.init()}}),o=r,c=e("2877"),l=Object(c["a"])(o,s,n,!1,null,null,null);a["a"]=l.exports},"7e73":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t._self._c;return a("section",{staticClass:"page-leverAccount"},[a("div",{staticClass:"leverAccount-header-bg"},[a("div",{staticClass:"leverAccount-header",style:t.otcHeader},[a("ul",{staticClass:"assetsSum"},[a("li",{staticClass:"text f-8-cl"},[t._v(t._s(t.$t("assets.otcAccount.TotalAssets")))]),a("li",{staticClass:"num f-8-cl"},[t._v("\n          "+t._s(t.totalBalance)),a("span",[t._v(t._s(t.showTotalBalanceSymbol))])]),a("li",{staticClass:"fnum f-8-cl"},[t._v(" ≈ "+t._s(t.totalRate))])])])]),a("div",{staticClass:"leverAccount-body a-7-bd"},[a("div",{staticClass:"leverAccount-title a-3-bd"},[a("div",{staticClass:"text b-1-cl"},[t._v(t._s(t.$t("assets.otcAccount.ListOfFunds")))]),a("div",{staticClass:"hide"},[a("c-switch",{attrs:{value:t.switchFlag},on:{click:t.switchChange}}),a("span",{staticClass:"hodetext"},[t._v(t._s(t.$t("assets.otcAccount.HideZeroAssets")))])],1),a("div",{staticClass:"find"},[a("c-inputFind",{attrs:{promptText:t.$t("assets.leverageAccount.find"),value:t.findValue,className:"findClass"},on:{onchanges:t.findChanges}})],1)]),a("div",{staticClass:"leverAccount-center"},[a("c-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,dataList:t.dataListFilter,cellHeight:55,h5Width:"900px"},on:{elementClick:t.tableClick}})],1)]),a("leverageTransfer",{on:{success:t.transferSuccess}})],1)},n=[],i=(e("28a5"),e("7f7f"),e("456d"),e("6b54"),e("ac6a"),e("95d5")),r={name:"page-leverAccount",data:function(){return{otcHeader:"background: url(".concat(i["s"].zc_le,")"),tabelLoading:!0,imgMap:i["s"],colorMap:i["b"],dataList:[],totalBalance:"--",totalBalanceSymbol:"",switchFlag:!1,findValue:"",totalRate:"--"}},watch:{market:function(t){t&&this.getData()}},computed:{symbolAll:function(){return this.$store.state.baseData.symbolAll},showTotalBalanceSymbol:function(){var t=this.totalBalanceSymbol;return this.market&&this.market.coinList&&this.market.coinList[this.totalBalanceSymbol]&&(t=Object(i["l"])(this.totalBalanceSymbol,this.market.coinList)),t},linkurl:function(){return this.$store.state.baseData.publicInfo?this.$store.state.baseData.publicInfo.url:{}},tradeLinkUrl:function(){return this.$store.state.baseData&&this.$store.state.baseData.publicInfo?"".concat(this.linkurl.exUrl,"/margin"):""},columns:function(){return[{title:this.$t("assets.leverageAccount.list1")},{title:this.$t("assets.leverageAccount.list2"),width:"13%"},{title:this.$t("assets.leverageAccount.list3"),width:"13%"},{title:this.$t("assets.leverageAccount.list4"),width:"13%"},{title:this.$t("assets.leverageAccount.list5"),width:"13%"},{title:this.$t("assets.leverageAccount.list6"),width:"13%"},{title:this.$t("assets.leverageAccount.list7"),width:"10%"},{title:this.$t("assets.leverageAccount.list8")}]},market:function(){return this.$store.state.baseData.market},dataListFilter:function(){var t=this,a=[];this.switchFlag?this.dataList.forEach((function(t){var e=t.data[1][0],s=e.subContent,n=e.text;(parseFloat(n)||parseFloat(s.text))&&a.push(t)})):a=this.dataList;var e=[];return a.forEach((function(a){-1!==a.data[0].toUpperCase().indexOf(t.findValue.toUpperCase())&&e.push(a)})),e},userCurrency:function(){return Object(i["n"])("user_Currency")||"USD"}},methods:{init:function(){i["u"].get("assetsSwitch")&&(this.switchFlag=i["u"].get("assetsSwitch")),this.market&&this.getData()},transferSuccess:function(){this.getData()},getData:function(){var t=this;this.axios({url:"/lever/finance/balance"}).then((function(a){if("0"===a.code.toString()){t.tabelLoading=!1;var e=a.data.leverMap;t.serverData=e,t.setData(a.data)}}))},setData:function(t){var a=this,e=t.totalBalance,s=t.totalBalanceSymbol,n=t.leverMap;this.tabelLoading=!1;var r=this.market,o=r.coinList,c=r.rate,l=r.market;this.totalBalance=Object(i["f"])(e,8),this.totalBalanceSymbol=s,this.totalRate=Object(i["i"])(e,c,s,this.userCurrency);var f=[];Object.keys(n).forEach((function(t){var e=n[t],s=o[e.quoteCoin].showPrecision||0;a.symbolAll&&(s=a.symbolAll[e.name].price);var r=l[e.quoteCoin][e.name],c=r.showName||r.name,u=Object(i["l"])(e.baseCoin,o),h=Object(i["l"])(e.quoteCoin,o);f.push({id:JSON.stringify(e),data:[c,[{text:"".concat(Object(i["f"])(e.baseTotalBalance,8)," ").concat(u),subContent:{text:"".concat(Object(i["f"])(e.quoteTotalBalance,8)," ").concat(h)}}],[{text:"".concat(Object(i["f"])(e.baseNormalBalance,8)," ").concat(u),subContent:{text:"".concat(Object(i["f"])(e.quoteNormalBalance,8)," ").concat(h)}}],[{text:"".concat(Object(i["f"])(e.baseLockBalance,8)," ").concat(u),subContent:{text:"".concat(Object(i["f"])(e.quoteLockBalance,8)," ").concat(h)}}],[{text:"".concat(Object(i["f"])(e.baseBorrowBalance,8)," ").concat(u),subContent:{text:"".concat(Object(i["f"])(e.quoteBorrowBalance,8)," ").concat(h)}}],"".concat(Object(i["f"])(e.burstPrice,s)," ").concat(h),e.riskRate?"".concat(e.riskRate,"%"):"--",[{type:"button",text:a.$t("assets.leverageAccount.transfer"),eventType:"transfer"},{type:"link",text:a.$t("assets.leverageAccount.ToLoan"),links:"leverageToLoan?symbol=".concat(e.symbol)},{type:"icon",iconSvg:'<svg class="icon icon-16" aria-hidden="true"><use xlink:href="#icon-c_1"></use></svg>',eventType:"goTrade"}]]})})),this.dataList=f},findChanges:function(t){this.findValue=t},switchChange:function(){this.switchFlag=!this.switchFlag,i["u"].set("assetsSwitch",this.switchFlag)},tableClick:function(t,a){var e=JSON.parse(a);if("transfer"===t)this.$bus.$emit("coTransfer",e.symbol);else if("goTrade"===t){var s=e.name;if(-1===s.toString().indexOf("/"))return;var n=s.split("/");window.location.href="".concat(this.tradeLinkUrl,"/").concat(n[0],"_").concat(n[1])}}}},o=(e("502f"),e("7861")),c={mixins:[r],components:{leverageTransfer:o["a"]},mounted:function(){this.init()}},l=c,f=e("2877"),u=Object(f["a"])(l,s,n,!1,null,null,null);a["default"]=u.exports},a774:function(t,a,e){},c31c:function(t,a,e){"use strict";e("6b54"),e("c5f6"),e("ac6a"),e("456d");var s=e("95d5");a["a"]={data:function(){return{loading:!1,transferConfirmLoading:!1,transferFlag:!1,transferSide:"1",transferValue:"",transferCoin:"",transferObj:{},axiosFlag:!1,symbol:"",defineCoin:"",isDeleteHover:!1}},watch:{market:function(t){t&&this.axiosFlag&&this.getData()},transferObj:function(t){Object.keys(t).length&&(this.defineCoin?this.transferCoin=this.defineCoin:this.transferCoin=t.baseCoin)},transferValue:function(t){"2"===this.transferSide?this.transferValue=Object(s["h"])(t,8):this.transferValue=Object(s["h"])(t,this.transferCoinFix)}},computed:{market:function(){return this.$store.state.baseData.market},side:function(){var t=this.$t("assets.otcAccount.exchangeAccount"),a=this.$t("assets.leverageTransfer.leverageAccount"),e="",s="";return"1"===this.transferSide?(e=t,s=a):(e=a,s=t),{from:e,to:s}},transferWarningText:function(){var t=this.$t("assets.otcAccount.can"),a=Object(s["f"])(this.transferCanNum,this.transferCoinFix);return"2"===this.transferSide&&(a=Object(s["f"])(this.transferCanNum,8)),"".concat(t," ").concat(a," ").concat(this.getShowCoin(this.transferCoin)," ")},transferCoinFix:function(){var t=0;return this.market&&this.market.coinList&&this.market.coinList[this.transferCoin]&&(t=this.market.coinList[this.transferCoin].showPrecision),Number(t)},transferConfirmDisabled:function(){if(this.transferConfirmLoading)return!1;var t=!0;return parseFloat(this.transferValue)>0&&!this.transferError&&(t=!1),t},transferError:function(){var t=!1;return parseFloat(this.transferValue)>parseFloat(this.transferCanNum)&&(t=!0),t},transferCanNum:function(){var t=this.transferObj,a=t.baseCanTransfer,e=t.quoteCanTransfer,s=t.baseExNormalBalance,n=t.quoteEXNormalBalance,i=t.baseCoin,r=t.quoteCoin,o="",c="";this.transferCoin===i?(o=a,c=s):this.transferCoin===r&&(o=e,c=n);var l="";return l="1"===this.transferSide?c:o,Number(l)},transferOptions:function(){return[{code:this.transferObj.baseCoin,value:this.getShowCoin(this.transferObj.baseCoin)},{code:this.transferObj.quoteCoin,value:this.getShowCoin(this.transferObj.quoteCoin)}]}},methods:{init:function(){var t=this;this.$bus.$on("coTransfer",(function(a,e){t.axiosFlag=!0,t.symbol=a,t.transferFlag=!0,t.loading=!0,e&&(t.defineCoin=e),t.market&&t.getData()}))},getShowCoin:function(t){if(!this.market)return t;var a=this.market.coinList,e=t;return this.market&&a&&(e=Object(s["l"])(t,a)),e},getData:function(){var t=this;this.axiosFlag=!1;var a={symbol:this.symbol};this.axios({url:"/lever/finance/symbol/balance",params:a}).then((function(a){t.loading=!1,"0"===a.code.toString()?t.transferObj=a.data:t.$bus.$emit("tip",{text:a.msg,type:"error"})}))},transferCoinChange:function(t){this.transferCoin!==t&&(this.transferCoin=t,this.transferValue="")},setTransferSide:function(){"1"===this.transferSide?this.transferSide="2":"2"===this.transferSide&&(this.transferSide="1"),this.transferValue=""},allTransfer:function(){"2"===this.transferSide?this.transferValue=Object(s["f"])(this.transferCanNum,8):this.transferValue=Object(s["f"])(this.transferCanNum,this.transferCoinFix)},inputLineChange:function(t,a){this[a]=t},clearTransfer:function(){this.transferFlag=!1,this.transferSide="1",this.transferValue="",this.transferCoin="",this.transferConfirmLoading=!1,this.$set(this,"transferObj",{})},transferDialogClose:function(){this.clearTransfer()},transferDialogConfirm:function(){var t=this;this.transferConfirmLoading=!0;var a={fromAccount:"1"===this.transferSide?"1":"2",toAccount:"1"===this.transferSide?"2":"1",amount:this.transferValue,coinSymbol:this.transferCoin,symbol:this.transferObj.symbol};this.axios({url:"/lever/finance/transfer",params:a}).then((function(a){t.transferConfirmLoading=!1,"0"===a.code.toString()?(t.clearTransfer(),t.$emit("success"),t.$bus.$emit("tip",{text:a.msg,type:"success"})):t.$bus.$emit("tip",{text:a.msg,type:"error"})}))},clear:function(){this.transferValue=""}}}}}]);