(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72353d56"],{"231d":function(t,n,i){},af4b:function(t,n,i){"use strict";i.r(n);var a=function(){var t=this,n=t._self._c;return n("section",{staticClass:"page-innovations"},[n("div",{staticClass:"flowingWater-table"},[n("c-table",{attrs:{loading:t.tabelLoading,imgMap:t.imgMap,colorMap:t.colorMap,columns:t.columns,dataList:t.tabelList},on:{elementClick:t.goViewPage}}),t.paginationObj.total>t.paginationObj.display?n("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)])},e=[],s=(i("7f7f"),i("6b54"),i("456d"),i("ac6a"),i("95d5")),o={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:s["s"],colorMap:s["b"],type:"all",symbol:"",tabelList:[],symbolList:[],investSymbol:null,paginationObj:{total:0,display:10,currentPage:1}}},computed:{coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},statusList:function(){return[this.$t("innov.have"),this.$t("innov.financing"),this.$t("innov.end")]},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[{title:this.$t("innov.purchase_time"),width:"100px"},{title:this.$t("innov.purchase"),width:"200px"},{title:this.$t("innov.entry")},{title:this.$t("innov.purchase_amount"),width:"150px"},{title:this.$t("innov.obtain_token"),width:"100px"},{title:this.$t("innov.state"),width:"100px"},{title:this.$t("innov.operation"),width:"100px"}];return t},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},axiosType:function(){return"all"===this.type?null:this.type}},watch:{market:function(t){t&&this.setData()}},methods:{init:function(){this.market&&this.setData()},setData:function(){var t=this,n=[{code:"all",value:this.$t("assets.otcFlowingWater.allCoin")}];Object.keys(this.market.coinList).forEach((function(i){1===t.market.coinList[i].otcOpen&&n.push({code:i,value:i})})),this.symbolList=n,this.symbol="all",this.getData()},getData:function(){var t=this;this.axios({url:"/newcoin/invest_manage_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,type:1}}).then((function(n){if(t.tabelLoading=!1,"0"===n.code.toString()){var i=[];n.data.record.length&&(n.data.record.forEach((function(n){t.investSymbol=n.investSymbol;var a=t.market.coinList,e=a[n.investSymbol]?a[n.investSymbol].showPrecision:0,o=a[n.tokenSymbol]?a[n.tokenSymbol].showPrecision:0;i.push({id:n.projectId,data:[Object(s["k"])(n.orderTime),n.orderId,n.name,"".concat(Object(s["f"])(n.investAmount,e),"\n                    ").concat(Object(s["l"])(n.investSymbol,a)),"".concat(Object(s["f"])(n.tokenAmount,o),"\n                    ").concat(Object(s["l"])(n.tokenSymbol,a)),t.setStatusText(n),[{type:"button",text:t.$t("innov.view_details"),iconClass:[""],eventType:"view",classes:t.classesVieew(n)}]]})})),t.tabelList=i,t.paginationObj.total=n.data.count)}else t.$bus.$emit("tip",{text:n.msg,type:"error"})}))},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},goViewPage:function(t,n){this.$router.push("/innovation/".concat(n))},classesVieew:function(t){return 7===t.status?"noshow":[]},setStatusText:function(t){var n="";switch(t.status){case 2:n=this.$t("innov.status1");break;case 3:n=this.$t("innov.status2");break;case 4:n=this.$t("innov.status3");break;case 5:n=this.$t("innov.status4");break;default:n=this.$t("innov.status5")}return n}}},c=(i("231d"),{mixins:[o],mounted:function(){this.init()}}),l=c,r=i("2877"),u=Object(r["a"])(l,a,e,!1,null,null,null);n["default"]=u.exports}}]);