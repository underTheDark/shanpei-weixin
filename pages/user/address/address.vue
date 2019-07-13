<template>
	<view id="address">



		<view class="address-title">
			<view :class="{on:typeClass=='home'}" @tap="switchType('home')">常用地址管理</view>
			<view :class="{on:typeClass=='self'}" @tap="switchType('self')">常用自提点管理</view>
		</view>
		<view class="list">
			<!-- 常用地址管理 -->

			<view v-if="subState==1" class="address-msg">
				<!-- 图标显示 -->
				<view v-if="homeList.length ==0" class="noAdd">
					<view class="img">
						<image src="../../../static/img/add-position.png"></image>
					</view>

					<text>赶快去添加收货地址吧！</text>
				</view>
				<!-- 地址列表 -->
				<view class="row" v-for="(row,index) in homeList" :key="index">
					<view class="row-top">
						<view class="top-one">
							<text>{{row.name}}</text>
							<text>{{row.phone}}</text>
						</view>
						<view class="top-two">

							{{row.province }}{{row.city}}{{row.area}}{{row.street}}{{row.address}}

						</view>
					</view>
					<view class="row-bottom">
						<view class="left">
							<image :src="row.is_default==1 ?src1:src2"></image>
							<view :class="row.is_default==1?'selected':'noSelect'">{{row.is_default==1?"默认地址":"其他地址"}}</view>
						</view>
						<view class="right">
							<view class="jianju" @tap.stop="edit(row)">
								<image src="../../../static/img/address/write.png"></image>
								<view>编辑</view>
							</view>
							<view @click="removeH(index,row.id)">
								<image src="../../../static/img/address/delete.png"></image>
								<view>删除</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 常用自提点管理 -->
			<view v-if="subState==2" class="address-msg">
				<!-- 无地址显示图标 -->

				<view v-if="selfList.length ==0 " class="noAdd">
					<view class="img">
						<image src="../../../static/img/add-position.png"></image>
					</view>

					<text>赶快去添加收货地址吧！</text>
				</view>
				<!-- 地址列表 -->
				<view class="row" v-for="(row,index) in selfList" :key="index" @tap="select(row)">
					<view class="row-top">
						<view class="get-position">{{row.store.name}}</view>
						<view class="top-one">
							<text>{{row.store.username}}</text>
							<text>{{row.store.phone}}</text>
						</view>
						<view class="top-two">

							{{row.store.province }}{{row.store.city}}{{row.store.area}}{{row.store.street}}{{row.store.address}}

						</view>
					</view>
					<view class="row-bottom">
						<view class="left">
							<image :src="row.is_default==1 ?src1:src2"></image>
							<view :class="row.is_default==1?'selected':'noSelect'">{{row.is_default==1?"默认地址":"其他地址"}}</view>
						</view>
						<view class="right">
							<!-- <view class="jianju" @tap.stop="edit(row)">
							<image src="../../../static/img/address/write.png"></image>
							<view>编辑</view>
						</view> -->
							<view @click="removeS(index,row.id)">
								<image src="../../../static/img/address/delete.png"></image>
								<view>删除</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="add" v-show="subState==1">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>

		<!-- <uni-popup :show=true type="middle" mode="fixed" msg="居中弹出popup" @hidePopup="hidePopup"></uni-popup> -->

	</view>
</template>
<script>
	import uniPopup from "../../../components/uni-popup/uni-popup.vue"

	export default {
		mounted() {

			// 自提点
			uni.request({
				
				url: this.config.url + "member/station",
				method: "post",
				data: {
					token: this.token
				},
				success: (res) => {
				console.log(111111111)
					this.selfList = res.data.data;
					this.selfLen = res.data.data.length;
						console.log(res, res.data.data.length, "zi")
				}

			})
			//我的收货地址
			uni.request({
				url: this.config.url + "member/address",
				method: "POST",
				data: {
					token: this.token
				},
				success: (res) => {
					console.log(11111111221)
					console.log(res, res.data.data.length, "wo")
					this.homeList = res.data.data;
					this.homeLen = res.data.data.length;
				}
			})
		},
		components: {
			uniPopup
		},
		data() {
			return {
				src1: '../../../static/img/address/y-duihao.png',
				src2: '../../../static/img/address/n-duihao.png',
				typeClass: 'home',
				subState: 1,
				isSelect: false,
				homeList: [],
				selfList: [],
				homeLen: "",
				selfLen: ""
			};
		},
		onLoad(e) {
			if (e.type == 'select') {
				this.isSelect = true;
				console.log(11111)
			}
		},
		onReady() {
			console.log("ready")
		},
		methods: {

			// 删除我的收货地址
			removeH(row, id) {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除收货地址',

					cancelText: '取消',
					confirmText: '确认',
					confirmColor: "#14CC21",
					success: res => {
						var home = _this.homeList;
						console.log("hoem", home)
						this.homeList.splice(row, 1)
						uni.request({
							url: this.config.url + "address/del",
							data: {
								token: this.token,
								address_id: id,
							},
							method: "post",
							success: (res) => {
								if (res.data.code == 1) {

								}
							}
						});

					},

				});
			},

			// 删除自提点
			removeS(row, id) {
				uni.showModal({
					title: '提示',
					content: '确定要删除收货地址',

					cancelText: '取消',
					confirmText: '确认',
					confirmColor: "#14CC21",
					success: res => {

						uni.request({
							url: this.config.url + "station/del",
							data: {
								token: this.token,
								address_id: id,
							},
							method: "post",
							success: (res) => {
								if (res.data.code == 1) {
									var self = this.selfList;
									this.selfList = self.splice(row, 1)
								}
							}
						});

					},

				});
			},

			switchType(type) {

				this.typeClass = type;
				if (type == "home") {
					this.subState = 1;
					console.log("home",this.homeLen)

				} else if (type == "self") {
					this.subState = 2;
					console.log("se",this.selfLen)
				}
			},
			edit(row) {
				var type = JSON.stringify(row)

				uni.navigateTo({
					url: "/pages/user/address/edit/edit?type=" + type
				});

			},
			clear(row) {
				console.log(row)
			},
			add() {
				uni.navigateTo({
					url: "edit/edit"
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
		display: flex;
		justify-content: center;
		align-items: center;

		.tianjia {
			margin-right: 15upx;
			padding-top: 8upx;
		}

		.btn {

			width: 90%;
			height: 80upx;
			display: flex;
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
		display: flex;
		flex-direction: column;
			background: white;
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

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
		


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

		.address-msg {
			width: 100%;
			display: flex;
			flex-direction: column;
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

					.selected {
						color: #14cc21
					}

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
