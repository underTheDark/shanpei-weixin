<template>
	<view>

		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="orderList.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in orderList" :key="index" @click="ToDetail(row.order_no)">
					<view class="type">
						<text class="order-num">订单编号：{{row.order_no}}</text>
						<text class="order-status">
							{{row.status==0?'已取消':row.status==2?'待支付':row.status==3?'待发货':
							 row.status==4?'代签收':row.status==5?'已完成':""}}
						</text>
					</view>
					<view class="order-list">
						<view class="order-info" v-for="(item,itemNum) in row.order_list" :key="itemNum">
							<view class="left">
								<image :src="item.goods_logo"></image>
							</view>
							<view class="right">
								<view class="name">
									{{item.goods_title}}
								</view>

								<view class="price-number">
									<view class="price">￥{{item.price_selling}}</view>
									<view class="number">x{{item.number}}</view>
								</view>
							</view>

						</view>
					</view>
					<view class="detail">
						<view class="number">共{{row.sum}}件商品</view>
						<view class="sum">合计￥
							<view class="price">{{row.price_total}}</view>
						</view>

					</view>
					<view class="btns">
						<block v-if="row.status==2 ">
							<view class="default" @click="openPopup">取消订单</view>
							<view class="pay" @tap.stop="toPayment(row.order_no,index)">去付款</view>
						</block>

						<block v-if="row.status==4">
							<view class="default" @click.stop="viewSend(row.order_no)">查看物流</view>
							<view class="default" @click.stop="service(row)">申请售后</view>
							<view class="pay" @click.stop="confirm(row.order_no)">确认收货</view>

						</block>
						<block v-if="row.status==3">
							<!-- <view class="default" @click.stop="cancelOrder(row.order_no)">取消订单</view> -->


						</block>
						<block v-if="row.status==5">
							<view class="pay" @click.stop="evalute()">去评价</view>
						</block>
						<!-- <block  v-show="row.status=='completed'"><view class="default">再次购买</view></block> -->
						<!-- <block  v-show="row.status=='refunds'"><view class="default">查看进度</view></block> -->
						<block v-if="row.status==0">
							<view class="default" @click.stop="deleteOrder(row.order_no,index)">删除订单</view>
						</block>
					</view>
				</view>
			</view>
		</view>

		<!-- 取消订单弹出框 -->
         

	<!-- 	<view class="menu_mask" v-if="false" @tap="hideMenu">
			<view class="menu_list">
				<view class="menu_item" v-for="(item,index) in array" :key="index" @tap="selectedAddress(item)">{{item.name}}</view>
			</view>
		</view> -->
	</view>
