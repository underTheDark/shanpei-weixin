<template>
	<view classs='container'>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<!-- <view class="box" @tap="share">
					<view class="icon fenxiang"></view>
					<view class="text">分享</view>
				</view>
				<view class="box" @tap="toChat">
					<view class="icon kefu"></view>
					<view class="text">客服</view>
				</view> -->
				<view class="box" @tap="keep">
					<view class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
				<view class="box " @click="skipCart">
					<view class="icon">
						<image src="../../static/img/category/cart.png"></image>
					</view>
					<view class="text">购物车</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">选择规格</view>
				<!-- <view class="buy" @tap="buy()">立即购买</view> -->
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/img/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/img/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>

		</view>
		<!-- 服务-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @touchmove.stop.prevent="discard" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideService">完成</view>
				</view>
			</view>
		</view>
		<!-- 规格-   模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->

			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="product-title">
						<image :src="goodsData.logo" />
						<view class="product-mes">
							<text>{{goodsData.price}}</text>
							<text>{{goodsData.number_stock}}</text>
						</view>
						<view class="hidden"  @tap="hideSpec">x</view>
					</view>
				
					<view class="pro-content" v-for="(gui,index) in guiList" :key="index">
						    <h2 @click="addTitle(index)">{{gui.name}}</h2>
					        <view  class="product-color">
								<text @click="addColor(gui,gui.list,color,colorIndex)" v-for="(color,colorIndex) in gui.list" :key="colorIndex" :class="{checked:color.checked}">
									 {{color.name}}
								</text>
							</view>
						
					</view>
					<view class="product-num">
						<text>数量</text>
						<view>
							<uni-number-box :min="1" :value="proNum" @change="bindChange"></uni-number-box>
						</view>
					</view>
				</view>

				<view class="spec-btn">
					<view class="cancelB" @click="cancel()">加入购物车</view>
					<view class="confirmB" @tap="buy()">立即购买</view>
				</view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="(swiper,index) in swiperList" :key="index">
					<image class="swiperimage" :src="swiper" @tap="toSwiper(swiper)"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="title">
				{{goodsData.title}}
			</view>

			<view class="product-info">
				<view class="info">
					<text>￥{{goodsData.price}}</text>
					<text>￥{{goodsData.market_price}}</text>
				</view>
				<view class="evaluate">
					<view class="evaluate-num">销量{{goodsData.number_sales}}</view>
					<view class="evaluate-good">好评{{goodsData.good_percent}}%</view>
				</view>
			</view>

		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row">
				<view class="add-color">库存</view>
				
				<view class="resdius-num">{{goodsData.number_stock}}</view>
			</view>
			<view class="row" @tap="showSpec(false)">
				<!-- <view class="text">选择</view>
				<view class="content">
					<view>选择规格：</view>
					<view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
					
				</view> -->
				<view class="add-color">规格</view>
				<view class="icon xiangyou"></view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">评价 ({{goodsData.comment_num}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						更多

					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings" v-for="(commentList,index) in comment" :key=index>
				<view class="user-info">
					<view class="comment-user-info">

						<view class="people-icon">
							<image :src="goodsData.comment[0].member.heading" class="people-icon" />
						</view>
						<view class="star">
							<view class="star-name">{{goodsData.comment[0].member.nickname}}</view>
							<view>
							     <uni-rate size="20" disabled="true" :value="goodsData.comment[0].comment_star"></uni-rate>
							</view>
						</view>
					</view>
					<view class="comment-time">
						{{goodsData.comment.create_at}}
					</view>
				</view>
				<view class="content">
					{{goodsData.comment[0].comment_content}}
				</view>
				<view class="product-icon">
					<view class="img" v-for="(src,iconNum) in evaImg" :key="iconNum">
						<image :src="src"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="title"> 商品详情 </view>
			<view class="product-detail">
				<view >
					<text>产品</text>
					<text>特点</text>
				</view>
				<view class="product-dec" v-html="detail">
					<!-- <rich-text :nodes="detail"></rich-text> -->
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="recomment" >
			<view class="recomment-title ">推荐商品</view>
			<view class="recomment-contain">
				<view class="recomment-list" @click="gotui(tui.id)" v-for="(tui,tuiIndex) in tuiList" :key="tuiIndex">
					<view class="recomment-list-left">
						<image :src="tui.logo"></image>
					</view>
					<view class="recomment-list-right">


						<view class="product-name">
							{{tui.title}}
						</view>
						<view class="product-eval">
							<view class="hot-product" v-show="tui.is_hot==1">热销</view>
							<view class="evaluate-num">{{tui.number_sales}}人已购买</view>

							<view class="evaluate-good">{{tui.good_percent}}%好评</view>
						</view>
						<view class="product-info">
							<view class="price">{{tui.price}}</view>

							<view class="slogan">{{tui.market_price}}</view>

						</view>

					</view>
				</view>
				<uni-load-more :status="status" :showIcon="showIcon"></uni-load-more>
			</view>
		</view>
        <!-- 咨询客服 -->
		<view class="people-service" @tap="toChat">
			<text>咨询</text>
			<text>客服</text>
		</view>
		
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"  //星星评分
    import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		
		components: {
			uniNumberBox,
			uniRate,
			uniLoadMore
		},
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11, //层级
				afterHeaderzIndex: 10, //层级
				beforeHeaderOpacity: 1, //不透明度
				afterHeaderOpacity: 0, //不透明度
				id:"",  //商品id,
				proNum:1, //加入购物车数量
				//是否显示返回按钮
				// #ifndef MP
				showBack: true,
				// #endif
                evaImg:[], //评价上传图片
                tuiList:[], //推荐商品
                guiList:[], //规格
				//轮播主图数据
				swiperList: [],
				//轮播图下标
				currentSwiper: 0,
				anchorlist: [], //导航条锚点
				selectAnchor: 0, //选中锚点
				serviceClass: '', //服务弹窗css类，控制开关动画
				specClass: '', //规格弹窗css类，控制开关动画
				shareClass: '', //分享弹窗css类，控制开关动画
				// 商品信息
			    goodsData:{},
				selectSpec: null, //选中规格
				isKeep: false, //收藏
				// 商品详情信息
				detail:'',
				goodsDetail:{}, //商品详情
			   comment:[], //评论信息
			   // 商品明细
			   goods_list:[],
			   // 规格合集
			   size_list:[],
			   // 选中规格
			   selected_size:'',
			   totalList: [],
			   loadingText: '正在加载...',
			   	showIcon: false,
			   	status: "more",
			   current_page: 0,
			   total: "",
			   last_page: "1",
			};
		},
		onLoad(option) {
			// #ifdef MP
			//小程序隐藏返回按钮
			this.showBack = false;
			// #endif
			//option为object类型，会序列化上个页面传递的参数
			//console.log(option); //打印出上个页面传递的参数。
			this.id=option.id;
			this.goodsDetail=option;
		},
		onReady() {
			this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		},
		onPageScroll(e) {
			//锚点切换
			this.selectAnchor = e.scrollTop >= this.anchorlist[2].top ? 2 : e.scrollTop >= this.anchorlist[1].top ? 1 : 0;
			//导航栏渐变
			let tmpY = 375;
			e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
		  		// 当前页小于最后一页才调用
		  	if (this.current_page < this.last_page) {
		  		this.getRecommendList();
		  	}
			
		},
		mounted() {
            uni.request({
            	url: this.config.url+"goods/detail",
            	data: {
                       token:this.token,
					   id:this.id
            		
            	},
            	method: "post",
            	success: (res) => {
                     console.log("goods",res,res.data.data.goods_list);
					 if(res.data.code==1){
						 this.goodsData =res.data.data;
						 this.comment=this.goodsData.comment;
						 //this.evaImg=this.goodsData.commit[0].comment_covers;
						 this.isKeep=this.goodsData.is_collect;
						 this.guiList=this.goodsData.specs;
						 // 轮播图
						 this.swiperList=res.data.data.image.split("|");
						 console.log(this.swiperList)
						 // 商品详情
						 this.detail=res.data.data.content;
						 console.log(this.detail);
						 // 商品明细
						 this.goods_list=res.data.data.goods_list;
					 }
            	
					
				
            	}
            
            });
			//   // 推荐商品
			//   uni.request({
			// 	url: this.config.url+"recommend",
			// 	data: {
   //              token:this.token
			// 		
			// 		
			// 	},
			// 	method: "post",
			// 	success: (res) => {
			//          console.log('res1',res);
			// 		var len;
			// 	     if(res.data.code==1){
			// 			 this.totalList=res.data.data.data;
			// 			 this.cur_page=this.data.data.current_page;
			// 			 this.tol_page=this.data.data.last_page
			// 			 if (this.totalList.length < 10) {
			// 			 	len = this.totalList.length;
			// 			 } else {
			// 			 	len = 10;
			// 			 }
			// 			 for (var i = 0; i < len; i++) {
			// 			 	this.tuiList.push(this.totalList[i])
			// 			 	//	console.log(this.productList)
			// 			 }
			// 		 }
			// 		
			// 	}
			// 
			// })
		},
		methods: {
			// 购买数量
			bindChange(val){
				this.proNum=val;
			},
			addTitle(index){
				console.log(index)
			},
			addColor(size,arr,color,index){
				if(arr.length>0){
					arr.forEach(item=>{
						item.checked=false;
					})
					color.checked=true;
					this.$forceUpdate();
					let check=size.name+":"+color.name;
					// 单个规格项的规格值
					size.checked=check;
					// 所有规格项的规格值
					let all_check='';
					this.guiList.forEach(item=>{
						all_check+=";"+item.checked;
					})
					all_check=all_check.substr(1);
					
					console.log('all_check',all_check);
					// 规格项跟商品对比goos_list显示选中
					this.goods_list.forEach(item=>{
						if(item.goods_spec==all_check){
							this.goodsData.price=item.price_selling;
							this.goodsData.number_stock=item.number_stock;
							// 选中规格项
							this.selected_size=item.goods_spec;
						}
					})
				}
				
				
			},
			// 获取推荐列表
			getRecommendList() {
				this.status = "loading";
				// 首页为你推荐
				uni.request({
					url: this.config.url+'recommend', //仅为示例，并非真实接口地址。
					data: {
						token: this.token,
						page: Number(this.current_page) + 1,
					},
					method: "post",
					success: (res) => {
						var len;
						// console.log("res.data", res.data);
						// 商品列表
						this.totalList = res.data.data.data;
						//每页10 
						if (this.totalList.length < 10) {
							len = this.totalList.length;
						} else {
							len = 10;
						}
						for (var i = 0; i < len; i++) {
							this.tuiList.push(this.totalList[i])
							//	console.log(this.productList)
						}
			
						this.current_page = res.data.data.current_page;
						this.last_page = res.data.data.last_page;
						this.total = res.data.data.data.total;
						this.status = "more";
						if (this.current_page >= this.last_page) {
							this.status = "noMore";
						}
					}
				});
			
			},
			//加入购物车
			cancel(){
				// 判断加入购物车
				if(this.selected_size && this.selected_size.indexOf('undefined')==-1){
					uni.request({
						url:this.config.url+"goods/car",
						method:"post",
						data:{
							token:this.token,
							goods_id:this.id,
							goods_spec:this.selected_size,
							number:this.proNum
						},
						success:function(data){
							console.log("data",data);
							if(data.data.code==1){
								uni.showToast({
									title: '加入成功',
									icon:"none"
								});
							}else{
								uni.showToast({
									title: data.data.info,
									icon:"none"
								});
							}
						}
					})
				}else{
					uni.showToast({
						title: '请选中完整规格',
						icon:"none"
					});
				}
			},
		 //	跳转推荐详情
		  gotui(index){
			 uni.navigateTo({
			 	url:"/pages/goods/goods?id="+index
			 })
		 },
			//跳转购物车
			skipCart(){
				uni.switchTab({
					url:"/pages/tabBar/cart"
				})
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '../msg/msg'
				})
			},
			// 客服
			toChat() {
				uni.navigateTo({
					url: "../msg/chat/chat?name=客服008"
				})
			},
			// 分享
			share() {
				this.shareClass = 'show';
			},
			hideShare() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},
			//收藏
			keep() {
				this.isKeep = this.isKeep ? false : true;
				uni.request({
					url:this.config.url+"goods/collect",
					data:{
						token:this.token,
						goods_id:this.id,
					},
					method:"post",
					success:function(res){
						console.log(res)
					}
				})
			},
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						uni.showToast({
							title: "已加入购物车"
						});
					});
				}
				uni.showToast({
					title: "已加入购物车"
				});
			},
			//立即购买
			buy() {
				if(this.selected_size && this.selected_size.indexOf('undefined')==-1){
				var goods=JSON.stringify(this.goodsDetail)
					//跳转到结算面
				
				    goods=this.goodsData;
					goods.goods_spec=this.selected_size;
					goods.goods_number=this.proNum;
					
					let data={};
						data.isCart = 0;
						data.goods = goods
					uni.setStorage({
						key:"cart",
						data:data,
						success: () => {
							
						}
					})
					uni.navigateTo({
						url:"/pages/order/confirmation?iscart=1"
					})
					
				}else{
					uni.showToast({
						title:"请选择完整规格",
						icon:'none',
					})
				}

			},
			//跳转确认订单页面（模板）
			toConfirmation() {
				// let tmpList = [];
				// let goods = {
				// 	id: this.goodsData.id,
				// 	title:this.goodsData.title,
				// 	img: '../../static/img/goods/p1.jpg',
				// 	name: this.goodsData.name,
				// 	spec: '规格:' + this.goodsData.spec[this.selectSpec],
				// 	price: this.goodsData.price,
				// 	number: this.goodsData.number
				// };
				// tmpList.push(goods);
				// uni.setStorage({
				// 	key: 'buylist',
				// 	data: ,
				// 	success: () => {
				// 		uni.navigateTo({
				// 			url: '../order/confirmation'
				// 		})
				// 	}
				// })
			},
			//商品评论
			toRatings() {
				uni.navigateTo({
					url: 'ratings/ratings'
				})
			},
			//跳转评论列表
			showComments(goodsid) {
			
			},
			//选择规格
			setSelectSpec(index) {
				this.selectSpec = index;
			},
			//减少数量
			sub() {
				if (this.goodsData.number <= 1) {
					return;
				}
				this.goodsData.number--;
			},
			//增加数量
			add() {
				this.goodsData.number++;
			},
			//跳转锚点
			toAnchor(index) {
				this.selectAnchor = index;
				uni.pageScrollTo({
					scrollTop: this.anchorlist[index].top,
					duration: 200
				});
			},
			//计算锚点高度
			calcAnchor() {
				this.anchorlist = [{
						name: '主图',
						top: 0
					},
					{
						name: '评价',
						top: 0
					},
					{
						name: '详情',
						top: 0
					}
				]
				let commentsView = uni.createSelectorQuery().select("#comments");
				commentsView.boundingClientRect((data) => {
					let statusbarHeight = 0;
					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
					// #endif
					let headerHeight = uni.upx2px(100);
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;

				}).exec();
			},
			//返回上一页
			back() {
				uni.navigateBack(1);
			},
			//服务弹窗
			showService() {
				console.log('show');
				this.serviceClass = 'show';
			},
			//关闭服务弹窗
			hideService() {
				this.serviceClass = 'hide';
				setTimeout(() => {
					this.serviceClass = 'none';
				}, 200);
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			discard() {
				//丢弃
			}
		}
	};
