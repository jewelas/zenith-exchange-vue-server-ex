(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4544301a","chunk-7783c919"],{1264:function(t,e,i){},e19b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"v5-page-flowingWater fuz-card"},[e("header",{staticClass:"flowingWater-header v5-5-cl"},[e("svg",{staticClass:"icon icon-20 icon-back",attrs:{"aria-hidden":"true"},on:{click:t.goBack}},[e("use",{attrs:{"xlink:href":"#icon-v5_36"}})]),e("span",[t._v(t._s(t.$t("assets.index.flowingWater")))]),e("div",{staticClass:"selectParam"},[3===t.nowType?e("c-v5-select",{staticClass:"type-select flowWater-select",attrs:{value:t.otherType,options:t.otherTypeList,errorHave:!0,width:"zh_CN"===t.lan?"160px":"250px",inputHeight:"32px"},on:{onChanges:t.otherTypeChange}}):t._e(),5===t.nowType?e("c-v5-select",{staticClass:"type-select flowWater-select",attrs:{value:t.currentIncomeType,options:t.incomeType,errorHave:!0,width:"160px",inputHeight:"32px"},on:{onChanges:t.setIncomeType}}):t._e(),e("c-v5-select",{staticClass:"flowWater-select",attrs:{value:t.symbol,options:t.symbolList,errorHave:!0,width:"160px",inputHeight:"32px",filterable:!0},on:{onChanges:t.symbolChange}})],1)]),e("div",{staticClass:"flowingWater-nav fuz-card-tab"},[e("c-v5-navTab",{attrs:{activeClassName:"v5-5-cl",activeColor:"v5-1-bg",className:"v5-6-cl",currentTab:t.nowType,navTab:t.navTab},on:{currentType:t.currentType}})],1),4===t.nowType?[e("innovations")]:[e("div",{staticClass:"flowingWater-table fuz-full"},[e("c-v5-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,dataList:t.tabelList},scopedSlots:t._u([{key:"coin",fn:function(i){return t.coinList&&t.coinList[i.row.coin]?e("dl",{staticClass:"table-coin"},[e("dt",[e("img",{attrs:{src:t.coinList[i.row.coin].icon,alt:""}})]),e("dd",[e("div",{staticClass:"coinShowName v5-5-cl"},[t._v(t._s(t._f("getCoinShowName")(i.row.coin,t.coinList)))]),e("div",{staticClass:"coinLongName v5-6-cl"},[t._v("\n              "+t._s(t.coinList[i.row.coin].longName||i.row.coin)+"\n            ")])])]):t._e()}},{key:"address",fn:function(i){return e("div",{staticClass:"address-col"},[e("span",{staticClass:"col-value"},[t._v(t._s(i.row.address))]),e("span",{staticClass:"copy",on:{click:function(e){return t.copy(i.row.addressLong)}}},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_7"}})])]),e("div",{staticClass:"long-value v5-5-cl v5-19-bg box-shadow"},[t._v("\n            "+t._s(i.row.addressLong)+"\n          ")])])}},{key:"txid",fn:function(i){return e("div",{staticClass:"address-col"},[e("span",{staticClass:"col-value"},[t._v(t._s(i.row.txid))]),i.row.txidLong?e("span",{staticClass:"copy",on:{click:function(e){return t.copy(i.row.txidLong)}}},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_7"}})])]):t._e(),i.row.txidLong?e("div",{staticClass:"long-value v5-5-cl v5-19-bg box-shadow"},[t._v("\n            "+t._s(i.row.txidLong)+"\n          ")]):t._e()])}},{key:"operation",fn:function(i){return e("div",{staticClass:"operation"},t._l(i.row.operation,(function(a,n){return e("c-v5-button",{key:n,attrs:{type:"text",paddingW:"0",disabled:a.disabled},on:{click:function(e){return t.tableClick(a.type,i.row.id)}}},[t._v("\n            "+t._s(a.text)+"\n          ")])})),1)}}],null,!0)}),t.paginationObj.total>t.paginationObj.display?e("c-v5-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)],e("input",{ref:"copyValue",staticClass:"copyValue",attrs:{type:"text"},domProps:{value:t.copyValue}})],2)},n=[],s=(i("8e6e"),i("bd86")),o=(i("a481"),i("456d"),i("ac6a"),i("6b54"),i("c5f6"),i("95d5"));function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){Object(s["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var l={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:o["s"],colorMap:o["b"],nowType:1,symbol:"",tabelList:[],financeListData:[],symbolList:[],otherType:"",otherTypeList:[],otherTypeFirst:!0,paginationObj:{total:0,display:10,currentPage:1},revokeList:[],currentIncomeType:"0",obj:{},lan:Object(o["n"])("lan"),copyValue:""}},computed:{incomeType:function(){return[{code:"0",value:this.$t("freeStaking.incomeFilter[0]")},{code:"1",value:this.$t("freeStaking.incomeFilter[2]")},{code:"2",value:this.$t("freeStaking.incomeFilter[1]")}]},freeStakingStatus:function(){return this.obj={},"0"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus1"),1:this.$t("freeStaking.freeStakingStatus2"),2:this.$t("freeStaking.freeStakingStatus3"),3:this.$t("freeStaking.freeStakingStatus4"),10:this.$t("freeStaking.freeStakingStatus21"),11:this.$t("freeStaking.freeStakingStatus22"),12:this.$t("freeStaking.freeStakingStatus23"),13:this.$t("freeStaking.freeStakingStatus24")}),"1"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus5"),1:this.$t("freeStaking.freeStakingStatus6")}),"2"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus7"),1:this.$t("freeStaking.freeStakingStatus8"),2:this.$t("freeStaking.freeStakingStatus9"),3:this.$t("freeStaking.freeStakingStatus10")}),this.obj},financialTypeStatus:function(){return{0:this.$t("freeStaking.incomeFilter[0]"),1:this.$t("freeStaking.incomeFilter[2]"),2:this.$t("freeStaking.incomeFilter[1]")}},incrementConfigStatus:function(){return this.$store.state.baseData.incrementConfigStatus||0},publicInfo:function(){return this.$store.state.baseData.publicInfo},navTab:function(){var t=[{name:this.$t("assets.flowingWater.RechargeRecord"),index:1},{name:this.$t("assets.flowingWater.WithdrawalsRecord"),index:2},{name:this.$t("assets.flowingWater.OtherRecords"),index:3}];return"1"===this.newcoinOpen&&t.push({name:this.$t("innov.innov_tit"),index:4}),this.incrementConfigStatus&&t.push({name:this.$t("manageFinances.record"),index:5}),t},exchangeData:function(){return this.$store.state.assets.exchangeData},market:function(){return this.$store.state.baseData.market},coinList:function(){return this.market&&this.market.coinList},columns:function(){var t=[];return 1===this.nowType&&(t=[{key:"coin",title:this.$t("assets.recharge.RechargeCoin"),width:"13%"},{key:"time",title:this.$t("assets.recharge.RechargeTime"),width:"12%"},{key:"amount",title:this.$t("assets.recharge.RechargeVolume"),width:"13%"},{key:"count",title:this.$t("assets.recharge.RechargeNumber"),width:"10%"},{key:"address",title:this.$t("assets.recharge.rechargeAddress"),width:"17%"},{key:"updateAt",title:this.$t("assets.flowingWater.updataAt"),width:"10%"},{key:"txid",title:this.$t("assets.flowingWater.txid"),width:"13%"},{key:"status",title:this.$t("assets.recharge.RechargeStatus"),width:"12%"}]),2===this.nowType&&(t=[{key:"coin",title:this.$t("assets.recharge.RechargeCoin"),width:"10%"},{key:"time",title:this.$t("assets.withdraw.withdrawTime"),width:"10%"},{key:"amount",title:this.$t("assets.withdraw.withdrawVolume"),width:"10%"},{key:"fee",title:this.$t("assets.flowingWater.withdrawFee"),width:"7%"},{key:"address",title:this.$t("assets.withdraw.withdrawAddress"),width:"15%"},{key:"remark",title:this.$t("assets.flowingWater.withdrawRemarks"),width:"10%"},{key:"updateAt",title:this.$t("assets.flowingWater.updataAt"),width:"10%"},{key:"txid",title:this.$t("assets.flowingWater.txid"),width:"15%"},{key:"statusText",title:this.$t("assets.withdraw.withdrawStatus"),width:"8%"},{key:"operation",title:this.$t("assets.withdraw.withdrawOptions"),width:"5%"}]),3!==this.nowType&&5!==this.nowType||(t=[{key:"coin",title:this.$t("assets.flowingWater.otherCoin"),width:"23%"},{key:"time",title:this.$t("assets.flowingWater.otherTime"),width:"23%"},{key:"type",title:this.$t("assets.flowingWater.otherType"),width:"23%"},{key:"amount",title:this.$t("assets.flowingWater.otherVolume"),width:"23%"},{key:"statusText",title:this.$t("assets.flowingWater.otherStatus"),width:"8%"}]),t},subColumns:function(){return[this.$t("assets.flowingWater.withdrawAddress"),this.$t("assets.flowingWater.updataAt"),this.$t("assets.flowingWater.txid")]},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},newcoinOpen:function(){return this.$store.state.baseData.newcoinOpen}},watch:{exchangeData:function(t){t&&this.market&&this.setData()},market:function(t){t&&this.exchangeData&&this.setData()}},filters:{fixDFn:function(t,e){return Object(o["f"])(t,e.showPrecision)},getCoinShowName:function(t,e){return t?Object(o["l"])(t,e):""}},methods:{init:function(){this.exchangeData||this.$store.dispatch("assetsExchangeData"),this.exchangeData&&this.market&&this.setData()},goBack:function(){this.$router.back()},getFreeStaking:function(){var t=this;this.axios({url:this.$store.state.url.freeStaking.financial_management,hostType:"fe-increment-api",headers:{},params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,gainCoin:this.axiosSymbol||"",financialType:Number(this.currentIncomeType)},method:"post"}).then((function(e){if("0"===e.code.toString()){var i=e.data,a=i.financeList,n=i.count,s=a.map((function(e,i){var a=t.market.coinList,n=a[e.gainCoin],s=n?n.showPrecision:0,r=Object(o["l"])(e.gainCoin,a);return{id:i,coin:e.gainCoin,showCoin:r,time:e.time,type:t.financialTypeStatus[e.financialType],amount:t.thousands(Object(o["f"])(e.amount,s)),statusText:t.freeStakingStatus[e.status]}}));t.tabelList=s,t.paginationObj.total=n}t.tabelLoading=!1}))},getOtherTypeList:function(){var t=this;this.axios({url:"record/other_transfer_scene"}).then((function(e){if("0"===e.code.toString()){var i=e.data.cenceList,a=[];i.forEach((function(t){a.push({code:t.key,value:t.key_text})})),t.otherTypeList=a,a.length&&(t.otherType=a[0].code),t.getData()}}))},symbolChange:function(t){this.symbol=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},otherTypeChange:function(t){this.otherType=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},setIncomeType:function(t){this.currentIncomeType=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},currentType:function(t){this.nowType=t.index,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],4!==t.index&&(this.tabelLoading=!0),3===t.index&&(this.otherTypeFirst?(this.getOtherTypeList(),this.otherTypeFirst=!1):this.getData()),3!==t.index&&this.getData()},setData:function(){var t=this,e=[{code:"all",value:this.$t("assets.flowingWater.allCoin")}],i=this.market.coinList;Object.keys(this.exchangeData.allCoinMap).forEach((function(a){if(!t.exchangeData.allCoinMap[a].isFiat){var n=Object(o["l"])(a,i);e.push({img:i[a].icon,code:a,value:n})}})),this.symbolList=e,this.symbol="all",this.getData()},getData:function(){1===this.nowType?this.rechargeData():2===this.nowType?this.withdrawData():5===this.nowType?this.getFreeStaking():3===this.nowType&&this.otherData()},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},tableClick:function(t,e){var i=this;"revoke"===t&&-1===this.revokeList.indexOf(e)&&(this.revokeList.push(e),this.axios({url:"/finance/cancel_withdraw",headers:{},params:{withdrawId:e},method:"post"}).then((function(t){var a=i.revokeList.indexOf(e);i.revokeList.splice(a,1),"0"===t.code.toString()?(i.getData(),i.$bus.$emit("tip",{text:t.msg,type:"success"})):i.$bus.$emit("tip",{text:t.msg,type:"error"})})))},copy:function(t){var e=this;this.copyValue=t,this.$nextTick((function(){var t=e.$refs.copyValue;t.select(),document.execCommand("copy"),e.$bus.$emit("tip",{text:e.$t("assets.krw.copySuccess"),type:"success"})}))},thousands:function(t){if(t&&parseFloat(t)){var e=t.toString(),i=e.indexOf(".")>-1?/(\d)(?=(\d{3})+\.)/g:/(\d)(?=(?:\d{3})+$)/g;return e.replace(i,"$1,")}return t},rechargeData:function(){var t=this;this.axios({url:"record/deposit_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol}}).then((function(e){if(1===t.nowType&&"0"===e.code.toString()){var i=[];t.financeListData=e.data.financeList.map((function(t,e){return c(c({},t),{},{id:e})}));var a=t.coinList;e.data.financeList.forEach((function(e){var n=e.txid;n&&n.length>15&&(n="".concat(n.slice(0,8),"...").concat(n.slice(-6)));var s=e.addressTo;s&&s.length>15&&(s="".concat(s.slice(0,8),"...").concat(s.slice(-6)));var r=a[e.symbol]&&a[e.symbol].showPrecision||0,c=Object(o["f"])(e.amount,r);i.push({coin:e.symbol,time:e.createdAt,amount:t.thousands(c),count:e.confirmDesc,address:s,addressLong:e.addressTo,updateAt:e.walletTime?Object(o["k"])(e.walletTime):"- -",txid:n||"- -",txidLong:e.txid,status:e.status_text})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}}))},withdrawData:function(){var t=this;this.axios({url:"record/withdraw_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol}}).then((function(e){if(2===t.nowType&&"0"===e.code.toString()){var i=[];t.financeListData=e.data.financeList;var a=t.coinList;e.data.financeList.forEach((function(e){var n=e.txid;n&&n.length>15&&(n="".concat(n.slice(0,8),"...").concat(n.slice(-6)));var s=e.addressTo;s&&s.length>15&&(s="".concat(s.slice(0,8),"...").concat(s.slice(-6)));var r=a[e.symbol]&&a[e.symbol].showPrecision||0,c=Object(o["f"])(e.amount,r),l=Object(o["f"])(e.fee,r),h=[];0===e.status?h.push({type:"revoke",text:t.$t("assets.flowingWater.Cancel")}):h.push({type:"",disabled:!0,text:"--"}),i.push({id:e.id,coin:e.symbol,time:e.createdAt,amount:t.thousands(c),fee:t.thousands(l),address:s,addressLong:e.addressTo,remark:e.label,updateAt:e.walletTime?Object(o["k"])(e.walletTime):"- -",txid:n||"- -",txidLong:e.txid,status:e.status,statusText:e.status_text,operation:h})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}}))},otherData:function(){var t=this;this.axios({url:"record/other_transfer_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol,transactionScene:this.otherType}}).then((function(e){if(3===t.nowType&&"0"===e.code.toString()){var i=e.data,a=i.financeList,n=i.count,s=[];a.forEach((function(e,i){var a=t.market.coinList,n=a[e.coinSymbol]&&a[e.coinSymbol].showPrecision||0,r=Object(o["l"])(e.coinSymbol,a);s.push({id:i,coin:e.coinSymbol,showCoin:r,time:e.createTime,type:e.transactionScene,amount:t.thousands(Object(o["f"])(e.amount,n)),statusText:e.status_text})})),t.tabelLoading=!1,t.tabelList=s,t.paginationObj.total=n}}))}}},h=(i("1264"),i("ecc9")),u={mixins:[l],mounted:function(){this.init()},components:{innovations:h["default"]}},d=u,g=i("2877"),p=Object(g["a"])(d,a,n,!1,null,null,null);e["default"]=p.exports},e204:function(t,e,i){},ecc9:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"v5-page-innovations"},[e("div",{staticClass:"flowingWater-table"},[e("c-v5-table",{attrs:{loading:t.tabelLoading,imgMap:t.imgMap,colorMap:t.colorMap,columns:t.columns,dataList:t.tabelList},on:{elementClick:t.goViewPage},scopedSlots:t._u([{key:"coin",fn:function(i){return t.coinList&&t.coinList[i.row.coin]?e("dl",{staticClass:"table-coin"},[e("dt",[e("img",{attrs:{src:t.coinList[i.row.coin].icon,alt:""}})]),e("dd",[e("div",{staticClass:"coinShowName v5-5-cl"},[t._v(t._s(t._f("getCoinShowName")(i.row.coin,t.coinList)))]),e("div",{staticClass:"coinLongName v5-6-cl"},[t._v("\n            "+t._s(t.coinList[i.row.coin].longName||i.row.coin)+"\n          ")])])]):t._e()}},{key:"operation",fn:function(i){return e("div",{staticClass:"operation"},[e("c-v5-button",{attrs:{type:"text",paddingW:"0"},on:{click:function(e){return t.goViewPage(i.row.id)}}},[t._v("\n          "+t._s(i.row.operation)+"\n        ")])],1)}}],null,!0)}),t.paginationObj.total>t.paginationObj.display?e("c-v5-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)])},n=[],s=(i("7f7f"),i("6b54"),i("456d"),i("ac6a"),i("95d5")),o={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:s["s"],colorMap:s["b"],type:"all",symbol:"",tabelList:[],symbolList:[],investSymbol:null,paginationObj:{total:0,display:10,currentPage:1}}},computed:{coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},statusList:function(){return[this.$t("innov.have"),this.$t("innov.financing"),this.$t("innov.end")]},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[{key:"time",title:this.$t("innov.purchase_time"),width:"100px"},{key:"orderId",title:this.$t("innov.purchase"),width:"200px"},{key:"name",title:this.$t("innov.entry")},{key:"amount",title:this.$t("innov.purchase_amount"),width:"150px"},{key:"token",title:this.$t("innov.obtain_token"),width:"100px"},{key:"statusText",title:this.$t("innov.state"),width:"100px"},{key:"operation",title:this.$t("innov.operation"),width:"100px"}];return t},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},axiosType:function(){return"all"===this.type?null:this.type}},watch:{market:function(t){t&&this.setData()}},methods:{init:function(){this.market&&this.setData()},setData:function(){var t=this,e=[{code:"all",value:this.$t("assets.otcFlowingWater.allCoin")}];Object.keys(this.market.coinList).forEach((function(i){1===t.market.coinList[i].otcOpen&&e.push({code:i,value:i})})),this.symbolList=e,this.symbol="all",this.getData()},getData:function(){var t=this;this.axios({url:"/newcoin/invest_manage_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,type:1}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var i=[];e.data.record.length&&(e.data.record.forEach((function(e){t.investSymbol=e.investSymbol;var a=t.market.coinList,n=a[e.investSymbol]?a[e.investSymbol].showPrecision:0,o=a[e.tokenSymbol]?a[e.tokenSymbol].showPrecision:0;i.push({id:e.projectId,time:Object(s["k"])(e.orderTime),orderId:e.orderId,name:e.name,amount:"".concat(Object(s["f"])(e.investAmount,n)).concat(Object(s["l"])(e.investSymbol,a)),token:"".concat(Object(s["f"])(e.tokenAmount,o)).concat(Object(s["l"])(e.tokenSymbol,a)),statusText:t.setStatusText(e),status:e.status,operation:t.$t("innov.view_details")})})),t.tabelList=i,t.paginationObj.total=e.data.count)}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},goViewPage:function(t){this.$router.push("/innovation/".concat(t))},classesVieew:function(t){return 7===t.status?"noshow":[]},setStatusText:function(t){var e="";switch(t.status){case 2:e=this.$t("innov.status1");break;case 3:e=this.$t("innov.status2");break;case 4:e=this.$t("innov.status3");break;case 5:e=this.$t("innov.status4");break;default:e=this.$t("innov.status5")}return e}}},r=(i("e204"),{mixins:[o],mounted:function(){this.init()}}),c=r,l=i("2877"),h=Object(l["a"])(c,a,n,!1,null,null,null);e["default"]=h.exports}}]);