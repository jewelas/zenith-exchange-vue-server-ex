(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9bea9348"],{"3cb1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-mobility page-mobility-container"},[e("div",{staticClass:"mobility-sideNav a-3-bd a-5-bg"},[e("c-navTab",{attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",className:"b-2-cl",currentTab:t.sideTab,navTab:t.sideList,lineHeight:"40",marginRight:"64"},on:{currentType:t.sideChange}}),e("div",{staticClass:"sideNav-warn"},[t._v("\n      "+t._s(t.$t("mobilityTrade.referencePrice"))+"\n      "),e("span",{staticClass:"sideNav-page-icon"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_15"}})]),e("div",{staticClass:"sideNav-page-market a-4-bg"},[t._v("\n          "+t._s(t.$t("mobilityTrade.referenceWarn"))+"\n        ")])]),t._v("\n       ："+t._s(t.consultPrice)+" "+t._s(t.legal)+"/"+t._s(t.coin)+"\n    ")])],1),e("div",{staticClass:"mobility-content a-5-bg"},[e("div",{staticClass:"mobility-content-condition clearfix"},[e("div",{staticClass:"mobility-content-coin"},[e("c-inputLine",{attrs:{promptText:t.$t("mobilityTrade.coin"),value:t.coin,disabled:!0}})],1),e("div",{staticClass:"mobility-content-legal"},[e("c-inputLine",{attrs:{promptText:t.$t("mobilityTrade.legal"),value:t.legal,disabled:!0}})],1)]),e("div",{staticClass:"mobility-content-inputValue"},[e("div",{staticClass:"mobility-tradeType"},[e("span",{staticClass:"mobility-tradeType-even",class:"1"===t.tradeType?"b-1-cl":"",on:{click:function(e){return t.setTradeType("1")}}},[t._v(t._s(t.priceText))]),e("span",{staticClass:"mobility-tradeType-line"},[t._v("|")]),e("span",{staticClass:"mobility-tradeType-even",class:"2"===t.tradeType?"b-1-cl":"",on:{click:function(e){return t.setTradeType("2")}}},[t._v(t._s(t.valueText))])]),e("c-inputLine",{attrs:{errorHave:!0,errorText:t.errorObj.text,errorFlag:t.errorObj.showError,value:t.tradeValue},on:{onchanges:t.inputChanges}},[e("span",{staticClass:"inputCoin"},[t._v("\n          "+t._s(t.inputCoin)+"\n        ")]),"SELL"===t.side?e("c-button",{attrs:{className:"btnAll",type:"text",marginTop:"-1px"},on:{click:t.allClick}},[t._v(t._s(t.$t("mobilityTrade.all")))]):t._e()],1)],1),"BUY"===t.side?e("div",{staticClass:"mobility-content-pays"},[e("div",{staticClass:"pays-Title"},[t._v(t._s(t.$t("mobilityTrade.buyPayments")))]),e("ul",{staticClass:"buy-pays-list clearfix"},t._l(t.buyPayments,(function(i,a){return e("li",{key:a,staticClass:"h-3-bg x-1-cl",class:t.buyPayActive===i.key?"a-12-bd":"h-3-bd",on:{click:function(e){return t.buyPaymentsChange(i.key)}}},[t.buyPayActive===i.key?e("svg",{staticClass:"icon icon-16 activeIcon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-c_20"}})]):t._e(),t._v("\n          "+t._s(i.title)+"\n        ")])})),0)]):t._e(),"SELL"===t.side?e("div",{staticClass:"mobility-content-pays"},[e("div",{staticClass:"pays-Title"},[t._v("\n        "+t._s(t.$t("mobilityTrade.sellPayments"))+"\n        "),e("c-button",{attrs:{type:"text",className:"addBtn"},on:{click:t.add}},[t._v(t._s(t.$t("mobilityTrade.addPayments")))])],1),t.sellPayments.length?e("ul",{staticClass:"sell-pays-list"},t._l(t.sellPayments,(function(i,a){return e("li",{key:a},[e("div",{staticClass:"sell-pays-head"},[e("c-redio",{attrs:{value:t.sellPayActive===i.payment},on:{click:function(e){return t.sellPaymentsChange(i.payment)}}}),e("span",{staticClass:"f-1-cl sell-pays-title",on:{click:function(e){return t.sellPaymentsChange(i.payment)}}},[t._v(t._s(i.title))])],1),e("div",{staticClass:"sell-pays-message"},["otc.payment.alipay"===i.payment||"otc.payment.wxpay"===i.payment?e("span",[t._v("\n              "+t._s(i.userName)+" "+t._s(i.account)+"\n            ")]):e("span",[t._v("\n              "+t._s(i.userName)+" "+t._s(i.account)+" "+t._s(i.bankName)+" "+t._s(i.bankOfDeposit)+"\n            ")])])])})),0):e("div",{staticClass:"sell-pays-add"},[e("c-button",{attrs:{type:"text"},on:{click:t.add}},[t._v(t._s(t.$t("mobilityTrade.noPayments")))])],1)]):t._e(),e("ul",{staticClass:"mobility-message"},[e("li",{staticClass:"clearfix"},[e("span",{staticClass:"key"},[t._v(t._s(t.$t("mobilityTrade.tradePrice")))]),e("span",{staticClass:"value f-1-cl"},[t.dealLoading?e("span",[e("c-loading",{attrs:{size:"14"}})],1):e("span",{class:t.dealObj.priceClass},[t._v("\n            "+t._s(t.dealObj.price))])])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"key"},[t._v(t._s(t.$t("mobilityTrade.tradeVolume")))]),e("span",{staticClass:"value f-1-cl"},[t._v(t._s(t.dealObj.value))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"key"},[t._v(t._s(t.$t("mobilityTrade.tradeSum")))]),e("span",{staticClass:"value f-1-cl"},[t._v(t._s(t.dealObj.sum))])])]),e("c-button",{attrs:{marginTop:"20px",disabled:t.btnObj.disbaled,loading:!t.btnObj.disbaled&&t.btnLoading,defaultColorClass:t.btnObj.class,hoverColorClass:t.btnObj.class,activeColorClass:t.btnObj.class},on:{click:t.btnClick}},[t._v("\n      "+t._s(t.btnObj.text)+"\n      "+t._s(t.btnObj.showTime?"(".concat(t.axiosTime,")"):"")+"\n    ")]),e("div",{staticClass:"mobility-warn"},[e("svg",{staticClass:"icon icon-16",staticStyle:{marginRight:"10px"},attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-c_2"}})]),e("span",{staticClass:"text b-7-cl"},[t._v("\n        "+t._s(t.$t("mobilityTrade.warn"))+"\n      ")])])],1)])},s=[],n=(i("6b54"),i("c5f6"),i("ac6a"),i("95d5")),l={name:"page-mobility",data:function(){return{buyPayments:[],buyPayActive:"",buyPayLoading:!0,sellPayments:[],sellPayActive:"",sellPayLoading:!0,side:"",legal:"",coin:"",tradeType:"",tradeValue:"",activePay:"",consultPrice:"",balanceList:{},amountMax:"",amountMin:"",priceMax:"",priceMin:"",getBalanceReady:!1,firstGetNewPrice:!1,consultPriceReady:!1,balanceReady:!1,dealLoading:!1,newPrice:{},axiosTimer:null,axiosTime:null,showNewGet:!1,btnLoading:!1}},watch:{tradeValue:function(t,e){1===this.selectCode?this.tradeValue=Object(n["h"])(t,this.priceFix):this.tradeValue=Object(n["h"])(t,this.valueFix),parseFloat(t)!==parseFloat(e)&&this.getNewPrice()},market:{immediate:!0,handler:function(t){t&&(this.getInfo(),this.getBalance())}}},computed:{btnObj:function(){var t={disbaled:!0,text:"",class:"",showTime:!1};return t.disbaled=this.dealObj.btnDisabled,t.text=this.title,!this.dealObj.btnDisabled&&this.axiosTime&&(t.showTime=!0),!this.dealObj.btnDisabled&&this.showNewGet&&(t.class="b-7-bg f-1-cl",t.text=this.$t("mobilityTrade.btnHis")),t},dealText:function(){var t="";return"BUY"===this.side?"1"===this.tradeType?t=this.$t("mobilityTrade.warn1"):"2"===this.tradeType&&(t=this.$t("mobilityTrade.warn2")):"SELL"===this.side&&("1"===this.tradeType?t=this.$t("mobilityTrade.warn3"):"2"===this.tradeType&&(t=this.$t("mobilityTrade.warn4"))),t},axiosSellPayments:function(){var t="";return this.sellPayments.forEach((function(e){t+="".concat(e.payment,",")})),t},axiosBuyPayments:function(){var t="";return this.buyPayments.forEach((function(e){t+="".concat(e.key,",")})),t},getNewPriceFlag:function(){var t=!1;return"BUY"===this.side?this.coin&&this.legal&&this.tradeType&&this.errorObj.flag&&this.buyPayments.length&&this.consultPriceReady&&(t=!0):"SELL"===this.side&&this.coin&&this.legal&&this.tradeType&&this.errorObj.flag&&this.sellPayments.length&&this.consultPriceReady&&(t=!0),t},errorObj:function(){var t={flag:!0,text:"",showError:!1},e=parseFloat(this.tradeValue),i=parseFloat(this.amountMax),a=parseFloat(this.amountMin),s=parseFloat(this.priceMax),n=parseFloat(this.priceMin),l=parseFloat(this.nowBalance.value),r=parseFloat(this.nowBalance.price);if(!e)return t.flag=!1,t.text="",t.showError=!1,t;if(!this.getBalanceReady&&"SELL"===this.side)return t.flag=!1,t.text="",t.showError=!1,t;if("1"===this.tradeType){if(e>r&&"SELL"===this.side)return t.flag=!1,t.text="".concat(this.$t("mobilityTrade.error1")," ").concat(this.nowBalance.price," ").concat(this.legal),t.showError=!0,t;if(n>e||e>s)return t.flag=!1,t.text="".concat(this.$t("mobilityTrade.error2")," ").concat(this.priceMin,"-").concat(this.priceMax," ").concat(this.legal),t.showError=!0,t}else if("2"===this.tradeType){if(e>l&&"SELL"===this.side)return t.flag=!1,t.text="".concat(this.$t("mobilityTrade.error3")," ").concat(this.nowBalance.value," ").concat(this.coin),t.showError=!0,t;if(a>e||e>i)return t.flag=!1,t.text="".concat(this.$t("mobilityTrade.error4")," ").concat(this.amountMin,"-").concat(this.amountMax," ").concat(this.coin),t.showError=!0,t}return t},market:function(){return this.$store.state.baseData.market},valueFix:function(){var t=this.$store.state.baseData.defaultFiatPrecision;return this.market&&this.market.coinList[this.coin]&&this.market.coinList[this.coin].showPrecision&&(t=this.market.coinList[this.coin].showPrecision),t},priceFix:function(){var t=this.$store.state.baseData.defaultFiatPrecision;return this.market&&this.market.coinList[this.coin]&&this.market.coinList[this.coin].fiatPrecision&&this.market.coinList[this.coin].fiatPrecision[this.legal.toLowerCase()]&&(t=this.market.coinList[this.coin].fiatPrecision[this.legal.toLowerCase()]),Number(t)},nowBalance:function(){var t="",e="";return this.balanceList[this.coin]&&this.consultPrice&&(e=Object(n["f"])(this.balanceList[this.coin],this.valueFix),t=Object(n["f"])(this.balanceList[this.coin]*this.consultPrice*.9,this.priceFix)),{price:t,value:e}},priceText:function(){return"BUY"===this.side?this.$t("mobilityTrade.priceBuy"):"SELL"===this.side?this.$t("mobilityTrade.priceSell"):""},valueText:function(){return"BUY"===this.side?this.$t("mobilityTrade.volumeBuy"):"SELL"===this.side?this.$t("mobilityTrade.volumeSell"):""},sideTab:function(){return"BUY"===this.side?1:"SELL"===this.side?2:0},sideList:function(){return[{name:this.$t("mobilityTrade.immediatelyBuy"),index:1},{name:this.$t("mobilityTrade.immediatelySell"),index:2}]},inputCoin:function(){return"1"===this.tradeType?this.legal:this.coin},title:function(){return"BUY"===this.side?this.$t("mobilityTrade.immediatelyBuy"):"SELL"===this.side?this.$t("mobilityTrade.immediatelySell"):""},nowObj:function(){var t={};return"BUY"===this.side?t=this.newPrice[this.buyPayActive]||{}:"SELL"===this.side&&(t=this.newPrice[this.sellPayActive]||{}),t},dealObj:function(){var t=this.nowObj,e={price:"--",value:"--",sum:"--",priceClass:"",btnDisabled:!0};return"SELL"===this.side&&this.sellPayments.length||"BUY"===this.side?this.getNewPriceFlag?(e.price=t.hasValue?t.price:this.$t("mobilityTrade.error5"),e.value=t.hasValue?t.amount:"--",e.sum=t.hasValue?t.totalPrice:"--",e.priceClass=t.hasValue?"":"b-7-cl",e.btnDisabled=!t.hasValue):(e.price=this.dealText,e.btnDisabled=!0):(e.price=this.$t("mobilityTrade.error6"),e.btnDisabled=!0),e}},methods:{btnClick:function(){var t=this;this.showNewGet?(this.btnLoading=!0,this.getNewPrice()):(this.btnLoading=!0,this.axios({url:"BUY"===this.side?"/flow/buy":"/flow/sell",params:{side:this.side,advertId:this.nowObj.advertId,volume:this.nowObj.amount,totalPrice:this.nowObj.totalPrice,price:this.nowObj.price,payment:this.nowObj.payment,coinSymbol:this.nowObj.coin,paySymbol:this.nowObj.payCoin,payType:"1"===this.tradeType?"PRICE":"AMOUNT"}}).then((function(e){t.btnLoading=!1,"0"===e.code.toString()?(t.$bus.$emit("tip",{text:e.msg,type:"success"}),window.open(e.data),t.$router.push("/order/otcOrder")):"101162"===e.code.toString()?(t.axiosTime=0,clearInterval(t.axiosTimer),t.showNewGet=!0,t.btnLoading=!1):t.$bus.$emit("tip",{text:e.msg,type:"error"})})))},getNewPrice:function(){var t=this;this.getNewPriceFlag&&(this.dealLoading=!0,this.newPrice={},this.axios({url:"/chainup/otc/coin/price",params:{symbol:this.coin,payCoin:this.legal,side:"BUY"===this.side?"SELL":"BUY",payType:"1"===this.tradeType?"PRICE":"AMOUNT",payPrice:"1"===this.tradeType?this.tradeValue:void 0,payAmount:"2"===this.tradeType?this.tradeValue:void 0,payments:"BUY"===this.side?this.axiosBuyPayments:this.axiosSellPayments}}).then((function(e){t.axiosTime=60,t.showNewGet=!1,t.btnLoading=!1,clearInterval(t.axiosTimer),t.axiosTimer=setInterval((function(){t.axiosTime-=1,0===t.axiosTime&&(clearInterval(t.axiosTimer),t.showNewGet=!0,t.btnLoading=!1)}),1e3),"0"===e.code.toString()?setTimeout((function(){t.dealLoading=!1,t.newPrice=e.data}),1e3):t.$bus.$emit("tip",{text:e.msg,type:"error"})})))},allClick:function(){var t=parseFloat(this.amountMax),e=parseFloat(this.priceMax),i=parseFloat(this.nowBalance.value),a=parseFloat(this.nowBalance.price);"1"===this.tradeType?this.tradeValue=a<=e?this.nowBalance.price:this.priceMax:"2"===this.tradeType&&(this.tradeValue=i<=t?this.nowBalance.value:this.amountMax)},inputChanges:function(t){this.tradeValue=t},getInfo:function(){var t=this;this.axios({url:"otc_flow_coin/info",hostType:"otc"}).then((function(e){"0"===e.code.toString()?(t.init(e.data),t.getBuyPayments(e.data.payments),t.getSellPayments(),t.getConsultPrice()):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},add:function(){this.$router.push("/personal/leaglTenderSet")},getConsultPrice:function(){var t=this;this.consultPriceReady=!1,this.axios({url:"/otc_flow_coin/consider_price_v4",hostType:"otc",params:{baseSymbol:this.coin,coinSymbol:this.legal}}).then((function(e){"0"===e.code.toString()?(t.consultPrice=e.data.referencePrice,t.amountMax=Object(n["f"])(e.data.amountMax,t.valueFix),t.amountMin=Object(n["f"])(e.data.amountMin,t.valueFix),t.priceMax=Object(n["f"])(e.data.priceMax,t.priceFix),t.priceMin=Object(n["f"])(e.data.priceMin,t.priceFix),t.consultPriceReady=!0,("BUY"===t.side||"SELL"===t.side&&t.sellPayments.length&&t.balanceReady)&&t.getNewPrice()):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},getBuyPayments:function(t){this.buyPayments=t,this.buyPayments.length&&(this.buyPayActive=this.buyPayments[0].key),this.buyPayLoading=!1},getSellPayments:function(){var t=this;this.axios({url:"otc/payment/find",hostType:"otc"}).then((function(e){if("0"===e.code.toString()){var i=[];e.data.forEach((function(t){t.isOpen&&i.push(t)})),t.sellPayments=i,i.length&&(t.sellPayActive=i[0].payment),t.sellPayLoading=!1,"SELL"===t.side&&i.length&&t.balanceReady&&t.getNewPrice()}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},init:function(t){var e=t.defaultCoin,i=t.defaultSeach,a=t.otcDefaultPaycoin,s=this.$route.query,n=s.side,l=s.legal,r=s.coin,o=s.tradeType,c=s.tradeValue;this.side=n||i,this.legal=l||a,this.coin=r||e,this.tradeType=o||"1",this.tradeValue=c||""},sideChange:function(t){t.index!==this.sideTab&&(1===t.index?(this.side="BUY",this.tradeType="1"):(this.side="SELL",this.tradeType="2"),this.tradeValue="")},setTradeType:function(t){this.tradeType=t,this.tradeValue=""},buyPaymentsChange:function(t){this.buyPayActive=t},sellPaymentsChange:function(t){this.sellPayActive=t},getBalance:function(){var t=this;this.axios({url:"finance/v4/otc_account_list"}).then((function(e){if("0"===e.code.toString()){t.balanceReady=!0;var i={};e.data.allCoinMap.forEach((function(t){i[t.coinSymbol]=t.normal})),t.balanceList=i,t.getBalanceReady=!0,"SELL"===t.side&&t.sellPayments.length&&t.balanceReady&&t.getNewPrice()}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))}}},r=(i("d28c"),{mixins:[l]}),o=r,c=i("2877"),h=Object(c["a"])(o,a,s,!1,null,null,null);e["default"]=h.exports},d28c:function(t,e,i){}}]);