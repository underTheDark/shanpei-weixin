<template>
	<view class="credit">
		<view class="total-credit">
			<text>我的积分</text>
			<text>400</text>
		</view>
		<view class="credit-main">
			<view class="credit-title">
			    积分明细
			</view>
			<view class="credit-recode">
				<view class="recode-left">
					<text>消费赠送</text>
					<text>2333333</text>
				</view>
				<view class="recode-right">+222</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	body{
		background:#cecece;
	}
  .total-credit{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  background: green;
	  height:235upx;
	  text:nth-child(1){
		  font-size: 18upx;
		  color:white;
	  }
	  text:nth-child(2){
		  font-size: 28upx;
		  color: rgba(22,208,255,0.15);
		  margin-top:20upx;
	  }
  }
  .credit-main{
	  margin-top:20upx;
	  display: flex;
	  flex-direction: column;
	  .credit-title{
		  border-bottom:1px solid #cecece;
		  padding:20upx 4%;
		  color:rgba(51,51,51,1);
         font-size: 30upx;
	  }
	  .credit-recode{
		  display: flex;
		  justify-content: space-between;
		  margin:20upx 4%;
		  border-bottom: 1px solid #cecece;
		  .recode-left{
			  display: flex;
			  flex-direction: column;
			  color:rgba(51,51,51,1);
              font-size: 28upx;
			  text:nth-child(2){
				  font-size: 22upx;
			  }
		  }
		  .recode-right{
			  font-size: 26upx;
		  }
	  }
  }
</style>
