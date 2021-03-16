import address from './address'
import home from './home'
import mine from './mine'
import news from './news'
import notfound from './404'
import order from './order'
import service from './service'
import examing from './examing'
import examResult from './examResult'
import market from './market'
import login from './login'
import regist from './regist'
export default [
  {
    path: '*',
    redirect: '404/entry'
  },
  {
    path: '/',
    redirect: 'home/entry'
  }
].concat(home, news, mine, service, notfound, order, address, examing, examResult, market, login, regist)
