<template>
  <view class="device">
		
		<view class="feed_v1_a1" v-show="investor">
			<view class="feed_v1_b1">
				<input type="text" class="feedInput" v-model="nameOrNumber" placeholder="请输入商品名称、订单编号" />
				<view class="feed_v1_b2" @click="search()">搜索</view>
			</view>

			<view >
			<!-- <view v-show="investor"> -->
			<sx ref="sx1"></sx>
			<sx ref="sx2"></sx>
			</view>
		</view>
		
		<view class="myorder_vi_a1">
			<view class="myorder_v1_b1" :style="item.style" v-for="(item,index) in styleCss" :key="index" @click="navSwitch(index)">
				<text>{{item.title}}</text>
				<view :style="item.bgColor"></view>
			</view>
		</view>
		
		<view class="myorder_vi_a2">
			<swiper :current="dispayType" @change="changeSwiper" style="height:100%;">
				<swiper-item style="overflow:auto;">
					
					<view class="cur_v1_a1">
						<view v-for="(item,index) in curList" :style="item.style" @click="selectCurList(index)">{{item.title}}</view>
					</view>
					
					<view class="eq_v2_a1" v-for="(item,index) in commodity" :key="index" @click="$disabledClick(skip,item)">
						<view class="eq_v2_b1">
							<view class="eq_v2_c1 eq_v2_c3">订单编号 <view style="max-width:300rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.orderNumber}}</view> </view>
							<view class="eq_v2_c1">
								<view class="eq_v2_d1" v-if="item.status == '0'">租借中</view>
								<view class="eq_v2_d2" v-if="item.status == '1'">待支付</view>
								<view class="eq_v2_d1" v-if="item.status == '3'">审核中</view>
								<view  v-if="item.status == '4'">已退款</view>
								<view v-if="item.status == '2'">已完成</view>
							</view>
						</view>
						<view class="eq_v2_b1 ">
							<view class="eq_v2_c1 eq_v2_c3">设备编号 <view>{{item.deviceNumber}}</view> </view>
							<!-- <view class="eq_v2_c1 eq_v2_c2">设备类型 <text style="display: block;max-width:140rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.deviceType}}</text> </view> -->
						</view>
						<view class="eq_v2_b1">
							<view class="eq_v2_c1 eq_v2_c3">设备类型 <view style="white-space: nowrap;">{{item.deviceType}}</view> </view>
						</view>
						<view class="eq_v2_b1">
							<view class="eq_v2_c1 eq_v2_c3">租借地址 <view>{{item.leaseAddress||''}}</view> </view>
						</view>
						<view class="eq_v2_b1">
							<view class="eq_v2_c1 eq_v2_c3">租借时间 <view>{{item.leaseTime}}</view> </view>
						</view>
						
						<!-- <view class="eq_v2_b2" v-if="item.status == '0'">
							<view class="eq_v2_c1 eq_v2_c3">归还时间 <view>- -</view> </view>
							<view class="eq_v2_c1 eq_v2_c3">归还地址 <view>- -</view> </view>
						</view>
						<view class="eq_v2_b2" v-else>
							<view class="eq_v2_c1 eq_v2_c3">归还时间 <view>{{item.restoreTime}}</view> </view>
							<view class="eq_v2_c1 eq_v2_c3">归还地址 <view>{{item.restoreAddress}}</view> </view>
						</view> -->
						<view class="eq_v2_b1 eq_v2_b3" v-if="item.status == '0'">
							<view class="eq_v2_c1 eq_v2_c3">归还时间 <view>- -</view> </view>
							<view class="eq_v2_c1 eq_v2_c3">归还地址 <view>- -</view> </view>
						</view>
						<view class="eq_v2_b1 eq_v2_b3" v-else>
							<view class="eq_v2_c1 eq_v2_c3">归还时间 <view>{{item.restoreTime}}</view> </view>
							<view class="eq_v2_c1 eq_v2_c3">归还地址 <view>{{item.restoreAddress}}</view> </view>
						</view>
						
						<view class="eq_v2_b1">
							<view class="eq_v2_c1">支付金额
								<text class="eq_v2_d2" v-if="item.status == '0'">- -</text>
								<text class="eq_v2_d2" v-else>{{item.price}}</text>
							</view>
							<view class="eq_v2_c1"><text>详情></text></view>
						</view>
					</view>
				</swiper-item>
				<swiper-item style="overflow:auto;">
					
					<view class="cur_v1_a1">
						<view v-for="(item,index) in commodityList" :style="item.style" @click="selectList(index)">{{item.title}}</view>
					</view>
					
					<!-- <view class="eq_v2_a1" v-for="(item,index) in commodity" :key="index" v-if="item.status == commodityIndex" @click="skip('/pages/nursingBed/lease/underReview')">
						<view :class="item.status == 0 ? 'comm_list1': item.status == 1 ? 'comm_list2' : 'comm_list3'">
							<view class="eq_v2_b1">
								<view class="eq_v2_c1">订单编号 <text>{{item.item1}}</text> </view>
								<view class="eq_v2_c1">
									<text class="eq_v2_d1" v-if="item.status == 0">全部</text>
									<text class="eq_v2_d1" v-if="item.status == 1">已完成</text>
									<text class="eq_v2_d1" v-if="item.status == 2">未支付</text>
								</view>
							</view>
							<view class="eq_v2_b1">
								<view class="eq_v2_c1">设备编号 <text>{{item.item2}}</text> </view>
								<view class="eq_v2_c1">设备类型 <text>{{item.item3}}</text> </view>
							</view>
							<view class="eq_v2_b1">
								<view class="eq_v2_c1">商品名称 <text>{{item.item4}}</text> </view>
								<view class="eq_v2_c1">商品价格 <text>{{item.item5}}</text> </view>
							</view>
							<view class="eq_v2_b1">
								<view class="eq_v2_c1">购买时间 <text>{{item.item6}}</text> </view>
								<view class="eq_v2_c1"></view>
							</view>
							<view class="eq_v2_b1">
								<view class="eq_v2_c1">支付金额 <text class="eq_v2_d2">{{item.item7}}</text></view>
								<view class="eq_v2_c1"><text>详情></text></view>
							</view>
						</view>
					</view> -->
					
				</swiper-item>
			</swiper>
		</view>
		
		
  </view>
