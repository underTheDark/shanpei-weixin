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
					<image src="../../static/img/category/dingwei.png"></image>
				</view>
				<view class="one-right">
					<view>收货人：{{order.express_name}} &nbsp;&nbsp;{{order.express_phone}}</view>
					<view>
						收货地址：{{order.express_province}}{{order.express_city}}{{order.express_area}}
					{{order.express_street}}{{order.express_address}}
					</view>
				</view>
			</view>
			<view class="detail-main-two">
				<view class="row" v-for="(row,index) in goodsList" :key="index">
					<image :src="row.goods_logo"></image>
					<view class="row-right">
						<view class="product-title">{{row.goods_title}}</view>
						<view class="product-msg">
							<text>￥{{row.price_selling}}</text>
							<text>x{{row.number}}</text>
						</view>
					</view>
				</view>
				<view class="money">
					<view>
						<text>商品总额</text>
						<text>￥{{order.price_goods}}</text>
					</view>
					<view>
						<text>运费</text>
						<text>￥{{order.price_express}}</text>
					</view>
				</view>
				<view class="pay-amount">
					<text>应付款</text>
					<text>￥{{order.price_total}}</text>
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
						<view class="status-one"  @click.stop="cancelOrder()">
							取消订单
						</view>
						<view class="status-two" @click="toPayment">去付款</view>
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
				
					<!-- <view class="status-two"  @click.stop="cancelOrder()">取消订单</view> -->
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
						<!-- <view class="status-one" @click.stop="cancelOrder()">
							取消订单
						</view> -->
						<view class="status-two" @click.stop="confirm()">确认收货</view>
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
						<view class="status-one" @click="deleteOrder()">
							删除订单
						</view>
						<view class="status-two" @click="evalute">去评价</view>
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
	</view>
</template>

<script>
	import uniCountdown from "@/components/uni-countdown/uni-countdown.vue"

	export default {
		data() {
			return {
				style4:"",
				desc:"",   //退货描述
				array: [{id:0,name:"我不想买了"},{id:1,name:"信息填写错误"},{id:2,name:"重新拍"},
				{id:3,name:"卖家缺货"},{id:4,name:"其他原因"}],  
				
				show_menu: false,
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
				console.log(12222)
				 this.show_menu = true;
				 
			},
			// 退货取消
			cancel(){
				this.show_menu=false
			},
			//确认
			sure(){
				if(this.desc){
					
					this.show_menu=false
					uni.request({
						url:this.config.url+"order/cancle",
						method:"POST",
						data:{
							token:this.token,
							order_no:this.order_no,
							cancle_desc:this.desc
						},
						success:res =>{
							console.log(res)
							
							if(res.data.code==1){
								uni.showToast({
									title:"取消订单成功"
								})
								uni.navigateTo({
									url:"/pages/user/order_list/order_list?tbIndex="+1
								})
								
							}else{
								uni.showToast({
									title:"取消订单失败"
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:"请选择退货原因",
						icon:'none'
					})
					
				}
			},
			//确认收货
			confirm(){
				uni.request({
					url:this.config.url+"order/confirm",
					data:{
						token:this.token,
						order_no:this.order_no
					},
					method:"post",
					success(res) {
						console.log(res)
						uni.navigateTo({
							url:"pages/confirm/confirm"
						})
					}
				})
			},
				//删除订单
			deleteOrder() {
				uni.request({
					url: this.config.url + "order/del",
					method: "POST",
					data: {
						token: this.token,
						order_no: this.order_no,
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
			evalute(){
				uni.navigateTo({
					url:"/pages/user/keep/sayFeel/sayFeel"
				})
			},
            showcityfour(id,name){
           	this.style4=id;
           	this.desc=name;
           },
		   //去付款
		   toPayment() {
		   	//调起支付接口
		   	var _this = this;
		   	uni.request({
		   		url: this.config.url + "order/pay",
		   		method: "POST",
		   		data: {
		   			token: this.token,
		   			order_no: this.order_no
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
							
		   						
		   						uni.showToast({
		   							title: "支付成功",
		   
		   						})
									//跳转我的订单
								uni.navigateTo({
									url:"/pages/user/order_list/order_list?tbIndex="+1
								})
		   					},
		   					fail: function(err) {
		   						//console.log('fail:' + JSON.stringify(err));
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
		},
		mounted(){
			console.log(this.order_no)
		}
		
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
				width: 29upx;
				height: 36upx;
				
			}

			image {
				width: 29upx;
				height: 36upx;
				
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
		 //地址选出框
	 .pickbg{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 98;
	}
	.btn_c{
		position: fixed;
		bottom:660upx;
		left: 0;
		width:90%;
		height: 40upx;
		padding:20upx 5%;
		background: #fff;
		z-index: 99;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.picker_w{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height:600upx;
		background: #fff;
		z-index: 99;
		padding:30upx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	 .return-title{
		 width:90vw;
		 
		 box-sizing: border-box;
	 	color:#ccc;
	 	font-size: 28upx;
	 	display: flex;
	 	margin-bottom: 40upx;
	 	justify-content: flex-start;
	 }
	.li_four{
		
		height:600upx;
		width:100%;
		overflow-y: auto;
		text-align: center;
		.li_i{
			font-size: 34upx;
			width:100%;
		}
		
	}
	.sign{
		background: #C49569;
		font-size: 28upx;
		color: #fff;
		padding:8upx 24upx;
		border-radius: 10upx;
	}
	.active{
		color:#C49569;
	}
	.li_i{
		font-size: 28upx;
		padding: 20upx;
	}
</style>
