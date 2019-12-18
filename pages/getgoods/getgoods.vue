<template>
	<view id="getgoods">

		<view class="addr-list" @click="skipWeb(item.linkurl)" v-for="(item,index) in productList" :key="index">

			<view class="list-left">
				<view class="photo">
					<image class="headimg" :src="item.headimg"></image>
					<view class="leve">
						<image src="../../static/img/star.png"></image>
						<text>{{item.star+".0"}}</text>
					</view>
				</view>
				<view class="info">
					<view class="user-info">
						<view class="name">{{item.name}}</view>
						<view class="star">
							<uni-rate :value="item.star" size="18"></uni-rate>
                        </view>
					</view>
					<view class="user-addr">
						{{item.address}}
					</view>
				</view>
			</view>
			<view class="list-right">
				<image src="../../static/img/call.png" @click.stop="callPhone(item.phone)"></image>
			</view>
		

		</view>


		<uni-load-more :status="loading"></uni-load-more>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";


	export default {
		components: {
			uniRate,
			uniLoadMore
		},

		data() {
			return {
				value: 2,
				productList: [],
				totalList: [],
				status: "more",
				current_page: 1,
				total: "",
				last_page: "1",
				loading: "more"
			}
		},
		methods: {
			//跳转到webview页面
			skipWeb(url) {
				// var linkurl = JSON.stringify(url)
				// console.log(linkurl)
				// uni.setStorage({
				// 	key: "url",
				// 	data: url,
				// 	success: () => {
				// 		uni.navigateTo({
				// 			url: "../webview/webview"
				// 		})
				// 	}
				// })
				wx.navigateToMiniProgram({
					appId: 'wx6885acbedba59c14', // 要跳转的小程序的appid
					path:  url, // 跳转的目标页面
					extarData: {
						
					},
					success(res) {
						console.log(res)
					}
				})
			},
			//电话
			callPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			getgoods() {
				this.loading = "loading";

				this.request({
					url: this.config.url + "express",
					method: "post",
					data: {
						page: this.current_page
					},
					success: res => {
						console.log(res)
						var len;
						if (res.data.code == 1) {
							// 商品列表
							this.totalList = res.data.data.data;
							var page = res.data.data.current_page;
							this.last_page = res.data.data.last_page;
							this.total = res.data.data.data.total;
							this.status = "more";
							//每页10 
							if (page == 1) {
								if (this.totalList.length < 10) {
									len = this.totalList.length;
									this.loading = "noMore";
								} else {
									len = 10;
								}
								for (var i = 0; i < len; i++) {
									this.productList.push(this.totalList[i])
									//	console.log(this.productList)
								}
							} else {
								this.productList.concat(res.data.data.data)
							}





						}
					}
				})
			}
		},
		mounted() {
			this.getgoods()
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			// 调用获取推荐列表接口
			// 当前页小于最后一页才调用
			this.current_page++
			if (this.current_page < this.last_page) {
				this.getgoods();
			} else if (this.current_page == this.last_page) {
				this.getgoods();
				this.loading = "noMore";
			} else {
				this.loading = "noMore";
			}

		}
	}
</script>

<style lang="scss">
	#getgoods {
		display: flex;
		flex-direction: column;
		width: 96%;
		padding: 50upx 2%;
	}

	.addr-list {
		border-radius: 10upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		
		align-items: center;
		padding: 50upx 1%;
		box-sizing: border-box;
		
		box-shadow: 0 5upx 10upx #ccc;

		.list-left {
			display: flex;
			align-items: center;

			.photo {
				display: flex;
				flex-direction: column;
				align-items: center;
				height:100%;
				.headimg{
					width: 58upx;
					height: 58upx;
					border-radius: 100%;
				}
				margin: 0 20upx 0 10upx;
                .leve{
					font-size: 30upx;
					display: flex;
					
					justify-content: center;
					align-items: center;
					image {
						width:30upx;
						height:30upx;
					}
					text{
						color:#333333;
						margin-left:20upx
					}
				}
				
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.user-info {
					display: flex;
					align-items: center;

					.name {
						font-size: 28upx;
						color: #333333;
						margin-right: 20upx;
					}

					.star {
						width: 30upx;
						height: 30upx;
					}
				}

				.user-addr {
					font-size: 24upx;
					color: #333333;
					flex-wrap: wrap;
					margin-top: 30upx;
				}
			}
		}

		.list-right {
			margin: 0 20upx 0 60upx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 42upx;
				height: 42upx;
			}
		}
	}
</style>
