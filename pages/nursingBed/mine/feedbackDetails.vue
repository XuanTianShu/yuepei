<template>
  <view class="device">
		
		<view class="det_v2_a1">
			<view class="det_v2_b1">
				<text>故障编号</text>
				<view class="det_v2_c1">{{info.feedbackId}}</view>
				<view class="det_v2_c2">待处理</view>
			</view>
			<view class="det_v2_b1">
				<text>设备编号</text>
				<view>{{info.deviceNumber}}</view>
			</view>
			<view class="det_v2_b1">
				<text>反馈时间</text>
				<view>{{info.feedbackTime}}</view>
			</view>
			<view class="det_v2_b1">
				<text>设备地址</text>
				<view>{{info.deviceAddress}}</view>
			</view>
			<view class="det_v2_b1">
				<text>反馈类型</text>
				<view style="color:#FF0000;">{{problemList[info.feedbackType].text}}</view>
			</view>
			<view class="det_v2_b2">{{info.feedbackInfo}}。</view>
			<view class="det_v2_b1">
				<text>设备图片</text>
				<view class='images'>
					<!-- <view  v-for="itm in 5" class="image" > </view> -->
					<image  v-for="itm in info.feedbackUrl" class="image" :src="itm"> </image>
				</view>	
			</view>
		</view>
		
  </view>
</template>

<script>
  export default {
    data() {
      return {
				info:'',
				problemList:[
					{text:'无法开锁',styleCss:'background-color:#64CF59;color:white;'},
					{text:'无法关锁',styleCss:'background-color:#F6F8FA;color:#000000;'},
					{text:'结算异常',styleCss:'background-color:#F6F8FA;color:#000000;'}
				],
      }
    },
		onLoad(e) {
			this.info=JSON.parse(e.info)
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
    background-color:#FFFFFF;
		padding-bottom:150rpx;
		overflow:auto;
		
		
		.det_v2_a1{
			width:100%;
			padding:20rpx 30rpx;
			
			.det_v2_b1{
				display: flex;
				flex-direction:row;
				font-size: 26rpx;
				font-weight: 500;
				padding:15rpx 0rpx;
				position:relative;
				
				
				view,.det_v2_c1{
					max-width:500rpx;
					display:flex;
					flex-direction:row;
					flex-wrap:wrap;
					margin-left:30rpx;
					color:rgba(0,0,0,0.4);
					
					.images{
						 display: flex;
						 justify-content: space-around;
						 
						.image{
							width: 80rpx;
							height:80rpx;
						}
					}
				}
				
				.det_v2_c2{
					color:#FF7C4A;
					position:absolute;
					right:0rpx;
					top:15rpx;
				}
			}
			
			.det_v2_b2{
				padding:30rpx;
				width: 686rpx;
				background: #F6F8FA;
				border-radius: 16rpx;
				margin:30rpx 0rpx;
				font-size: 26rpx;
				color:rgba(0,0,0,0.49);
			}
		}
		
  }
</style>
