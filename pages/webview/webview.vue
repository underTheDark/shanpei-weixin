<template>
	<view id="webview">
		<rich-text :nodes="detail"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		methods: {
             firstLoad(index){
				 //主页数据
				 this.request({
				 	url: this.config.url + 'home', //仅为示例，并非真实接口地址。
				 	data: {
				 
				 	},
				 	method: "post",
				 	success: (res) => {
				 		
				 		if (res.data.code == 1) {
				 			// console.log(res)
				 			this.swiperList = res.data.data.banner;
							var title=this.swiperList[index].title;
				 			var imgContent=this.swiperList[index].content;
							
							this.detail=imgContent.replace(/\<img/gi, '<img style="display:-webkit-box;width:100%!important;" ');
							uni.setNavigationBarTitle({
								title: title
							})
				        }
				 	}
				 })
			 }
		},
	
		mounted() {

		},
		onLoad(e) {
			
			var a=Number(e.item)
			
			this.firstLoad(a)
			// uni.setNavigationBarTitle({
			// 	title: this.item.title
			// })
		}
	}
</script>

<style>

</style>
