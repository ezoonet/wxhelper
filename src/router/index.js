import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/Login'
import Wx from '@/views/wx/Wx'
import Reg from '@/views/login/Reg'
import Forget from '@/views/login/Forget'
import Help from '@/views/help/Help'
import Add from '@/views/wx/Add'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/wx',
      name: 'Wx',
      component: Wx
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    }
  ]
})
