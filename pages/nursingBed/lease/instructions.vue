<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="incon"></image>
			<text>选择你使用的陪护床类型</text>
		</view>
		
		<view class="cop_t1_a1">点击查看使用指南</view>
		
		<view class="inst_v1_a1">
			<view class="inst_v1_b1" v-for="itm in list">
				<video 
				:src="itm.videoUrl"
				:binderror="videoErrorCallback" 
				:show-center-play-btn="false"
				:show-fullscreen-btn="false"
				:show-play-btn='false'
				></video>
				<view class="inst_v1_c1">
					<text>{{itm.videoTitle}}</text>
					<image @click="open(itm)" src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/play.png"></image>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="center">
			<view class="play">
				<video class="_video"
					:binderror="videoErrorCallback"
					:src='videoUrl'
					:autoplay='true'
					:page-gesture="true"
					:show-mute-btn="true"
					:show-center-play-btn="false"
				>
					<view class="close" @click="close">
						x
					</view>
				</video>
				
			</view>
		</uni-popup>

		
  </view>
</template>

<script>
	import { selectVideo } from '@/api/system/user'
  export default {
    data() {
      return {
				list:[],
				videoUrl:''
			}
    },
		mounted(){
			// this.$refs.popup.open('center')
				this.selectVideo()
		},
    methods: {
			videoErrorCallback(){
				this.$modal.msgError('播放出错');
			},
			async selectVideo(){
				let that=this
				let res=await selectVideo()
				console.log('res',res)
				that.list=res.rows
			},
			open(item){
				this.videoUrl=item.videoUrl
				this.$refs.popup.open('top')
			},
			close(){
				this.$refs.popup.close()
				this.videoUrl=''
			},
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
				
				video{
					width: 326rpx;
					height: 264rpx;
					// background-color:green;
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
		
		.play{
			width: 750rpx;
			height:520rpx;
			margin-top: 100rpx;
			
			._video{
				position:relative;
				z-index: 99;
				width:100%;
				height:100%;
				.close{
					border-radius: 50% ;
					border: 1px #FFF solid;
					color: #FFFFFF;
					width:30rpx;
					height:30rpx;
					position:absolute;
					top:20rpx;
					right:20rpx;
					text-align: center;
					line-height: 25rpx;
				}
			}
			
			
		}
		
  }
</style>
