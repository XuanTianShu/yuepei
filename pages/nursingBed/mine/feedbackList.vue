<template>
  <view class="device">
		
		<view class="feed_v1_a1">
			<view class="feed_v1_b1">
				<input type="text" v-model="params.deviceNumber" class="feedInput" placeholder="请输入设备编号、设备地址" />
				<view class="feed_v1_b2" @click="selectFaultFeedbackList">搜索</view>
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
				<swiper-item v-for="index in styleCss.length" :key="index" style="overflow:auto;">
					
					<view class="eq_v2_a1" v-for="i in list" @click="details(i)">
						<view class="eq_v2_b1">
							<view class="eq_v2_c1">故障编号 <text>{{i.feedbackId}}</text> </view>
							<view class="eq_v2_c2">{{i.status==0?'已处理':'未处理'}}</view>
						</view>
						<view class="eq_v2_b2">
							<image class="image" :src="i.feedbackUrl[0]" mode=""></image>
							<view>
								<view class="eq_v2_d1">
									<text>故障时间</text>
									<view>{{i.feedbackTime}}</view>
								</view>
								<view class="eq_v2_d1">
									<text>设备地址</text>
									<view>{{i.deviceAddress}}</view>
								</view>
							</view>
						</view>
						<view class="eq_v2_b3" >
							<text></text>
							<view>{{i.feedbackInfo}}></view>
						</view>
					</view>
					
				</swiper-item>
			</swiper>
		</view>
		
		
  </view>
</template>

<script>
	import {dateFormart} from '@/utils/dateFormart.js'
	import { selectFaultFeedbackList } from '@/api/system/user'
  export default {
    data() {
      return {
				styleCss:[
					{style:'font-weight:bold;color:black',bgColor:'background-color:#64CF59',title:'待处理'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'',title:'已处理'}
				],
				dispayType:0,
				list:[],
				params:{
					status:0,
					deviceNumber:''
				}
      }
    },
		onShow(){
			this.selectFaultFeedbackList()
			
		},
    methods: {
			async selectFaultFeedbackList(){
				
				let res = await selectFaultFeedbackList(this.params)
				this.list= res.data
		
				this.list.forEach((i,idx)=>{
					let arry= JSON.parse(i.feedbackUrl)
					this.list[idx].feedbackTime=dateFormart(new Date(i.feedbackTime))
					this.list[idx].feedbackUrl=arry[0]
				})
				// console.log('list',this.list)
				this.list.sort((a,b)=> new Date(a.feedbackTime).getTime() - new Date(b.feedbackTime).getTime())
				this.list.reverse()
			},
			details(i){
				wx.navigateTo({
					url:'/pages/nursingBed/mine/feedbackDetails?info='+JSON.stringify(i)
				})
			},
			navSwitch(index){
				switch(index){
					case 0:this.params.status=0;break;
					case 1:this.params.status=1;break;
				}
				
				this.selectFaultFeedbackList()
				for(let i in this.styleCss){
					this.styleCss[i].style = 'font-weight:400;color:rgba(0,0,0,0.4)'
					this.styleCss[i].bgColor = ''
					if(i == index){
						this.dispayType = i
						this.styleCss[i].style = 'font-weight:bold;color:black'
						this.styleCss[i].bgColor = 'background-color:#64CF59'
					}
				}
			},
			changeSwiper(e){
				this.navSwitch(e.detail.current)
			}
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
			
			.eq_v2_a1{
				width: 690rpx;
				background: #FFFFFF;
				box-shadow: 0px 4rpx 12rpx 0px rgba(0,0,0,0.06);
				border-radius: 20rpx;
				margin:30rpx auto;
				
				.eq_v2_b1{
					display:flex;
					flex-direction: row;
					align-items:center;
					justify-content: space-between;
					padding:30rpx;
					
					.eq_v2_c1{
						font-size: 26rpx;
						font-weight: 400;
						
						text{
							margin-left:18rpx;
							color:rgba(0,0,0,0.3);
						}
					}
					.eq_v2_c2{
							font-size: 26rpx;
							font-weight: bold;
							color:rgba(0,0,0,0.49);
					}
				}
				
				.eq_v2_b2{
					padding:30rpx;
					display:flex;
					flex-direction:row;
					
					.image{
						width: 120rpx;
						height: 120rpx;
						border-radius: 10rpx;
						margin-right: 16rpx;
					}
					
					.eq_v2_d1{
						margin-bottom:20rpx;
						font-size: 26rpx;
						font-weight: 400;
						display:flex;
						flex-direction:row;
						
						view{
							max-width:370rpx;
							margin-left:20rpx;
							color:rgba(0,0,0,0.3);
						}
					}
				}
				
				.eq_v2_b3{
					margin:0rpx 30rpx;
					display:flex;
					flex-direction: row;
					align-items:center;
					justify-content: space-between;
					padding-bottom:30rpx;
					color: firebrick;
					
					view{
						width: 140rpx;
						height: 52rpx;
						border-radius: 26rpx;
						opacity: 0.8;
						text-align:center;
						line-height:52rpx;
						font-size:24rpx;
					}
				}
			}
		}
		
		
  }
</style>
