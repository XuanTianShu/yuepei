<template>
  <view class="cooperation">
		
		<view class="cop_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="image"></image>
			<text>上传图片</text>
		</view>
		
		
		<view class="cop_v1_a2" @click="chooseImage(0)">
			<!-- <image src="@/static/images/upPic.png"></image> -->
			<image v-if="imge1" class="image" :src="imge1"></image>
			<image v-else :src="img1"></image>
			<text>点击上传病例图片</text>
		</view>
		<view class="cop_v1_a2" @click="chooseImage(1)">
			<image v-if="imge2" class="image" :src="imge2"></image>
			<image v-else :src="img1"></image>
			<text>点击上传检验单图片</text>
		</view>
		<view class="cop_v1_a2" @click="chooseImage(2)">
			<image v-if="imge3" class="image" :src="imge3"></image>
			<image v-else :src="img1"></image>
			<text>点击上传拍片图片</text>
		</view>
		
		<view class="myCase_v1_a1">
			<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/triangle.png" class="image"></image>
			<text>填写信息</text>
		</view>
		
		<view class="myCase_v2_a1">
			<text>医院名称</text>
			<input type="text" v-model="hospitalName" />
		</view>
		
		<view class="myCase_v2_a1">
			<text>科室名称</text>
			<input type="text" v-model="sectionName" />
		</view>
		
		<view class="content_a2" @click="submit">
				<view class="btn">提交</view>
				<view class="bto" @click.stop="skip">列表详情</view>
		</view>
		
		<message ref="message"></message>
  </view>
</template>

<script>
  import config from '@/config'
  import { insertUserCase } from '@/api/system/user'
	import message from '@/components/popup_message.vue'
  export default {
    data() {
      return {
				urlRow:['','',''],
				hospitalName:'',
				sectionName:'',
				img1:require('@/static/images/upPic.png'),
				img1:require('@/static/images/upPic.png'),
				imge1:'',
				imge2:'',
				imge3:'',
				files:[]
			}
    },
		components:{
			message
		},
    methods: {
			skip(){
				uni.navigateTo({
					url:'/pages/nursingBed/cooperation/infoList?index=2'
				});
			},
			submit(){
				let exp = /^[0-9a-zA-Z_]{1,}$/
				let str='请填写正确的医院和科室'
				this.files.push(this.imge1)
				this.files.push(this.imge2)
				this.files.push(this.imge3)
				console.log(this.files)
				let length=this.files.length
				
				if(exp.test(this.hospitalName)){
					this.hospitalName=''
					this.$refs.message.setMsg('warn',str)
					return
				}
				if(exp.test(this.sectionName)){
					this.sectionName=''
					this.$refs.message.setMsg('warn',str)
					return
				}
				if(length!=3 ){
					str='有未上传图片'
					this.$refs.message.setMsg('warn',str)
					return
				}
				
				let url=''
				for(let i=0;i<=length;i++){
						wx.uploadFile({
								header:{
									'content-type':'multipart/form-data'
								},
								method: 'POST',
								url: config.baseUrl+'/common/upload', 
								filePath: this.files[i],
								name: 'file',
								success: (realut) => {
									if(realut.data){
										let data =JSON.parse(realut.data)
										url=url+data.url+','
										console.log(i,length,'上传图片成功',url)
										if(i==length-1)	this.insertUserCase(url)
									}else{
										str='上传图片失败'
										this.$refs.message.setMsg('warn',str)
									}
								},
								fail:function(realut){
									console.log('uploadFile fail',realut);
									str='上传图片失败'
									this.$refs.message.setMsg('warn',str)
								}
						});			
				}
			
			},
			chooseImage(val){
				uni.chooseImage({
			    count: 1,
				sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						
						switch (val){
							case 0:
								this.imge1=chooseImageRes.tempFilePaths[0];
								break;
							case 1:
								this.imge2=chooseImageRes.tempFilePaths[0];
								break;
							case 2:
								this.imge3=chooseImageRes.tempFilePaths[0];
								break;
							default:
								break;
						}
						
					}
				});
			},
			async insertUserCase(arry){
				let data={
					hospitalName:this.hospitalName,
					sectionName:this.sectionName,
					urlRow:arry
				}
				let res = await insertUserCase(data)
				// console.log(res)
				if(res.data){
					let str='提交成功'
					this.hospitalName=''
					this.sectionName=''
					this.imge1=''
					this.imge2=''
					this.imge3=''
					this.$refs.message.setMsg('success',str)
				}
			}
			
		}
  }
</script>

<style lang="less" scoped>
  .cooperation {
		background-color:#FFFFFF;
		padding:0rpx 30rpx;
		
		.cop_v1_a1{
			width:100%;
			display:flex;
			flex-direction:row;
			align-items:center;
			font-size:30rpx;
			font-weight:bold;
			// padding:20rpx 30rpx;
			
			.image{
				width:26rpx;
				height:36rpx;
				margin-right:20rpx;
			}
		}
		
		.cop_v1_a2{
			width: 418rpx;
			height: 222rpx;
			border: 1rpx dashed #979797;
			margin:60rpx auto;
			opacity: 0.5;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			image{
				width:100rpx;
				height:100rpx;
			}
			.image{
				width:100% !important;
				height:100% !important;
			}
		}
		
		.content_a2{
			bottom: 0%;
			text-align: center;
			width: 100%;
			padding: 100rpx 0 100rpx 0;
			.btn{
				width: 100%;
				font-size: 26rpx;
				padding: 25rpx 0;
				margin: auto;
				color: #ffffff;
				border-radius: 10rpx;
				background-color: #64CF59;
			}
			.bto{
				width: 100%;
				opacity: 0.5;
				margin-top: 30rpx;
			}
		}
		
		.myCase_v1_a1{
			width:100%;
			font-size:30rpx;
			font-weight:bold;
			display:flex;
			flex-direction:row;
			align-items:center;
			
			.image{
				width:26rpx;
				height:36rpx;
				margin-right:20rpx;
			}
		}
		
		.myCase_v2_a1{
			width:100%;
			font-size:28rpx;
			font-weight:400;
			display:flex;
			flex-direction:row;
			align-items:center;
			margin-top:40rpx;
			
			input{
				width: 542rpx;
				height: 64rpx;
				border-radius: 8rpx;
				border: 1rpx solid #979797;
				margin-left:30rpx;
				padding-left:10rpx;
			}
		}
		
  }
</style>
