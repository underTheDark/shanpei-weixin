<template>
	<view>
		<!-- <view class="tabr" :style="{top:headerTop}">
			<view :class="{on:typeClass=='goods'}" @tap="switchType('goods')">已评价</view>
			<view :class="{on:typeClass=='shop'}" @tap="switchType('shop')">待评价</view>
			<view class="border" :class="typeClass"></view>
		</view>-->
		<view class="place"></view>
 
		<view class="keep-main">
			<!-- 已评价 -->
			<view class="list"  v-for="(eva,evaNum) in goodsList" :key="evaNum">
				<view class="list-one">
					<view class="one-left">
						<image :src="info.headimg"></image>
						<view class="evaluate">
							<text>{{info.nickname}}</text>
							<view class="star">
							   <uni-rate max="5" size="18" :value="eva.comment_star" ></uni-rate>
							</view>
						</view>
					</view>
					<view class="one-right">
						{{eva.create_at}}
					</view>
				</view>
				<view class="list-two">
					{{eva.comment_content}}
				</view>
				<view v-if="eva.comment_covers.length>0" class="list-three" >
					
					<view class="imgs" v-for="(src,index) in eva.comment_covers" :key="index">
						<image :src="src"></image>
					</view>
				</view>
				
			</view>
			<!-- <view class="do-evaluate" v-show="subState==2" v-for="(eva,index) in goodsList" :key="index">
				<view class="do-evaluate-one">
					<view class="evaluate-left">
						{{eva.order_no}}
					</view>
					<view class="evaluate-right">已完成</view>
				</view>
				<view class="do-evaluate-two">
					<image src="eva.goods_logo"></image>
					<view class="goods-dec">
						<text class="goods-title">
							{{eva.goods_title}}
						</text>
						<view class="goods-price">
							<text>共{{eva.number}}件产品 &nbsp合计：</text>
							<view class="total-price">
								<text>￥</text>
								<text>{{eva.price_real}}</text>
							</view>
						</view>

					</view>
				</view>
				<view class="do-evaluate-three" @click="sayFeel()">
					<text>去评价</text>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue" //星星评分
	export default {
		components:{
			uniRate
		},
		onLoad(e) {
		     this.id=e.id
		
		},
		mounted(){
			var _this=this
			uni.getStorage({
				key:"info",
				success: (res) => {
				
					this.info=JSON.parse(res.data)
						
				}
			})
			
			//ping lun
			this.request({
				url:this.config.url+"goods/comments",
				method:"post",
				data:{
					token:this.token,
					id:this.id
				},
				success:(res)=> {
					console.log(res)
					if(res.data.code==1){
						this.goodsList=res.data.data.data;
						
					}
					
				}
			})
			
		},
		data() {
			return {
				id:"",
				goodsList: [],
				headerTop: 0,
				//控制滑动效果
				typeClass: 'goods',
				
				theIndex: null,
				oldIndex: null,
				isStop: false,
				info:{}
			}
		},
		onPageScroll(e) {

		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
		methods: {
			sayFeel() {
				uni.navigateTo({
					url: "/pages/user/keep/sayFeel/sayFeel"
				})
			},
			switchType(type) {
				// if(this.typeClass==type){
				// 	return ;
				// }
				// uni.pageScrollTo({
				// 	scrollTop:0,
				// 	duration:0
				// })
				// this.typeClass = type;
				// this.subState = this.typeClass==''?'':'show'+type;
				// setTimeout(()=>{
				// 	this.oldIndex = null;
				// 	this.theIndex = null;
				// 	this.subState = this.typeClass=='goods'?'':this.subState;
				// },200)
				this.typeClass = type;
				if (type == "goods") {
					this.subState = 1;

				} else if (type == "shop") {
					this.subState = 2;
				}
			},


			discard() {
				//丢弃
			}


		}
	}
</script>
<style lang="scss">
	view {
		display: flex;
		flex-wrap: wrap;

	}

	html {
		background: white;
	}

	page {
		position: relative;
		background-color: #f5f5f5;
	}

	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.jia {
			&:before {
				content: "\e641";
			}
		}

		&.jian {
			&:before {
				content: "\e643";
			}
		}

		&.shanchu {
			&:before {
				content: "\e6a4";
			}
		}

		&.shixiao {
			&:before {
				content: "\e669";
			}
		}

	}

	.hidden {
		display: none !important;
	}

	.place {
		border-top:1px solid #F5F5F5;
	}

	.tabr {
		background-color: #fff;
		width: 94%;
		height: 95upx;
		padding: 0 3%;
		border-bottom: solid 1upx #dedede;
		position: fixed;
		top: 0;
		z-index: 10;

		view {
			width: 50%;
			height: 90upx;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #999;
		}

		.on {
			color: rgba(20, 204, 33, 1);

		}

		.border {
			height: 4upx;
			background-color: rgba(20, 204, 33, 1);
			transition: all .3s ease-out;

			&.shop {
				transform: translate3d(100%, 0, 0);
			}
		}

	}

	.keep-main {
		display: flex;
		flex-direction: column;
		background: white;
		margin-top: 1upx;
	
		width: 100%;
		
	}

	.list {
        width:96%;
		padding: 30upx 2% ;
		border-bottom: 20upx solid #F5F5F5;
		
		background: white;
        display: flex;
        flex-direction: column;
		
		.list-one {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.one-left {
				display: flex;
				align-items: center;
                justify-content: center;
				image {
					width: 86upx;
					height: 86upx;
					border-radius: 86upx;
					border: 1px solid rgba(54, 153, 255, 1);
				}

				.evaluate {
					margin-left: 30upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					
					font-size: 28upx;
					font-family: PingFang-SC-Regular;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					.star{
						
					}
				}

			}

			.one-right {
				font-size: 24upx;
				font-family: DINPro-Light;
				font-weight: 300;
				color: rgba(153, 153, 153, 1);
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
			}
		}

		.list-two {
			font-size: 28upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin: 20upx 0;
		}

		.list-three {
			display: flex;
			align-items: center;
			width:100%;
			margin: 10upx 0 ;
            .imgs{
				width:33%;
				height:220upx;
			}
			image {
				width: 100%;
				height: 100%;
				margin-right: 10upx;
			}
		}

		.list-four {
			display: flex;
			padding: 20upx;
			justify-content: space-between;
			align-items: center;
            box-sizing: border-box;
			background: rgba(245, 245, 245, 1);

			.four-left {
				width: 140upx;
				height: 140upx;
                margin-right:30upx;
				image {
					width: 140upx;
					height: 140upx;
				}
			}

			.four-right {
                height:100%;
				margin-left: 10upx;
				display: flex;
				flex:1;
				flex-direction: column;
				justify-content: space-around;
				

				text:nth-child(1) {
					font-size: 28upx;
					color: rgba(51, 51, 51, 1);
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					overflow: hidden;

				}

				text:nth-child(2) {
					color: rgba(255, 32, 27, 1);
					font-size: 24upx;
				}
			}
		}
	}

	// 待评价
	.do-evaluate {
		display: flex;
		flex-direction: column;

		.do-evaluate-one {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 4%;
			border-bottom: 1px solid #cecece;

			.evaluate-left {
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(16, 16, 16, 1);
			}

			.evaluate-right {
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(20, 204, 33, 1);
			}
		}

		.do-evaluate-two {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 4%;
			padding: 20upx 0;
			border-bottom: 1px solid #cecece;

			image {
				width: 157upx;
				height: 157upx;
			}

			.goods-dec {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-content: flex-end;

				.goods-title {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(16, 16, 16, 1);
				}

				.goods-price {
					display: flex;
					font-size: 24upx;
					color: rgba(102, 102, 102, 1);

					.total-price {
						text:nth-child(2) {
							font-size: 22upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							color: rgba(51, 51, 51, 1);
						}

						text:nth-child(1) {
							font-size: 16upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							color: rgba(51, 51, 51, 1);
						}
					}
				}
			}
		}

		.do-evaluate-three {

			width: 156upx;
			height: 56upx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20upx 0 20upx 75%;
			font-size: 28upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(20, 204, 33, 1);
			border: 1px solid rgba(20, 204, 33, 1);
			border-radius: 56upx;
		}
	}
</style>
