<template>
	<view id="address">

		<view class="list">
			<view v-if="this.addressList.length == 0" class="noAdd">
				<view class="img">
					<image src="../../../static/img/add-position.png"></image>
				</view>

				<text>赶快去添加收货地址吧！</text>
			</view>
			<view class="address-title">
				<view :class="{on:typeClass=='home'}" @tap="switchType('home')">常用地址管理</view>
				<view :class="{on:typeClass=='self'}" @tap="switchType('self')">常用自提点管理</view>
			</view>
			<!-- 常用地址管理 -->
			<view v-show="subState==1" class="row" v-for="(row,index) in addressList" :key="index">
				<view class="row-top">
					<view class="top-one">
						<text>姓名</text>
						<text>手机号</text>
					</view>
					<view class="top-two">

						河南省 郑州市 高新技术开发区 科学大道 广告产业园9号楼
						13楼1317室

					</view>
				</view>
				<view class="row-bottom">
					<view class="left">
						<image src="../../../static/img/address/duihao.png"></image>
						<view>其他地址</view>
					</view>
					<view class="right">
						<view class="jianju" @tap.stop="edit(row)">
							<image src="../../../static/img/address/write.png"></image>
							<view>编辑</view>
						</view>
						<view  @click="removeM()">
							<image src="../../../static/img/address/delete.png"></image>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 常用自提点管理 -->
			<view v-show="subState==2" class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
				<view class="row-top">
					<view class="get-position">大城小爱超市</view>
					<view class="top-one">
						<text>姓名</text>
						<text>手机号</text>
					</view>
					<view class="top-two">

						河南省 郑州市 高新技术开发区 科学大道 广告产业园9号楼
						13楼1317室

					</view>
				</view>
				<view class="row-bottom">
					<view class="left">
						<image src="../../../static/img/address/duihao.png"></image>
						<view>其他地址</view>
					</view>
					<view class="right">
						<view class="jianju" @tap.stop="edit(row)">
							<image src="../../../static/img/address/write.png"></image>
							<view>编辑</view>
						</view>
						<view  @click="removeM()">
							<image src="../../../static/img/address/delete.png"></image>
							<view>删除</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>

		<!-- <uni-popup :show=true type="middle" mode="fixed" msg="居中弹出popup" @hidePopup="hidePopup"></uni-popup> -->

	</view>
