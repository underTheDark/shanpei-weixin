<template>
	<view class="msg">
		<view class="chat-list">
			<view class="chat" v-for="(chat,index) in msgList" :key="index">
				<view class="chat-top">
					{{chat.create_at}}
				</view>
				<view class="chat-bottom">
					<view class="chat-title">{{chat.title}}</view>
					<view class="chat-content">{{chat.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgList: [],
				}
			},
			//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
			onPullDownRefresh() {
					setTimeout(function() {
						uni.stopPullDownRefresh()
					}, 1000)
				},
			onLoad() {

				},
				methods: {
					// toChat(chat){
					// 	uni.navigateTo({
					// 		url:"chat/chat?name="+chat.username
					// 	})
					// }
				},
				mounted() {
					//系统消息
					uni.request({
						url: this.config.url + "member/message",
						method: "POST",
						data: {
							token: this.token
						},
						success: (res) => {
							console.log(res)

							if (res.data.code == 1) {
								this.msgList = res.data.data.data
							}
						}
					})
				}
		}
</script>

<style lang="scss">
	.msg {
		background: #F7F7F7;
		height:100vh;
	}

	.chat-list {
		display: flex;
		flex-direction: column;
		padding-top: 40upx;
		margin: 0 30upx;

		.chat {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30upx 20upx;

			.chat-top {
				padding: 20upx;
				font-size: 24upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				background: #DEDEDE;
				border-radius:20upx;
			}

			.chat-bottom {
				margin-top: 30upx;
				background: white;
                width:100%;
				border-radius: 10upx;
				padding:30upx 20upx;
				.chat-title {
					font-size: 32upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(27, 27, 27, 1);
				}

				.chat-content {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					margin-top: 30upx;
				}
			}
		}
	}
</style>
