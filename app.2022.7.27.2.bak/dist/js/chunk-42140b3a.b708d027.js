(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42140b3a"],{4195:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"advertising-management fuz-card with-title"},[e("div",{staticClass:"advertising-management-header fuz-card-tab"},[e("c-navTab",{attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",className:"b-2-cl",currentTab:t.currentTab,navTab:t.navTab,lineHeight:t.lineHeight,marginRight:t.marginRight},on:{currentType:t.currentType}})],1),e("div",{staticClass:"advertising-management-center"},[e("c-table",{attrs:{imgMap:t.imgMap,colorMap:t.colorMap,classes:t.classes,loading:t.loading,headClasses:t.headClasses,bodyClasses:t.bodyClasses,lineClasses:t.lineClass,columns:t.columns,dataList:t.dataList,lineNumber:t.lineNumber,cellHeight:t.cellHeight,headHeight:t.headHeight},on:{elementClick:t.closeData}}),e("c-pagination",{directives:[{name:"show",rawName:"v-show",value:t.count>10,expression:"count > 10"}],attrs:{total:t.count,"current-page":t.page,display:t.pageSize},on:{pagechange:t.pagechange}})],1),e("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,confirmDisabled:t.dialogConfirmDisabled,titleText:t.titleText},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[e("p",{staticClass:"dialog-p"},[t._v(t._s(t.$t("personal.dialog.closeAdPrompt")))])])],1)},s=[],n=(a("c5f6"),a("ac6a"),a("95d5")),o={name:"advertisingManagement",watch:{otcPersonAds:function(t){null!==t&&this.publicInfo&&(this.loading=!1,this.count=t.data.count,this.dataProcessin(t.data.adList,this.$store.state.baseData.market))},otcCloseWanted:function(t){if(null!==t)if(this.dialogConfirmLoading=!1,"success"===t.text){if(this.$bus.$emit("tip",{text:t.msg,type:"success"}),this.$store.dispatch("resetType"),1===this.currentTab){var e={uid:this.uid,pageSize:this.pageSize,page:this.page,adType:"buy"};this.$store.dispatch("otcPersonAds",e)}else{var a={uid:this.uid,pageSize:this.pageSize,page:this.page,adType:"sell"};this.$store.dispatch("otcPersonAds",a)}this.dialogFlag=!1}else this.$bus.$emit("tip",{text:t.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")},userInfo:function(t){if(t){this.uid=t.id;var e={uid:this.uid,pageSize:this.pageSize,page:this.page};this.$store.dispatch("otcPersonAds",e)}}},computed:{titleText:function(){return this.$t("personal.dialog.closeAd")},columns:function(){return[{title:this.$t("personal.advertisingManagement.columns")[0],align:"left",width:"120px",classes:""},{title:this.$t("personal.advertisingManagement.columns")[1],align:"right",width:"100px"},{title:this.$t("personal.advertisingManagement.columns")[2],align:"right",width:"100px"},{title:this.$t("personal.advertisingManagement.columns")[3],align:"right",width:"150px"},{title:this.$t("personal.advertisingManagement.columns")[4],align:"right",width:"100px"},{title:this.$t("personal.advertisingManagement.columns")[5],align:"right",width:"100px"},{title:this.$t("personal.advertisingManagement.columns")[6],align:"right",width:"100px"}]},navTab:function(){return[{name:this.$t("personal.advertisingManagement.navTab")[0],index:1},{name:this.$t("personal.advertisingManagement.navTab")[1],index:2}]},baseData:function(){return this.$store.state.baseData},otcPersonAds:function(){return this.$store.state.personal.otcPersonAds},otcCloseWanted:function(){return this.$store.state.personal.otcCloseWanted},userInfo:function(){return this.$store.state.baseData.userInfo},publicInfo:function(){return this.$store.state.baseData.publicInfo},otcLinkUrl:function(){var t={url:"",type:""};return"ex"===window.HOSTAPI&&this.baseData.publicInfo?(t.url=this.$store.state.baseData.publicInfo.url.otcUrl,t.type="2"):"otc"===window.HOSTAPI&&(t.url="",t.type="1"),t}},data:function(){return{imgMap:n["s"],colorMap:n["b"],loading:!1,uid:"",currentTab:1,marginRight:48,lineHeight:"55",dataList:[],cellHeight:55,headHeight:30,lineNumber:10,classes:"",headClasses:"",bodyClasses:"",lineClass:"",count:0,page:1,pageSize:10,dialogFlag:!1,dialogConfirmLoading:!1,dialogConfirmDisabled:!1,advertId:""}},methods:{init:function(){var t=this.$store.state.baseData.userInfo;if(null!==t){this.loading=!0,this.uid=t.id;var e={uid:this.uid,pageSize:this.pageSize,page:this.page};this.$store.dispatch("otcPersonAds",e)}},dataProcessin:function(t,e){var a=this,i=[];null!==t&&(t.forEach((function(t){i.push({id:[t.advertId,a.uid],data:[Object(n["k"])(t.createTime),t.advertId,Object(n["l"])(t.coin,e.coinList),Object(n["f"])(t.price,e.coinList[t.coin].fiatPrecision[t.payCoin.toLowerCase()]?Number(e.coinList[t.coin].fiatPrecision[t.payCoin.toLowerCase()]):a.$store.state.baseData.defaultFiatPrecision)+t.payCoin,Object(n["f"])(t.volume,e.coinList[t.coin].showPrecision),a.stateHand(t.status),[{type:"button",text:a.$t("personal.tool.view"),iconClass:[""],eventType:"view",classes:""},{type:a.typeShow(t.status),text:a.showText(t.status),iconClass:[""],eventType:a.eventType(t.status),classes:[a.showClasses(t.status)]}]]})})),this.dataList=i)},currentType:function(t){if(this.currentTab=t.index,this.loading=!0,1===this.currentTab){var e={uid:this.uid,pageSize:this.pageSize,page:this.page,adType:"buy"};this.$store.dispatch("otcPersonAds",e)}else{var a={uid:this.uid,pageSize:this.pageSize,page:this.page,adType:"sell"};this.$store.dispatch("otcPersonAds",a)}},closeData:function(t,e){if("close"===t){var a=[!0,e[0]];this.dialogFlag=a[0],this.advertId=a[1]}else"view"===t&&("1"===this.otcLinkUrl.type?this.$router.push("".concat(this.otcLinkUrl.url,"/otcTrade?orderId=").concat(e[0],"&userId=").concat(e[1])):"2"===this.otcLinkUrl.type&&(window.location.href="".concat(this.otcLinkUrl.url,"/otcTrade?orderId=").concat(e[0],"&userId=").concat(e[1])))},dialogClose:function(){this.dialogFlag=!1},dialogConfirm:function(){this.dialogConfirmLoading=!0;var t={advertId:this.advertId};this.$store.dispatch("otcCloseWanted",t)},pagechange:function(t){this.page=t;var e="buy";1!==this.currentTab&&(e="sell");var a={uid:this.uid,pageSize:this.pageSize,page:this.page,adType:e};this.$store.dispatch("otcPersonAds",a)},stateHand:function(t){switch(t){case 1:return this.$t("personal.state.release");case 2:return this.$t("personal.state.trading");case 3:return this.$t("personal.state.overdue");default:return this.$t("personal.state.close")}},showText:function(t){switch(t){case 1:return this.$t("personal.state.close");case 2:return this.$t("personal.state.trading");case 3:return this.$t("personal.state.overdue");default:return this.$t("personal.state.closed")}},eventType:function(t){switch(t){case 1:return"close";default:return""}},showClasses:function(t){switch(t){case 1:return"";default:return"b-2-cl banned-click"}},typeShow:function(t){switch(t){case 1:return"button";default:return"label"}}}},r=(a("601c"),{mixins:[o],mounted:function(){this.init()}}),l=r,c=a("2877"),d=Object(c["a"])(l,i,s,!1,null,null,null);e["default"]=d.exports},"601c":function(t,e,a){}}]);