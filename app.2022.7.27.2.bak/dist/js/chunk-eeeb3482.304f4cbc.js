(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eeeb3482"],{"4c7c":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"initiateQuestions home-bg"},[s("div",{staticClass:"main-content"},[s("div",{directives:[{name:"drag",rawName:"v-drag"}],staticClass:"h5-evenMenus",on:{click:t.h5ShowMenusFn}},[s("img",{attrs:{src:"https://saas-oss.oss-accelerate.aliyuncs.com/upload/20200710155735466.png",alt:""}})]),s("transition",{attrs:{name:"menus-fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.h5ShowMenus,expression:"h5ShowMenus"}],staticClass:"margin-left a-5-bg margin-left-h5"},[s("div",{staticClass:"menu-tit f-1-cl"},[t._v("\n          "+t._s(t.$t("questions.title"))+"\n          "),s("span",{staticClass:"h5-evenMenus-list",on:{click:t.h5ShowMenusFn}},[s("svg",{staticClass:"icon icon-16 market-show-button",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-c_7"}})])])]),s("div",{staticClass:"margin-left-h5-body"},[s("ul",{staticClass:"f-2-cl"},t._l(t.sideList,(function(e,i){return s("li",{key:i,staticClass:"menu-item",class:{"f-1-cl c-4-bg":t.contentId===e.fileName},on:{click:function(s){return t.pushRouter(e.fileName)}}},[t._v("\n                "+t._s(e.title)+"\n              ")])})),0)])])]),s("div",{staticClass:"menu h5-menu margin-left-pc a-5-bg"},[s("div",{staticClass:"menu-tit f-1-cl"},[t._v(t._s(t.$t("questions.title")))]),s("ul",{staticClass:"f-2-cl"},t._l(t.sideList,(function(e,i){return s("li",{key:i,staticClass:"menu-item",class:{"f-1-cl c-4-bg":t.contentId===e.fileName},on:{click:function(s){return t.pushRouter(e.fileName)}}},[t._v("\n            "+t._s(e.title)+"\n          ")])})),0)]),s("div",{staticClass:"content-box"},[s("div",{staticClass:"content-text c-4-bg"},[s("router-view")],1)])],1)])},n=[],a={name:"initiateQuestions",data:function(){return{contentId:"",h5ShowMenus:!1}},computed:{activeName:function(){return this.$route.meta.activeName},sideList:function(){return[{title:this.$t("questions.send"),fileName:"/questions/init"},{title:this.$t("questions.list"),fileName:"/questions/list"}]}},watch:{activeName:function(t){this.contentId=t}},methods:{init:function(){this.$route.meta&&this.$route.meta.activeName&&(this.contentId=this.$route.meta.activeName)},h5ShowMenusFn:function(){this.h5ShowMenus=!this.h5ShowMenus},pushRouter:function(t){this.h5ShowMenus=!1,this.$router.push(t)}}},c=(e("e953"),{mixins:[a],mounted:function(){this.init()}}),u=c,o=e("2877"),l=Object(o["a"])(u,i,n,!1,null,null,null);s["default"]=l.exports},e953:function(t,s,e){}}]);