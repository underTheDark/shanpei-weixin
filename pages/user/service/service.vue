<template>
	<view>
		<view class="place"></view>
		<view class="service-list" v-for="(item,index) in goodsList" :key="index">
			<view class="service-one">订单编号：{{item.order_no}}</view>
			<view class="service-two">
				<view class="list" v-for="(row,num) in item.order_list" :key="num">
					<view class="service-two-left">
						<image :src="row.goods_logo"></image>
					
					</view>
					<view class="service-two-right">
						<text>
							{{row.goods_title}}
						</text>
						<view class="price-num">
							<text class="price">{{row.goods_spec}}</text>
							<text>x{{row.number}}</text>
						</view>
					</view>
				</view>
				
			</view>
			<view class="service-three">
				<text>退</text>
				<text>{{item.refund_type==1?"退货退款":item.refund_type==2?"换货":""}}</text>
				<text>{{item.refund_state==0?"未退款":item.refund_state==1?"待退款":item.refund_state==2?"已退款":""}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                  goodsList:[]
			}
		},
		methods: {

		},
		mounted(){
			this.request({
				url:this.config.url+"order/service",
				method:"POST",
				data:{
					token:this.token,
					
				},
				success:res=>{
					console.log(res)
					if(res.data.code==1){
						this.goodsList=res.data.data.data;
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	html {
		background: rgba(245, 245, 245, 1);

	}
    .place {
    	border-top:1px solid #F5F5F5;
    }
	.service-list {
		display: flex;
		flex-direction: column;

		border-bottom: 20upx solid rgba(245, 245, 245, 1);
		background: white;

		.service-one {
			display: flex;
			align-items: center;
			padding: 20upx 4%;
			font-size: 28upx;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			width: 92%;


		}

		.service-two {
			display: flex;
			flex-direction: column;
			width:100%;
            .list{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10upx 4%;
				background: rgba(245, 245, 245, 1);
			}
			.service-two-left {
				margin-right:20upx;
				image {
					width: 180upx;
					height: 180upx;

				}
			}

			.service-two-right {
				display: flex;
				flex-direction: column;
                width:100%;
				text {

					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);

				}

				.price-num {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 20upx;

					text {
						color: rgba(102, 102, 102, 1);
						font-size: 24upx;
					}
				}
			}
		}

		.service-three {
			display: flex;
			padding: 20upx 4%;
			width: 92%;

			text {
				font-size: 28upx;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-right: 20upx;
			}

			text:nth-child(1) {
				width: 31upx;
				height: 31upx;
				border: 1px solid red;
				border-radius: 31upx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: red;
			}
		}
	}
</style>
