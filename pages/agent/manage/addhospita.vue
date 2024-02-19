<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="添加医院" background-color="" />
		<view class="form">
			<view class="form-item" style="">
				<view class="label" style="">
					医院名称 
				</view>
				<view class="input" style="z-index: 999;">
					<!-- <uni-data-select
					  placeholder="请选择医院"
					  v-model="hospitalId"
					  :localdata="hospitalist"
					  @change="hoschange"
				
					></uni-data-select> -->
					<input type="text" v-model="hospitalName" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					医院账号
				</view>
				<view class="input" style="">
					<input type="text" v-model="accountNumber" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			
			<view class="form-item" style="">
				<view class="label" style="">
					医院密码 
				</view>
				<view class="input" style="">
					<input type="text" v-model="password" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					医院地址 
				</view>
				<view class="input" style="">
					<input type="text" v-model="hospitalAddress"  placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-item" style="">
				<view class="label" style="">
					联系人 
				</view>
				<view class="input" style="">
					<input type="text" v-model="contacts" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-item" style="margin-bottom: 20rpx;">
				<view class="label" style="">
					分成比例 
				</view>
				<view class="input" style="">
					<input type="text" @blur="inputnum" v-model="divided" placeholder-style="color:#f5f5f5;" placeholder="请输入内容" />
					
				</view>
			</view>
			<view class="" style="color: #ffb895;font-size: 25rpx;margin-left: 26%;">
				{{text1}}
				<text v-if="text==''">0</text>
				<text v-else>{{text}}</text>
				{{text2}}
			</view>
			
			
			
			
			<view class="form-item" style="">
				<view class="label" style="">
					划分名下的设备 
				</view>
				<view class="input" style="height: 70rpx;" >
					<!-- <form @submit="formSubmit"> -->
									<select-cy :value="deviceNumber"  placeholder="请选择设备" :options="datalist" @change="change"></select-cy>
					<!-- </form> -->
					<!-- @change="getlist()" -->
				</view>
			</view>
		</view>
		<view class="">
			
			<button type="default" @click="submit()" style="margin-top: 150rpx;border: 1rpx solid #6ed161;background-color: #64d059;color: #ffffff;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;">确认</button>
		</view>
	</view>
</template>

