<template>
	<view id="detail">
		<view class="detail-head">
			<view>{{status[order.status]}}</view>
			<view v-if="down">{{status2[order.status]}}</view>
			<view v-if="!down">
				{{string}}
			</view>
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
					<image :src="row.goods_logo"></image>
					<view class="row-right">
						<view class="product-title">{{row.goods_title}}</view>
						<view class="product-msg">
							<text>{{row.price_selling}}</text>
							<text>{{row.number}}</text>
						</view>
					</view>
				</view>
				<view class="money">
					<view>
						<text>商品总额</text>
						<text>{{order.price_goods}}</text>
					</view>
					<view>
						<text>运费</text>
						<text>￥{{order.price_express}}</text>
					</view>
				</view>
				<view class="pay-amount">
					<text>应付款</text>
					<text>{{order.price_total}}</text>
				</view>
			</view>
			<!-- 代付款 -->
			<view v-if="order.status == 2">
				<view class="detail-main-three">
					<view class="three-title">
						订单信息
					</view>
					<view class="three-main">
						<view>订单编号：{{order.order_no}}</view>
						<view>创建时间：{{order.create_at}}</view>
					</view>
				</view>
				<view class="detail-main-four">
					<view class="order-status" >
						<view class="status-one">
							取消订单
						</view>
						<view class="status-two">去付款</view>
					</view>
						
				</view>
			</view>
			
			
			<!-- 待发货 -->
			<view v-if="order.status == 3">
				<view class="detail-main-three">
					<view class="three-title">
						订单信息
					</view>
					<view class="three-main">
						<view>订单编号：{{order.order_no}}</view>
						<view>创建时间：{{order.create_at}}</view>
						<view>支付方式：微信支付</view>
						<view>付款时间：{{order.pay_at}}</view>
					</view>
					
				</view>
				<view class="detail-main-four">
					<view class="order-status" >
				
					<view class="status-two">取消订单</view>
					</view>
				</view>
			</view>
			
			<!-- 待收货 -->
			<view v-if="order.status == 4">
				<view class="detail-main-three">
					<view class="three-title">
						订单信息
					</view>
					<view class="three-main">
						<view>订单编号：{{order.order_no}}</view>
						<view>创建时间：{{order.create_at}}</view>
						<view>支付方式：微信支付</view>
						<view>付款时间：{{order.pay_at}}</view>
					</view>
				</view>
				<view class="detail-main-four">
					<view class="order-status" >
						<view class="status-one" @click="cancelOrder()">
							取消订单
						</view>
						<view class="status-two">确认收货</view>
					</view>
					
						
				</view>
			</view>
			
			<!-- 已完成 -->
			<view v-if="order.status == 5">
				<view class="detail-main-three">
					<view class="three-title">
						订单信息
					</view>
					<view class="three-main">
						<view>订单编号：{{order.order_no}}</view>
						<view>创建时间：{{order.create_at}}</view>
						<view>支付方式：微信支付</view>
						<view>付款时间：{{order.pay_at}}</view>
					</view>
				</view>
				<view class="detail-main-four">
					<view class="order-status" >
						<view class="status-one">
							删除订单
						</view>
						<view class="status-two">去评价</view>
					</view>						
				</view>
			</view>
			
			</view>
			
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"

	export default {
		data() {
			return {
				order_no:'',
				down:true,
				hour:"",
				minute:"",
				miao:"",
				string:"",
				order:'',
				status:["已取消","等待买家付款","等待买家付款","订单待发货","订单待收货","订单已完成"],
				status2:["已取消","剩12小时50分钟自动关闭","剩12小时50分钟自动关闭","请耐心等候哦~","宝贝正在努力的向您奔跑~","欢迎您的再次光临！"],
				goodsList: [
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
				],
				datatime:"",
			}
		},
		components: {uniCountdown},
		onLoad(e){
			console.log("e",e.id);
			this.order_no = e.id;
			uni.request({
				url:this.config.url+'order/detail',
				method: 'POST',
				data: {
					order_no:this.order_no,
					token:this.token
				},
				success: res => {
					console.log("res",res);
					if(res.data.code == 1){
						this.goodsList = res.data.data.order_list;
						this.order = res.data.data;
						let datatime=res.data.data.create_at;
						this.getDistanceTime(datatime);
						setInterval(()=>this.getDistanceTime(datatime),1000);
						if(this.order.status == 2){
							this.down = false;
						}
					}
				},
			});
			
		},
		methods: {
			getDistanceTime(time){
				let _this=this;
				var endTime= new Date(Date.parse(time.replace(/-/g, "/")));/*replace将时间字符串中所有的'-'替换成'/',parse将时间格式的字符串转换成毫秒*/
				var nowTime = new Date();
				let m = 60*1000*60*24;
				var distance =endTime.getTime()+ m - nowTime.getTime();/*getTime把一个date对象转换成毫秒*/

				var day = 0;
				var hour = 0;
				var minute = 0;
				var second = 0;

				if(distance >= 0){
					day = Math.floor(distance/1000/60/60/24);
					hour = Math.floor(distance/1000/60/60%24);
					minute = Math.floor(distance/1000/60%60);
					second = Math.floor(distance/1000%60);
				}else{
					_this.string="已取消"
				}

				_this.string =  hour + "时" + minute + "分" + second + "秒";
			},
			
			//取消订单
			 cancelOrder(){
				console.log(order)
				uni.request({
					url:this.config.url+"order/cancle",
					method:"POST",
					data:{
						token:this.token,
						order_no:this.order_no,
					},
					success:res =>{
						//console.log(res)
					}
				})
			},
		},
		
		
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
					flex: 1;
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
						width:100%;
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
