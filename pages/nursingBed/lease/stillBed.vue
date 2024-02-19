<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="incon"></image>
			<text>归还陪护床</text>
		</view>
		
		<view class="cop_t1_a1">归还步骤:扫码-床放入设备-锁状态-拍照</view>
		<view style="margin-top: 20rpx;" class="cop_t1_a1">拍照上传,后台人工审核通过后才可以退还押金</view>
		
		<view v-if="src" class="content_img">
			<img  @click="ChooseImage"  :src="src" >
		</view>
		<view v-else class="content_pic">
			<view class="cop_scan" @click="ChooseImage">
				<img src="https://www.yp10000.com/static/img/53.png">
				<text>拍照上传结算单</text>
			</view>
		</view>
		
		
		<view class="cop_button">
			<view class="cop_button_btn" @click="submit">
				提交
			</view>
		</view>
		<!-- 弹出层提示 -->
		<uni-popup ref="popup" :mask-click="false">
			<view class="popup_v1_a1">
				<view class="popup_v1_c1" @click="close">x</view>
				<view class="popup_v1_b1">订单无效</view>
				<view class="popup_v1_b2">您提交的订单无效，请重新归还！</view>
				<view class="popup_v1_b3" @click="close">确定</view>
			</view>
		</uni-popup>

		
  </view>
</template>

<script>
  export default {
    data() {
      return {
				src:''
			}
    },
    methods: {
			close(){
				this.$refs.popup.close()
			},
			submit(){
				this.$refs.popup.open('center')
			},
			//照片上传
			ChooseImage() {
			  var _this = this;
			  wx.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success (res) {
			      // tempFilePath可以作为img标签的src属性显示图片
			      _this.src = res.tempFilePaths
			    }
			  })
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
    background-color:#ffffff;
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
			margin-bottom:20rpx;
			
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
		.content_img{
			width: 100%;
			padding: 40px;
			text-align: center;
			img{
				max-width: 80%;
				max-height: 400rpx;
			}
		}
		.content_pic{
			width: 100%;
			margin: 100rpx 0;
		.cop_scan{
			margin: 0 auto;
			height: 240rpx;width: 390rpx;
			border: #a1a2a3 1px dashed;
			color:rgba(0,0,0,0.4);
			display: flex;
			align-items: center;
			justify-content: center;
			flex-flow: column;
			img{
				width: 50px;height: 50px;
			}
		}
		
		}
			
		.cop_button{
			position: absolute;
			bottom: 10%;
			text-align: center;
			width: 100%;
			padding: 0 30rpx;
			.cop_button_btn{
				margin: auto;
				font-size: 26rpx;
				padding: 25rpx 0;
				color: #ffffff;
				border-radius: 10rpx;
				background-color: #64CF59;
			}
		}
		
		.popup_v1_a1{
			width: 558rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			position: relative;
			.popup_v1_c1{
				position: absolute;
				right: 1%;top: 1%;
				height: 40rpx;width: 40rpx;
				border-radius: 60%;
				border: #acacac 1rpx solid;
				color:#acacac ;
				text-align: center;line-height: 35rpx;
				font-size: 36rpx;
			}
			
			.popup_v1_b1{
				font-size: 28rpx;
				font-weight: bold;
				color: #FF0000;
				padding:30rpx;
				text-align:center;
			}
			.popup_v1_b2{
				font-size: 28rpx;
				font-weight: 400;
				padding:20rpx 30rpx 80rpx 30rpx;
				text-align:center;
			}
			.popup_v1_b3{
				font-size: 26rpx;
				font-weight: bold;
				color: #FF603B;
				padding:25rpx;
				text-align:center;
				border-top:1rpx solid #EEEEEE;
			}
		}
  }
</style>
