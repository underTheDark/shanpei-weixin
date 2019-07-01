<template>
	<view>
		<view class="service-list">
			<view class="service-one">订单编号：2222222</view>
			<view class="service-two">
				<view class="service-two-left">
					<image src="../../../static/img/category/banner.jpg"></image>

				</view>
				<view class="service-two-right">
					<text>
						kai/贝印 日本进口面粉筛 手持糖粉筛 筛
						网滤网 筛粉杯子 ...
					</text>
					<view class="price-num">
						<text class="price">11 &nbsp;&nbsp;M</text>
						<text>x1</text>
					</view>
				</view>
			</view>
			<view class="service-three">
				<text>退</text>
				<text>仅退款</text>
				<text>退款成功</text>
			</view>
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
	html {
		background: rgba(245, 245, 245, 1);

	}

	.service-list {
		display: flex;
		flex-direction: column;

		border-bottom: 20upx solid rgba(245, 245, 245, 1);
		background: white;

		.service-one {
			display: flex;
			align-items: center;
			padding: 20upx 4%;
			font-size: 28upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			width: 92%;


		}

		.service-two {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx 4%;
			background: rgba(245, 245, 245, 1);

			.service-two-left {
				image {
					width: 180upx;
					height: 180upx;

				}
			}

			.service-two-right {
				display: flex;
				flex-direction: column;

				text {

					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

				}

				.price-num {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20upx;

					text {
						color: rgba(102, 102, 102, 1);
						font-size: 24upx;
					}
				}
			}
		}

		.service-three {
			display: flex;
			padding: 20upx 4%;
			width: 92%;

			text {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-right: 20upx;
			}

			text:nth-child(1) {
				width: 31upx;
				height: 31upx;
				border: 1px solid red;
				border-radius: 31upx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: red;
			}
		}
	}
</style>
