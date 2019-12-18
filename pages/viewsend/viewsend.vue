<template>
	<view id="viewsend">
		<view class="product">
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<view class="row-left">
					<image :src="row.goods_logo"></image>
				</view>
				<view class="row-right">
					<view class="product-title">{{row.goods_title}}</view>
					<view class="product-msg">
						<text>￥{{row.price_selling}}</text>
						<text>x{{row.number}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="people">
			<view class="people-left">
				<image :src="info.fromuser.headimg"></image>
				<view class="people-msg">
					<text>{{info.fromuser.name}}</text>
					<text>{{info.fromuser.phone}}</text>
				</view>
			</view>
			<view class="people-right" @click="callPhone">
				<image src="../../static/img/phone.png"></image>
			</view>
		</view>
		<view class="goods-status">
			<uni-steps :data="status"
			 direction="column" :active="0"
			 active-color="#14CC21"
			 >
			</uni-steps>
		</view>
	</view>
</template>

<script>
	import uniSteps from "@/components/uni-steps/uni-steps.vue"

	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				goodsList: [],
				info:{},
				goods:{},
				status:[],
				phoneNumber:"" ,// 电话号码
			}

		},
		methods: {
            callPhone(){
				uni.makePhoneCall({
                   phoneNumber: this.phoneNumber
})
			}
		},
		onLoad(e) {
			
			this.goods=JSON.parse(e.goods)
			
			this.info=JSON.parse(e.info)
			console.log(this.goods,this.info)
			this.goodsList=this.goods.order_list;
			this.phoneNumber=this.info.fromuser.phone;
			this.express=this.info.express;
			console.log(this.express)
			this.express.forEach((item)=>{
				var  obj={}
				obj.desc=item.create_at
				obj.title=item.content
				this.status.push(obj)
			})
			
		}
	}
</script>

<style lang="scss">
	#viewsend {
		display: flex;
		flex-direction: column;
	}

	.product {
		padding: 0 20upx;
		border-bottom: 20upx solid rgba(247, 247, 247, 1);
		display: flex;
		flex-direction: column;

		.row {
			display: flex;
			padding: 20upx 0;
			border-bottom: 1px solid rgba(230, 230, 230, 1);

			.row-left {
				width: 156upx;
				height: 156upx;

				image {
					width: 156upx;
					height: 156upx;
				}
			}

			.row-right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 30upx;
                 flex: 1;
				.product-title {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(16, 16, 16, 1);
				}

				.product-msg {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 28upx;

					text:nth-child(1) {
						color: rgba(255, 84, 31, 1);
						font-weight: 800;
					}

					text:nth-child(2) {
						color: rgba(16, 16, 16, 1);

					}
				}
			}
		}
	}


	.people {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 4%;

		.people-left {
			display: flex;

			image {
				width: 84upx;
				height: 84upx;
				border-radius: 84upx;
				margin-right: 30upx;
			}

			.people-msg {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 28upx;

				text:nth-child(1) {
					color: rgba(178, 178, 178, 1);
				}

				text:nth-child(2) {
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}

		.people-right {
			width: 65upx;
			height: 65upx;

			image {
				width: 65upx;
				height: 65upx;
			}
		}
	}
	.goods-status{
		margin:60upx 0 0 60upx;
	}
	/deep/.uni-steps-item-circle{
		width:20upx;
		height:20upx;
	}
	/deep/.uni-steps-items.uni-steps-column .uni-steps-item-line{
		width:6upx;
		left:-26upx;
	}
	/deep/.uni-icon-checkbox-filled:before{
		margin-left:5upx;
	}
	/deep/.uni-steps-items{
		overflow: visible;
	}
	/deep/.uni-steps-items.uni-steps-column .uni-steps-item-desc{
		margin-left:-150upx;
		margin-top:-60upx;
		width:100upx;
		height:80upx;
	}
	/deep/.uni-steps{
		margin-left:100upx;
		overflow: visible;
	}
	/deep/.uni-steps-item-title-container{
		margin-bottom:80upx;
	}
   .goods-status .uni-steps-items.uni-steps-column .uni-steps-item-title {
		white-space: wrap;
		width:80%;
		
		overflow: visible;
		
	 }
</style>
