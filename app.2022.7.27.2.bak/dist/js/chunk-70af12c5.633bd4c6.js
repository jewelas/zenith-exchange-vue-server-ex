(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70af12c5","chunk-72353d56"],{"231d":function(t,e,i){},"31de":function(t,e,i){},af4b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-innovations"},[e("div",{staticClass:"flowingWater-table"},[e("c-table",{attrs:{loading:t.tabelLoading,imgMap:t.imgMap,colorMap:t.colorMap,columns:t.columns,dataList:t.tabelList},on:{elementClick:t.goViewPage}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)])},n=[],s=(i("7f7f"),i("6b54"),i("456d"),i("ac6a"),i("95d5")),o={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:s["s"],colorMap:s["b"],type:"all",symbol:"",tabelList:[],symbolList:[],investSymbol:null,paginationObj:{total:0,display:10,currentPage:1}}},computed:{coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},statusList:function(){return[this.$t("innov.have"),this.$t("innov.financing"),this.$t("innov.end")]},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[{title:this.$t("innov.purchase_time"),width:"100px"},{title:this.$t("innov.purchase"),width:"200px"},{title:this.$t("innov.entry")},{title:this.$t("innov.purchase_amount"),width:"150px"},{title:this.$t("innov.obtain_token"),width:"100px"},{title:this.$t("innov.state"),width:"100px"},{title:this.$t("innov.operation"),width:"100px"}];return t},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},axiosType:function(){return"all"===this.type?null:this.type}},watch:{market:function(t){t&&this.setData()}},methods:{init:function(){this.market&&this.setData()},setData:function(){var t=this,e=[{code:"all",value:this.$t("assets.otcFlowingWater.allCoin")}];Object.keys(this.market.coinList).forEach((function(i){1===t.market.coinList[i].otcOpen&&e.push({code:i,value:i})})),this.symbolList=e,this.symbol="all",this.getData()},getData:function(){var t=this;this.axios({url:"/newcoin/invest_manage_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,type:1}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var i=[];e.data.record.length&&(e.data.record.forEach((function(e){t.investSymbol=e.investSymbol;var a=t.market.coinList,n=a[e.investSymbol]?a[e.investSymbol].showPrecision:0,o=a[e.tokenSymbol]?a[e.tokenSymbol].showPrecision:0;i.push({id:e.projectId,data:[Object(s["k"])(e.orderTime),e.orderId,e.name,"".concat(Object(s["f"])(e.investAmount,n),"\n                    ").concat(Object(s["l"])(e.investSymbol,a)),"".concat(Object(s["f"])(e.tokenAmount,o),"\n                    ").concat(Object(s["l"])(e.tokenSymbol,a)),t.setStatusText(e),[{type:"button",text:t.$t("innov.view_details"),iconClass:[""],eventType:"view",classes:t.classesVieew(e)}]]})})),t.tabelList=i,t.paginationObj.total=e.data.count)}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},goViewPage:function(t,e){this.$router.push("/innovation/".concat(e))},classesVieew:function(t){return 7===t.status?"noshow":[]},setStatusText:function(t){var e="";switch(t.status){case 2:e=this.$t("innov.status1");break;case 3:e=this.$t("innov.status2");break;case 4:e=this.$t("innov.status3");break;case 5:e=this.$t("innov.status4");break;default:e=this.$t("innov.status5")}return e}}},r=(i("231d"),{mixins:[o],mounted:function(){this.init()}}),c=r,h=i("2877"),l=Object(h["a"])(c,a,n,!1,null,null,null);e["default"]=l.exports},e0ef:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-flowingWater"},[e("div",{staticClass:"flowingWater-nav a-3-bd"},[e("c-navTab",{attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",className:"b-2-cl",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}})],1),4===t.nowType?[e("innovations")]:[e("div",{staticClass:"flowingWater-options"},[e("c-select",{attrs:{promptText:t.$t("assets.flowingWater.coin"),value:t.symbol,options:t.symbolList,errorHave:!0,width:"120px",filterable:!0},on:{onChanges:t.symbolChange}}),3===t.nowType?e("c-select",{attrs:{promptText:t.$t("assets.flowingWater.type"),value:t.otherType,options:t.otherTypeList,errorHave:!0,width:"zh_CN"===t.lan?"150px":"250px"},on:{onChanges:t.otherTypeChange}}):t._e(),5===t.nowType?e("c-select",{attrs:{promptText:t.$t("assets.flowingWater.type"),value:t.currentIncomeType,options:t.incomeType,errorHave:!0,width:"150px"},on:{onChanges:t.setIncomeType}}):t._e()],1),e("div",{staticClass:"flowingWater-table"},[e("c-table",{attrs:{cellHeight:55,imgMap:t.imgMap,colorMap:t.colorMap,loading:t.tabelLoading,subContent:t.subTableData,subContentId:t.subTableDataId,subColumns:t.subColumns,columns:t.columns,dataList:t.tabelList,bodyClasses:"bodyClasses"},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)]],2)},n=[],s=(i("8e6e"),i("bd86")),o=(i("28a5"),i("768b")),r=(i("456d"),i("ac6a"),i("6b54"),i("c5f6"),i("95d5"));function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function h(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(s["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var l={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:r["s"],colorMap:r["b"],nowType:1,symbol:"",tabelList:[],financeListData:[],subTableDataId:"",subTableData:[],subContentId:null,symbolList:[],otherType:"",otherTypeList:[],otherTypeFirst:!0,paginationObj:{total:0,display:10,currentPage:1},revokeList:[],currentIncomeType:"0",obj:{},lan:Object(r["n"])("lan")}},computed:{incomeType:function(){return[{code:"0",value:this.$t("freeStaking.incomeFilter[0]")},{code:"1",value:this.$t("freeStaking.incomeFilter[2]")},{code:"2",value:this.$t("freeStaking.incomeFilter[1]")}]},freeStakingStatus:function(){return this.obj={},"0"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus1"),1:this.$t("freeStaking.freeStakingStatus2"),2:this.$t("freeStaking.freeStakingStatus3"),3:this.$t("freeStaking.freeStakingStatus4"),10:this.$t("freeStaking.freeStakingStatus21"),11:this.$t("freeStaking.freeStakingStatus22"),12:this.$t("freeStaking.freeStakingStatus23"),13:this.$t("freeStaking.freeStakingStatus24")}),"1"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus5"),1:this.$t("freeStaking.freeStakingStatus6")}),"2"===this.currentIncomeType&&(this.obj={0:this.$t("freeStaking.freeStakingStatus7"),1:this.$t("freeStaking.freeStakingStatus8"),2:this.$t("freeStaking.freeStakingStatus9"),3:this.$t("freeStaking.freeStakingStatus10")}),this.obj},financialTypeStatus:function(){return{0:this.$t("freeStaking.incomeFilter[0]"),1:this.$t("freeStaking.incomeFilter[2]"),2:this.$t("freeStaking.incomeFilter[1]")}},incrementConfigStatus:function(){return this.$store.state.baseData.incrementConfigStatus||0},publicInfo:function(){return this.$store.state.baseData.publicInfo},navTab:function(){var t=[{name:this.$t("assets.flowingWater.RechargeRecord"),index:1},{name:this.$t("assets.flowingWater.WithdrawalsRecord"),index:2},{name:this.$t("assets.flowingWater.OtherRecords"),index:3}];return"1"===this.newcoinOpen&&t.push({name:this.$t("innov.innov_tit"),index:4}),this.incrementConfigStatus&&t.push({name:this.$t("manageFinances.record"),index:5}),t},exchangeData:function(){return this.$store.state.assets.exchangeData},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[];return 1===this.nowType&&(t=[{title:this.$t("assets.flowingWater.RechargeTime"),width:"10%"},{title:this.$t("assets.flowingWater.RechargeCoin"),width:"10%"},{title:this.$t("assets.flowingWater.RechargeVolume"),width:"30%"},{title:this.$t("assets.flowingWater.RechargeNumber"),width:"20%"},{title:this.$t("assets.flowingWater.RechargeStatus"),width:"10%"},{title:this.$t("assets.flowingWater.withdrawOptions"),width:"10%"}]),2===this.nowType&&(t=[{title:this.$t("assets.flowingWater.withdrawTime"),width:"10%"},{title:this.$t("assets.flowingWater.otherCoin"),width:"10%",align:"left"},{title:this.$t("assets.flowingWater.withdrawVolume"),width:"10%"},{title:this.$t("assets.flowingWater.withdrawFee"),width:"10%"},{title:this.$t("assets.flowingWater.withdrawRemarks"),width:"15%"},{title:this.$t("assets.flowingWater.withdrawStatus"),width:"10%"},{title:this.$t("assets.flowingWater.withdrawOptions"),width:"10%"}]),3!==this.nowType&&5!==this.nowType||(t=[{title:this.$t("assets.flowingWater.otherTime"),width:"10%"},{title:this.$t("assets.flowingWater.otherCoin"),width:"10%"},{title:this.$t("assets.flowingWater.otherType"),width:"25%"},{title:this.$t("assets.flowingWater.otherVolume"),width:"25%"},{title:this.$t("assets.flowingWater.otherStatus"),width:"20%"}]),t},subColumns:function(){return[this.$t("assets.flowingWater.withdrawAddress"),this.$t("assets.flowingWater.updataAt"),this.$t("assets.flowingWater.txid")]},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},newcoinOpen:function(){return this.$store.state.baseData.newcoinOpen}},watch:{exchangeData:function(t){t&&this.market&&this.setData()},market:function(t){t&&this.exchangeData&&this.setData()}},methods:{init:function(){this.exchangeData||this.$store.dispatch("assetsExchangeData"),this.exchangeData&&this.market&&this.setData()},getFreeStaking:function(){var t=this;this.axios({url:this.$store.state.url.freeStaking.financial_management,hostType:"fe-increment-api",headers:{},params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,gainCoin:this.axiosSymbol||"",financialType:Number(this.currentIncomeType)},method:"post"}).then((function(e){if("0"===e.code.toString()){var i=e.data,a=i.financeList,n=i.count,s=a.map((function(e,i){var a=t.market.coinList,n=a[e.gainCoin],s=n?n.showPrecision:0,o=Object(r["l"])(e.gainCoin,a);return{id:i,data:[e.time,o,t.financialTypeStatus[e.financialType],Object(r["f"])(e.amount,s),t.freeStakingStatus[e.status]]}}));t.tabelList=s,t.paginationObj.total=n}t.tabelLoading=!1}))},getOtherTypeList:function(){var t=this;this.axios({url:"record/other_transfer_scene"}).then((function(e){if("0"===e.code.toString()){var i=e.data.cenceList,a=[];i.forEach((function(t){a.push({code:t.key,value:t.key_text})})),t.otherTypeList=a,a.length&&(t.otherType=a[0].code),t.getData()}}))},symbolChange:function(t){this.symbol=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},otherTypeChange:function(t){this.otherType=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},setIncomeType:function(t){this.currentIncomeType=t.code,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],this.tabelLoading=!0,this.getData()},currentType:function(t){this.nowType=t.index,this.paginationObj.currentPage=1,this.paginationObj.total=0,this.tabelList=[],4!==t.index&&(this.tabelLoading=!0),3===t.index&&(this.otherTypeFirst?(this.getOtherTypeList(),this.otherTypeFirst=!1):this.getData()),3!==t.index&&this.getData()},setData:function(){var t=this,e=[{code:"all",value:this.$t("assets.flowingWater.allCoin")}],i=this.market.coinList;Object.keys(this.exchangeData.allCoinMap).forEach((function(a){if(!t.exchangeData.allCoinMap[a].isFiat){var n=Object(r["l"])(a,i);e.push({code:a,value:n})}})),this.symbolList=e,this.symbol="all",this.getData()},getData:function(){1===this.nowType?this.rechargeData():2===this.nowType?this.withdrawData():5===this.nowType?this.getFreeStaking():3===this.nowType&&this.otherData()},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},tableClick:function(t,e){var i=this;if("revoke"===t){var a={};this.tabelList.forEach((function(t){t.id===e&&(a=t)})),-1===this.revokeList.indexOf(a.id)&&(this.revokeList.push(a.id),this.axios({url:"/finance/cancel_withdraw",headers:{},params:{withdrawId:a.id},method:"post"}).then((function(t){var e=i.revokeList.indexOf(a.id);i.revokeList.splice(e,1),"0"===t.code.toString()?(i.getData(),i.$bus.$emit("tip",{text:t.msg,type:"success"})):i.$bus.$emit("tip",{text:t.msg,type:"error"})})))}"subView"===t&&(this.subTableDataId=e.id,this.subTableData=[],this.financeListData.forEach((function(t){if(t.id===i.subTableDataId){var e=t.addressTo,a=t.txid;if(i.isHavePage){var n=e.split("_"),s=Object(o["a"])(n,1),c=s[0];e=c}if(i.publicInfo.switch.open_txid_addr_jump&&"1"===i.publicInfo.switch.open_txid_addr_jump&&t.txidAddr){var h="<a href='".concat(t.txidAddr,"' target='_blank' class='b-4-cl'>").concat(t.txid,"</a>");a=h}i.subTableData.push([e,t.walletTime?Object(r["k"])(t.walletTime):"---",a||"---"])}})))},rechargeData:function(){var t=this;this.axios({url:"record/deposit_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol}}).then((function(e){if(1===t.nowType&&"0"===e.code.toString()){var i=[];t.financeListData=e.data.financeList.map((function(t,e){return h(h({},t),{},{id:e})})),e.data.financeList.forEach((function(e,a){var n=t.market.coinList,s=n[e.symbol]&&n[e.symbol].showPrecision||0,o=Object(r["l"])(e.symbol,n);i.push({id:a,data:[e.createdAt,o,Object(r["f"])(e.amount,s),e.confirmDesc,e.status_text,t.handleButton(e)]})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}}))},withdrawData:function(){var t=this;this.axios({url:"record/withdraw_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol}}).then((function(e){if(2===t.nowType&&"0"===e.code.toString()){var i=[];t.financeListData=e.data.financeList,e.data.financeList.forEach((function(e){var a=t.market.coinList,n=a[e.symbol]&&a[e.symbol].showPrecision||0,s=Object(r["l"])(e.symbol,a);i.push({id:e.id,data:[e.createdAt,s,Object(r["f"])(e.amount,n),Object(r["f"])(e.fee,n),e.label,e.status_text,t.handleButton(e)]})})),t.tabelLoading=!1,t.tabelList=i,t.paginationObj.total=e.data.count}}))},handleButton:function(t){var e=[];return 0===t.status&&2===this.nowType&&e.push({type:"button",text:this.$t("assets.flowingWater.Cancel"),iconClass:[""],eventType:"revoke"}),e.push({type:"subTable",classes:"u-8-cl",text:this.$t("trade.view"),eventType:"subView"}),e},otherData:function(){var t=this;this.axios({url:"record/other_transfer_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,coinSymbol:this.axiosSymbol,transactionScene:this.otherType}}).then((function(e){if(3===t.nowType&&"0"===e.code.toString()){var i=e.data,a=i.financeList,n=i.count,s=[];a.forEach((function(e,i){var a=t.market.coinList,n=a[e.coinSymbol]&&a[e.coinSymbol].showPrecision||0,o=Object(r["l"])(e.coinSymbol,a);s.push({id:i,data:[e.createTime,o,e.transactionScene,Object(r["f"])(e.amount,n),e.status_text]})})),t.tabelLoading=!1,t.tabelList=s,t.paginationObj.total=n}}))}}},u=(i("31de"),i("af4b")),g={mixins:[l],mounted:function(){this.init()},components:{innovations:u["default"]}},p=g,b=i("2877"),f=Object(b["a"])(p,a,n,!1,null,null,null);e["default"]=f.exports}}]);