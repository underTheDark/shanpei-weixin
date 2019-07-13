import Vue from 'vue'
import App from './App'
import config from './components/config'

Vue.config.productionTip = false
Vue.prototype.config =config

uni.getStorage({
			key:"info",
			success: (res) => {
				var result=JSON.parse(res.data)
				Vue.prototype.token=result.token
				
			}
		})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
