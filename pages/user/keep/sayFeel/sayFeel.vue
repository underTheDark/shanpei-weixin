<template>
	<view class="sayfeel">
		<view class="send-msg">
			<view class="send-top">
				<view class="people-content">
					<view class="img">
						<image :src="goods.fromuser.headimg"></image>
					</view>
					<view>
						<text>{{goods.fromuser.name}}</text>
						<text>{{goods.fromuser.phone}}</text>
					</view>
				</view>
				<view class="right">评价快递员</view>
			</view>
			<view class="send-bottom">

				<radio-group class="send-bottom">
					<label class="radio">
						<radio value="1" @click="bad(0)" />不满意</label>
					<label class="radio">
						<radio value="2" @click="good(1)" checked="true" />满意</label>
				</radio-group>
			</view>
		</view>
		<view class="product-msg">
			<view class="product-top" v-for="(item,index) in goodsList" :key="index">
				<view class="list">

					<image :src="item.goods_logo"></image>
					<view class="product-top-right">
						<text>
							{{item.goods_title}}
						</text>
						<view class="price-num">
							<view class="price">
								<text>￥</text>
								<text>{{item.price_selling}}</text>
							</view>
							<view class="num">x{{item.number}}</view>
						</view>
					</view>
				</view>
				<view class="product-bottom">
					<view class="left">评分</view>
					<view class="right">
						<uni-rate max="5" :value="num" @change="changeStar($event,index)"></uni-rate>
					</view>
				</view>
				<view class="upload-photo">
					<textarea @blur="getcontent($event,index)" placeholder="分享本次购物体验"></textarea>

					<view class="upload-imgs">
						<!-- <view class="imgs">
							
							<robby-image-upload :server-url="delUrl" v-model="imageData" @delete="deleteImage" @add="addImage" :enable-add="enableAdd"
							 :limit="limitNumber"></robby-image-upload>
						</view> -->
						
						<image class="uploadImg" :src="item" v-for="(item,num) in imgUrl[index]" :key="num"></image>
					
						<view class="add-photo" @click="addPhoto(index)">
							<image src="../../../../static/img/sayfeel/photo.png" />
							<text>添加图片</text>
						</view>
					</view>

				</view>
			</view>

		</view>



		<view class="submit" @click="save()">
			<view>提交</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue" //星星评分
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'

	export default {
		components: {
			uniRate,
			robbyImageUpload
		},
		data() {
			return {
				val: 2,
				bool: false,
				goods: {},
				goodsList: [],
				current: 5,
				num: "1",
				content: "",
				obj: {}, //参数对象
				comment: [], // 参数数组
				starList: [], //星星
				star: {}, //各个商品星星数量
				say: {}, //各个商品星星评论内容
				order_no: "",
				imgData: [],  
				imgUrl:{},
				// delUrl: "http://shanpei.wsstreet.net/Upload",  //图片服务器
				tempFilePaths:[], //本地图片存放
				
			}
		},
		methods: {

			//满意度
			bad() {

				this.val = 2
			},
			good() {
				this.val = 1

			},
			//星星
			changeStar(e, index) {

				this.num = e.value

				this.star[index] = e.value
			},
			//评论内容
			getcontent(e, index) {
				this.say[index] = e.detail.value;

			},
			//提交
			save() {
				console.log(this.goodsList)
				var order_no = this.goods.order_no;
				
				for (var i = 0; i < this.goodsList.length; i++) {
					var obj = {}
					obj.id = this.goodsList[i].id
					
					for (var item in this.star) {
						if (item == i) {
							obj.comment_star = this.star[i]
						}
					}
					for (var num in this.say) {
						if (num == i) {
							obj.comment_content = this.say[i]
						}
					}
					
						
					
					for (var num in this.imgUrl) {
						if (num == i) {
							obj.comment_covers = this.imgUrl[i]
						}
					}	
					
					this.comment.push(obj)
					
				}
			
				if(i>=this.goodsList.length){
						console.log(this.comment)
					this.request({
						url: this.config.url + "order/comment",
						method: "post",
						data: {
							order_no: this.order_no,
							good: this.val,
							comment: this.comment
						},
						success: res => {
						//	console.log(res)
							if (res.data.code == 1) {
								uni.showToast({
									title: res.data.info
								})
								setTimeout(function(){
									uni.navigateTo({
										url:"/pages/user/keep/keep"
									})
								},1000)
								
							} else {
								uni.showToast({
									title: res.data.info
								})
							}
						}
					})
				}
				
			},
			addPhoto(index) {
				
				var _this=this;
				uni.chooseImage({
                    count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						//console.log("zhaopian",res)
						var a=_this.tempFilePaths;
						_this.tempFilePaths = res.tempFilePaths.concat(a);
						
						const uploadTask = uni.uploadFile({
							url: _this.config.url+"/Upload",
							filePath: _this.tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: function(uploadFileRes) {
							var a=JSON.parse(uploadFileRes.data)
							var b=a.data.url;
							var arr=[]
								arr.push(b)
								if(!_this.imgUrl[index]){
									// _this.imgUrl[index]=arr
									_this.$set(_this.imgUrl,index,arr)
									//console.log("1",_this.imgUrl)
								}else{
									// _this.imgUrl[index]=_this.imgUrl[index].concat(arr)
									var b=_this.imgUrl[index].concat(arr)
									_this.$set(_this.imgUrl,index,b)
									//console.log("2",_this.imgUrl)
									
								}
								
							}
						});


					},
					error: function(e) {
						console.log(e);
					}
				});
			}

		},
		onLoad(e) {

			if (e.eval) {
				this.goods = JSON.parse(e.eval)
				console.log(this.goods)
				this.goodsList = this.goods.order_list;
				this.order_no = this.goods.order_no;
				console.log(this.goodsList)
			}
		}

	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS || MP-WEIXIN */
	checkbox .wx-checkbox-input {

		border-radius: 50%;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff !important;
		background: green;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		font-size: 30upx;
	}

	/* #endif */
	.sayfeel {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: rgba(245, 245, 245, 1);
	}


	.send-msg {
		display: flex;
		flex-direction: column;
		width: 96%;
		flex: 1;
		padding: 20upx 2%;
		margin-bottom: 20upx;
		background: white;

		.send-top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.people-content {
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 82upx;
					height: 82upx;

					image {
						width: 82upx;
						height: 82upx;
						border-radius: 82upx;
					}

					margin-right:20upx;
				}

				view:nth-child(2) {
					display: flex;
					flex-direction: column;

					text:nth-child(1) {
						font-size: 28upx;
						font-family: PingFang-SC-Medium;
						font-weight: 500;
						color: rgba(16, 16, 16, 1);

					}

					text:nth-child(2) {
						font-size: 22upx;
						font-family: PingFang-SC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);

					}
				}
			}

			.right {
				font-size: 24upx;
				color: rgba(102, 102, 102, 1);

			}
		}

		.send-bottom {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 20upx;
			width: 100%;

			.good,
			.bad {
				display: flex;
				font-size: 26upx;

				text {
					margin-left: 20upx;
				}

				image {
					width: 34upx;
					height: 34upx;
				}
			}

			.good {
				margin-left: 170upx;

				text {

					color: rgba(51, 51, 51, 1);
				}
			}

			.bad {
				text {
					color: rgba(102, 102, 102, 1);
				}
			}

		}
	}

	/* 产品 */

	.product-msg {
		display: flex;
		flex-direction: column;
		background: white;
		width: 100%;

		.product-top {
			display: flex;
			flex-direction: column;
			width: 100%;

		}

		.product-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 96%;
			padding: 20upx 2%;

			.left {
				font-size: 32upx;
				font-family: PingFang-SC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}

		.upload-photo {
			display: flex;
			flex-direction: column;
			width: 96%;
			padding: 20upx 2%;
			border-bottom: 20upx solid #F7F7F7;
			border-top: 20upx solid #F7F7F7;

			textarea {
				width: 100%;
				height: 200upx;
			}

			.upload-imgs {
				display: flex;
                flex-wrap: wrap;
				    .uploadImg{
						width: 162upx;
						height: 162upx;
						margin-right:10upx;
					}

				
				
			}

			.add-photo {
				border: 1px dashed #cecece;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 162upx;
				height: 162upx;
				border: 1px dashed #cecece;

				image {
					width: 52upx;
					height: 43upx;
					margin-bottom: 15upx;
				}

				text {
					font-size: 24upx;
					color: rgba(153, 153, 153, 1);

				}
			}
		}

		.list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 96%;
			padding: 20upx 2%;
			border-bottom: 1px solid #CECECE;

			image {
				width: 177upx;
				height: 177upx;
			}

			.product-top-right {
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: space-between;
				justify-content: space-around;
				flex: 1;
				margin-left: 20upx;

				text {
					color: rgba(16, 16, 16, 1);
					font-size: 28upx;
				}

				.price-num {
					display: flex;
					justify-content: space-between;

					.price {



						text:nth-child(1) {
							color: rgba(255, 84, 31, 1);
							font-size: 16upx;
						}

						text:nth-child(2) {
							color: rgba(255, 84, 31, 1);
							font-size: 26upx;
						}
					}

					.num {
						color: rgba(51, 51, 51, 1);
						font-size: 24upx;
					}
				}
			}
		}



	}


	.submit {
		background: white;
		height: 288upx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;

		view {
			width: 80%;
			height: 88upx;
			background: rgba(20, 204, 33, 1);
			border-radius: 88upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white
		}
	}
</style>
