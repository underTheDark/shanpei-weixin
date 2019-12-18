<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收货人
				</view>
				<view class="input">
					<input placeholder="请输入收件人" type="text" v-model="username" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					手机号
				</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row" @click="selectAddr">
				<view class="nominal" >
					地区
				</view>
				<view class="input">{{address}}</view>
			</view>
			<view class="row">
				<view class="nominal">
					街道
				</view>
				<view class="input addwidth" @tap="chooseStr">
					{{street}}
				</view>

			</view>
			<view class="row detail-add">
				<view class="nominal">
					详细地址
				</view>
				<view class="input add-content">
					<input v-model="detailed"  placeholder="输入详细地址">

					
				</view>
			</view>
			<view class="add-border"></view>
			<view class="row last-row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch">
					<switch color="rgba(20,204,33,1)" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
		<!-- 地址弹出框 -->
        <view class="picker_li" v-if="ishow==1">
			<view class="pickbg"></view>
			<view class="btn_c">
				<view class="qx" @tap="cancel">取消</view>
				<view class="sign" @tap="sure" :disabled="isdisabled">确定</view>
			</view>
			<view class="picker_w">
				<view class="li_one" >
					<view class="li_i" 
						:class="[style1 == item.id ? 'active' : '' ]"
						v-for="(item,a) in city_one" 
						:key="a" 
						@tap="showcity(item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="li_two">
					<view class="li_i" 
						:class="[style2 == item.id ? 'active' : '' ]"
						v-for="(item,b) in city_two" 
						:key="b" 
						@tap="showcitytwo(item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				<view class="li_three">
					<view class="li_i"
						:class="[style3 == item.id ? 'active' : '' ]"
						v-for="(item,c) in city_tree" 
						:key="c"
						@tap="showcitythree(item.id,item.name)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
			<!-- 街道地址弹出框 -->
		<view class="picker_li" v-if="ishow==3">
			<view class="pickbg"></view>
			<view class="btn_c">
				<view class="qx" @tap="cancel">取消</view>
				<view class="sign" @tap="sure" :disabled="isdisabled">确定</view>
			</view>
			<view class="picker_w">
				<view class="li_four" >
					<view class="li_i" 
						:class="[style4 == item.id ? 'active' : '' ]"
						v-for="(item,d) in city_four" 
						:key="d" 
						@tap="showcityfour(item.id,item.name)">
						{{item.name}}
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	//import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {

		data() {
			return {
				editType: 'edit',
				ishow:0,   //地址框石佛显示  1显示
				citynum:0,
				style1:'1',
				style2:'0',
				style3:'0',
				style4:"0",
				isdisabled:false, //判断地址石佛填完
				city_one:[],  //省地址
				city_two:[],  //市地址
				city_tree:[],  //区地址
				city_four:[],  //街道地址
				id: '',
				username: '',          //用户名
				tel: '',         //手机号
				detailed: '',   //详细地址
				address:"",
				province: "请选择",
				city: "",
				area: "",
				street: "请选择",
				isDefault: 0,  //设置为默认地址 1
				strId:"",
				themeColor: '#007AFF',
				region:null,  //编辑地址对象
				visible: true,
				
			}
		},
		methods: {
			//调取地址弹出框
			selectAddr(){
				this.ishow=1;
				this.citynum=0;
				this.init(0,1)
				
			},
			showcity(id,name){
				// this.pid=id
				this.init(id,2)
				this.citynum=1
			    this.province=name
				// this.id1=id
				 this.style1=id
			     this.city_tree=[]
				 this.ciry_four=[]
				 this.isdisabled = false;
				 this.street="请选择"	
			},
			showcitytwo(id,name){
				//this.pid=id
				console.log(name)
				this.init(id,3)
				this.citynum=2
				this.city=name
				//this.id2=id
				this.style2=id
				this.isdisabled = false;
			},
			showcitythree(id,name){
				//this.pid=id
				 //this.init(id)
				this.area=name;
				//this.id3=id
				this.style3=id
				this.isdisabled = true;
				this.strId=id;
				this.citynum=4
			},
			showcityfour(id,name){
				
				this.street=name;
				//this.id3=id
				this.style4=id
				this.isdisabled = true;
				
				
			},
			//获取街道
			chooseStr(){
				
				this.ishow=3;
				this.init(this.strId,4)
				
			},
			// 取消
			cancel(){
				this.ishow=0
			},
			//确认
			sure(){
				if(this.isdisabled==true){
					
					this.ishow=0
					this.address=this.province+"-"+this.city+"-"+this.area;
				}else{
					uni.showToast({
						title:"请选择区域",
						icon:'none'
					})
					
				}
			},
			
			init(pid,level){
				// 获取
				this.request({
					url: this.config.url+'area',
					data: {
						pid:pid,
						token:this.token,
						level:level
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
							
						if(this.citynum==0){
							this.city_one=res.data.data
						}else if(this.citynum==1){
							this.city_two=res.data.data
						}else if(this.citynum==2){
							this.city_tree=res.data.data
						}else if(this.citynum==4){
							
						this.city_four=res.data.data;
							
						}
					},
				})
			},
			
			//设置默认地址
			isDefaultChange(e){
				console.log(e.detail.value)
				if(e.detail.value){
					this.isDefault=1;
				}else{
					this.isDefault=0;
				}
			},
                //  新建/修改地址提交
						save() {
							console.log(this.tel, this.detailed)
							let data = {
								"username": this.username,
								"phone": this.tel,
								id: this.id,
								token: this.token,
								province: this.province,
								city: this.city,
								area: this.area,
								street: this.street,
								"is_default": this.isDefault,
								address: this.detailed
							}
			
							if (!this.username) {
								uni.showToast({
									title: '请输入收件人姓名',
									icon: 'none'
								});
								return;
							}
							if (!this.tel) {
								uni.showToast({
									title: '请输入收件人电话号码',
									icon: 'none'
								});
								return;
							}
							if (!this.detailed) {
								uni.showToast({
									title: '请输入收件人详细地址',
									icon: 'none'
								});
								return;
							}
			
							// uni.showLoading({
							// 	title:'正在提交'
							// })
							//实际应用中请提交ajax,模板定时器模拟提交效果
							this.request({
								url: this.config.url + "address/edit",
								method: "post",
								data: data,
								success: (res) => {
									console.log(res)
									if (res.data.code == 1) {
										uni.showToast({
											title:res.data.info,
											duration:1000,
										})
										uni.navigateBack({
											
										})
									}else if(res.data.code==0){
										uni.showToast({
											title:res.data.info,
											duration:1000,
										})
									}
								}
							})
			
			
						}
		},
		onLoad(option) {
			//this.getSiteData()
			//获取传递过来的参数
			 if(option.type){
				  this.region=JSON.parse(option.type)
			 }
			
			 console.log(option,this.region)
			if (this.region) {
			
				this.name = this.region.name;
				this.tel = this.region.phone;
				this.detailed = this.region.address;
				this.id = this.region.id;
				this.province = this.region.province;
				this.city = this.region.city;
				this.area = this.region.area;
				this.street = this.region.street;
				this.isDefault=this.region.is_default;
			}


		},
		mounted(){
			//加载默认地址
			// this.address=this.province+"-"+this.city+"-"+this.area;
			this.address="请选择"
			this.street=this.street;
		}

	}
