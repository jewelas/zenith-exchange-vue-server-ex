(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-110b2b12"],{"082c":function(t,e,a){"use strict";var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"b2cRecrgeHis"},[e("c-QRcode",{attrs:{flag:t.QRflag,imgUrl:t.imgUrl},on:{QRcodeClick:t.QRcodeClick}}),e("c-table",{attrs:{colorMap:t.colorMap,loading:t.tabelLoading,columns:t.columns,subContent:t.subTableData,subContentId:t.subTableDataId,subColumns:t.subColumns,dataList:t.tabelList},on:{elementClick:t.tableClick}}),t.paginationObj.total>t.paginationObj.display?e("c-pagination",{attrs:{total:t.paginationObj.total,display:t.paginationObj.display,currentPage:t.paginationObj.currentPage},on:{pagechange:t.pagechange}}):t._e()],1)},i=[],n=(a("6b54"),a("ac6a"),a("95d5")),o={name:"b2cRecrgeHis",props:{symbol:{default:"",type:String},lately:{default:!1,type:Boolean}},data:function(){return{colorMap:n["b"],revokeList:[],paginationObj:{total:0,display:10,currentPage:1},tabelLoading:!0,tabelList:[],subTableData:[],subTableDataId:null,financeListData:[],imgUrl:"",QRflag:!1}},watch:{symbol:function(t){t&&this.market&&this.getTableList()},market:function(t){t&&this.symbol&&this.getTableList()},paginationObjCurrentPage:function(){this.getTableList()}},computed:{market:function(){return this.$store.state.baseData.market},paginationObjCurrentPage:function(){return this.paginationObj.currentPage},columns:function(){return[{title:this.$t("assets.recharge.RechargeTime"),width:"15%"},{title:this.$t("assets.recharge.RechargeCoin"),width:"10%"},{title:this.$t("assets.b2c.b2cRecrgeHisList1"),width:"18%"},{title:this.$t("assets.b2c.b2cRecrgeHisList2"),width:"18%"},{title:this.$t("assets.withdraw.withdrawStatus"),width:"14%"},{title:this.$t("assets.withdraw.withdrawOptions"),width:"25%"}]},subColumns:function(){return[this.$t("assets.b2c.b2cRecrgeHisList3"),this.$t("assets.b2c.firstWay"),this.$t("assets.b2c.addressUserName")]}},methods:{init:function(){var t=this;this.symbol&&this.market&&this.getTableList(),this.$bus.$on("b2cRecrgeHisGet",(function(){t.tabelLoading=!0,t.paginationObj.currentPage=1,t.getTableList()}))},QRcodeClick:function(){this.QRflag=!1},showPrecision:function(t){var e=0,a=this.$store.state.baseData.market;return a&&a.coinList&&a.coinList[t]&&(e=a.coinList[t].showPrecision),e},pagechange:function(t){this.paginationObj.currentPage=t},tableClick:function(t,e){var a=this;if("revoke"===t){var s={};this.tabelList.forEach((function(t){t.id===e&&(s=t)})),-1===this.revokeList.indexOf(s.id)&&(this.revokeList.push(s.id),this.axios({url:"/fiat/cancel_deposit",headers:{},params:{id:s.id},method:"post"}).then((function(t){var e=a.revokeList.indexOf(s.id);a.revokeList.splice(e,1),"0"===t.code.toString()?(a.getTableList(),a.$bus.$emit("tip",{text:t.msg,type:"success"})):a.$bus.$emit("tip",{text:t.msg,type:"error"})})))}if("subView"===t&&(this.subTableDataId=e.id,this.subTableData=[],this.financeListData.forEach((function(t){t.id===a.subTableDataId&&a.subTableData.push([t.updatedAt?Object(n["k"])(t.updatedAt):"--",a.$t("assets.b2c.bankCard"),t.userName])}))),"seePz"===t){var i={};this.tabelList.forEach((function(t){t.id===e&&(i=t)})),this.imgUrl=i.transferVoucher,this.QRflag=!0}},handleButton:function(t){var e=[];return t.transferVoucher&&e.push({type:"button",text:this.$t("assets.b2c.seePz"),iconClass:[""],eventType:"seePz"}),0===t.status&&e.push({type:"button",text:this.$t("assets.flowingWater.Cancel"),iconClass:[""],eventType:"revoke"}),e.push({type:"subTable",text:this.$t("trade.view"),eventType:"subView"}),e},getTableList:function(){var t=this;this.axios({url:"/fiat/deposit/list",params:{pageSize:this.paginationObj.display,page:this.paginationObj.currentPage,symbol:"all"===this.symbol?void 0:this.symbol}}).then((function(e){if(t.tabelLoading=!1,"0"===e.code.toString()){var a=[];t.financeListData=e.data.financeList,e.data.financeList.forEach((function(e){var s="AIKRW"===e.symbol,i=t.showPrecision(e.symbol);a.push({id:e.id,transferVoucher:e.transferVoucher,data:[Object(n["k"])(e.createdAt),e.symbol,Object(n["f"])(e.amount,i)+(s?" KRW":" ".concat(e.symbol)),"".concat(Object(n["f"])(e.settledAmount,i)," ").concat(e.symbol),e.statusText,t.handleButton(e)]})})),t.tabelList=a,t.paginationObj.total=t.lately&&e.data.count>30?30:e.data.count}}))}}},r=(a("b615"),{mixins:[o],mounted:function(){this.init()}}),c=r,l=a("2877"),u=Object(l["a"])(c,s,i,!1,null,null,null);e["a"]=u.exports},"1bee":function(t,e,a){"use strict";a.r(e);a("c5f6");var s=function(){var t=this,e=t._self._c;return e("section",{staticClass:"page-b2cRecrge"},[e("header",{staticClass:"withdraw-header b-1-cl a-3-bd"},[t._v(t._s(t.$t("assets.recharge.recharge")))]),e("div",{staticClass:"withdraw-details clearfix a-7-bd"},[e("div",{staticClass:"clearfix"},[e("div",{staticClass:"details-left"},[e("div",{staticClass:"symbol b-1-cl"},[t._v(t._s(t.showSymbol)+t._s(t.$t("assets.b2c.recrgeTitle")))]),e("ul",{staticClass:"b2cRecrge-mess"},t._l(t.messageOptions,(function(a,s){return e("even",{key:s,attrs:{title:a.title,haveCopy:a.haveCopy,value:t.messageValue[s],hover:a.hover}})})),1),t.warning?e("div",{staticClass:"details-warking b-7-cl clearfix"},[e("svg",{staticClass:"icon icon-16 details-warking-icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-c_2"}})]),e("span",{staticClass:"details-warking-text"},[t._v(t._s(t.warning))])]):t._e()]),e("div",{staticClass:"details-right"},[e("c-inputLine",{attrs:{name:"rechargeNum",value:t.rechargeNum,errorFlag:t.rechargeNumError,errorHave:!0,errorText:"",promptText:t.inputW},on:{onchanges:t.inputChanges}},[e("div")]),e("div",{staticClass:"details-warking b-7-cl clearfix details-wark"},[e("span",{staticClass:"details-warking-text recrgeWarn"},[t._v(t._s(t.$t("assets.b2c.rechargeMin"))+t._s(t._f("fixDFn")(t.minRecrge,t.that))+" "+t._s(t.symbol))])]),t.isOther?e("div",{staticClass:"otherClass"},[t._v("实际需充值："),e("span",{staticClass:"f-1-cl"},[t._v("\n            "+t._s(t.aikrw)+" KRW")])]):t._e(),e("div",{staticClass:"voucher"},[t._v("\n          "+t._s(t.$t("assets.b2c.voucherTit"))+"\n          "),e("span",{staticClass:"tolanIcon"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_15"}})]),e("div",{staticClass:"iconMark a-4-bg b-1-cl"},[t._v(t._s(t.$t("assets.b2c.voucherWarn")))])])]),e("div",{staticClass:"uploadImg a-4-bg a-2-bd"},[t.imgLoading?e("div",{staticClass:"uploadLoading"},[e("c-loading",{attrs:{size:"34"}}),e("p",{staticClass:"uploadMark-text u-8-cl"},[t._v(t._s(t.$t("questions.upload4")))])],1):e("div",{staticClass:"uploadMark"},[e("div",[e("svg",{staticClass:"icon icon-24",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-e_9"}})])]),e("p",{staticClass:"uploadMark-text u-8-cl"},[t._v(t._s(t.$t("assets.b2c.voucherCli")))])]),Number(t.clientUploadType)?e("c-oldUploadFile",{staticClass:"upload_file",attrs:{name:"questionsImg",url:"common/upload_img",isOpenUploadImg:t.isOpenUploadImg,expand:[],imageType:t.imageType},on:{tellMessage:t.onChangeFileFun,uploadFinish:t.uploadFinish}}):t._e(),Number(t.clientUploadType)?t._e():e("c-oldUploadFile",{staticClass:"upload_file",attrs:{name:"questionsImg",url:"common/upload_img",isOpenUploadImg:t.isOpenUploadImg,expand:[],imageType:t.imageType},on:{tellMessage:t.onChangeFileFun,uploadFinish:t.uploadFinish}}),t.imgUrl.length?e("div",{staticClass:"b-2-bg imgmk"}):t._e(),t.imgUrl.length?e("img",{staticClass:"upload-image",attrs:{src:t.imgUrl,alt:""}}):t._e()],1),e("c-button",{attrs:{disabled:t.btnDisabled,loading:t.buttonLoading,marginTop:"40px",height:"40px",width:"380px",paddingW:"0"},on:{click:t.submit}},[t._v(t._s(t.$t("assets.recharge.recharge")))])],1)])]),e("header",{staticClass:"withdraw-header b-1-cl a-3-bd"},[t._v("\n    "+t._s(t.$t("assets.recharge.RecentRechargeRecord")))]),e("div",{staticClass:"withdraw-table"},[e("his-table",{attrs:{symbol:t.symbol,lately:!0}})],1),e("c-verifyCationc-alert",{attrs:{imgMap:t.imgMap,showFlag:t.alertFlag,titleText:t.$t("assets.withdraw.safetyWarning"),detaText:t.authTitleText,dataList:t.alertData,buttonText:t.$t("assets.withdraw.GotoOpen"),haveClose:!1},on:{close:t.alertClone,confirm:t.alertGo}}),e("c-dialog",{attrs:{showFlag:t.dialogFlag,paddingBottom:"14px",confirmLoading:t.dialogConfirmLoading,titleText:"充值确认"},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[e("section",{staticClass:"b2cRecrgeDialog"},[e("div",{staticClass:"b-7-cl b2cRecrgeDialog-warn"},[t._v("确定您已通过您本人实名的账户向平台充值账户完成如下金额的转账？")]),e("ul",{staticClass:"confirmMess"},[e("li",{staticClass:"a-4-bg"},[e("p",{staticClass:"key"},[t._v(t._s(t.$t("assets.b2c.rechargeSum")))]),e("p",{staticClass:"value b-1-cl"},[t._v(t._s(t.rechargeNum)+" "+t._s(t.symbol)+"\n            "),t.isOther?e("span",[t._v(" ≈ "+t._s(t.aikrw)+" KRW")]):t._e()])]),t.imgUrl?e("li",{staticClass:"a-4-bg"},[e("p",{staticClass:"key"},[t._v(t._s(t.$t("assets.b2c.voucherTit")))]),e("p",{staticClass:"value b-1-cl"},[e("img",{attrs:{src:t.imgUrl},on:{click:t.imgClick}})])]):t._e()])])]),e("c-QRcode",{attrs:{flag:t.QRflag,imgUrl:t.imgUrl},on:{QRcodeClick:t.QRcodeClick}})],1)},i=[],n=a("e369"),o=(a("7f7f"),a("ac6a"),a("6b54"),a("95d5")),r={data:function(){return{imgMap:o["s"],QRflag:!1,dialogFlag:!1,dialogConfirmLoading:!1,rechargeNum:"",imgLoading:!1,imageType:"2",messageValue:{bankName:"",bankSub:"",cardNo:"",name:"",remark:""},symbol:"",imgUrl:"",imageDataStr:"",nowSymbolMess:{},infoIsReady:!1,assetsReady:!1,buttonLoading:!1,isTransferVoucher:0,warning:""}},filters:{fixDFn:function(t,e){return Object(o["f"])(t,e.showPrecision)}},watch:{clientUploadType:function(){this.getImageToken()},market:function(t){t&&this.symbol&&(this.getAssets(),this.getMessage())},rechargeNum:function(t){this.rechargeNum=Object(o["h"])(t,this.showPrecision)}},computed:{inputW:function(){var t="";return t=this.isOther?"".concat(this.$t("assets.b2c.rechargeSum"),"（").concat(this.symbol,"）"):this.$t("assets.b2c.rechargeSum"),t},aikrw:function(){var t="--";return this.isOther&&this.rechargeNum&&(t=1e3*this.rechargeNum),t},isOther:function(){return"AIKRW"===this.symbol},rechargeNumFlag:function(){var t=parseFloat(this.rechargeNum),e=parseFloat(this.minRecrge);return t>=e},rechargeNumError:function(){return!(!this.rechargeNum.length||this.rechargeNumFlag)},that:function(){return this},market:function(){return this.$store.state.baseData.market},minRecrge:function(){var t="0";return this.nowSymbolMess.depositMin&&(t=this.nowSymbolMess.depositMin),t},clientUploadType:function(){return this.$store.state.baseData.client_img_upload_open},isOpenUploadImg:function(){var t=this.$store.state.baseData.publicInfo,e="0";return t&&t.switch&&t.switch.is_open_upload_img&&"1"===t.switch.is_open_upload_img.toString&&(e="1"),e},imgToken:function(){return this.$store.state.baseData.imgToken||{}},messageOptions:function(){return{bankName:{title:this.$t("assets.b2c.bankName"),haveCopy:!1},bankSub:{title:this.$t("assets.b2c.bankSub"),haveCopy:!0},cardNo:{title:this.$t("assets.b2c.cardNo"),haveCopy:!0},name:{title:this.$t("assets.b2c.name"),haveCopy:!0},remark:{title:this.$t("assets.b2c.remark"),haveCopy:!0,hover:!0}}},showSymbol:function(){var t=this.symbol;return t},showPrecision:function(){var t=0,e=this.$store.state.baseData.market;return e&&e.coinList&&e.coinList[this.symbol]&&(t=e.coinList[this.symbol].showPrecision),t},btnDisabled:function(){var t=!0,e=!this.isTransferVoucher||!!this.imageDataStr.length;return(this.assetsReady&&this.infoIsReady&&this.rechargeNumFlag&&e||this.buttonLoading)&&(t=!1),t}},methods:{init:function(){this.getImageToken(),this.$route.query.symbol?(this.symbol=this.$route.query.symbol.toUpperCase(),this.symbol&&this.market&&(this.getAssets(),this.getMessage())):this.$router.push("/assets/b2cAccount")},imgClick:function(){this.QRflag=!0},QRcodeClick:function(){this.QRflag=!1},dialogClose:function(){this.dialogFlag=!1},dialogConfirm:function(){var t=this;this.dialogConfirmLoading=!0,this.axios({url:"/fiat/deposit",params:{symbol:this.symbol,transferVoucher:this.imageDataStr,amount:this.isOther?this.aikrw:this.rechargeNum}}).then((function(e){t.dialogConfirmLoading=!1,"0"===e.code.toString()?(t.rechargeNum="",t.imgUrl="",t.imageDataStr="",t.dialogFlag=!1,t.$bus.$emit("b2cRecrgeHisGet"),t.$bus.$emit("tip",{text:e.msg,type:"success"})):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},getAssets:function(){var t=this;this.axios({url:"fiat/balance",params:{symbol:this.symbol}}).then((function(e){if("0"===e.code.toString()){t.assetsReady=!0;var a={};e.data.allCoinMap.forEach((function(e){e.symbol===t.symbol&&(a=e)})),t.nowSymbolMess=a,t.warning=e.data.depositTip}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},submit:function(){this.dialogFlag=!0},inputChanges:function(t,e){this[e]=t},onChangeFileFun:function(){this.imgLoading=!0},uploadFinish:function(t){t.error?this.$bus.$emit("tip",{text:t.error,type:"error"}):(this.imgUrl=t.url,this.imgLoading=!1,this.imageDataStr=t.fileName)},getImageToken:function(){var t=this.imgToken[this.imageType];(!t||new Date(t.Expiration).getTime()-(new Date).getTime()<3e4)&&Number(this.clientUploadType)&&this.$store.dispatch("getImgToken",this.imageType)},getMessage:function(){var t=this;this.axios({url:"/company/bank/info",params:{symbol:this.symbol}}).then((function(e){"0"===e.code.toString()?(t.infoIsReady=!0,t.messageValue.bankName=e.data.bankName||"",t.messageValue.bankSub=e.data.bankSub||"",t.messageValue.cardNo=e.data.cardNo||"",t.messageValue.name=e.data.name||"",t.messageValue.remark=e.data.remark||"",t.isTransferVoucher=e.data.isTransferVoucher||0):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},inputChange:function(t,e){this[e]=t}}},c=(a("c732"),function(){var t=this,e=t._self._c;return e("section",{staticClass:"a-4-bg b2cRecrge-even"},[e("span",{staticClass:"key"},[t._v(t._s(t.title))]),e("span",{staticClass:"value f-1-cl"},[t._v(t._s(t.value))]),t.haveCopy?e("span",{staticClass:"copyTd"},[e("input",{ref:"value",domProps:{value:t.value}}),e("span",{staticClass:"svgs",on:{click:t.copy}},[e("svg",{staticClass:"icon icon-14 info",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_9"}})]),e("svg",{staticClass:"icon icon-14 active",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_9_1"}})])])]):t._e(),t.hover?e("span",{staticClass:"even-tolanIcon"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-a_15"}})]),e("div",{staticClass:"iconMark a-4-bg b-1-cl"},[t._v("线下转账时填入该文案作为备注，可以方便工作人员更快确认您的充值")])]):t._e()])}),l=[],u={props:{title:{default:"",type:String},haveCopy:{default:!1,type:Boolean},hover:{default:!1,type:Boolean},value:{default:"",type:String}},methods:{copy:function(){var t=this.$refs.value;t.select(),t.setSelectionRange(0,t.value.length),document.execCommand("copy"),this.$bus.$emit("tip",{text:this.$t("assets.krw.copySuccess"),type:"success"})}}},h=(a("a3f2"),{mixins:[u]}),g=h,d=a("2877"),m=Object(d["a"])(g,c,l,!1,null,null,null),b=m.exports,p=a("082c"),f={mixins:[n["a"],r],components:{even:b,hisTable:p["a"]},name:"page-b2cRecrge",mounted:function(){this.init()}},v=f,y=Object(d["a"])(v,s,i,!1,null,null,null);e["default"]=y.exports},a3f2:function(t,e,a){},b615:function(t,e,a){},c732:function(t,e,a){},e369:function(t,e,a){"use strict";a("c5f6"),a("6b54");e["a"]={name:"b2cMixins",data:function(){return{alertFlag:!1}},watch:{userInfoIsReady:{immediate:!0,handler:function(t){t&&this.canAlert()}}},methods:{alertClone:function(){this.alertFlag=!1},alertGo:function(){this.$router.push("/personal/userManagement")},canAlert:function(){var t=this;(this.OpenGoogle||!this.enforceGoogleAuth&&this.OpenMobile)&&this.idAuth?this.alertFlag=!1:setTimeout((function(){t.alertFlag=!0}),100)}},computed:{userInfoIsReady:function(){return this.$store.state.baseData.userInfoIsReady},enforceGoogleAuth:function(){return this.$store.state.baseData.is_enforce_google_auth||0},authTitleText:function(){var t="assets.withdraw.enforceGoogleAuth";return this.$t(t)},alertData:function(){var t=[{text:this.$t("otcRelease.authentication"),flag:this.idAuth},{text:this.$t("assets.withdraw.bindGoogle"),flag:this.OpenGoogle}];return this.enforceGoogleAuth||t.push({text:this.$t("assets.withdraw.bindPhone"),flag:this.OpenMobile}),t},OpenMobile:function(){var t=!1,e=this.$store.state.baseData.userInfo;return e&&"1"===e.isOpenMobileCheck.toString()&&(t=!0),t},OpenGoogle:function(){var t=!1,e=this.$store.state.baseData.userInfo;return e&&"1"===e.googleStatus.toString()&&(t=!0),t},idAuth:function(){var t=this.$store.state.baseData.userInfo,e=0;return t&&(e=1===Number(t.authLevel)),e}}}}}]);