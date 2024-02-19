<template>
  <view class="mine">
		
		<view class="perData_view1">
			<view class="pDa_a1">
				<view>头像</view>
				<image :src="userInfo.avatar" class="image" @click="choose"></image>
			</view>
			
			<view class="pDa_a1">
				<view>名称</view>
				<text @click="isShow=!isShow" v-if="!isShow">{{userInfo.nickName}}</text>
				<input v-else @blur="submit" type="nickname" v-model="userInfo.nickName">
			</view>
		</view>
		
		<view class="perData_view2" @click="skip('/pages/nursingBed/mine/replacePhone?phone='+userInfo.phoneNumber)">
			<view>手机号</view>
			<text>{{userInfo.phoneNumber}} ></text>
		</view>
		<!-- <picker @change="bindPickerChange" mode="region">
			<view class="perData_view2">
				<view>地区</view>
				<text>{{region}} ></text>
			</view>
		</picker> -->
				
		
  </view>
</template>

<script>
	import {updateUserProfile,selectUserData,getUserProfile} from '@/api/system/user.js'
	import config from '@/config.js'
  export default {
    data() {
      return {
				region:'',
				userInfo:{},
				isShow:false,
      }
    },

	onShow() {
		this.getUserProfile()
	},
    methods:{
			async getUserProfile(){
				let res = await getUserProfile();
				this.userInfo = res.data
				console.log('user',this.userInfo)
				// this.$forceUpdate()
			},
			choose(){
				let that=this
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: function (res) {
						
						wx.uploadFile({
									header:{
										'content-type':'multipart/form-data'
									},
									method: 'POST',
									url: config.baseUrl+'/common/upload', 
									filePath: res.tempFilePaths[0],
									name: 'file',
									success: (realut) => {
										if(realut.data){
											let  data=JSON.parse(realut.data)
											console.log('上传图片成功',data)
											that.userInfo.avatar=data.url
											that.updateUserProfile()
										}else{
											that.$modal.msgError("图片上传失败");
										}
										
									},
									fail:function(realut){
										console.log('uploadFile fail',realut);
										that.$modal.msgError("图片上传失败");
									},
								});
					}
				});
			},
			submit(){
				this.isShow=!this.isShow
				this.updateUserProfile()
			},
			async updateUserProfile(){
				let that=this
				let res=await updateUserProfile(this.userInfo)
				if(res.data){
					that.getUserProfile()	
				}else{
					that.$modal.msgError("跟新失败");
				}
				console.log('update',res)
			},
			bindPickerChange(e){
				this.region = e.detail.value[0] +' '+ e.detail.value[1]
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
			},
			
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
    background-color:#F8F8F8;
		
		.perData_view1{
			width:100%;
			margin-top:20rpx;
			background-color:white;
			box-shadow: -8rpx 14rpx 10rpx -8rpx rgba(0,0,0,0.07);
			
			.pDa_a1{
				width:100%;
				height:104rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				justify-content:space-between;
				padding:0rpx 30rpx;
				
				view{
					font-size:28rpx;
				}
				
				.image{
					width: 80rpx;
					height: 80rpx;
					border-radius:50%;
				}
				
				text{
					font-size:28rpx;
					font-weight:500;
				}
			}
		}
		
		.perData_view2{
			width:100%;
			height:104rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:0rpx 30rpx;
			background-color:white;
			margin-top:30rpx;
			box-shadow: -8rpx 14rpx 10rpx -8rpx rgba(0,0,0,0.07);
			
			view{
				font-size:28rpx;
			}
			
			.image{
				width: 80rpx;
				height: 80rpx;
				background: #D8D8D8;
				border-radius:50%;
			}
			
			text{
				font-size:28rpx;
				font-weight:500;
			}
		}
		
  }
</style>
