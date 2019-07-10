<template>
	<view>
<<<<<<< HEAD
		<!-- #ifdef MP-WEIXIN -->
=======
			<!-- #ifdef MP-WEIXIN -->
>>>>>>> 4354f193ba35595d03011d9375adc1f56cf629cc
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/img/wx_login.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的手机号信息</text>
				</view>
<<<<<<< HEAD
	
				
				<button type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权确认</button>
	
			</view>
		</view>
		<!-- #endif -->
=======
		       
		  
			</view>
		</view>
		<!-- #endif -->
		
>>>>>>> 4354f193ba35595d03011d9375adc1f56cf629cc
	</view>
</template>

<script>
	export default {
		data() {
			return {
<<<<<<< HEAD
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
=======
				isCanUse:true ,//默认为true
				sessionkey:"",
				writePhone:false
			}
		},
	
		methods: {
			//cancel
			cancel(){
				this.isCanUse=true;
				this.writePhone=false;
			},
			confirm(){
				
			},
			 getPhoneNumber (e) {
				  var _this=this;
				  uni.getStorage({
				  	  key:"sessionkey",
					  success:function(res){
						  _this.sessionkey=res.data
					  }
				  })
		   
			   if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {    
                  //  console.log('用户拒绝提供手机号');  
                } else {  
					_this.isCanUse=false;
                    _this.writePhone=true;
                    
			    }
			   
			},
			
>>>>>>> 4354f193ba35595d03011d9375adc1f56cf629cc
		}
	}
</script>

<style lang="scss">
<<<<<<< HEAD
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
=======
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
	.writePhone{
		width:100vw;
		height:100vh;
	    display: flex;
	    align-content: center;
	   justify-content: center;
	   margin-top:50%;
	   box-shadow: 0 5upx 10upx #ccc;
	}
	.getPhone{
		      width:240upx;
			 height:240upx;
             background: white;
            padding:30upx;
			 display: flex;
			 justify-content: center;
			 align-items: center;
	}
	.mask{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.4);
	}
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
	.writePhone text{
		color: #9d9d9d;
		margin: 40upx 0;
	}
	.writePhone input{
		height:50upx;
		border:1px solid #ccc;
	}
>>>>>>> 4354f193ba35595d03011d9375adc1f56cf629cc
</style>
