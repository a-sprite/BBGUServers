import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: resolve => require(['../views/Home.vue'],resolve)
		// meta:{
		// 	keepAlive:true
		// }
	},
	{
		path: '/msg',
		name: 'Msg',
		component: resolve => require(['../views/Msg.vue'],resolve)
		// meta:{
		// 	keepAlive:true
		// }
	},
	{
		path: '/user',
		name: 'User',
		component: resolve => require(['../views/User.vue'],resolve)
		// meta:{
		// 	keepAlive:true
		// }
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
