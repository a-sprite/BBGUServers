import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user:{}
	},
	getters: {
		isLogin: state => Object.keys(state.user).length > 0	//是否登录
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		//格式化时间
		getTime(time){
			var o = {
				"M+": this.getMonth() + 1, // 月份
				"d+": this.getDate(), // 日
				"h+": this.getHours(), // 小时
				"m+": this.getMinutes(), // 分
				"s+": this.getSeconds(), // 秒
				"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
				"S": this.getMilliseconds() // 毫秒
			};
		}
	}
})
