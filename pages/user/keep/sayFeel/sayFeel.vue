<template>
	<view class="sayfeel">
		<view class="send-msg">
			<view class="send-top">
				<view class="people-content">
					<view class="img">
				   	      <image src="../../../../static/img/category/banner.jpg"></image>
					</view>
					<view>
						<text>快递员</text>
						<text>今天11：00</text>
					</view>
				</view>
				<view class="right">评价快递员</view>
			</view>
			<view class="send-bottom">
				<view class="bad">
					<image src="../../../../static/img/sayfeel/bumanyi.png"></image>
					<text>不满意</text>
				</view>
				<view class="good">
					<image src="../../../../static/img/sayfeel/manyi.png"></image>
					<text>满意</text>
				</view>
			</view>
		</view>
		<view class="product-msg">
			<view class="product-top">
				<image src="../../../../static/img/category/banner.jpg"></image>
				<view class="product-top-right">
					<text>
						国产红心火龙果 4个装中果单 果约300~400g 新鲜水果
					</text>
					<view class="price-num">
						<view class="price">
							<text>￥</text>
							<text>100</text>
						</view>
						<view class="num">x1</view>
					</view>
				</view>
			</view>
			<view class="product-bottom">
				<view class="left">评分</view>
				<view class="right">星星</view>
			</view>
		</view>

		<view class="upload-photo">
			<textarea></textarea>
			<view class="add-photo">
				<image src="../../../../static/img/sayfeel/photo.png" />
				<text>添加图片</text>
			</view>
		</view>

		<view class="submit">
			<view>提交</view>
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

		}
	}
</script>

<style lang="scss">
	.sayfeel {
		display: flex;
		flex-direction: column;
		width:100%;
		background:rgba(245,245,245,1);
	}
    
	.send-msg,
	.product-msg,
	.upload-photo {
		width: 92%;
		flex:1;
		padding:0 4%;
		margin-bottom: 20upx;
		background: white;
	
	}

	.send-msg {
		display: flex;
		flex-direction: column;
        padding:30upx 4%;
		.send-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.people-content {
				display: flex;
				align-items: center;
				justify-content: center;

				.img{
					width:82upx;
					height:82upx;
					image {
						width:82upx;
						height:82upx;
						border-radius: 82upx;
					}
					margin-right:20upx;
				}

				view:nth-child(2) {
					display: flex;
					flex-direction: column;

					text:nth-child(1) {
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(16, 16, 16, 1);

					}

					text:nth-child(2) {
						font-size: 22upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);

					}
				}
			}

			.right {
				font-size: 24upx;
				color: rgba(102, 102, 102, 1);

			}
		}

		.send-bottom {
			display: flex;
			justify-content: center;
			align-items: center;
           margin-top:20upx;
			.good,
			.bad {
				display: flex;
				font-size: 26upx;
                text{
					margin-left:20upx;
				}
				image {
					width: 34upx;
					height: 34upx;
				}
			}

			.good {
				margin-left: 170upx;

				text {

					color: rgba(51, 51, 51, 1);
				}
			}

			.bad {
				text {
					color: rgba(102, 102, 102, 1);
				}
			}

		}
	}

	/* 产品 */
	.product-msg {
		display: flex;
		flex-direction: column;
		background: white;

		.product-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid #CECECE;

			image {
				width: 177upx;
				height: 177upx;
			}

			.product-top-right {
				
				display: flex;
				flex-direction: column;
				align-items: space-between;
				justify-content: space-between;
				flex: 1;
                margin-left:20upx;
				text {
					color: rgba(16, 16, 16, 1);
					font-size: 28upx;
				}

				.price-num {
					display: flex;
					justify-content: space-between;

					.price {
						


						text:nth-child(1) {
                         color:rgba(255,84,31,1);
							font-size: 16upx;
						}

						text:nth-child(2) {
color:rgba(255,84,31,1);
							font-size: 26upx;
						}
					}

					.num {
						color: rgba(51, 51, 51, 1);
						font-size: 24upx;
					}
				}
			}
		}

		.product-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
            padding:20upx 0;
			.left {
				font-size: 32upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
	}

	.upload-photo {
		display: flex;
		flex-direction: column;
        padding:20upx 4%;
		textarea {
			width: 100%;
			height: 200upx;
		}

		.add-photo {
			border: 1px dashed #cecece;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
             width:162upx;
			 height:162upx;
			 border:1px dashed #cecece;
			image {
				width: 52upx;
				height: 43upx;
				margin-bottom: 15upx;
			}

			text {
				font-size: 24upx;
				color: rgba(153, 153, 153, 1);

			}
		}
	}

	.submit {
		background:white;
		height: 288upx;
		display: flex;
		justify-content: center;
		align-items: center;
      width:100%;
		view {
			width: 80%;
			height: 88upx;
			background: rgba(20, 204, 33, 1);
			border-radius: 88upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color:white
		}
	}
</style>
