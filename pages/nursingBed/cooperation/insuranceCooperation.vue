<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="incon"></image>
			<text>上传图片</text>
		</view>
		
		<view v-if="src" class="content_img">
			<img  @click="ChooseImage"  :src="src" >
		</view>
		<view v-else class="content_pic">
			<view class="cop_scan" @click="ChooseImage">
				<img src="@/static/images/upPic.png">
				<text>点击上传保险图片</text>
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
		
		<view class="bto" @click="skip">合作列表</view>
		
		<message ref="message"></message>
  </view>
</template>

<script>
	import config from '@/config'
	 import { insertUserInsurance } from '@/api/system/user'
	 import message from '@/components/popup_message.vue'
  export default {
    data() {
      return {
				src:''
			}
    },
		components:{
			message
		},
    methods: {
			skip(){
				uni.navigateTo({
					url:'/pages/nursingBed/cooperation/infoList?index=1'
				});
			},
			close(){
				this.$refs.popup.close()
			},
			submit(){
				wx.uploadFile({
					header:{
						'content-type':'multipart/form-data'
					},
					method: 'POST',
					url: config.baseUrl+'/common/upload', 
					filePath: this.src,
					name: 'file',
					success: (realut) => {
						let data=JSON.parse(realut.data)
						 console.log('data.url',data.url)
						 this.$refs.message.setMsg('success','图片上传成功')
						 this.insertUserInsurance(data.url)
					},
					fail:(res)=>{
						this.$refs.popup.open('center')
					}
				})
				
			},
			//照片上传
			ChooseImage() {
			  var _this = this;
			  wx.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success (res) {
			      _this.src = res.tempFilePaths[0]
				  console.log('选择照片',_this.src)
			    }
			  })
			},
			async insertUserInsurance(src){
				let res = await insertUserInsurance({urlRows:src})
				console.log(res)
				if(res.code==200){
						this.src =''
						this.$refs.message.setMsg('success','提交成功')
				}
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
	
		.bto{
			width: 100%;
			text-align: center;
			opacity: 0.5;
			position: fixed;
			bottom: 3%;
		}
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
			height: 300rpx;
			// width: 400rpx;
			max-width: 500rpx;
			
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
