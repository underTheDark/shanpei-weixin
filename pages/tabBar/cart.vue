<template>
	<view id="cart">
<!-- 		<view class="status" :style="{position:headerPosition,top:statusTop}"></view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="title">购物车</view>
		</view> -->
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row.id)">
					<view class="icon shanchu"></view>
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)"
				 @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" >
						<!-- <view class="checkbox">
							<view :class="[row.selected?'on':'']"></view>
						</view> -->

						<checkbox class="checkbox" @tap="selected(index)" :checked="row.selected" ></checkbox>

					</view>
					<!-- 商品信息 -->
					<view class="goods-info">
						<view class="img">
							<image :src="row.img"></image>
						</view>
						<view class="info">
							<view class="title"  @tap="toGoods(row)">{{row.name}}</view>
							<view class="spec">{{row.spec}}</view>
							<view class="price-number">
								<view class="price">￥{{row.price}}</view>
								<view class="number">
									<uni-number-box :min="1" :value="row.number" @change="bindChange(index,row,$event)"></uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 脚部菜单 -->
		<view class="footer" :style="{bottom:footerbottom}">
			<view class="checkbox-box">
				<view class="checkbox">
					<checkbox :checked="isAllselected" @tap="allSelect"></checkbox>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="delBtn" @tap="deleteList" v-if="selectedList.length>0">删除</view>
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view>
				</view>
				<view class="btn" @tap="toConfirmation"> 提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
		import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	
	export default {
		components:{
			uniNumberBox,
		},
		data() {
			return {
				sumPrice: '0.00',
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				selectedList: [],
				isAllselected: false,
				goodsList: [],
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		// onPageScroll(e) {
		// 	//兼容iOS端下拉时顶部漂移
		// 	this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		// 	this.headerTop = e.scrollTop >= 0 ? null : 0;
		// 	this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		// },
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad() {
			
			//兼容H5下结算条位置
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
			// #endif
			// #ifdef APP-PLUS
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
			//分享页面 
		onShareAppMessage: function() {
			var that = this;
			return {
				title: '快来看一看啊！',
				path: '/pages/tabBar/cart',
			}
		},
		methods: {
			
		
			//加入商品 参数 goods:商品数据
			joinGoods(goods) {
				/*
				 * 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				 * 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				 * 一般商城购物车的增删改动作是由后端来完成的,
				 * 后端记录后返回前端更新前端缓存
				 */
				let len = this.goodsList.length;
				let isFind = false; //是否找到ID一样的商品
				for (let i = 0; i < len; i++) {
					let row = this.goodsList[i];
					if (row.id == goods.id) { //找到商品一样的商品
						this.goodsList[i].number++; //数量自增
						isFind = true; //找到一样的商品
						break; //跳出循环
					}
				}
				if (!isFind) {
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.goodsList[i].unshift(goods);
				}
			},
			//控制左滑删除效果-begin
			touchStart(index, event) {
				console.log(index,event,"start")
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			touchMove(index, event) {
				console.log(index,event,"move")
				//多点触控不触发
				if (event.touches.length > 1) {
					this.isStop = true;
					return;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
                console.log(moveX,moveY)
				if (this.isStop || Math.abs(moveX) < 5) {
					return;
				}
				if (Math.abs(moveY) > Math.abs(moveX)) {
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}

				if (moveX < 0) {
					console.log("movex<0")
					this.theIndex = index;
					this.isStop = true;
				} else if (moveX > 0) {
					console.log("movex>0")
					if (this.theIndex != null && this.oldIndex == this.theIndex) {
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(() => {
							this.oldIndex = null;
						}, 150)
					}
				}
			},
			touchEnd(index, event) {
				console.log(index,event,"end")
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end


			//商品跳转
			toGoods(e) {
				uni.showToast({
					title: '商品' + e.goods_id,
					icon: "none"
				});
				uni.navigateTo({
					url: '../goods/goods?id='+e.goods_id,
				});
			},
			//跳转确认订单页面
			toConfirmation() {
			   //  console.log(this.goodsList)
				 if(this.goodsList.length>0){
					  let data={};
					 let arr=[]
					 this.goodsList.forEach(item=>{
					 					 if(item.selected){
					 						 let obj={
					 							 goods_id:item.goods_id,
					 							 goods_number:item.number,
					 							 goods_spec:item.goods_spec,
					 						 }
					 						 arr.push(obj);
					 					 }
					 })
					// console.log("data",data);
					 data.isCart = 1;
					 data.goods = arr;
					 uni.setStorage({
					 	key:"cart",
					 	data:data,
					 	success: () => {
					 		
					 	}
					 })
					 uni.navigateTo({
					 	url:"/pages/order/confirmation?iscart=2"
					 })
				 }else{
					 uni.showToast({
					 	title:"还没有商品哟"
					 })
				 }
				
			},
			//删除商品
			deleteGoods(id) {
				let len = this.goodsList.length;
				for (let i = 0; i < len; i++) {
					if (id == this.goodsList[i].id) {
						this.goodsList.splice(i, 1);
						break;
					}
				}
				this.selectedList.splice(this.selectedList.indexOf(id), 1);
				this.sum();
				this.oldIndex = null;
				this.theIndex = null;
				// 删除购物车后台；
				this.delCart(id);
			},
			// 删除购物车
			delCart(id){
					this.request({
						method:"post",
						data:{
							token:this.token,
							id:id,
						},
						url:this.config.url+"member/del_car",
						success:function(res){
							// console.log("res",res);
						},
					})
				
			},
			// 删除商品
			deleteList() {
				let len = this.selectedList.length;
				// console.log(this.selectedList);
				while (this.selectedList.length > 0) {
					this.deleteGoods(this.selectedList[0]);
				}
				this.selectedList = [];
				this.isAllselected = this.selectedList.length == this.goodsList.length && this.goodsList.length > 0;
				this.sum();
			},
			// 选中商品
			selected(index) {
				this.goodsList[index].selected = this.goodsList[index].selected ? false : true;
				let i = this.selectedList.indexOf(this.goodsList[index].id);
				i > -1 ? this.selectedList.splice(i, 1) : this.selectedList.push(this.goodsList[index].id);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
				if(this.selectedList.length==this.goodsList.length){
					this.isAllselected=true;
				}
				this.sum();
			},
			//全选
			allSelect() {
				let len = this.goodsList.length;
				let arr = [];
				for (let i = 0; i < len; i++) {
					this.goodsList[i].selected = this.isAllselected ? false : true;
					arr.push(this.goodsList[i].id);
				}
				this.selectedList = this.isAllselected ? [] : arr;
				this.isAllselected = this.isAllselected || this.goodsList.length == 0 ? false : true;
				// console.log("this.selectedList",this.selectedList);
				this.sum();
			},
			// 改变数量
			bindChange(index,row,val){
				// console.log("row.number",row.number);
				// console.log("val",val);
				//增加 
				if(val>row.number){
					this.add(index);
					this.changeNum(row.id,1);
				}
				//减少 
				if(val<row.number){
					this.sub(index);
					this.changeNum(row.id,2);
				}
			},
			// 改变数量后台
			changeNum(id,type){
				this.request({
					method:"post",
					data:{
						token:this.token,
						id:id,
						type:type
					},
					url:this.config.url+"member/resume_car",
					success:function(res){
						//console.log("res",res);
					},
				})
			},
			// 减少数量
			sub(index) {
				if (this.goodsList[index].number <= 1) {
					return;
				}
				this.goodsList[index].number--;
				this.sum();
			},
			// 增加数量
			add(index) {
				this.goodsList[index].number++;
				this.sum();
			},
			// 合计
			sum(e, index) {
				this.sumPrice = 0;
				let len = this.goodsList.length;
				// console.log("len",len);
				// console.log("e",e);
				// console.log("index",index);
				for (let i = 0; i < len; i++) {
					if (this.goodsList[i].selected) {
						if (e && i == index) {
							this.sumPrice = this.sumPrice + (e.detail.value * this.goodsList[i].price);
						} else {
							this.sumPrice = this.sumPrice + (this.goodsList[i].number * this.goodsList[i].price);
							// console.log("this.sumPrice",this.sumPrice);
						}
					}
				}
				this.sumPrice = this.sumPrice.toFixed(2);
				// console.log(this.sumPrice)
			},
			discard() {
				//丢弃
			}
			
        },
		onShow(){
			// 获取购物车信息
			this.isAllselected=false;
			let that=this;
			this.request({
				method:"post",
				data:{
					token:this.token
				},
				url:this.config.url+"member/car",
				success:function(res){
					// console.log("data",res.data);
					if(res.data.code==1){
						that.goodsList=res.data.data;
						that.goodsList.forEach(item=>{
							item.spec=item.goods_spec;
							item.img=item.logo;
							item.name=item.title;
							item.selected=false;
						})
						
					}else{
						uni.showToast({
							icon:'none',
							title:"请求失败"
						})
					}
					
				}
			})
		},
		mounted() {
			
		}
	}
</script>
<style lang="scss">
	page {
		position: relative;
	}

	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOEAAsAAAAAB7wAAAM1AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqDAIJNATYCJAMQCwoABCAFhG0HPhu1BsiOw7jha84s8T+CgOyq6unevTlAeAkRhAhQBjj8eJfmMg/oB5whSgaFspy7AqbpwE3Py3/j9j+X07uGyFHr21lua9HYi9rUCzDeGtBYmw4o0AJJ0BvGLmiJxyEAC3yIQhSVPL9BF4U5TgBi7ChtQzfjQKFYWEdgrFiqEBsxoGurtMfAhuD74g8JQgcNg8ScWjf8xoPz7/nfD8iFpoV0eQi86XQAWwUSiAIUiJGVhgEaUSAKiYXau0kKoKOjwVRthd8PmExIBRvmWH95INCQIIyYqVYAJKGghO/5Dg4B3wtxaPD9QAoS4IOM1gEzYBbAMkT16iIQGPxsopS5ScAcK23LiaBDpzyk1aGLHtsvhVrL7adDD55016wPXnDfcr7T3lcE2TVcP2fNhZM7WeiEhVp44vx9C5vVD6+eEgaLTZvEot3HL1lawlnXLK3XnISDllbWwmrmGjlRLdxq2bpme1RAeqXtzWh6g0F//wCCnRiN2diwr2+Yse3iEs20g05Q5tT0BikOXwKf79vsoEvb6p6xjVhHP92nwDJmX+9hwsf26dXbPiNvZ/98x67/+5T+ev0aWxbXCwOX41zLxia+O73B6Y57fN1u6GvN+Zmbc8XITigTAcB0Rl6X8QB4hDgEpoXypZz2q37D5FVnVa9t1n/dUgHw8uKMq9BmWqjoJoP3zevM+zG8jmVKE5hKpRShw9WTFZW04D7TscAC+B0RcOD9FHLnzqkg0HFOQMMMb5DoBKGKGgUGLEkCIzq5YEEkpastcWQyDYQyByJYBkBgx2nQsOEaSOx4girqOzDgwj8wYickWNAiHLe0JESMsiicTLaQh84PBm6WKlst/TD9hXQV25wWBLQP4jJw435MXD58RynxFDPKT30golBxluAtOI3iOMOcs5Bc2fFF8sPd2OFVBO24WQJ9CmEIG4HwQAb4ARmFS0aK8qoL/cLnXyA0FTE23FBSZf+AYEqCzpF4YojrgN5J004lt/LKFD7RHDAVQYEMh8lIQErAICImJgOZWD0ohHARdhg5wJdzSKxVaXhX6c7y8uQN1wAWmLOU0IQUShiQo0fZTceadqaMdP2uXwEAAAAA') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.jia {
			&:before {
				content: "\e641";
			}
		}

		&.jian {
			&:before {
				content: "\e643";
			}
		}

		&.shanchu {
			&:before {
				content: "\e6a4";
			}
		}

	}

	  /* #ifdef H5 */
    

	   checkbox .uni-checkbox-input {
			
			border-radius: 50%;
		}
	    checkbox .uni-checkbox-input.uni-checkbox-input-checked{
          color:#fff!important;
          background: green;
       }
	   checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
		  font-size: 25upx;
	   }

   	/* #endif */
	/* #ifdef APP-PLUS || MP-WEIXIN */
	      checkbox .wx-checkbox-input {
	   			
	   			border-radius: 50%;
	   		}
	    checkbox .wx-checkbox-input.wx-checkbox-input-checked{
	      color:#fff!important;
	      background: green;
	   }
	   checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
	   		  font-size: 30upx;
	   }
	/* #endif */

	.carrier {
		diplay: flex;
		align-items: center;
	}
	.checkbox-box {
		display: flex;
		align-items: center;
		.checkbox {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}

	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;

		.tis {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}

		.row {
			width: calc(96%);
			height: calc(22vw + 40upx);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					// font-size: 25upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.checkbox-box {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;
                    border-bottom: 1px solid #cecece;
					padding:60upx 0;
					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;

						image {
							width: 22vw;
							height: 22vw;
						}
					}

					.info {
						width: 100%;
						height: 23vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;
                        
						.title {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}

						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}

						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							font-size: 28upx;
							height: 60upx;
							
                             .uni-numbox[data-v-5fc0e502]{
								 width:140upx;
								 height:50upx;
								 display: flex;
								 align-items: center;
								
							 }
							  .uni-numbox--disabled{
							 		line-height:100%;
							 }
							 .uni-numbox__minus, .uni-numbox__plus{
							 									 line-height: 100%;
							 }
							 .uni-numbox__value[data-v-5fc0e502]{
							 									 display:flex;
							 									 justify-content: center;
							 									 align-items: center;
							 }
							.price {}

							.number {
								display: flex;
								justify-content: center;
								margin-right:3upx;
                                   

							}
						}
					}
				}
			}
		}
	}

	.footer {
		width:98%;
		padding-left: 2%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
        .checkbox{
			margin-left:10upx;
		}
		.delBtn {
			border: solid 1upx rgba(20,204,33,1);
			color: rgba(20,204,33,1);
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 60%;
			height:100upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 30upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
					color:rgba(255,32,27,1);
				}
			}

			.btn {
				padding: 0 30upx;
				width:180upx;
				height:100%;
				background:rgba(20,204,33,1);
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;

			}
		}
	}
</style>
