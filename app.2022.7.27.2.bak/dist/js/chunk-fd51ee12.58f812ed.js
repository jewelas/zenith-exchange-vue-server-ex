(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fd51ee12"],{"190c":function(t,n,s){"use strict";s.r(n);s("7f7f"),s("6b54");var a=function(){var t=this,n=t._self._c;return n("div",{staticClass:"innovation fuz-page-content"},[n("div",{staticClass:"innovation-content fuz-full"},[n("c-navTab",{staticClass:"c-5-bd pc-list fuz-menu",attrs:{activeClassName:"f-1-cl",activeColor:"c-8-bg",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}}),n("c-navTab",{staticClass:"c-5-bd a-4-bg h5-list",attrs:{activeClassName:"f-1-cl",activeColor:"c-8-bg",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}}),t.dataList.length?n("div",{staticClass:"innovation-list"},[t._l(t.dataList,(function(s,a){return n("div",{key:a,staticClass:"innovation-item fuz-card-plain"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:s.logo,alt:""}})]),n("div",{staticClass:"info"},["1654"!==t.publicInfo.msg.companyId.toString()?n("h2",{staticClass:"tit f-1-cl"},[t._v("\n            【"+t._s(t._f("getCoinShowName")(s.grantSymbol,t.coinList))+"】"+t._s(s.name)+"\n            "),n("label",{staticClass:"statusLabel",class:t.statusClass(s)},[t._v(t._s(t.setStatusText(s)))])]):n("h2",{staticClass:"tit f-1-cl"},[n("div",{staticClass:"no-progress"},[t._v("\n            【"+t._s(t._f("getCoinShowName")(s.grantSymbol,t.coinList))+"】"+t._s(s.name)+"\n            "),n("label",{staticClass:"statusLabel",class:t.statusClass(s)},[t._v(t._s(t.setStatusText(s)))])])]),t.isHideBar||"1654"===t.publicInfo.msg.companyId.toString()?t._e():n("div",{staticClass:"bf"},[n("p",[n("span",[t._v("\n                "+t._s(t.$t("innov.progress"))+"\n              ")]),n("span",{staticClass:"f-r"},[t._v("\n                "+t._s(t.$t("innov.rz_total"))+"\n              ")])]),n("div",{staticClass:"jdt d-5-bg"},[n("div",{staticClass:"jdt-bar c-8-bg",style:{width:t.countScale(s.speed,100)+"%"}})]),n("p",{staticClass:"f-1-cl"},[n("span",[t._v(t._s(t.countScale(s.speed,100))+"%")]),n("span",{staticClass:"f-r"},[t._v("\n                "+t._s(t.fixDFun(s.money,s.coinSymbol))+"\n                "+t._s(t._f("getCoinShowName")(s.coinSymbol,t.coinList))+"\n              ")])])]),t.isHideBar?n("div",{staticClass:"bf"},[t._v("\n              "+t._s(t.$t("innov.rz_total"))+"\n              "),n("span",{staticClass:"f-1-cl"},[t._v("\n                "+t._s(t.fixDFun(s.money,s.coinSymbol))+"\n                "+t._s(t._f("getCoinShowName")(s.coinSymbol,t.coinList))+"\n              ")])]):t._e(),n("div",{staticClass:"cz",class:"1654"===t.publicInfo.msg.companyId.toString()?"addMargin":""},[n("div",{staticClass:"timer"},[n("span",{staticClass:"tim"},[t._v("\n                "+t._s(t.$t("innov.start"))+"\n              ")]),n("span",{staticClass:"val f-1-cl"},[t._v("\n                "+t._s(t.formatTimeFn(s.startTime))+"\n                 ～\n                "+t._s(t.formatTimeFn(s.endTime))+" ")]),-1===s.status?n("div",{staticClass:"djs",domProps:{innerHTML:t._s(s.djs)}}):t._e()]),-1===s.status?n("c-button",{attrs:{type:"solid",disabled:t.submitDisabled(s),height:"40px",marginTop:"16px",width:"120px",paddingW:"0px"}},[n("span",[t._v(t._s(t.$t("innov.notStart")))])]):n("c-button",{attrs:{type:"solid",disabled:t.submitDisabled(s),height:"40px",width:"120px",paddingW:"0px"},on:{click:function(n){return t.submit(s.projectId)}}},[n("span",[t._v(t._s(t.$t("innov.immediate")))])])],1),n("div",{staticClass:"text fuz-border"},[t._v("\n            "+t._s(s.projectIntro)+"\n          ")])])])})),t.pagination.count/t.pagination.pageSize>1?n("c-pagination",{attrs:{total:t.pagination.count,classes:"c-4-bd","current-page":t.pagination.page,display:t.pagination.pageSize},on:{pagechange:t.pagechange}}):t._e()],2):t._e(),t.dataList.length||t.loading?t._e():n("div",{staticClass:"no-data"},[n("svg",{staticClass:"icon icon-50",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-g_2"}})]),n("p",[t._v("\n        "+t._s(t.$t("common.notData"))+"\n      ")])])],1)])},i=[],e=(s("ac6a"),s("95d5")),o=e["s"].jjrNeaderBg,c={name:"InnovationList",data:function(){return{imgMap:e["s"],bannerImg:o,nowType:0,dataList:[],setInterTimer:null,pagination:{count:0,pageSize:10,page:1},loading:!0}},computed:{bannerTitle:function(){return this.$t("innov.innov_tit")},coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},navTab:function(){return[{name:this.$t("innov.whole"),index:0},{name:this.$t("innov.notStart"),index:-1},{name:this.$t("innov.have"),index:1},{name:this.$t("innov.dh_end"),index:2},{name:this.$t("innov.dh_financing"),index:3}]},buttonText:function(){return 4===this.nowType?this.$t("innov.dh_end"):3===this.nowType?this.$t("innov.dh_financing"):this.$t("innov.immediate")},isLogin:function(){return!!this.$store.state.baseData.isLogin&&this.$store.state.baseData.isLogin},publicInfo:function(){return this.$store.state.baseData.publicInfo},isHideBar:function(){if(this.publicInfo.custom_config){var t=this.publicInfo.custom_config,n=null;if(t){try{n=JSON.parse(t)}catch(s){console.error("custom_config 配置有误")}return!(!n||!n.IEOProgressBarSwitch||"0"!==n.IEOProgressBarSwitch.toString())}return!1}return!1}},methods:{init:function(){this.getData()},countScale:function(t,n){return t&&n?Object(e["v"])(t,n):0},submitDisabled:function(t){return 2!==t.status&&3!==t.status},fixDFun:function(t,n){return this.showPrecision(n)?Object(e["f"])(t,this.showPrecision(n)):t},showPrecision:function(t){if(this.$store.state.baseData&&this.$store.state.baseData.market&&this.$store.state.baseData.market.coinList){var n=this.$store.state.baseData.market.coinList;if(n[t]){var s=n[t].showPrecision;if(s)return s}}return 4},currentType:function(t){this.nowType!==t.index&&(this.pagination.page=1,this.nowType=t.index,this.getData())},submit:function(t){this.$router.push("/innovation/".concat(t))},speed:function(t){if(t.investAmount){var n=t.investAmount/t.money*100;return Object(e["f"])(n,2)}return 0},pagechange:function(t){this.pagination.page=t,this.getData()},initTime:function(t){var n="a-11-bg",s="0",a="0",i="00",e="00",o=t.advanceSellTime||t.startTime,c=(o-(new Date).getTime())/1e3;c>0&&-1===t.status&&(n="a-16-bg",s=Math.floor(c/60/60/24),a=Math.floor(c/60/60%24),i=Math.floor(c/60%60),e=Math.floor(c%60));var r="\n      <span>".concat(this.$t("innov.CountDown"),'： </span>\n      <span class="num f-1-cl ').concat(n,'">').concat(s,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.day"),' </span>\n      <span class="num f-1-cl ').concat(n,'">').concat(a,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.hours"),' </span>\n      <span class="num f-1-cl ').concat(n,'">').concat(i,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.minutes"),' </span>\n      <span class="num f-1-cl ').concat(n,'">').concat(e,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.seconds")," </span>");return r},getData:function(){var t=this;this.loading=!0,this.axios({url:this.$store.state.url.common.newcoin_project_list,params:{page:this.pagination.page,pageSize:this.pagination.pageSize,status:this.nowType},method:"post"}).then((function(n){if("0"===n.code){t.pagination.count=n.data.count,t.dataList=[];var s=n.data.projectInfoList;0===t.nowType||-1===t.nowType?s&&s.length?(clearInterval(t.setInterTimer),s.forEach((function(n,a){s[a].djs=t.initTime(n),t.$nextTick((function(){t.dataList=s}))})),t.setInterTimer=setInterval((function(){s.forEach((function(n,a){s[a].djs=t.initTime(n),t.$nextTick((function(){t.dataList=s}))}))}),1e3)):(clearInterval(t.setInterTimer),t.dataList=[]):(clearInterval(t.setInterTimer),t.dataList=n.data.projectInfoList)}t.loading=!1}))},formatTimeFn:function(t){return Object(e["k"])(t)},setStatusText:function(t){var n="";switch(t.status){case 2:n=this.$t("innov.status1");break;case 3:n=this.$t("innov.status2");break;case 4:n=this.$t("innov.status3");break;case 5:n=this.$t("innov.status4");break;case-1:n=this.$t("innov.notStart");break;default:n=this.$t("innov.status5")}return n},statusClass:function(t){return 2===t.status||3===t.status?"f-7-cl f-7-bd":"f-4-cl f-4-bd"}}},r=(s("f36c"),{mixins:[c],mounted:function(){this.init()}}),u=r,l=s("2877"),p=Object(l["a"])(u,a,i,!1,null,null,null);n["default"]=p.exports},f36c:function(t,n,s){}}]);