</template>

<script>
	import sx from '@/components/select-cy/select-y.vue'
  import { userLeaseOrder, selectDepartment ,investorLeaseOrder } from '@/api/system/user'
  import { dateFormart } from '@/utils/dateFormart.js'
  export default {
    data() {
      return {
				noClick:true,//防止恶意点击
				curList:[
					{style:'color: #64CF59;font-weight:bold;',title:'全部',status:''},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'租借中',status:0},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'待支付',status:1},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'已退款',status:4},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'已完成',status:2},
				],
				styleCss:[
					{style:'font-weight:bold;color:black',bgColor:'background-color:#64CF59',title:'租借订单'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'商品订单'}
				],
				dispayType:0,
				commodity:[//status 0全部 1已完成 2未支付
					// {
					// 	leaseTime:'2023-03-01 15:00:00',
					// 	rule:[{"startTime":"09:00:00","endTime":"18:00:00","time":0,"price":"0.01"},{"startTime":"18:00:00","endTime":"09:00:00","time":1,"price":"0.01"}],
					// 	leaseAddress:'111111',
					// 	restoreTime:'2023-03-02 13:40:00',
					// 	restoreAddress:'111111',
					// 	orderNumber:'12as2sa12as',
					// 	status:'0'
					// },{
					// 	leaseTime:'2023-03-01 15:00:00',
					// 	rule:[{"startTime":"09:00:00","endTime":"18:00:00","time":0,"price":"0.01"},{"startTime":"18:00:00","endTime":"09:00:00","time":1,"price":"0.01"}],
					// 	leaseAddress:'111111',
					// 	restoreTime:'2023-03-02 13:40:00',
					// 	restoreAddress:'111111',
					// 	orderNumber:'12as2sa12as',
					// 	status:'1'
						
					// },{
					// 	leaseTime:'2023-03-01 15:00:00',
					// 	rule:[{"startTime":"09:00:00","endTime":"18:00:00","time":0,"price":"0.01"},{"startTime":"18:00:00","endTime":"09:00:00","time":1,"price":"0.01"}],
					// 	leaseAddress:'111111',
					// 	restoreTime:'2023-03-02 13:40:00',
					// 	restoreAddress:'111111',
					// 	orderNumber:'12as2sa12as',
					// 	status:'2'
					// },
					
				],
				commodityList:[
					{style:'color: #64CF59;font-weight:bold;',title:'全部'},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'未支付'},
					{style:'color: rgba(0,0,0,0.4);font-weight:400;',title:'已完成'}
				],
				commodityIndex:0,
				selIndex:0,
				investor: false,  
				manage:{},
				nameOrNumber:'',
      }
    },
		onLoad(val) {
			if(val.investor)this.investor=true
			// console.log(typeof this.investor)
			if(this.investor)this.setSelect()
		},
		onPullDownRefresh() {
			if(!this.investor) {
				this.selectCurList(this.selIndex)
			}else{
				this.investorLeaseOrder(this.manage)
			}
			uni.stopPullDownRefresh();
			console.log('下拉刷新')
		},
		onShow(){
			if(!this.investor) {
				this.selectCurList(this.selIndex)
			}else{
				this.investorLeaseOrder(this.manage)
			}
		},
		components:{
			sx
		},
    methods: {
			search(){
				// 6148497283400837
				let data={
					nameOrNumber:this.nameOrNumber
				}
				this.investorLeaseOrder(data)
			},
			async investorLeaseOrder(manage){
				let res = await investorLeaseOrder(manage)
				this.commodity=res.data
				//排序
				// console.log(this.commodity)
				this.commodity.sort((a,b)=> new Date(a.leaseTime).getTime() - new Date(b.leaseTime).getTime())
				this.commodity.reverse()
				// console.log(this.commodity)
				this.commodity.forEach(res=>{
					if(res.leaseTime)
					res.leaseTime=dateFormart(new Date(res.leaseTime))
					if(res.restoreTime)
					res.restoreTime=dateFormart(new Date(res.restoreTime))
				})
				// console.log(res.data)
				this.nameOrNumber=''
				// this.selectDepartment()
				// this.$forceUpdate()
			},
			
			async selectDepartment(){
				let res = await selectDepartment()
				let arr=[]
				let arr2=[]
				let [a,b]=res.data
				b.forEach((item)=>{
					let d={
						title:item
					}
					arr.push(d)
				})
				this.$refs.sx1.data.list=arr
				
				a.forEach((item)=>{
					let d={
						title:item
					}
					arr2.push(d)
				})
				this.$refs.sx2.data.list=arr2
			},
		
			setSelect(){
					let that=this
					that.selectDepartment()
					that.$refs.sx1.data.placeholder='请选择设备'
					that.$refs.sx1.characteristic='sx1'
					that.$refs.sx1.style='border: 1rpx solid rgba(216, 216, 216, 0.8);background-color: rgba(255, 255, 255, 1.0);margin-top: 20rpx;'
					
					that.$refs.sx2.data.placeholder='请选择科室'
					that.$refs.sx2.characteristic='sx2'
					that.$refs.sx2.style='border: 1rpx solid rgba(216, 216, 216, 0.8);background-color: rgba(255, 255, 255, 1.0);margin-top: 20rpx;'
			},
			change(e) {
			    // console.log("e:", e);
				switch(this.sx){
					case 'sx1':
						if(e){
							this.manage.deviceTypeName=e.title
						}else{
							this.manage.deviceTypeName=''
						};
						this.investorLeaseOrder(this.manage);
						break;
					case 'sx2':
						if(e){
							this.manage.departmentName=e.title
						}else{
							this.manage.departmentName=''
						};
						this.investorLeaseOrder(this.manage);
						break;
					default : 
					// console.log("manage:", this.manage);	
				}
			},
			async userLeaseOrder(status){
				let data = {
					status:status
				}
				
				let tmp = await userLeaseOrder(data)
				this.commodity = tmp.data
				//排序
				console.log(this.commodity)
				this.commodity.sort((a,b)=> new Date(a.leaseTime).getTime() - new Date(b.leaseTime).getTime())
				this.commodity.reverse()
				// console.log(this.commodity)
				this.commodity.forEach(res=>{
					if(res.leaseTime)
					res.leaseTime=dateFormart(new Date(res.leaseTime))
					if(res.restoreTime)
					res.restoreTime=dateFormart(new Date(res.restoreTime))
				})
				
				// console.log(this.commodity)
				this.$forceUpdate()
			},
			
			selectList(index){
				
				for(let i in this.commodityList){
					this.commodityList[i].style = 'font-weight:400;color:rgba(0,0,0,0.4)'
					if(i == index){
						this.commodityIndex = i
						this.commodityList[i].style = 'font-weight:bold;color:#64CF59'
					}
				}
			},
			selectCurList(index){
				this.selIndex=index
				// console.log(index)
				
				if(!this.investor){
					this.userLeaseOrder(this.curList[index].status)
				} else{
					this.manage.status=this.curList[index].status
					this.investorLeaseOrder(this.manage)
				}
				// if(index == 0){
				// 	this.userLeaseOrder('')
				// }else{
				// 	this.userLeaseOrder(index-1)
				// }
				
				for(let i in this.curList){
					this.curList[i].style = 'font-weight:400;color:rgba(0,0,0,0.4)'
					if(i==index){
						this.commodityIndex = i
						this.curList[i].style = 'font-weight:bold;color:#64CF59'
					}
				}
			},
			
			navSwitch(index){
				for(let i in this.styleCss){
					this.styleCss[i].style = 'font-weight:400;color:rgba(0,0,0,0.4)'
					this.styleCss[i].bgColor = 'background-color:none'
					if(i == index){
						this.dispayType = i
						this.styleCss[i].style = 'font-weight:bold;color:black'
						this.styleCss[i].bgColor = 'background-color:#64CF59'
					}
				}
			},
			changeSwiper(e){
				this.navSwitch(e.detail.current)
				////console.log(e.detail.current,'-----------')
			},
			skip(orderInfo){
				let str=JSON.stringify(orderInfo)
				// 0-租赁中 1 待支付 2 支付完成 3 审核中
				if(this.investor){
						uni.navigateTo({
							url:'/pages/investor/indent/indent?orderInfo='+str
						});
				}else{
						if(orderInfo.status == '0'){
							uni.navigateTo({
								url:'/pages/nursingBed/lease/onLease?orderInfo='+str
							});
						}else{
							uni.navigateTo({
								url:'/pages/nursingBed/lease/underReview?status='+orderInfo.status+'&orderInfo='+str
							});
						}
				}
			},
    }
  }
