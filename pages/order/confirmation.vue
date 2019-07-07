<template>
	<view class="confirm">
		<!-- 配送方式 -->
		<view class="send">
			<view class="send-title">配送方式</view>
			<view class="send-type">
				<text>已选</text>
				<text>ziti</text>
				<image class="right-jiantou" src="../../static/img/category/youce-jiantou.png"></image>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
		
			<view class="sendgoods-info">配送信息</view>
			<view class="sendgoods-addr">
				<view>
					<text>{{recinfo.name}}</text>
					<text>姓名 &nbsp;&nbsp;&nbsp;1233344444</text>
					<text>河南省郑州市高新区科学大道广告产业园9号9楼901</text>
				</view>
				<image class="right-jiantou" src="../../static/img/category/youce-jiantou.png"></image>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="order-num">23444444444</view>
				<view class="goods-info">
					<view class="img">
						<image :src="row.img"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">
							<text>{{row.spec}} </text>
							<text>{{row.number}}</text>
						</view>
						<view class="price-number">
							<view class="price">￥{{row.price*row.number}}</view>
							<view class="number">
								x1
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="total-money">
				<view class="send-money">
					<text>配送费</text>
					<text>6</text>
				</view>
				<view class="total-pay-money">
					<text>共几件商品</text>
					<view class="pay-money">
						<text>合计：</text>
						<text>1000</text>
					</view>
				</view>
			</view>
		</view>

	
		<view class="footer">
			<view class="settlement">
				<view class="sum">待支付:<view class="money">￥{{sumPrice|toFixed}}</view>
				</view>
				<view class="btn" @tap="toPay">去结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buylist: [], //订单列表
				goodsinfo:{},
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 12.00, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				recinfo: {
					id: 1,
					name: "大黑哥",
					head: "大",
					tel: "18816881688",
					address: {
						region: {
							"label": "广东省-深圳市-福田区",
							"value": [18, 2, 1],
							"cityCode": "440304"
						},
						detailed: '深南大道1111号无名摩登大厦6楼A2'
					},
					isDefault: true
				}

			};
		},
		onShow() {
			//页面显示时，加载订单信息
			uni.getStorage({
				key: 'buylist',
				success: (ret) => {
					this.buylist = ret.data;
					this.goodsPrice = 0;
					//合计
					let len = this.buylist.length;
					for (let i = 0; i < len; i++) {
						this.goodsPrice = this.goodsPrice + (this.buylist[i].number * this.buylist[i].price);
					}
					this.deduction = this.int / 100;
					this.sumPrice = this.goodsPrice - this.deduction + this.freight;
				}
			});
			uni.getStorage({
				key: 'selectAddress',
				success: (e) => {
					this.recinfo = e.data;
					uni.removeStorage({
						key: 'selectAddress'
					})
				}
			})
		},
		onHide() {

		},
		onLoad(option){
			console.log(option)
			// 获取购买商品信息
			this.getInfo(option.id);
			if(option.iscart==0){
				this.goodsinfo.size=option.size;
				this.goodsinfo.price=option.price;
				this.goodsinfo.num=option.num;
			}
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			// 获取购买商品信息
			getInfo(id){
				 uni.request({
					url: this.config.url+"goods/detail",
					data: {
						   token:this.token,
						   id:id
					},
					method: "post",
					success: (res) => {
						if(res.data.code==1){
							console.log("res.data",res.data.data);
							this.goodsinfo.img=res.data.data.logo;
							this.goodsinfo.title=res.data.data.title;
						}
						 
					}
				});
			
			},
			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: (res) => {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay() {
				//商品列表
				let paymentOrder = [];
				let goodsid = [];
				let len = this.buylist.length;
				for (let i = 0; i < len; i++) {
					paymentOrder.push(this.buylist[i]);
					goodsid.push(this.buylist[i].id);
				}
				if (paymentOrder.length == 0) {
					uni.showToast({
						title: '订单信息有误，请重新购买',
						icon: 'none'
					});
					return;
				}
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在提交订单...'
				})
				setTimeout(() => {
					uni.setStorage({
						key: 'paymentOrder',
						data: paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.redirectTo({
								url: "../pay/payment/payment?amount=" + this.sumPrice
							})
						}
					})
				}, 1000)

			},
			//选择收货地址
			selectAddress() {
				uni.navigateTo({
					url: '../user/address/address?type=select'
				})
			}
		}
	}
</script>

<style lang="scss">
	.right-jiantou{
		width:14upx;
		height:24upx;
	}
	// 配送方式
	.confirm {

		background: rgba(245, 245, 245, 1);

	}

	.send,
	.addr,
	.buy-list,
	.footer {
		padding: 0 20upx;
		background: white;
	}

	.send {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		border-top: 1px solid #cecece;
		margin-bottom: 20upx;
         
		.send-title {

			font-size: 30upx;

			color: rgba(51, 51, 51, 1);
		}

		.send-type {
			display: flex;
			align-items: center;
			font-size: 24upx;

			text:nth-child(1) {
				color: rgba(153, 153, 153, 1);

			}

			text:nth-child(2) {
				color: #00C65D;
				margin: 0 10upx;
				font-size: 28upx;
			}

			.right-jiantou {
				width: 14upx;
				height: 24upx;
			}
		}
	}

	// 配送地址
	.addr {
        padding-bottom:30upx;
		display: flex;
		flex-direction: column;
        margin-bottom: 20upx;
		.sendgoods-info {
			font-size: 32upx;
			font-family: PingFang-SC-Bold;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			height: 90upx;
			line-height: 90upx;
		}

		.sendgoods-addr {
			display: flex;
			justify-content: space-between;

			view {
				display: flex;
				flex-direction: column;

				text:nth-child(1) {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				text:nth-child(2) {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);

				}

				text:nth-child(3) {
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);

				}

			}
		}
	}

	.buy-list {

		display: flex;
		flex-direction: column;
		margin-bottom: 100upx;
		background: white;

		.row {
			display: flex;
			padding: 20upx 0;
			flex-direction: column;
			border-bottom: 1px solid #cecece;

			.order-num {
				font-size: 28upx;
				color: rgba(102, 102, 102, 1);
				padding: 10upx 0;
			}

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;

						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;

						margin-bottom: 20vw;

						text {
							margin-right: 60upx;
						}
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: #f06c7a;
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;
							color: rgba(102, 102, 102, 1);

						}
					}
				}
			}
		}
	}

	// 配送费
	.total-money {
		display: flex;
		flex-direction: column;

		.send-money {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;
			border-bottom: 1px solid #CECECE;

			text:nth-child(1) {
				font-size: 30upx;
				color: rgba(51, 51, 51, 1);
			}

			text:nth-child(2) {
				font-size: 24upx;
				color: rgba(255, 32, 27, 1);

			}
		}

		.total-pay-money {
			padding: 20upx 0;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			text {
				font-size: 24upx;
				color: rgba(102, 102, 102, 1);
               margin-right:20upx;
			   display:flex;
			   align-items: center;
			   justify-content: center;
			}

			.pay-money {
				display: flex;

				text:nth-child(2) {
					font-size: 30upx;
					color: rgba(255, 32, 27, 1);
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 26upx;
				color: #999;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	

	.footer {
		width: 100%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {

			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				color: rgba(102, 102, 102, 1);

				font-size: 28upx;
				margin-right: 20upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
					color: rgba(255, 32, 27, 1);

				}
			}

			.btn {

				height: 100%;
				background: rgba(20, 204, 33, 1);
				width: 240upx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;

			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				color: #f06c7a;
			}
		}
	}
</style>
