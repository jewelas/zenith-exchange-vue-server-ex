(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-690dad2d"],{6174:function(t,e,a){},dda0:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-innovations"},[e("div",{staticClass:"flowingWater-table"},[e("c-table",{attrs:{loading:t.tabelLoading,imgMap:t.imgMap,colorMap:t.colorMap,columns:t.columns,dataList:t.tabelList},on:{elementClick:t.goViewPage}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)])},s=[],n=(a("7f7f"),a("6b54"),a("456d"),a("ac6a"),a("95d5")),o={name:"page-flowingWater",data:function(){return{tabelLoading:!0,imgMap:n["s"],colorMap:n["b"],type:"all",symbol:"",tabelList:[],symbolList:[],investSymbol:null,paginationObj:{total:0,display:10,currentPage:1}}},computed:{coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},market:function(){return this.$store.state.baseData.market},columns:function(){var t=[{title:this.$t("order.ipfsOrder.columns1"),width:"100px"},{title:this.$t("order.ipfsOrder.columns2"),width:"200px"},{title:this.$t("order.ipfsOrder.columns3"),width:"200px"},{title:this.$t("order.ipfsOrder.columns4"),width:"150px"},{title:this.$t("order.ipfsOrder.columns5"),width:"100px"},{title:this.$t("order.ipfsOrder.columns6"),width:"100px"},{title:this.$t("order.ipfsOrder.columns7"),width:"150px"}];return t},axiosSymbol:function(){return"all"===this.symbol?null:this.symbol},axiosType:function(){return"all"===this.type?null:this.type}},watch:{market:function(t){t&&this.setData()}},methods:{init:function(){this.market&&this.setData()},setData:function(){var t=this,e=[{code:"all",value:this.$t("assets.otcFlowingWater.allCoin")}];Object.keys(this.market.coinList).forEach((function(a){1===t.market.coinList[a].otcOpen&&e.push({code:a,value:a})})),this.symbolList=e,this.symbol="all",this.getData()},getData:function(){var t=this;this.axios({url:"invest_manage_list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,type:2},hostType:"fe-hashrate-api"}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var a=[];e.data.record.length&&(e.data.record.forEach((function(e){t.investSymbol=e.investSymbol;var i=t.market.coinList,s=i[e.investSymbol]?i[e.investSymbol].showPrecision:0,o=i[e.tokenSymbol]?i[e.tokenSymbol].showPrecision:0;a.push({id:e.projectId,data:[Object(n["k"])(e.orderTime),e.orderId,e.name,"".concat(Object(n["f"])(e.investAmount,s),"\n                    ").concat(Object(n["l"])(e.investSymbol,i)),e.status<5?t.$t("order.ipfsOrder.setStatusText7"):"".concat(Object(n["f"])(e.tokenAmount,o),"\n                    ").concat(Object(n["l"])(e.tokenSymbol,i)),t.setStatusText(e),t.operationButton(e)]})})),t.tabelList=a,t.paginationObj.total=e.data.count)}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},operationButton:function(t){return[{type:"button",text:this.$t("order.ipfsOrder.view"),iconClass:[""],eventType:"view",classes:this.classesVieew(t)}]},pagechange:function(t){this.paginationObj.currentPage=t,this.getData()},goViewPage:function(t,e){this.$router.push("/ipfs/".concat(e))},classesVieew:function(t){return 7===t.status?"noshow":[]},setStatusText:function(t){var e="";switch(t.status){case 2:e=this.$t("order.ipfsOrder.setStatusText1");break;case 3:e=this.$t("order.ipfsOrder.setStatusText2");break;case 4:e=this.$t("order.ipfsOrder.setStatusText3");break;case 5:e=this.$t("order.ipfsOrder.setStatusText4");break;case 6:e=this.$t("order.ipfsOrder.setStatusText5");break;default:e=this.$t("order.ipfsOrder.setStatusText6")}return e}}},r=(a("6174"),{mixins:[o],mounted:function(){this.init()}}),l=r,c=a("2877"),u=Object(c["a"])(l,i,s,!1,null,null,null);e["default"]=u.exports}}]);