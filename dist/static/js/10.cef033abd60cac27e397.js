webpackJsonp([10],{fvSC:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("uz0L"),i={data:function(){return{showComplete:!1,beforeRoute:"",param:{},time:120,examUserInfo:{},examUserQuestion:[],currentQuestionIndex:0,currentQuestion:{},radio:"",result:[],percentage:1,mark:0,show:!1,questionNum:30}},beforeRouteEnter:function(t,e,n){n(function(t){"/login"!==e.path?t.beforeRoute=e.path:t.beforeRoute="/"})},created:function(){this.getQuestionList()},methods:{getQuestionList:function(){var t=this;this.param.userId=this.$route.params.userId,this.param.examId=this.$route.params.examId,s.a.getExamUserInfo(this.param).then(function(e){if(e.data.succ){t.examUserInfo=e.data.data;var n=new Date(t.examUserInfo.beginTime.replace(/-/g,"/")).getTime(),i=+new Date;t.time=Math.round(1e3*t.examUserInfo.examDuration-(i-n)),s.a.getExamQuestionList(t.examUserInfo.id).then(function(e){e.data.succ&&(t.examUserQuestion=e.data.data,t.currentQuestion=t.examUserQuestion[t.currentQuestionIndex],t.percentage=Math.round((t.currentQuestionIndex+1)/t.examUserQuestion.length*100),t.showComplete=!0,t.time<=0&&t.redirectSubmit())})}else t.$router.push({path:"/market/entry"})})},nextQuestion:function(){this.saveAnswer(),this.currentQuestionIndex+=1,this.currentQuestion=this.examUserQuestion[this.currentQuestionIndex],this.showNextAnswer(),this.percentage=Math.round((this.currentQuestionIndex+1)/this.examUserQuestion.length*100)},beforeQuestion:function(){this.saveAnswer(),this.currentQuestionIndex-=1,this.currentQuestion=this.examUserQuestion[this.currentQuestionIndex],this.showNextAnswer(),this.percentage=Math.round((this.currentQuestionIndex+1)/this.examUserQuestion.length*100)},saveAnswer:function(){var t=this.examUserQuestion[this.currentQuestionIndex].answer;2!==this.currentQuestion.questionType&&4!==this.currentQuestion.questionType||this.radio&&this.radio!==t&&(this.examUserQuestion[this.currentQuestionIndex].answer=this.radio,s.a.saveCurrentAnswer(this.examUserQuestion[this.currentQuestionIndex].id,this.examUserQuestion[this.currentQuestionIndex].answer).then(function(t){})),3===this.currentQuestion.questionType&&this.result&&this.result.length>0&&this.result!==t&&(this.examUserQuestion[this.currentQuestionIndex].answer=this.result,s.a.saveCurrentAnswer(this.examUserQuestion[this.currentQuestionIndex].id,this.examUserQuestion[this.currentQuestionIndex].answer).then(function(t){}))},showNextAnswer:function(){2===this.currentQuestion.questionType||4===this.currentQuestion.questionType?this.radio=this.examUserQuestion[this.currentQuestionIndex].answer:3===this.currentQuestion.questionType&&(null==this.currentQuestion.answer?this.result=[]:this.result=this.examUserQuestion[this.currentQuestionIndex].answer)},submitExam:function(){var t=this;this.saveAnswer();var e=!0;this.examUserQuestion.forEach(function(t,n){null==t.answer?e=!1:0===t.answer.length&&(e=!1)}),e?this.$dialog.alert({message:"确认交卷？",theme:"round-button"}).then(function(){s.a.submitExam(t.examUserInfo.id).then(function(e){e.data.succ&&t.$router.push({name:"examResult",params:{examUserId:e.data.data}})})}):this.$dialog.confirm({title:"确认交卷",message:"您还有未答完的试题，是否确认交卷？",confirmButtonText:"确认交卷"}).then(function(){s.a.submitExam(t.examUserInfo.id).then(function(e){t.$router.push({name:"examResult",params:{examUserId:e.data.data}})})}).catch(function(){})},increMarkQuestion:function(){this.mark+=1,this.currentQuestion.marked=!0},decreMarkQuestion:function(){this.mark-=1,this.currentQuestion.marked=!1},jumpQuestion:function(t){this.currentQuestionIndex=t-1,this.currentQuestion=this.examUserQuestion[this.currentQuestionIndex],this.showNextAnswer(),this.percentage=Math.round((this.currentQuestionIndex+1)/this.examUserQuestion.length*100)},finished:function(){this.$toast.loading({message:"考试时间结束，即将自动交卷",forbidClick:!0,loadingType:"spinner",duration:2500,onClose:this.redirectSubmit})},redirectSubmit:function(){var t=this;this.saveAnswer(),s.a.submitExam(this.examUserInfo.id).then(function(e){e.data.succ&&t.$router.push({name:"examResult",params:{examUserId:e.data.data}})})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"entry"},[n("van-row",{staticClass:"title"},[n("router-link",{staticClass:"left",attrs:{to:{path:t.beforeRoute}}},[n("van-col",{staticClass:"return",attrs:{span:"1"}},[n("van-icon",{attrs:{name:"arrow-left",size:"20"}})],1),t._v(" "),n("van-col",{attrs:{span:"4"}},[t._v(" 返回")])],1),t._v(" "),t.showComplete?n("van-col",{attrs:{span:"11"}},[n("van-count-down",{staticClass:"mid",attrs:{time:t.time,format:"剩余时间：HH:mm:ss"},on:{finish:function(e){return t.finished()}}})],1):t._e(),t._v(" "),n("van-col",{staticClass:"right",attrs:{span:"4"}},[t.currentQuestion.marked?n("van-icon",{attrs:{name:"label",color:"#fff",size:"22"},on:{click:function(e){return t.decreMarkQuestion()}}}):n("van-icon",{attrs:{name:"label-o",color:"#fff",size:"22"},on:{click:function(e){return t.increMarkQuestion()}}}),t._v(" "),n("van-icon",{staticClass:"mark",attrs:{name:"send-gift",color:"#fff",size:"22",badge:t.mark},on:{click:function(e){t.show=!0}}})],1),t._v(" "),n("van-col",{staticClass:"submit",attrs:{span:"4"}},[n("van-button",{attrs:{round:"",type:"info",color:"#1A8CFE"},on:{click:function(e){return t.submitExam()}}},[t._v("交卷")])],1)],1),t._v(" "),n("van-overlay",{attrs:{show:t.show},on:{click:function(e){t.show=!1}}},[n("div",{staticClass:"wrapper"},[n("div",{staticClass:"block"},[n("van-grid",{staticClass:"marked",attrs:{square:"","column-num":7,gutter:7}},t._l(t.examUserQuestion.length,function(e){return n("van-grid-item",{key:e,on:{click:function(n){return t.jumpQuestion(e)}}},[t.examUserQuestion[e-1].marked?n("a",{staticClass:"markedItem"},[t._v(t._s(e)+"\n            "),t.examUserQuestion[e-1].answer?n("van-icon",{staticClass:"icon",attrs:{name:"checked",size:"17",color:"#00C853"}}):t._e()],1):n("a",{staticClass:"unmarkedItem"},[t._v(t._s(e)+"\n            "),t.examUserQuestion[e-1].answer?n("van-icon",{staticClass:"icon",attrs:{name:"checked",size:"17",color:"#00C853"}}):t._e()],1)])}),1)],1)])]),t._v(" "),t.showComplete?n("van-row",{staticClass:"singleQuestion"},[n("div",{staticClass:"warn"},[n("van-cell-group",[2==t.currentQuestion.questionType?n("van-cell",{attrs:{title:"当前题型：单项选择题（"+t.currentQuestion.singleScore+"分）",size:"large"}}):t._e(),t._v(" "),3==t.currentQuestion.questionType?n("van-cell",{attrs:{title:"当前题型：多项选择题（"+t.currentQuestion.singleScore+"分）",size:"large"}}):t._e(),t._v(" "),4==t.currentQuestion.questionType?n("van-cell",{attrs:{title:"当前题型：判断题（"+t.currentQuestion.singleScore+"分）",size:"large"}}):t._e(),t._v(" "),5==t.currentQuestion.questionType?n("van-cell",{attrs:{title:"当前题型：填空题（"+t.currentQuestion.singleScore+"分）",size:"large"}}):t._e(),t._v(" "),6==t.currentQuestion.questionType?n("van-cell",{attrs:{title:"当前题型：简答题（"+t.currentQuestion.singleScore+"分）",size:"large"}}):t._e()],1)],1),t._v(" "),n("van-progress",{staticClass:"percent",attrs:{percentage:t.percentage}}),t._v(" "),n("div",[n("van-cell-group",[n("van-cell",{attrs:{title:"("+(t.currentQuestionIndex+1)+"/"+t.examUserQuestion.length+"）"+t.currentQuestion.title,size:"large"}}),t._v(" "),n("van-cell",{scopedSlots:t._u([{key:"title",fn:function(){return[2==t.currentQuestion.questionType?n("div",[n("van-radio-group",{staticClass:"options",model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t.currentQuestion.optionA?n("van-radio",{staticClass:"option",attrs:{name:"A"}},[t._v(t._s("A.  "+t.currentQuestion.optionA))]):t._e(),t._v(" "),t.currentQuestion.optionB?n("van-radio",{staticClass:"option",attrs:{name:"B"}},[t._v(t._s("B. "+t.currentQuestion.optionB))]):t._e(),t._v(" "),t.currentQuestion.optionC?n("van-radio",{staticClass:"option",attrs:{name:"C"}},[t._v(t._s("C. "+t.currentQuestion.optionC))]):t._e(),t._v(" "),t.currentQuestion.optionD?n("van-radio",{staticClass:"option",attrs:{name:"D"}},[t._v(t._s("D. "+t.currentQuestion.optionD))]):t._e(),t._v(" "),t.currentQuestion.optionE?n("van-radio",{staticClass:"option",attrs:{name:"E"}},[t._v(t._s("E. "+t.currentQuestion.optionE))]):t._e(),t._v(" "),t.currentQuestion.optionF?n("van-radio",{staticClass:"option",attrs:{name:"F"}},[t._v(t._s("F. "+t.currentQuestion.optionF))]):t._e(),t._v(" "),t.currentQuestion.optionG?n("van-radio",{staticClass:"option",attrs:{name:"G"}},[t._v(t._s("G. "+t.currentQuestion.optionG))]):t._e()],1)],1):t._e(),t._v(" "),3==t.currentQuestion.questionType?n("div",{staticClass:"options"},[n("van-checkbox-group",{model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[t.currentQuestion.optionA?n("van-checkbox",{staticClass:"option",attrs:{name:"A"}},[t._v(t._s("A.  "+t.currentQuestion.optionA))]):t._e(),t._v(" "),t.currentQuestion.optionB?n("van-checkbox",{staticClass:"option",attrs:{name:"B"}},[t._v(t._s("B.  "+t.currentQuestion.optionB))]):t._e(),t._v(" "),t.currentQuestion.optionC?n("van-checkbox",{staticClass:"option",attrs:{name:"C"}},[t._v(t._s("C.  "+t.currentQuestion.optionC))]):t._e(),t._v(" "),t.currentQuestion.optionD?n("van-checkbox",{staticClass:"option",attrs:{name:"D"}},[t._v(t._s("D.  "+t.currentQuestion.optionD))]):t._e(),t._v(" "),t.currentQuestion.optionE?n("van-checkbox",{staticClass:"option",attrs:{name:"E"}},[t._v(t._s("E.  "+t.currentQuestion.optionE))]):t._e(),t._v(" "),t.currentQuestion.optionF?n("van-checkbox",{staticClass:"option",attrs:{name:"F"}},[t._v(t._s("F.  "+t.currentQuestion.optionF))]):t._e(),t._v(" "),t.currentQuestion.optionG?n("van-checkbox",{staticClass:"option",attrs:{name:"G"}},[t._v(t._s("G.  "+t.currentQuestion.optionG))]):t._e()],1)],1):t._e(),t._v(" "),4==t.currentQuestion.questionType?n("div",[n("van-radio-group",{staticClass:"options",model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[n("van-radio",{staticClass:"option",attrs:{name:"对"}},[t._v("对")]),t._v(" "),n("van-radio",{staticClass:"option",attrs:{name:"错"}},[t._v("错")])],1)],1):t._e()]},proxy:!0}],null,!1,4113146193)})],1)],1)],1):n("van-row",{staticClass:"loading"},[n("van-loading",{attrs:{type:"spinner",color:"#1989fa",vertical:"",size:"28px"}},[t._v("\n      小吕一正在疯狂组卷中...\n    ")])],1),t._v(" "),n("van-row",{staticClass:"button"},[n("van-col",{attrs:{span:"1"}}),t._v(" "),n("van-col",{attrs:{span:"8"}},[0==t.currentQuestionIndex?n("van-button",{attrs:{round:"",type:"info",size:"large",disabled:""}},[t._v("上一题")]):n("van-button",{attrs:{round:"",type:"info",size:"large"},on:{click:t.beforeQuestion}},[t._v("上一题")])],1),t._v(" "),n("van-col",{attrs:{span:"1"}}),t._v(" "),n("van-col",{attrs:{span:"13"}},[t.currentQuestionIndex==t.examUserQuestion.length-1?n("van-button",{attrs:{round:"",type:"info",size:"large"},on:{click:t.submitExam}},[t._v("交卷")]):n("van-button",{attrs:{round:"",type:"info",size:"large"},on:{click:function(e){return t.nextQuestion()}}},[t._v("下一题")])],1),t._v(" "),n("van-col",{attrs:{span:"1"}})],1)],1)},staticRenderFns:[]};var a=n("VU/8")(i,r,!1,function(t){n("sA2m")},"data-v-34afbefe",null);e.default=a.exports},sA2m:function(t,e){}});
//# sourceMappingURL=10.cef033abd60cac27e397.js.map