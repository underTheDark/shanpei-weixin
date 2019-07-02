<template>
	<view id="viewsend">
		<view class="product">
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<view class="row-left">
					<image :src="row.img"></image>
				</view>
				<view class="row-right">
					<view class="product-title">{{row.name}}</view>
					<view class="product-msg">
						<text>{{row.price}}</text>
						<text>{{row.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="people">
			<view class="people-left">
				<image src="../../static/img/call.png"></image>
				<view class="people-msg">
					<text>快递员</text>
					<text>dddddddd</text>
				</view>
			</view>
			<view class="people-right">
				<image src="../../static/img/call.png"></image>
			</view>
		</view>
		<view class="goods-status">
			<uni-steps :data="[
    {title:'买家下单',desc:'2018-11-11'},
    {title:'卖家发货',desc:'2018-11-12'},
    {title:'买家签收',desc:'2018-11-13'},
    {title:'交易完成',desc:'2018-11-14'}]"
			 direction="column" :active="2"
			 active-color="rgba(22,208,255,0.15)"
			 >
			</uni-steps>
		</view>
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"

	export default {
		components: {
			uniSteps
		},
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
	#viewsend {
		display: flex;
		flex-direction: column;
	}

	.product {
		padding: 0 20upx;
		border-bottom: 20upx solid rgba(247, 247, 247, 1);
		display: flex;
		flex-direction: column;

		.row {
			display: flex;
			padding: 20upx 0;
			border-bottom: 1px solid rgba(230, 230, 230, 1);

			.row-left {
				width: 156upx;
				height: 156upx;

				image {
					width: 156upx;
					height: 156upx;
				}
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
						color: rgba(255, 84, 31, 1);
						font-weight: 800;
					}

					text:nth-child(2) {
						color: rgba(16, 16, 16, 1);

					}
				}
			}
		}
	}


	.people {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 4%;

		.people-left {
			display: flex;

			image {
				width: 84upx;
				height: 84upx;
				border-radius: 84upx;
				margin-right: 30upx;
			}

			.people-msg {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 28upx;

				text:nth-child(1) {
					color: rgba(178, 178, 178, 1);
				}

				text:nth-child(2) {
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.people-right {
			width: 65upx;
			height: 65upx;

			image {
				width: 65upx;
				height: 65upx;
			}
		}
	}
	.goods-status{
		margin:60upx 0 0 60upx;
	}
</style>
