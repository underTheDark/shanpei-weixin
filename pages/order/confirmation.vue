<template>
	<view class="confirm">
		<!-- 配送方式 -->
		<view class="send">
			<view class="send-title">配送方式</view>
			<view class="send-type" @click="sendType()">
				<text>已选</text>
				<text>{{getgoods_name==1?"自提":"送货上门"}}</text>
				<image class="right-jiantou" src="../../static/img/category/youce-jiantou.png"></image>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="addr">

			<view class="sendgoods-info">配送信息</view>
			<view class="sendgoods-addr">
				<view>
					<text class="getgoods-name" v-show="getgoods_name">{{addrList.name}}</text>
					<text class="getgoods-people">{{addrList.username}} &nbsp;&nbsp;&nbsp;{{addrList.phone}}</text>
					<text class="getgoods-addr">
						{{addrList.province_name}}{{addrList.city_name}}{{addrList.area_name}}{{addrList.address_name}}{{addrList.street_name}}
					</text>
				</view>
				<!-- <image class="right-jiantou" src="../../static/img/category/youce-jiantou.png"></image> -->
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(buy,buyIndex) in buyList" :key="buyIndex">

				<view class="goods-info">
					<view class="img">
						<image :src="buy.goods_logo"></image>
					</view>
					<view class="info">
						<view class="title">{{buy.goods_title}}</view>
						<view class="spec">
							<text>{{buy.goods_spec}} </text>
							<!-- <text>{{goodsinfo.num}}</text> -->
						</view>
						<view class="price-number">
							<view class="price">￥{{buy.price_selling}}</view>
							<view class="number">
								{{buy.goods_number}}
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="total-money">
				<view class="send-money">
					<text>配送费</text>
					<text>￥{{express}}</text>
				</view>
				<view class="total-pay-money">
					<text>共{{number}}件商品</text>
					<view class="pay-money">
						<text>合计：</text>
						<text>￥{{total}}</text>
					</view>
				</view>
			</view>
		</view>


		<view class="footer">
			<view class="settlement">
				<view class="sum">待支付:<view class="money">￥{{totalmoney}}</view>
				</view>
				<view class="btn" @tap="toPay">去结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		mounted() {
			uni.getStorage({
				key: "address",
				success: (data) => {
					console.log(data, data.data)
					this.addrList = JSON.parse(data.data)
					if (this.addrList.distance) {
						this.getgoods_name = "1";
					}
				}
			})
			//确认订单信息
			uni.request({
				url: this.config.url + "order/sure",
				method: "post",
				data: {
					token: this.token,
					goods: this.goods
				},
				success: (res) => {
					//console.log(res)
					if (res.data.code == 1) {
						this.buyList = res.data.data.goods;
						this.express = res.data.data.express;
						this.total = res.data.data.total;
						this.number = res.data.data.number;
					}
				}
			})
		},
		computed: {
			totalmoney() {
				var totalNum = Number(this.total) + Number(this.express)

				return totalNum
			}
		},
		data() {
			return {
				buyList: [], //订单列表
				goodsinfo: {},
				number: "", //购买商品总数量
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 12.00, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				goods: [],
				express: '',
				total: "", //商品总价格
				addrList: {}, //地址列表
				getgoods_name: false, //送货类型显示
				order_no: "", //订单编号

			};
		},
		onShow() {

		},
		onHide() {

		},
		onLoad(option) {
			console.log(option)



			// 获取购买商品信息

			if (option.iscart == 0) {
				this.goodsinfo.goods_spec = option.size;

				this.goodsinfo.goods_number = option.num;
				this.goodsinfo.goods_id = option.id
				this.goods.push(this.goodsinfo)
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
			//选取送货方式
			sendType() {
				uni.navigateTo({
					url: "/pages/sendType/sendType"
				})
			},
			// 获取购买商品信息

			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: (res) => {
						this.buylist = [];
						//console.log('remove buylist success');
					}
				});
			},
			toPay() {
				//商品列表
				uni.request({
					url: this.config.url + "order/order",
					method: "post",
					data: {
						token: this.token,
						goods: this.goods,
						order_type: this.getgoods_name,
						address_id: this.addrList.id,
						from_car: 0
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							this.order_no = res.data.data.order_no; //获取订单编号

							//调起支付接口
							uni.request({
								url: this.config.url + "order/pay",
								method: "POST",
								data: {
									token: this.token,
									order_no: this.order_no
								},
								success: (res) => {
									console.log(res)
									if (res.data.code == 1) {
										var pay = res.data.data.data
										uni.requestPayment({
											provider: 'wxpay',
											appid:pay.appId,
											timeStamp: pay.timeStamp,
											nonceStr: pay.nonceStr,
											package: pay.package,
											signType: pay.signType,
											paySign: pay.paySign,
											success: function(res) {
												console.log('success:' + JSON.stringify(res));
											},
											fail: function(err) {
												console.log('fail:' + JSON.stringify(err));
											}
										});
									}
								}
							})
						} else if (res.data.code == 0) {
							uni.showToast({
								title: "提交订单失败",
								duration: 1000
							})
						}
					}
				})
				//本地模拟订单提交UI效果
				// uni.showLoading({
				// 	title: '正在提交订单...'
				// })
				// setTimeout(() => {
				// 	uni.setStorage({
				// 		key: 'paymentOrder',
				// 		data: paymentOrder,
				// 		success: () => {
				// 			uni.hideLoading();
				// 			uni.redirectTo({
				// 				url: "../pay/payment/payment?amount=" + this.sumPrice
				// 			})
				// 			
				// 		}
				// 	})
				// }, 1000)

			}

		}
	}
</script>

<style lang="scss">
	.right-jiantou {
		width: 14upx;
		height: 24upx;
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
		padding-bottom: 30upx;
		display: flex;
		flex-direction: column;
		margin-bottom: 20upx;
		width: 100%;

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
			width: 100%;

			view {
				display: flex;
				flex-direction: column;

				.getgoods-name {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
				}

				.getgoods-people {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					margin: 20upx 0;
				}

				.getgoods-addr {
					font-size: 24upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					display: block
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
				margin-right: 20upx;
				display: flex;
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
