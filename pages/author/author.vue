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
				<input type="text" v-model="phoneNumber"  class="pnone-number" placeholder="请输入手机号"/>
				<view class="btns">
					<text class="cancel" @click="cancel">取消</text>
					<text class="confirm" @tap="confirm">确认</text>
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
				isCanUse: uni.getStorageSync('info') || true ,//默认为true
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
							
						try {
							//uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权
							_this.updateUserInfo();
							
						} catch (e) {}
					},
					fail(res) {}
				});
			},

   
  
			// //登录
			 login() {
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});

				// 1.wx获取登录用户code
				uni.login({
					 provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes)
						 _this.code = loginRes.code;
                          
						if (!_this.isCanUse) {
							//非第一次授权获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function(infoRes) {
									// console.log("1",infoRes)
									//获取用户信息后向调用信息更新方法
									let nickName = infoRes.userInfo.nickName; //昵称
									let avatarUrl = infoRes.userInfo.avatarUrl; //头像
									
									//_this.updateUserInfo(); //调用更新信息方法
								}
							});
						}
                     console.log(111,_this.code)
					    uni.hideLoading();
					//	2.将用户登录code传递到后台置换用户SessionKey、OpenId等信息
						if(_this.code){
							console.log(33333333333)
							uni.request({
								url: _this.config.url+"getOpenid",
								data: {
									code: _this.code,
								},
								method: 'POST',
								success: (res) => {
									console.log("res")
									console.log(res)
									// _this.OpenId=res.data.openid;
									// _this.SessionKey=res.data.session_key;
									// 
									// uni.setStorage({
									// 	key:"sessionkey",
									// 	data:_this.SessionKey
									// })
									//openId、或SessionKdy存储//隐藏loading
									
								},
							    fail:()=>{
									console.log("shibai")
								}
							});
						}
					
					},
				});
			},
			//向后台更新信息
			updateUserInfo() {
			    let _this = this;
			    uni.request({
			        url:_this.config.url+"reg" ,//服务器端地址
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
								key:"info",
								data:info,
								success:(res)=>{
									console.log("用户信息保存成功")
								}
							})

			            }
			        }
			       
			    });
			},
			cancel(){
				this.writePhone=false;
				
			},
			//确认跳转home
			confirm(){
				    console.log(1)
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
					console.log(4)
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
			 margin-top:-150upx;
			 z-index:100;
			 width:60%;
			 padding:0 10%;
			 height:340upx;
			 background:white;
			 .title{
				 margin-bottom:30upx;
			 }
			 .btns{
				 display: flex;
				 justify-content: center;
				 align-items: center;
				 .confirm,.cancel{
					 display: flex;
					 align-items: center;
					 justify-content: center;
					 width:50%;
					
				 }
				 
			 }
			 .phone-number{
				 border:1px solid #ccc;
				 height:60upx;
				 outline: none;
				 padding:20upx;
				 margin-top:30upx;
			 }
	}
	// .mask{
	// 	width:100%;
	// 	height:100%;
	// 	
	// }
	.btns{
		margin-top:40upx;
		display: flex;
		justify-content: space-between;
		width:100%;
	}
	.btns .cancel,.confim{
		width:50%;
		height:40upx;
		display: flex;
		align-items: center;
		justify-content: cneter;
	}
</style>
