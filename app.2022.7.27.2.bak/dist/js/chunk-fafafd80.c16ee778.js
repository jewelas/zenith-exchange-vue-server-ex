(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fafafd80","chunk-4f8156fb"],{"017a":function(t,e,c){"use strict";c.r(e);var i=function(){var t=this,e=t._self._c;return e("section",{staticClass:"common-keyAuth"},[e("p",{staticClass:"user-management-child-header b-1-cl a-3-bd"},[t._v(t._s(t.$t("personal.idAuth.title")))]),t.loading?e("div",{staticClass:"keyAuth-loadingBox"},[e("c-loading",{attrs:{size:"60"}})],1):e("div",{staticClass:"keyAuth-body"},[e("div",{staticClass:"keyAuth-body-title b-1-cl"},[t._v(t._s(t.$t("personal.kyc.kycAuth1")))]),e("div",{staticClass:"keyAuth-body-text"},[t._v(t._s(t.$t("personal.kyc.kycAuth2")))]),e("div",{staticClass:"keyAuth-body-img b-1-bg"},[e("img",{attrs:{src:t.qrCode,alt:""}})]),t.timeReload?e("div",{staticClass:"keyAuth-body-time b-6-cl"},[t._v(t._s(t.$t("personal.kyc.kycAuth4")))]):e("div",{staticClass:"keyAuth-body-time"},[t._v("\n      "+t._s(t.$t("personal.kyc.kycAuth3"))+"："+t._s(t.showTime))]),e("c-button",{attrs:{height:"40px",width:"100%",loading:t.statusLoading},on:{click:t.getStatus}},[t._v(t._s(t.$t("personal.kyc.kycAuth5")))]),t.forceAuto?e("c-button",{attrs:{marginTop:"10px",type:"text"},on:{click:t.goIDauth}},[t._v(t._s(t.$t("personal.kyc.kycAuth6")))]):t._e()],1),e("kycAuthselect",{attrs:{countryVal:"156",countryKeyCodeVal:"86"}})],1)},s=[],a=(c("6b54"),{name:"common-keyAuth",data:function(){return{loading:!0,qrCode:"",time:0,timeReload:!1,statusLoading:!1,forceAuto:!1,goIDauthLoading:!1}},computed:{publicInfo:function(){return this.$store.state.baseData.publicInfo},showTime:function(){if(this.time){var t=Math.floor(this.time/60),e=this.time-60*t,c="";return t&&(c+="".concat(t).concat(this.$t("personal.kyc.kycMin"))),c+="".concat(e).concat(this.$t("personal.kyc.kycSec")),c}return""}},methods:{init:function(){this.getData()},getData:function(){var t=this;this.axios({url:"/kyc/Api/get_Valid_QRcode"}).then((function(e){"0"===e.code.toString()?(t.loading=!1,t.setData(e.data)):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},goIDauth:function(){var t=this;if(!this.goIDauthLoading){this.goIDauthLoading=!0;var e=this.publicInfo.custom_config,c=null,i=null;if(e){try{i=JSON.parse(e)}catch(s){}c=i?i.kyc_singapore_open:null}this.axios({url:"/kyc/Api/get_Valid_QRcode"}).then((function(e){t.goIDauthLoading=!1,"0"===e.code.toString()?"1"===e.data.authStatus?(t.$bus.$emit("tip",{text:t.$t("personal.kyc.kycAuth7"),type:"warning"}),t.$router.push("/personal/userManagement")):c&&"0"!==c?t.$store.dispatch("exccKycConfig",{}):t.$router.push("/personal/idAuth?kycPhone=86"):t.$bus.$emit("tip",{text:e.msg,type:"error"})}))}},getStatus:function(){var t=this;this.statusLoading=!0,this.axios({url:"/kyc/Api/get_Database_Authentication_result"}).then((function(e){if(t.statusLoading=!1,"0"===e.code.toString()){var c=e.data.authStatus;c&&"1"===c.toString()?(t.$bus.$emit("tip",{text:t.$t("personal.kyc.kycAuth7"),type:"warning"}),t.$router.push("/personal/userManagement")):t.$bus.$emit("tip",{text:t.$t("personal.kyc.kycAuth8"),type:"warning"})}else t.$bus.$emit("tip",{text:e.msg,type:"error"})}))},setData:function(t){var e=this,c=t.openAuto,i=t.limitFlag,s=t.authStatus,a=t.qrCode,o=t.validSecond,n=t.forceAuto;if(c&&"0"===c.toString()||i&&"1"===i.toString())return this.$bus.$emit("tip",{text:this.$t("personal.kyc.kycAuth9"),type:"warning"}),void this.$store.dispatch("exccKycConfig",{});if(s&&"1"===s.toString())return this.$bus.$emit("tip",{text:this.$t("personal.kyc.kycAuth7"),type:"warning"}),void this.$router.push("/personal/userManagement");if(n&&"0"===n.toString()&&(this.forceAuto=!0),this.qrCode=a,o){var r=null;this.time=o,r=setInterval((function(){e.time-=1,0===e.time&&(clearInterval(r),e.timeReload=!0)}),1e3)}}}}),o=(c("418f"),c("4085")),n={mixins:[a],components:{kycAuthselect:o["default"]},mounted:function(){this.init()}},r=n,u=c("2877"),l=Object(u["a"])(r,i,s,!1,null,null,null);e["default"]=l.exports},"0515":function(t,e,c){t.exports=c.p+"img/exccAuthType1.608c46fc.png"},4085:function(t,e,c){"use strict";c.r(e);var i=function(){var t=this,e=t._self._c;return e("div",[e("c-dialog",{attrs:{showFlag:t.kycExccFlag,paddingBottom:"14px",titleText:t.$t("personal.exccAuth.text2"),confirmLoading:t.kycLoading},on:{close:t.kycExccClose,confirm:t.kycExccConfirm}},[e("div",{staticClass:"select-box"},[e("div",{staticClass:"select-block a-4-bg",on:{click:function(e){return t.clickSlectType("1")}}},[e("c-redio",{attrs:{value:"1"===t.exccAuthType}}),e("div",{staticClass:"img"},[e("img",{staticClass:"imgExccAuthType1",attrs:{src:t.imgExccAuthType1,alt:""}})]),e("h4",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("personal.exccAuth.text3")))]),e("div",{staticClass:"text"},[e("p",[t._v(t._s(t.$t("personal.exccAuth.text5")))]),e("p",[t._v(t._s(t.$t("personal.exccAuth.text6")))])])],1),e("div",{staticClass:"select-block select-block2 a-4-bg",on:{click:function(e){return t.clickSlectType("2")}}},[e("c-redio",{attrs:{value:"2"===t.exccAuthType}}),e("div",{staticClass:"img"},[e("img",{staticClass:"imgExccAuthType2",attrs:{src:t.imgExccAuthType2,alt:""}})]),e("h4",{staticClass:"b-1-cl"},[t._v(t._s(t.$t("personal.exccAuth.text4")))]),e("div",{staticClass:"text"},[e("p",[t._v(t._s(t.$t("personal.exccAuth.text7")))]),e("p",[t._v(t._s(t.$t("personal.exccAuth.text8")))])])],1)])])],1)},s=[],a=(c("28a5"),c("95d5")),o=c("0515"),n=c.n(o),r=c("5dd0"),u=c.n(r),l=a["s"].exccAuthType1,h=a["s"].exccAuthType2,p={name:"kycAuthselect",props:{countryVal:{default:"",type:String},countryKeyCodeVal:{default:"",type:String}},data:function(){return{kycLoading:!1,imgExccAuthType1:l||n.a,imgExccAuthType2:h||u.a,kycExccFlag:!1,exccAuthType:"1",state:"KYC_AUTH"}},watch:{exccKycConfig:function(t){if(t&&t.text)if(this.kycLoading=!1,"success"===t.text){var e="idAuth";t.data&&("0"===t.data.openSingPass?("2"===t.data.verfyTemplet&&(e="exccAuthForm"),this.$router.push("/personal/".concat(e,"?country=").concat(this.countryVal,"&countryKeyCode=").concat(this.countryKeyCodeVal))):this.kycExccFlag=!0)}else this.$bus.$emit("tip",{text:t.msg,type:"error"}),this.$store.dispatch("resetType")}},computed:{exccKycConfig:function(){return this.$store.state.personal.exccKycConfig}},methods:{init:function(){var t=this.$route.path.split("/"),e=t[t.length-1];this.query=this.$route.query,this.$route.query.state===this.state&&this.$route.query.code?this.$router.push("/personal/exccAuthorization?code=".concat(this.$route.query.code)):this.$route.query.state===this.state&&this.$route.query.error?(this.$bus.$emit("tip",{text:this.$t("personal.exccAuth.errorText1"),type:"error"}),this.$router.push("/personal/userManagement?kycError=".concat(this.$route.query.error,"&state=").concat(this.state))):this.countryVal||this.countryKeyCodeVal||"kycAuth"!==e||this.$router.push("/personal/userManagement")},kycExccClose:function(){this.kycExccFlag=!1},callAuthoriseApi:function(){var t=this.exccKycConfig?this.exccKycConfig.data:null,e=t.SingPassConfig;if(e&&e.url){var c="".concat(e.url,"?client_id=").concat(e.clientId,"&attributes=").concat(e.attributes,"&purpose=").concat(e.purpose,"&state=").concat(this.state,"&redirect_uri=").concat(e.returnUrl);window.open(c)}else this.$bus.$emit("tip",{text:"接口异常，请联系管理员",type:"error"})},kycExccConfirm:function(){if("1"===this.exccAuthType){var t="idAuth";this.exccKycConfig&&this.exccKycConfig.data&&"2"===this.exccKycConfig.data.verfyTemplet&&(t="exccAuthForm"),this.$router.push("/personal/".concat(t,"?country=").concat(this.countryVal,"&countryKeyCode=").concat(this.countryKeyCodeVal))}else this.callAuthoriseApi()},clickSlectType:function(t){this.exccAuthType=t}}},y=(c("d6d4"),{mixins:[p],mounted:function(){this.init()}}),d=y,g=c("2877"),f=Object(g["a"])(d,i,s,!1,null,null,null);e["default"]=f.exports},"418f":function(t,e,c){},"5dd0":function(t,e,c){t.exports=c.p+"img/exccAuthType2.7d536b4c.png"},d6d4:function(t,e,c){}}]);