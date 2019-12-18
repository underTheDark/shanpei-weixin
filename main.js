import Vue from 'vue'
import App from './App'
import config from './components/config'

Vue.config.productionTip = false;
Vue.prototype.config =config;
Vue.prototype.request=function(obj){
	try {
		obj.data.token = JSON.parse(uni.getStorageSync('info')).token;
		if (obj.data.token) {
			uni.request(obj)
		}
	} catch (e) {
		// error
		uni.request(obj)
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
