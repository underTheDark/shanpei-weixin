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
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
				<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取手机号信息</button>

			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo(detail) {
				console.log("phone",detail)
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
					   console.log("phon",infoRes)
						_this.nickName = infoRes.userInfo.nickName; //昵称
						_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
							
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
             getPhoneNumber (e) {
				 console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

   
      
			//登录
			login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});

				// 1.wx获取登录用户code
				uni.login({
					// provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						let code = loginRes.code;

						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									console.log(infoRes)
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									
									_this.updateUserInfo(); //调用更新信息方法
								}
							});
						}

						//2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						uni.request({
							url: "http://shanpei.wsstreet.net/getOpenid",
							data: {
								code: code,
							},
							method: 'POST',

							success: (res) => {
								//console.log(res)
								_this.OpenId=res.data.data.openid;
								//openId、或SessionKdy存储//隐藏loading
								uni.hideLoading();
							}
						});
					},
				});
			},
			//向后台更新信息
			updateUserInfo() {
			    let _this = this;
			    uni.request({
			        url:"http://shanpei.wsstreet.net/reg" ,//服务器端地址
			        data: {
			            openid:_this.OpenId,
						headimg:_this.avatarUrl,
						nickname:_this.nickName
			        },
			        method: 'POST',
			       
			        success: (res) => {
						//console.log( "22",res)
			            if (res.data.code==1) {
							var info=JSON.stringify(res.data.data)
							uni.setStorage({
								key:"userinfo",
								data:info,
								success:(res)=>{
									console.log("用户信息保存成功")
								}
							})
			                uni.reLaunch({
			                    url: '/pages/tabBar/home'
			                });
			            }
			        }
			       
			    });
			}
		},
		onLoad() { //默认加载
			this.login();
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
