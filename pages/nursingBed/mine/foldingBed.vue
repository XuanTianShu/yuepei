<template>
  <view class="cooperation">
		
		<view class="fob_v1_a1">折叠床状态</view>
		
		<view class="fob_v2_a1">
			<view class="fob_v2_b1">
				<view class="fob_v2_c1"></view>
				<view class="fob_v2_c2"></view>
				<view class="fob_v2_c3">可借</view>
			</view>
			<view class="fob_v2_b1 fob_v2_b2">
				<view class="fob_v2_c1"></view>
				<view class="fob_v2_c2"></view>
				<view class="fob_v2_c3">无</view>
			</view>
			<view class="fob_v2_b1 fob_v2_b3">
				<view class="fob_v2_c1"></view>
				<view class="fob_v2_c2"></view>
				<view class="fob_v2_c3">故障</view>
			</view>
		</view>
		
		<view class="fob_v1_a1">选择折叠床</view>
		
		<!-- <view class="fob_v3_a1">
			<view class="fob_v3_b1">
				<view class="fob_v3_c1">1</view>
				<view class="fob_v3_c2">可选</view>
			</view>
			
			<view class="fob_v3_b1 fob_v3_b2">
				<view class="fob_v3_c1">2</view>
				<view class="fob_v3_c2">可选</view>
			</view>
			<view class="fob_v3_b1 fob_v3_b2">
				<view class="fob_v3_c1">3</view>
				<view class="fob_v3_c2">可选</view>
			</view>
			<view class="fob_v3_b1 fob_v3_b3">
				<view class="fob_v3_c1">4</view>
				<view class="fob_v3_c2">无</view>
			</view>
			<view class="fob_v3_b1 fob_v3_b4">
				<view class="fob_v3_c1">5</view>
				<view class="fob_v3_c2">故障</view>
			</view>
		</view> -->
		
		<view class="fob_v3_a1">
			<view class="fob_v3_b1" v-for="(item,index) in rows" :key="index" @click="selectLock(item.status,index)">
				<view class="fob_v3_c1" :style="item.css1">{{item.index}}</view>
				<view class="fob_v3_c2" :style="item.css2" v-if="item.status == 1">可选</view>
				<view class="fob_v3_c2" :style="item.css2" v-else-if="item.status == 2">无</view>
				<view class="fob_v3_c2" :style="item.css2" v-else-if="item.status == 3">故障</view>
			</view>
		</view>
		
		<view class="cop_v1_a3" @click="skip('/pages/nursingBed/lease/chairLease')">一键开锁</view>
		<view class="cop_v1_a3 cop_v1_a4" @click="skip('/pages/nursingBed/mine/faultFeedback')">故障反馈</view>
		
  </view>
</template>

<script>
  export default {
    data() {
      return {
				rows:[],
				defaultSelect:'999'
			}
    },
		onLoad(options){
			if(options?.rows){
				let tmp = JSON.parse(options.rows)
				
				tmp.forEach((item,index)=>{
					item.css1 = 'background: white;color:#64CF59;border: 2rpx solid #64CF59;'
					item.css2 = 'color:#64CF59;'
					
					if(item.status == 1){
						if(this.defaultSelect == '999'){
							item.css1 = 'background:#64CF59;color:white;border:none;'
							item.css2 = 'color:#64CF59;'
							this.defaultSelect = index
						}
					}
					
					if(item.status == 2){
						item.css1 = 'background:#DDDDDD;color:white;border:none;'
						item.css2 = 'color:#B0B0B0;'
					}else if(item.status == 3){
						item.css1 = 'background:white;color:red;border: 2rpx solid red;'
						item.css2 = 'color:red;'
					}
				})
				
				this.rows = tmp
			}
		},
    methods: {
			//选择锁
			selectLock(status,index){
				if(status == 1){
					if(this.defaultSelect != index){
						this.rows.forEach((item,len)=>{
							if(len == index){
								item.css1 = 'background:#64CF59;color:white;border:none;'
								item.css2 = 'color:#64CF59;'
							}
							if(len == this.defaultSelect){
								item.css1 = 'background: white;color:#64CF59;border: 2rpx solid #64CF59;'
								item.css2 = 'color:#64CF59;'
							}
						})
						this.defaultSelect = index
						this.$forceUpdate()
					}
				}
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			}
			
			
		}
  }
</script>

<style lang="less" scoped>
  .cooperation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#F6F8FA;
		
		.fob_v1_a1{
			width:100%;
			font-size:28rpx;
			font-weight:bold;
			padding:30rpx;
		}
		
		.fob_v2_a1{
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin:0rpx auto;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:50rpx;
			
			.fob_v2_b1{
				display:flex;
				flex-direction:column;
				align-items:center;
				justify-content:center;
				
				.fob_v2_c1{
					width: 32rpx;
					height: 31rpx;
					background: #64CF59;
					border-radius:50%;
				}
				.fob_v2_c2{
					width: 24rpx;
					height: 16rpx;
					background: #64CF59;
					filter: blur(2px);
					border-radius:50%;
					position:relative;
					top:-8rpx;
				}
				.fob_v2_c3{
					font-size:28rpx;
					font-weight:bold;
					margin-top:5rpx;
				}
			}
			
			.fob_v2_b2 .fob_v2_c1,.fob_v2_b2 .fob_v2_c2{
				background: #DDDDDD;
			}
			.fob_v2_b3 .fob_v2_c1,.fob_v2_b3 .fob_v2_c2{
				background: #FF0000;
			}
		}
		
		.cop_v1_a3{
			width: 686rpx;
			height: 92rpx;
			background: #64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight: bold;
			margin:100rpx auto;
		}
		
		.cop_v1_a4{
			font-size: 26rpx;
			background-color:#F6F8FA;
			color:rgba(0,0,0,0.3);
		}
		
		.fob_v3_a1{
			width: 686rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			margin:0rpx auto;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:40rpx 60rpx 30rpx 60rpx;
			
			.fob_v3_b1{
				display:flex;
				flex-direction:column;
				align-items:center;
				justify-content: center;
				
				.fob_v3_c1{
					width: 88rpx;
					height: 120rpx;
					background: #64CF59;
					color:white;
					font-size:40rpx;
					font-weight: bold;
					text-align:center;
					line-height:120rpx;
					border-radius:10rpx;
				}
				.fob_v3_c2{
					margin-top:18rpx;
					font-size:26rpx;
					font-weight: bold;
					color: #64CF59;
				}
			}
			
			.fob_v3_b2 .fob_v3_c1{
					border: 2rpx solid #64CF59;
					background-color:white;
					color:#64CF59;
			}
			
			.fob_v3_b3 .fob_v3_c1{
					background-color:#DDDDDD;
			}
			.fob_v3_b3 .fob_v3_c2{
					color: #B0B0B0;
			}
			
			.fob_v3_b4 .fob_v3_c1{
					border: 2rpx solid #FF0000;
					background-color:white;
					color:#FF0000;
			}
			.fob_v3_b4 .fob_v3_c2{
					color:#FF0000;
			}
		}
		
		
  }
</style>
