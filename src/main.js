// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import CKEditor from '@ckeditor/ckeditor5-vue';

import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

require('lodash');
require('./designPat/sort.js')

// Sentry.init({
// 	dsn: 'https://8a8ee2ff6ade434193cef8d7c235bfa5@o416492.ingest.sentry.io/5311690',
// 	integrations: [new Integrations.Vue({
// 		Vue,
// 		attachProps: true
// 	})],
// })


Vue.use(CKEditor);

import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue.use(io)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})