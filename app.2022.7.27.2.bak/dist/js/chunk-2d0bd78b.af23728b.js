(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd78b"],{"2baf":function(n,a,t){"use strict";t.r(a);var e=function(){var n=this,a=n._self._c;return a("div",{staticClass:"common-setLang"},[a("c-navSelect",{attrs:{flag:!0,currentTab:n.activeLang,navTab:n.langList},on:{currentType:n.headleChange}})],1)},i=[],c=(t("a481"),t("c5f6"),t("7f7f"),t("ac6a"),{name:"common-setLang",computed:{publicInfo:function(){return this.$store.state.baseData.publicInfo},langList:function(){if(this.publicInfo&&this.publicInfo.lan){var n=[];return this.publicInfo.lan.lanList.forEach((function(a){n.push({name:a.name,index:a.id})})),n}return[]},activeLang:function(){return this.$store.state.baseData.lan}},methods:{headleChange:function(n){this.lanClick(n.index)},lanClick:function(n){var a=this,t=window.localStorage.lastUrl;if(t||(t="/".concat(this.activeLang)),n!==this.activeLang)if(this.isLogin)this.axios({url:this.$store.state.url.common.change_language,params:{language:n},method:"post"}).then((function(e){if(0===Number(e.code)){var i=t.replace(a.activeLang,n);window.location.href=i}}));else{var e=t.replace(this.activeLang,n);window.location.href=e}}}}),o={mixins:[c]},s=o,l=t("2877"),r=Object(l["a"])(s,e,i,!1,null,null,null);a["default"]=r.exports}}]);