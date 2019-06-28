<template>
	<view class="sendType">
		<view class="send-type">
			<view>自提</view>
			<view>送货上门</view>
		</view>
		<view class="send-add">
			<!-- 送货上门 -->
			<view class="add-list" v-show="show==2">
				<view class="add-left">
					<checkbox></checkbox>
				</view>
				<view class="add-right">
					<view class="top">
						<text>张芳</text>
						<text>133333333333</text>
					</view>
					<view class="bottom">河南省郑州市高新区科学大道广告产业园9号楼</view>
				</view>
			</view>
			<!-- 自提 -->
			<view class="addr-home" v-show="show==1">
				<view class="addr-info">
					<view class="addr-far">
						<text>小黑超市</text>
						<text>300km</text>
					</view>
					<text>姓名 &nbsp;&nbsp;&nbsp;1233344444</text>
					<text>河南省郑州市高新区科学大道广告产业园9号9楼901</text>
				</view>
			</view>
		</view>
		<view class="">
			新建地址
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: 2
			}
		}
	}
</script>

<style>
	.sendType{
		
			background:rgba(245,245,245,1);

		
	}
	.send-type {
		display: flex;
		justify-content: space-around;
		align-items: center;

		view {
			font-size: 30upx;

			color: rgba(51, 51, 51, 1);
		}

		;

	}

	.send-add {
		display: flex;
		flex-direction: column;

		.add-list {
			display: flex;

			align-items: center;
           margin-bottom:20upx;
			.add-left {}

			.add-right {
				display: flex;
				flex-direction: column;

				.top {
					display: flex;
					align-items: center;
					font-size: 32upx;

					color: rgba(51, 51, 51, 1);

					text {
						margin-right: 30upx;
					}
				}

				.bottom {
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(85, 85, 85, 1);
				}
			}
		}

		;
	}
</style>
