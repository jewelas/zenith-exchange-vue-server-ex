(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4da1fe65"],{"0e89":function(e,t,s){},"51dc":function(e,t,s){},a810:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"fuz-card with-title"},[e.modifyApiShow?t("ModifyApi",{attrs:{getApiList:e.getApiList}}):e._e(),t("div",{staticClass:"two-column"},[t("div",[t("p",{staticClass:"header-top-title fuz-card-title"},[e._v("\n        "+e._s(this.$t("personal.APImanagement.navTab")[0])+"\n      ")]),t("div",{staticClass:"center1-inputs clearfix fuz-card-content",staticStyle:{width:"384px"}},[t("div",{staticClass:"center1-input clearfix",style:e.enStyle},[t("c-inputLine",{attrs:{name:"ip",inputType:"text",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",value:e.checkValue1},on:{onchanges:e.inputChanges}})],1),t("div",{staticClass:"center1-input clearfix",style:e.enStyle},[t("c-inputLine",{attrs:{name:"note",maxLength:"25",inputType:"text",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}})],1),t("div",{directives:[{name:"show",rawName:"v-show",value:e.smsCode,expression:"smsCode"}],staticClass:"center1-input clearfix",style:e.enStyle},[t("c-inputLine",{attrs:{maxLength:"6",name:"phoneCode",inputType:"text",promptText:e.promptText3,errorHave:!0,errorText:e.errorText3,errorFlag:e.checkErrorFlag3,marginTop:"0px",value:e.checkValue3},on:{onchanges:e.inputChanges}},[t("c-getCode",{attrs:{name:"phone",autoStart:e.autoStart,voiceOpen:e.voiceSmsOpen,buttonName:"loginGetcodeBtn"},on:{click:e.getCodeClick}})],1)],1),t("div",{directives:[{name:"show",rawName:"v-show",value:e.googleCode,expression:"googleCode"}],staticClass:"center1-input clearfix",style:e.enStyle},[t("c-inputLine",{attrs:{name:"googleCode",maxLength:"6",inputType:"text",promptText:e.promptText4,errorHave:!0,errorText:e.errorText4,errorFlag:e.checkErrorFlag4,marginTop:"0px",value:e.checkValue4},on:{onchanges:e.inputChanges}})],1),t("div",{staticClass:"center1-header"},[t("p",{staticClass:"fuz-content-small"},[t("svg",{staticClass:"icon icon-16",staticStyle:{"margin-right":"10px"},attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":"#icon-c_2"}})]),t("span",[e._v(e._s(e.$t("personal.prompt.warningApi")))])])]),t("div",{staticClass:"center1-button clearfix"},[t("c-button",{attrs:{type:"solid",big:!0,className:"fuz-primary-btn",loading:e.loading2,paddingW:"0px",disabled:e.disabled,marginTop:"18px",height:"40px",width:"100%"},on:{click:e.btnLink}},[e._v("\n              "+e._s(e.$t("personal.tool.create"))+"\n            ")])],1)])]),e.modifyApiShow?e._e():t("div",{staticClass:"api-management fuz-clear-float"},[t("div",{staticClass:"api-management-header-top fuz-noborder fuz-clear-float"},[t("p",{staticClass:"header-top-title fuz-card-title"},[e._v("\n            "+e._s(e.$t("personal.APImanagement.apiDocument"))+"\n          ")]),t("div",{staticClass:"header-top-center fuz-card-content"},[e.thirdApiDocUrl?e._e():t("div",{staticClass:"top-center-text fuz-gap"},[t("span",{staticClass:"b-1-cl"},[e._v(e._s(e.$t("personal.APImanagement.domainName"))+"：")]),t("span",{staticClass:"b-1-cl"},[e._v(e._s(e.openApiUrl))])]),t("div",{staticClass:"fuz-primary-btn small"},[t("a",{staticClass:"api-document",attrs:{href:e.apiNoteUrl,target:"_blank"}},[e._v("\n                "+e._s(e.$t("personal.APImanagement.lookApiDocument")))])])])])])]),t("div",{staticClass:"api-management-center"},[t("div",{directives:[{name:"show",rawName:"v-show",value:1===e.currentTab,expression:"currentTab === 1"}],staticClass:"center1 clearfix fuz-clear-float"},[t("div",{staticClass:"center1-table clearfix fuz-noborder"},[t("p",{staticClass:"fuz-card-title",staticStyle:{width:"100%"}},[e._v("\n            "+e._s(e.$t("personal.APImanagement.recordTitle"))+"\n          ")]),t("c-table",{attrs:{imgMap:e.imgMap,className:"transparent",colorMap:e.colorMap,loading:e.loading,classes:e.classes,headClasses:e.headClasses,bodyClasses:e.bodyClasses,lineClasses:e.lineClass,columns:e.columns,dataList:e.apiList,lineNumber:e.lineNumber,cellHeight:e.cellHeight,headHeight:e.headHeight},on:{elementClick:e.deleteData}}),t("c-pagination",{directives:[{name:"show",rawName:"v-show",value:0!==e.count,expression:"count !== 0"}],attrs:{total:e.count,"current-page":e.page,display:e.pageSize},on:{pagechange:e.pagechange}})],1)]),t("div",{directives:[{name:"show",rawName:"v-show",value:2===e.currentTab,expression:"currentTab === 2"}],staticClass:"center2 clearfix"},[t("a",{staticClass:"api-down a-12-bd b-2-cl",attrs:{href:"https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md",target:"_blank"},on:{mouseenter:e.handMouseenter,mouseleave:e.handMouseleave}},[e._v(e._s(e.$t("personal.APImanagement.downloadDocumen")))]),t("c-table",{attrs:{imgMap:e.imgMap,colorMap:e.colorMap,className:"transparent",classes:e.classes,headClasses:e.headClasses,bodyClasses:e.bodyClasses,lineClasses:e.lineClass,columns:e.columns2,dataList:e.apiList2,lineNumber:e.lineNumber,cellHeight:e.cellHeight,headHeight:e.headHeight},on:{elementClick:e.deleteData}})],1),t("div",{directives:[{name:"show",rawName:"v-show",value:3===e.currentTab,expression:"currentTab === 3"}],staticClass:"center3 clearfix"},[t("a",{staticClass:"api-down a-12-bd b-2-cl",attrs:{href:"https://github.com/exchange-doc/api/blob/master/api/zh_cn/api_doc_cn.md",target:"_blank"},on:{mouseenter:e.handMouseenter,mouseleave:e.handMouseleave}},[e._v(e._s(e.$t("personal.APImanagement.downloadDocumen")))]),t("c-table",{attrs:{imgMap:e.imgMap,colorMap:e.colorMap,classes:e.classes,headClasses:e.headClasses,bodyClasses:e.bodyClasses,lineClasses:e.lineClass,columns:e.columns2,dataList:e.apiList3,lineNumber:e.lineNumber,cellHeight:e.cellHeight,headHeight:e.headHeight},on:{elementClick:e.deleteData}})],1)]),t("c-dialog",{attrs:{showFlag:e.dialogFlag,paddingBottom:"14px",confirmLoading:e.dialogConfirmLoading,confirmDisabled:e.dialogConfirmDisabled,titleText:e.titleText},on:{close:e.dialogClose,confirm:e.dialogConfirm}},[t("div",{staticClass:"dialog-div a-4-bg"},[t("ul",[t("li",{staticClass:"a-5-bd"},[t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.$t("personal.APImanagement.secretKey")))]),t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.secretKey)+"\n              "),t("span",{on:{click:function(t){return e.copyClick("secretKey")},mouseenter:function(t){return e.handMouseenters("secretKey")},mouseleave:function(t){return e.handMouseleaves("secretKey")}}},[e._v(">\n              "),e.secretKeyShow?t("span",[t("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":"#icon-a_9"}})])]):t("span",[t("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":"#icon-a_9_1"}})])])])])]),t("li",{staticClass:"a-5-bd"},[t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.$t("personal.APImanagement.APIKye")))]),t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.apiKey)+"\n              "),t("span",{on:{click:function(t){return e.copyClick("apiKey")},mouseenter:function(t){return e.handMouseenters("apiKey")},mouseleave:function(t){return e.handMouseleaves("apiKey")}}},[e.apiKeyShow?t("span",[t("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":"#icon-a_9"}})])]):t("span",[t("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[t("use",{attrs:{"xlink:href":"#icon-a_9_1"}})])])])])]),t("li",{staticClass:"b-4-bd"},[t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.$t("personal.APImanagement.ip")))]),t("p",{staticClass:"b-2-cl"},[e._v(e._s(e.checkValue1))])])])])]),t("c-alert",{attrs:{showFlag:e.alertFlag,buttonText:e.$t("assets.addressMent.GotoOpen"),imgMap:e.imgMap},on:{close:e.alertClose,confirm:e.alertGo}},[t("div",{staticClass:"alertTitle b-2-cl"},[e._v(e._s(e.$t("personal.alert.title")))]),t("div",{staticClass:"alertText"},[e._v(e._s(e.$t("personal.alert.text")))]),t("div",{staticClass:"alertError a-2-bd"},[t("span",{staticClass:"alertError-text b-4-cl"},[e._v(e._s(e.$t("personal.alert.alertErrorTextGoogle")))]),t("span",{staticClass:"alertError-icon"},[e._v("+")])]),t("div",{staticClass:"alertError alertBot a-2-bd"},[t("span",{staticClass:"alertError-text b-4-cl"},[e._v(e._s(e.$t("personal.alert.alertErrorTextPhone")))]),t("span",{staticClass:"alertError-icon"},[e._v("+")])])])],1)},i=[],n=(s("ac6a"),s("28a5"),s("3b2b"),s("a481"),s("4917"),s("6b54"),s("c5f6"),s("95d5")),r={name:"apiManagement",watch:{userInfo:function(e){null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck))},sendSmsCode:function(e){null!==e&&("success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.smsType="1"===e.type?"voiceSms":"sms"):(this.$bus.$emit("getCode-clear","phone"),this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")))},createOpenApi:function(e){if(null!==e)if(this.loading2=!1,"success"===e.text){this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.dialogConfirm();var t={page:this.page,pageSize:this.pageSize};this.$store.dispatch("myApiList",t)}else this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")},myApiList:function(e){null!==e&&(this.loading=!1,this.processData(e.apiList),e.count>10?this.count=e.count:0===e.count&&(this.apiList=[]))},deleteOpenApi:function(e){if(null!==e)if(this.delete=!0,"success"===e.text){this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType");var t={page:this.page,pageSize:this.pageSize};this.$store.dispatch("myApiList",t)}else this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")}},computed:{companyId:function(){var e=this.$store.state.baseData.publicInfo;return e&&e.msg&&e.msg.companyId},thirdApiDocUrl:function(){var e=this.$store.state.baseData.publicInfo;return e&&e.msg&&e.msg.openApiDocUrl},apiNoteUrl:function(){var e=Object(n["n"])("lan");return this.companyId&&"1645"===this.companyId.toString()?"https://github.com/ScallopBank/exchange-api":this.thirdApiDocUrl?this.thirdApiDocUrl:"zh_CN"!==e?"https://exdocs.gitbook.io/v/v/english":"https://exdocs.gitbook.io/v/general-info"},titleText:function(){return this.$t("personal.APImanagement.titleText")},promptText1:function(){return this.$t("personal.APImanagement.ip")},errorText1:function(){return this.$t("personal.prompt.ipCode")},promptText2:function(){return this.$t("personal.APImanagement.note")},errorText2:function(){return this.$t("personal.prompt.noteCode")},promptText3:function(){return this.$t("personal.label.smsCodeText")},errorText3:function(){return this.$t("personal.prompt.errorCode")},promptText4:function(){return this.$t("personal.label.googleCodeText")},errorText4:function(){return this.$t("personal.prompt.errorCode")},modifyApiShow:function(){return this.$store.state.personal.modifyApiShow},userInfo:function(){return this.$store.state.baseData.userInfo},sendSmsCode:function(){return this.$store.state.personal.sendSmsCode},createOpenApi:function(){return this.$store.state.personal.createOpenApi},myApiList:function(){return this.$store.state.personal.myApiList},deleteOpenApi:function(){return this.$store.state.personal.deleteOpenApi},api:function(){return n["s"].api},apiUrl:function(){var e={2:"",3:""};try{var t=this.$store.state.baseData.publicInfo.url.exUrl,s=t.match(/(.+)\/\/(.+)?\/?/i),a=s[1],i=s[2];e[2]="(".concat(a.indexOf("s")>-1?"wss":"ws","://").concat(i.replace(i.substring(0,i.indexOf(".")),"ws"),")"),e[3]="(".concat(a,"//").concat(i.replace(i.substring(0,i.indexOf(".")),"openapi"),")")}catch(n){}return e},columns:function(){return[{title:this.$t("personal.APImanagement.columns")[0],align:"left",width:"200px",classes:""},{title:this.$t("personal.APImanagement.columns")[1],align:"left",width:"200px"},{title:this.$t("personal.APImanagement.columns")[2],align:"right",width:""},{title:this.$t("personal.APImanagement.columns")[3],align:"right",width:""},{title:this.$t("personal.APImanagement.columns")[4],align:"right",width:""}]},columns2:function(){return[{title:"".concat(this.$t("personal.APImanagement.columnsApi")[0]," 111111"),align:"left",width:"470px",classes:""},{title:this.$t("personal.APImanagement.columnsApi")[1],align:"left",width:"470px"}]},apiList2:function(){return[{data:["/open/api/get_records",this.$t("personal.APImanagement.apiList")[0]]},{data:["/open/api/get_ticker",this.$t("personal.APImanagement.apiList")[1]]},{data:["/open/api/get_trades",this.$t("personal.APImanagement.apiList")[2]]},{data:["/open/api/market_dept",this.$t("personal.APImanagement.apiList")[3]]}]},apiList3:function(){return[{data:["/open/api/all_order",this.$t("personal.APImanagement.apiList")[4]]},{data:["/open/api/all_trade",this.$t("personal.APImanagement.apiList")[5]]},{data:["/open/api/cancel_order",this.$t("personal.APImanagement.apiList")[6]]},{data:["/open/api/common/symbols",this.$t("personal.APImanagement.apiList")[7]]},{data:["/open/api/create_order",this.$t("personal.APImanagement.apiList")[8]]},{data:["/open/api/market",this.$t("personal.APImanagement.apiList")[9]]},{data:["/open/api/new_order",this.$t("personal.APImanagement.apiList")[10]]},{data:["/open/api/order_info",this.$t("personal.APImanagement.apiList")[11]]},{data:["/open/api/user/account",this.$t("personal.APImanagement.apiList")[12]]}]},navTab:function(){return[{name:this.$t("personal.APImanagement.navTab")[0],index:1}]},openApiUrl:function(){var e=window.location.host;return e=e.replace(/www/,"openapi"),e},voiceSmsOpen:function(){return this.$store.state.baseData.voiceSmsOpen},enStyle:function(){var e=Object(n["n"])("lan");return"zh_CN"!==e?{width:"310px"}:{}}},data:function(){return{loading:!0,loading2:!1,imgMap:n["s"],colorMap:n["b"],alertFlag:!1,apiList:[],cellHeight:55,headHeight:30,lineNumber:10,classes:"",headClasses:"",bodyClasses:"",lineClass:"",count:0,page:1,pageSize:10,secretKey:"",apiKey:"",dialogFlag:!1,dialogConfirmLoading:!1,dialogConfirmDisabled:!1,checkErrorFlag1:!1,checkValue1:"",checkErrorFlag2:!1,checkValue2:"",checkErrorFlag3:!1,checkValue3:"",checkErrorFlag4:!1,checkValue4:"",autoStart:!1,disabled:!0,currentTab:1,lineHeight:"55",marginRight:48,smsCode:!1,googleCode:!1,delete:!0,secretKeyShow:!0,apiKeyShow:!0,smsType:"sms"}},methods:{init:function(){var e=this.$store.state.baseData.userInfo;null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck),this.smsCode||this.googleCode?this.alertFlag=!1:this.alertFlag=!0),this.getApiList()},getApiList:function(){var e={page:this.page,pageSize:this.pageSize};this.$store.dispatch("myApiList",e)},handMouseenters:function(e){"secretKey"===e?this.secretKeyShow=!1:this.apiKeyShow=!1},handMouseleaves:function(e){"secretKey"===e?this.secretKeyShow=!0:this.apiKeyShow=!0},handMouseenter:function(e){e.target.classList.add("b-4-cl"),e.target.classList.remove("b-2-cl")},handMouseleave:function(e){e.target.classList.add("b-2-cl"),e.target.classList.remove("b-4-cl")},alertClose:function(){this.$router.push("/personal/UserManagement")},alertGo:function(){this.$router.push("/personal/UserManagement")},codeFlag:function(e){return this.$store.state.regExp.verification.test(e)},ipFlag:function(e){return new RegExp(this.$store.state.regExp.ip,"g").test(e)},numbers:function(e){return this.$store.state.regExp.numbers.test(e)},pagechange:function(e){this.page=e;var t={page:e,pageSize:this.pageSize};this.$store.dispatch("myApiList",t)},processData:function(e){var t=this;null!==e&&(this.apiList=e.map((function(e){return{id:{token:e.token,ip:e.believeIps,label:e.label},data:[e.label,e.believeIps,e.token,[{type:"button",text:t.$t("personal.tool.view"),iconClass:[""],eventType:"check",classes:[""]}],[{type:"button",text:t.$t("personal.tool.modify"),iconClass:[""],eventType:"modify",classes:[""]},{type:"button",text:t.$t("personal.tool.delete"),iconClass:[""],eventType:"delete",classes:[""]}]]}})))},deleteData:function(e,t){switch(e){case"delete":this.delete&&(this.$store.dispatch("deleteOpenApi",{token:t.token}),this.delete=!1);break;case"check":this.$store.dispatch("setApiToken",t.token),this.$router.push("/personal/checkApi");break;case"modify":this.$store.dispatch("setApiToken",t.token),this.$store.dispatch("setIp",t.ip),this.$store.dispatch("setLabel",t.label),this.$store.dispatch("setModifyApiShow",!0);break;default:}},copyClick:function(e){"apiKey"===e?this.copy(this.apiKey):this.copy(this.secretKey)},copy:function(e){function t(t){t.clipboardData.setData("text/plain",e),t.preventDefault()}document.addEventListener("copy",t),document.execCommand("copy"),document.removeEventListener("copy",t)},dialogClose:function(){this.dialogConfirmFlag=!1,this.dialogFlag=!1,this.checkValue=this.oldName,this.checkValue1="",this.checkValue2="",this.checkValue3="",this.checkValue4="",this.disabled=!0,this.$bus.$emit("getCode-clear","phone")},dialogConfirm:function(){this.dialogConfirmFlag=!1,this.dialogFlag=!1,this.checkValue=this.oldName,this.checkValue1="",this.checkValue2="",this.checkValue3="",this.checkValue4="",this.disabled=!0,this.$bus.$emit("getCode-clear","phone")},currentType:function(e){this.columns2=[{title:"".concat(this.$t("personal.APImanagement.columnsApi")[0]," ").concat(this.apiUrl[e.index]),align:"left",width:"470px",classes:""},{title:this.$t("personal.APImanagement.columnsApi")[1],align:"left",width:"470px"}],this.currentTab=e.index},dealIp:function(e){var t=this,s=!0;if(-1!==e.indexOf(","))if(","===e.charAt(e.length-1)){var a=e.substring(0,e.length-1).split(","),i=a.length;i<=5?a.forEach((function(e){s=!!t.ipFlag(e)})):s=!1}else{var n=e.split(","),r=n.length;r<=5?n.forEach((function(e){s=!!t.ipFlag(e)})):s=!1}else s=this.ipFlag(e);return s},inputChanges:function(e,t){switch(t){case"ip":this.checkValue1=e,e?this.dealIp(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0:this.checkErrorFlag1=!1;break;case"note":this.checkValue2=e,this.checkValue2?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0;break;case"phoneCode":this.checkValue3=e,this.codeFlag(e)?this.checkErrorFlag3=!1:this.checkErrorFlag3=!0;break;default:this.checkValue4=e,this.codeFlag(e)?this.checkErrorFlag4=!1:this.checkErrorFlag4=!0}!this.checkValue2||this.checkErrorFlag3||this.checkErrorFlag4||this.checkErrorFlag1||this.checkErrorFlag2?this.disabled=!0:(this.smsCode&&(this.disabled=!this.checkValue3),this.googleCode&&(this.disabled=!this.checkValue4),this.smsCode&&this.googleCode&&(this.disabled=!(this.checkValue3&&this.checkValue4)))},getCodeClick:function(e,t){this.$bus.$emit("getCode-start","phone");var s={operationType:16,smsType:t&&"voiceSms"===t?"1":"0"};this.$store.dispatch("sendSmsCode",s)},btnLink:function(){this.loading2=!0;var e={believeIps:this.checkValue1,label:this.checkValue2,smsValidCode:"sms"===this.smsType&&this.checkValue3?this.checkValue3:void 0,voiceSmsCode:"voiceSms"===this.smsType&&this.checkValue3?this.checkValue3:void 0,googleCode:this.checkValue4};this.$store.dispatch("createOpenApi",e)}}},o=(s("0e89"),function(){var e=this,t=e._self._c;return t("div",{staticClass:"modify-api a-5-bg"},[t("p",{staticClass:"modify-api-header b-2-cl a-3-bd"},[e._v(e._s(e.$t("personal.modifyApi.title")))]),t("div",{directives:[{name:"show",rawName:"v-show",value:1===e.divShow,expression:"divShow === 1"}],staticClass:"center-inputs"},[t("c-inputLine",{attrs:{name:"ip",inputType:"text",promptText:e.promptText1,errorHave:!0,errorText:e.errorText1,errorFlag:e.checkErrorFlag1,marginTop:"0px",value:e.checkValue1},on:{onchanges:e.inputChanges}}),t("c-inputLine",{attrs:{name:"note",inputType:"text",promptText:e.promptText2,errorHave:!0,errorText:e.errorText2,errorFlag:e.checkErrorFlag2,marginTop:"0px",value:e.checkValue2},on:{onchanges:e.inputChanges}}),t("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.smsCode,expression:"smsCode"}],attrs:{maxLength:"6",name:"phoneCode",inputType:"text",promptText:e.promptText3,errorHave:!0,errorText:e.errorText3,errorFlag:e.checkErrorFlag3,marginTop:"0px",value:e.checkValue3},on:{onchanges:e.inputChanges}},[t("c-getCode",{attrs:{name:"phone",autoStart:!1,voiceOpen:e.voiceSmsOpen,buttonName:"loginGetcodeBtn"},on:{click:e.getCodeClick}})],1),t("c-inputLine",{directives:[{name:"show",rawName:"v-show",value:e.googleCode,expression:"googleCode"}],attrs:{name:"googleCode",maxLength:"6",inputType:"text",promptText:e.promptText4,errorHave:!0,errorText:e.errorText4,errorFlag:e.checkErrorFlag4,marginTop:"0px",value:e.checkValue4},on:{onchanges:e.inputChanges}}),t("c-button",{attrs:{type:"solid",big:!0,loading:e.loading,className:"",paddingW:"0px",disabled:e.disabled,marginTop:"18px",height:"40px",width:"100%"},on:{click:e.btnLink}},[e._v(e._s(e.$t("personal.tool.confirm")))])],1)])}),c=[],l={name:"checkApi",props:{getApiList:{default:function(){return[]},type:Function}},watch:{sendSmsCode:function(e){null!==e&&("success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.smsType="1"===e.type?"voiceSms":"sms"):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")))},updateOpenApi:function(e){null!==e&&(this.loading=!1,"success"===e.text?(this.$bus.$emit("tip",{text:e.msg,type:"success"}),this.$store.dispatch("resetType"),this.$store.dispatch("setModifyApiShow",!1),this.getApiList()):(this.$bus.$emit("tip",{text:e.msg,type:"error"}),this.$store.dispatch("resetType")))}},computed:{sendSmsCode:function(){return this.$store.state.personal.sendSmsCode},updateOpenApi:function(){return this.$store.state.personal.updateOpenApi},promptText1:function(){return this.$t("personal.label.ipText")},errorText1:function(){return this.$t("personal.prompt.ipErrorText")},promptText2:function(){return this.$t("personal.label.noteText")},promptText3:function(){return this.$t("personal.label.smsCodeText")},errorText3:function(){return this.$t("personal.prompt.errorCode")},promptText4:function(){return this.$t("personal.label.googleCodeText")},errorText4:function(){return this.$t("personal.prompt.errorCode")},voiceSmsOpen:function(){return this.$store.state.baseData.voiceSmsOpen}},data:function(){return{loading:!1,divShow:1,checkErrorFlag1:!1,checkValue1:"",errorText2:"",checkErrorFlag2:!1,checkValue2:"",checkErrorFlag3:!1,checkValue3:"",checkErrorFlag4:!1,checkValue4:"",disabled:!0,googleCode:!1,smsCode:!1,smsType:"sms"}},methods:{init:function(){var e=this.$store.state.baseData.userInfo;null!==e&&(this.googleCode=!!Number(e.googleStatus),this.smsCode=!!Number(e.isOpenMobileCheck));var t=this.$store.state.personal.apiIp,s=this.$store.state.personal.apiLabel;null!==t&&(this.checkValue1=t),null!==s&&(this.checkValue2=s)},dealIp:function(e){var t=this,s=!0;if(-1!==e.indexOf(","))if(","===e.charAt(e.length-1)){var a=e.substring(0,e.length-1).split(","),i=a.length;i<=5?a.forEach((function(e){s=!!t.ipFlag(e)})):s=!1}else{var n=e.split(","),r=n.length;r<=5?n.forEach((function(e){s=!!t.ipFlag(e)})):s=!1}else s=this.ipFlag(e);return s},ipFlag:function(e){var t=!1;return t=!e||new RegExp(this.$store.state.regExp.ip,"g").test(e),t},codeFlag:function(e){return this.$store.state.regExp.verification.test(e)},getCodeClick:function(e,t){this.$bus.$emit("getCode-start","phone");var s={operationType:16,smsType:t&&"voiceSms"===t?"1":"0"};this.$store.dispatch("sendSmsCode",s)},inputChanges:function(e,t){switch(t){case"ip":this.checkValue1=e,this.dealIp(e)?this.checkErrorFlag1=!1:this.checkErrorFlag1=!0;break;case"note":this.checkValue2=e;break;case"phoneCode":this.checkValue3=e,this.codeFlag(e)?this.checkErrorFlag3=!1:this.checkErrorFlag3=!0;break;default:this.checkValue4=e,this.codeFlag(e)?this.checkErrorFlag4=!1:this.checkErrorFlag4=!0}!this.checkValue2||this.checkErrorFlag1||this.checkErrorFlag3||this.checkErrorFlag4?this.disabled=!0:(this.smsCode&&(this.disabled=!this.checkValue3),this.googleCode&&(this.disabled=!this.checkValue4))},btnLink:function(){this.loading=!0;var e=this.$store.state.personal.apiToken,t={smsValidCode:"sms"===this.smsType&&this.checkValue3?this.checkValue3:void 0,voiceSmsCode:"voiceSms"===this.smsType&&this.checkValue3?this.checkValue3:void 0,googleCode:this.checkValue4,label:this.checkValue2,believeIps:this.checkValue1,token:e};this.$store.dispatch("updateOpenApi",t)}}},p=(s("bf74"),{mixins:[l],mounted:function(){this.init()}}),h=p,u=s("2877"),d=Object(u["a"])(h,o,c,!1,null,null,null),g=d.exports,m={mixins:[r],components:{ModifyApi:g},mounted:function(){this.init()}},f=m,b=(s("ef41"),Object(u["a"])(f,a,i,!1,null,"6a0723c4",null));t["default"]=b.exports},bf74:function(e,t,s){},ef41:function(e,t,s){"use strict";s("51dc")}}]);