import Vue from 'vue'
import App from './App'
import config from './components/config'

Vue.config.productionTip = false
Vue.prototype.config =config
Vue.prototype.token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjA5MjQ3NjgsImV4cCI6MTU4Njg0NDc2OCwiZGF0YSI6eyJpZCI6Mywib3BlbmlkIjoib0lieWY0cER5Z0ZLcWNRT1h3OGhaclZFbnJTRSIsImhlYWRpbWciOiJodHRwczpcL1wvd3gucWxvZ28uY25cL21tb3BlblwvdmlfMzJcL1EwajRUd0dUZlRMMFpGR3QwNWliMTJVWnJoMkNidm1VOUcwOGJpYW5pYmtiOXViWXVWaWN5WkZFaWNQUE9JQ1dPZ041UEYyVmxPOTRQVkFEUVBCYzZWM3pxZUFcLzEzMiIsIm5pY2tuYW1lIjoiXHU1ZjIwXHU0ZTA5IiwicGhvbmUiOiIiLCJ1c2VybmFtZSI6IiIsInZpcF9sZXZlbCI6MCwidmlwX2RhdGUiOm51bGwsImNyZWF0ZV9hdCI6IjIwMTktMDYtMTkgMTQ6MTE6NTgifX0.B32WfMWQ-0QJ1VtEbhxXgtT-nBqc8GwJb3ANBhy8BxU"

Vue.prototype.head=function(){
	uni.getStorage({
		key:"userinfo",
		success:function(res){
			console.log(res)
		}
	})
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
