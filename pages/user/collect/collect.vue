<template>
	<view class="collect">
		<view class="list">

			<view class="sub-list goods">
				<view class="tis" v-if="goodsList.length==0">没有数据~</view>

				<view class="row" v-for="(row,index) in goodsList" :key="index">
					<uni-swipe-action @click="bindClick" :options="options">
						<!-- <view class="menu" @tap.stop="deleteCoupon(row.id,goodsList)">
						<view class="icon shanchu"></view>
					</view> -->
						<!-- @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)" -->


						<view class="img">
							<image :src="row.img"></image>
						</view>
						<view class="info">
							<view class="title">
								国产红心火龙果 4个装中果单果约300
								~400g 新鲜水果
							</view>
							<view class="evaluate">
								<view class="evaluate-num">332已购买</view>
								<view class="evaluate-good">100%好评</view>
							</view>
							<view class="price-compare">
								<view class="price">10000</view>

								<view class="slogan">3333</view>

							</view>
						</view>
					</uni-swipe-action>

				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";

	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: "rgba(255,84,31,1)"
					}
				}],
				goodsList: [{
						id: 1,
						img: '/static/img/goods/p1.jpg',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 2,
						img: '/static/img/goods/p1.jpg',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
					{
						id: 3,
						img: '/static/img/goods/p1.jpg',
						name: '商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题',
						spec: '规格:S码',
						price: 127.5,
						number: 1,
						selected: false
					},
				]
			}
		},
		methods: {
			bindClick(options){
				console.log(options)
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},

			touchEnd(index, $event) {
				//解除禁止触发状态
				this.isStop = false;
			},

			//删除商品
			deleteCoupon(id, List) {
				let len = List.length;
				for (let i = 0; i < len; i++) {
					if (id == List[i].id) {
						List.splice(i, 1);
						break;
					}
				}
				this.oldIndex = null;
				this.theIndex = null;
			},
		}
	}
</script>

<style lang="scss">
	.sub-list {
		display: flex;
		flex-direction: column;

		.tis {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32upx;
		}

		.row {
			display: flex;
			justify-content: space-between;
			padding: 20upx 2%;

			.img {
				width: 222upx;
				height: 222upx;

				image {
					width: 222upx;
					height: 222upx;
				}
			}

			.info {
				margin-left: 20upx;
				display: flex;
				flex-direction: column;

				.title {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(16, 16, 16, 1);
				}

				.price-compare {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						font-size: 24upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						text-decoration: line-through;
						color: rgba(153, 153, 153, 1);
						margin-left: 20upx;
					}
				}

				.evaluate {
					width: 92%;
					padding: 0 4% 20upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: rgba(102, 102, 102, 1);
					font-size: 22upx;
					margin-top: 40upx;

					.evaluate-good {
						margin-left: 20upx;
					}
				}

			}
		}
	}

	// .list{
	// 		width: 100%;
	// 		display: block;
	// 		position: relative;
	// 	}
	// 	@keyframes showGoods {
	// 		0% {transform: translateX(-100%);}100% {transform: translateX(0);}
	// 	}
	// 	@keyframes showShop {
	// 		0% {transform: translateX(0);}100% {transform: translateX(-100%);}
	// 	}
	// 	.sub-list{
	// 		&.shop{
	// 			position: absolute;
	// 			top: 0;
	// 			left:100%;
	// 			display: none;
	// 		}
	// 		&.showgoods{
	// 			display: flex;
	// 			animation: showGoods 0.20s linear both;
	// 		}
	// 		&.showshop{
	// 			display: flex;
	// 			animation: showShop 0.20s linear both;
	// 		}
	// 		width: 100%;
	// 		padding: 20upx 0 120upx 0;
	// 		.tis{
	// 			width: 100%;
	// 			height: 60upx;
	// 			justify-content: center;
	// 			align-items: center;
	// 			font-size: 32upx;
	// 		}
	// 		&.shop{
	// 			.row{
	// 				height: 20vw;
	// 				.left{
	// 					width: 20vw;
	// 					height: 20vw;
	// 					padding-left: 20upx;
	// 					align-items: center;
	// 					image{
	// 						width: 18vw;
	// 						height: 18vw;
	// 						border-radius: 100%;
	// 					}
	// 				}
	// 				.right{
	// 					height: 20vw;
	// 					align-items: center;
	// 					font-size: 32upx;
	// 				}
	// 			}
	// 		}
	// 		.row{
	// 			width: 100%;
	// 			height: 30vw; 
	// 			align-items: center;
	// 			position: relative;
	// 			overflow: hidden;
	// 			border-bottom: solid 1upx #dedede;
	// 			.menu{
	// 				.icon{
	// 					color: #fff;
	// 					font-size:50upx;
	// 				}
	// 				position: absolute;
	// 				width: 28%;
	// 				height: 100%;
	// 				right: 0;
	// 				justify-content: center;
	// 				align-items: center;
	// 				background-color: red;
	// 				color: #fff;
	// 				z-index: 2;
	// 			}
	// 			
	// 			.carrier{
	// 				@keyframes showMenu {
	// 					0% {transform: translateX(0);}100% {transform: translateX(-28%);}
	// 				}
	// 				@keyframes closeMenu {
	// 					0% {transform: translateX(-28%);}100% {transform: translateX(0);}
	// 				}
	// 				&.open{
	// 					animation: showMenu 0.25s linear both;
	// 				}
	// 				&.close{
	// 					animation: closeMenu 0.15s linear both;
	// 				}
	// 				background-color: #fff;
	// 
	// 				position: absolute;
	// 				width: 100%;
	// 				padding: 0 0;
	// 				height: 100%;
	// 				z-index: 3;
	// 				flex-wrap: nowrap;
	// 				.goods-info{
	// 					width: calc(100% - 40upx);
	// 					padding: 20upx;
	// 					flex-wrap: nowrap;
	// 					.img{
	// 						width: calc(30vw - 40upx);
	// 						height: calc(30vw - 40upx);
	// 						border-radius: 10upx;
	// 						overflow: hidden;
	// 						flex-shrink: 0;
	// 						margin-right: 20upx;
	// 						image{
	// 							width: calc(30vw - 40upx);
	// 							height: calc(30vw - 40upx);
	// 						}
	// 					}
	// 					.info{
	// 						width: 100%;
	// 						height: calc(30vw - 40upx);
	// 						overflow: hidden;
	// 						flex-wrap: wrap;
	// 						align-content: space-between;
	// 						position: relative;
	// 						.title{
	// 							width: 100%;
	// 							font-size: 28upx;
	// 							display: -webkit-box;
	// 							-webkit-box-orient: vertical;
	// 							-webkit-line-clamp: 2;
	// 							overflow: hidden;
	// 						}
	// 						
	// 						.price-number{
	// 							width: 100%;
	// 							justify-content: space-between;
	// 							align-items: baseline;
	// 							
	// 							.keep-num{
	// 								font-size: 26upx;
	// 								color: #999;
	// 							}
	// 							.price{
	// 								font-size: 30upx;
	// 								color: #f06c7a;
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 
	// 		}
	// 	}
</style>