</script>
<style lang="scss">
	.save {
		view {
			display: flex;
		}

		position: fixed;
		bottom: 60upx;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

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

	.content {
		display: flex;
		flex-wrap: wrap;
		background: white;

		view {
			display: flex;
		}

		.add-border {
			width: 100%;
			height: 0;
			border-bottom: 20upx solid rgba(247, 247, 247, 1);
		}

		.row {
			width: 96%;
			display: flex;

			margin: 0 2%;
			border-top: solid 1upx #eee;

			.nominal {
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
            .addwidth{
				display: flex;
				flex:1
			}
			.input {


				align-items: center;
				font-size: 30upx;

				&.switch {
					justify-content: flex-end;
				}

				input {
                      height:60upx;
					  line-height:60upx;
				}
			}

		}

		.last-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx 0;

		}

		.detail-add {
			display: flex;
			flex-direction: column;

			.nominal {
				height: 60upx;
				display: flex;

				align-items: center
			}

			.add-content {

				display: flex;
				height: 100upx;

				textarea {
					display: inline-block;

					width: 100%;
				}
			}


		}

	}

	
	 //地址选出框
	 .pickbg{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		z-index: 98;
	}
	.btn_c{
		position: fixed;
		bottom:660upx;
		left: 0;
		width:90%;
		height: 40upx;
		padding:20upx 5%;
		background: #fff;
		z-index: 99;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.picker_w{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height:600upx;
		background: #fff;
		z-index: 99;
		padding:30upx 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.li_one,.li_two,.li_three{
		height:600upx;
		width: 33%;
		padding: 0 20upx;
		overflow-y: auto;
		text-align: center;
	}
	.li_four{
		height:600upx;
		
		overflow-y: auto;
		text-align: center;
		.li_i{
			width:100%;
		}
	}
	.sign{
		background: #C49569;
		font-size: 28upx;
		color: #fff;
		padding:8upx 24upx;
		border-radius: 10upx;
	}
	.active{
		color:#C49569;
	}
	.li_i{
		font-size: 28upx;
		padding: 20upx;
	}
	page {
		background: #eee;
	}

	.page {
		padding-top: 20upx;
		padding-bottom: 150upx;
	}

	.ul {
		background: #fff;
		padding: 0 30upx;
	}
	.li{
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		justify-content: flex-start;
		padding: 30upx 0;
		border-bottom: solid 1upx #ECECEC;
	}
	.li:last-child{
		border: none;
	}
	.txt{
		font-size: 16px;
		color: #333;
		flex: 0 0 30%;
	}
	.li input{
		flex: 0 0 70%;
	}
	.sign_btn{
		height:90upx;
		background:#C49569;
		border-radius:10upx;
		color: #fff;
		font-size: 16px;
		margin:100upx 30upx 30upx 30upx;
		text-align: center;
		line-height: 90upx;
	}
	
</style>
