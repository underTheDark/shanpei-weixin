<template>
	<view>
		<view class="header" :style="{position:headerPosition,top:headerTop}">
			<view class="target" v-for="(target,index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected?'on':'']">
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id" @tap="toGoods(goods)">
					<image :src="goods.logo"></image>
					<view class="name">{{goods.title}}</view>
					<view class="info">
						<view class="price">￥{{goods.price}}</view>

						<view class="slogan">￥{{goods.market_price}}</view>

					</view>
					<view class="evaluate">
						<view class="evaluate-num">{{goods.comment_num}}条评价</view>
						<view class="evaluate-good">{{goods.good_percent}}%好评</view>
					</view>
				</view>
			</view>
			<view class="loading-text" v-if="tip">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		mounted() {
			
		},
		data() {
			return {
				goodsList: [],
				loadingText: "正在加载...",
				headerTop: "0px",
				headerPosition: "fixed",
				orderbyList: [{
						text: "综合",
						selected: true,
						orderbyicon: false,
						orderby: 0
					},
					{
						text: "销量",
						selected: false,
						orderbyicon: ['sheng', 'jiang'],
						orderby: 0
					},
					{
						text: "价格",
						selected: false,
						orderbyicon: ['sheng', 'jiang'],
						orderby: 0
					}
				],
				orderby: "sheng",
				id: "",
				key1: "",
				cur_page: 0,
				tol_page: 1,
				tip: false, //提示默认消失
				hot:"",
				limit: "",
				keyword:""
			}
		},
		onLoad: function(option) {
			console.log("option", option)
			if (option.hot == "hot") {
				//主页数据
				// 
						this.sortType(1,1,1)

				this.hot = option.hot
				uni.setNavigationBarTitle({
					title: "热销产品"
				})
			} else if (option.limit == "limit") {

				this.sortType(1,1,2)
				this.limit = option.limit

				uni.setNavigationBarTitle({
					title: "限时抢购产品"
				})
			} else if (option.keyword) {
				this.keyword = option.keyword;
				
				this.request({
					url: this.config.url + "goods/lists",
					method: "post",
					data: {
						sort: 1,
						asc: 1,
						keyword: this.keyword
					},
					success: (res) => {
						console.log("key", res)
						this.goodsList = res.data.data.data;
					}
				})
			} else if(option.id){
				uni.setNavigationBarTitle({
					title: option.title
				});
				this.key1 = option.id;
				this.fardis(1)
				//兼容H5下排序栏位置
				// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(() => {
					let uniHead = document.getElementsByTagName('uni-page-head');
					if (uniHead.length > 0) {
						this.headerTop = uniHead[0].offsetHeight + 'px';
						clearInterval(Timer); //清除定时器
					}
				}, 1);
				// #endif
			}


		},

		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			this.cur_page = this.cur_page + 1;

			this.tip = true;

			if (this.cur_page >= this.tol_page) {
				this.loadingText = "没有商品了";
				return false;
			} else {
				this.loadingText = "正在加载...";
			}
		},
		methods: {
			//分类
			fardis(type, asc = 1){
				this.request({
					url: this.config.url + "goods/lists",
					data: {
						token: this.token,
						cate_id: this.key1,
						sort: type,
						asc: asc,
						page: this.cur_page
					},
					method: "post",
					success: (res) => {
				
						this.goodsList = res.data.data.data;
						this.cur_page = res.data.data.current_page;
						this.tol_page = res.data.data.last_page;
					}
				})
			},
			//关键字排序
			word(type, asc = 1, keyword) {
				
					this.tip = false
					this.request({
						url: this.config.url + "goods/lists",
						method: "post",
						data: {
							sort: 1,
							asc: 1,
							keyword: keyword
						},
						success: (res) => {
							console.log("key", res)
							this.goodsList = res.data.data.data;
							this.cur_page = res.data.data.current_page;
							this.tol_page = res.data.data.last_page;
						}
					})
				
			},

			// 排序方式
			sortType(type, asc = 1, action = 0) {
				this.tip = false;
				this.request({
					url: this.config.url + "goods/lists",
					data: {
						token: this.token,
						action: action,
						// cate_id:this.key1,
						sort: type,
						asc: asc,
						page: this.cur_page
					},
					method: "post",
					success: (res) => {
						console.log(res.data.data);
						this.goodsList = res.data.data.data;
						this.cur_page = res.data.data.current_page;
						this.tol_page = res.data.data.last_page;
					}
				})
			},
			reload() {

				this.sortType(1);

			},
			//商品跳转
			toGoods(e) {
				console.log(e)
				var id = e.id;
				uni.navigateTo({
					url: "/pages/goods/goods?id=" + id
				})
			},
			//排序类型
			select(index) {

				let tmpTis = this.orderbyList[index].text + "排序 "
				if (this.orderbyList[index].orderbyicon) {
					let type = this.orderbyList[index].orderby == 0 ? '升序' : '降序';
					if (this.orderbyList[index].selected) {
						type = this.orderbyList[index].orderby == 0 ? '降序' : '升序';
						this.orderbyList[index].orderby = this.orderbyList[index].orderby == 0 ? 1 : 0;
					}
					tmpTis += type
				}
				this.orderbyList[index].selected = true;
				let len = this.orderbyList.length;
				for (let i = 0; i < len; i++) {
					if (i != index) {
						this.orderbyList[i].selected = false;
					}
				}

				if (this.hot) {

					switch (index) {
						case 0:
							this.sortType(1, 1, 1);
							break;
						case 1:
							if (this.orderbyList[index].orderby) {
								this.sortType(2, 2, 1);
							} else {
								this.sortType(2, 1, 1, );
							}
							break;
						case 2:
							if (this.orderbyList[index].orderby) {
								this.sortType(3, 2, 1);
							} else {
								this.sortType(3, 1, 1);
							}
							break;
					}

				} else if (this.limit) {
					switch (index) {
						case 0:
							this.sortType(1, 1, 2);
							break;
						case 1:
							if (this.orderbyList[index].orderby) {
								this.sortType(2, 2, 2);
							} else {
								this.sortType(2, 1, 2);
							}
							break;
						case 2:
							if (this.orderbyList[index].orderby) {
								this.sortType(3, 2, 2);
							} else {
								this.sortType(3, 1, 2);
							}
							break;
					}
				} else if (this.keyword) {
					switch (index) {
						case 0:
							this.word(1, 1, this.keyword);
							break;
						case 1:
							if (this.orderbyList[index].orderby) {
								this.word(2, 2, this.keyword);
							} else {
								this.word(2, 1, this.keyword);
							}
							break;
						case 2:
							if (this.orderbyList[index].orderby) {
								this.word(3, 2, this.keyword);
							} else {
								this.word(3, 1, this.keyword);
							}
							break;
					}
				} else if(this.key1){
					switch (index) {
						case 0:
							this.fardis(1);
							break;
						case 1:
							if (this.orderbyList[index].orderby) {
								this.fardis(2, 2);
							} else {
								this.fardis(2);
							}
							break;
						case 2:
							if (this.orderbyList[index].orderby) {
								this.fardis(3, 2);
							} else {
								this.fardis(3);
							}
							break;
					}
				}


			}
		}

	}
