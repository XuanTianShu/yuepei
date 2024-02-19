<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="设备详情"  />
		<view class="top" style="">
			<view class="top-content" style="" >
				<view class="title" style="">
					<text>医院名称</text>
					<text class="title-text" style="">{{hospitalName}}</text>
				</view>
				<view class="select" style="">
					<uni-data-select
					  placeholder="请选择科室"
					  v-model="selvalue"
					  :localdata="selist"
					  @change="change()"
				
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
				<text>设备数量：</text><text>{{devicenum}}</text>
			</view>
			<view class="bottom-content" style="" v-for=" item in showList">
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
				<view class="list-state" style="">
					<view class="state" style="">
						<text style="color: #64d059;" v-if="item.status==0">在线、</text>
						<text style="color: #c6c8ca;" v-else-if="item.status==1">离线、</text>
						<text style="color: red;" v-else>故障</text>
					</view>
					<view class="edit"  style="" @tap="getedit(item.hospitalName,item.deviceNumber,item.deviceFloor,item.deviceDepartment,item.deviceRoom,item.deviceBed,item.hospitalId)">
						编辑>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectDeviceTypeDetails,selectDepartment,selectDeviceAddress1} from '@/api/system/hospital'
  export default {
    data() {
      return {
        selvalue: '',
        selist: [],
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
		async change(e){
			if(e){
				console.log(e,'----');
				for(let i in this.selist){
					if(e==this.selist[i].value){
						this.deviceDepartment =this.selist[i].text
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
					userId:userid
					// userId:userid
					
				}
				console.log('--==--');
				console.log(data);
				_this.devicesList=[]
				let res = await selectDeviceTypeDetails(data)
				if(res.code == 200){
					_this.hospitalName=res.data.hospitalName
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				// if(_this.devicesList){
					console.log('哈哈哈');
					let hospitalId=res.data.hospitalId
					
					let resg=await selectDeviceAddress1(hospitalId)
					
					_this.itemlist=resg.data
					
				// }
				for(let i in _this.devicesList){
					console.log('diyiceng');
					for(let n in _this.itemlist.hospital_one){
						// console.log('jinlai',_this.devicesList[i].deviceFloor, _this.itemlist.hospital_one[n].hospitalId);
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
			_this.showList=_this.devicesList
			console.log('-009998898999 me',_this.showList);
			// }
			
		},
		back(){
			uni.reLaunch({
				url:"/pages/nosocomial/device/index"
			})
		},
		async getList(){
			let _this = this
			// userId:_this.userid
			let userid=Number(_this.userid)
			
			if(_this.deviceTypeId==undefined){
				_this.deviceTypeId=''
			}else{
				_this.deviceTypeId=_this.deviceTypeId
			}
			let data={
				deviceTypeId:_this.deviceTypeId,
				userId:userid,
				deviceDepartment:''
			}
			
			console.log(data,'列表数据');
			let res = await selectDeviceTypeDetails(data)
			if(res.code == 200){
				
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.deviceDetailsVoList
				_this.devicenum=res.data.deviceDetailsVoList.length
				// if(_this.devicesList){
					let hospitalId=res.data.hospitalId
					let resg=await selectDeviceAddress1(hospitalId)
					
					_this.itemlist=resg.data
					
				// }
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
			_this.showList=_this.devicesList
			console.log('jinlai me',_this.showList);
			let userId=userid
			let reg=await selectDepartment(userId)
			if(reg.code==200){
				console.log('进来了');
				
				
				for(let i in reg.data){
					let res={text:'',value:''}
					res.text=reg.data[i]
					res.value=i
					this.selist.push(res)
				}
			}
			
		},
		// 编辑
		getedit(hospitalName,deviceNumber,deviceFloor,deviceDepartment,deviceRoom,deviceBed,hospitalId){
			
			uni.navigateTo({
				url:"/pages/nosocomial/device/edit?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFloor="+deviceFloor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed+"&hospitalId="+hospitalId
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
				background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;
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