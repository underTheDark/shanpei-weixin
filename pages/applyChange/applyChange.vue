<template>
	<view id="applyreturn">
		<view class="service-one">
			<view class="order-num">
				订单编号：{{goods.order_no}}
			</view>
			<view class="list" v-for="(item,index) in goods.order_list" :key="index">
				<view class="product" >
					<image :src="item.goods_logo"></image>
					<view class="product-right">
						<view class="product-title">
							{{item.goods_title}}
						</view>
						<view class="product-size">
							<text>{{item.goods_spec}}</text>

						</view>
						<view class="product-price">
							<text>{{item.price_selling}}</text>
							<text>x{{item.number}}</text>
						</view>
					</view>
				</view>
		
			</view>

		</view>
		
		<view class="return-reason">
			<view class="reason-title">退款原因</view>
			<textarea   placeholder-style="color:#999999;font-size:24upx;" placeholder="请输入换货原因" v-model="reason"></textarea>
		</view>
		<view class="upload-photo">
			<view class="upload-title">上传凭证</view>
			
			<view class="imgs-box">
				<image class="imgs" :src="item" v-for="(item,num) in tempFilePaths" :key="num"></image>
				<view class="photo" @click="addPhoto()">
					<image src="../../static/img/sayfeel/photo.png"></image>
					<text>添加图片</text>
				</view>
			</view>
		</view>
		<view class="submit" @click="applyChange(goods.order_no)">
			<view>提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                goods:{},
                reason:""   ,//退货原因
				imgData:[],
				arr:[],
				tempFilePaths:[]
			}
		},
		methods: {
			addPhoto(index) {
				
				var _this=this;
				uni.chooseImage({
			
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						_this.tempFilePaths = res.tempFilePaths.concat(_this.tempFilePaths);
						
						const uploadTask = uni.uploadFile({
							url: this.config.url+"/Upload",
							filePath: _this.tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: function(uploadFileRes) {
							var a=JSON.parse(uploadFileRes.data)
							var b=a.data.url;
							   
								_this.arr.push(b)
								
								
							}
						});
			
			
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			
              applyChange(order){
				  console.log(this.arr,this.reason)
             	this.request({
             		url:this.config.url+"order/refund",
             		method:"POST",
             		data:{
             			token:this.token,
             			order_no:order,
             			refund_type:2,
             			refund_desc:this.reason,
             			refund_covers:this.arr
             			
             		},
             		success: (res) => {
             			console.log("return",res)
						if(res.data.code==1){
							uni.showToast({
								title:res.data.info
							})
							uni.navigateTo({
								
						
								url:"/pages/user/order_list/order_list"
							})
						}else{
							uni.showToast({
								title:res.data.info
							})
						}
             		}
             	})
             }
		},
		mounted() {
			uni.getStorage({
				key:"regoods",
				success:(res)=>{
					console.log("regoods",res)
					this.goods=res.data;
				}
			})
		},
		onLoad(e) {
			this.goods=JSON.parse(e.info)
		}
	}
</script>

<style lang="scss">
	.service-one,
	.return-reason,
	.upload-photo,
	.reselect {
		border-bottom: 20upx solid rgba(245, 245, 245, 1);
		padding: 0 4% 30upx;
		width: 92%;
	}


	.service-one {

		background: white;
		display: flex;
		flex-direction: column;

		.list {
			display: flex;
			flex-direction: column;
				.reselect {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 4%;
			
				.select-left {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}
			
				.select-right {
					display: flex;
			
					text {
						color: rgba(102, 102, 102, 1);
						font-size: 24upx;
						margin-right: 20upx;
					}
			
					image {
						width: 14upx;
						height: 24upx;
					}
				}
			}
			
		}

		.order-num {
			padding: 20upx;
			font-size: 28upx;
			color: rgba(102, 102, 102, 1);
		}

		.product {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 180upx;
				height: 180upx;
			}

			.product-right {
				display: flex;
				flex-direction: column;
				margin-left: 20upx;
                 flex: 1;
				.product-title {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}

				.product-size {
					display: flex;
					align-items: center;
					margin-top: 8upx;
					font-size: 24upx;

					text {
						color: rgba(102, 102, 102, 1);
						margin-right: 30upx;
					}
				}

				.product-price {
					margin-top: 30upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					text {
						font-size: 24upx;
					}

					text:nth-child(1) {
						color: rgba(255, 32, 27, 1);
					}

					text:nth-child(2) {
						color: rgba(102, 102, 102, 1);
					}
				}
			}
		}
	}

	.return-reason {
		display: flex;
		flex-direction: column;
		height: 232upx;

		.reason-title {
			padding: 20upx 0;
			font-size: 28upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
		}
	}

	.upload-photo {
		display: flex;
		flex-direction: column;
         
		.upload-title {
			padding: 20upx 0;
			font-size: 28upx;
		}
        .imgs-box{
			display: flex;
			flex-wrap: wrap;
			.imgs{
				width: 160upx;
				height: 160upx;
			}
		}
		.photo {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 160upx;
			height: 160upx;
			border: 1px dashed #cecece;

			image {
				width: 46upx;
				height: 40upx;
			}

			text {
				font-size: 22upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(186, 186, 186, 1);
			}
		}
	}

	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 130upx;
		color: white;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 90%;
			height: 90upx;
			border-radius: 90upx;
			background: rgba(0, 198, 93, 1);
		}
	}
</style>
