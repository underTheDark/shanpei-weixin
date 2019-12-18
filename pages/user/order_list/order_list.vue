<template>
	<view>
		<view class="custom_top" >
			<uni-nav-bar fixed="true"	 left-icon="back" @click-left="goBack"	 title="我的订单"></uni-nav-bar>

		</view>
		<!-- 顶部导航 -->
		<view class="topTabBar" >
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			
			<view class="list">
				<!-- <view class="onorder" v-if="orderList.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in orderList" :key="index" @click="ToDetail(row.order_no)">
					<view class="type">
						<text class="order-num">订单编号：{{row.order_no}}</text>
						<text class="order-status">
							{{row.status==0?'已取消':row.status==2?'待支付':row.status==3?'待发货':
							 row.status==4?'待签收':row.status==5?'已签收':row.status==6?"已完成":""}}
						</text>
					</view>
					<view class="order-list-item">
						<view class="order-info" v-for="(item,itemNum) in row.order_list" :key="itemNum">
							<view class="left">
								<image :src="item.goods_logo"></image>
							</view>
							<view class="right">
								<view class="name">
									{{item.goods_title}}
								</view>
								<view class="spec">{{item.goods_spec}}</view>
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
							<view class="default" @click.stop="cancelOrder(row.order_no,index)">取消订单</view>
							<view class="pay" @tap.stop="toPayment(row.order_no,index)">去付款</view>
						</block>

						<block v-if="row.status==4">
							<view class="default" @click.stop="viewSend(row.order_no,row)">查看物流</view>


						</block>
						<block v-if="row.status==5">
                            <view class="default" @click.stop="viewSend(row.order_no,row)">查看物流</view>
                            
							<view class="default" @click.stop="service(row)">申请售后</view>
							<view class="pay" @click.stop="confirm(row.order_no,row)">确认收货</view>

						</block>
						<!-- 	<block v-if="row.status==3">
							<view class="default" @click.stop="cancelOrder(row.order_no)">取消订单</view>


						</block> -->
						<block v-if="row.status==6&&row.is_coment==0">
							<view class="pay" @click.stop="evalute(row)">去评价</view>
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


		<view class="picker_li" v-if="show_menu">

			<view class="pickbg"></view>
			<view class="btn_c">
				<view class="qx" @tap="cancel">取消</view>
				<view class="sign" @tap="sure" :disabled="isdisabled">确定</view>

			</view>
			<view class="picker_w">
				<view class="return-title">请选择退货原因</view>
				<view class="li_four">

					<view class="li_i" :class="[style4 == item.id ? 'active' : '' ]" v-for="(item,d) in array" :key="d" @tap="showcityfour(item.id,item.name)">
						{{item.name}}
					</view>
				</view>

			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>
