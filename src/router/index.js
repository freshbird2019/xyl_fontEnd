import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Box/Header'
import LeftBox from '@/components/Box/LeftBox'
import MainBox from '@/components/Box/MainBox'
import RightBox from '@/components/Box/RightBox'
import sHeader from '@/components/Box/sHeader'
import sLeft from '@/components/Box/sLeft'


import aclasspage from '@/components/adm/a-classpage'
import aclacheck from '@/components/adm/a-clacheck'
import aclacheck2 from '@/components/adm/a-clacheck2'
import acommentpage from '@/components/adm/a-commentpage'
import acomcheck from '@/components/adm/a-comcheck'
import aactpage from '@/components/adm/a-actpage'
import aactcheck from '@/components/adm/a-actcheck'

import sclasspage from '@/components/stu/s-classpage'
import scomment from '@/components/stu/s-comment'
import sclassmate from '@/components/stu/s-classmate'
import sactpage from '@/components/stu/s-actpage'
import siact from '@/components/stu/s-iact'
import scommentcheck from '@/components/stu/s-commentcheck'
import sselfpage from '@/components/stu/s-selfpage'


import log from '@/components/login/log'
import register from '@/components/login/register'

//2、通过import导入页面组件

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/components/login/log'),
    },
    {
      path: '/login/register',
      name: 'register',
      component:register,
      },
    {path: '/adm/a-welcome',
      components:
        {
          'aheader': Header,
          'aleft': LeftBox,
          'amain': MainBox,
          'aright':RightBox,
        },
      children: [
        {
          path: '/adm/a-classpage',
          name: 'aclasspage',
          component: aclasspage
        },
        {
          path: '/adm/a-clacheck',
          name: 'aclacheck',
          component: aclacheck
        },
        {
          path: '/adm/a-clacheck2',
          name: 'aclacheck2',
          component: aclacheck2
        },
        {
          path: '/adm/a-commentpage',
          name: 'acommentpage',
          component: acommentpage
        },
        {
          path: '/adm/a-comcheck',
          name: 'acomcheck',
          component: acomcheck
        },

        {
          path: '/adm/a-actpage',
          name: 'aactpage',
          component: aactpage
        },
        {
          path: '/adm/a-actcheck',
          name: 'aactcheck',
          component: aactcheck
        },]},
        {path: '/stu/s-welcome',
          components:
            {
              'aheader': sHeader,
              'aleft': sLeft,
              'amain': MainBox,
              'aright':RightBox,
            },
          children: [
            {
              path: '/stu/s-classpage',
              name: 'sclasspage',
              component: sclasspage
            },
            {
              path: '/stu/s-comment',
              name: 'scomment',
              component: scomment
            },
            {
              path: '/stu/s-classmate',
              name: 'sclassmate',
              component: sclassmate
            },
            {
              path: '/stu/s-actpage',
              name: 'sactpage',
              component: sactpage
            },
            {
              path: '/stu/s-iact',
              name: 'siact',
              component: siact
            },
            {
              path: '/stu/s-iact',
              name: 'siact',
              component: siact
            },
            {
              path: '/stu/s-commentcheck',
              name: 'scommentcheck',
              component: scommentcheck
            },
            {
              path: '/stu/s-selfpage',
              name: 'sselfpage',
              component: sselfpage
            },
          ]
        }
        // 3、声明路由路径，路由名称，路由所用组件，
        // 根据第一步里面，router-link中to的属性值，匹配路由规则中的path值
        // 在页面显示匹配一致的path下的组件。（也就是第二步定义的组件）

  ]


})
