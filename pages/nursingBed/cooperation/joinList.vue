<template>
  <view class="mine">
		
		<view class="myorder_vi_a1">
			<view class="myorder_v1_b1" :style="indx==index?'font-weight:bold;color:black':'font-weight:400;color:rgba(0,0,0,0.4)' " v-for="(item,index) in styleCss" :key="index" @click="change(index)">
				<text>{{item.title}}</text>
				<view :style="indx==index?'background-color:#64CF59':''"></view>
			</view>
		</view>
		
		
		<view class="myorder_vi_a2">
			<swiper :current="dispayType"  style="height:100%;">
				<swiper-item v-for="index in styleCss.length" :key="index" style="overflow:auto;">
					<view class="myorder_vi_b1" v-for="(item,tindex) in list" :key="tindex" @click="joinDetailed(item)">
						
						<view class="myorder_vi_c1">
							<text>{{item.createTime}}</text>
							<view>提交时间</view>
						</view>
						<view class="myorder_vi_c2" v-if="item.status == '0'">未处理</view>
						<view class="myorder_vi_c2 myorder_vi_c3" v-else>已处理</view>
						
					</view>
				</swiper-item>
			</swiper>
		</view>
		
  </view>
</template>

<script>
  import { selectJoinInList } from '@/api/system/user'
  export default {
    data() {
      return {
				list:[],
				styleCss:[
					{style:'font-weight:bold;color:black',title:'全部'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',title:'未处理'},
					{style:'font-weight:400;color:rgba(0,0,0,0.4)',title:'已处理'}
				],
				dispayType:0,
				indx:0
      }
    },
		onLoad() {
			this.selectJoinInList('')
		},
    methods: {
			joinDetailed(e){
				console.log(e)
			},
			change(e){
				this.indx=e
				// console.log(e)
				if(e === 0){
					this.selectJoinInList('')
				}else{
					this.selectJoinInList(e-1)
				}
	
			},
			async selectJoinInList(status){
				let data = {
					status:status
				}
				let res = await selectJoinInList(data);
				this.list = res.data
				// console.log(res.data)
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
					color:rgba(0,0,0,0.4);
					
					text{
						color:black;
						font-weight: bold;
						margin-bottom:20rpx;
					}
				}
				
				.myorder_vi_c2{
					font-size: 30rpx;
					font-weight: bold;
					color: #64CF59;
				}
				
				.myorder_vi_c3{
					color:black;
				}
			}
		}
  }
</style>
