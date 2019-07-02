<template>
	<view id="confirm">
		<view class="confirm-one">
			<image src="../../static/img/querenshouhuo.png"></image>
			<text>订单交易成功！</text>
		</view>
		<view class="confirm-two">
			<view class="status-one" @click="goIndex">返回首页</view>
			<view class="status-two" @click="evaluate">去评价</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.switchTab({
					url:"/pages/tabBar/home"
				})
			},
			evaluate(){
				uni.navigateTo({
					url:"/pages/user/keep/sayFeel/sayFeel"
				})
			}
		}
	}
</script>

<style lang="scss">
    #confirm{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width:100%;
		.confirm-one{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width:98upx;
				height:98upx;
				margin:260upx 0 30upx;
			}
			text{
				color:rgba(16,16,16,1);
				font-size: 34upx;
			}
		}
		.confirm-two{
			margin-top:88upx;
			display: flex;
			align-items: center;
			justify-content: center;
				view {
				width: 156upx;
				height: 56upx;
				border-radius: 56upx;
			     font-size: 28upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.status-one {
			
				border: 1px solid rgba(217, 217, 217, 1);
				color: rgba(217, 217, 217, 1);
			}
			
			.status-two {
				border: 1px solid rgba(0, 198, 93, 1);
				color: rgba(0, 198, 93, 1);
				margin:0 30upx;
			}
		}
	}
</style>
