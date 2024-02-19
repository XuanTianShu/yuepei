<template>
	<view class="upload">
		<view class="u_a1" v-if="flies.length==0" @click="choose">
				<uni-icons type="camera-filled" size="30" color="#dadada"></uni-icons>
				<view class="">
					点击上传图片
				</view>
		</view>
		<view class="u_a2" v-else>
				<image  :src="item"  v-for="item in flies"></image>
				<view class="u_a2_b">
					<image src="https://www.yp10000.com/static/img/agent/15.png" mode="" style="width: 12%;height: 80rpx;border-radius: 20rpx;"></image>
						<!-- <uni-icons type="folder-add" size="40" color="#64d057" @click="choose"></uni-icons> -->
						<button type="default" @click="upload" >确认提交</button>
				</view>
		</view>
	<!-- 	<view>
			{{Error}}
		</view> -->
		<view class="btu" @click="Tolist">
			查看上传文档列表
		</view>
		<message ref="message"></message>
	</view>
</template>

<script>
	import message from '@/components/popup_message.vue'
	import {uploadsFile} from '@/api/system/agent'
	import config from '@/config.js'
	
	export default{
		data(){
			return{
				flies:[],
				Error:''
			}
		},
		onLoad() {
			this.userid=uni.getStorageSync('userid')
			this.baseURL=this.$baseUrl
		},
		components:{
			message
		},
		methods:{
			Tolist(){
				uni.navigateTo({
					url:'Replacebattery'
				})
			},
			choose(){
				const that =this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'], //从相册选择
					success: function (res) {
						that.flies.push(res.tempFilePaths[0])
					}
				})
			},
			
			upload(){
				let that=this
				that.flies.forEach((item,index)=>{
						wx.uploadFile({
							header:{
								'content-type':'multipart/form-data'
							},
							method: 'POST',
							url: config.baseUrl+'/common/upload', 
							filePath: item,
							name: 'file',
							success:res=>{
								let  data=JSON.parse(res.data)
								console.log('上传图片成功',data.url)
								that.flies[index]=data.url
								if(index==that.flies.length-1){
									console.log('that.flies',that.flies)
										that.uploadsFile()
								}
							},
							fail:function(realut){
								this.Error=realut
								console.log('uploadFile fail',realut);
								that.$modal.msgError("图片上传失败");
							},
						})
					
				
				
						
				})
			},
			
			async uploadsFile(){
					
					let data={
							userId:this.userid,
							feedbackUrl:this.flies
					}
					let res=await uploadsFile(data)
					if(res.code==200){
						this.flies=[]
						this.$refs.message.setMsg('success','上传成功')
					}else{
						this.$refs.message.setMsg('error','上传失败，服务异常')
					}
					 
			}
		}
	}
</script>

<style lang="less" scoped>
	.upload{
		width: 100%;
		height: 100%;
		background-color: #FFF;
		padding: 0 20rpx;
		.u_a2{
			width:100%;
			image{
				width: 100%;
				border: 1rpx solid rgba(24, 24, 24, 0.2);
			}
			.u_a2_b{
				position: absolute;
				bottom: 10%;
				display: flex;
				width: 100%;
				justify-content: space-between;
				button{
					width: 80%;
					margin-left: 10rpx;
					background-color: #64d057;color: #fff;font-size: 30rpx;
				}
			}
		}
		
		.u_a1{
			position: relative;
			top: 20%;
			width: 350rpx;
			border: 1rpx #dadada dashed; 
			margin: 0 auto;
			text-align: center;
			padding: 60rpx 0;
		}
		.btu{
			color: #2394da;
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 6%;
		}
	}
</style>