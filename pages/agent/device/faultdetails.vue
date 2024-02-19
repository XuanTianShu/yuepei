<template>
	<view class="containet" style="">
		<view class="content" style="">
			<view class="list-item" style="">
				故障编号<text style="">{{feedbackId}}</text>
			</view>
			<view class="list-item" style="">
				设备编号<text style="">{{deviceNumber}}</text>
			</view>
			<view class="list-item" style="">
				填写问题
			</view>   
			<view class="uni-textarea" style="">
				<textarea placeholder="请描述您遇到的问题" v-model="feedbackInfo" maxlength="199"/>
			</view>
			<view class="upload" style="">
				<view class="list" style="">
					
					<view class="uploadbtn" style="" @click="upload" v-if="imglength<3">
						<image src="https://www.yp10000.com/static/img/agent/30.png" mode="" style=""></image>
					</view>
					<view class="imglist" style="">
						<view class="imageitem" style="" v-for="item in imglist" >
							<image :src="item" mode="" style=""></image>
							
							<!-- <uni-icons type="minus-filled" size="20" color="red"  @click="deleteimg(item)"  style=""></uni-icons> -->
							<image class="imagedelete" src="https://www.yp10000.com/static/img/agent/21.png" @click="deleteimg(item)" mode=""></image>
							
						</view>
					</view>
					
				</view>
				
				<view class="imagetext" style="">
					上传照片（{{imglength}}/3）
				</view>
			</view>
		</view>
		<view class="">
			<button type="default" @click="submit" style="margin-top: 300rpx;border: 1rpx solid #6ed161;background-color: #fff;color: #6ed161;font-size: 30rpx;padding: 5rpx;border-radius: 20rpx;">提交</button>
		</view>
	</view>
</template>

<script>
	import {writeMaintenanceRecords} from '@/api/system/agent'
	import request from "@/utils/request"
	export default{
		data(){
			return{
				imglist:[
					// {url:'../../../static/login.jpg',id:1},
					// {url:'../../../static/login.jpg',id:2}
				],
				feedbackId:'',
				deviceNumber:'',
				feedbackInfo:'',
				imglength:'',
				baseURL:''
			}
		},
		onLoad(option) {
			console.log(option,this.$baseUrl,'=0000');
			this.baseURL=this.$baseUrl
			// this.baseURL=config.baseUrl
			console.log(this.baseURL,'----');
			// this.feedbackInfo=option.feedbackInfo
			this.feedbackId=option.feedbackId
			this.deviceNumber=option.deviceNumber
			// let imgurl=JSON.parse(option.img)
			// for(let i in imgurl){
			// 	let res=''
			// 	res=imgurl[i]
			// 	this.imglist.push(res)
			// }
			this.imglength=imgurl.length
		},
		methods:{
			async submit(){
				// let img=JSON.stringify()
				let data={
					feedbackId:this.feedbackId,
					deviceNumber:this.deviceNumber,
					feedbackInfo:this.feedbackInfo,
					devicePicture:this.imglist,
				}
				console.log(data,'---');
				// return false 
				let res=await writeMaintenanceRecords(data)
				if(res.code==200){
					uni.showToast({
						title: 'res.msg',
						duration: 2000
					});
					uni.reLaunch({
						url:'faultfinish?feedbackId='+this.feedbackId
					})
				}
			},
			deleteimg(item){
				console.log(item,this.imglist,'在这里');
				// return false
				for(let i in this.imglist){
					if(item==this.imglist[i]){
						this.imglist.splice(i, 1)
						this.imglength=this.imglist.length
						console.log('等于第',i,'张',this.imglist);
						// this.imglist=this.imglist
					}else{
						console.log('没事');
					}
				}
				
			},
			upload(){
				
				let that=this
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //从相册选择
					success: function (res) {
						const tempFilePaths = res.tempFilePaths;
						for(let i in tempFilePaths){
							
							let dataurl=that.baseURL+"/common/uploads"
							console.log(dataurl);
							uni.uploadFile({
							                url: dataurl, //仅为示例，非真实的接口地址
							                filePath: tempFilePaths[i],
							                name: 'files',
							                formData: {
							                    'user': 'test'
							                },
							                success: (uploadFileRes) => {
												let data=JSON.parse(uploadFileRes.data)
												let img=''
												img=that.baseURL+data.fileNames
												console.log(data.urls,'data.urls');
							                    that.imglist.push(img)
												that.imglength=that.imglist.length
							                }
							            });
						}
						
						console.log('hahah');
						console.log(that.imglist);
						that.imglength=that.imglist.length
						
						
					},
					
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.containet{
		width: 100%;height: 100vh;background-color: #fff;padding: 30rpx;
		.content{
			.list-item{
				margin: 40rpx 0rpx;
				text{
					margin-left: 30rpx;color: #a4a6a7;
				}
			}
			.uni-textarea{
				margin: 40rpx 0rpx 20rpx 0;background-color: #f6f8fa;padding: 30rpx;
			}
			.upload{
				display: flex;
				.list{
					display: flex;
					.uploadbtn{
						background-color: #f6f8fa;height: 150rpx;width: 150rpx;text-align: center;margin: 5rpx;
						image{
							height: 60rpx;width: 60rpx;margin-top: 50rpx;
						}
					}
					.imglist{
						display: flex;
						.imageitem{
							padding: 5rpx;position: relative;
							image{
								height: 150rpx;width: 150rpx;
							}
							.imagedelete{
								position: absolute;right: -10rpx;top: -10rpx;height: 40rpx;width: 40rpx;border-radius: 20rpx;
							}
						}
					}
				}
				.imagetext{
					display: flex;flex-direction: column-reverse;margin: 5rpx;color: #a4a6a7;
				}
			}
		}
	}
	
		 
</style>