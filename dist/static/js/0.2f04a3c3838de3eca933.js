webpackJsonp([0],{BUJo:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("dhTQ"),n={data:function(){return{params:{userId:"",examId:""}}},props:{data:{type:Array,default:function(){return[]}}},created:function(){this.params.userId=this.$route.query.userId},methods:{playExam:function(t){var a=this;if("已结束"===t.statu)this.$toast("考试已结束");else if("可参加"===t.statu){var e=t.name+"\n\n考试时间："+t.startTime+"~"+t.endTime+"\n考试时长："+t.examDuration+"分钟                            \n总分数："+t.totalScore+"分                              \n及格分数："+t.passScore+"分                             \n最大考试次数："+t.examCount+"次                           ";this.$dialog.confirm({message:e,confirmButtonText:"确认考试"}).then(function(){a.params.examId=t.id,a.initUserExam(a.params)}).catch(function(){})}},initUserExam:function(t){var a=this;s.a.initUserExam(t).then(function(t){t.data.succ?a.$router.push({name:"examing",params:a.params}):a.$notify({message:"进入考试失败\n"+t.data.msg,duration:1700})})}}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",{staticClass:"lists"},t._l(t.data,function(a,s){return e("li",{key:s,staticClass:"lists-item",on:{click:function(e){return t.playExam(a)}}},[e("van-row",{attrs:{type:"flex"}},[e("van-col",{attrs:{span:"24"}},[e("p",{staticClass:"label"},[e("van-tag",{attrs:{round:"",type:a.type}},[t._v(t._s(a.statu))]),t._v("\n          "+t._s(a.name)+"\n        ")],1)])],1),t._v(" "),e("van-row",{attrs:{type:"flex"}},[e("van-col",{attrs:{span:"24"}},[e("div",{staticClass:"info"},[e("p",{staticClass:"desc"},[t._v("\n            "+t._s(a.startTime)+" ~ "+t._s(a.endTime)+"\n          ")])])])],1)],1)}),0)},staticRenderFns:[]};var i=e("VU/8")(n,r,!1,function(t){e("Es/l")},"data-v-3ad36efc",null);a.default=i.exports},"Es/l":function(t,a){},JLWT:function(t,a){},dhTQ:function(t,a,e){"use strict";var s=e("vLgD");a.a={getExamList:function(t){return Object(s.a)({url:"/exam/getExamList",method:"post",data:t})},initUserExam:function(t){return Object(s.a)({url:"/exam/initUserExam",method:"post",data:t})}}},pxAQ:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("dhTQ"),n={props:{data:{type:Array,default:function(){return[]}}},data:function(){return{userId:""}},created:function(){this.userId=this.$route.query.userId},methods:{initUserExam:function(t){var a=this;s.a.initUserExam(t).then(function(e){e.data.succ?a.$router.push({name:"examing",params:t}):a.$notify({message:"进入考试失败\n"+e.data.msg,duration:1700})})}}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",{staticClass:"lists"},[0==t.data.length?e("van-row",[e("van-empty",{staticClass:"custom-image",attrs:{image:"https://img01.yzcdn.cn/vant/custom-empty-image.png",description:"您当前没有参加考试或参加的考试已结束"}})],1):t._e(),t._v(" "),t._l(t.data,function(a,s){return e("li",{key:s,staticClass:"lists-item"},[e("van-row",{attrs:{type:"flex"}},[e("van-col",{attrs:{span:"4"}},[e("div",{staticClass:"imgs"},[e("van-icon",{staticClass:"img",attrs:{name:"column"}})],1)]),t._v(" "),e("van-col",{attrs:{span:"18"}},[e("p",{staticClass:"label"},[t._v(t._s(a.name))])])],1),t._v(" "),e("van-row",{attrs:{type:"flex"}},[e("van-col",{attrs:{span:"24"}},[e("div",{staticClass:"info"},[e("p",{staticClass:"desc"},[t._v("剩余次数："+t._s(a.count))]),t._v(" "),e("p",{staticClass:"desc"},[t._v("考试时长："+t._s(a.duration))]),t._v(" "),e("p",{staticClass:"desc"},[t._v("最高分数："+t._s(a.score)+"分")])]),t._v(" "),e("div",{staticClass:"btn"},[e("van-button",{attrs:{type:"primary",hairline:!1,color:"#1A8DFF",size:"small"},on:{click:function(e){return t.initUserExam({userId:t.userId,examId:a.examId})}}},[t._v("\n            "+t._s(a.buttonText)+"\n          ")])],1)])],1)],1)})],2)},staticRenderFns:[]};var i=e("VU/8")(n,r,!1,function(t){e("JLWT")},"data-v-53fd10f6",null);a.default=i.exports},uz0L:function(t,a,e){"use strict";var s=e("vLgD");a.a={getExamUserInfo:function(t){return Object(s.a)({url:"/exam/getExamUserInfo",method:"post",data:t})},getExamQuestionList:function(t){return Object(s.a)({url:"/exam/getExamQuestionList?examUserId="+t,method:"post"})},saveCurrentAnswer:function(t,a){return Object(s.a)({url:"/exam/saveCurrentAnswer?id="+t+"&answer="+a,method:"post"})},submitExam:function(t){return Object(s.a)({url:"/exam/submitExam?id="+t,method:"post"})},getExamUserById:function(t){return Object(s.a)({url:"/exam/getExamUserById?id="+t,method:"post"})},getMyExamList:function(t){return Object(s.a)({url:"/exam/getMyExamList?userId="+t,method:"post"})}}}});
//# sourceMappingURL=0.2f04a3c3838de3eca933.js.map