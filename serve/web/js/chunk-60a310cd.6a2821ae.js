(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60a310cd"],{"14db":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-article"},[n("div",{staticClass:"d-flex py-3 px-2 title"},[n("div",{staticClass:"iconfont icon-fanhui pr-1 text-blue",on:{click:function(e){return t.$router.back(-1)}}}),n("div",{staticClass:"flex-1 fs-lg text-blue text-weight text-ellipse"},[t._v(t._s(t.model.title))]),n("div",{staticClass:"text-grey"},[t._v(t._s(t._f("data")(t.model.updatedAt)))])]),n("div",{staticClass:"body px-4 fs-lg",domProps:{innerHTML:t._s(t.model.body)}})])},i=[],c=n("1da1"),r=(n("96cf"),n("5a0c")),s=n.n(r),o={props:{id:{required:!0}},data:function(){return{model:{}}},methods:{fetch:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("articles/".concat(t.id));case 2:n=e.sent,t.model=n.data;case 4:case"end":return e.stop()}}),e)})))()}},filters:{data:function(t){return s()(t).format("YYYY/MM/DD")}},created:function(){this.fetch()}},l=o,u=(n("1b6a"),n("2877")),d=Object(u["a"])(l,a,i,!1,null,null,null);e["default"]=d.exports},"1b6a":function(t,e,n){"use strict";n("3f7c")},"3f7c":function(t,e,n){}}]);
//# sourceMappingURL=chunk-60a310cd.6a2821ae.js.map