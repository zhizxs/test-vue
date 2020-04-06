import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pageA from '@/components/pageA'
import pageB from '@/components/pageB'
import tab1 from '@/components/tab/tab1'
import tab2 from '@/components/tab/tab2'
import tab3 from '@/components/tab/tab3'
import input from '@/components/input'
import map from '@/components/map'
import seats from '@/components/seats'
import svga from '@/components/svga'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/pageA',
      name: 'pageA',
      component: pageA,
      children:[
        {name:'tab1',path:'/tab1',component:tab1},
        {name:'tab2',path:'/tab2',component:tab2},
        {name:'tab3',path:'/tab3',component:tab3}
      ]
    }, {
      path: '/pageB',
      name: 'pageB',
      component: pageB
    },{
      path: '/map',
      name: 'map',
      component: map
    },{
      path: '/seats',
      name: 'seats',
      component: seats
    },{
      path: '/input',
      name: 'input',
      component: input
    },{
      path: '/svga',
      name: 'svga',
      component: svga
    }
  ]
})
