/*
 * @Author: WangQiBiao
 * @LastEditors: WangQiBiao
 * @Description: 入口
 * @Date: 2019-03-31 13:41:09
 * @LastEditTime: 2019-04-07 22:48:38
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import useApi from '@/api/ucenter'
import {
  ActionSheet, Badge, Button, Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup, col,
  Collapse, CollapseItem,
  CountDown, Dialog,
  Divider, DropdownItem, DropdownMenu, Empty,
  Field, Form,
  Grid, GridItem, Icon,
  Image as VanImage, List,
  Loading, NavBar, Notify,
  Overlay, Picker, Popup,
  Progress,
  Radio, RadioGroup, Rate, row, Search, Switch,
  Tag, Toast, Uploader
} from 'vant'
import 'vant/lib/index.css'
import Vue from 'vue'
import App from './App'
import './assets/css/index.scss'
import './assets/js/screen-adaptation'
import components from './components'
import * as directives from './directives'
import * as filters from './filters'
import * as mixins from './mixins'
import router from './router'

Vue.use(Search).use(Cell).use(Button).use(Icon).use(row).use(col).use(Switch).use(Rate)
Vue.use(DropdownMenu).use(DropdownItem).use(Badge).use(Collapse).use(CollapseItem).use(Tag)
Vue.use(Toast).use(Dialog).use(Notify).use(NavBar).use(CountDown).use(Progress).use(Divider)
Vue.use(Cell).use(CellGroup).use(RadioGroup).use(Radio).use(Checkbox).use(CheckboxGroup)
Vue.use(Overlay).use(Grid).use(GridItem).use(VanImage).use(Loading).use(Form).use(Field)
Vue.use(Picker).use(Popup).use(Empty).use(ActionSheet).use(List).use(Uploader)

// 全局组件
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
// 引入全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 引入全局指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// 引入全局mixins
Object.keys(mixins).forEach(key => {
  Vue.mixin(mixins[key])
})

Vue.config.productionTip = false

// 全局钩子函数，在路由跳转前执行
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/regist') {
    next()
  } else {
    // 判断是否登录
    useApi.isLogin().then(response => {
      if (response.data.succ) {
        to.query.userId = response.data.data
        next()
      } else {
        router.push('/login')
      }
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
