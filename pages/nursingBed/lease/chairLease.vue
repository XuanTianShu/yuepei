<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="image"></image>
			<text>选择计费方式</text>
		</view>
		<view class="cop_v2_a1">
			请选择您租借折叠椅的计费方式	
		</view>
		
		<view class="cop_v3_a1" @click="theAlert()">
			<view class="cop_v3_b1">
				<view class="cop_v3_c1">
					<u-icon name="play-right-fill" color="#FF7C4A" size="18" />
				</view>
				<text>看广告，免费使用</text>
			</view>
			<u-icon name="arrow-right" color="white" size="18"></u-icon>
		</view>
		
	
		<view  class="cop_v3_a1 cop_v3_a2" @click="skip(deviceTypeId<4?'/pages/nursingBed/lease/payDeposit?':'/pages/nursingBed/lease/selFoldingBed')">
			<view class="cop_v3_b1">
				<u-icon name="rmb-circle-fill" color="white" size="28" />
				<text>付费使用折叠椅</text>
			</view>
			<u-icon name="arrow-right" color="white" size="18"></u-icon>
		</view>
		<!-- <button @click="test">test</button> -->
		
  </view>
</template>

<script>
	import CryptoJS from 'crypto-js'
  export default {
    data() {
      return {
				deviceTypeId:'',
				authorize:false,
				open:false
			}
    },
		onLoad(options){
			if(options.deviceTypeId){
				this.deviceTypeId = options.deviceTypeId
				uni.showModal({
					title: '开锁提示',
					content: '需打开蓝牙和定位',
					success: (resp) => {
							
					}
				})
			}
			
			// this.getLocationAuthorize()
			
		},
		
    methods: {
			
			test(){
				wx.openSetting({
					success(settingdata) {
						console.log('settingdata',settingdata)
						//用户设置定位权限
						if (settingdata
							.authSetting[
								"scope.userLocation"
							]) {
								this.authorize=true
						}
					}
				})
			},
			getLocationAuthorize(){
				uni.getSetting({
					success:(res)=>{
						console.log('res',res)
						//判断是否有定位授权scope.userLocation，true表示已授权
						if (!res.authSetting['scope.userLocation']) {
							uni.showModal({
								title: '授权提示',
								content: '请手动打开手机定位',
								success: (resp) => {
										
								}
							})
							// openSetting有问题,不能打开设置了
							//提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。如果用户之前拒绝了授权，此接口会直接进入失败回调
							// uni.authorize({
							// 	scope: 'scope.userLocation',
							// 	success:()=>{
							// 		uni.showModal({
							// 			title: '授权提示',
							// 			content: '请打开手机定位',
							// 			success: (resp) => {
							// 				if (resp.confirm) {
							// 					this.open=true
							// 					//调起客户端小程序设置界面，返回用户设置的操作结果。
							// 					// wx.openSetting({
							// 					// 	success(settingdata) {
							// 					// 		console.log('settingdata',settingdata)
							// 					// 		//用户设置定位权限
							// 					// 		if (settingdata
							// 					// 			.authSetting[
							// 					// 				"scope.userLocation"
							// 					// 			]) {
							// 					// 				this.authorize=true
							// 					// 		}
							// 					// 	}
							// 					// })
							// 				} 
							// 			}
							// 		})
							// 	},
							// 	fail:()=>{
							// 		this.$modal.alert('授权失败')
							// 	}
							// })
						} else{
							// this.authorize=true
						}
					}
				});
			},
			skip(url){
				// if(this.authorize)
				uni.navigateTo({
					url:url
				});
			},
			theAlert(){
				this.$modal.msgError("暂无视频资源");
			},
		}
  }
</script>

<style lang="less" scoped>
	.cop_v2_a1 .lvl{
		width: 100%;
		color: #64CF59;
		padding-top: 20px;
	}
	
  .cooperation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color:#FFFFFF;
		padding:0rpx 30rpx;
		
		.cop_v1_a1{
			width:100%;
			display:flex;
			flex-direction:row;
			align-items:center;
			font-size:40rpx;
			font-weight:bold;
			padding:20rpx 0rpx;
			
			.image{
				width:26rpx;
				height:36rpx;
				margin-right:20rpx;
			}
		}
		
		.cop_v2_a1{
			font-size:28rpx;
			color:rgba(0,0,0,0.4);
			margin-left:40rpx;
			margin-top:20rpx;
		}
		
		.cop_v3_a1{
			width:100%;
			background-color:#FF7C4A;
			border-radius:14rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:70rpx 40rpx;
			margin-top:80rpx;
			margin-bottom: 20rpx;
			
			.cop_v3_b1{
				display:flex;
				flex-direction:row;
				align-items:center;
				color:white;
				font-size:28rpx;
				font-weight:bold;
				
				.cop_v3_c1{
					padding:8rpx;
					border-radius:50%;
					background-color:white;
				}
				text{
					margin-left:15rpx;
				}
			}
		}
		
		.cop_v3_a2{
			background: #64CF59;
		}
		
  }
</style>