</template>
<script>
	
	export default {
		 
		data() {
			return {
				show_menu: false,
				selceted: "",
				headerPosition: "fixed",
				headerTop: "0px",
				typeText: {
					unpaid: '等待付款',
					back: '等待商家发货',
					unreceived: '商家已发货',
					received: '等待用户评价',
					completed: '交易已完成',
					refunds: '商品退货处理中',
					cancelled: '订单已取消'
				},
				orderType: ['全部', '待付款', '待发货', '待收货', '已完成'],
				//订单列表 演示数据
				orderList: [],
				list: [],
				tabbarIndex: 0,
				array: ["我不想买了", "信息填写错误，重新拍", "卖家缺货", "其他原因"]
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex) + 1;

			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		mounted() {
			uni.request({
				url: this.config.url + "member/order",
				method: "post",
				data: {
					token: this.token,
					type: this.tabbarIndex
				},
				success: (res) => {
					//console.log("moun",res)
					if (res.data.code == 1) {

						this.orderList = res.data.data.data;
						this.orderList.forEach((item, index) => {
							let num = 0;
							item.order_list.forEach(e => {
								num += e.number
							})
							item.sum = num;

						})
					}
				}
			})
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
          
			ToDetail(id) {
				uni.navigateTo({
					url: "../../detail/detail?id=" + id
				})
			},
			// showType(tbIndex){
			// 	console.log(tbIndex)
			// 	uni.request({
			// 	    url:this.config.url+"member/order",
			// 		method:"post",
			// 		data:{
			// 			token:this.token,
			// 			type:tbIndex
			// 		},
			// 		success:(res) => {
			// 			console.log("moun",res)
			// 			if(res.data.code==1){
			// 				
			// 				this.orderList=res.data.data.data;
			// 				this.orderList.forEach((item,index)=>{
			// 						let num=0;
			// 						item.order_list.forEach(e=>{
			// 							num += e.number
			// 						})
			// 						item.sum = num;
			// 					
			// 				})
			// 			}
			// 		}
			// 	})
			// 	this.tabbarIndex = tbIndex;
			// 	this.list = this.orderList[tbIndex];
			// },
			//去付款
			toPayment(order, index) {
				//调起支付接口
				var _this = this;
				uni.request({
					url: this.config.url + "order/pay",
					method: "POST",
					data: {
						token: this.token,
						order_no: order
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							var pay = res.data.data.data
							uni.requestPayment({
								provider: 'wxpay',
								appid: pay.appId,
								timeStamp: pay.timeStamp,
								nonceStr: pay.nonceStr,
								package: pay.package,
								signType: pay.signType,
								paySign: pay.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									_this.orderList.splice(index, 1)
									uni.showToast({
										title: "支付成功",

									})
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.showToast({
										title: "支付失败"
									})
								}
							});
						} else {
							uni.showToast({
								title: res.data.info
							})
						}
					}
				})

			},
			//取消订单
			cancelOrder(order, index) {
				console.log(order, index)
				this.show_menu = true;

				// uni.request({
				// 	url:this.config.url+"order/cancle",
				// 	method:"POST",
				// 	data:{
				// 		token:this.token,
				// 		order_no:order,
				// 	},
				// 	success:res =>{
				// 		console.log(res)
				// 		this.orderList.splice(index,1)
				// 		if(res.data.code==1){
				// 			uni.showToast({
				// 				title:"取消订单成功"
				// 			})
				// 		}else{
				// 			uni.showToast({
				// 				title:"取消订单失败"
				// 			})
				// 		}
				// 	}
				// })
			},
			//确认收货
			confirm(order) {
				uni.request({
					url: this.config.url + "order/confirm",
					method: "POST",
					data: {
						token: this.token,
						order_no: order,
					},
					success: res => {
						console.log(res)
					}
				})
			},
			//查看物流
			viewSend() {
				uni.request({
					url: this.config.url + "order/express",
					method: "POST",
					data: {
						token: this.token,
						order_no: order,
					},
					success: res => {
						console.log(res)
					}
				})
			},
			//申请售后
			service(row) {
				uni.navigateTo({
					url: "pages/serType/serType"
				})
				uni.setStorage({
					key: "regoods",
					data: row,
					success: () => {
						console.log('保存换货数据成功')
					}
				})
			},
			//删除订单
			deleteOrder(order, index) {
				uni.request({
					url: this.config.url + "order/del",
					method: "POST",
					data: {
						token: this.token,
						order_no: order,
					},
					success: res => {
						console.log(res)
						this.orderList.splice(index, 1)
						if (res.data.code == 1) {
							uni.showToast({
								title: "删除订单成功"
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	//取消订单弹出框

	page {
		background-color: #f3f3f3;
	}

	.order-list {

		width: 100%;

		.list {

			margin: 0 auto;
			border-top: 20upx solid #F5F5F5;

			.onorder {
				width: 100%;
				height: 50vw;
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;

				image {
					width: 20vw;
					height: 20vw;
					border-radius: 100%;
				}

				.text {
					width: 100%;
					height: 60upx;
					font-size: 28upx;
					color: #444;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.row {
				width: calc(100% - 40upx);
				padding: 10upx 20upx;
				border-radius: 10upx;
				background-color: #fff;
				margin-bottom: 20upx;
				border-bottom: 1px solid #F5F5F5;

				.type {
					font-size: 26upx;

					height: 50upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1px solid #F5F5F5;

					.order-num {
						font-size: 28upx;
						color: #333333;
					}

					.order-status {
						color: #14CC21;
					}
				}

				.order-list {
					display: flex;
					flex-direction: column;
					width: 100%;
				}

				.order-info {
					width: 100%;
					display: flex;
					padding: 20upx 0;
					border-bottom: 1px solid #F5F5F5;

					.left {
						flex-shrink: 0;
						width: 25vw;
						height: 25vw;

						image {
							width: 25vw;
							height: 25vw;
							border-radius: 10upx;
						}
					}

					.right {
						width: 100%;
						margin-left: 10upx;
						position: relative;

						.name {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.spec {
							color: #a7a7a7;
							font-size: 22upx;

						}

						.price-number {
							position: absolute;
							bottom: 0;
							width: 100%;
							display: flex;
							justify-content: space-between;
							font-size: 22upx;
							color: #333;

							.price {
								font-size: 28upx;

							}

							.number {
								color: #ccc;
								font-size: 23upx;
							}
						}
					}
				}

				.detail {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					padding: 20upx 0;
					font-size: 22upx;
					color: #555555;

					.sum {
						padding: 0 8upx;
						display: flex;
						align-items: center;

						.price {
							font-size: 30upx;
							color: #333
						}
					}

				}

				.btns {
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					view {
						min-width: 120upx;
						height: 50upx;
						padding: 0 20upx;
						border-radius: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28upx;
						margin-left: 20upx;
					}

					.default {
						border: solid 1upx #ccc;
						color: #666;
					}

					.pay {
						border: solid 1upx #14CC21;
						color: #14CC21;
					}
				}
			}
		}
	}

	.menu_mask {
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 1000000;
		width: 100vw;
		height: 100vh;

		.menu_list {
			width: 100vw;
			height: 410upx;
			overflow: auto;
			background-color: #fff;
			position: absolute;
			bottom: 0;
			box-sizing: border-box;
			padding: 0 42upx;
			display: flex;
			flex-direction: column;

			.menu_item {
				display: block;
				width: 100%;
				height: 106upx;
				font-size: 29upx;
				box-sizing: border-box;
				border-bottom: 1px solid rgba(216, 216, 216, 1);
				color: #666;
				line-height: 106upx;

			}

		}
	}
</style>
