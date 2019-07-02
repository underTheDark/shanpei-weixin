<template>
	<view id="reselect">
		<view class="content">
			<view class="product-title">
				<image src="../../static/img/1.jpg" />
				<view class="product-mes">
					<text>库存</text>
					<text>价格</text>
				</view>
				
			</view>
			<view class="product-color">
				<text>颜色</text>
				<view>
					毛衣 （加厚班）
				</view>
			</view>
			<view class="product-size product-color">
				<text>颜色</text>
				<view>
					毛衣 （加厚班）
				</view>
			</view>
			<view class="product-num">
				<text>数量</text>
				<view>
					<uni-number-box :min="1"></uni-number-box>
				</view>
			</view>
		</view>
		<view class="button">
			确定
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	#reselect{
		display:flex;
		flex-direction: column;
		
	}
.content {
	
				padding:20upx 4%;
				width:92%;

				.product-title {
					display: flex;
					align-items: center;
					position: relative;

					.hidden {
						width: 24px;
						height: 24px;
						color:#CECECE;
						font-size: 50upx;
						position: absolute;
						right: 0;
						top: 0upx;
                        display: flex;
						justify-content: center;
						align-items: center;
					}

					image {
						width: 212upx;
						height: 212upx;

					}

					.product-mes {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-left: 40upx;

						text {
							font-size: 32upx;
						}

						text:nth-child(1) {
							color: rgba(255, 32, 27, 1);
							margin-bottom: 10upx;
						}

						text:nth-child(2) {
							color: #cecece;

						}
					}
				}

				.product-color {
					display: flex;
					font-size: 26upx;
					flex-direction: column;

					text {
						color: rgba(51, 51, 51, 1);
						font-size: 30upx;
						padding: 30upx 0;
					}

					view {
						width: 234upx;
						height: 56upx;
						background: rgba(245, 245, 245, 1);
						display: flex;
						justify-content: center;
						color: rgba(51, 51, 51, 1);
						margin-right: 20upx;
						line-height: 56upx;
					}
				}

				.product-num {
					display: flex;
					font-size: 26upx;
					flex-direction: column;
					
					margin-top: 30upx;

					text {
						color: rgba(51, 51, 51, 1);
						font-size: 30upx;
						padding: 30upx 0;
					}

					view {

						height: 60upx;


					}
				}

			}
			.button{
				height:90upx;
				position: fixed;
				bottom:0;
				background:rgba(20,204,33,1);
				color:white;
				width:100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
</style>
