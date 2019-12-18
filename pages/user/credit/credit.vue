<template>
	<view class="credit">
		<view class="total-credit">
			<text>我的积分</text>
			<text>{{credit}}</text>
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
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
	export default {
		data() {
			return {
				totalCredit:[],
				credit:{},
				
				
				loading:"more",
				current_page:1 ,
				last_page:"",
				status: "more",
			}
		},
		components: {uniLoadMore},
		onReachBottom(){
			this.current_page++
		if (this.current_page > this.last_page) {
			return;
		} else {
			this.getList(this.current_page);
		}
			
		},
		onLoad(){
			this.getList(this.current_page);
		},
		methods:{
			getList(page){
				
					this.request({
					url:this.config.url+"member/score",
					data:{
						token:this.token,
						page:page
					},
					method:"POST",
					success:(res)=> {
						console.log("res",res);
						if(res.data.code==1){
							this.credit=res.data.data.score.toString();
							this.totalCredit=this.totalCredit.concat(res.data.data.record.data);
							this.last_page=res.data.data.record.last_page;
							this.status = "more";
							if (this.current_page >= this.last_page) {
								this.status = "noMore";
							}
						}
						
					}
				})
						
			}
		}
	}
</script>

<style lang="scss">
  .total-credit{
	  width:100vw;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  background: url(../../../static/img/bg1.png) no-repeat center center;
	  background-size: cover;
	  height:235upx;
	  text:nth-child(1){
		  font-size: 36upx;
		  color:white;
	  }
	  text:nth-child(2){
		  font-size: 30upx;
		  color:white;;
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
			  justify-content: space-around;
			  color:rgba(51,51,51,1);
              font-size: 28upx;
			  text:nth-child(2){
				  font-size: 22upx;
				  margin-top:10upx;
			  }
		  }
		  .recode-right{
			  font-size: 26upx;
		  }
	  }
  }
</style>