</script>

<style lang="scss">
	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMMAAsAAAAAB3gAAALAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCfgqCXII4ATYCJAMMCwgABCAFhG0HQxuDBsiemjxBRCmUAtQ2VRCBG4ig2u+zZ3c/ortTgBIoQOVPBYSJYkUggWRSPqyjY2yEQyPe5FzmkfXucrOArBAKSdt/TjNmNTZyfrOTKAwgNQXmqbkEBgj2eS6nNz3A+YFyXHs9P2raURxQgHtR7yiyEknMW4bXLsaDeEygbVEkxYXiyhqgV+BVgbgmCQzQ55xKS2doCvWag0W8o9FMz9M24G34/fgvPvQktQxvPL5axIPc38m/U/JI9VSLIKjm80M7RsYWoBAXa4PHVHFxi0rbKaotAfuaFfxOqSp+Jwvlbv/wCImow+1dsAaGdEcqZnRrKhAggQzqaOI24Bmw02JRZmZ88bS/fq2vH6Y1yywb576F7tn3l1/5e7zm6Ze2+cW37DBXjFEftC+6U7vil0/zOvXIl3lf7cx/3DkeysBDV/tDQ5N7tli9AzsiHDgcO55136FS8LLTzBygm4Q9u6bCp1zAy0lh7v/L+PnQ0P71YAZeG0pE3eWwRIIOANX5dz4JQCX8hQLB+5z/hXZb5ofeVMCvjc0fKFEp+rs1bzkU/H5Vz67iarArF1vJlH4oO8g0SGi7EVU4OnY43jzr3U5omqVIGhaQNS2Rhd1CTcc26ppOo21TyfGOCUIlSgsbJhHC0DqSvp/IhnbIwh6gZu4BdcNQoe1iuC7sWAnJWEAQQxEP2V4ocQE/ph5qjDqrkNDpZUhWE4rrEJGlDIyLji1WSpAfkTm2yF1CPKUYYhLwwWL0HPJ6AzBIAm7E0WiR0mB6TAyue1M0F/ABo/MIhEEhPIjVC5JwAvywGE8ZS5+vggg6eTFIC6ejWAchZNL0UJxosT3IEqO/F+dehMi6COJRFAZhRIAPVIz8iJcUA6Bg/Tw3hENFE0fkg9LFSP1wX2P0+mbf952ANvxUjhQ5is4tRurpjHJLjF9IRbKIHAAA') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 26upx;
		font-style: normal;

		&.sheng {
			&:before {
				content: "\e737";
			}
		}

		&.jiang {
			&:before {
				content: "\e736";
			}
		}

	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;

		.target {
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;

			&.on {
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}


		}

	}

	.place {

		background-color: #ffffff;
		height: 100upx;

	}

	.goods-list {
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin-bottom: 30upx;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;

				image {
					width: 100%;
					height: 273upx;
					border-radius: 20upx 20upx 0 0;
					margin-bottom: 30upx;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

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

				.evaluate {
					width: 92%;
					padding: 0 4% 20upx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					color: rgba(102, 102, 102, 1);
					font-size: 22upx;

					.evaluate-good {
						margin-left: 20upx;
					}
				}
			}

		}
	}
</style>