<script>
	import selectcy from '@/components/select-cy/select-cy.vue'
	import {addHospitalByAgent,selectHospitalList,selectDeviceList,selectProportion,selectDeviceNumberList} from '@/api/system/agent'
  export default {
    data() {
      return {
		  datalist: [],
		  tval: [],

		hospitalId:'',
		hospitalist:[],
		deviceList:[],
		devicevalue:'',
		userid:'',
		agentId:'',
		hospitalName:'',
		accountNumber:'',
		password:'',
		hospitalAddress:'',
		contacts:'',
		divided:'',
		deviceNumber:'',
		text1:'可分配的分成比例为',
		text2:'%',
		text:'',
		newtext:''
      };
    },
	components:{
		selectcy
	},
	onLoad(option) {
		
		this.userid=uni.getStorageSync('userid')
		this.getList()
	},
    methods: {
		change(item,value) {
			console.log('===',item,value);
			this.deviceNumber = value;
			console.log(this.tval,'===');
		},
		inputnum(e){
			console.log(e.detail.value);
			this.newtext=e.detail.value
		},
		async submit(){
			let data={
				// hospitalId:this.hospitalName,
				userId:this.userid,
				hospitalName:this.hospitalName,
				accountNumber:this.accountNumber,
				password:this.password,
				
				hospitalAddress:this.hospitalAddress,
				contacts:this.contacts,
				divided:this.divided,
				deviceNumber:this.deviceNumber
				
			}
			console.log(data,'---');
			if(this.hospitalName==''){
				uni.showToast({
					title: '请输入医院名称',
					icon:'none',
					duration: 1000
				});
			}else if(this.password==""||this.accountNumber==''){
				uni.showToast({
					title: '请输入医院账号和密码',
					icon:'none',
					duration: 1000
				});
			}else if(this.hospitalAddress==''){
				uni.showToast({
					title: '请输入医院地址',
					icon:'none',
					duration: 1000
				});
			}else if(this.contacts==""){
				uni.showToast({
					title: '请输入联系人',
					icon:'none',
					duration: 1000
				});
			}else if(this.divided==''){
				uni.showToast({
					title: '请输入分成比例',
					icon:'none',
					duration: 1000
				});
			}else if(this.newtext>this.text){
					uni.showToast({
						title: '已超出分配的分成比例，请重新分配',
						icon:'none',
						duration: 2000,
					})
					this.divided=''
			}
			else if(this.deviceNumber==''){
				uni.showToast({
					title: '请选择设备编号',
					icon:'none',
					duration: 1000
				});
			}else{
				let res=await addHospitalByAgent(data)
				if(res.code==200){
					uni.showToast({
							title: res.msg,
							icon:'none',
							duration: 2000,
						});
						setTimeout(() => {
						uni.reLaunch({
							url:"devicedetails"
						});
						}, 2000)
					
					
				}else{
					uni.showToast({
							title: res.msg,
							icon:'none',
							duration: 2000,
						});
				}
			}
			
		},
		hoschange(e){
			console.log(e);
			this.hospitalId=e
			for(let i in this.hospitalist){
				
				if(e==this.hospitalist[i].value){
					this.hospitalName=this.hospitalist[i].text
				}
			}
			
		},
		devicechange(e){
			console.log(e);
			for(let i in this.deviceList){
				if(e==i){
					this.deviceNumber=this.deviceList[i].text
				}
			}
		},
		back(){
			uni.navigateBack({
			delta:1,//返回层数，2则上上页
			})
		},
		async getList(){
			let userId=this.userid
			let datas={
				userId:this.userid,
				status:0
			}
			console.log(userId);
			let rest=await selectProportion(datas)
			if(rest.code==200){
				this.text=rest.data
				console.log(this.text,'text');
			}
			let res=await selectDeviceNumberList(userId)
			if(res.code==200){
				console.log(res.data);
				for(let i in res.data){
					let obj={value:'',label:''}
					obj.value=res.data[i].deviceNumber
					obj.label=res.data[i].deviceNumber
					this.datalist.push(obj)
					console.log(this.deviceList,'deviceList');
				}
			}
			let reg=await selectHospitalList()
			if(reg.code==200){
				for(let i in reg.data){
					let obj={value:'',text:''}
					obj.value=reg.data[i].hospitalId
					obj.text=reg.data[i].hospitalName
					this.hospitalist.push(obj)
					console.log(this.hospitalist);
				}
			}
			
			
		},
		// 编辑
		getedit(hospitalName,deviceNumber,deviceFllor,deviceDepartment,deviceRoom,deviceBed){
			
			uni.navigateTo({
				url:"/pages/agent/device/edit?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFllor="+deviceFllor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed
			})
		},
    },
  };
</script>

<style lang="less" scoped>
	// .content {
	// 		width: 300px;
	// 		padding: 20px 0;
	// 		margin: 0 auto;
	 
	// 		.item {
	// 			margin-bottom: 10px;
	// 		}
	 
	// 		.btn {
	// 			margin-top: 20px;
	// 		}
	// 	}

	.container{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.form{
			.form-item{
				display: flex;
				margin: 40rpx 0;
				.label{
					width: 25%;padding: 15rpx;
				}
				.input{
					// ::v-deep uni-data-select{
					// 	color: #d850fa;
						
					// 	font-size: 10rpx;
					// }
					background-color: #f9fbfc;width: 80%;border-radius: 10rpx;
				}
			}
		}
	}
	.place{
		color: #f6f8fa;
	}
	
</style>