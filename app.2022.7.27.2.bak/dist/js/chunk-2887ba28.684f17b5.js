(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2887ba28"],{8999:function(t,e,a){"use strict";a.r(e);a("7f7f");var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"ipfsView"},[e("div",{staticClass:"ipfsView-content c-4-bg"},[e("div",{staticClass:"main-content"},[e("div",{staticClass:"content-top c-5-bd"},[e("div",{staticClass:"img"},[e("img",{attrs:{src:t.bannerImg,alt:""}})]),e("div",{staticClass:"info"},[e("h2",{staticClass:"tit f-1-cl"},[t._v(t._s(t.pageData.name))]),e("p",{staticClass:"time"},[t._v("\n            "+t._s(t.$t("ipfs.text1"))+"\n            "+t._s(t.formatTimeFn(t.pageData.startTime))+"\n             ～\n             "+t._s(t.formatTimeFn(t.pageData.endTime))+"\n          ")]),e("div",{staticClass:"countdown Zf-1-cl"},[t._v("\n                "+t._s(t.$t("ipfs.text2"))+"\n                "),e("div",{staticClass:"countdown-time",domProps:{innerHTML:t._s(t.pageData.djs)}})])])])]),e("div",{staticClass:"base-info"},[e("div",{staticClass:"bf"},[e("div",[e("span",[t._v("\n            "+t._s(t.$t("ipfs.text4"))+"\n          ")]),1===t.pageData.orderType?e("div",{staticClass:"f-r"},[t._v("\n              "+t._s(t.$t("ipfs.text5"))+"\n              "),e("span",{staticClass:"f-1-cl"},[t._v("\n                "+t._s(t.fixDFun(t.pageData.tokenAmount,t.pageData.grantSymbol))+"\n                "+t._s(t._f("getCoinShowName")(t.pageData.grantSymbol,t.coinList))+"\n              ")])]):e("div",{staticClass:"f-r"},[t._v("\n            "+t._s(t.$t("ipfs.text6"))+"\n            "),e("span",{staticClass:"f-1-cl"},[t._v("\n              "+t._s(t.fixDFun(t.pageData.money,t.pageData.coinSymbol))+"\n              "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n            ")])])]),e("div",{staticClass:"jdt c-5-bg"},[e("div",{staticClass:"jdt-bar c-8-bg",style:{width:t.countScale(t.pageData.speed,100)+"%"}},[e("span",{staticClass:"num u-16-cl",class:t.numClass(t.pageData.speed)},[t._v("\n              "+t._s(t.countScaleNum(t.pageData.speed,100))+"%\n            ")])])])]),e("c-navTab",{staticClass:"a-3-bd",attrs:{activeClassName:"b-1-cl",activeColor:"a-12-bg",className:"b-2-cl",currentTab:t.nowType,navTab:t.navTab,lineHeight:"55"},on:{currentType:t.currentType}}),1!==t.nowType&&t.isMobel?t._e():e("div",{staticClass:"infor-list"},[e("div",{staticClass:"infor-box clearfix"},[e("div",{staticClass:"infor-item"},[e("p",{staticClass:"key"},[t._v("\n              "+t._s(t.$t("ipfs.text7"))+"\n            ")]),e("p",{staticClass:"val f-1-cl"},[t._v("\n              "+t._s(t.pageData.otherName)+"\n            ")])]),e("div",{staticClass:"infor-item"},[e("p",{staticClass:"key"},[t._v("\n              "+t._s(t.$t("ipfs.text15"))+"\n            ")]),e("p",{staticClass:"val f-1-cl"},[t._v("\n              "+t._s(t.pageData.times)+"\n            ")])]),e("div",{staticClass:"infor-item"},[e("p",{staticClass:"key"},[t._v("\n              "+t._s(t.$t("ipfs.text8"))+"\n            ")]),e("p",{staticClass:"val f-1-cl"},[t._v("\n              "+t._s(t.pageData.power)+"\n            ")])]),e("div",{staticClass:"infor-item"},[e("p",{staticClass:"key"},[t._v("\n              "+t._s(t.$t("ipfs.text9"))+"\n            ")]),e("p",{staticClass:"val f-1-cl"},[t._v("\n              "+t._s(t.pageData.fee)+"\n            ")])])]),e("div",{staticClass:"dprice"},[t._v("\n          "+t._s(t.$t("ipfs.text10"))+"\n          "),e("span",{staticClass:"num u-8-cl"},[t._v("\n            "+t._s(t.pageData.initPriceV2)+"\n            "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n          ")]),t._v("\n          ≈ "+t._s(t.unitPriceTate)+"\n        ")]),e("c-inputLine",{attrs:{name:"amount",promptText:t.promptText,errorHave:t.errorHave,errorText:"",disabled:t.amountDisabled,errorFlag:t.errorFlag,marginTop:"0px",value:t.amount},on:{onchanges:t.inputChanges}},[1===t.pageData.orderType?e("span",{staticClass:"f-1-cl"},[t._v("\n            "+t._s(t._f("getCoinShowName")(t.pageData.grantSymbol,t.coinList))+"\n          ")]):e("span",{staticClass:"f-1-cl"},[t._v("\n            "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n          ")])]),1===t.pageData.orderType?e("p",{staticClass:"symbol_amount"},[t._v("\n            "+t._s(t.$t("ipfs.text11"))+"：\n            "+t._s(t.amountTotal)+"\n            "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n        ")]):t._e(),e("p",{staticClass:"vol"},[t._v("\n          "+t._s(t.$t("ipfs.text12"))+"：\n          "+t._s(t.fixDFun(t.pageData.u_coinSymbol_amount,t.pageData.coinSymbol))+"\n          "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n        ")]),"2"===t.verificationType?e("c-verify",{attrs:{colorMap:t.colorMap,marginTop:"6px",errorHave:!0,product:"bind"},on:{getCaptchaObj:t.getCaptchaObj,callback:t.verifyCallBack}}):t._e(),e("p",{staticClass:"clause"},[e("c-checkBox",{attrs:{value:t.textFlag},on:{click:t.checkoutClick}}),t._v("\n          "+t._s(t.$t("ipfs.text13"))+"\n          "),e("span",{staticClass:"clauseLink u-8-cl",on:{click:t.clauseLink}},[t._v("\n            "+t._s(t.$t("ipfs.text14"))+"\n          ")])],1),t.isLogin?e("c-button",{attrs:{type:"solid",disabled:t.submitDisabled,height:"40px",width:"100%",paddingW:"0px"},on:{click:t.submit}},[t._v("\n            "+t._s(t.buttonText)+"\n        ")]):e("c-button",{attrs:{type:"solid",height:"40px",width:"100%",paddingW:"0px"},on:{click:t.goLogin}},[t._v("\n          "+t._s(t.$t("innov.loginReg"))+"\n        ")]),t.pageData.holdAmount?e("p",{staticClass:"tt"},[t._v("\n          "+t._s(t.$t("innov.Only"))+" "+t._s(t.pageData.holdAmount)+"\n          "+t._s(t._f("getCoinShowName")(t.pageData.holdSymbol,t.coinList))+"\n          "),e("a",{staticClass:"u-8-cl",attrs:{href:"javascript:;"},on:{click:function(e){return t.goTrade()}}},[t._v(t._s(t.$t("innov.Hold")))])]):t._e(),t.is_newcoin_project_entrance&&t.pageData.entranceAmount?e("div",{staticClass:"spend-regon",class:t.spendWarning?"f-7-cl":""},[e("p",[t._v("\n            "+t._s(t.$t("innov.spend"))+"\n            "+t._s(t.fixFloat(t.pageData.entranceAmount,t.precision))+"\n            "+t._s(t._f("getCoinShowName")(t.pageData.entranceSymbol,t.coinList))+"\n          ")]),e("p",[t._v("\n            "+t._s(t.$t("innov.currentBalance"))+"\n            "+t._s(t.fixFloat(t.pageData.u_entranceSymbol_account,t.precision))+"\n            "+t._s(t._f("getCoinShowName")(t.pageData.entranceSymbol,t.coinList))+"\n            "+t._s(t.spendWarning?t.$t("innov.spendTip"):"")+"\n          ")])]):t._e()],1)],1),e("p",{staticStyle:{clear:"both"}}),2!==t.nowType&&t.isMobel?t._e():e("div",{staticClass:"main-text c-5-bd",domProps:{innerHTML:t._s(t.pageData.details)}})]),e("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,confirmDisabled:t.confirmBtnFlag,titleText:t.$t("login.SecurityVerification")},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[t.userInfo&&1===t.googleStatus?e("c-inputLine",{attrs:{maxlength:"6",name:"googleVlaue",promptText:t.googleVlaueForm.text,errorHave:!0,errorText:t.googleErrorText,errorFlag:t.googleErrorFlag,marginTop:"0px",value:t.googleVlaue},on:{onchanges:t.inputChanges}}):t._e(),t.userInfo&&1===t.isOpenMobileCheck?e("c-inputLine",{attrs:{maxlength:"6",name:"checkValue",promptText:t.checkPhione.text,errorHave:!0,errorText:t.checkErrorText,errorFlag:t.checkErrorFlag,marginTop:"0px",value:t.checkValue},on:{onchanges:t.inputChanges}},[t.checkPhione.haveCode?e("c-getCode",{attrs:{name:"loginGetcode",buttonName:"loginGetcodeBtn"},on:{click:t.getCodeClick}}):t._e()],1):t._e(),t.userInfo&&t.emailAuthOpen&&1!==t.isOpenMobileCheck&&t.pageData.email_validate_open?e("c-inputLine",{attrs:{maxlength:"6",name:"emailCheckValue",promptText:t.emailVlaueForm.text,errorHave:!0,errorText:t.checkErrorText,errorFlag:t.checkEmailErrorFlag,marginTop:"0px",value:t.emailCheckValue},on:{onchanges:t.inputChanges}},[t.emailVlaueForm.haveCode?e("c-getCode",{attrs:{name:"EmailCode",buttonName:"loginGetcodeBtn"},on:{click:t.postEmailCode}}):t._e()],1):t._e()],1),e("c-alert",{attrs:{showFlag:t.alertFlag,imageType:"1",imgMap:t.imgMap,colorMap:t.colorMap,buttonText:t.$t("ipfs.goRecharge")},on:{close:t.alertClone,confirm:t.confirmFun}},[e("div",{staticClass:"alertTitle b-1-cl"},[t._v("\n      "+t._s(t.$t("lever.alertTitle"))+"\n    ")]),e("div",{staticClass:"alertText"},[t._v("\n      "+t._s(t._f("getCoinShowName")(t.pageData.coinSymbol,t.coinList))+"\n      "),t._v("\n      "+t._s(t.$t("ipfs.FundsNot"))+"\n    ")])])],1)},n=[],s=(a("a481"),a("6b54"),a("c5f6"),a("95d5")),o={name:"InnovationList",data:function(){return{bannerImg:null,imgMap:s["s"],colorMap:s["b"],bannerTitle:"",nowType:1,errorFlag:!1,errorHave:!1,pageId:null,pageData:{},amount:"",dialogFlag:!1,dialogConfirmLoading:!1,checkValue:"",googleVlaue:"",checkErrorText:"",googleErrorText:"",dbclick:!0,captchaObj:null,verifyFlag:!1,verifyObj:null,precision:4,emailCheckValue:"",setInterTimer:null,textFlag:!1,alertFlag:!1,isMobel:!1}},watch:{sendEmailCode:function(t){null!==t&&("success"===t.text?(this.$bus.$emit("tip",{text:t.msg,type:"success"}),this.$store.dispatch("resetType")):(this.$bus.$emit("tip",{text:t.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","EmailCode")))},amount:function(t){1===this.pageData.orderType?this.amount=Object(s["h"])(t,this.showPrecision(this.pageData.grantSymbol)):this.amount=Object(s["h"])(t,this.showPrecision(this.pageData.coinSymbol))},checkValue:function(t){this.checkValue=Object(s["h"])(t,0)},emailCheckValue:function(t){this.emailCheckValue=Object(s["h"])(t,0)},googleVlaue:function(t){this.googleVlaue=Object(s["h"])(t,0)}},computed:{buttonText:function(){var t=this.$t("innov.buyNow");return this.pageData.status&&(2===this.pageData.status||3===this.pageData.status?this.pageData.orderType&&0!==this.pageData.orderType||(t=this.$t("innov.immediate")):t=this.$t("ipfs.setStatusText4")),t},titleText:function(){var t=[this.$t("innov.state"),this.$t("innov.exchangeSymbol"),this.$t("innov.sellSymbol"),this.$t("innov.totalAmount"),this.$t("innov.sellPrice"),this.$t("innov.viewInfo2"),this.$t("innov.viewInfo3"),this.$t("innov.Start_time"),this.$t("innov.End_time"),this.$t("innov.Amount_already")];return 1===this.pageData.orderType&&(t=[this.$t("innov.state"),this.$t("innov.paySymbol"),this.$t("innov.tokenSymbol"),this.$t("innov.saleAmount"),this.$t("innov.price"),this.$t("innov.viewInfo2"),this.$t("innov.viewInfo3"),this.$t("innov.Start_time"),this.$t("innov.End_time"),this.$t("innov.saleAmountIng")]),t},sendEmailCode:function(){return this.$store.state.personal.sendEmailCode},enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},coinList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.coinList:null},rateList:function(){return this.$store.state.baseData&&this.$store.state.baseData.market?this.$store.state.baseData.market.rate:null},spendWarning:function(){return!!(this.is_newcoin_project_entrance&&Number(this.pageData.u_entranceSymbol_account)<Number(this.pageData.entranceAmount))},is_newcoin_project_entrance:function(){return this.$store.state.baseData.is_newcoin_project_entrance},verificationType:function(){var t=this.$store.state.baseData.publicInfo,e="0";return t&&t.switch&&t.switch.verificationType&&(e=t.switch.verificationType),e},statusList:function(){return[this.$t("innov.have"),this.$t("innov.financing"),this.$t("innov.end")]},promptText:function(){var t=this.$t("innov.buyNumber");return this.pageData.status&&!this.pageData.orderType&&(t=this.$t("innov.purchase_amount")),t},amountTotal:function(){return this.pageData.initPriceV2&&this.amount?this.fixDFun(this.pageData.initPriceV2*this.amount,this.pageData.coinSymbol):"--"},unitPriceTate:function(){return this.pageData.initPriceV2&&this.pageData.coinSymbol?Object(s["i"])(this.pageData.initPriceV2,this.rateList,this.pageData.coinSymbol,this.userCurrency):"--"},userInfo:function(){return this.$store.state.baseData.userInfo?this.$store.state.baseData.userInfo:{}},googleStatus:function(){return this.userInfo?this.userInfo.googleStatus:null},isOpenMobileCheck:function(){return this.userInfo?this.userInfo.isOpenMobileCheck:null},emailAuthOpen:function(){return this.userInfo?this.userInfo.email:null},submitDisabled:function(){return 2!==this.pageData.status&&3!==this.pageData.status||!this.textFlag},amountDisabled:function(){return 2!==this.pageData.status&&3!==this.pageData.status},speed:function(){if(this.pageData.raisedMoney){var t=this.pageData.raisedMoney/this.pageData.money*100;return Object(s["f"])(t,2)}return 0},checkPhione:function(){return{text:this.$t("login.phoneCode"),haveCode:!0}},googleVlaueForm:function(){return{text:this.$t("login.googleCode"),haveCode:!1}},emailVlaueForm:function(){return{text:this.$t("login.emailCode"),haveCode:!0}},checkFlag:function(){return this.$store.state.regExp.verification.test(this.checkValue)},checkFlagEamil:function(){return this.$store.state.regExp.verification.test(this.emailCheckValue)},googleFlag:function(){return this.$store.state.regExp.verification.test(this.googleVlaue)},checkErrorFlag:function(){return 0!==this.checkValue.length&&!this.checkFlag},checkEmailErrorFlag:function(){return 0!==this.emailCheckValue.length&&!this.checkFlagEamil},googleErrorFlag:function(){return 0!==this.googleVlaue.length&&!this.googleFlag},confirmBtnFlag:function(){return!(1!==this.googleStatus||!this.googleErrorFlag&&0!==this.googleVlaue.length)||!(1!==this.isOpenMobileCheck||0!==this.checkValue.length&&!this.checkErrorFlag)},isLogin:function(){return!!this.$store.state.baseData.isLogin&&this.$store.state.baseData.isLogin},navTab:function(){var t=[{name:this.$t("ipfs.information"),index:1},{name:this.$t("ipfs.introduction"),index:2}];return t},userCurrency:function(){return Object(s["n"])("user_Currency")||"USD"}},methods:{alertClone:function(){this.alertFlag=!1},confirmFun:function(){this.alertClone(),this.$router.push("/assets/recharge?symbol=".concat(this.pageData.coinSymbol))},init:function(){var t=this;document.body.clientWidth<960&&(this.isMobel=!0),this.$bus.$on("WINFOW_ON_RESIIZE",(function(e){t.isMobel=e<960})),this.pageId=this.$route.params.id,this.getData()},initTime:function(t){var e="a-11-bg",a="0",i="0",n="00",s="00",o=(t.endTime-(new Date).getTime())/1e3;o>0&&(2===t.status||3===t.status)&&(e="a-16-bg",a=Math.floor(o/60/60/24),i=Math.floor(o/60/60%24),n=Math.floor(o/60%60),s=Math.floor(o%60));var r='\n      <span class="num c-7-cl '.concat(e,'">').concat(a,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.day"),' </span>\n      <span class="num c-7-cl ').concat(e,'">').concat(i,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.hours"),' </span>\n      <span class="num c-7-cl ').concat(e,'">').concat(n,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.minutes"),' </span>\n      <span class="num c-7-cl ').concat(e,'">').concat(s,'</span>\n      <span class="unit u-11-cl">').concat(this.$t("ipfs.seconds")," </span>");return r},fixFloat:function(t,e){return Object(s["g"])(t,e)},thousandsComma:function(t){return Object(s["C"])(t)},getCaptchaObj:function(t){this.captchaObj=t},verifyCallBack:function(t){this.verifyObj={geetest_challenge:t.geetest_challenge,geetest_seccode:t.geetest_seccode,geetest_validate:t.geetest_validate},this.verifyFlag=!0,this.dialogFlag=!0},countScale:function(t,e,a){if(4===a||5===a)return 100;if(t&&e){var i=Object(s["v"])(t,e);return i>100&&(i=100),i}return 0},countScaleNum:function(t,e,a){return 4===a||5===a?100:t&&e?Math.round(t*e):0},countPosition:function(t,e){var a=t&&e?Object(s["v"])(t,e)-10:0;return a<0&&(a=0),a>90&&(a=90),a},fixDFun:function(t,e){return this.showPrecision(e)?Object(s["f"])(t,this.showPrecision(e)):t},showPrecision:function(t){if(this.$store.state.baseData&&this.$store.state.baseData.market&&this.$store.state.baseData.market.coinList){var e=this.$store.state.baseData.market.coinList;if(e[t]){var a=e[t].showPrecision;if(a)return a}}return 4},setStatusText:function(t){var e="";switch(t.status){case 2:e=this.$t("innov.status1");break;case 3:e=this.$t("innov.status2");break;case 4:e=this.$t("innov.status3");break;case 5:e=this.$t("innov.status4");break;default:e=this.$t("innov.status5")}return e},currentType:function(t){this.nowType=t.index},submit:function(){this.textFlag?Number(this.amount)?this.amountTotal>this.pageData.u_coinSymbol_amount?this.alertFlag=!0:1!==this.userInfo.authLevel&&this.pageData.isAuthRealname?this.$bus.$emit("tip",{text:this.$t("ipfs.kycAuth"),type:"error"}):null!==this.pageData.level_amount&&this.amountTotal>this.pageData.level_amount?this.$bus.$emit("tip",{text:"".concat(this.$t("innov.surplusExchangeAmount"),":").concat(this.pageData.level_amount),type:"error"}):1===this.googleStatus||1===this.isOpenMobileCheck||this.pageData.email_validate_open&&this.emailAuthOpen?1!==this.googleStatus&&this.enforceGoogleAuth?this.$bus.$emit("tip",{text:this.$t("assets.withdraw.bindGoogle"),type:"error"}):"2"===this.verificationType?this.captchaObj.verify():this.dialogFlag=!0:this.$bus.$emit("tip",{text:this.$t("innov.binding"),type:"error"}):this.$bus.$emit("tip",{text:this.$t("ipfs.countTips"),type:"error"}):this.$bus.$emit("tip",{text:this.$t("ipfs.tiptext"),type:"error"})},inputChanges:function(t,e){this[e]=t},formatTimeFn:function(t){return t?Object(s["k"])(t):"--"},dialogClose:function(){this.dialogFlag=!1,this.checkValue="",this.googleVlaue="",this.emailCheckValue=""},getCodeClick:function(){this.sendCode()},postEmailCode:function(){var t={operationType:21};this.$store.dispatch("sendEmailCode",t)},sendCode:function(){var t=this;this.axios({url:"v4/common/smsValidCode",method:"post",header:{},params:{operationType:28}}).then((function(e){e.code&&"0"!==e.code.toString()?(t.$bus.$emit("getCode-clear","loginGetcode"),t.$bus.$emit("tip",{text:e.msg,type:"error"})):t.$bus.$emit("tip",{text:t.$t("ipfs.evtext"),type:"success"})})).catch((function(){}))},dialogConfirm:function(){var t=this;if(this.dbclick){var e={verificationType:this.verificationType,amount:this.amount,projectId:this.pageData.id,smsValidCode:this.checkValue,googleCode:this.googleVlaue,symbol:this.pageData.coinSymbol,percent:this.pageData.speed,emailValidCode:this.emailCheckValue};1===this.pageData.orderType&&this.amountTotal&&(e.amount=this.amountTotal),"2"===this.verificationType&&(e=Object.assign(e,this.verifyObj)),this.dbclick=!1,this.axios({url:this.$store.state.url.common.ipfs_purchase,headers:{},params:e,hostType:"fe-hashrate-api",method:"post"}).then((function(e){t.dialogClose(),t.dbclick=!0,e.code&&"0"===e.code.toString()?(t.amount="",t.$bus.$emit("tip",{text:t.$t("innov.token"),type:"success"}),window.location.reload()):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))}},getData:function(){var t=this;this.axios({url:this.$store.state.url.common.ipfs_project_detail,params:{projectId:Number(this.pageId)},hostType:"fe-hashrate-api",method:"post"}).then((function(e){if("0"===e.code.toString()){var a=e.data.status;0!==a&&1!==a&&7!==a||t.$router.replace("/sly/ipfs");var i=e.data;clearInterval(t.setInterTimer),t.setInterTimer=setInterval((function(){i.djs=t.initTime(e.data),t.$nextTick((function(){t.pageData=i}))}),1e3),t.bannerImg=e.data.banner}}))},goTrade:function(){this.$router.push("/trade")},goLogin:function(){this.$router.push("/login")},checkoutClick:function(t){this.textFlag=t},clauseLink:function(){this.pageData.url&&window.open(this.pageData.url)},numClass:function(t,e){return 4===e||5===e?"positionRight":t<.08?"positionLeft":"positionRight"}}},r=(a("efd2"),{mixins:[o],mounted:function(){this.init()}}),c=r,l=a("2877"),u=Object(l["a"])(c,i,n,!1,null,null,null);e["default"]=u.exports},efd2:function(t,e,a){}}]);