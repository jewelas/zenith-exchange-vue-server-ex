(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-edbf1420"],{"04db":function(t,e,n){},e16f:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"notice-info home-bg"},[e("div",{staticClass:"main-content"},[e("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"h5-evenMenus",on:{click:t.h5ShowMenusFn}},[e("img",{attrs:{src:"https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png",alt:""}})]),e("transition",{attrs:{name:"menus-fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.h5ShowMenus,expression:"h5ShowMenus"}],staticClass:"margin-left a-5-bg margin-left-h5"},[e("h3",{staticClass:"menu-tit f-1-cl"},[e("span",{staticClass:"h5-evenMenus-list",on:{click:t.h5ShowMenusFn}},[e("svg",{staticClass:"icon icon-16 market-show-button",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-c_7"}})])])]),e("div",{staticClass:"margin-left-h5-body"},[e("ul",{staticClass:"f-2-cl"},t._l(t.sideList,(function(n,s){return e("li",{key:s,staticClass:"menu-item",class:{"f-2-cl c-4-bg":t.contentId===n.fileName},on:{click:function(e){return t.goPage(n.fileName)}}},[t._v("\n                "+t._s(n.title)+"\n              ")])})),0)])])]),e("div",{staticClass:"menu h5-menu margin-left-pc a-5-bg"},[e("ul",{staticClass:"f-2-cl"},t._l(t.sideList,(function(n,s){return e("li",{key:s,staticClass:"menu-item",class:{"f-2-cl c-4-bg":t.contentId===n.fileName},on:{click:function(e){return t.goPage(n.fileName)}}},[t._v("\n            "+t._s(n.title)+"\n          ")])})),0)]),e("div",{staticClass:"content-box"},[e("div",{staticClass:"content-text c-4-bg"},[e("h1",{staticClass:"content-title f-1-cl"},[t._v(t._s(t.notieContent.title))]),e("p",{staticClass:"time f-2-cl"},[t._v(t._s(t.notieContent.ctime))]),e("div",{staticClass:"main-text f-2-cl",domProps:{innerHTML:t._s(t.notieContent.content)}})])])],1)])},i=[],a=n("95d5"),o={name:"noticeInfo",components:{},data:function(){return{contentId:this.$route.params.id,sideList:[],notieContent:{},sidetion:{count:"",page:1,pageSize:10},h5ShowMenus:!1}},watch:{$route:function(t){this.contentId=t.params.id,this.getfile()}},methods:{init:function(){this.getData(),this.contentId=this.$route.params.id},h5ShowMenusFn:function(){this.h5ShowMenus=!this.h5ShowMenus},goPage:function(t){var e=t.contentType,n=t.fileName,s=t.url;2===e?window.open(s):(this.h5ShowMenus=!1,this.$router.push("".concat(n)))},getData:function(){var t=this;this.axios({url:this.$store.state.url.common.footer,headers:{},params:{},method:"post"}).then((function(e){if("0"===e.code){if(t.sideList=e.data,t.$route.params.id)t.contentId=t.$route.params.id;else{for(var n=0,s=0;s<e.data.length;s+=1)if(2!==e.data[s].contentType){n=s;break}t.contentId=e.data[n].fileName,t.$router.push("/cms/".concat(e.data[0].fileName))}t.getfile()}}))},getfile:function(){var t=this;this.axios({url:this.$store.state.url.common.cmsInfo,headers:{},params:{fileName:this.contentId},method:"post"}).then((function(e){"0"===e.code&&(t.notieContent=e.data,t.notieContent.ctime=Object(a["k"])(e.data.ctimeLong))}))}}},c=(n("04db"),{mixins:[o],mounted:function(){this.init()}}),l=c,r=n("2877"),u=Object(r["a"])(l,s,i,!1,null,null,null);e["default"]=u.exports}}]);