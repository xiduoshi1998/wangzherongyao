(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d368fc9"],{"22de":function(e,t,i){"use strict";i("8319")},8319:function(e,t,i){},cd56:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-container",{staticStyle:{height:"100vh",border:"1px solid #eee"}},[i("el-aside",{staticStyle:{"background-color":"rgb(238, 241, 246)"},attrs:{width:"200px"}},[i("el-menu",{attrs:{router:"","unique-opend":"","default-active":e.$route.path}},[i("el-submenu",{attrs:{index:"1"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-message"}),e._v("内容管理 ")]),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/items/create"}},[e._v("新建物品")]),i("el-menu-item",{attrs:{index:"/items/list"}},[e._v("物品列表")])],2),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/heros/create"}},[e._v("新建英雄")]),i("el-menu-item",{attrs:{index:"/heros/list"}},[e._v("英雄列表")])],2),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/articles/create"}},[e._v("新建文章")]),i("el-menu-item",{attrs:{index:"/articles/list"}},[e._v("文章列表")])],2),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/videos/create"}},[e._v("新建视频")]),i("el-menu-item",{attrs:{index:"/videos/list"}},[e._v("视频列表")])],2)],2),i("el-submenu",{attrs:{index:"2"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-message"}),e._v("运营管理 ")]),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/ads/create"}},[e._v("新建广告位")]),i("el-menu-item",{attrs:{index:"/ads/list"}},[e._v("广告位列表")])],2)],2),i("el-submenu",{attrs:{index:"3"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-message"}),e._v("系统管理 ")]),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/categories/create"}},[e._v("新建分类")]),i("el-menu-item",{attrs:{index:"/categories/list"}},[e._v("分类列表")])],2),i("el-menu-item-group",[i("template",{slot:"title"},[e._v("分组")]),i("el-menu-item",{attrs:{index:"/adminUsers/create"}},[e._v("新建管理员")]),i("el-menu-item",{attrs:{index:"/adminUsers/list"}},[e._v("管理员列表")])],2)],2)],1)],1),i("el-container",[i("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[i("el-dropdown",{staticStyle:{"z-index":"10"},on:{command:e.handleCommand}},[i("i",{staticClass:"el-icon-setting",staticStyle:{"margin-right":"15px"}}),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",[e._v("查看")]),i("el-dropdown-item",[e._v("新增")]),i("el-dropdown-item",{attrs:{command:"3"}},[e._v("退出登陆")])],1)],1),i("span",{staticClass:"username"},[e._v(e._s(e.user.username))])],1),i("el-main",[i("router-view",{key:e.$route.path})],1)],1)],1)},n=[],l={data:function(){return{user:this.$route.query}},methods:{handleCommand:function(e){var t=this;switch(e){case"3":this.$confirm("将退出当前账号，".concat(this.user.username),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.$message.error("退出登陆成功"),localStorage.clear(),t.$router.push("/login")})).catch((function(e){t.$message.info="已取消退出"}))}}}},a=l,r=(i("22de"),i("2877")),o=Object(r["a"])(a,s,n,!1,null,null,null);t["default"]=o.exports}}]);
//# sourceMappingURL=chunk-3d368fc9.e0d83ced.js.map