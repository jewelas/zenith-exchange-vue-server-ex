(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f695a68"],{9036:function(t,e,i){"use strict";i.r(e);i("c5f6");var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"entityVerification verificationCenter fuz-card"},[e("div",{staticClass:"kyc-header fuz-card-title"},[e("span",[t._v(t._s(t.$t("verificationCenter.current")))]),t.regionCountry?e("span",[e("i",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.region"))+":")]),t._v("\n      "+t._s(t.regionCountry)+"\n    ")]):t._e()]),e("ul",{staticClass:"kyc-currentFeature b-1-cl"},[e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_2_h"}})]),e("span",[t._v(t._s(t.depositLimit))])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.depositLimit")))])]),e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_5_h"}})]),e("span",[t._v("\n          "+t._s(t.userLevelInfo.withdrawLimit)+"\n          "+t._s(t.userLevelInfo.withdrawSymbol)+"\n          "+t._s(t.$t("verificationCenter.daily"))+"\n        ")])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.withdrawLimit")))])]),e("li",{staticClass:"current-item"},[e("div",{staticClass:"item-status"},[e("svg",{staticClass:"icon icon-14",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-assets_3_h"}})]),e("span",[t._v(t._s(t.c2cLimit))])]),e("span",{staticClass:"item-title b-2-cl"},[t._v(t._s(t.$t("verificationCenter.p2pLimit")))])])]),e("div",{staticClass:"empty"}),e("ul",{staticClass:"kyc-level_list"},t._l(t.levelList,(function(i,s){return e("li",{key:s,staticClass:"level-item"},[e("h5",{staticClass:"level-name b-1-cl"},[t._v(t._s(i.levelName))]),e("div",{staticClass:"level-content a-3-bd"},[e("ol",{staticClass:"verification-list b-1-cl"},t._l(i.requirementList,(function(i,s){return e("li",{key:s,staticClass:"verification-item"},[t._v(t._s(i))])})),0),t.notPassReason&&2===i.btnStatus?e("div",{staticClass:"check-tip b-6-cl"},[t._v("\n          "+t._s(t.notPassReason)+"\n        ")]):t._e(),2===i.btnStatus?e("div",{staticClass:"refuse-btn u-4-cl u-4-bd"},[e("svg",{staticClass:"icon icon-12",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-v5_29"}})]),t._v("\n          "+t._s(t.$t("verificationCenter.refuse"))+"\n        ")]):t._e(),e("div",{staticClass:"status-btn"},[1===i.btnStatus?e("div",{staticClass:"complete-btn u-1-cl u-1-bd"},[e("svg",{staticClass:"icon icon-12",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-v5_30"}})]),t._v("\n            "+t._s(t.$t("verificationCenter.completed"))+"\n          ")]):e("c-v5-button",{attrs:{type:"solid",className:"user-button",width:"160px",height:"40px",disabled:4===i.btnStatus},on:{click:function(e){return t.goVerify(i)}}},[t._v("\n            "+t._s(i.btnText)+"\n          ")])],1),e("h6",{staticClass:"cryptoLimits b-1-cl"},[t._v(t._s(t.$t("enterpriseCert.rights")))]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.depositLimit")))]),1===Number(i.depositLimit)?e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(t.$t("verificationCenter.limited"))+"\n          ")]):e("dd",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.unlimited")))])]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.withdrawLimit")))]),e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(i.withdrawLimitAmount)+"\n            "+t._s(i.withdrawLimitSymbol)+"\n            "+t._s(t.$t("verificationCenter.daily"))+"\n          ")])]),e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.p2pLimit")))]),1===Number(i.c2cLimit)?e("dd",{staticClass:"b-2-cl"},[t._v("\n            "+t._s(t.$t("verificationCenter.limited"))+"\n          ")]):e("dd",{staticClass:"b-2-cl"},[t._v(t._s(t.$t("verificationCenter.unlimited")))])]),i.equityFieldStrList.length?e("dl",{staticClass:"limit-item"},[e("dt",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("verificationCenter.otherRight")))]),t._l(i.equityFieldStrList,(function(i){return e("dd",{key:i,staticClass:"b-2-cl"},[t._v("\n            "+t._s(i)+"\n          ")])}))],2):t._e()])])})),0),e("c-dialog",{attrs:{titleText:t.$t("verificationCenter.tip"),showFlag:t.dialogFlag,paddingBottom:"14px",confirmText:t.$t("verificationCenter.start")},on:{close:function(e){t.dialogFlag=!1},confirm:t.dialogConfirm}},[e("div",{staticClass:"warnTip"},[t._v("\n      "+t._s(t.$t("verificationCenter.warnTip",{type1:t.$t("enterpriseCert.title"),type2:t.$t("verificationCenter.personal")}))+"\n    ")])])],1)},n=[],r=(i("55dd"),i("6b54"),i("95d5")),a={name:"verificationCenter",data:function(){return{imgMap:r["s"],colorMap:r["b"],userLevelInfo:{},levelList:[],rejectSort:null,regionCountry:"",dialogFlag:!1,levelItem:null}},computed:{userInfo:function(){return this.$store.state.baseData.userInfo},authLevel:function(){return this.userInfo&&this.userInfo.authLevel},realAuthType:function(){return this.userInfo&&this.userInfo.realAuthType},isEnterpriseCert:function(){return 2===this.realAuthType},enterpriseOpen:function(){return this.publicInfo&&this.publicInfo.switch?Number(this.publicInfo.switch.enterprise_certification_open)||this.sumsubOpen:0},showEnterprise:function(){return this.enterpriseOpen&&(this.isEnterpriseCert||0!==this.authLevel&&1!==this.authLevel)},showPersonal:function(){return!this.enterpriseOpen||!this.isEnterpriseCert||4===this.authLevel||this.isEnterpriseCert&&2===this.authLevel||3===this.authLevel},sumsubLevelName:function(){return this.userInfo&&this.userInfo.sumsubLevelName},publicInfo:function(){return this.$store.state.baseData.publicInfo},sumsubOpen:function(){return this.publicInfo&&this.publicInfo.switch&&1===this.publicInfo.switch.companySumsubOpen},personalSumsubOpen:function(){return this.publicInfo&&this.publicInfo.switch&&1===this.publicInfo.switch.sumsub_open},hasPersonalSumsub:function(){return this.personalSumsubOpen&&!this.isEnterpriseCert&&3!==this.authLevel},showOldUser:function(){return this.sumsubOpen&&!this.sumsubLevelName?1===this.authLevel:!this.sumsubOpen},userInfoIsReady:function(){return this.$store.state.baseData.userInfoIsReady},notPassReason:function(){return this.userInfo&&this.userInfo.notPassReason},depositLimit:function(){var t=this.userLevelInfo.depositLimit;return 1===Number(t)?this.$t("verificationCenter.limited"):this.$t("verificationCenter.unlimited")},c2cLimit:function(){var t=this.userLevelInfo.c2cLimit;return 1===Number(t)?this.$t("verificationCenter.limited"):this.$t("verificationCenter.unlimited")}},watch:{userInfoIsReady:function(t){t&&this.getLevelList()}},methods:{init:function(){this.$store.dispatch("getUserInfo"),this.userInfoIsReady&&this.getLevelList()},getCompanyCertificationStatus:function(){var t=this;this.axios({url:"getCompanyCertificationStatus"}).then((function(e){var i=e.code,s=e.data;"0"===i.toString()?t.$router.push("/enterpriseCert/".concat(s.status)):t.$router.push("/enterpriseCert/1")}))},dialogConfirm:function(){var t=1===this.authLevel?1:0;this.$router.push("/personal/entitySumsub?levelName=".concat(this.levelItem.levelName,"&tab=").concat(t))},goVerify:function(t){if(this.sumsubOpen)if(this.personalSumsubOpen&&3===this.authLevel)this.levelItem=t,this.dialogFlag=!0;else{var e=1===this.authLevel?1:0;this.$router.push("/personal/entitySumsub?levelName=".concat(t.levelName,"&tab=").concat(e))}else 4===this.authLevel?this.getCompanyCertificationStatus():1===this.authLevel?this.$router.push("/enterpriseCertResult"):this.$router.push("/enterpriseCert/1")},getLevelList:function(){var t=this;this.axios({url:"sumsub/v2/get_level_list",params:{type:"1"}}).then((function(e){"0"===e.code.toString()?(t.rejectSort=null,t.setLevelList(e.data)):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},setLevelList:function(t){var e=this,i=t.userInfoList,s=t.list,n=t.currentWithdrawLimit;i&&i.length&&(this.regionCountry=i[0].country),this.userLevelInfo=n,s&&s.length&&(this.showOldUser?this.levelList=s.map((function(t,s){var n=t;return n.requirementList=t.requirementsReferenceStrList,n.btnStatus=e.fixStatus(s,i),n.btnText=e.fixBtn(n),n})):(s.sort((function(t,e){return t.sort-e.sort})),this.levelList=s.map((function(t,s){var n=t;return n.requirementList=t.requirementsReferenceStrList,n.btnStatus=e.fixStatus(s,i),n.btnText=e.fixBtn(n),n}))))},fixStatus:function(t,e){if(!this.showEnterprise)return 4;if(this.hasPersonalSumsub)return 4;if(this.showOldUser)return 4===this.authLevel?5:this.authLevel;if(3===this.authLevel&&0===t)return 3;if(3===this.authLevel&&t>0)return 4;if(e&&e.length){var i=e[t];return i?2===i.reviewStatus?(this.rejectSort=t,2):0===i.reviewStatus?(this.rejectSort=t,0):1:null!==this.rejectSort?4:3}return 2===this.authLevel&&0===t||4===this.authLevel&&0===t?3:4},fixBtn:function(t){return 2===t.btnStatus?this.$t("verificationCenter.again"):0===t.btnStatus?this.$t("verificationCenter.pending"):5===t.btnStatus?this.$t("verificationCenter.continue"):this.$t("verificationCenter.start")}}},u=(i("d70a"),{mixins:[a],mounted:function(){this.init()}}),l=u,c=i("2877"),o=Object(c["a"])(l,s,n,!1,null,null,null);e["default"]=o.exports},d70a:function(t,e,i){}}]);