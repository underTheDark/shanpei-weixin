<template>
	<view class="sendType">
		<view class="send-type">
			<!-- <view>自提</view>
			<view>送货上门</view> -->
			<view :class="{on:typeClass=='home'}" @tap="switchType('home')">自提</view>
			<view :class="{on:typeClass=='self'}" @tap="switchType('self')">送货上门</view>
		</view>
		<view class="send-add">
			<!-- 送货上门 -->
			<view class="add-list" v-show="subState==2" @tap="selectHome(home.id,home)" v-for="(home,homeIndex) in homeList" :key="homeIndex">
				<view class="add-left">
					<checkbox :checked="checked"></checkbox>
				</view>
				<view class="add-right">
					<view class="address-user-top">
						<text>{{home.name}}</text>
						<text>{{home.phone}}</text>
					</view>
					<view class="address-user-bottom">
						{{home.province}}{{home.city}}
						{{home.area}}{{home.address}}{{home.street}}
					</view>
				</view>
			</view>
			<!-- 自提 -->
			<view class="addr-home" v-show="subState==1">
				<view class="addr-info" @tap="selectSelf(self.id,self)" v-for="(self,selfIndex) in selfList" :key="selfIndex">
					<view class="addr-far">
						<text>{{self.name}}</text>
						<text>{{self.distance}} km</text>
					</view>
					<text class="getgoods-msg">{{self.username}}&nbsp;&nbsp;&nbsp;{{self.phone}}</text>
					<text class="getgoods-addr">{{self.province_name}}{{self.city_name}}
						{{self.area_name}}{{self.address_name}}{{self.street_name}}
					</text>
				</view>
			</view>
		</view>
		<view class="add" v-show="subState==2">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
			</view>
		</view>
	</view>
</template>

<script>
	//高德SDK
	import amap from '../../common/SDK/amap-wx.js';
	export default {

		onLoad() {
			var _this = this;
			// #ifdef APP-PLUS
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
			this.amapPlugin = new amap.AMapWX({
				//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
				key: '5b9b64be2413fc19c26683fcf0de890f'
			});
			//定位地址
			this.amapPlugin.getRegeo({
				success: (data) => {
					//console.log(data)
					this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g, ''); //把"市"去掉

					var lat = data[0].latitude; //纬度
					var lng = data[0].longitude; //经度


					// 自提点列表
					uni.request({
						url: this.config.url + "order/store",
						method: "post",
						data: {
							token: this.token,
							lat: lat,
							lng: lng,

						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 1) {
								this.selfList = res.data.data.data
							} else {
                              
							}
						}
					})
				}
			});


		},
		mounted() {



			//我的收获地址
			uni.request({
				url: this.config.url + "member/address",
				method: "post",
				data: {
					token: this.token,

				},
				success: (res) => {
					//console.log(res.data.data, res)
					if (res.data.code == 1) {
						this.homeList = res.data.data
					} else {

					}
				}
			})
		},
		data() {
			return {

				subState: "1",
				typeClass: 'home',
				city: "",
				addr: {},
				selfList: [],
				homeList: [],
				checked: ""
			}
		},
		methods: {
			switchType(type) {

				this.typeClass = type;
				if (type == "home") {
					this.subState = '1';
					
				} else if (type == "self") {
					this.subState = '2';
				}
			},
			add() {
				uni.navigateTo({
					url: "edit/edit?type=add"
				})
			},
			//选取我的收货地址
			selectHome(id) {
				//console.log(id)
				this.checked = !this.checked;

			},
			//选取自提点地址
			selectSelf(id,self) {
				var selfAddr=JSON.stringify(self)
				//console.log(id,self)
				uni.request({
					url: this.config.url + "station/default",
					method: "post",
					data: {
						token: this.token,
						station_id: id
					},
					success: (res) => {
						
						if (res.data.code == 1) {
							uni.showToast({
								title: '设置成功',
								duration: 1000
							});
<<<<<<< HEAD
							// back不重载
							uni.navigateTo({
								url:"/pages/order/confirmation?self="+selfAddr
=======
							
                        uni.setStorage({
							key:"address",
							data:selfAddr,
							success:function(){
								//console.log("success")
							}
						})
							uni.navigateBack({
								url:"/pages/order/confirmation"
>>>>>>> b4d2f6febcf334e2c50e5fb6674fcef0120e629c
							})
							
							// uni.navigateBack({
							// 	url:"/pages/order/confirmation?self="+selfAddr
							// })
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.sendType {

		background: rgba(245, 245, 245, 1);
		height: 100vh;

	}

	.send-type {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100upx;
		border-top: 1px solid #F5F5F5;
		background: white;

		view {
			font-size: 30upx;

			color: rgba(51, 51, 51, 1);
		}

		.on {

			border-bottom: 5upx solid rgba(20, 204, 33, 1);
			font-weight: bold;
			color: rgba(20, 204, 33, 1);
		}

	}

	.send-add {



		.add-list {
			display: flex;
			background: white;
			align-items: center;
			margin-top: 20upx;
			width: 100%;

			.add-left {
				padding-left: 30upx;
			}

			.add-right {
				display: flex;
				flex-direction: column;
				padding: 30upx;

				.address-user-top {
					display: flex;
					align-items: center;
					font-size: 32upx;

					color: rgba(51, 51, 51, 1) text {
						margin-right: 30upx;
					}
				}

				.address-user-bottom {
					font-size: 28upx;
					color: rgba(85, 85, 85, 1);
				}
			}
		}


	}

	// 自提点
	.addr-home {
		width: 100vw;
		margin-top: 20upx;

		.addr-info {
			display: flex;
			flex-direction: column;
			padding: 30upx;
			border-bottom: 20upx solid #F5F5F5;
			background: white;

			.addr-far {
				display: flex;
				justify-content: space-between;
				align-items: center;

				text:nth-child(1) {
					font-size: 32upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}

				text:nth-child(2) {
					font-size: 24upx;

					color: rgba(85, 85, 85, 1);
				}
			}

			.getgoods-msg {
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				margin: 20upx 0;
			}

			.getgoods-addr {
				font-size: 28upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(85, 85, 85, 1);

			}
		}
	}

	//添加地址
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
</style>
