(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e154304"],{"09e5":function(t,e,r){"use strict";r("8e6e"),r("a481");var o=r("bd86"),n=(r("456d"),r("28a5"),r("ac6a"),r("95d5"));function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){Object(o["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}e["a"]={data:function(){return{countryKeyCode:"",country:""}},watch:{countryObj:{handler:function(){var t=this.defaultCountryCode;this.countryListMoy&&this.countryListMoy.length&&!t&&(t=this.countryListMoy[0].keyCode),t&&""===this.countryKeyCode&&(this.countryKeyCode=t),!this.defaultCountryCodeReal&&!this.country&&t&&this.countryMap&&this.countryMap[t]&&(this.country=this.countryMap[t].code),this.defaultCountryCodeReal&&""===this.country&&(this.country=this.defaultCountryCodeReal)}},defaultCountryCodeReal:{handler:function(t){t&&""===this.country&&(this.country=t)},immediate:!0},defaultCountryCode:{handler:function(t){var e=t;this.countryListMoy&&this.countryListMoy.length&&!t&&(e=this.countryListMoy[0].keyCode),e&&""===this.countryKeyCode&&(this.defaultCountryCodeReal?this.countryKeyCode=this.countryListKeyObj[this.defaultCountryCodeReal].keyCode:this.countryKeyCode=e),!this.defaultCountryCodeReal&&!this.country&&e&&this.countryMap&&this.countryMap[e]&&(this.country=this.countryMap[e].code)},immediate:!0}},computed:{countryListKeyObj:function(){var t={};return this.countryObj.list.forEach((function(e){t[e.code]={code:e.code,keyCode:e.keyCode,value:e.value.split(" ")[0]}})),t},limitCountryList:function(){return this.$store.state.baseData.limitCountryList},countryList:function(){return this.countryObj.list},registerCountryList:function(){return this.filterCountryObj&&this.filterCountryObj.list?this.filterCountryObj.list:[]},countryListMoy:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.code,keyCode:e.keyCode,value:e.value.split(" +")[0]})})),t},filterCountryObj:function(){var t=this.$t("phoneCode"),e={},r=this.limitCountryList;return r.length>0?(r=r.join("").split("+"),Object.keys(t).forEach((function(o){e[o]=t[o].filter((function(t){var e=t.split("+");return-1===r.indexOf(e[2])}))}))):e=s({},t),Object(n["o"])(e)},countryNameList:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.value.split(" +")[0],value:e.value.split(" +")[0]})})),t},countryCodeList:function(){var t=[];return this.countryObj&&this.countryObj.list&&this.countryObj.list.forEach((function(e){t.push({code:e.keyCode,value:e.keyCode})})),t},countryFilterCodeList:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.keyCode,value:e.keyCode})})),t},countryMap:function(){return this.countryObj.countryMap},countryRealMap:function(){return this.countryObj.countryRealMap},countryObj:function(){return this.$store.state.baseData.countryObj},defaultCountryCode:function(){var t=this.$store.state.baseData.defaultCountryCode,e=this.limitCountryList;if(e.length>0&&t){var r=e.join("").split("+"),o=t.replace("+","");r.indexOf(o)>-1&&(t="")}return t},defaultCountryCodeReal:function(){var t=this.$store.state.baseData.defaultCountryCodeReal,e=this.limitCountryList;if(e.length>0){var r=e.join("").split("+"),o=t.replace(/\+/g,"");r.indexOf(o)>-1&&(t="")}return t}},methods:{countryChange:function(t){this.country=t.code,this.countryKeyCode=t.keyCode}}}},9547:function(t,e,r){},9927:function(t,e,r){"use strict";r.r(e);var o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bind-phone fuz-card"},[e("p",{staticClass:"user-management-child-header fuz-card-title"},[t._v(t._s(t.$t("personal.bindPhone.title")))]),e("div",{staticClass:"user-management-center"},[e("div",{staticClass:"center-input"},[e("c-select",{attrs:{value:t.country,promptText:t.promptText,name:"country",errorHave:!0,errorFlag:t.countryErrorFlag,errorText:t.errorText,options:t.countryList,filterable:!0},on:{onChanges:t.countryChange}}),e("c-inputLine",{attrs:{name:"phone",maxLength:"20",inputType:"text",promptText:t.promptText1,errorHave:!0,errorText:t.errorText1,errorFlag:t.checkErrorFlag1,marginTop:"0px",value:t.checkValue1},on:{onchanges:t.inputChanges}}),e("c-inputLine",{attrs:{name:"phoneCode",maxLength:"6",inputType:"text",promptText:t.promptText2,errorHave:!0,errorText:t.errorText2,errorFlag:t.checkErrorFlag2,marginTop:"0px",value:t.checkValue2},on:{onchanges:t.inputChanges}},[e("c-getCode",{attrs:{name:"phone",autoStart:!1,voiceOpen:t.voiceSmsOpen,buttonName:"loginGetcodeBtn"},on:{click:t.getCodeClick}})],1),t.googleCode?e("c-inputLine",{attrs:{maxLength:"6",name:"googleCode",inputType:"text",promptText:t.promptText3,errorHave:!0,errorText:t.errorText3,errorFlag:t.checkErrorFlag3,marginTop:"0px",value:t.checkValue3},on:{onchanges:t.inputChanges}}):t._e(),e("c-button",{attrs:{type:"solid",big:!0,loading:t.loading,className:"fuz-primary-btn",paddingW:"0px",disabled:t.disabled,marginTop:"18px",height:"40px",width:"100%"},on:{click:t.btnLink}},[t._v(t._s(this.$t("personal.tool.bind")))])],1)]),e("c-dialog",{attrs:{showFlag:t.dialogFlag,titleText:t.$t("registerOptions.title"),haveOption:!0,confirmText:t.$t("registerOptions.conf"),closeText:t.$t("registerOptions.close")},on:{close:t.dialogClose,confirm:t.dialogConfirm}},[e("div",{staticClass:"bindPhone-warn"},[t._v("\n      "+t._s(t.$t("registerOptions.text")))])])],1)},n=[],i=(r("c5f6"),r("95d5")),s=r("09e5"),a={name:"bindPhone",mixins:[s["a"]],watch:{errorText1_val:function(t){t&&(this.errorText1=t)},sendSmsCode:function(t){null!==t&&("success"===t.text?(this.$bus.$emit("tip",{text:t.msg,type:"success"}),this.$store.dispatch("resetType"),this.smsType="1"===t.type?"voiceSms":"sms"):(this.$bus.$emit("tip",{text:t.msg,type:"error"}),this.$store.dispatch("resetType"),this.$bus.$emit("getCode-clear","phone")))},nowUserRegType:{immediate:!0,handler:function(){this.dialogSet()}},userInfo:{immediate:!0,handler:function(t){t&&(this.googleCode=!!Number(t.googleStatus),this.googleReady=!0,this.dialogSet())}},mobileBindSave:function(t){null!==t&&(this.loading=!1,"success"===t.text?(this.$bus.$emit("tip",{text:t.msg,type:"success"}),this.$store.dispatch("resetType"),this.$router.push("/personal/userManagement")):(this.$bus.$emit("tip",{text:t.msg,type:"error"}),this.$store.dispatch("resetType"),"10009"!==t.code&&this.$bus.$emit("getCode-clear","phone")))}},computed:{promptText:function(){return this.$t("personal.label.promptText")},errorText:function(){return this.$t("personal.label.errorText")},promptText1:function(){return this.$t("personal.label.phone")},promptText2:function(){return this.$t("personal.label.smsCodeText")},promptText3:function(){return this.$t("personal.label.googleCodeText")},errorText2:function(){return this.$t("personal.prompt.errorCode")},errorText3:function(){return this.$t("personal.prompt.errorCode")},errorText1_val:function(){return this.$t("personal.prompt.errorPhone")},userInfo:function(){return this.$store.state.baseData.userInfo},sendSmsCode:function(){return this.$store.state.personal.sendSmsCode},mobileBindSave:function(){return this.$store.state.personal.mobileBindSave},userRegType:function(){var t=this.$store.state.baseData.publicInfo,e="{}";return t&&t.switch&&t.switch.user_reg_type&&(e=t.switch.user_reg_type),JSON.parse(e)},nowUserRegType:function(){var t=Object(i["n"])("lan"),e=[1,2];return this.userRegType[t]&&(e=this.userRegType[t]),e},voiceSmsOpen:function(){return this.$store.state.baseData.voiceSmsOpen}},data:function(){return{loading:!1,checkValue1:"",checkValue2:"",checkValue3:"",errorText1:"",checkErrorFlag1:!1,checkErrorFlag2:!1,checkErrorFlag3:!1,disabled:!0,googleCode:!1,countryErrorFlag:!1,dialogFlag:!1,googleReady:!1,smsType:"sms"}},methods:{dialogSet:function(){2===this.nowUserRegType[0]&&1===this.nowUserRegType.length&&this.googleReady&&!this.googleCode&&(this.dialogFlag=!0)},dialogClose:function(){this.dialogFlag=!1},dialogConfirm:function(){this.$router.push("/personal/bindGoogle")},init:function(){this.userInfo&&(this.googleCode=!!Number(this.userInfo.googleStatus))},phoneFlag:function(t){return this.$store.state.regExp.phone.test(t)},codeFlag:function(t){return this.$store.state.regExp.verification.test(t)},getCodeClick:function(t,e){if(this.checkValue1&&!this.checkErrorFlag1){this.$bus.$emit("getCode-start","phone");var r={countryCode:this.countryKeyCode,mobile:this.checkValue1,operationType:2,smsType:e&&"voiceSms"===e?"1":"0"};this.$store.dispatch("sendSmsCode",r)}else this.checkErrorFlag1=!0,this.errorText1=this.$t("personal.prompt.errorPhoneText")},inputChanges:function(t,e){switch(e){case"phone":this.checkValue1=t,this.phoneFlag(t)?this.checkErrorFlag1=!1:(this.checkErrorFlag1=!0,this.errorText1=this.$t("personal.prompt.errorPhone"));break;case"phoneCode":this.checkValue2=t,this.codeFlag(t)?this.checkErrorFlag2=!1:this.checkErrorFlag2=!0;break;default:this.checkValue3=t,this.codeFlag(t)?this.checkErrorFlag3=!1:this.checkErrorFlag3=!0}!this.checkValue1||!this.checkValue2||this.checkErrorFlag1||this.checkErrorFlag2||this.checkErrorFlag3?this.disabled=!0:this.googleCode?this.checkValue3&&(this.disabled=!this.checkValue3):this.disabled=!1},btnLink:function(){this.loading=!0;var t={countryCode:this.countryKeyCode,mobileNumber:this.checkValue1,googleCode:this.checkValue3,smsAuthCode:"sms"===this.smsType&&this.checkValue2?this.checkValue2:void 0,voiceSmsCode:"voiceSms"===this.smsType&&this.checkValue2?this.checkValue2:void 0};this.$store.dispatch("mobileBindSave",t)}}},c=(r("9547"),{mixins:[a],mounted:function(){this.init()}}),u=c,h=r("2877"),l=Object(h["a"])(u,o,n,!1,null,null,null);e["default"]=l.exports}}]);