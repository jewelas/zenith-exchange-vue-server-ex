(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29934092"],{"2fdb":function(t,e,i){"use strict";var a=i("5ca1"),s=i("d2c8"),n="includes";a(a.P+a.F*i("5147")(n),"String",{includes:function(t){return!!~s(this,t,n).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},6762:function(t,e,i){"use strict";var a=i("5ca1"),s=i("c366")(!0);a(a.P,"Array",{includes:function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},"81da":function(t,e,i){},"855f":function(t,e,i){},b583:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"free-staking"},[e("China")],1)},s=[],n=(i("7f7f"),function(){var t=this,e=t._self._c;return t.projectDetail?e("div",{staticClass:"free-staking-detail"},[e("div",{staticClass:"free-staking-header fuz-page-content"},[e("div",{staticClass:"project-logo",on:{mouseover:t.showCurrencyModal,mouseleave:t.hideCurrencyModal}},[e("img",{attrs:{src:t.projectDetail.logo,alt:""}}),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.currencyModalState,expression:"currencyModalState"}],staticClass:"popup-cont"},[e("Popup",{attrs:{coinSymbolIntroduce:t.projectDetail}})],1)])],1),e("div",{staticClass:"project-name",on:{mouseover:t.showCurrencyModal,mouseleave:t.hideCurrencyModal}},[t._v("\n      "+t._s(t.projectDetail.shortName)+"\n    ")]),e("div",{staticClass:"project-info"},[e("div",{staticClass:"project-title"},[t._v("\n        "+t._s(t.projectDetail.name)+"\n        "),e("span",{staticClass:"f-2-cl"},[t._v(t._s(t.projectDetail.title))])]),e("div",{staticClass:"project-range f-4-cl"},[t._v(t._s(t.projectDetail.gainRate)+"%")]),e("div",{staticClass:"project-range-text f-2-cl"},[t._v("\n        "+t._s(t.$t("freeStaking.home.gainRate"))+"\n      ")])]),e("div",{staticClass:"nav-active"},[t.projectDetail.url?e("c-button",{attrs:{defaultColorClass:"f-4-bd f-2-cl",type:"hollow",width:"120px",height:"40px"},on:{click:t.goBackHome}},[e("div",{staticClass:"nav-active-text"},[t._v(t._s(t.$t("freeStaking.home.notice")))])]):t._e()],1),e("div",{staticClass:"clearfix"})]),e("div",{staticClass:"project-content fuz-page-content fuz-card"},[e("div",{staticClass:"project-content-title fuz-card-title"},[e("div",{staticClass:"titlel"},[t._v("\n        "+t._s(t.$t("freeStaking.detail.activityProgress"))+"\n      ")]),e("div",{staticClass:"titler",on:{click:t.navMyPos}},[e("svg",{staticClass:"icon icon-17",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_22"}})]),e("span",{staticClass:"f-4-cl"},[t._v(t._s(t.projectDetail.tipMine))])]),e("div",{staticClass:"clearfix"})]),3===t.projectDetail.projectType||2===t.projectDetail.projectType?e("div",{staticClass:"project-status-cont fuz-card-content"},[e("div",{staticClass:"process-line-cont"},t._l(t.projectStatus,(function(i,a){return e("div",{key:i.title,staticClass:"process-line"},[e("div",{staticClass:"process-linel"},[e("div",{staticClass:"process-line-circle f-8-cl",class:i.active?"f-4-bg":"c-5-bg"},[t._v("\n              "+t._s(a+1)+"\n            ")]),e("div",{staticClass:"process-line-text f-2-cl"},[t._v(t._s(i.title))]),e("div",{staticClass:"process-line-date f-2-cl"},[t._v(t._s(i.datetime))])]),t.projectStatus.length!==a+1?e("div",{staticClass:"c-5-bg",class:2===t.projectDetail.projectType?"process-liner-2":"process-liner"},[i.active?e("div",{staticClass:"process-liner-fill c-8-bg",style:t.lineStatusStyle(a,i)}):t._e()]):t._e(),e("div",{staticClass:"clearfix"})])})),0),2!==t.projectDetail.projectType?e("div",{staticClass:"process-rate"},[e("div",{staticClass:"process-title"},[e("div",{staticClass:"titlel f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.home.lockProgress"))+"\n          ")]),e("div",{staticClass:"titler f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.lockAllNum"))+"\n          ")]),e("div",{staticClass:"clearfix"})]),e("div",{staticClass:"process-rate-line c-5-bg"},[e("div",{staticClass:"process-rate-line-fill c-8-bg",style:"width:".concat(t.projectDetail.progress)})]),e("div",{staticClass:"process-value"},[e("div",{staticClass:"valuel f-1-cl"},[t._v(t._s(t.projectDetail.progress))]),e("div",{staticClass:"valuer f-1-cl"},[t._v("\n            "+t._s(t.raiseAmount)+" "+t._s(t.projectDetail.shortName)+"\n          ")]),e("div",{staticClass:"clearfix"})])]):t._e(),t.isShowBlock([1,2])?e("div",{staticClass:"user-buy"},[e("div",{staticClass:"user-income-item c-5-bd",class:{noborder:!t.getGainAutoFlag}},[e("div",{staticClass:"user-buy-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.userLocked"))+"\n          ")]),e("div",{staticClass:"user-lock-account"},[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v(t._s(t.totalAmount))]),e("span",{staticClass:"f-1-cl"},[t._v(t._s(t.projectDetail.shortName))])])]),t.getGainAutoFlag?e("div",{staticClass:"user-income-item c-5-bd noborder"},[e("div",{staticClass:"user-buy-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.unclaimed"))+"\n          ")]),e("div",{staticClass:"user-lock-account"},[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v(t._s(t.totalGains))]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.shortName))]),e("c-button",{staticStyle:{"margin-left":"15px",float:"right"},attrs:{defaultColorClass:"f-4-bd f-2-cl",type:"hollow",width:"120px",height:"40px"},on:{click:t.getAllGain}},[e("div",{staticClass:"nav-active-text"},[t._v(t._s(t.$t("freeStaking.oneClick")))])])],1)]):t._e(),t.isShowBlock([1])&&t.projectDetail.isShowBuy?e("div",{staticClass:"user-lock-input"},[e("div",{staticClass:"user-lock-title f-2-cl"},[t._v("\n            "+t._s(t.lockMinNumText)+"\n          ")]),e("div",{staticClass:"user-input"},[e("c-inputLine",{attrs:{marginTop:"0px",name:"lockNumber",value:t.lockNumber,"max-length":"15",disabled:!t.isLogin},on:{onchanges:t.inputChanges}})],1),e("div",{staticClass:"user-account"},[e("div",{staticClass:"user-account-num f-2-cl"},[t._v("\n              "+t._s(t.$t("trade.balance"))+"\n              "+t._s(t.userBalance)+"\n              "+t._s(t.projectDetail.shortName)+"\n            ")]),e("div",{staticClass:"user-account-all f-4-cl",on:{click:t.autoFillCoin}},[t._v("\n              "+t._s(t.$t("innov.whole"))+"\n            ")]),e("div",{staticClass:"clearfix"})])]):t._e(),e("div",{staticClass:"user-income c-5-bg"},[e("div",[e("span",{staticClass:"f-2-cl"},[t._v("\n              "+t._s(t.userIncomeTitle)+"\n            ")]),e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v("\n              "+t._s(t.userFeatureIncome)+"\n            ")]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.gainCoinName))])])])]):t._e(),3===t.projectDetail.projectType&&t.isShowBlock([3,4,5])||2===t.projectDetail.projectType&&t.isShowBlock([6])?e("div",{staticClass:"user-buyed-income"},[e("div",{staticClass:"user-income-item c-5-bd",class:{noborder:2===t.projectDetail.projectType}},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.userLocked"))+"\n          ")]),e("div",[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v(t._s(t.totalAmount))]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.shortName))])])]),2!==t.projectDetail.projectType?e("div",{staticClass:"user-income-item c-5-bd"},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.totalGainAmount"))+"\n          ")]),e("div",[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v("\n              "+t._s(t.totalGainAmount)+"\n            ")]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.gainCoinName))])])]):t._e(),2!==t.projectDetail.projectType?e("div",{staticClass:"user-income-item c-5-bd noborder"},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.totalUserGainAmount"))+"\n          ")]),e("div",[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v("\n              "+t._s(t.totalUserGainAmount)+"\n            ")]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.gainCoinName))])])]):t._e(),e("div",{staticClass:"clearfix"})]):t._e(),3===t.projectDetail.projectType&&t.isShowBlock([3,4,5])||2===t.projectDetail.projectType&&t.isShowBlock([6])?e("div",{staticClass:"user-buyed-income",staticStyle:{"margin-top":"0"}},[t.getGainAutoFlag?e("div",{staticClass:"user-income-item c-5-bd noborder"},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.unclaimed"))+"\n          ")]),e("div",[e("span",{staticClass:"num",class:t.isLogin?"f-4-cl":"f-2-cl"},[t._v(t._s(t.totalGains))]),e("span",{staticClass:"f-1-cl coin"},[t._v(t._s(t.projectDetail.shortName))]),e("c-button",{staticStyle:{"margin-left":"15px",float:"right"},attrs:{defaultColorClass:"f-4-bd f-2-cl",type:"hollow",width:"120px",height:"40px"},on:{click:t.getAllGain}},[e("div",{staticClass:"nav-active-text"},[t._v(t._s(t.$t("freeStaking.oneClick")))])])],1)]):t._e(),e("div",{staticClass:"clearfix"})]):t._e(),e("div",{staticClass:"project-warning",domProps:{innerHTML:t._s(t.projectDetail.details)}}),t.isShowBlock([1])&&t.projectDetail.isShowBuy?e("div",{staticClass:"user-submit"},[e("c-checkBox",{attrs:{value:t.userAgress},on:{click:t.checkoutHandle}}),e("span",{staticClass:"text f-2-cl",on:{click:t.changeUserAgreeState}},[t._v(t._s(t.$t("freeStaking.detail.rulesDangers")))]),e("div",{staticClass:"submit-btn"},[e("c-button",{attrs:{disabled:!t.userAgress,width:"220px",height:"40px"},on:{click:t.submitUserPos}},[t._v(t._s(t.isLogin?t.$t("freeStaking.detail.agreePOS"):t.$t("trade.loginReg")))])],1)],1):t._e()]):e("div",{staticClass:"project-status-cont"},[e("div",{staticClass:"user-buyed-income"},[e("div",{staticClass:"user-income-item c-5-bd"},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.totalGainAmount"))+"\n          ")]),e("div",[e("span",{staticClass:"f-2-cl num"},[t._v("\n              "+t._s(t.totalGainAmount)+"\n            ")]),e("span",{staticClass:"f-2-cl coin"},[t._v(t._s(t.projectDetail.shortName))])])]),e("div",{staticClass:"user-income-item c-5-bd noborder"},[e("div",{staticClass:"user-income-title f-2-cl"},[t._v("\n            "+t._s(t.$t("freeStaking.detail.totalUserGainAmount"))+"\n          ")]),e("div",[e("span",{staticClass:"f-2-cl num"},[t._v("\n              "+t._s(t.totalUserGainAmount)+"\n            ")]),e("span",{staticClass:"f-2-cl coin"},[t._v(t._s(t.projectDetail.gainCoinName))])])]),e("div",{staticClass:"clearfix"})]),e("div",{staticClass:"project-warning",domProps:{innerHTML:t._s(t.projectDetail.details)}})])]),t.incomeListFlag?e("div",{staticClass:"project-content c-4-bg mart-20"},[e("div",{staticClass:"project-content-title f-1-cl c-5-bd"},[e("div",{staticClass:"titlel"},[t._v(t._s(t.$t("freeStaking.detail.incomeDetail")))]),e("c-table",{staticClass:"c-4-bg",attrs:{imgMap:t.imgMap,colorMap:t.colorMap,loading:!1,columns:t.columns,dataList:t.tableList},on:{elementClick:t.tableClick}})],1)]):t._e(),e("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmDisabled:t.confirmBtnFlag,titleText:t.$t("login.SecurityVerification")},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[t.userInfo&&1===t.googleStatus?e("c-inputLine",{attrs:{"max-length":"6",name:"googleVlaue",promptText:t.googleVlaueForm.text,errorHave:!0,errorFlag:t.googleErrorFlag,marginTop:"0px",value:t.googleVlaue},on:{onchanges:t.inputChanges}}):t._e(),t.userInfo&&1===t.isOpenMobileCheck?e("c-inputLine",{attrs:{"max-length":"6",name:"phoneCode",promptText:t.checkPhione.text,errorHave:!0,errorFlag:t.phoneErrorFlag,marginTop:"0px",value:t.phoneCode},on:{onchanges:t.inputChanges}},[t.checkPhione.haveCode?e("c-getCode",{attrs:{name:"loginGetcode",buttonName:"loginGetcodeBtn"},on:{click:t.getCodeClick}}):t._e()],1):t._e()],1),"2"===t.verificationType?e("c-verify",{staticStyle:{display:"none"},attrs:{colorMap:t.colorMap,marginTop:"6px",errorHave:!0,product:"bind"},on:{getCaptchaObj:t.getCaptchaObj,callback:t.verifyCallBack}}):t._e()],1):t._e()}),o=[],c=(i("8e6e"),i("456d"),i("a481"),i("6762"),i("2fdb"),i("6b54"),i("ac6a"),i("28a5"),i("386d"),i("bd86")),r=(i("c5f6"),i("95d5"));function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){Object(c["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var h={data:function(){return{imgMap:r["s"],colorMap:r["b"],projectDetail:null,lockNumber:"0",userAgress:!1,tableList:[],projectId:null,currencyModalState:!1,verifyObj:{},dialogFlag:!1,googleVlaue:"",phoneCode:"",headerBackground:{"background-image":"url(".concat(r["s"].free_staking_banner,")")},timer:null,theRequest:{},projectUrl:null,secoundClick:!0,gainAuth:0,gainCoinName:null,incomeListFlag:!1,getGainAutoFlag:!1,totalGains:null}},filters:{},watch:{isLogin:function(t){t?(this.projectUrl=this.$store.state.url.freeStaking.project_detail,this.getProjectDetail()):(this.projectUrl=this.$store.state.url.freeStaking.project_detail_noToken,this.getProjectDetail())},lockNumber:function(t){var e=this;this.$nextTick((function(){e.lockNumber=Object(r["h"])(t,e.currentSymbol)}))}},computed:{totalAmount:function(){var t=this.projectDetail.totalAmount;return this.isLogin&&this.projectDetail?Object(r["f"])(t,this.currentSymbol):"- - -"},totalGainAmount:function(){var t=this.projectDetail.totalGainAmount;return this.isLogin&&this.projectDetail?Object(r["f"])(t,this.currentSymbol):"- - -"},totalUserGainAmount:function(){var t=this.projectDetail.totalUserGainAmount;return this.isLogin&&this.projectDetail?Object(r["f"])(t,this.currentSymbol):"- - -"},raiseAmount:function(){var t=this.projectDetail.raiseAmount;return this.projectDetail?Object(r["f"])(t,this.currentSymbol):"- - -"},userBalance:function(){var t=this.projectDetail.balance;return this.projectDetail?Object(r["f"])(t,this.currentSymbol):"- - -"},lockMinNumText:function(){if(!this.projectDetail)return"";var t=this.projectDetail,e=t.buyAmountMin,i=t.shortName,a=t.buyAmountMax,s=this.$t("freeStaking.detail.lockNum"),n=this.$t("freeStaking.detail.lockMinNum"),o=this.$t("freeStaking.detail.lockMaxNum");return"".concat(s," (").concat(n).concat(Object(r["f"])(e,this.currentSymbol)," ").concat(i,"；").concat(o).concat(Object(r["f"])(a,this.currentSymbol)," ").concat(i," )")},symbolAll:function(){var t=this.$store.state.baseData.market;return t&&t.coinList?t.coinList:null},currentSymbol:function(){var t=0;if(this.projectDetail&&this.projectDetail.gainCoin&&this.symbolAll){var e=this.symbolAll[this.projectDetail.gainCoin].showPrecision;t=e}return t},enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},userFeatureIncome:function(){if(!this.isLogin)return"- - -";var t=this.projectDetail,e=t.totalAmount,i=t.gainRate,a=t.lockDay,s=t.currencyExchangeRate,n=e+Number(this.lockNumber);return Object(r["f"])(n*i/100/365*a*s,this.currentSymbol)},verificationType:function(){var t=this.$store.state.baseData.publicInfo,e="0";return t&&t.switch&&t.switch.verificationType&&(e=t.switch.verificationType),e},showActivityTable:function(){var t=this.projectDetail,e=t.status,i=t.projectType,a=3===i&&this.isShowBlock([3,4,5]),s=1===i&&1!==e;return(s||a)&&this.isLogin},isLogin:function(){return!!this.$store.state.baseData.isLogin&&this.$store.state.baseData.isLogin},projectStatus:function(){var t=this,e=this.projectDetail,i=e.activeStatus,a=void 0===i?null:i,s=e.projectType,n=[];return n=3===s?[{title:this.$t("freeStaking.detail.activityStatus[0]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[1]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[2]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[3]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[4]"),datetime:"",active:!1}]:[{title:this.$t("freeStaking.detail.activityStatus[5]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[2]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[3]"),datetime:"",active:!1},{title:this.$t("freeStaking.detail.activityStatus[4]"),datetime:"",active:!1}],n.map((function(e,i){return u(u({},e),{},{datetime:t.countStateTime(i,s),active:3!==s||null!==a&&a>i})}))},columns:function(){var t=[];return t=this.gainAuth?[{title:this.$t("freeStaking.detail.incomeTime"),width:"25%"},{title:"".concat(this.$t("freeStaking.detail.incomeNum"),"(").concat(this.gainCoinName,")"),width:"25%",align:"center"},{title:this.$t("freeStaking.status"),width:"25%",align:"center"},{title:this.$t("freeStaking.operate"),width:"25%",align:"right"}]:[{title:this.$t("freeStaking.detail.incomeTime"),width:"50%"},{title:"".concat(this.$t("freeStaking.detail.incomeNum"),"(").concat(this.gainCoinName,")"),width:"50%",align:"left"}],t},confirmBtnFlag:function(){return!(1!==this.googleStatus||!this.googleErrorFlag&&0!==this.googleVlaue.length)||!(1!==this.isOpenMobileCheck||0!==this.phoneCode.length&&!this.checkErrorFlag)},checkPhione:function(){return{text:this.$t("login.phoneCode"),haveCode:!0}},googleVlaueForm:function(){return{text:this.$t("login.googleCode"),haveCode:!1}},googleErrorFlag:function(){return 0!==this.googleVlaue.length&&!this.authInputRight(this.googleVlaue)},phoneErrorFlag:function(){return 0!==this.phoneCode.length&&!this.authInputRight(this.phoneCode)},userInfo:function(){return this.$store.state.baseData.userInfo?this.$store.state.baseData.userInfo:{}},googleStatus:function(){return this.userInfo?this.userInfo.googleStatus:null},isOpenMobileCheck:function(){return this.userInfo?this.userInfo.isOpenMobileCheck:null},userIncomeTitle:function(){var t=this.projectDetail.lockDay,e=void 0===t?0:t,i=this.$t("freeStaking.detail.twoDayIncome[0]"),a=this.$t("freeStaking.detail.twoDayIncome[1]");return"".concat(e).concat(i).concat(a)}},beforeDestroy:function(){this.timer&&clearInterval(this.timer)},methods:{init:function(){var t=this;if(this.projectId=this.$route.params.id,-1!==window.location.search.indexOf("outOrderId")){this.theRequest={};var e=window.location.search.substr(1),i=e.split("&");this.outOrderId=null,i.forEach((function(e){var i=e.split("=")[0],a=e.split("=")[1];"outOrderId"===i&&(t.outOrderId=a)})),this.checkOrder(this.outOrderId)}document.getElementsByTagName("html")[0].scrollTop=0,this.isLogin?(this.projectUrl=this.$store.state.url.freeStaking.project_detail,this.getProjectDetail(),this.gerGainStatus()):(this.projectUrl=this.$store.state.url.freeStaking.project_detail_noToken,this.getProjectDetail())},initData:function(){this.lockNumber=0,this.googleVlaue="",this.phoneCode=""},gerGainStatus:function(){var t=this;this.axios({url:"increment/calCanGetTotalGains",headers:{},hostType:"fe-increment-api",params:{projectId:this.projectId},method:"post"}).then((function(e){"0"===e.code.toString()?e.data.totalGains?(t.getGainAutoFlag=!0,t.totalGains=e.data.totalGains):(t.getGainAutoFlag=!1,t.totalGains=null):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},getAllGain:function(){var t=this;this.secoundClick&&(this.secoundClick=!1,this.axios({url:"increment/getAllCanGains",headers:{},hostType:"fe-increment-api",params:{projectId:this.projectId},method:"post"}).then((function(e){"0"===e.code.toString()?(t.$bus.$emit("tip",{text:e.msg,type:"success"}),t.gerGainStatus(),t.getProjectDetail()):t.$bus.$emit("tip",{text:e.msg,type:"error"}),t.secoundClick=!0})))},tableClick:function(t){var e=this;this.secoundClick&&(this.secoundClick=!1,this.axios({url:"increment/getGain",headers:{},params:{gainId:t},method:"post",hostType:"fe-increment-api"}).then((function(t){"0"===t.code.toString()?(e.getProjectDetail(),e.gerGainStatus(),e.$bus.$emit("tip",{text:t.msg,type:"success"})):e.$bus.$emit("tip",{text:t.msg,type:"error"}),e.secoundClick=!0})))},getStatus:function(t){var e="";switch(t){case 10:e=this.$t("freeStaking.freeStakingStatus21");break;case 11:e=this.$t("freeStaking.freeStakingStatus22");break;case 12:e=this.$t("freeStaking.freeStakingStatus23");break;case 13:e=this.$t("freeStaking.freeStakingStatus24");break;default:e=""}return e},timerBegin:function(t){var e=this,i=t;this.timer=setInterval((function(){i>0?i-=1:(clearInterval(e.timer),window.location.reload())}),1e3)},countStateTime:function(t,e){if(!this.projectDetail)return"";var i="";switch(t){case 0:i=2===e?Object(r["k"])(this.projectDetail.currentTime).split(" ")[0]:Object(r["k"])(this.projectDetail.stime);break;case 1:i=2===e?Object(r["k"])(this.projectDetail.startGainTime).split(" ")[0]:Object(r["k"])(this.projectDetail.etime);break;case 2:i=2===e?Object(r["k"])(this.projectDetail.endGainTime).split(" ")[0]:Object(r["k"])(this.projectDetail.ltime);break;case 3:i=2===e?Object(r["k"])(this.projectDetail.returnTime).split(" ")[0]:Object(r["k"])(this.projectDetail.iasDate);break;default:break}return i},checkoutHandle:function(t){this.userAgress=t},changeUserAgreeState:function(){this.userAgress=!this.userAgress},isShowBlock:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.includes(this.projectDetail.activeStatus)},getProjectDetail:function(){var t=this;this.axios({url:this.projectUrl,headers:{},hostType:"fe-increment-api",params:{id:this.projectId},method:"post"}).then((function(e){if("0"===e.code.toString()){var i=e.data;if(-1===i.status||5===i.status)return void t.$router.push("/freeStaking");1===i.status&&3===i.projectType&&t.timerBegin(i.remainingTimeSeconds),6===i.activeStatus&&2!==i.projectType&&(i.activeStatus=1),t.gainAuth=i.gainAuth,t.gainCoinName=i.gainCoinName,i.details=i.details.replace(/\n/g,"<br/>"),i.info=i.info.replace(/\n/g,"<br/>"),t.projectDetail=i,0!==i.userGainList.length&&(t.incomeListFlag=!0),t.tableList=t.countTableList(i.userGainList)}}))},countTableList:function(t){var e=this;return t&&Array.isArray(t)?t.map((function(t){return{id:t.id,data:[t.gainTime,t.gainAmount,e.gainAuth?e.getStatus(Number(t.gainStatus)):"",e.gainAuth?e.handleButton(Number(t.gainStatus),Number(t.gainId)):""]}})):[]},handleButton:function(t,e){var i=[];return 10===t?i.push({type:"button",text:this.$t("freeStaking.receive"),iconClass:[""],eventType:e}):i.push({type:"label",text:"--",iconClass:[""]}),i},lineStatusStyle:function(t){var e=this.projectDetail,i=e.activeStatus,a=e.projectType;return"".concat(2===a," ? '100%' : width:").concat(i-1>t?"100%":"50%")},goBackHome:function(){window.location.href=this.projectDetail.url},navMyPos:function(){this.$router.push("/myPos")},showCurrencyModal:function(){this.currencyModalState=!0},hideCurrencyModal:function(){this.currencyModalState=!1},submitUserPos:function(){var t=this.projectDetail,e=t.buyAmountMin,i=t.buyAmountMax,a=t.balance,s=t.shortName,n=t.totalAmount,o="";if(this.isLogin)return parseFloat(this.lockNumber)>parseFloat(a)?(o="".concat(this.$t("freeStaking.detail.balanceError[0]"),"\n        ").concat(this.userBalance).concat(s).concat(this.$t("freeStaking.detail.balanceError[1]")),void this.showToast(o)):parseFloat(this.lockNumber)<parseFloat(e)?(o="".concat(this.$t("freeStaking.detail.buyAmountMinError")).concat(e).concat(s),void this.showToast(o)):parseFloat(this.lockNumber)+parseFloat(n)>parseFloat(i)?(o="".concat(this.$t("freeStaking.detail.buyAmountMaxError")).concat(i).concat(s),void this.showToast(o)):1!==this.googleStatus&&1!==this.isOpenMobileCheck?(o=this.$t("innov.binding"),void this.showToast(o)):1!==this.googleStatus&&this.enforceGoogleAuth?(o=this.$t("assets.withdraw.bindGoogle"),void this.showToast(o)):void this.creatOrder(parseFloat(this.lockNumber),this.projectId,window.location.href);this.$router.push("/login")},getCaptchaObj:function(t){this.captchaObj=t},verifyCallBack:function(t){this.verifyObj={geetest_challenge:t.geetest_challenge,geetest_seccode:t.geetest_seccode,geetest_validate:t.geetest_validate},this.dialogFlag=!0},dialogClose:function(){this.dialogFlag=!1,this.phoneCode="",this.googleVlaue="",this.emailCheckValue=""},getCodeClick:function(){var t=this;this.axios({url:"v4/common/smsValidCode",method:"post",header:{},params:{operationType:28}}).then((function(e){"0"!==e.code.toString()?(t.$bus.$emit("getCode-clear","loginGetcode"),t.$bus.$emit("tip",{text:e.msg,type:"error"})):t.$bus.$emit("tip",{text:t.$t("ipfs.evtext"),type:"success"})})).catch((function(){}))},inputChanges:function(t,e){this[e]=t},creatOrder:function(t,e,i){var a=this;this.secoundClick&&(this.secoundClick=!1,this.axios({url:"staking_create_order",headers:{},hostType:"fe-increment-api",params:{amount:t,projectId:e,returnUrl:i},method:"post"}).then((function(t){"0"===t.code.toString()?(a.secoundClick=!0,window.location.href="".concat(t.data.opUrl,"?appKey=").concat(t.data.appKey,"&orderNum=").concat(t.data.orderNum,"&userId=").concat(t.data.userId)):(a.secoundClick=!0,a.$bus.$emit("tip",{text:t.msg,type:"error"}))})))},checkOrder:function(t){var e=this;this.axios({url:"get_apply_status",headers:{},hostType:"fe-increment-api",params:{id:t},method:"post"}).then((function(t){"0"===t.code.toString()?(e.$bus.$emit("tip",{text:t.msg,type:"success"}),e.getProjectDetail(),e.$router.push({path:"/freeStaking/".concat(e.$route.params.id)})):e.$bus.$emit("tip",{text:t.msg,type:"error"})}))},dialogConfirm:function(){var t=this,e={amount:this.lockNumber,projectId:this.projectId,googleCode:this.googleVlaue,smsValidCode:this.phoneCode,verificationType:this.verificationType};"2"===this.verificationType&&(e=Object.assign(e,this.verifyObj)),this.axios({url:this.$store.state.url.freeStaking.project_apply,headers:{},params:e,method:"post"}).then((function(e){"0"===e.code.toString()?(t.$bus.$emit("tip",{text:t.$t("购买成功"),type:"success"}),t.dialogFlag=!1,t.initData(),t.init()):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},authInputRight:function(t){return this.$store.state.regExp.verification.test(t)},autoFillCoin:function(){this.lockNumber=String(this.projectDetail.balance)},showToast:function(t){t&&this.$bus.$emit("tip",{text:t,type:"error"})}}},d=(i("81da"),function(){var t=this,e=t._self._c;return e("div",{staticClass:"currency-notes freestaking c-3-bg"},[e("div",{staticClass:"flex-row"},[e("div",{staticClass:"key f-2-cl"},[t._v("\n      "+t._s(t.$t("innov.entry"))+"\n    ")]),e("div",{staticClass:"val f-1-cl"},[t._v(t._s(t.coinSymbolIntroduce.name))])]),e("div",{staticClass:"flex-row marb15"},[e("div",{staticClass:"key f-2-cl"},[t._v("\n      "+t._s(t.$t("trade.currencyNotesModal.Introduction"))+"\n    ")])]),e("div",{staticClass:"content"},[e("vue-scroll",[e("div",{staticClass:"text f-1-cl",domProps:{innerHTML:t._s(t.coinSymbolIntroduce.info)}})])],1)])}),p=[],g={name:"currencyNotes",props:{coinSymbolIntroduce:{type:Object,required:!0,default:function(){return{}}}},data:function(){return{}},components:{},methods:{goUrl:function(){}}},f=(i("f7fe"),{mixins:[g]}),m=f,v=i("2877"),b=Object(v["a"])(m,d,p,!1,null,null,null),C=b.exports,k={mixins:[h],components:{Popup:C},created:function(){this.init()}},j=k,_=(i("f641"),Object(v["a"])(j,n,o,!1,null,"0d9c993e",null)),y=_.exports,S={components:{China:y}},$=S,D=Object(v["a"])($,a,s,!1,null,"0ca6716e",null);e["default"]=D.exports},f641:function(t,e,i){"use strict";i("855f")},f7fe:function(t,e,i){}}]);