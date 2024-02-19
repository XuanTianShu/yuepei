<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="代设备详情"  />
		<view class="top" style="">
			<view class="top-content" style="" >
				<!-- <view class="title" style="">
					<text>医院名称</text>
					
					<text class="title-text" style="">郑大一附院</text>
				</view> -->
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
						<view class="item-value" style="color: #ed845d;">
							1000.00
						</view>
						<view class="item-text" style="">
							设备收益
						</view>
					</view>
					<view class="item" style="">
						<view class="item-value" style="color: #0d0f10;">
							50%
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
				<text>设备数量：</text><text>1</text>
			</view>
			<view class="bottom-content" style="background-color: #fff;" >
				<view class="view" v-for=" item in devicesList">
					<view class="views">
						<view class="list">
							<view class="item" style="">
								<view class="item-lable" style="">设备编号</view><view>{{item.deviceNumber}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">归属医院</view><view>{{item.hospitalName}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">归属楼层</view><view>{{item.deviceFloortext}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">归属科室</view><view>{{item.deviceDepartmenttext}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">归属房间</view><view>{{item.deviceRoomtext}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">床位号</view><view>{{item.deviceBedtext}}</view>
							</view>
						</view>
						<view class="list-state"  style="" @tap="">
							<view class="state" style="">
								<view class="states" style="">
									<text style="color: #64d059;" v-if="item.status==0">在线、</text>
									<text style="color: #c6c8ca;" v-else-if="item.status==1">离线、</text>
									<text style="color: red;" v-else>故障</text>
								</view>
								
							</view>
							<view class="edit"  style="" >
								<view class="" style="color: #c6c8ca;" @tap="getedit(item)">
									详情>
								</view>
								
								<view class=""  @tap="getedits(item)">
									编辑> 
								</view>
							</view>
						</view>
					</view>
					
					<view class="listbotton" style="">
						<uni-icons type="bottom" size="15" @click="shows()"></uni-icons>
						<view class="bottom" style="" v-if="show==1">
							<view class="bottom-item" style="">
								<view class="">
									一次性牙刷
								</view>
								<view class="">
									3
								</view>
								<view class="">
									缺货
								</view>
							</view>
							<view class="bottom-item" style="">
								<view class="">
									一次性牙刷
								</view>
								<view class="">
									3
								</view>
								<view class="">
									缺货
								</view>
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {selectDeviceTypeDetails,selectDeviceAddressByHospital,selectHospitalList,selectDepartment} from '@/api/system/agent'
  export default {
    data() {
      return {
		  show:0,
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
		this.userName=uni.getStorageSync('userName')
		this.deviceTypeId=option.deviceTypeId //打印出上个页面传递的参数。
		console.log(option,'chuan');
		this.userid=uni.getStorageSync('userid')
		// this.userid=option.userId
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
					if(_this.devicesList){
						let hospitalId=_this.devicesList[0].hospitalId
						let resg=await selectDeviceAddressByHospital(hospitalId)
						
						_this.itemlist=resg.data
						
					}
					for(let i in _this.devicesList){
						console.log('diyiceng');
						for(let n in _this.itemlist.hospital_one){
							if(_this.devicesList[i].deviceFloor== _this.itemlist.hospital_one[n].hospitalId){
								let deviceFloortext=_this.itemlist.hospital_one[n].hospitalName
								 _this.devicesList[i].deviceFloortext=deviceFloortext
								console.log('jinlai me',_this.devicesList);
							}
						}
						
						for(let n in _this.itemlist.hospital_two){
							if(_this.devicesList[i].deviceDepartment== _this.itemlist.hospital_two[n].hospitalId){
								let deviceDepartmenttext=_this.itemlist.hospital_two[n].hospitalName
								 _this.devicesList[i].deviceDepartmenttext=deviceDepartmenttext
							}
						}
						for(let n in _this.itemlist.hospital_three){
							if(_this.devicesList[i].deviceRoom== _this.itemlist.hospital_three[n].hospitalId){
								let deviceRoomtext=_this.itemlist.hospital_three[n].hospitalName
								 _this.devicesList[i].deviceRoomtext=deviceRoomtext
							}
						}
						for(let n in _this.itemlist.hospital_four){
							if(_this.devicesList[i].deviceBed== _this.itemlist.hospital_four[n].hospitalId){
								let deviceBedtext=_this.itemlist.hospital_four[n].hospitalName
								 _this.devicesList[i].deviceBedtext=deviceBedtext
							}
						}
						
					}
				
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
				
				
				let data={
					deviceDepartment:_this.deviceDepartment,
					deviceTypeId:_this.deviceTypeId,
					userId:userid,
					hospitalId:'',
					utilizationRate:''
					
				}
				console.log(data);
				_this.devicesList=[]
				let res = await selectDeviceTypeDetails(data)
				if(res.code == 200){
					_this.hospitalName=res.data.hospitalName
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				if(_this.devicesList){
					// let hospitalId=_this.devicesList[0].hospitalId
					let hospitalId=res.data.hospitalId
					let resg=await selectDeviceAddressByHospital(hospitalId)
					
					_this.itemlist=resg.data
					
				}
				for(let i in _this.devicesList){
					console.log('diyiceng');
					for(let n in _this.itemlist.hospital_one){
						if(_this.devicesList[i].deviceFloor== _this.itemlist.hospital_one[n].hospitalId){
							let deviceFloortext=_this.itemlist.hospital_one[n].hospitalName
							 _this.devicesList[i].deviceFloortext=deviceFloortext
							console.log('jinlai me',_this.devicesList);
						}
					}
		
					for(let n in _this.itemlist.hospital_two){
						if(_this.devicesList[i].deviceDepartment== _this.itemlist.hospital_two[n].hospitalId){
							let deviceDepartmenttext=_this.itemlist.hospital_two[n].hospitalName
							 _this.devicesList[i].deviceDepartmenttext=deviceDepartmenttext
						}
					}
					for(let n in _this.itemlist.hospital_three){
						if(_this.devicesList[i].deviceRoom== _this.itemlist.hospital_three[n].hospitalId){
							let deviceRoomtext=_this.itemlist.hospital_three[n].hospitalName
							 _this.devicesList[i].deviceRoomtext=deviceRoomtext
						}
					}
					for(let n in _this.itemlist.hospital_four){
						if(_this.devicesList[i].deviceBed== _this.itemlist.hospital_four[n].hospitalId){
							let deviceBedtext=_this.itemlist.hospital_four[n].hospitalName
							 _this.devicesList[i].deviceBedtext=deviceBedtext
						}
					}
					
				}
			}
			_this.showList=_this.devicesList
			console.log('-009998898999 me',_this.showList);
			// }
			
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/device/index"
			})
		},
		async getList(){
			let _this = this
			
			let userid=Number(_this.userid)
			
			let data={
				deviceDepartment:_this.deviceDepartment,
				deviceTypeId:_this.deviceTypeId,
				userId:userid,
				hospitalId:'',
				utilizationRate:''
			}
			// let:userid,
			console.log(data,'列表数据');
			// lwt 
			let res = await selectDeviceTypeDetails(data)
			if(res.code == 200){
				
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				_this.devicesnum=res.data.deviceDetailsVoList.length
				if(_this.devicesList){
					// let hospitalId=_this.devicesList[0].hospitalId
					let hospitalId=res.data.hospitalId
					let resg=await selectDeviceAddressByHospital(hospitalId)
					
					_this.itemlist=resg.data
					
				}
				for(let i in _this.devicesList){
					console.log('diyiceng');
					for(let n in _this.itemlist.hospital_one){
						console.log('jinlai',_this.devicesList[i].deviceFloor, _this.itemlist.hospital_one[n].hospitalId);
						if(_this.devicesList[i].deviceFloor== _this.itemlist.hospital_one[n].hospitalId){
							let deviceFloortext=_this.itemlist.hospital_one[n].hospitalName
							 _this.devicesList[i].deviceFloortext=deviceFloortext
							console.log('jinlai me',_this.devicesList);
							// _this.devicesList[i].deviceFloortext='_this.itemlist.hospital_one[n].hospitalName'
						// 	console.log('_this.devicesList[i].deviceFloortext=_this.hospital_one[n].hospitalName'._this.devicesList[i].deviceFloortext,_this.itemlist.hospital_one[n].hospitalName);
						}
					}
					
					for(let n in _this.itemlist.hospital_two){
						// console.log('jinlai',_this.devicesList[i].deviceDepartment, _this.itemlist.hospital_two[n].hospitalId);
						if(_this.devicesList[i].deviceDepartment== _this.itemlist.hospital_two[n].hospitalId){
							let deviceDepartmenttext=_this.itemlist.hospital_two[n].hospitalName
							 _this.devicesList[i].deviceDepartmenttext=deviceDepartmenttext
						}
					}
					for(let n in _this.itemlist.hospital_three){
						// console.log('jinlai',_this.devicesList[i].deviceRoom, _this.itemlist.hospital_three[n].hospitalId);
						if(_this.devicesList[i].deviceRoom== _this.itemlist.hospital_three[n].hospitalId){
							let deviceRoomtext=_this.itemlist.hospital_three[n].hospitalName
							 _this.devicesList[i].deviceRoomtext=deviceRoomtext
						}
					}
					for(let n in _this.itemlist.hospital_four){
						// console.log('jinlai',_this.devicesList[i].deviceBed, _this.itemlist.hospital_four[n].hospitalId);
						if(_this.devicesList[i].deviceBed== _this.itemlist.hospital_four[n].hospitalId){
							let deviceBedtext=_this.itemlist.hospital_four[n].hospitalName
							 _this.devicesList[i].deviceBedtext=deviceBedtext
						}
					}
					
				}
				
				
				
			}
			let userId=userid
			let hos=await selectHospitalList()
			if(hos.code==200){
				console.log('医院下拉框');
				for(let i in hos.data){
					let res={value:'',text:''}
					res.value=hos.data[i].hospitalId
					res.text=hos.data[i].hospitalName
					_this.hospitalist.push(res)
					
				}
			}
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
		// 食肉显示缺货数据
		shows(){
			if(this.show==0){
				this.show=1
			}else{
				this.show=0
			}
		},
		getedit(){
			uni.navigateTo({
				url:"/pages/agent/device/edit"
			})
		},
		// 编辑
		getedits(item){
			console.log(item);
			// return false
			let hospitalName=item.hospitalName
			let deviceNumber=item.deviceNumber
			let deviceFloor=item.deviceFloor
			let deviceDepartment=item.deviceDepartment
			let deviceRoom=item.deviceRoom
			let deviceBed=item.deviceBed
			let hospitalId=item.hospitalId
			uni.navigateTo({
				url:"/pages/agent/device/edits?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFloor="+deviceFloor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed+"&hospitalId="+hospitalId
			})
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
			background-color: #64d059;padding: 20rpx 30rpx 0 30rpx;height: 30%;
			.top-content{
				background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;padding-top: 20rpx;
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
				display: flex;flex-direction: column;
				.view{
					padding: 20rpx;background-color: #fff;margin: 20rpx;border-radius: 20rpx;margin-bottom: 0;
					.views{
						display: flex;justify-content: space-between;
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
								display: flex;flex-direction: column;justify-content: space-between;
								.status{
									font-size: 25rpx;
								}
							}
							.edit{
								flex-direction: column;
								display: flex;justify-content: flex-end;color: #3e87dc;
							}
						}
					}
					.listbotton{
						 text-align: center;
						 .bottom{
							 display: flex;flex-direction: column;
							 
							.bottom-item{
										
										display: flex;justify-content: space-between;padding: 0 40rpx;				 
							} 
						 }
						 
					}
					
					
				}
				
			}
		}
	}
</style>