(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a43e825e"],{"09e5":function(t,e,i){"use strict";i("8e6e"),i("a481");var s=i("bd86"),n=(i("456d"),i("28a5"),i("ac6a"),i("95d5"));function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){Object(s["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}e["a"]={data:function(){return{countryKeyCode:"",country:""}},watch:{countryObj:{handler:function(){var t=this.defaultCountryCode;this.countryListMoy&&this.countryListMoy.length&&!t&&(t=this.countryListMoy[0].keyCode),t&&""===this.countryKeyCode&&(this.countryKeyCode=t),!this.defaultCountryCodeReal&&!this.country&&t&&this.countryMap&&this.countryMap[t]&&(this.country=this.countryMap[t].code),this.defaultCountryCodeReal&&""===this.country&&(this.country=this.defaultCountryCodeReal)}},defaultCountryCodeReal:{handler:function(t){t&&""===this.country&&(this.country=t)},immediate:!0},defaultCountryCode:{handler:function(t){var e=t;this.countryListMoy&&this.countryListMoy.length&&!t&&(e=this.countryListMoy[0].keyCode),e&&""===this.countryKeyCode&&(this.defaultCountryCodeReal?this.countryKeyCode=this.countryListKeyObj[this.defaultCountryCodeReal].keyCode:this.countryKeyCode=e),!this.defaultCountryCodeReal&&!this.country&&e&&this.countryMap&&this.countryMap[e]&&(this.country=this.countryMap[e].code)},immediate:!0}},computed:{countryListKeyObj:function(){var t={};return this.countryObj.list.forEach((function(e){t[e.code]={code:e.code,keyCode:e.keyCode,value:e.value.split(" ")[0]}})),t},limitCountryList:function(){return this.$store.state.baseData.limitCountryList},countryList:function(){return this.countryObj.list},registerCountryList:function(){return this.filterCountryObj&&this.filterCountryObj.list?this.filterCountryObj.list:[]},countryListMoy:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.code,keyCode:e.keyCode,value:e.value.split(" +")[0]})})),t},filterCountryObj:function(){var t=this.$t("phoneCode"),e={},i=this.limitCountryList;return i.length>0?(i=i.join("").split("+"),Object.keys(t).forEach((function(s){e[s]=t[s].filter((function(t){var e=t.split("+");return-1===i.indexOf(e[2])}))}))):e=o({},t),Object(n["o"])(e)},countryNameList:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.value.split(" +")[0],value:e.value.split(" +")[0]})})),t},countryCodeList:function(){var t=[];return this.countryObj&&this.countryObj.list&&this.countryObj.list.forEach((function(e){t.push({code:e.keyCode,value:e.keyCode})})),t},countryFilterCodeList:function(){var t=[],e=this.filterCountryObj.list;return e&&e.length&&e.forEach((function(e){t.push({code:e.keyCode,value:e.keyCode})})),t},countryMap:function(){return this.countryObj.countryMap},countryRealMap:function(){return this.countryObj.countryRealMap},countryObj:function(){return this.$store.state.baseData.countryObj},defaultCountryCode:function(){var t=this.$store.state.baseData.defaultCountryCode,e=this.limitCountryList;if(e.length>0&&t){var i=e.join("").split("+"),s=t.replace("+","");i.indexOf(s)>-1&&(t="")}return t},defaultCountryCodeReal:function(){var t=this.$store.state.baseData.defaultCountryCodeReal,e=this.limitCountryList;if(e.length>0){var i=e.join("").split("+"),s=t.replace(/\+/g,"");i.indexOf(s)>-1&&(t="")}return t}},methods:{countryChange:function(t){this.country=t.code,this.countryKeyCode=t.keyCode}}}},"11c3":function(t,e,i){},6227:function(t,e,i){"use strict";i.r(e);i("c5f6");var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"verificationCenter fuz-card with-title"},[e("div",{staticClass:"kyc-header fuz-card-title"},[e("span",[t._v(t._s(t.$t("verificationCenter.current")))]),t.regionCountry?e("span",[e("i",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.region"))+":")]),t._v("\n      "+t._s(t.regionCountry)+"\n    ")]):t._e()]),e("ul",{staticClass:"kyc-currentFeature b-1-cl"},[e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_2_h"}})]),e("span",[t._v(t._s(t.depositLimit))])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.depositLimit")))])]),e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_5_h"}})]),e("span",[t._v("\n          "+t._s(t.userLevelInfo.withdrawLimit)+"\n          "+t._s(t.userLevelInfo.withdrawSymbol)+"\n          "+t._s(t.$t("verificationCenter.daily"))+"\n        ")])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.withdrawLimit")))])]),e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_3_h"}})]),e("span",[t._v(t._s(t.c2cLimit))])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.p2pLimit")))])])]),e("div",{staticClass:"empty"}),e("ul",{staticClass:"kyc-level_list"},t._l(t.levelList,(function(i,s){return e("li",{key:s,staticClass:"level-item"},[e("h5",{staticClass:"level-name b-1-cl"},[t._v(t._s(i.levelName))]),e("div",{staticClass:"level-content a-3-bd"},[e("ol",{staticClass:"verification-list b-1-cl"},t._l(i.requirementList,(function(i,s){return e("li",{key:s,staticClass:"verification-item"},[t._v(t._s(i))])})),0),t.notPassReason&&2===i.btnStatus?e("div",{staticClass:"check-tip b-6-cl"},[t._v("\n          "+t._s(t.notPassReason)+"\n        ")]):t._e(),2===i.btnStatus?e("div",{staticClass:"refuse-btn u-4-cl u-4-bd"},[e("svg",{staticClass:"icon icon-12",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-v5_29"}})]),t._v("\n          "+t._s(t.$t("verificationCenter.refuse"))+"\n        ")]):t._e(),e("div",{staticClass:"status-btn"},[1===i.btnStatus?e("div",{staticClass:"complete-btn u-1-cl u-1-bd"},[e("svg",{staticClass:"icon icon-12",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-v5_30"}})]),t._v("\n            "+t._s(t.$t("verificationCenter.completed"))+"\n          ")]):e("c-v5-button",{attrs:{type:"solid",className:"user-button",width:"160px",height:"40px",disabled:4===i.btnStatus},on:{click:function(e){return t.goVerify(i)}}},[t._v("\n            "+t._s(i.btnText)+"\n          ")])],1),e("h6",{staticClass:"cryptoLimits b-1-cl"},[t._v(t._s(t.$t("verificationCenter.cryptoLimits")))]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.depositLimit")))]),1===Number(i.depositLimit)?e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(t.$t("verificationCenter.limited"))+"\n          ")]):e("dd",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.unlimited")))])]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.withdrawLimit")))]),e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(i.withdrawLimitAmount)+"\n            "+t._s(i.withdrawLimitSymbol)+"\n            "+t._s(t.$t("verificationCenter.daily"))+"\n          ")])]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.p2pLimit")))]),1===Number(i.c2cLimit)?e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(t.$t("verificationCenter.limited"))+"\n          ")]):e("dd",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.unlimited")))])])])])})),0),e("c-dialog",{staticClass:"idAuthDialog",attrs:{showFlag:t.kycPhoneFlag,paddingBottom:"220px",titleText:t.$t("personal.idAuth.title"),confirmLoading:t.kycLoading},on:{close:t.kycPhoneClose,confirm:t.kycPhoneConfirm}},[e("c-select",{attrs:{value:t.country,promptText:t.$t("personal.kyc.area"),name:"certificateType",imgMap:t.imgMap,errorHave:!0,options:t.countryListMoy,filterable:!0},on:{onChanges:t.countryChange}})],1),e("c-dialog",{attrs:{titleText:t.$t("verificationCenter.tip"),showFlag:t.dialogFlag,paddingBottom:"14px",confirmText:t.$t("verificationCenter.start")},on:{close:function(e){t.dialogFlag=!1},confirm:t.dialogConfirm}},[e("div",{staticClass:"warnTip"},[t._v("\n      "+t._s(t.$t("verificationCenter.warnTip",{type1:t.$t("verificationCenter.personal"),type2:t.$t("enterpriseCert.title")}))+"\n    ")])])],1)},n=[],r=(i("28a5"),i("55dd"),i("6b54"),i("95d5")),o=i("09e5"),a={name:"verificationCenter",mixins:[o["a"]],data:function(){return{imgMap:r["s"],colorMap:r["b"],userLevelInfo:{},levelList:[],rejectSort:null,kycPhoneFlag:!1,country:"",kycLoading:!1,regionCountry:"",dialogFlag:!1,levelItem:null}},computed:{userInfo:function(){return this.$store.state.baseData.userInfo},interfaceSwitch:function(){return this.$store.state.baseData.interfaceSwitch},authLevel:function(){return this.userInfo&&this.userInfo.authLevel},realAuthType:function(){return this.userInfo&&this.userInfo.realAuthType},isEnterpriseCert:function(){return 2===this.realAuthType},enterpriseOpen:function(){return this.publicInfo&&this.publicInfo.switch?Number(this.publicInfo.switch.enterprise_certification_open)||this.companySumsubOpen:0},showEnterprise:function(){return this.enterpriseOpen&&(this.isEnterpriseCert||0!==this.authLevel&&1!==this.authLevel)},showPersonal:function(){return!this.enterpriseOpen||!this.isEnterpriseCert||4===this.authLevel||this.isEnterpriseCert&&2===this.authLevel||3===this.authLevel},hasEenterpriseSumsub:function(){return this.isEnterpriseCert&&this.companySumsubOpen&&4!==this.authLevel},sumsubLevelName:function(){return this.userInfo&&this.userInfo.sumsubLevelName},publicInfo:function(){return this.$store.state.baseData.publicInfo},sumsubOpen:function(){return this.publicInfo&&this.publicInfo.switch&&1===this.publicInfo.switch.sumsub_open},companySumsubOpen:function(){return this.publicInfo&&this.publicInfo.switch&&1===this.publicInfo.switch.companySumsubOpen},showOldUser:function(){return this.sumsubOpen&&!this.sumsubLevelName?1===this.authLevel:!this.sumsubOpen},userInfoIsReady:function(){return this.$store.state.baseData.userInfoIsReady},notPassReason:function(){return this.userInfo&&this.userInfo.notPassReason},depositLimit:function(){var t=this.userLevelInfo.depositLimit;return 1===Number(t)?this.$t("verificationCenter.limited"):this.$t("verificationCenter.unlimited")},c2cLimit:function(){var t=this.userLevelInfo.c2cLimit;return 1===Number(t)?this.$t("verificationCenter.limited"):this.$t("verificationCenter.unlimited")}},watch:{userInfoIsReady:function(t){t&&this.getLevelList()},defaultCountryCode:function(t){t&&""===this.country&&(this.country=t)}},methods:{init:function(){this.$store.dispatch("getUserInfo"),this.userInfoIsReady&&this.getLevelList()},dialogConfirm:function(){var t=1===this.authLevel?1:0;this.$router.push("/personal/sumsub?levelName=".concat(this.levelItem.levelName,"&tab=").concat(t))},goVerify:function(t){if(this.sumsubOpen)if(this.companySumsubOpen&&3===this.authLevel)this.levelItem=t,this.dialogFlag=!0;else{var e=1===this.authLevel?1:0;this.$router.push("/personal/sumsub?levelName=".concat(t.levelName,"&tab=").concat(e))}else 0===this.authLevel?this.$router.push("/personal/idAuth"):2!==this.authLevel&&3!==this.authLevel||(this.kycPhoneFlag=!0)},getLevelList:function(){var t=this;this.axios({url:"sumsub/v2/get_level_list",params:{type:"0"}}).then((function(e){"0"===e.code.toString()?(t.rejectSort=null,t.setLevelList(e.data)):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},setLevelList:function(t){var e=this,i=t.userInfoList,s=t.list,n=t.currentWithdrawLimit;i&&i.length&&(this.regionCountry=i[0].country),this.userLevelInfo=n,s&&s.length&&(this.showOldUser?this.levelList=s.map((function(t,s){var n=t;return n.requirementList=t.requirementsReferenceStrList,n.btnStatus=e.fixStatus(s,i),n.btnText=e.fixBtn(n),n})):(s.sort((function(t,e){return t.sort-e.sort})),this.levelList=s.map((function(t,s){var n=t;return n.requirementList=t.requirementsReferenceStrList,n.btnStatus=e.fixStatus(s,i),n.btnText=e.fixBtn(n),n}))))},fixStatus:function(t,e){if(!this.showPersonal)return 4;if(this.hasEenterpriseSumsub)return 4;if(this.showOldUser)return this.authLevel;if(3===this.authLevel&&0===t)return 3;if(3===this.authLevel&&t>0)return 4;if(e&&e.length){var i=e[t];return i?2===i.reviewStatus?(this.rejectSort=t,2):0===i.reviewStatus?(this.rejectSort=t,0):1:null!==this.rejectSort?4:3}return 2===this.authLevel&&0===t||4===this.authLevel&&0===t?3:4},fixBtn:function(t){return 2===t.btnStatus?this.$t("verificationCenter.again"):0===t.btnStatus?this.$t("verificationCenter.pending"):this.$t("verificationCenter.start")},kycPhoneClose:function(){this.kycPhoneFlag=!1,this.country=this.defaultCountryCodeReal?this.defaultCountryCodeReal:this.countryMap[this.defaultCountryCode].code,this.countryKeyCode=this.defaultCountryCode?this.defaultCountryCode:""},kycPhoneConfirm:function(){var t=this,e=this.publicInfo.custom_config,i=null,s=null;if(e){try{s=JSON.parse(e)}catch(o){}i=s?s.kyc_singapore_open:null}if(this.interfaceSwitch&&"+156"===this.country)this.axios({url:"/kyc/Api/get_Valid_QRcode"}).then((function(e){if(t.kycLoading=!1,"0"===e.code.toString()){var s=e.data,n=s.openAuto,r=s.limitFlag;n&&"0"===n.toString()||r&&"1"===r.toString()?i&&"0"!==i?t.$store.dispatch("exccKycConfig",{}):t.$router.push("/personal/idAuth?country=156&countryKeyCode=86"):t.$router.push("/personal/faceAuth?country=156&countryKeyCode=86")}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}));else{if(i&&"0"!==i)this.$store.dispatch("exccKycConfig",{});else if(this.cropPassSwitch)this.$store.dispatch("exccCropConfig",{});else{var n=this.country.split("+")[1],r=this.countryKeyCode.split("+")[1];this.$router.push("/personal/idAuth?country=".concat(n,"&countryKeyCode=").concat(r))}this.kycLoading=!1}}}},u=(i("11c3"),{mixins:[a],mounted:function(){this.init()}}),c=u,l=i("2877"),h=Object(l["a"])(c,s,n,!1,null,null,null);e["default"]=h.exports}}]);