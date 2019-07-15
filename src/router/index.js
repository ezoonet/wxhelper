import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/Login'
import Wx from '@/views/wx/Wx'
import Reg from '@/views/login/Reg'
import Forget from '@/views/login/Forget'
import Help from '@/views/help/Help'
import Add from '@/views/wx/Add'
import Botconf from '@/views/menu/Botconf'
import Suggess from '@/views/menu/Suggess'
import Share from '@/views/menu/Share'
import Grouplist from '@/views/group/Grouplist'
import Kick from '@/views/group/Kick'
import Reply from '@/views/group/Reply'
import Collect from '@/views/group/Collect'
import Media from '@/views/func/Media'
import Groupsend from '@/views/func/Groupsend'
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
    },
    {
      path: '/botconf',
      name: 'Botconf',
      component: Botconf
    },
    {
      path: '/suggess',
      name: 'Suggess',
      component: Suggess
    },
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    {
      path: '/grouplist/:id',
      name: 'Grouplist',
      component: Grouplist
    },
    {
      path: '/kick/:id',
      name: 'Kick',
      component: Kick
    },
    {
      path: '/reply/:id',
      name: 'Reply',
      component: Reply
    },
    {
      path: '/collect/:id',
      name: 'Collect',
      component: Collect
    },
    {
      path: '/media',
      name: 'Media',
      component: Media
    },
    {
      path: '/groupsend',
      name: 'Groupsend',
      component: Groupsend
    }
    //


  ]
})
