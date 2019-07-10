<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的手机号信息</text>
				</view>
	
				
				<button type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权确认</button>
	
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			}
		},
		methods: {
			getPhoneNumber:function(e){
							 console.log(e)
			  console.log(e.detail.errMsg)
			  console.log(e.detail.iv)
			  console.log(e.detail.encryptedData)
			  uni.reLaunch({
			  	url:"/pages/tabBar/home"
			  })
			},
		}
	}
</script>

<style lang="scss">
  .header {
  	margin: 90rpx 0 90rpx 50rpx;
  	border-bottom: 1px solid #ccc;
  	text-align: center;
  	width: 650rpx;
  	height: 300rpx;
  	line-height: 450rpx;
  }
  
  .header image {
  	width: 200rpx;
  	height: 200rpx;
  }
  
  .content {
  	margin-left: 50rpx;
  	margin-bottom: 90rpx;
  }
  
  .content text {
  	display: block;
  	color: #9d9d9d;
  	margin-top: 40rpx;
  }
  
  .bottom {
  	border-radius: 80rpx;
  	margin: 70rpx 50rpx;
  	font-size: 35rpx;
  }
</style>
