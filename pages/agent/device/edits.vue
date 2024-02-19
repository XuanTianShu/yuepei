<template>
	<view class="container" style="padding: 40rpx;background-color: #fff;height: 100vh;">
		<view class="list" >
			<view class="list-item" style="">
				<view class="">
					设备编号
				</view>
				<view class="item-value" style="">
					
					{{hospitalName}}
				</view>
			</view>
			<view class="list-item" style="">
				<view class="">
					归属医院
					
				</view>
				<view class="item-value" style="">
					{{hospitalName}}
				</view>
			</view>
			<view class="list-input" style="">
				<view class="input-lable" style="">
					归属楼层
				</view>
				<view class="input" style="">
					<uni-data-select
					  placeholder="请选择楼层"
					  v-model="floorvalue"
					  :localdata="FloorList"
					  @change="floorchange"
					></uni-data-select>
					<!-- @change="getlist()" -->
				</view>
			</view>
			<view class="list-input" style="">
				<view class="input-lable" style="">
					归属科室
				</view>
				<view class="input" style="">
					<uni-data-select
					  placeholder="请选择科室"
					  v-model="Departmentvalue"
					  :localdata="DepartmentList"
					  @change="Depchange"
					></uni-data-select>
					
				</view>
			</view>
			<view class="list-input" style="">
				<view class="input-lable" style="">
					归属房间
				</view>
				<view class="input" style="">
					<uni-data-select
					  placeholder="请选择房间"
					  v-model="Roomvalue"
					  :localdata="RoomList"
					  @change="roomchange"
					></uni-data-select>
				</view>
			</view>
			<view class="list-input" style="">
				<view class="input-lable" style="">
					床位号
				</view>
				<view class="input" style="">
					<uni-data-select
					  placeholder="请选择床位号"
					  v-model="Bedvalue"
					  :localdata="BedList"
					  @change="bedchange"
					></uni-data-select>
				</view>
			</view>
			
		</view>
		<view class="fontButton">
			<button type="primary" style=" width: 100%; background-color: #64d059" @tap="submit()">确认</button>
		</view>
	</view>
</template>

