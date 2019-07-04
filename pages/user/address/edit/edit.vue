<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">
					收货人
				</view>
				<view class="input">
					<input placeholder="请输入收件人" type="text" v-model="name" />
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
			<view class="row">
				<view class="nominal">
					地区
				</view>
				<view class="input" @tap="chooseCity">
					{{region.label}}
				</view>
				
			</view>
			<view class="row">
				<view class="nominal">
					街道
				</view>
				<view class="input" @tap="chooseCity">
					{{region.label}}
				</view>
				
			</view>
			<view class="row detail-add">
				<view class="nominal">
					详细地址
				</view>
				<view class="input add-content">
					<textarea  v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="add-border"></view>
			<view class="row last-row">
				<view class="nominal">
					设置默认地址
				</view>
				<view class="input switch" >
					<switch color="rgba(20,204,33,1)" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				editType:'edit',
				id:'',
				name:'',
				tel:'',
				detailed:'',
				isDefault:false,
				cityPickerValue: [0, 0, 1],
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""}
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
			isDefaultChange(e){
				this.isDefault = e.detail.value;
			},
			
			save(){
				let data={"name":this.name,"head":this.name.substr(0,1),"tel":this.tel,"address":{"region":this.region,"detailed":this.detailed},"isDefault":this.isDefault}
				if(this.editType=='edit'){
					data.id = this.id
				}
				if(!data.name){
					uni.showToast({title:'请输入收件人姓名',icon:'none'});
					return ;
				}
				if(!data.tel){
					uni.showToast({title:'请输入收件人电话号码',icon:'none'});
					return ;
				}
				if(!data.address.detailed){
					uni.showToast({title:'请输入收件人详细地址',icon:'none'});
					return ;
				}
				if(data.address.region.value.length==0){
					uni.showToast({title:'请选择收件地址',icon:'none'});
					return ;
				}
				uni.showLoading({
					title:'正在提交'
				})
				//实际应用中请提交ajax,模板定时器模拟提交效果
				setTimeout(()=>{
					uni.setStorage({
						key:'saveAddress',
						data:data,
						success() {
							uni.hideLoading();
							uni.navigateBack();
						}
					})
				},300)
				
				
			}
		},
		onLoad(e) {
			//获取传递过来的参数
			
			this.editType = e.type;
			if(e.type=='edit'){
				uni.getStorage({
					key:'address',
					success: (e) => {
						this.id = e.data.id;
						this.name = e.data.name;
						this.tel = e.data.tel;
						this.detailed = e.data.address.detailed;
						this.isDefault = e.data.isDefault;
						this.cityPickerValue = e.data.address.region.value;
						this.region = e.data.address.region;
					}
				})
			}
			
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>
<style lang="scss">

.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 60upx;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			
			width: 90%;
			height: 80upx;
			
			background:rgba(20,204,33,1);

			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		background:white;
		view{
			display: flex;
		}
		.add-border{
			width:100%;
			height:0;
			border-bottom: 20upx solid rgba(247,247,247,1);
		}
		.row{
			width: 96%;
			display: flex;
			
			margin: 0 2%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}
			.input{
				
				
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					
					min-height: 120upx;
					height:360upx;
				}
			}
			
		}
		.last-row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:20upx 0;
		}
	.detail-add{
		display: flex;
		flex-direction: column;
		border:none;
		.nominal{
			height:40upx;
		}
		.add-content{
			height:180upx;
			textarea{
				height:180upx;
				width:100%;
				
			}
		}

		
	}
	
}
	
</style>
