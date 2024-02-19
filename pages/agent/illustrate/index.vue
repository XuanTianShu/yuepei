<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="incon"></image>
			<text>选择你使用的陪护床类型</text>
		</view>
		
		<view class="cop_t1_a1">点击查看使用指南</view>
		
		<view class="inst_v1_a1">
			<view class="inst_v1_b1" v-for="item in videolist">
				<video class="video"  @fullscreenchange="screenChange(item)" :src="item.videoUrl" controls style="width: 100%;" show-fullscreen-btn="false"	></video>
				<view class="inst_v1_c1">
					<text>{{item.videoTitle}}</text>
					<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/play.png"></image>
				</view>
			</view>
		</view>
		<view v-if="videoplay" style="height: 400rpx;position: fixed;top: 20%;z-index: 999;background-color: aqua;width: 100%;">
		        <video
		          controls
		          id=""
				  autoplay='true'
		          :src="videoUrl"
		          @fullscreenchange="suoxiao"
				  style="width: 100%;"
		        ></video>
		      </view>


		
  </view>
</template>

<script>
	import {selectInstructionsList} from '@/api/system/hospital'
  export default {
    data() {
      return {
		  videolist:[],
		  videoplay:false,
		   videoUrl: ""
	  }
    },
		// mounted(){
		// 		this.$refs.popup.open('center')
		// },
		onLoad() {
			this.getlist()
		},
    methods: {
		suoxiao(){
			this.videoplay=false
		},
		screenChange(item){
			this.videoplay=true
			this.videoUrl=item.videoUrl
			console.log(item);
		},
		async getlist(){
			let res=await selectInstructionsList()
			console.log('hahah',res);
			this.videolist=res.data
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
		overflow:auto;
		padding-bottom:50rpx;
		
		.cop_v1_a1{
			width:100%;
			display:flex;
			flex-direction:row;
			align-items:center;
			font-size:40rpx;
			font-weight:bold;
			padding:20rpx 30rpx;
			
			.incon{
				width:26rpx;
				height:36rpx;
				margin-right:20rpx;
			}
		}
		
		.cop_t1_a1{
			font-size:28rpx;
			color:rgba(0,0,0,0.4);
			margin-left:76rpx;
		}
		
		.inst_v1_a1{
			width:100%;
			margin-top:50rpx;
			padding:0rpx 30rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			flex-wrap:wrap;
			
			.inst_v1_b1{
				width: 326rpx;
				height: 368rpx;
				background: #FFFFFF;
				border-radius: 20rpx;
				overflow:hidden;
				margin-bottom:30rpx;
				
				.video{
					// width: 326rpx;
					height: 264rpx;
					background-color:green;
				}
				
				.inst_v1_c1{
					width:100%;
					margin-top:30rpx;
					display:flex;
					flex-direction:row;
					align-items:center;
					justify-content: space-between;
					padding:0rpx 30rpx;
					
					image{
						width: 36rpx;
						height:36rpx;
					}
				}
			}
		}
		
		.popup_v1_a1{
			width: 750rpx;
			height:420rpx;
			position:relative;
			
			.image{
				width:100%;
				height:100%;
				background-color:palegoldenrod;
			}
			
			.close{
				width:48rpx;
				height:48rpx;
				position:absolute;
				top:30rpx;
				right:30rpx;
			}
		}
		
  }
</style>
