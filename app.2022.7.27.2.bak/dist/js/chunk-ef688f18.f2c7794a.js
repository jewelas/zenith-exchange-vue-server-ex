(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ef688f18"],{"67e7":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-exchangeOrder fuz-card"},[e("div",{staticClass:"exchangeOrder-nav fuz-card-tab"},[e("c-navTab",{attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}}),2===t.nowType?e("div",{staticClass:"exchangeOrder-nav-switchs"},[e("c-switch",{attrs:{value:t.switchFlag},on:{click:t.switchChange}}),e("span",{staticClass:"text"},[t._v(t._s(t.$t("order.exchangeOrder.haveCancel")))])],1):t._e()],1),e("div",{staticClass:"exchangeOrder-options"},[e("c-select",{attrs:{promptText:t.$t("order.exchangeOrder.type"),value:t.side,options:t.sideList,errorHave:!0,width:"120px"},on:{onChanges:t.sideChange}}),e("c-select",{attrs:{promptText:t.$t("order.exchangeOrder.market"),value:t.symbolMarket,options:t.symbolMarketList,errorHave:!0,width:"160px",filterable:!0},on:{onChanges:t.symbolMarketChange}}),e("c-select",{attrs:{promptText:t.$t("order.exchangeOrder.coin"),value:t.symbolCoin,options:t.symbolCoinList,errorHave:!0,width:"150px",filterable:!0},on:{onChanges:t.symbolCoinChange}})],1),e("div",{staticClass:"exchangeOrder-table"},[e("c-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,dataList:t.tabelList,subContent:t.subContent,subColumns:t.subColumns,subContentId:t.subContentId,subLoading:t.subLoading},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)])},r=[],o=(i("6b54"),i("7f7f"),i("28a5"),i("456d"),i("ac6a"),i("c5f6"),i("95d5")),n={data:function(){return{imgMap:o["s"],colorMap:o["b"],deleteArr:[],tabelLoading:!0,switchFlag:!1,nowType:1,symbol:"",symbolList:[],side:"all",paginationObj:{total:0,display:10,currentPage:1},symbolMarketList:[],symbolMarket:"",symbolCoinList:[],symbolCoin:"",subTableData:{},tabelList:[],revokeList:[],subContent:[],subColumns:[],subContentId:0,subLoading:!1}},watch:{market:function(t){t&&this.initSymbolMarketList()}},computed:{navTab:function(){return[{name:this.$t("order.exchangeOrder.nowOrder"),index:1},{name:this.$t("order.exchangeOrder.hisOrder"),index:2}]},sideList:function(){return[{code:"all",value:this.$t("order.exchangeOrder.all")},{code:"buy",value:this.$t("order.exchangeOrder.buy")},{code:"sell",value:this.$t("order.exchangeOrder.sell")}]},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[];return 1===this.nowType&&(t=[{title:this.$t("order.exchangeOrder.nowOrderTime"),width:"70px"},{title:this.$t("order.exchangeOrder.coin"),width:"90px"},{title:this.$t("order.exchangeOrder.nowOrderType"),width:"50px"},{title:"".concat(this.$t("order.exchangeOrder.nowOrderPrice"))},{title:"".concat(this.$t("order.exchangeOrder.nowOrderVolume"))},{title:"".concat(this.$t("order.exchangeOrder.nowOrderTotol"))},{title:"".concat(this.$t("order.exchangeOrder.nowOrderAverage"))},{title:"".concat(this.$t("order.exchangeOrder.nowOrderTransaction")),width:"140px"},{title:this.$t("order.exchangeOrder.nowOrderOptions"),width:"100px"}]),2===this.nowType&&(t=[{title:this.$t("order.exchangeOrder.hisOrderTime"),width:"70px"},{title:this.$t("order.exchangeOrder.coin"),width:"90px"},{title:this.$t("order.exchangeOrder.hisOrderType"),width:"50px"},{title:"".concat(this.$t("order.exchangeOrder.hisOrderPrice"))},{title:"".concat(this.$t("order.exchangeOrder.hisOrderVolume"))},{title:"".concat(this.$t("order.exchangeOrder.hisOrderAverage"))},{title:this.$t("order.exchangeOrder.hisOrderStatus")},{title:this.$t("order.exchangeOrder.hisOrderOptions"),width:"100px"}]),t},axiosSide:function(){return"all"===this.side?"":this.side},axiosSymbol:function(){return"".concat(this.symbolCoin).concat(this.symbolMarket).toLowerCase()},symbolAll:function(){return this.$store.state.baseData.symbolAll},openOrderCollect:function(){return this.$store.state.baseData.publicInfo?this.$store.state.baseData.publicInfo.open_order_collect:null}},methods:{init:function(){this.$route.query.nowType&&(this.nowType=Number(this.$route.query.nowType)),this.market&&this.initSymbolMarketList()},symbolMarketChange:function(t){if(this.symbolMarket!==t.code){this.symbolMarket=t.code;var e=[];"1"===this.openOrderCollect&&"all"===this.symbolMarket&&e.push({value:this.$t("order.exchangeOrder.all"),code:"all"});var i=this.market.market,a=i[this.symbolMarket];"all"===this.symbolMarket&&(a=this.symbolAll),a&&Object.keys(a).forEach((function(t){var i=t.split("/"),r=a[t],o=r.showName||r.name;e.push({code:"".concat(i[0]).concat(i[1]),value:o})})),this.symbolCoinList=e,e.length&&this.symbolCoinChange(e[0])}},symbolCoinChange:function(t){this.symbolCoin!==t.code&&(this.symbolCoin=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.clearSub(),this.getData())},initSymbolMarketList:function(){var t=this.market,e=t.market,i=t.coinList,a=[];"1"===this.openOrderCollect&&a.push({value:this.$t("order.exchangeOrder.all180"),code:"all"}),Object.keys(e).forEach((function(t){a.push({value:Object(o["l"])(t,i),code:t})})),this.symbolMarketList=a,a.length&&this.symbolMarketChange(a[0])},switchChange:function(){this.switchFlag=!this.switchFlag,this.getData()},currentType:function(t){this.nowType!==t.index&&(this.nowType=t.index,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.clearSub(),this.getData())},getData:function(){1===this.nowType?this.getNowData():2===this.nowType&&this.getHisData()},getFix:function(t,e){var i=0,a=0,r="".concat(e,"/").concat(t);if(this.symbolAll[r]){var o=this.symbolAll[r],n=o.price,s=o.volume;i=n,a=s}return{marketFix:i,coinFix:a}},getNowData:function(){var t=this,e="all"===this.symbolCoin?"":this.symbolCoin,i=e.toLowerCase(),a="order/list/new",r={side:this.axiosSide,pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,symbol:i};"1"===this.openOrderCollect&&(r.entrust=this.nowType,r.orderType=1,a="order/entrust_search"),this.axios({url:a,method:"post",params:r}).then((function(e){if(1===t.nowType)if("0"===e.code.toString()){var i=[],a=e.data.orderList;"1"===t.openOrderCollect&&(a=e.data.orders),a.forEach((function(e){var a=e.quoteCoin||e.countCoin,r=t.getFix(a,e.baseCoin),n=r.marketFix,s=r.coinFix,c=!0;(2===e.type||5===e.status||e.isCloseCancelOrder&&"1"===e.isCloseCancelOrder.toString())&&(c=!1);var l=t.market.coinList;i.push({id:e.id,data:[e.created_at,"".concat(Object(o["l"])(e.baseCoin,l),"/").concat(Object(o["l"])(a,l)),[{text:e.side_text,classes:"BUY"===e.side?"b-5-cl":"b-6-cl"}],"1"===e.type.toString()?"".concat(Object(o["f"])(e.price,n)," ").concat(Object(o["l"])(a,l)):t.$t("order.exchangeOrder.marketPrice"),"".concat(Object(o["f"])(e.volume,s)," ").concat(Object(o["l"])(e.baseCoin,l)),"".concat(Object(o["f"])(e.total_price,n)," ").concat(Object(o["l"])(a,l)),"".concat(Object(o["f"])(e.avg_price,n)," ").concat(Object(o["l"])(a,l)),[{text:"".concat(Object(o["f"])(e.deal_volume,s)," ").concat(Object(o["l"])(e.baseCoin,l)),subContent:{text:"".concat(Object(o["f"])(e.remain_volume,s)," ").concat(Object(o["l"])(e.baseCoin,l))}}],[c?{type:"QUANT-GRID"===e.source?"label":"button",text:t.$t("order.exchangeOrder.cancel"),eventType:"cancelOrder",classes:"QUANT-GRID"===e.source?"tableNownStyle b-2-cl":"",tipFlag:"QUANT-GRID"===e.source,tip:{text:t.$t("gridTrade.cancelTip"),width:"340px",leftMr:"50px"}}:""]],symbol:e.symbol})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}else t.tabelLoading=!1,t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},pagechange:function(t){this.paginationObj.currentPage=t,this.clearSub(),this.getData()},getHisData:function(){var t=this,e="all"===this.symbolCoin?"":this.symbolCoin,i=e.toLowerCase(),a="/order/entrust_history",r={side:this.axiosSide,pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,isShowCanceled:this.switchFlag?1:0,symbol:i};"1"===this.openOrderCollect&&(r.entrust=this.nowType,r.orderType=1,a="order/entrust_search"),this.axios({url:a,method:"post",params:r}).then((function(e){if(2===t.nowType)if("0"===e.code.toString()){var i=[],a=e.data.orderList;"1"===t.openOrderCollect&&(a=e.data.orders);var r=t.market.coinList;a.forEach((function(e){var a=e.quoteCoin||e.countCoin,n=t.getFix(a,e.baseCoin),s=n.marketFix,c=n.coinFix,l=[];l=2===e.status||4===e.status&&0!==parseFloat(e.deal_volume)?[{type:"subTable",text:t.$t("order.exchangeOrder.details"),eventType:"view"}]:[],i.push({id:e.id,data:[e.created_at,"".concat(Object(o["l"])(e.baseCoin,r),"/").concat(Object(o["l"])(a,r)),[{text:e.side_text,classes:"BUY"===e.side?"b-5-cl":"b-6-cl"}],"1"===e.type.toString()?"".concat(Object(o["f"])(e.price,s)," ").concat(Object(o["l"])(a,r)):t.$t("order.exchangeOrder.marketPrice"),"".concat(Object(o["f"])(e.volume,c)," ").concat(Object(o["l"])(e.baseCoin,r)),"".concat(Object(o["f"])(e.avg_price,s)," ").concat(Object(o["l"])(a,r)),e.status_text,l],symbol:e.symbol,fixCoin:"".concat(e.baseCoin,"/").concat(a)})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}else t.tabelLoading=!1,t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},sideChange:function(t){this.side!==t.code&&(this.side=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.clearSub(),this.getData())},tableClick:function(t,e){"cancelOrder"===t&&this.cancelOrder(e),"view"===t&&this.getSubTableData(e)},clearSub:function(){this.subContentId=null,this.subColumns=[],this.subContent=[],this.subLoading=!1},getSubTableData:function(t){var e=this;if(t.open){this.subContentId=t.id,this.subColumns=[this.$t("order.exchangeOrder.detailsTime"),this.$t("order.exchangeOrder.detailsPrice"),this.$t("order.exchangeOrder.detailsVolume"),this.$t("order.exchangeOrder.detailsTotol"),this.$t("order.exchangeOrder.detailsFee")],this.subContent=[],this.subLoading=!0;var i="",a="";this.tabelList.forEach((function(e){e.id===t.id&&(i=e.symbol,a=e.fixCoin)}));var r="".concat(i);this.axios({url:"trade/list_by_order",method:"post",params:{symbol:r,order_id:t.id}}).then((function(i){if(t.id===e.subContentId)if("0"===i.code.toString()){var r=[];i.data.trade_list.forEach((function(t){var i=e.getFix(a.split("/")[1],a.split("/")[0]),n=i.marketFix,s=i.coinFix;r.push({ctime:t.ctime,price:Object(o["f"])(t.price,n),volume:Object(o["f"])(t.volume,s),dealPrice:Object(o["f"])(t.deal_price,n),fee:t.fee})})),e.subLoading=!1,e.subContent=r}else e.subLoading=!1,e.$bus.$emit("tip",{text:i.msg,type:"error"})}))}},cancelOrder:function(t){var e=this;if(-1===this.revokeList.indexOf(t)){this.revokeList.push(t);var i="";this.tabelList.forEach((function(e){e.id===t&&(i=e.symbol)})),this.axios({url:"order/cancel",method:"post",params:{orderId:t,symbol:i}}).then((function(i){var a=e.revokeList.indexOf(t);if(e.revokeList.splice(a,1),"0"===i.code.toString()){e.$bus.$emit("tip",{text:i.msg,type:"success"});var r=0;e.tabelList.forEach((function(e,i){e.id===t&&(r=i)})),e.tabelList.splice(r,1)}else e.$bus.$emit("tip",{text:i.msg,type:"error"})}))}}}},s=(i("f858"),{mixins:[n],mounted:function(){this.init()}}),c=s,l=i("2877"),d=Object(l["a"])(c,a,r,!1,null,null,null);e["default"]=d.exports},f858:function(t,e,i){}}]);