<template>
	<view class="author">
		
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>
					 "获得你的公开信息(昵称，头像、地区,等)" 
					</text>
				</view>
                <!-- <button v-show="getphone==2" type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权确认</button> -->
                
				<button v-show="getphone==1" class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
				

			</view>
		</view>
		
		 <view class="writePhone" v-if="writePhone">
		    <view class="mask"></view>
			<view class="getphone">
				<text class="title">请输入绑定手机号</text>
				<input type="text" v-model="phoneNumber"  class="phone-number" placeholder="请输入手机号"/>
				<view class="btns">
					确定
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId:'',
				code:"",
				nickName: null,
				avatarUrl: null,
				isCanUse:  false ,//默认为true
			    getphone:"1",
				writePhone:false,
				phoneNumber:"",  //手机号
			};
		},
		methods: {
			//第一授权获取用户信息===》按钮触发
			wxGetUserInfo(detail) {


				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
					  // console.log("phon",infoRes)
						_this.nickName = infoRes.userInfo.nickName; //昵称
						_this.avatarUrl = infoRes.userInfo.avatarUrl; //头像
						_this.writePhone=true;	
                       
					},
					fail(res) {}
				});
			},

   
  
			// //登录
			 login() {
				var _this = this;
				uni.showLoading({
					title: '登录中...'
				});

				// 1.wx获取登录用户code
				uni.login({
					 provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						 _this.code = loginRes.code;
                         _this.getOpenid()

					    uni.hideLoading();
					
					
					},
				});
			},
			//	2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
				getOpenid(){
					
					uni.request({
						url: this.config.url+"getOpenid",
						data: {
							code: this.code,
						},
						method: 'POST',
						success: (res) => {
							
							console.log(res)
							if(res.data.code==1){
								 this.OpenId=res.data.data.openid;
								 this.isCanUse=true;
							}else if(res.data.code==2){
							var userinfo=JSON.stringify(res.data.data)	
							uni.setStorage({
									key:"info",
									data:userinfo,
									success:()=>{
										uni.reLaunch({
											url:"/pages/tabBar/home"
										})
									}
								})
					    }
						}
					});
				},
			//向后台更新信息

			cancel(){
				this.writePhone=false;
				
			},
			//确认跳转home
			confirm(){
				    
                var _this=this;
				var result = this.phoneNumber.replace(/(^\s+)|(\s+$)/g,"");
				if(result.length<1){
					console.log(2)
					uni.showToast({
						title:"请输入手机号",
						duration:1000
					})
				}else if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber))){
					console.log(3)
					uni.showToast({
						title:"请输入正确的手机号",
						duration:1000
					})
				}else{
					
					uni.request({
						url:_this.config.url+"reg",
						method:"POST",
						data:{
							openid:this.OpenId,
							headimg:this.avatarUrl,
							nickname:this.nickName,
							phone:this.phoneNumber
						},
						success:(res)=>{
							console.log("reg",res)
							if(res.data.code==1){
								var userinfo=JSON.stringify(res.data.data)
								uni.setStorage({
									key:"info",
									data:userinfo,
									success:()=>{
										uni.reLaunch({
											url:"/pages/tabBar/home"
										})
									}
								})
							}
						}
					})
				}
			}
		},
		onLoad() { //默认加载
		   
		     uni.getStorage({
		     	key:"info",
				success:(res)=>{
					uni.reLaunch({
						url:"/pages/tabBar/home"
					})
				
				},
				fail:()=>{
					
					this.login();
				}
		     })
			
		}
	}
</script>

<style lang="scss">
	.author{
		position: relative;
		width:100%;
		height:100vh;
		box-sizing: border-box;
	}
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 300rpx;
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
	
   .writePhone{
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.mask{
		position:fixed;
		left:0;
		top:0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 98;
	}
	.getphone{
		 
			 display: flex;
			 flex-direction: column;
			 justify-content: center;
			 align-items: center;
			 box-shadow: 0 5upx 10upx #ccc;
			 position:fixed;
			 top:50%;
			 margin-top:-200upx;
			 z-index:100;
			 border-radius:20upx;
			 width:70%;
			 height:300upx;
			 background:white;
			 padding-top:40upx;
			 .title{
				 
			 }
			 .btns{
				 display: flex;
				 justify-content: center;
				 align-items: center;
				 height:100upx;
				 width:100%;
				 border-top:1px solid #E6E6E6;
				 color:#14CC21;
				 font-size: 34upx;
			 }
			 .phone-number{
				 border:1px solid #E6E6E6;
				 height:88upx;
				 margin:40upx 0;
				 display: flex;
				 justify-content: center;
				 align-items: center;
				 line-height:90upx;
				 text-align: center;
				 border-radius:88upx;
			 }
	}

</style>
