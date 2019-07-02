<template>
	<view id="detail">
		<view class="detail-head">
			<view>付款状态</view>
			<view>剩余时间</view>
		</view>
		<view class="detail-main">
			<view class="detail-main-one">
				<view class="img">
					<image src=""></image>
				</view>
				<view class="one-right">
					<view>收货人：张方方 &nbsp;&nbsp;222222222222</view>
					<view>
						收货地址：中国 河南省 郑州市 高新区广告
						产业园9号楼13楼
					</view>
				</view>
			</view>
			<view class="detail-main-two">
				<view class="row" v-for="(row,index) in goodsList" :key="index">
					<image :src="row.img"></image>
					<view class="row-right">
						<view class="product-title">{{row.name}}</view>
						<view class="product-msg">
							<text>{{row.price}}</text>
							<text>{{row.num}}</text>
						</view>
					</view>
				</view>
				<view class="money">
					<view>
						<text>商品总额</text>
						<text>222</text>
					</view>
					<view>
						<text>运费</text>
						<text>￥6</text>
					</view>
				</view>
				<view class="pay-amount">
					<text>应付款</text>
					<text>2222</text>
				</view>
			</view>
			<view class="detail-main-three">
				<view class="three-title">
					订单信息
				</view>
				<view class="three-main">
					<view>订单编号：2222222222</view>
					<view>创建时间：22222222</view>
				</view>
			</view>
			<view class="detail-main-four">
				<!-- 代付款 -->
				<view class="order-status">
					<view class="status-one">
						取消订单
					</view>
					<view class="status-two">去付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [{
						goods_id: 0,
						img: '../../static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 1,
						img: '../../static/img/goods/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 2,
						img: '../../static/img/goods/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 3,
						img: '../../static/img/goods/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 4,
						img: '../../static/img/goods/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 5,
						img: '../../static/img/goods/p6.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 6,
						img: '../../static/img/goods/p7.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 7,
						img: '../../static/img/goods/p8.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 8,
						img: '../../static/img/goods/p9.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					},
					{
						goods_id: 9,
						img: '../../static/img/goods/p10.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款',
						lprice: "$10",
						num: 100,
						good: "100%"
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	#detail {
		display: flex;
		flex-direction: column;

	}

	.detail-head {

		height: 234upx;
		background: linear-gradient(-90deg, rgba(55, 228, 136, 1) 0%, rgba(0, 209, 98, 1) 51%, rgba(55, 228, 136, 1) 100%);
		display: flex;
		justify-content: center;
		align-items: center;
         flex-direction: column;
		 color:white;
		view:nth-child(1) {
			font-size: 34upx;
		}

		view:nth-child(2) {
			font-size: 24upx;
			margin-top: 15upx;
		}

	}

	.detail-main {
		display: flex;
		flex-direction: column;
     
		.detail-main-one {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:30upx 2%;
			margin: -60upx 2% 80upx;
            width:92%;
			border-radius:10upx;
			box-shadow: 0upx 5upx 20upx 0 rgba(230,230,230,1);
			background: white;
			img {
				width: 20upx;
				height: 20upx;
			}

			image {
				width: 20upx;
				height: 20upx;
				background: blue;
			}

			.one-right {
				display: flex;
				flex-direction: column;
				margin-left: 20upx;

				view:nth-child(1) {
					font-weight: bold;
					color: rgba(26, 26, 26, 1);
					font-size: 32upx;
				}

				view:nth-child(2) {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(26, 26, 26, 1);
					margin-top:30upx;
				}
			}

		}

		.detail-main-two {
			display: flex;
			flex-direction: column;
			margin: 0 2%;

			.row {
				display: flex;
				padding: 20upx 0;
				border-bottom: 1px solid rgba(230, 230, 230, 1);

				image {
					width: 156upx;
					height: 156upx;

				}

				.row-right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30upx;

					.product-title {
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(16, 16, 16, 1);
					}

					.product-msg {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 28upx;

						text:nth-child(1) {
							color: rgba(51, 51, 51, 1);
							font-weight: 800;
						}

						text:nth-child(2) {
							color: rgba(16, 16, 16, 1);

						}
					}
				}
			}

			.money {
				display: flex;
				flex-direction: column;

				view {
					font-size: 30upx;
					color: rgba(16, 16, 16, 1);
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20upx 0;
				}
			}

			.pay-amount {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20upx 0;

				text:nth-child(1) {
					color: rgba(26, 26, 26, 1);
					font-size: 30upx;
					font-weight: 900;
				}

				text:nth-child(2) {
					color: rgba(255, 84, 31, 1);
					font-size: 24upx;
				}
			}
		}

		.detail-main-three {
			display: flex;
			flex-direction: column;
			padding: 0 2%;
			border-bottom: 20upx solid rgba(247, 247, 247, 1);
			border-top: 20upx solid rgba(247, 247, 247, 1);

			.three-title {
				padding: 20upx 0;
				border-bottom: 1px solid rgba(230, 230, 230, 1);
				color: rgba(17, 17, 17, 1);
				font-size: 30upx;
			}

			.three-main {
				display: flex;
				flex-direction: column;
				color: rgba(102, 102, 102, 1);
				font-size: 28upx;

				view {
					padding: 20upx 0;
				}
			}
		}

		.detail-main-four {
			height: 127upx;

			.order-status {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 28upx;
				height: 100%;

				view {
					width: 156upx;
					height: 56upx;
					border-radius: 56upx;

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
	}
</style>