</script>

<style lang="scss">
	.container{
		width:100vw;
		height:100vh;
		overflow: auto;
	}
	img{
		width:100%;
		height:100%;
	}
	page {
		background-color: #f8f8f8;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	@font-face {
		font-family: 'HMfont-home';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2');
	}
   // 人工服务
	.people-service{
		position: fixed;
		bottom:171upx;
		right:25upx;
		background:linear-gradient(0deg,rgba(255,142,28,0.99),rgba(255,179,73,0.99));
		color:white;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		width:84upx;
		height:84upx;
		border-radius: 84upx;
		
	}
	.icon {
		font-family: 'HMfont-home' !important;
		font-size: 26upx;
		font-style: normal;

		&.fenxiang {
			&:before {
				content: '\e642';
			}
		}

		&.xiangqian {
			&:before {
				content: '\e634';
			}
		}

		&.xiangyou {
			&:before {
				content: '\e637';
			}
		}

		&.shoucangsel {
			&:before {
				content: '\e62c';
			}
		}

		&.shoucang {
			&:before {
				content: '\e62e';
			}
		}

		&.tongzhi {
			&:before {
				content: '\e729';
			}
		}

		&.kefu {
			&:before {
				content: '\e61e';
			}
		}

		&.cart {
			&:before {
				content: '\e614';
			}
		}

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
	}
    
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 42upx;

					image {
						width: 60upx;
						height: 60upx;
					}
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;

				view {
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.goods-info {
		.product-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 22upx;
			color: rgba(102, 102, 102, 1);
			margin: 10upx 0;

			.info {
				display: flex;
				justify-content: center;
				align-items: center;

				text:nth-child(1) {
					margin-right: 20upx;
					color: rgba(255, 84, 31, 1);
					font-size: 30upx;
				}

				text:nth-child(2) {
					text-decoration: line-through;
				}
			}

			.evaluate {
				display: flex;
				justify-content: center;
				align-items: center;

				.evaluate-num {
					margin-right: 20upx;
				}
			}
		}

		.title {
			font-size: 28upx;
		}
	}

	.spec {
		
		.row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 29upx;
			color: #cecece;
			height: 100upx;
			.resdius-num,.add-color{
				font-size:28upx;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(102,102,102,1);
			}
			
		}
	}

	.comments {
		margin-top: 20upx;

		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 0 30upx 0;

			.text {
				font-size: 32upx;
				color: rgba(51, 51, 51, 1);
			}

			.arrow {
				font-size: 28upx;

				color: #cecece;

				.show {
					display: flex;
					align-items: center;

				}
			}
		}

		.comment {


			.user-info {


				display: flex;
				justify-content: space-between;
				align-items: center;

				.comment-user-info {
					display: flex;
					align-items: center;
					padding: 20upx 0;

					.people-icon {
						width: 80upx;
						height: 80upx;
						border-radius: 80upx;
					}

					.star {
						diplay: flex;
						flex-direction: column;
						align-items: space-around;
						font-size: 25upx;
						color: #cecece;
						margin-left: 20upx;
                        .star-name{
							padding-left:10upx;
							font-size:28upx;
font-family:PingFang-SC-Regular;
font-weight:400;
color:rgba(102,102,102,1);
						}
					}
				}

				.comment-time {}
			}

			.content {
				margin-top: 10upx;
				font-size: 28upx;

			}

			.product-icon {
				display: flex;

				image {
					width: 200upx;
					height: 200upx;
					margin: 20upx;
				}
			}
		}
	}
  // 商品详情
	.description {
		
		
      background:white;
		.title {
			padding-left:4%;
			
			height: 80upx;
			display: flex;
			font-weight: 800;
			justify-content: flex-start;
			align-items: center;
			font-size: 32upx;
			color: #999;
			background: white;
			border-bottom:1px solid #E6E6E6;
		}

		.product-detail {
			width: 100vw;
            view:nth-child(1){
				margin: 30upx auto;
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width:100upx;
				height:100upx;
				border-radius: 50%;
				border: 1px dashed #aaa;
				font-size: 24upx;
			}
			// text {
			// 	
			// 	disply: flex;
			// 	
			// 	align-items: center;
			// 	justify-content: center;
			// 	font-size: 26upx;
			// }

			.product-dec {
				width: 100vw;
				display: flex;
				flex-direction: column;
				align-items: center;
					justify-content: center;
					h2{
						font-size: 24upx;
						color:#333;
					}
					p{
						width: 100vw;
						
						img{
							width: 100% !important;
							height: 300upx;
						}
					}
				
				
			}
		}
	}

	//推荐
	.recomment {
		margin-top: 20upx;
		padding-bottom: 200upx;
        background:white;
		.recomment-title {
			height: 100upx;
			border-bottom: 1px solid #cecece;
			font-size: 32upx;
			display: flex;
			padding-left:4%;
			align-items: center;
			font-weight: 900;
			color: #999;
		}

		.recomment-contain {
			width: 92%;
			margin: 0 4%;
			padding: 20upx 0;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.recomment-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.recomment-list-left {
					margin-right: 10upx;

					image {
						width: 210upx;
						height: 210upx;
						border-radius: 210upx;
					}
				}

                 .recomment-list-right {
                 	display: flex;
                 	flex-direction: column;
                    border-bottom:1px solid rgba(230,230,230,1);
                   width:100%;
                 	.product-name {
                 
                 		display: -webkit-box;
                 		-webkit-box-orient: vertical;
                 		-webkit-line-clamp: 2;
                 		text-align: justify;
                 		overflow: hidden;
                 		text-overflow: ellipsis;
                 		font-size: 30upx;
                 	}
                 
                 	.product-info {
                 		display: flex;
                 		align-items: center;
                        margin:10upx 0;
                 
                 		.price {
                 			color: #e65339;
                 			font-size: 30upx;
                 			font-weight: 600;
                 		}
                 
                 		.slogan {
                 			font-size: 24upx;
                 			font-family: PingFang-SC-Regular;
                 			font-weight: 400;
                 			text-decoration: line-through;
                 			color: rgba(153, 153, 153, 1);
                 			margin-left: 20upx;
                 		}
                 	}
                 
                 	.product-eval {
                 
                 		display: flex;
                 		margin-top:40upx;
                 		align-items: center;
                 		color: rgba(102, 102, 102, 1);
                 		font-size: 22upx;
                        .hot-product{
							width:54upx;
height:30upx;
border:1px solid rgba(199,22,34,1);
border-radius:15px;
color:rgba(199,22,34,1);
font-size: 20upx;
display: flex;
justify-content: center;
align-items: center;
margin-right:20upx;
						}
                 		.evaluate-good {
                 			margin-left: 20upx;
                 		}
                 	}
                 }
			}
		}
	}

	

	.footer {
		position: fixed;
		bottom: 0upx;


		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		width: 100%;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 100%;
			justify-content: flex-start;
			margin: 0 50upx 0 50upx;

			.box {
				width: 80upx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				margin-right: 30upx;

				.icon {
					font-size: 40upx;
					height: 30upx;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 40upx;
						height: 40upx;
					}
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 100%;

			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				width: 180upx;
				height: 100%;
				padding: 0 20upx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
			}

			.joinCart {
				background: rgba(76, 215, 141, 1);

			}

			.buy {
				background: rgba(0, 198, 93, 1);

			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;
    .spec-btn{
		width:100%;
		height:100upx;
		display:flex;
		align-items: center;
		.confirmB,.cancelB{
			width:50%;
			height:100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
		}
		.confirmB{
			color: #fff;
			background: rgba(20, 204, 33, 1);
		}
	}
		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 92%;
				padding: 30upx 4% 0;

				.product-title {
					display: flex;
					align-items: center;
					position: relative;

					.hidden {
						width: 24px;
						height: 24px;
						color:#CECECE;
						font-size: 50upx;
						position: absolute;
						right: 0;
						top: 0upx;
                        display: flex;
						justify-content: center;
						align-items: center;
					}

					image {
						width: 212upx;
						height: 212upx;

					}

					.product-mes {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-left: 40upx;

						text {
							font-size: 32upx;
						}

						text:nth-child(1) {
							color: rgba(255, 32, 27, 1);
							margin-bottom: 10upx;
						}

						text:nth-child(2) {
							color: #cecece;

						}
					}
				}
            // 规格
			  .pro-content{
				  display: flex;
				  flex-direction: column;
				  h2{
					  margin-top:20upx;
					  margin-bottom:20upx;
					  font-size:30upx;
color:rgba(51,51,51,1);
				  }
				  .product-color {
				  	display: flex;
				  	font-size: 26upx;
				  	.checked{
						color:rgba(20, 204, 33, 1);
						background:rgba(20,204,33,.3);
						border:1px solid #FF14CC21;
					}
				   
				  	text {
				  	    display: flex;
						align-items: center;
						justify-content: center;
						background: rgba(245, 245, 245, 1);
						width: 234upx;
						height: 56upx;
						color: rgba(51, 51, 51, 1);
						margin-right:20upx;
						border:1px solid rgba(245, 245, 245, 1);
				  	}
			
				  }
			  }
				

				.product-num {
					display: flex;
					font-size: 26upx;
					justify-content: space-between;
					align-items: center;
					margin-top: 30upx;

					text {
						color: rgba(51, 51, 51, 1);
						font-size: 30upx;
						padding: 30upx 0;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					view {

						height: 60upx;


					}
				}

			}

		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}

					.sub,
					.add {
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}

		}
	}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 0.9);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}
	}
</style>
