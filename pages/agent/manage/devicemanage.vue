<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="设备管理"  />
		<view class="top" style="">
			<view class="top-content" style="" >
				<view class="title" style="">
					<text>医院名称</text>
					<text class="title-text" style="">{{hospitalName}}</text>
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
						<!-- <view class="item-value" style="color: #0d0f10;" v-if="utilizationRate==null">
							0
						</view> -->
						<view class="item-value" style="color: #0d0f10;" >
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
			<view class="bottom-content" style="" v-for=" item in showlist">
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
						<view class="item-lable" style="">归属科室</view><view>{{item.deviceFloortext}}</view>
						
					</view>
					<view class="item" style="">
						<view class="item-lable" style="">归属楼层</view><view>{{item.deviceDepartmenttext}}</view>
						
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
					<view class="edit"  style="display: flex;flex-direction: column;" >
						<view class="" style="color: #b9b9b9;" @tap="todetail(item)">
							详情>
						</view>
						<view class="" style="margin: 20rpx 0;"  @tap="getedit(item)">
							编辑>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {selectAgentInfo,selectDeviceAddressByHospital} from '@/api/system/agent'
  export default {
    data() {
      return {
        selvalue: '',
        selist: [],
		showlist:[],
		devicesList:[],
		hospitalId:'',
		deviceAmount:'',
		utilizationRate:'',
		deviceDepartment:'',
		hospitalName:'',
		devicenum:''
      };
    },
	onLoad(option) {
		this.userid=uni.getStorageSync('userid')
		this.hospitalId=option.hospitalId //打印出上个页面传递的参数。
		console.log(this.hospitalId);
		this.getList()
	},
    methods: {
		todetail(item){
			uni.navigateTo({
				url:'detail?deviceNumber='+item.deviceNumber
			})
			
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/manage/devicedetails"
			})
		},
		async getList(){
			let _this = this
			let data={
				utilizationRate:_this.utilizationRate,
				hospitalId:_this.hospitalId,
				userId:_this.userid
			}
			console.log(data);
			let res = await selectAgentInfo(data)
			if(res.code == 200){
				_this.hospitalName=res.data.hospitalName
				_this.deviceAmount=res.data.deviceAmount
				_this.utilizationRate=res.data.utilizationRate
				_this.devicesList=res.data.detailsVos
				_this.devicenum=res.data.detailsVos.length
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
				_this.showlist=_this.devicesList
				
				
			}
		},
		// 编辑
		getedit(item){
			let hospitalName=item.hospitalName
			let deviceNumber=item.deviceNumber
			let deviceFloor=item.deviceFloor
			let deviceDepartment=item.deviceDepartment
			let deviceRoom=item.deviceRoom
			let deviceBed=item.deviceBed
			let hospitalId=item.hospitalId
			uni.navigateTo({
				url:"/pages/agent/manage/edit?hospitalName="+hospitalName+"&deviceNumber="+deviceNumber+"&deviceTypeId="+this.deviceTypeId+"&deviceFloor="+deviceFloor+"&deviceDepartment="+deviceDepartment+"&deviceRoom="+deviceRoom+"&deviceBed="+deviceBed+"&hospitalId="+hospitalId
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
			background-color: #64d059;padding: 23rpx 30rpx 0 30rpx;height: 27%;
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
						display: flex;justify-content: flex-end;color: #4498ea;
					}
				}
			}
		}
	}
</style>