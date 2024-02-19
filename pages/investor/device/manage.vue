<template>
	<view class="manage">
			<view class="main">
					<view class="m1">
							<sx class="sx" ref="sx1"></sx>
							<sx class="sx" ref="sx2"></sx>
							<sx class="sx" ref="sx3"></sx>
							<view class="m2">
									<view class="m3">
											<view style="color:goldenrod;">{{deviceAmount}}</view>
											<text >设备收益</text>
									</view>
									<view class="m3">
											<view >{{utilizationRate}}%</view>
											<text >综合使用率</text>
									</view>
							</view>
					</view>
			</view>
			<view class="section">
					<h1 class="title">设备数量:{{deviceSum}}</h1>
					<view class="s1" v-if="list.length==0">暂无记录</view>
					<view v-else class="s1" v-for="(item,index) in list" :key="index">
						<view class="s1_a s1_a2">
							<view>
								<text class="s1_t">设备编号:</text>
								<text>{{item.deviceNumber}}</text>
							</view>
							<text
								:style="item.status==0?'color:#64d059':(item.status==1?'opacity: 0.5;':'color:red')"
								>
								{{item.status==0?'在线':(item.status==1?'离线':'故障')}}
							</text>
						</view>
						<view class="s1_a">
							<text class="s1_t">归属代理:</text>
							<text>{{item.agentName||''}}</text>
						</view>
						<view class="s1_a">
							<text class="s1_t">归属医院:</text>
							<text>{{item.hospitalName||''}}</text>
						</view>
					</view>
			</view>
	</view>
</template>

<script>
	import {investorDeviceManage,selectDeviceTypeByHospital} from '@/api/system/user.js'
	import sx from '@/components/select-cy/select-y.vue'
	export default{
		data(){
			return{
				list:[],
				sx:'',
				manage:{},
				deviceSum:0,//收益
				deviceAmount:0,//收益
				utilizationRate:0//使用率
			}
		},
		components:{
			sx
		},
		mounted(){
			this.$refs.sx1.data.placeholder='请选择医院'
			
			this.$refs.sx1.characteristic='sx1'
			// 直接/static 不要@/或者../  小程序会自己去找
			// this.$refs.sx1.data.icon='/static/images/triangle.png'
			this.$refs.sx2.data.placeholder='请选择科室'
			
			this.$refs.sx2.characteristic='sx2'
			
			this.$refs.sx3.data.placeholder='请选择使用率'
			this.$refs.sx3.characteristic='sx3'
		},
		onLoad(val) {
			this.manage.deviceTypeId=val.deviceTypeId
			console.log(typeof this.manage.deviceTypeId)
			let data={
				deviceTypeId:val.deviceTypeId
			}
			this.selectDeviceTypeByHospital(data)
			this.investorDeviceManage();
		},
		methods:{
			    async selectDeviceTypeByHospital(data){
					let res = await selectDeviceTypeByHospital(data)
					res.data.forEach((item,index)=>{
						res.data[index].title=item.hospitalName
						let arr=[]
						item.departmentList.forEach(itm=>{
							let d={
								title:itm
							}
							arr.push(d)
						})
						res.data[index].departmentList=arr
					})
					this.$refs.sx1.data.list=res.data
					console.log('hospital',res)
				},
				// 
				async investorDeviceManage(){
					// console.log('manage',this.manage)
					let res= await investorDeviceManage(this.manage)
					this.list=res.data.deviceDetails
					this.deviceSum=res.data.deviceSum
					this.utilizationRate=res.data.utilizationRate
					this.deviceAmount=res.data.deviceAmount
					console.log(res.data)
				},
				
				change(e) {
				    console.log("this.sx:", this.sx);
					switch(this.sx){
						case 'sx1':
							if(e){
								this.manage.hospitalId=e.hospitalId
								this.$refs.sx2.data.list=e.departmentList;
							}else{
								this.manage.hospitalId=''
								this.manage.departmentName=''
								this.$refs.sx2.data.list=[];
								this.$refs.sx2.title=''
							};
							this.investorDeviceManage();
							break;
						case 'sx2':
							if(e){
								this.manage.departmentName=e.title
							}else{
								this.manage.departmentName=''
							};
							this.investorDeviceManage();
							break;
						default : 
							
					}
				},
		},
	}
</script>

<style lang="less" scoped>
	.manage{
		width: 100%;height: 100%;
		.section{
			position: relative;
			top: 38%;
			width: 100%;height: 100%;
			padding:  0 35rpx;
			h1,.s1{
				margin-bottom: 25rpx;
			}
			.s1{
				margin-bottom: ;
				background-color: #FFF;
				border-radius: 18rpx;
				width: 100%;
				padding:20rpx 24rpx;
				.s1_t{
					opacity: 0.5;
				}
				.s1_a{
					margin: 14rpx 0;
				}
				.s1_a2{
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.main{
			background-color: #64d059;
			padding: 25rpx 35rpx 0 35rpx;
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999;
			.m1{	
					background-color: #FFF;
					border-radius: 15rpx 15rpx 0 0;
					padding: 30rpx 30rpx 20rpx 30rpx;
					display: flex;
					flex-flow: column;
					justify-content: center;
					.sx{
						margin-bottom: 20rpx;
					}
					.m2{
						width: 100%;
						display: flex;
						justify-content: space-between;
						.m3{
								border-radius: 18rpx;
								width: 48%;
								text-align: center;
								font-size: 32rpx;
								font-weight: bold;
								background-color: rgba(236, 236, 236, 0.5);
								padding: 30rpx 0;
								view{
									margin-bottom: 15rpx;
								}
								text{
									opacity: 0.5;
									font-size: 24rpx;
									font-weight: unset;
								}
						}
					}
			}
		}
	}
</style>