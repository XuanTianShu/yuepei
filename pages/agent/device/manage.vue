<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="设备详情"  />
		<view class="top" style="">
			<view class="top-content" style="" >
				<view class="select" style="">
					<uni-data-select
					  placeholder="请选择医院"
					  v-model="hospitavalue"
					  :localdata="hospitalist"
					  @change="hoschange"
				
					></uni-data-select>
				</view>
				<view class="select" style="">
					<uni-data-select
					  placeholder="请选择科室"
					  v-model="depvalue"
					  :localdata="deplist"
					  @change="depchange"
				
					></uni-data-select>
				</view>
				<view class="select" style="">
					<uni-data-select
					
					  placeholder="请选择使用率"
					  v-model="value"
					  :localdata="range"
					  @change="change"
					></uni-data-select>
				</view>
				
				
				<view class="content" style="">
					<view class="item" style="">
						<view class="item-value" style="color: #ed845d;" v-if="deviceAmount==null">
							0.00
						</view>
						<view class="item-value" style="color: #ed845d;" v-else>
							{{deviceAmount}}
						</view>
						<view class="item-text" style="">
							设备收益
						</view>
					</view>
					<view class="item" style="">
						<view class="item-value" style="color: #0d0f10;" v-if="utilizationRate==null">
							0
						</view>
						<view class="item-value" style="color: #0d0f10;" v-else>
							{{utilizationRate}}%
						</view>
						<view class="item-text" style="">
							综合使用率
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom" style="">
			<view class="bottom-title" style="margin: 0 20rpx;">
				<text>设备数量：</text><text>{{devicesList.length}}</text>
			</view>
			<view class="bottom-content" style="" v-for=" item in devicesList">
				<view class="list">
					<view class="item" style="">
						<view class="item-lable" style="">设备编号</view><view>{{item.deviceNumber}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">设备类型</view><view>{{item.deviceTypeName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属代理</view><view>{{item.agentName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属医院</view><view>{{item.hospitalName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属楼层</view><view>{{item.deviceFloorName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属科室</view><view>{{item.deviceDepartmentName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属房间</view><view>{{item.deviceRoomName}}</view>
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">床位号</view><view>{{item.deviceBedName}}</view>
					</view>
				</view>
				<view class="list-state" style="">
					<view class="state" style="">
						<text style="color: #64d059;" v-if="item.status==0">在线、</text>
						<text style="color: #c6c8ca;" v-else-if="item.status==1">离线、</text>
						<text style="color: red;" v-else>故障</text>
					</view>
					<view class="edit"  style="" @tap="getdetail(item)">
						详情>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectDeviceTypeDetails,selectDeviceAddressByHospital,selectHospitalList,selectDepartment,selectAgentHospitalList} from '@/api/system/agent'
  export default {
    data() {
      return {
        selvalue: '',
		depvalue:'',
        deplist: [],
		hospitavalue:'',
		hospitalist:[],
		devicesList:[],
		deviceTypeId:'',
		deviceAmount:'',
		utilizationRate:'',
		deviceDepartment:'',
		hospitalName:'',
		userid:'',
		devicenum:'',
		userName:'',
		itemlist:[],
		showList:[]
      };
    },
	onLoad(option) {
		this.deviceTypeId=option.deviceTypeId //打印出上个页面传递的参数。
		console.log(option,'chuan');
		this.userid=uni.getStorageSync('userid')
		this.getList()
	
	},
    methods: {
		async hoschange(e){
			let _this = this
			console.log(e,_this.hospitavalue);
			_this.hospitavalue=e
			let userid=Number(_this.userid)
			let data={
				deviceDepartment:_this.deviceDepartment,
				deviceTypeId:_this.deviceTypeId,
				userId:userid,
				hospitalId:_this.hospitavalue,
				utilizationRate:''
				
			}
			_this.devicesList=[]
			let res = await selectDeviceTypeDetails(data)
			console.log(data,'sssssssss');
			if(res.code==200){
				
						_this.hospitalName=res.data.hospitalName
					_this.deviceAmount=res.data.deviceAmount
					_this.utilizationRate=res.data.utilizationRate
					_this.devicesList=res.data.deviceDetailsVoList
					// if(_this.devicesList){
					// 	// let hospitalId=_this.devicesList[0].hospitalId
					// 	let hospitalId=res.data.hospitalId
					// 	let resg=await selectDeviceAddressByHospital(hospitalId)
						
					// 	_this.itemlist=resg.data
						
					// }
					// for(let i in _this.devicesList){
					// 	console.log('diyiceng');
					// 	for(let n in _this.itemlist.hospital_one){
					// 		if(_this.devicesList[i].deviceFloor== _this.itemlist.hospital_one[n].hospitalId){
					// 			let deviceFloortext=_this.itemlist.hospital_one[n].hospitalName
					// 			 _this.devicesList[i].deviceFloortext=deviceFloortext
					// 			console.log('jinlai me',_this.devicesList);
					// 		}
					// 	}
						
					// 	for(let n in _this.itemlist.hospital_two){
					// 		if(_this.devicesList[i].deviceDepartment== _this.itemlist.hospital_two[n].hospitalId){
					// 			let deviceDepartmenttext=_this.itemlist.hospital_two[n].hospitalName
					// 			 _this.devicesList[i].deviceDepartmenttext=deviceDepartmenttext
					// 		}
					// 	}
					// 	for(let n in _this.itemlist.hospital_three){
					// 		if(_this.devicesList[i].deviceRoom== _this.itemlist.hospital_three[n].hospitalId){
					// 			let deviceRoomtext=_this.itemlist.hospital_three[n].hospitalName
					// 			 _this.devicesList[i].deviceRoomtext=deviceRoomtext
					// 		}
					// 	}
					// 	for(let n in _this.itemlist.hospital_four){
					// 		if(_this.devicesList[i].deviceBed== _this.itemlist.hospital_four[n].hospitalId){
					// 			let deviceBedtext=_this.itemlist.hospital_four[n].hospitalName
					// 			 _this.devicesList[i].deviceBedtext=deviceBedtext
					// 		}
					// 	}
						
					// }
				
			}
		},
		async depchange(e){
			if(e){
				console.log(e,'----');
				for(let i in this.deplist){
					if(e==this.deplist[i].value){
						this.deviceDepartment =this.deplist[i].text
					}
				}
			}else{
				console.log(e,'meiyoudongxi');
				this.deviceDepartment =''
			}
				let _this = this
				let userid=Number(_this.userid)
				console.log(_this.hospitalId,'_this.hospitalId');
				if(_this.hospitavalue==undefined){
					_this.hospitavalue=''
				}else{
					_this.hospitavalue=_this.hospitavalue
				}
				
				let data={
					deviceDepartment:_this.deviceDepartment,
					deviceTypeId:_this.deviceTypeId,
					userId:userid,
					hospitalId:_this.hospitavalue,
					utilizationRate:''
					
				}
				console.log(data,'dataaaaaaaaaaa');
				_this.devicesList=[]
				let res = await selectDeviceTypeDetails(data)
				if(res.code == 200){
					_this.hospitalName=res.data.hospitalName
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				console.log(_this.devicesList,'_this.devicesList');
			}
			_this.showList=_this.devicesList
			console.log('-009998898999 me',_this.showList);
			// }
			
		},
		async change(e){
			console.log(e,'----');
			for(let i in this.selist){
				if(e==this.selist[i].value){
					this.deviceDepartment =this.selist[i].text
				}
				
			}
			let _this = this
			let data={
				deviceDepartment:this.deviceDepartment,
				deviceTypeId:_this.deviceTypeId
			}
			console.log(data);
			let res = await selectDeviceTypeDetails(data)
			if(res.code == 200){
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				console.log('ghahhaha',res.data);
			}
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/device/index"
			})
		},
		async getList(){
			let _this = this
			
			// let userid=Number(_this.userid)
			
			if(_this.deviceTypeId==undefined){
				_this.deviceTypeId=''
			}else{
				_this.deviceTypeId=_this.deviceTypeId
			}
			let data={
				deviceDepartment:_this.deviceDepartment,
				deviceTypeId:_this.deviceTypeId,
				userId:_this.userid,
				hospitalId:'',
				utilizationRate:''
			}
			// let:userid,
			console.log(data,'列表数据');
			// lwt 
			let userId=_this.userid
			console.log(userId);
			let hos=await selectAgentHospitalList(userId)
			if(hos.code==200){
				console.log('医院下拉框');
				for(let i in hos.data){
					let res={value:'',text:''}
					res.value=hos.data[i].hospitalId
					res.text=hos.data[i].hospitalName
					_this.hospitalist.push(res)
					
				}
			}
			let res = await selectDeviceTypeDetails(data)
			if(res.code == 200){
				
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				_this.devicesnum=res.data.deviceDetailsVoList.length
				
				
				
				
			}
			// let userId=userid
			
			console.log(_this.hospitalist);
			_this.showList=_this.devicesList
			
			console.log('jinlai me',userId);
			
			let reg=await selectDepartment(userId)
			if(reg.code==200){
				console.log('进来了');
				
				
				for(let i in reg.data){
					let res={text:'',value:''}
					res.text=reg.data[i]
					res.value=i
					_this.deplist.push(res)
					console.log(_this.deplist,'_this.selist.');
				}
			}
			
		},
		// 编辑
		getdetail(item){
			uni.navigateTo({
				url:'detail?deviceNumber='+item.deviceNumber
			})
			// hospitalName,deviceNumber,deviceFloor,deviceDepartment,deviceRoom,deviceBed,hospitalId
			// uni.navigateTo({
			// 	url:"/pages/nosocomial/device/edit?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFloor="+deviceFloor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed+"&hospitalId="+hospitalId
			// })
		},
      // change(e) {
      //   console.log("e:", e);
      // },
    },
  };
