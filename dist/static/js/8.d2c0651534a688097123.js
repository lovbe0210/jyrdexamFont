webpackJsonp([8],{TR58:function(s,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("LYZK"),o={data:function(){return{beforeRoute:"",showOrHidden:{loginName:{text:"*",flag:!1,errorMsg:"",msgFlag:!1},workNum:{text:"*",flag:!1,errorMsg:"",msgFlag:!1},realName:{text:"*",flag:!1,errorMsg:"",msgFlag:!1},password:{text:"*",flag:!1,errorMsg:"",msgFlag:!1},confirmPWD:{text:"*",flag:!1,errorMsg:"",msgFlag:!1}},userInfo:{loginName:"",workNum:"",realName:"",departmentId:"",password:"",confirmPWD:""},depts:[],showDepart:"",showPicker:!1}},beforeRouteEnter:function(s,e,r){r(function(s){s.beforeRoute=e.path})},created:function(){this.getdepartList()},methods:{validateForm:function(){var s=/^[a-zA-Z0-9_]{6,18}$/.test(this.userInfo.loginName);return s?(s=/^[0-2][0-9][0-9][0-9]/.test(this.userInfo.workNum))?(s=/^[\u4e00-\u9fa5]{2,7}$/.test(this.userInfo.realName))?(s=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/.test(this.userInfo.password))?((s=this.userInfo.confirmPWD===this.userInfo.password)||(this.showOrHidden.confirmPWD.msgFlag=!0,this.showOrHidden.confirmPWD.errorMsg="两次输入不一致"),s):(this.showOrHidden.password.msgFlag=!0,void(this.showOrHidden.password.errorMsg="以字母开头包含一个大写字母")):(this.showOrHidden.realName.msgFlag=!0,void(this.showOrHidden.realName.errorMsg="姓名无效")):(this.showOrHidden.workNum.msgFlag=!0,void(this.showOrHidden.workNum.errorMsg="无效工号")):(this.showOrHidden.loginName.msgFlag=!0,void(this.showOrHidden.loginName.errorMsg="用户名无效"))},getdepartList:function(){var s=this;a.a.getdepartList().then(function(e){e.data.succ&&(s.depts=e.data.data)})},onSubmit:function(){var s=this;this.validateForm()&&a.a.registUser(this.userInfo).then(function(e){e.data.succ?s.$toast.success({message:"注册成功，即将跳转到登录页面",duration:1800,onOpened:s.onClose()}):s.$toast.fail(e.data.msg)})},onClose:function(){this.$router.push({name:"login"})},onConfirm:function(s){this.showDepart=s.deptName,this.userInfo.departmentId=s.id,this.userInfo.departmentName=s.deptName,this.showPicker=!1},getFocus:function(s){"loginName"===s&&(this.showOrHidden.loginName.flag=!0,this.showOrHidden.loginName.text=" ",this.showOrHidden.loginName.errorMsg=""),"workNum"===s&&(this.showOrHidden.workNum.flag=!0,this.showOrHidden.workNum.text=" ",this.showOrHidden.workNum.errorMsg=""),"realName"===s&&(this.showOrHidden.realName.flag=!0,this.showOrHidden.realName.text=" ",this.showOrHidden.realName.errorMsg=""),"password"===s&&(this.showOrHidden.password.flag=!0,this.showOrHidden.password.text=" ",this.showOrHidden.password.errorMsg=""),"confirmPWD"===s&&(this.showOrHidden.confirmPWD.flag=!0,this.showOrHidden.confirmPWD.text=" ",this.showOrHidden.confirmPWD.errorMsg="")},loseFocus:function(s,e){"loginName"===s&&(this.showOrHidden.loginName.flag=!1,this.showOrHidden.loginName.text="*"),"workNum"===s&&(this.showOrHidden.workNum.flag=!1,this.showOrHidden.workNum.text="*"),"realName"===s&&(this.showOrHidden.realName.flag=!1,this.showOrHidden.realName.text="*"),"password"===s&&(this.showOrHidden.password.flag=!1,this.showOrHidden.password.text="*"),"confirmPWD"===s&&(this.showOrHidden.confirmPWD.flag=!1,this.showOrHidden.confirmPWD.text="*")}}},t={render:function(){var s=this,e=s.$createElement,r=s._self._c||e;return r("div",{staticClass:"entry"},[r("van-row",{staticClass:"back"},[r("router-link",{staticClass:"left",attrs:{to:{path:s.beforeRoute}}},[r("van-icon",{attrs:{name:"arrow-left",size:"22"}})],1)],1),s._v(" "),r("van-row",{staticClass:"title"},[r("span",[s._v("请设置您的登录账号")])]),s._v(" "),r("van-form",{on:{submit:s.onSubmit}},[r("div",{staticClass:"loginName"},[r("van-row",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.loginName.flag,expression:"showOrHidden.loginName.flag"}],staticClass:"hidden"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",{staticClass:"right"},[s._v(" 用户名")])],1),s._v(" "),r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v(s._s(s.showOrHidden.loginName.text))]),s._v(" "),r("van-col",[r("van-field",{attrs:{placeholder:"请输入用户名(6-18位)",rules:[{required:!0}]},on:{focus:function(e){return s.getFocus("loginName")},blur:function(e){return s.loseFocus("loginName")}},model:{value:s.userInfo.loginName,callback:function(e){s.$set(s.userInfo,"loginName",e)},expression:"userInfo.loginName"}}),s._v(" "),r("div",{staticClass:"right"},[r("span",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.loginName.msgFlag,expression:"showOrHidden.loginName.msgFlag"}]},[s._v(s._s(s.showOrHidden.loginName.errorMsg))])])],1)],1)],1),s._v(" "),r("div",{staticClass:"workNum"},[r("van-row",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.workNum.flag,expression:"showOrHidden.workNum.flag"}],staticClass:"hidden"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",{staticClass:"right"},[s._v(" 工号")])],1),s._v(" "),r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v(s._s(s.showOrHidden.workNum.text))]),s._v(" "),r("van-col",[r("van-field",{attrs:{placeholder:"请输入工号",rules:[{required:!0}]},on:{focus:function(e){return s.getFocus("workNum")},blur:function(e){return s.loseFocus("workNum",s.userInfo.workNum)}},model:{value:s.userInfo.workNum,callback:function(e){s.$set(s.userInfo,"workNum",e)},expression:"userInfo.workNum"}}),s._v(" "),r("div",{staticClass:"right"},[r("span",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.workNum.msgFlag,expression:"showOrHidden.workNum.msgFlag"}]},[s._v(s._s(s.showOrHidden.workNum.errorMsg))])])],1)],1)],1),s._v(" "),r("div",{staticClass:"realName"},[r("van-row",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.realName.flag,expression:"showOrHidden.realName.flag"}],staticClass:"hidden"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",{staticClass:"right"},[s._v(" 真实姓名")])],1),s._v(" "),r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v(s._s(s.showOrHidden.realName.text))]),s._v(" "),r("van-col",[r("van-field",{attrs:{placeholder:"请输入真实姓名",rules:[{required:!0}]},on:{focus:function(e){return s.getFocus("realName")},blur:function(e){return s.loseFocus("realName")}},model:{value:s.userInfo.realName,callback:function(e){s.$set(s.userInfo,"realName",e)},expression:"userInfo.realName"}}),s._v(" "),r("div",{staticClass:"right"},[r("span",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.realName.msgFlag,expression:"showOrHidden.realName.msgFlag"}]},[s._v(s._s(s.showOrHidden.realName.errorMsg))])])],1)],1)],1),s._v(" "),r("div",{staticClass:"departmentId"},[r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",[r("van-field",{attrs:{readonly:"",clickable:"",name:"picker",value:s.showDepart,placeholder:"点击选择部门信息",rules:[{required:!0}]},on:{click:function(e){s.showPicker=!0}}}),s._v(" "),r("van-popup",{attrs:{position:"bottom"},model:{value:s.showPicker,callback:function(e){s.showPicker=e},expression:"showPicker"}},[r("van-picker",{attrs:{"show-toolbar":"",columns:s.depts,"value-key":"deptName","default-index":"0"},on:{confirm:s.onConfirm,cancel:function(e){s.showPicker=!1}}})],1),s._v(" "),r("div",{staticClass:"right"})],1)],1)],1),s._v(" "),r("div",{staticClass:"password"},[r("van-row",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.password.flag,expression:"showOrHidden.password.flag"}],staticClass:"hidden"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",{staticClass:"right"},[s._v(" 密码")])],1),s._v(" "),r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v(s._s(s.showOrHidden.password.text))]),s._v(" "),r("van-col",[r("van-field",{attrs:{type:"password",placeholder:"请输入密码(至少8位)",rules:[{required:!0}]},on:{focus:function(e){return s.getFocus("password")},blur:function(e){return s.loseFocus("password")}},model:{value:s.userInfo.password,callback:function(e){s.$set(s.userInfo,"password",e)},expression:"userInfo.password"}}),s._v(" "),r("div",{staticClass:"right"},[r("span",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.password.msgFlag,expression:"showOrHidden.password.msgFlag"}]},[s._v(s._s(s.showOrHidden.password.errorMsg))])])],1)],1)],1),s._v(" "),r("div",{staticClass:"confirmPWD"},[r("van-row",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.confirmPWD.flag,expression:"showOrHidden.confirmPWD.flag"}],staticClass:"hidden"},[r("van-col",{staticClass:"left"},[s._v("*")]),s._v(" "),r("van-col",{staticClass:"right"},[s._v(" 确认密码")])],1),s._v(" "),r("van-row",{staticClass:"input"},[r("van-col",{staticClass:"left"},[s._v(s._s(s.showOrHidden.confirmPWD.text))]),s._v(" "),r("van-col",[r("van-field",{attrs:{type:"password",placeholder:"请再次确认密码",rules:[{required:!0}]},on:{focus:function(e){return s.getFocus("confirmPWD")},blur:function(e){return s.loseFocus("confirmPWD")}},model:{value:s.userInfo.confirmPWD,callback:function(e){s.$set(s.userInfo,"confirmPWD",e)},expression:"userInfo.confirmPWD"}}),s._v(" "),r("div",{staticClass:"right"},[r("span",{directives:[{name:"show",rawName:"v-show",value:s.showOrHidden.confirmPWD.msgFlag,expression:"showOrHidden.confirmPWD.msgFlag"}]},[s._v(s._s(s.showOrHidden.confirmPWD.errorMsg))])])],1)],1)],1),s._v(" "),r("div",{staticStyle:{margin:"16px"}},[r("van-button",{attrs:{round:"",block:"",type:"info","native-type":"submit"}},[s._v("下一步")])],1),s._v(" "),r("div",{staticClass:"bottom"},[s._v(" ")])])],1)},staticRenderFns:[]};var i=r("VU/8")(o,t,!1,function(s){r("iLm4")},"data-v-b865fffa",null);e.default=i.exports},iLm4:function(s,e){}});
//# sourceMappingURL=8.d2c0651534a688097123.js.map