<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"

	export default {
		components: {
            uniNavBar,
			uniLoadMore
		},
		data() {
			return {
                height:"",
				style4: "",
				desc: "", //退货描述
				num: "", //取消订单下标
				order: "", //取消订订单编号
				show_menu: false,

				ishow: false,

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
				array: [{
						id: 0,
						name: "我不想买了"
					}, {
						id: 1,
						name: "信息填写错误"
					}, {
						id: 2,
						name: "重新拍"
					},
					{
						id: 3,
						name: "卖家缺货"
					}, {
						id: 4,
						name: "其他原因"
					}
				],
				current_page: 1,
				last_page: "",
				status: "more",
			};
		},
		onReachBottom() {
			this.current_page++
			if (this.current_page > this.last_page) {
				return;
			} else {
				this.requestOrder(this.current_page);
			}
		},
		onLoad(option) {

			//option为object类型，会序列化上个页面传递的参数
			//console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex) + 1;

			this.tabbarIndex = tbIndex;
		//	console.log("onload",this.tabbarIndex)
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
		onShow() {
			this.current_page = 1;
			this.orderList = []
			this.requestOrder(this.current_page)
			
		},

		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			//返回个人中心
			goBack(){
				
				uni.switchTab({

					url:"/pages/tabBar/user"
				})
			},
			//请求订单
			requestOrder(page) {
				this.request({
					url: this.config.url + "member/order",
					method: "post",
					data: {
						token: this.token,
						type: this.tabbarIndex,
						page: page
					},
					success: (res) => {
						//console.log("moun",res)
						if (res.data.code == 1) {
							this.last_page = res.data.data.last_page;
							this.orderList = this.orderList.concat(res.data.data.data)
							this.status = "more";
							if (this.current_page >= this.last_page) {
								this.status = "noMore";
							}
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
			//顶部栏切换
			// showType(tbIndex) {
			// 	this.tabbarIndex = tbIndex;
			// 	this.list = this.orderList[tbIndex];
			// },
			//选中退货原因
			showcityfour(id, name) {
				this.style4 = id;
				this.desc = name;
			},
			ToDetail(id) {
				uni.navigateTo({
					url: "../../detail/detail?id=" + id
				})
			},
			//切换导航栏
			showType(tbIndex) {
			//	console.log(tbIndex)
				this.request({
					url: this.config.url + "member/order",
					method: "post",
					data: {
						token: this.token,
						type: tbIndex
					},
					success: (res) => {
						console.log("moun", res)
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
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			//去付款
			toPayment(order, index) {
				//调起支付接口
				var _this = this;
				this.request({
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
							})
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
				this.num = index;
				this.order = order;

			},
			// 取消
			cancel() {
				this.show_menu = false
			},
			//确认
			sure() {
				if (this.desc) {

					this.show_menu = false
					this.request({
						url: this.config.url + "order/cancle",
						method: "POST",
						data: {
							token: this.token,
							order_no: this.order,
							cancle_desc: this.desc
						},
						success: res => {
							console.log(res)
							this.orderList.splice(this.index, 1)
							if (res.data.code == 1) {
								uni.showToast({
									title: "取消订单成功"
								})
							} else {
								uni.showToast({
									title: "取消订单失败"
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: "请选择退货原因",
						icon: 'none'
					})

				}

				console.log(order, index)
				this.ishow = true;

				// this.request({
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
			confirm(order, row) {
				this.request({
					url: this.config.url + "order/confirm",
					method: "POST",
					data: {
						token: this.token,
						order_no: order,
					},
					success: res => {
						if (res.data.code == 1) {
							var con = JSON.stringify(row)
							console.log("确认收货", res)
							uni.navigateTo({
								url: "/pages/confirm/confirm?con=" + con
							})
						} else {
							uni.showToast({
								title: res.data.info
							})
						}

					}
				})
			},
			//查看物流
			viewSend(order, row) {
				this.request({
					url: this.config.url + "order/express",
					method: "POST",
					data: {

						order_no: order,
					},
					success: res => {
						console.log(res)
						if (res.data.code == 1) {
							var goods = JSON.stringify(row)
							var info = JSON.stringify(res.data.data)
							uni.navigateTo({
								url: "/pages/viewsend/viewsend?info=" + info + "&goods=" + goods
							})
						} else {
							uni.showToast({
								title: res.data.info
							})
						}
					}
				})
			},
			//申请售后
			service(row) {
				uni.navigateTo({
					url: "/pages/serType/serType"
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
				this.request({
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
			},
			//跳转订单
			evalute(item) {
				console.log("item", item)
				var goods = JSON.stringify(item)
				uni.navigateTo({
					url: "/pages/user/keep/sayFeel/sayFeel?eval=" + goods
				})
			}
		}
	}
</script>

<style lang="scss">
	//自定义顶部
	// .custom_top {
	// 	position: fixed;
	// 	width: 100%;
	// 	top: 0;
	// 	background: #fff;
	// 	color: #000;
	// 	z-index: 9999999;
 //        display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	overflow: hidden;
	// 	.back {
	// 		position: absolute;
	// 		left: 20upx;
	// 		width: 18upx;
	// 		height: 30upx;
	// 	}

	// 	.text {
	// 		color: #333;
	// 		font-size: 36upx;
	// 	}
	// }

	//取消订单弹出框

	page {
		background-color: #f3f3f3;
	}

	.topTabBar {
		width: 100%;
		position: fixed;
		top: 128upx;
		z-index: 10;
		background-color: #f8f8f8;
		height: 80upx;
		display: flex;
		justify-content: space-around;

		.grid {
			width: 20%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #444;
			font-size: 28upx;

			.text {
				height: 76upx;
				display: flex;
				align-items: center;

				&.on {
					color: #00C65D;
					border-bottom: solid 4upx #00C65D;
				}
			}

		}
	}

	.order-list {
		
		width: 100%;

		.list {
             padding-top:210upx;
			margin: 0 auto;
			border-top: 20upx solid #F5F5F5;
            overflow-y: auto;
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

				.order-list-item {
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

						display: flex;
						flex-direction: column;
						justify-content: space-around;

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
							font-size: 28upx;

						}

						.price-number {

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





	//地址选出框
	.pickbg {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 98;
	}

	.btn_c {
		position: fixed;
		bottom: 660upx;
		left: 0;
		width: 90%;
		height: 40upx;
		padding: 20upx 5%;
		background: #fff;
		z-index: 99;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.picker_w {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 600upx;
		background: #fff;
		z-index: 99;
		padding: 30upx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.return-title {
		width: 90vw;

		box-sizing: border-box;
		color: #ccc;
		font-size: 28upx;
		display: flex;
		margin-bottom: 40upx;
		justify-content: flex-start;
	}

	.li_four {

		height: 600upx;
		width: 100%;
		overflow-y: auto;
		text-align: center;

		.li_i {
			font-size: 34upx;
			width: 100%;
		}

	}

	.sign {
		background: #C49569;
		font-size: 28upx;
		color: #fff;
		padding: 8upx 24upx;
		border-radius: 10upx;
	}

	.active {
		color: #C49569;
	}

	.li_i {
		font-size: 28upx;
		padding: 20upx;
	}
</style>
