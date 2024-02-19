<template>
	<view class="container" style="">
		<uni-nav-bar left-icon="left" :border="false" :fixed="true" statusBar @clickLeft="back"    title="医院设备"  />
		<view class="top" style="">
			<view class="top-content" style="" >
				<view class="title" style="display: flex;">
					<view class="" style="width: 50%;">
						<text>医院数量</text>
						<text class="title-text" style="">{{hospitalSum}}</text>
					</view>
					<view class="">
						<text>设备数量</text>
						<text class="title-text" style="">{{deviceSum}}</text>
					</view>
				</view>
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
					  placeholder="请选择使用率"
					  v-model="value"
					  :localdata="range"
					  @change="change"
					></uni-data-select>
				</view>
				<view class="content" style="">
					<view class="item" style="">
						<view class="item-value" style="color: #ed845d;">
							{{deviceAmount}}
						</view>
						<view class="item-text" style="">
							设备收益
						</view>
					</view>
					<view class="item" style="">
						<view class="item-value" style="color: #0d0f10;">
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
			
			<view class="bottom-content" style="" >
				
				<view class="view" v-for=" item in devicesList">
					<view class="" style="display: flex;justify-content: space-between;">
						<view class="" style="font-weight: 600;">
							{{item.hospitalName}}
						</view>
						<!-- <view class="list-state"  style="" @tap="" style="display: flex;">
							<view class="">
								分成比例<text style="color: #ed845d;margin-left: 20rpx;">{{item.proportion}}%</text>
							</view>
							
						</view> -->
					</view>
					
					<view class="views">
						<view class="list">
							<view class="item" style="">
								<view class="item-lable" style="">设备数量</view><view>{{item.deviceNum}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">归属医院</view><view>{{item.hospitalName}}</view>
							</view>
							<view class="item" style="">
								<view class="item-lable" style="">设备地址</view><view>{{item.deviceAddress}}</view>
							</view>
						</view>
						<view class="" @click="todetail(item)" style="display: flex;flex-direction: column-reverse;margin-bottom: 20rpx;color: #e6e6e6;">
							详情>
						</view>
					</view>
					
					
				</view>
				
			</view>
		</view>
		<view class="item" style="position: fixed;width: 100%;bottom: 0rpx;padding: 40rpx;" @click="add">
			<button type="default" @click="" style="background-color: #64d057;color: #fff;font-size: 30rpx;">添加医院</button>
		</view>
	</view>
</template>

<script>
	import {selectHospitalAdministration,selectHospitalList} from '@/api/system/agent'
  export default {
    data() {
      return {
        value: '',
		show:0,
		hospitavalue:'',
		hospitalist:[],
        range: [
          { value: 0, text: "骨科" },
          { value: 1, text: "脑科" },
          { value: 2, text: "心电科" }
        ],
		devicesList:[],
		userid:'',
		hospitalSum:'',
		deviceSum:'',
		deviceAmount:'',
		utilizationRate:'',
		// list:[
		// 	{number:'1234567890',name:'郑大一附院',floor:'四层',Department:'骨科',room:'502',bunk:''}
		// ]
      };
    },
	onLoad(option) {
		
		// this.deviceTypeId=option.deviceTypeId //打印出上个页面传递的参数。
		// console.log(this.deviceTypeId);
		this.userid=uni.getStorageSync('userid')
		this.getList()
	},
    methods: {
		todetail(item){
			uni.navigateTo({
				url:'devicemanage?hospitalId='+item.hospitalId
			})
		},
		add(){
			uni.navigateTo({
				url:'addhospita'
			})
		},
		async hoschange(e){
			console.log(e);
			this.hospitavalue=e
				let data={
					userId:this.userid,
					hospitalId:this.hospitavalue
				}
				console.log(data);
				let res=await selectHospitalAdministration(data)
				if(res.code==200){
					this.devicesList=res.data.hospitalManagementVos
					this.hospitalSum=res.data.hospitalSum
					this.deviceSum=res.data.deviceSum
					this.deviceAmount=res.data.deviceAmount
					this.utilizationRate=res.data.utilizationRate
				}
				
			
		},
		back(){
			uni.reLaunch({
				url:"/pages/agent/home/index"
			})
		},
		async getList(){
			let data={
				
				userId:this.userid,
				hospitalId:this.hospitavalue
			}
			console.log(data);
			let res=await selectHospitalAdministration(data)
			if(res.code==200){
				this.devicesList=res.data.hospitalManagementVos
				this.hospitalSum=res.data.hospitalSum
				this.deviceSum=res.data.deviceSum
				this.deviceAmount=res.data.deviceAmount
				this.utilizationRate=res.data.utilizationRate
			}
			let userId=this.userid
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
      change(e) {
        console.log("e:", e);
      },
    },
  };
</script>

<style lang="less" scoped>
	.container{
		width: 100%;
		.top{
			background-color: #64d059;
			padding: 20rpx 30rpx 0rpx 30rpx;
			.top-content{
				background-color: #ffffff;border-radius: 20rpx 20rpx 0 0;padding-bottom: 30rpx;
				.title{
					padding: 30rpx;
					.title-text{
						margin-left: 30rpx;
					}
				}
				.select{
					margin: 10rpx auto;background-color: #f6f8fa;z-index:999;border-radius: 10rpx;width: 90%;color: #c6c8ca;
				}
				.content{
					display: flex;margin: 0 30rpx;
					.item{
						text-align: center;width: 50%;background-color: #f6f8fa;padding: 28rpx;border-radius: 10rpx;
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
			padding:10rpx 20rpx;padding-bottom: 90rpx;
			.bottom-title{
				margin: 0 20rpx;
				
			}
			.bottom-content{
				display: flex;flex-direction: column;
				.view{
					padding: 20rpx;margin: 20rpx;border-radius: 20rpx;margin-bottom: 0;background-color: #fff;
					.views{
						display: flex;justify-content: space-between;
						.list{
							margin: 10rpx 0;
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