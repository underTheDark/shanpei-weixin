<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="orderList.length==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in orderList" :key="index">
					<view class="type">
					     <text class="order-num">订单编号：{{row.order_no}}</text>
					     <text class="order-status">
						     {{row.status==0?'已取消':row.status==2?'待付款':row.status==3?'待发货':
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
						<view class="number">共{{}}件商品</view>
						<view class="sum">合计￥
						     <view class="price">{{row.price_total}}</view>
						</view>
						
					</view>
					<view class="btns">
						<block v-show="row.status==2 ">
							<view class="default">取消订单</view>
						    <view class="pay" @tap="toPayment(row)">去付款</view>
						</block>
						
						<block  v-show="row.status==4">
							<view class="default" @click="viewSend()">查看物流</view>
							<view class="default" @click="service()">申请售后</view>
							<view class="pay" @click="confirm()">确认收货</view>
							
						</block>
						<block  v-show="row.status==3">
							<view class="default" @click="cancelOrder()">取消订单</view>
							
							
						</block>
						<block  v-show="row.status==5"><view class="pay" @click="evalute()">去评价</view></block>
						<!-- <block  v-show="row.status=='completed'"><view class="default">再次购买</view></block> -->
						<!-- <block  v-show="row.status=='refunds'"><view class="default">查看进度</view></block> -->
						<block v-show="row.status==0"><view class="default" @click="deleteOrder()">删除订单</view></block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				headerPosition:"fixed",
				headerTop:"0px",
				typeText:{
					unpaid:'等待付款',
					back:'等待商家发货',
					unreceived:'商家已发货',
					received:'等待用户评价',
					completed:'交易已完成',
					refunds:'商品退货处理中',
					cancelled:'订单已取消'
				},
				orderType: ['全部','待付款','待发货','待收货','已完成'],
				//订单列表 演示数据
				orderList:[],
				list:[],
				tabbarIndex:0
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			let tbIndex = parseInt(option.tbIndex)+1;
			
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
		},
		mounted(){
			uni.request({
			    url:this.config.url+"member/order",
				method:"post",
				data:{
					token:this.token,
					type:this.tabbarIndex
				},
				success:(res) => {
					console.log("moun",res)
					if(res.data.code==1){
						
						this.orderList=res.data.data.data
					}
				}
			})
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			//去付款
			toPayment(row){
		
			},
			//取消订单
		    cancelOrder(){
				
			},
			//确认收货
			confirm(){
				
			},
			//查看物流
			viewSend(){
				
			},
			//申请售后
			service(){
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	background-color: #f8f8f8;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.grid{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		
		margin: 0 auto;
		border-top:20upx solid #F5F5F5;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			border-bottom:1px solid #F5F5F5;
			.type{
				font-size: 26upx;
				
				height: 50upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom:1px solid #F5F5F5;
				.order-num{
					font-size:28upx;
					color: #333333;
				}
				.order-status{
					color:#14CC21;
				}
			}
			.order-list{
				display: flex;
				flex-direction: column;
				width:100%;
			}
			.order-info{
				width: 100%;
				display: flex;
				padding:20upx 0;
				border-bottom: 1px solid #F5F5F5;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 22upx;

					}
					.price-number{
						position: absolute;
						bottom: 0;
						width: 100%;
						display: flex;
						justify-content: space-between;
						font-size: 22upx;
						color: #333;
						
						.price{
							font-size: 28upx;
						
						}
						.number{
							color:#ccc;
							font-size: 23upx;
						}
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				padding:20upx 0;
				font-size: 22upx;
				color:#555555;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: center;
					.price{
						font-size: 30upx;
						color:#333
					}
				}
				
			}
			.btns{
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
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
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx #14CC21;
					color: #14CC21;
				}
			}
		}
	}
}
</style>