</template>
<script>
	import uniPopup  from "../../../components/uni-popup/uni-popup.vue"

	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				typeClass: 'home',
				subState: 1,
				isSelect: false,
				addressList: [{
						id: 1,
						name: "大黑哥",
						head: "大",
						tel: "18816881688",
						address: {
							region: {
								"label": "广东省-深圳市-福田区",
								"value": [18, 2, 1],
								"cityCode": "440304"
							},
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: true
					},
					{
						id: 2,
						name: "大黑哥",
						head: "大",
						tel: "15812341234",
						address: {
							region: {
								"label": "广东省-深圳市-福田区",
								"value": [18, 2, 1],
								"cityCode": "440304"
							},
							detailed: '深北小道2222号有名公寓502'
						},
						isDefault: false
					},
					{
						id: 3,
						name: "老大哥",
						head: "老",
						tel: "18155467897",
						address: {
							region: {
								"label": "广东省-深圳市-福田区",
								"value": [18, 2, 1],
								"cityCode": "440304"
							},
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: false
					},
					{
						id: 4,
						name: "王小妹",
						head: "王",
						tel: "13425654895",
						address: {
							region: {
								"label": "广东省-深圳市-福田区",
								"value": [18, 2, 1],
								"cityCode": "440304"
							},
							detailed: '深南大道1111号无名摩登大厦6楼A2'
						},
						isDefault: false
					},
				]
			};
		},
		onShow() {

			uni.getStorage({
				key: 'delAddress',
				success: (e) => {
					let len = this.addressList.length;
					if (e.data.hasOwnProperty('id')) {
						for (let i = 0; i < len; i++) {
							if (this.addressList[i].id == e.data.id) {
								this.addressList.splice(i, 1);
								break;
							}
						}
					}
					uni.removeStorage({
						key: 'delAddress'
					})
				}
			})
			uni.getStorage({
				key: 'saveAddress',
				success: (e) => {
					let len = this.addressList.length;
					if (e.data.hasOwnProperty('id')) {
						for (let i = 0; i < len; i++) {
							if (this.addressList[i].id == e.data.id) {
								this.addressList.splice(i, 1, e.data);
								break;
							}
						}
					} else {
						let lastid = this.addressList[len - 1];
						lastid++;
						e.data.id = lastid;
						this.addressList.push(e.data);
					}
					uni.removeStorage({
						key: 'saveAddress'
					})
				}
			})
		},
		onLoad(e) {
			if (e.type == 'select') {
				this.isSelect = true;
			}
		},
		methods: {
				// 删除
			removeM(index, id) {
				console.log(2222)
				let self = this
				console.log('点击删除')
				uni.showModal({
					title: '',
					content: '确定要删除该信息吗？',
					confirmText: '删除',
					cancelColor:'rgba(102,102,102,1)',
					confirmColor:'rgba(20,204,33,1)',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							
							uni.showToast({
								icon: "success",
								title: '操作成功!',
								duration: 2000
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			},
			switchType(type) {

				this.typeClass = type;
				if (type == "home") {
					this.subState = 1;

				} else if (type == "self") {
					this.subState = 2;
				}
			},
			edit(row) {
				uni.setStorage({
					key: 'address',
					data: row,
					success() {
						uni.navigateTo({
							url: "/pages/user/address/edit/edit?type=edit"
						})
					}
				});

			},
			clear(row) {
				console.log(row)
			},
			add() {
				uni.navigateTo({
					url: "edit/edit?type=add"
				})
			},
			select(row) {
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if (!this.isSelect) {
					return;
				}
				uni.setStorage({
					key: 'selectAddress',
					data: row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// #address uni-modal .uni-modal{
	// 	background:rgba(22,208,255,0.15);
	// }
	view {
		display: flex;
	}

	@font-face {
		font-family: "HMfont-home";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMIAAsAAAAABvwAAAK8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqBSIFAATYCJAMMCwgABCAFhG0HVBskBsiusClj9ljNiEIaBdizs389YOCARVDt99mzu+8dMMpzQEn5KEAZRez+yRDbSDIixkYo1tF/+vv5OxYJFk2VghXWbbzzPn8D/OMG3vvXGTU90ZFhOrNJROZwCRGjj/Iry36wAbfSxBsuNGggeG9sMbJKDd7xg8vpr4ACmWdZLnMtGxMwwUD3wCiywi3oDWMXuITzBNpNc4BP3j5/Q1thTQvE1SQiaOd8isKSrUJds7aIVyqt6XECAF6Gj49/sBcUSZVZc09duQng/CfPcXTVrIs+gj+fBWwTGZsghbhcGzurJhgZ1S6rt2fXipDmCv5PyNMltf2HRxJEzSrsBKtIk9wU32WS+E1w14UZ1HFiG+QkJg3ODWmyn5/20eOvTz5LnR6l8aWDT5Sn3wLtYlfNe7RIik/fN961C3Vftf6YZLr5ZMcjU/LExqD9u3LzvKE8KQtBGAp9ilm1XbAK2m83TdlozEvQ0Zbrh8HBMrKDB03MjRwHaJKP2f5jf+NfDvML4f+tHQX8+EJvkwL1z9Mqwfi/kd+zq+hCS5+LynN5piObGRlNaNedmrJc/R7jVUO3agmtOT7zJy32WkjWahGihbQJlQ5bklpT7ENotyG3ucOAjpoobVi3BxB6HSDp9h2yXne0kDSoDPtBrTdQaHc61D07LEezm1Im4wBLc2z6UoaO0bpR8SdHLifNCkPKL+s4CaLX5Skm77hknWNBdxLt9SzEmkqBWXAZ57lgSyVl37YaZqMzt7tWd6OtshTQdYJixLAAKplDTT5RCv3Bplu6/ycWcXJEW+pqrL+YGkuGR14unh7onazsVXcv13RNRPb0mBCqUaKAssDCcjsmUKt+VIr5zJbGiMjIGTfqV+sr21pfUXxALmvCmpMjRY5i9G5CZepynIyYZOr+sksyR2W0UHLiChIrRmXfA0E') format('woff2');
	}

	.icon {
		font-family: "HMfont-home" !important;
		font-size: 60upx;
		font-style: normal;
		color: #000000;

		&.bianji {
			&:before {
				content: "\e61b";
			}
		}

		&.tianjia {
			&:before {
				content: "\e81a";
			}

			margin-left:20upx;
		}
	}

	#address {
		background: white;
	}

	#address .on {

		border-bottom: 5upx solid rgba(20, 204, 33, 1);
		font-weight: bold;
		color: rgba(20, 204, 33, 1);
	}

	.add {
		position: fixed;
		bottom: 50upx;
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;

		.tianjia {
			margin-right: 15upx;
			padding-top: 8upx;
		}

		.btn {

			width: 90%;
			height: 80upx;

			background: rgba(20, 204, 33, 1);
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}

			font-size: 30upx;
		}
	}

	#address {
		width: 100%;
		height: 100%;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;


		.noAdd {
			padding-top: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			image {
				width: 119upx;
				height: 141upx;
				margin-bottom: 60upx;
			}

			text {
				font-size: 28upx;
				color: rgba(102, 102, 102, 1);
			}
		}

		.address-title {
			display: flex;
			border-bottom: 20upx solid rgba(245, 245, 245, 1);
			justify-content: space-around;
			align-items: center;

			view {
				color: rgba(51, 51, 51, 1);
				font-size: 30upx;
				padding: 20upx 0;


			}
		}

		.row {
			display: flex;
			flex-direction: column;
			font-size: 28upx;
			border-bottom: 20upx solid rgba(245, 245, 245, 1);

			.row-top {
				display: flex;
				flex-direction: column;
				padding: 20upx 20upx 60upx;

				border-bottom: 1px solid #cecece;

				.get-position {
					font-size: 32upx;
					color: rgba(51, 51, 51, 1);
					font-weight: bold;
				}

				.top-one {
					display: flex;
					align-items: center;
					padding: 15upx 0;

					text {
						margin-right: 30upx;
						color: rgba(51, 51, 51, 1);
					}
				}

				.top-two {
					color: rgba(85, 85, 85, 1);

				}
			}

			.row-bottom {

				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;

				.left {
					display: flex;
					color: rgba(153, 153, 153, 1);

					image {
						width: 36upx;
						height: 36upx;
						margin-right: 8upx;
					}
				}

				.right {
					display: flex;
					color: rgba(153, 153, 153, 1);

					view {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						image {
							margin-right: 8upx;
						}
					}

					.jianju {
						margin-right: 60upx;
					}

					// view:nth-child(2){
					// 	margin-left:80upx;
					// 	
					// }
					image {
						width: 36upx;
						height: 36upx;
					}
				}
			}
		}

	}
</style>