</script>

<style lang="less" scoped>
  .device {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#F6F8FA;
		
		.feed_v1_a1{
			width:100%;
			padding:30rpx 30rpx 0rpx 30rpx;
			background-color:white;
			
			.feed_v1_b1{
				width:100%;
				height:64rpx;
				background-color:#F6F8FA;
				border-radius: 12rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				padding-left:20rpx;
				
				.feedInput{
					width:75%;
					height:100%;
					font-size: 26rpx;
				}
				
				.feed_v1_b2{
					width: 118rpx;
					height: 56rpx;
					background: #64CF59;
					border-radius: 12rpx;
					font-size: 26rpx;
					font-weight: 400;
					color:white;
					text-align:center;
					line-height:56rpx;
				}
			}
		}
		
		.myorder_vi_a1{
			width:100%;
			padding:26rpx 60rpx 0rpx 60rpx;
			background-color:white;
			display:flex;
			flex-direction:row;
			align-items:center;
			
			.myorder_v1_b1{
				margin-right:90rpx;
				display:flex;
				flex-direction:column;
				align-items:center;
				font-size:28rpx;
				
				view{
					margin-top:16rpx;
					width:46rpx;
					height:8rpx;
					border-radius:4rpx;
				}
			}
		}
		
		.myorder_vi_a2{
			height:80vh;
			width:100%;
			padding:0rpx 30rpx;
			
			.cur_v1_a1{
				margin-top:30rpx;
				padding:0rpx 36rpx;
				width:100%;
				display:flex;
				flex-direction:row;
				align-items: center;
				justify-content:space-between;
				
				view{
					font-size:24rpx;
				}
			}
			
			.eq_v2_a1{
				width: 690rpx;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 12rpx 0px rgba(0,0,0,0.06);
				border-radius: 20rpx;
				margin:30rpx auto;
				padding:20rpx 0rpx;
				
				.eq_v2_b1{
					display:flex;
					align-items:center;
					justify-content: space-between;
					padding:12rpx 30rpx;
					
					.eq_v2_c1{
						font-size: 26rpx;
						font-weight: 400;
						
						text{
							margin-left:18rpx;
							color:rgba(0,0,0,0.3);
						}
						.eq_v2_d1{
							color: #64CF59;
						}
						.eq_v2_d2{
							color: #FF7C4A;
						}
					}
					
					.eq_v2_c2{
						display: flex;
						flex-direction:row;
						align-items:center;
						color:rgba(0,0,0,0.3);
						
						text{
							color:black;
						}
					}
					
					.eq_v2_c3 {
						display:flex;
						flex-direction:row;
						color:rgba(0,0,0,0.3);
						
						view{
							color:black;
							margin-left:18rpx;
							max-width:400rpx;
						}
					}
				
				}
				.eq_v2_b3{
					display: block !important;
				}
				.eq_v2_b2{
					width: 622rpx;
					background: #F6F8FA;
					border-radius: 16rpx;
					margin:20rpx auto;
					font-size:26rpx;
					padding:15rpx 30rpx;
					
					.eq_v2_c3 {
						display:flex;
						flex-direction:row;
						color:rgba(0,0,0,0.3);
						margin:15rpx 0rpx;
						
						view{
							color:black;
							margin-left:18rpx;
							max-width:400rpx;
						}
					}
				}
			}
		}
		
		
		.comm_list1{
			
			.eq_v2_c1{
				font-size: 26rpx;
				font-weight: 400;
				
				text{
					margin-left:18rpx;
					color:rgba(0,0,0,0.3);
				}
				.eq_v2_d1{
					color:red;
				}
				.eq_v2_d2{
					color:red;
				}
			}
		}
		
		.comm_list2{
			
			.eq_v2_c1{
				font-size: 26rpx;
				font-weight: 400;
				
				text{
					margin-left:18rpx;
					color:red;
				}
				.eq_v2_d1{
					color:red;
				}
				.eq_v2_d2{
					color:red;
				}
			}
		}
		.comm_list3{
			
			.eq_v2_c1{
				font-size: 26rpx;
				font-weight: 400;
				
				text{
					margin-left:18rpx;
					color:red;
				}
				.eq_v2_d1{
					color:red;
				}
				.eq_v2_d2{
					color:red;
				}
			}
		}
		
  }
</style>
