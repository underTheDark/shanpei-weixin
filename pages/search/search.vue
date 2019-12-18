<template>
	<view class='search'>
	  <view class='input'>
	    <input class="uni-input" v-model="info"  placeholder-style="color:#999" placeholder="请输入搜索产品" />
	    <icon type='search' color="#999" size='15'/>
	    <text @click="searchInfo()">搜索</text>
	  </view>
	
	  <view class='recommend'>
	    <view class='recommend-text'>搜索推荐</view>
	    <view class='recommend-area'>
	      <view class='recommend-item' @click="searchInfo(item.keyword)" v-for="(item,index) in hisList" :key="index">
			  {{item.keyword}}
		  </view>
	    </view>
	  </view>
	  <view class='history'>
	    <view class='history-text'>
	      <text>搜索历史</text>
	      <text @click="clear">清空历史</text>
	    </view>
	    <view class='history-item' @click="searchInfo(item.keyword)" v-for="(item,index) in goodsList" :key="index">
			{{item.keyword}}
		</view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:"",
				hisList:[],
				goodsList:[],
			}
		},
		methods: {
			//清空历史
			clear(){
				this.request({
					url:this.config.url+"del/keyword",
					method:"post",
					data:{},
					success: (res) => {
						if(res.data.code==1){
							uni.showToast({
								title:res.data.info
							})
							this.goodsList=[]
						}
					}
				})
				
			},
			searchInfo(val){
		        
				var keyword;
				if(val){
					keyword=val
				}else{
					keyword=this.info;
				}
			
				console.log("ke", keyword)
				uni.navigateTo({
					url:"/pages/goods/goods-list?keyword="+keyword
				})
			}
		},
		mounted() {

				this.request({
					method:"post",
					url:this.config.url+"keyword",
					data:{},
					success:res =>{
						console.log(res)
						if(res.data.code==1){
							this.hisList=res.data.data.keyword;
							this.goodsList=res.data.data.history;
						}
					}
				})
			
		}
	}
</script>

<style lang="scss">
page {
  background-color: #eee;
}
.input, .choose, .recommend-text, .recommend-item, .history-item, .history-text {
  background-color: #fff;
  margin-bottom: 1px;
} 

.input {
  position: relative;
  height: 88rpx;
}

.uni-input {
  position: absolute;
  top: 13rpx;
  left: 20rpx;
  padding-left: 70rpx;
  width: 530rpx;
  height: 66rpx;
  border-radius: 33rpx;
  font-size: 22rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  background-color: #eee;
}

.input icon {
  position: absolute;
  left: 40rpx;
  top: 30rpx;
  z-index: 999;
}

.input text {
  position: absolute;
  right: 44rpx;
  top: 30rpx;
  font-size: 30rpx;
  font-family: MicrosoftYaHei;
  font-weight: bold;
}

.choose {
  display: flex;
  flex-direction: row;
}

.choose view {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 88rpx;
  font-size: 30rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #777;
}

.choosed {
  color: #333!important;
}

.choosed::after {
  content: '';
  position: absolute;
  display: block;
  width: 54rpx;
  height: 1px;
  background-color: #333;
  left: 161rpx;
  bottom: 0;
}

.recommend {
  height: 312rpx;
  margin-bottom: 10rpx;
}

.recommend-text {
  padding-left: 21rpx;
  padding-top: 21rpx;
  height: 45rpx;
  font-size: 24rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999;
}

.recommend-area {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
}

.recommend-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 80upx;
  margin-bottom:1px solid #eee;
   box-sizing:border-box;
   background:white;
}

.recommend-area view:nth-child(odd)::after {
  position: absolute;
  right: 0rpx;
  top: 15rpx;
  content: '';
  display: block;
  width: 1px;
  height: 50rpx;
  background-color: #eee;
}

.history-text {
  position: relative;
  height: 66rpx;
  display: flex;
  justify-content: space-around;
  
}

.history-text text:nth-child(1) {
  position: absolute;
  left: 21rpx;
  top: 21rpx;
  font-size: 24rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999;
}

.history-text text:nth-child(2) {
  position: absolute;
  right: 21rpx;
  top: 21rpx;
  font-size: 24rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #333;
}

.history-item {
  display: flex;
  align-items: center;
  padding-left: 20rpx;
  height: 84rpx;
  font-size: 28rpx;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #333;
}

</style>