</script>

<style lang="less" scoped>
	.container{
		height: 100vh;width: 100%;
		.top{
			background-color: #64d059;padding: 23rpx 30rpx 0 30rpx;height: 30%;
			.top-content{
				background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;padding-top: 40rpx;
				.title{
					padding: 30rpx;
					.title-text{
						margin-left: 30rpx;
					}
				}
				.select{
					margin: 10rpx auto;background-color: #f6f8fa;z-index:999;border-radius: 10rpx;width: 80%;color: #c6c8ca;
				}
				.content{
					display: flex;margin: 0 30rpx;
					.item{
						text-align: center;width: 50%;background-color: #f6f8fa;margin: 20rpx 20px;padding: 28rpx;border-radius: 10rpx;
						.item-value{
							font-size: 40rpx;
						}
						.item-text{
							color: #c6c8ca;font-size: 23rpx;margin-top: 8rpx;
						}
					}
					
				}
			}
		}
		
		.bottom{
			background-color: #f6f8fa;padding: 20rpx;height: 70%;
			.bottom-title{
				margin: 0 20rpx;
				
			}
			.bottom-content{
				padding: 20rpx;background-color: #fff;display: flex;justify-content: space-between;margin: 20rpx;border-radius: 20rpx;
				.list{
					.item{
						display: flex;margin: 20rpx 0;
						.item-lable{
							width: 130rpx;color: #c6c8ca;
						}
					}
				}
				.list-state{
					display: flex;flex-direction: column;justify-content: space-between;
					.state{
						font-size: 25rpx;
					}
					.edit{
						display: flex;justify-content: flex-end;color: #3e87dc;
					}
				}
			}
		}
	}
</style>