<script>
	import {updateDeviceDetails,selectDeviceAddressByHospital} from '@/api/system/agent'
	export default{
		data(){
			return{
				list:[],
				hospitalName:'',
				deviceNumber:'',
				deviceFloor:'',
				deviceDepartment:'',
				deviceRoom:'',
				deviceBed:'',
				deviceTypeId:'',
				FloorList:[],
				DepartmentList:[],
				RoomList:[],
				BedList:[],
				hospitalId:'',
				floorvalue:'',
				Departmentvalue:'',
				Roomvalue:'',
				Bedvalue:'',
				twolist:[],
				theerlist:[],
				fourlist:[]
			}
		},
		onLoad(option) {
			console.log(option,'---');
			this.hospitalName=option.hospitalName,
			this.deviceNumber=option.deviceNumber,
			this.deviceTypeId=option.deviceTypeId
			this.deviceFloor=option.deviceFloor
			this.deviceDepartment=option.deviceDepartment
			this.deviceRoom=option.deviceRoom
			this.deviceBed=option.deviceBed
			this.hospitalId=option.hospitalId
			this.getlist()
		},
		methods:{
			roomchange(e){
				if(e){
					this.deviceRoom=e
					this.Roomvalue=e
					this.Bedvalue=''
					this.BedList=[]
					console.log(this.DepartmentList,'DepartmentListDepartmentListDepartmentList');
					console.log(e,this.list);
					
					for(let i in this.list.hospital_four){
						if(this.list.hospital_four[i].parentId==e){
								let reg={value:'',text:'',parentId:''}
								reg.value=this.list.hospital_four[i].hospitalId
								reg.text=this.list.hospital_four[i].hospitalName
								reg.parentId=this.list.hospital_four[i].parentId
								this.BedList.push(reg)
								}
					}
					console.log(this.BedList,'this.BedList');
				}
				
			},
			bedchange(e){
				if(e){
					this.deviceBed=e
					this.Bedvalue=e
				}
				
				
				
			},
			Depchange(e){
				if(e){
					this.deviceDepartment=e
					this.Departmentvalue=e
					this.Roomvalue=''
					this.Bedvalue=''
					this.BedList=[]
					this.RoomList=[]
					// console.log(this.twolist);
					console.log(this.DepartmentList,'DepartmentListDepartmentListDepartmentList');
					console.log(e,this.list);
					
					for(let i in this.list.hospital_three){
						if(this.list.hospital_three[i].parentId==e){
								let reg={value:'',text:'',parentId:''}
								reg.value=this.list.hospital_three[i].hospitalId
								reg.text=this.list.hospital_three[i].hospitalName
								reg.parentId=this.list.hospital_three[i].parentId
								this.RoomList.push(reg)
								}
					}
					console.log(this.RoomList,'this.RoomList');
				}
				
			},
			floorchange(e){
				if(e){
					this.Roomvalue=''
					this.Bedvalue=''
					this.Departmentvalue=''
					this.deviceFloor=e
					this.floorvalue=e
					console.log(e);
					this.RoomList=[]
					this.BedList=[]
					this.DepartmentList=[]
					console.log(this.DepartmentList,'DepartmentListDepartmentListDepartmentList');
					console.log(e,this.list);
					
					for(let i in this.list.hospital_two){
						if(this.list.hospital_two[i].parentId==e){
								let reg={value:'',text:'',parentId:''}
								reg.value=this.list.hospital_two[i].hospitalId
								reg.text=this.list.hospital_two[i].hospitalName
								reg.parentId=this.list.hospital_two[i].parentId
								this.DepartmentList.push(reg)
								}
					}
					console.log(this.DepartmentList,'this.DepartmentList');
				}
				
			},
			async getlist(){
				let hospitalId=this.hospitalId
				let list=[]
				let res=await selectDeviceAddressByHospital(hospitalId)
				if(res.code==200){
					
					this.list=res.data
					
					for(let i in res.data.hospital_one){
						// if(this.deviceFloor==res.data.hospital_one[i].hospitalId){
								let reg={value:'',text:'',parentId:''}
								reg.value=res.data.hospital_one[i].hospitalId
								reg.text=res.data.hospital_one[i].hospitalName
								reg.parentId=res.data.hospital_one[i].parentId
								this.FloorList.push(reg)
					}
					for(let i in res.data.hospital_two){
						if(res.data.hospital_two[i].parentId==this.deviceFloor){
								let reg={value:'',text:'',parentId:''}
								reg.value=res.data.hospital_two[i].hospitalId
								reg.text=res.data.hospital_two[i].hospitalName
								reg.parentId=res.data.hospital_two[i].parentId
								this.DepartmentList.push(reg)
								}
					}
					for(let i in res.data.hospital_three){
						if(res.data.hospital_three[i].parentId==this.deviceDepartment){
							console.log('kesfangjianhi',this.RoomList);
								let reg={value:'',text:'',parentId:''}
								reg.value=res.data.hospital_three[i].hospitalId
								reg.text=res.data.hospital_three[i].hospitalName
								reg.parentId=res.data.hospital_three[i].parentId
								this.RoomList.push(reg)
								
								}
								
					}
					for(let i in res.data.hospital_four){
						if(res.data.hospital_four[i].parentId==this.deviceRoom){
								let reg={value:'',text:'',parentId:''}
								reg.value=res.data.hospital_four[i].hospitalId
								reg.text=res.data.hospital_four[i].hospitalName
								reg.parentId=res.data.hospital_four[i].parentId
								
								this.BedList.push(reg)
								
								}
								
					}
					
					
					this.floorvalue=this.deviceFloor
					this.Departmentvalue=this.deviceDepartment
					this.Roomvalue=this.deviceRoom
					this.Bedvalue=this.deviceBed
					this.floorvalue=Number(this.floorvalue)
					this.Departmentvalue=Number(this.Departmentvalue)
					this.Roomvalue=Number(this.Roomvalue)
					this.Bedvalue=Number(this.Bedvalue)
					// console.log(typeof this.Bedvalue,'this.BedList,this.Bedvalue');
					
					// console.log(this.BedList, typeof this.Bedvalue,'this.BedList,this.Bedvalue');
					
				}
				
			},
			requestRegister(){
				uni.navigateTo({
					url:"/pages/nosocomial/device/details"
				})
			},
			async submit(){
				let _this=this
				if(_this.deviceFloor==''){
					uni.showToast({
						title: '请选择归属楼层',
						icon: 'none'
					})
				}else if(_this.deviceDepartment==''){
					uni.showToast({
						title: '请选择归属科室',
						icon: 'none'
					})
				}else if(_this.deviceRoom==''){
					uni.showToast({
						title: '请选择归属房间',
						icon: 'none'
					})
				}else if(_this.deviceBed==''){
					uni.showToast({
						title: '请选择床位号',
						icon: 'none'
					})
				}else{
					let data={
						hospitalName:_this.hospitalName,
						deviceNumber:_this.deviceNumber,
						floorId:_this.deviceFloor,
						departmentId:_this.deviceDepartment,
						roomId:_this.deviceRoom,
						bedId:_this.deviceBed
					}
					console.log(data,'啦啦啦');
					let res = await updateDeviceDetails(data)
					if(res.code==200){
						uni.showToast({
							title: '操作成功',
							icon: 'success',    //将值设置为 success 或者 ''
							duration: 1000    //持续时间为 2秒
						})
						uni.reLaunch({
							url:'details?deviceTypeId='+_this.deviceTypeId
						});
					}
				}
				
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.container{
		padding: 40rpx;background-color: #fff;height: 100vh;
		.list{
			.list-item{
				display: flex;margin: 30rpx 0;
				.item-value{
					margin-left: 20%;
				}
			}
			.list-input{
				display: flex;margin: 40rpx 0;
				.input-lable{
					width: 25%;margin-top: 5rpx;
				}
				.input{
					background-color: #fafafa;padding: 15rpx;width: 75%;border-radius: 10rpx;
					input{
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.fontButton{
		font-size: 25rpx;
		margin-top: 300rpx;
		
		display: flex;
		align-items: center;
	}
	
	
</style>