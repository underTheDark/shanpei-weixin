<template>
	<view class="bj-color">
	<view id="serType">
		<view class="service-one">
			<view class="order-num">
				订单编号：{{goods.order_no}}
			</view>
			<view class="list">
				<view class="product" v-for="(item,index) in goods.order_list" :key="index">
					<image :src="item.goods_logo"></image>
					<view class="product-right">
						<view class="product-title">
				               {{item.goods_item}}
						</view>
						<view class="product-size">
							<text>{{item.goods_spec}}</text>
							
						</view>
						<view class="product-price">
							<text>{{item.price_selling}}</text>
							<text>{{item.number}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="return" @click="returnGoods">
			<view class="return-left">
				<text>退</text>
				<text>退款退货</text>
			</view>
			<image src="../../static/img/youce-jiantou.png"></image>
		</view>
		<view class="return exchange" @click="exchange">
			<view class="return-left">
				<text>换</text>
				<text>申请换货</text>
			</view>
			<image src="../../static/img/youce-jiantou.png"></image>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods:{}
			}
		},
		methods: {
			returnGoods(){
				uni.navigateTo({
					url:"/pages/applyReturn/applyReturn"
				})
			},
			exchange(){
				uni.navigateTo({
					url:"/pages/applyChange/applyChange"
				})
			}
		},
		onLoad(option) {
			//console.log(option)
		},
		mounted() {
			uni.getStorage({
				key:"regoods",
				success:(res)=>{
					console.log("regoods",res)
					this.goods=res.regoods;
				}
			})
		}
	}
</script>

<style lang="scss">
	.bj-color{
		height:100vh;
		background:rgba(247,247,247,1);
	}
  #serType{
	 

	  display: flex;
	  flex-direction: column;
  }
  .service-one{
	    padding:0 4% 30upx;
	  width:92%;
	  background:white;
	  display: flex;
	  flex-direction: column;
	  .list{
		  display: flex;
		  flex-direction: column;
	  }
	  .order-num{
		  padding:20upx;
		  font-size: 28upx;
		  color:rgba(102,102,102,1);
	  }
	  .product{
		  display: flex;
		  justify-content: space-between;
		  align-items: center;
		  image{
			  width:180upx;
			  height:180upx;
		  }
		  .product-right{
			  display: flex;
			  flex-direction: column;
			  margin-left:20upx;
			  .product-title{
				  font-size:28upx;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
			  }
			  .product-size{
				  display: flex;
				  align-items: center;
				  margin-top:8upx;
				  font-size: 24upx;
				  text{
					  color:rgba(102,102,102,1);
					  margin-right:30upx;
				  }
			  }
			  .product-price{
				  margin-top: 30upx;
				  display: flex;
				  justify-content: space-between;
				  align-items: center;
				  text{
					  font-size: 24upx;
				  }
				  text:nth-child(1){
					  color:rgba(255,32,27,1);
				  }
				  text:nth-child(2){
					  color:rgba(102,102,102,1);
				  }
			  }
		  }
	  }
  }
  .return{
	    padding:20upx 4% ;
	  width:92%;
	  background:white;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;

	  margin:20upx 0 1upx;
	  .return-left{
		  display: flex;
		  text:nth-child(1){
			  width:33upx;
			  height:33upx;
			  border-radius: 33upx;
			  color:#FF3699FF;
			  border:1px solid #FF3699FF;
			  font-size: 16upx;
			  text-align: center;
			  margin-right:20upx;
		  }
		    text:nth-child(2){
		  			font-size:28upx;
font-family:PingFang-SC-Medium;
font-weight:500;
color:rgba(51,51,51,1);
		  }
	  }
	  image{
		  width:14upx;
		  height:24upx;
	  }
  }
  .exchange{
	  margin:0;
  }
</style>
