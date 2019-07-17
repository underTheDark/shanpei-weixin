<template>
	<view class="credit">
		<view class="total-credit">
			<text>我的积分</text>
			<text>{{credit.score}}</text>
		</view>
		<view class="credit-main">
			<view class="credit-title">
			    积分明细
			</view>
			
			<view class="credit-recode" v-for="(row,index) in totalCredit" :key="index">
				<view class="recode-left">
					<text>消费赠送</text>
					<text>{{row.create_at}}</text>
				</view>
				<view class="recode-right">+{{row.score}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalCredit:[],
				credit:{},
				
			}
		},
		methods: {
			
		},
		mounted(){
			var _this=this;
			uni.request({
				url:this.config.url+"member/score",
				data:{
					token:this.token
				},
				method:"POST",
				success:(res)=> {
					console.log(res)
					if(res.data.code==1){
						_this.credit=res.data.data
						_this.totalCredit=res.data.data.recode.data
					}
					
				}
			})
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
	  
	  height:235upx;
	  text:nth-child(1){
		  font-size: 30upx;
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
