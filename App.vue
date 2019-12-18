<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onLoad() {
				//分享页面 
			onShareAppMessage:res=> {
				var that = this;
				return {
					title: '快来看一看啊！',
					path: '/pages/tabBar/home',
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	body {
		/* background:rgba(247,247,247,1); */

	}

	.product-dec,
	.product-dec image,
	image,
	img {
		width: 100%;
	}

	.place {
		border-top: 1px solid #F7F7F7;
	}
</style>
