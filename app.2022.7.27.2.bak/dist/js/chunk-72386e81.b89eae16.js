(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72386e81"],{5248:function(t,e,a){"use strict";var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"b2cRecrgeHis"},[e("c-QRcode",{attrs:{flag:t.QRflag,imgUrl:t.imgUrl},on:{QRcodeClick:t.QRcodeClick}}),e("c-table",{attrs:{colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,subContent:t.subTableData,subContentId:t.subTableDataId,subColumns:t.subColumns,dataList:t.tabelList},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)},i=[],n=(a("6b54"),a("ac6a"),a("95d5")),o={props:{symbol:{default:"",type:String},lately:{default:!1,type:Boolean}},data:function(){return{colorMap:n["b"],revokeList:[],paginationObj:{total:0,display:10,currentPage:1},tabelLoading:!0,tabelList:[],subTableData:[],subTableDataId:null,financeListData:[],imgUrl:"",QRflag:!1}},watch:{symbol:function(t){t&&this.market&&this.getTableList()},market:function(t){t&&this.symbol&&this.getTableList()},paginationObjCurrentPage:function(){this.getTableList()}},computed:{market:function(){return this.$store.state.baseData.market},paginationObjCurrentPage:function(){return this.paginationObj.currentPage},columns:function(){return[{title:this.$t("assets.withdraw.withdrawTime"),width:"15%"},{title:this.$t("assets.recharge.RechargeCoin"),width:"10%"},{title:this.$t("assets.b2c.b2cWithdrawHisList1"),width:"18%"},{title:this.$t("assets.b2c.fee"),width:"18%"},{title:this.$t("assets.withdraw.withdrawStatus"),width:"14%"},{title:this.$t("assets.withdraw.withdrawOptions"),width:"25%"}]},subColumns:function(){return[this.$t("assets.b2c.b2cRecrgeHisList3"),this.$t("assets.b2c.firstWay"),this.$t("assets.b2c.addressUserName")]}},methods:{init:function(){var t=this;this.symbol&&this.market&&this.getTableList(),this.$bus.$on("b2cWithdrawHisGet",(function(){t.tabelLoading=!0,t.paginationObj.currentPage=1,t.getTableList()}))},QRcodeClick:function(){this.QRflag=!1},showPrecision:function(t){var e=0,a=this.$store.state.baseData.market;return a&&a.coinList&&a.coinList[t]&&(e=a.coinList[t].showPrecision),e},pagechange:function(t){this.paginationObj.currentPage=t},tableClick:function(t,e){var a=this;if("revoke"===t){var s={};this.tabelList.forEach((function(t){t.id===e&&(s=t)})),-1===this.revokeList.indexOf(s.id)&&(this.revokeList.push(s.id),this.axios({url:"/fiat/cancel_withdraw",headers:{},params:{id:s.id},method:"post"}).then((function(t){var e=a.revokeList.indexOf(s.id);a.revokeList.splice(e,1),"0"===t.code.toString()?(a.getTableList(),a.$bus.$emit("tip",{text:t.msg,type:"success"}),a.lately&&a.$bus.$emit("getMess")):a.$bus.$emit("tip",{text:t.msg,type:"error"})})))}if("subView"===t&&(this.subTableDataId=e.id,this.subTableData=[],this.financeListData.forEach((function(t){t.id===a.subTableDataId&&a.subTableData.push([t.updatedAt?Object(n["k"])(t.updatedAt):"--",a.$t("assets.b2c.bankCard"),t.userName||"--"])}))),"seePz"===t){var i={};this.tabelList.forEach((function(t){t.id===e&&(i=t)})),this.imgUrl=i.transferVoucher,this.QRflag=!0}},handleButton:function(t){var e=[];return t.transferVoucher&&e.push({type:"button",text:this.$t("assets.b2c.seePz"),iconClass:[""],eventType:"seePz"}),0===t.status&&e.push({type:"button",text:this.$t("assets.flowingWater.Cancel"),iconClass:[""],eventType:"revoke"}),e.push({type:"subTable",text:this.$t("trade.view"),eventType:"subView"}),e},getTableList:function(){var t=this;this.axios({url:"/fiat/withdraw/list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,symbol:"all"===this.symbol?void 0:this.symbol}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var a=[];t.financeListData=e.data.financeList,e.data.financeList.forEach((function(e){var s=t.showPrecision(e.symbol);a.push({id:e.id,transferVoucher:e.transferVoucher,data:[Object(n["k"])(e.createdAt),e.symbol,"".concat(Object(n["f"])(e.amount,s)," ").concat(e.symbol),"".concat(Object(n["f"])(e.fee,s)," ").concat(e.symbol),e.statusText,t.handleButton(e)]})})),t.tabelList=a,t.paginationObj.total=t.lately&&e.data.count>30?30:e.data.count}}))}}},r=(a("5d39"),{mixins:[o],name:"b2cRecrgeHis",mounted:function(){this.init()}}),l=r,c=a("2877"),h=Object(c["a"])(l,s,i,!1,null,null,null);e["a"]=h.exports},"5d39":function(t,e,a){},"8ce00":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-b2cWithdraw"},[e("header",{staticClass:"withdraw-header b-1-cl a-3-bd"},[t._v(t._s(t.$t("assets.withdraw.withdraw")))]),e("div",{staticClass:"withdraw-details clearfix a-7-bd"},[e("div",{staticClass:"clearfix"},[e("div",{staticClass:"details-left"},[e("div",{staticClass:"symbol b-1-cl"},[t._v(t._s(t.showSymbol))]),e("div",{staticClass:"numberList clearfix"},[e("ul",{staticClass:"numberList-key"},[e("li",[t._v(t._s(t.$t("assets.withdraw.lumpSum")))]),e("li",[t._v(t._s(t.$t("assets.withdraw.Available")))]),e("li",[t._v(t._s(t.$t("assets.withdraw.freeze")))])]),e("ul",{staticClass:"numberList-value b-1-cl"},t._l(t.detailsList,(function(a,s){return e("li",{key:s},[t._v("\n            "+t._s(a.value)+"\n          ")])})),0)]),e("ul",{staticClass:"b-7-cl details-limit"},[e("li",[t._v(t._s(t.$t("assets.b2c.withdrawMin"))+"："+t._s(t.withdrawMin)+" "+t._s(t.showSymbol))]),e("li",[t._v(t._s(t.$t("assets.b2c.withdrawMax"))+"："+t._s(t.withdrawMax)+" "+t._s(t.showSymbol))]),e("li",[t._v(t._s(t.$t("assets.b2c.withdrawDay"))+"："+t._s(t.daywithdrawMax)+" "+t._s(t.showSymbol))])]),t.warning?e("div",{staticClass:"details-warking b-7-cl"},[e("svg",{staticClass:"icon icon-16 details-warking-icon",staticStyle:{marginRight:"10px"},attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-c_2"}})]),e("span",{staticClass:"details-warking-text"},[t._v(t._s(t.warning))])]):t._e()]),e("div",{staticClass:"details-right"},[e("c-select",{attrs:{promptText:t.$t("assets.b2c.withdrawAddress"),value:t.addressValue,options:t.addressList,errorHave:!0,type:"double"},on:{onChanges:t.addressChange}}),e("c-inputLine",{attrs:{name:"numberValue",errorHave:!0,promptText:t.inputW,errorFlag:t.numberValueObj.showError,errorText:t.numberValueObj.text,value:t.numberValue},on:{onchanges:t.inputChange}},[e("c-button",{attrs:{type:"text",height:"30px"},on:{click:t.allWithDraw}},[t._v("\n          "+t._s(t.$t("assets.withdraw.allWithdraw"))+"\n        ")])],1),e("div",{staticClass:"in-text"},[t._v(t._s(t.$t("assets.b2c.fee"))+"\n        "),e("span",{staticClass:"f-1-cl"},[t._v(" "+t._s(t.fee)+" "+t._s(t.symbol))])]),e("div",{staticClass:"in-text"},[t._v("\n        "+t._s(t.$t("assets.b2c.arrivalAccount"))+"\n        "),e("span",{staticClass:"f-1-cl"},[t._v(" "+t._s(t.arrivalAccount)+" "+t._s(t.symbol))]),t.isOther?e("span",[t._v(" ≈ "),e("span",{staticClass:"f-1-cl"},[t._v(t._s(t.aikrw)+" KRW")])]):t._e()]),e("c-button",{attrs:{width:"120px",marginTop:"32px",height:"40px",disabled:t.buttonDisabled},on:{click:t.withdrawClick}},[t._v(t._s(t.$t("assets.withdraw.buttonWithdraw")))]),e("span",{staticClass:"goAddress b-4-cl",on:{click:t.goAddress}},[t._v("\n        "+t._s(t.$t("assets.b2c.addressMent"))+"\n      ")])],1)])]),e("header",{staticClass:"withdraw-header b-1-cl a-3-bd"},[t._v("\n    "+t._s(t.$t("assets.withdraw.RecentWithdrawalRecords"))+"\n  ")]),e("div",{staticClass:"withdraw-table"},[e("hisTable",{attrs:{symbol:t.symbol,lately:!0}})],1),e("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,confirmDisabled:t.dialogConfirmDisabled,titleText:t.$t("assets.withdraw.safetyVerification")},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[t.OpenMobile?e("c-inputLine",{attrs:{maxLength:"6",name:"phoneValue",value:t.phoneValue,promptText:t.$t("assets.withdraw.phoneCode"),errorHave:!0,errorFlag:t.phoneError,errorText:t.$t("assets.withdraw.phoneCodeError")},on:{onchanges:t.inputChange}},[e("c-getCode",{attrs:{name:"withdrawGetcode"},on:{click:t.getCodeClick}})],1):t._e(),t.OpenGoogle?e("c-inputLine",{attrs:{maxLength:"6",name:"googleValue",value:t.googleValue,promptText:t.$t("assets.withdraw.googleCode"),errorHave:!0,errorFlag:t.googleError,errorText:t.$t("assets.withdraw.googleCodeError")},on:{onchanges:t.inputChange}}):t._e()],1),e("c-verifyCationc-alert",{attrs:{showFlag:t.alertFlag,imgMap:t.imgMap,titleText:t.$t("assets.withdraw.safetyWarning"),detaText:t.authTitleText,dataList:t.alertData,buttonText:t.$t("assets.withdraw.GotoOpen"),haveClose:!1},on:{close:t.alertClone,confirm:t.alertGo}})],1)},i=[],n=a("e369"),o=(a("7f7f"),a("ac6a"),a("6b54"),a("95d5")),r={data:function(){return{imgMap:o["s"],tabelLoading:!0,detailsList:[{key:"totalBalance",value:"--"},{key:"normalBalance",value:"--"},{key:"lockBalance",value:"--"}],withdrawMin:"--",withdrawMax:"--",daywithdrawMax:"--",symbol:"",addressValue:"",numberValue:"",addressList:[],dialogFlag:!1,dialogConfirmLoading:!1,googleValue:"",phoneValue:"",nowSymbolMess:{},feeList:{},warning:""}},filters:{fixDFn:function(t,e){return Object(o["f"])(t,e)}},watch:{numberValue:function(t){this.numberValue=Object(o["h"])(t,this.showPrecision)},market:{handler:function(t){t&&this.symbol&&this.getMessage()}}},computed:{inputW:function(){var t="";return t=this.isOther?"".concat(this.$t("assets.withdraw.NumberOfCoins"),"（").concat(this.symbol,"）"):this.$t("assets.withdraw.NumberOfCoins"),t},aikrw:function(){var t="--";return this.isOther&&"--"!==this.arrivalAccount&&(t=1e3*this.arrivalAccount),t},isOther:function(){return"AIKRW"===this.symbol},buttonDisabled:function(){return!this.numberValueObj.flag||!this.feeList[this.addressValue]},numberValueObj:function(){var t=!0,e=!1,a="",s=parseFloat(this.numberValue),i=parseFloat(this.detailsList[1].value)||0,n=parseFloat(this.withdrawMax)||0,o=parseFloat(this.withdrawMin)||0,r=parseFloat(this.daywithdrawMax)||0;if(s){if(s<o){t=!1,e=!0;var l=this.$t("assets.b2c.withdrawMinWarn");a="".concat(l).concat(this.withdrawMin," ").concat(this.symbol)}else if(s>n){t=!1,e=!0;var c=this.$t("assets.b2c.withdrawMaxWarn");a="".concat(c).concat(this.withdrawMax," ").concat(this.symbol)}else if(s>r){t=!1,e=!0;var h=this.$t("assets.b2c.withdrawDayWarn");a="".concat(h).concat(this.daywithdrawMax," ").concat(this.symbol)}else if(s>i){t=!1,e=!0;var u=this.$t("assets.b2c.withdrawHaveWarn");a="".concat(u).concat(this.detailsList[1].value," ").concat(this.symbol)}}else t=!1,e=!1;return{flag:t,showError:e,text:a}},showSymbol:function(){var t=this.symbol;return t},showPrecision:function(){var t=0,e=this.$store.state.baseData.market;return e&&e.coinList&&e.coinList[this.symbol]&&(t=e.coinList[this.symbol].showPrecision),t},exchangeData:function(){return this.$store.state.assets.exchangeData},market:function(){return this.$store.state.baseData.market},phoneValueFlag:function(){return this.$store.state.regExp.verification.test(this.phoneValue)},googleValueFlag:function(){return this.$store.state.regExp.verification.test(this.googleValue)},phoneError:function(){return 0!==this.phoneValue.length&&!this.phoneValueFlag},googleError:function(){return 0!==this.googleValue.length&&!this.googleValueFlag},dialogConfirmDisabled:function(){var t=!0,e=!0;return this.OpenMobile&&(t=this.phoneValueFlag),this.OpenGoogle&&(e=this.googleValueFlag),!(t&&e||this.dialogConfirmLoading)},that:function(){return this},arrivalAccount:function(){return this.numberValueObj.flag&&"--"!==this.fee?Object(o["f"])(parseFloat(this.numberValue)-parseFloat(this.fee),this.showPrecision):"--"},fee:function(){if(!this.numberValueObj.flag)return"--";if(this.feeList[this.addressValue]&&this.market){var t=this.feeList[this.addressValue],e=t.fee,a=t.feeType;if(a){var s=e/100;return Object(o["f"])(this.numberValue*s,this.showPrecision)}return Object(o["f"])(e,this.showPrecision)}return"--"}},methods:{init:function(){var t=this;this.$route.query.symbol?this.symbol=this.$route.query.symbol.toUpperCase():this.$router.push("/assets/exchangeAccount"),this.$bus.$on("getMess",(function(){t.getMessage()})),this.market&&this.symbol&&this.getMessage(),this.getBankList()},getMessage:function(){var t=this;this.axios({url:"fiat/balance",params:{symbol:this.symbol}}).then((function(e){if("0"===e.code.toString()){var a={};e.data.allCoinMap.forEach((function(e){e.symbol===t.symbol&&(a=e)})),t.nowSymbolMess=a,t.detailsList.forEach((function(e,s){t.detailsList[s].value=Object(o["f"])(a[e.key],t.showPrecision)})),t.withdrawMin=Object(o["f"])(a.withdrawMin,t.showPrecision),t.withdrawMax=Object(o["f"])(a.withdrawMax,t.showPrecision),t.daywithdrawMax=Object(o["f"])(a.canWithdrawBalance,t.showPrecision),t.warning=e.data.withdrawTip}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},getBankList:function(){var t=this;this.axios({url:"/bank/all",params:{symbol:this.symbol}}).then((function(e){if("0"===e.code.toString()){var a={};e.data.forEach((function(t){a[t.bankNo.toString()]=t.accountName})),t.getUserBank(a)}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},getUserBank:function(t){var e=this;this.axios({url:"user/bank/user_bank_list",params:{pageSize:100,page:1,symbol:this.symbol}}).then((function(a){if("0"===a.code.toString()){var s=[],i={};a.data.list.forEach((function(e){s.push({code:"".concat(e.id),value:"".concat(e.cardNo),label:"".concat(t[e.bankNo],"(").concat(e.name,")")}),i[e.id]=e})),e.feeList=i,e.addressList=s}else e.$bus.$emit("tip",{text:a.msg,type:"error"})}))},goAddress:function(){this.$router.push("/assets/b2cAddressMent?symbol=".concat(this.symbol))},inputChange:function(t,e){this[e]=t},addressChange:function(t){this.addressValue=t.code},allWithDraw:function(){"--"!==this.detailsList[1].value&&(this.numberValue=this.detailsList[1].value)},getCodeClick:function(){this.sendSmsCode()},sendSmsCode:function(){var t=this;this.axios({url:"v4/common/smsValidCode",params:{operationType:"32"}}).then((function(e){"0"!==e.code.toString()?setTimeout((function(){t.$bus.$emit("getCode-clear","withdrawGetcode"),t.$bus.$emit("tip",{text:e.msg,type:"error"})}),2e3):t.$bus.$emit("tip",{text:t.$t("assets.withdraw.phoneSendSuccess"),type:"success"})}))},withdrawClick:function(){this.dialogFlag=!0},dialogClose:function(){this.phoneValue="",this.googleValue="",this.dialogFlag=!1},dialogConfirm:function(){var t=this;this.dialogConfirmLoading=!0,this.axios({url:"/fiat/withdraw",params:{symbol:this.symbol,userWithdrawBankId:this.addressValue,amount:this.numberValue,smsAuthCode:this.phoneValue||void 0,googleCode:this.googleValue||void 0}}).then((function(e){t.dialogConfirmLoading=!1,"0"===e.code.toString()?(t.$bus.$emit("b2cWithdrawHisGet"),t.getMessage(),t.$bus.$emit("tip",{text:e.msg,type:"success"}),t.addressValue="",t.numberValue="",t.phoneValue="",t.googleValue="",t.dialogFlag=!1):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))}}},l=(a("b9d5"),a("5248")),c={name:"page-b2cWithdraw",components:{hisTable:l["a"]},mixins:[n["a"],r],mounted:function(){this.init()}},h=c,u=a("2877"),d=Object(u["a"])(h,s,i,!1,null,null,null);e["default"]=d.exports},b9d5:function(t,e,a){},e369:function(t,e,a){"use strict";a("c5f6"),a("6b54");e["a"]={name:"b2cMixins",data:function(){return{alertFlag:!1}},watch:{userInfoIsReady:{immediate:!0,handler:function(t){t&&this.canAlert()}}},methods:{alertClone:function(){this.alertFlag=!1},alertGo:function(){this.$router.push("/personal/userManagement")},canAlert:function(){var t=this;(this.OpenGoogle||!this.enforceGoogleAuth&&this.OpenMobile)&&this.idAuth?this.alertFlag=!1:setTimeout((function(){t.alertFlag=!0}),100)}},computed:{userInfoIsReady:function(){return this.$store.state.baseData.userInfoIsReady},enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},authTitleText:function(){var t="assets.withdraw.enforceGoogleAuth";return this.$t(t)},alertData:function(){var t=[{text:this.$t("otcRelease.authentication"),flag:this.idAuth},{text:this.$t("assets.withdraw.bindGoogle"),flag:this.OpenGoogle}];return this.enforceGoogleAuth||t.push({text:this.$t("assets.withdraw.bindPhone"),flag:this.OpenMobile}),t},OpenMobile:function(){var t=!1,e=this.$store.state.baseData.userInfo;return e&&"1"===e.isOpenMobileCheck.toString()&&(t=!0),t},OpenGoogle:function(){var t=!1,e=this.$store.state.baseData.userInfo;return e&&"1"===e.googleStatus.toString()&&(t=!0),t},idAuth:function(){var t=this.$store.state.baseData.userInfo,e=0;return t&&(e=1===Number(t.authLevel)),e}}}}}]);