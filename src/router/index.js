import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: "/",
    name: "home",
    meta: {
      title: "首页"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/home.vue")
  }, {
    path: '/pageA',
    name: 'pageA',
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/pageA.vue"),
    children: [{
      name: 'tab1',
      path: '/tab1',
      component: () =>
        import ( /* webpackChunkName: "common" */ "../views/tab/tab1.vue")
    }, {
      name: 'tab2',
      path: '/tab2',
      component: () =>
        import ( /* webpackChunkName: "common" */ "../views/tab/tab2.vue")
    }, {
      name: 'tab3',
      path: '/tab3',
      component: () =>
        import ( /* webpackChunkName: "common" */ "../views/tab/tab3.vue")
    }]
  }, {
    path: '/pageB',
    name: 'pageB',
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/pageB.vue")
  }, {
    path: '/map',
    name: 'map',
    meta: {
      title: "地图"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/map.vue")
  }, {
    path: '/seat',
    name: 'seat',
    meta: {
      title: "座位"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/seat.vue")
  }, {
    path: '/input',
    name: 'input',
    meta: {
      title: "输入框"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/input.vue")
  }, {
    path: '/svga',
    name: 'svga',
    meta: {
      title: "svga"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/svga.vue")
  }, {
    path: '/socket',
    name: 'socket',
    meta: {
      title: "通信"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/socket.vue")
  }, {
    path: '/vueEdit',
    name: 'vueEdit',
    meta: {
      title: "富文本"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/vueEdit.vue")
  }, {
    path: '/canvas',
    name: 'canvas',
    meta: {
      title: "html2canvas"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/canvas.vue")
  }, {
    path: '/ele',
    name: 'ele',
    meta: {
      title: "ele组件"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/ele.vue")
  }, {
    path: '/vueApi',
    name: 'vueApi',
    meta: {
      title: "vue-api"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/vueApi.vue")
  }, {
    path: '/renderVue',
    name: 'renderVue',
    meta: {
      title: "render-vue"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/renderVue.vue")
  }, {
    path: '/tableRender',
    name: 'tableRender',
    meta: {
      title: "table-render"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/tableRender.vue")
  },, {
    path: '/tableSlot',
    name: 'tableSlot',
    meta: {
      title: "table-slot"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/tableSlot.vue")
  }, {
    path: '/others',
    name: 'others',
    meta: {
      title: "其他"
    },
    component: () =>
      import ( /* webpackChunkName: "common" */ "../views/others.vue")
  }]
})