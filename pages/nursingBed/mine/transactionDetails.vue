<template>
  <view class="mine">
		<uni-nav-bar left-icon="left" :title="title" :fixed="true" :statusBar="true" :border="false" @clickLeft="$tab.navigateBack()" />
		
		<view class="myorder_vi_a1">
			<view class="myorder_v1_b1" :style="item.style" v-for="(item,index) in styleCss" :key="index" @click="navSwitch(index)">
				<text>{{item.title}}</text>
				<view :style="item.bgColor"></view>
			</view>
		</view>
		
		<view class="myorder_vi_date">
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
			<text @click="open">选择日期></text>
		</view>
		
		<view class="myorder_vi_a2">
			<swiper :current="dispayType" @change="changeSwiper" style="height:100%;">
				<swiper-item v-for="index in styleCss.length" :key="index" style="overflow:auto;">
					<view class="myorder_vi_b1" v-for="(item,tindex) in list" :key="tindex">
						
						<view class="myorder_vi_c1">
							<text v-if="item.status == 0">{{styleCss[1].title}}</text>
							<text v-if="item.status == 1">{{styleCss[2].title}}</text>
							<view>{{item.createTime}}</view>
						</view>
						<view class="myorder_vi_c2" :style="item.status==0?'color:#64CF59':'color:#FF1D91'" v-if="nav == 1">
							<view v-if="item.status==0">
								+{{item.sum}}
							</view>
							<view v-if="item.status==1">
								-{{item.sum}}
							</view>
						</view>
						<view class="myorder_vi_c2" :style="item.status==0?'color:#64CF59':'color:#FF1D91'" v-if="nav == 2 || nav == 3">
							<view v-if="item.status==0">
								+{{item.sum}}
							</view>
							<view v-if="item.status==1">
								-{{item.sum}}
							</view>
							
						</view>
						
					</view>
				</swiper-item>
			</swiper>
		</view>
		
  </view>
</template>

<script>
  import { selectUserBalanceList,selectIntegralList,selectUserDepositInfo,selectUserDepositDetailInfo } from '@/api/system/user'
  export default {
    data() {
      return {
				title:'',
				nav:1,
				list:[],
				styleCss:[
					{style:'font-weight:bold;color:black',bgColor:'background-color:#64CF59',title:'全部'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'充值'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',bgColor:'background-color:none',title:'消费'}
				],
				dispayType:0
      }
    },
		onLoad(option) {
			if(option?.nav){
				this.nav = option.nav
				this.init(option)
			}
		},
    methods: {
			init(option){
				if(option.nav == 1){
					this.selectUserDepositDetailInfo('')
					
					this.title = '押金明细'
					this.styleCss[1].title = '缴纳'
					this.styleCss[2].title = '退回'
				}else if(option.nav == 2){
					this.selectUserBalanceList('')
					
					this.title = '交易明细'
					this.styleCss[1].title = '充值'
					this.styleCss[2].title = '消费'
				}else if(option.nav == 3){
					this.selectIntegralList('')
					
					this.title = '兑换明细'
					this.styleCss[1].title = '充值'
					this.styleCss[2].title = '兑换'
				}
				this.$forceUpdate()
			},
			open(){
				this.$refs.calendar.open();
			},
			confirm(e) {
				////console.log(e);
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
				if(this.nav == 1){
					if(e.detail.current == 0){
						this.selectUserDepositDetailInfo('')
					}else{
						this.selectUserDepositDetailInfo(e.detail.current-1)
					}
				}else if(this.nav == 2){
					if(e.detail.current <2){
						this.selectUserBalanceList('')
					}else{
						this.selectUserBalanceList(e.detail.current)
					}
				}else if(this.nav == 3){
					if(e.detail.current ==0){
						this.selectIntegralList('')
					}else if(e.detail.current ==1){
						this.selectIntegralList(0)
					}
					else{
						this.selectIntegralList(1)
					}
				}
				this.navSwitch(e.detail.current)
			},
			//押金详细
			async selectUserDepositDetailInfo(status){
				let data = {
					status:status
				}
				let res = await selectUserDepositDetailInfo(data);
				this.list = res.data
			},
			//余额详细
			async selectUserBalanceList(status){
				let data = {
					status:status
				}
				let res = await selectUserBalanceList(data);
				this.list = res.data
				// console.log(this.list)
			},
			//积分详细
			async selectIntegralList(status){
				let data = {
					status:status
				}
				let res = await selectIntegralList(data);
				this.list = res.data
				// console.log(this.list)
			}
			
			
    }
  }
</script>

<style lang="less" scoped>
  .mine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#F6F8FA;
		overflow: auto;
		
		.myorder_vi_a1{
			width:100%;
			padding:26rpx 60rpx 0rpx 60rpx;
			background-color:white;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			
			.myorder_v1_b1{
				display:flex;
				flex-direction:column;
				align-items:center;
				font-size:28rpx;
				
				view{
					margin-top:10rpx;
					width: 44rpx;
					height: 14rpx;
					border-radius: 7rpx;
				}
			}
		}
		
		.myorder_vi_date{
			padding:0rpx 32rpx;
			margin-top:30rpx;
			font-size: 26rpx;
			font-weight: 400;
			color:rgba(0,0,0,0.4);
		}
		
		.myorder_vi_a2{
			height:76vh;
			width:100%;
			margin-top:30rpx;
			padding:0rpx 30rpx;
			
			.myorder_vi_b1{
				margin-bottom:30rpx;
				padding:30rpx;
				width:100%;
				border-radius: 16rpx;
				background-color:white;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				
				.myorder_vi_c1{
					display:flex;
					flex-direction:column;
					font-size: 26rpx;
					font-weight: 400;
					
					text{
						font-weight: bold;
						margin-bottom:20rpx;
					}
				}
				
				.myorder_vi_c2{
					font-size: 30rpx;
					font-weight: bold;
					color: #64CF59;
				}
			}
		}
  }
</style>
