<template>
  <view class="mine">
		
		<view class="fafee_v1_a1">
			<text>设备号：</text>
			<input type="text" placeholder="请输入设备编号" class="search" v-model="deviceNumber" />
			<uni-icons type="scan" size="24" color="black" @click="scanCode"></uni-icons>
		</view>
		
		<view class="fafee_v2_a1">
			<view class="fafee_v2_b1">联系人</view>
			<view class="fafee_v2_b2">
				<view class="fafee_v2_c1 fafee_v2_c2">
					<view>*姓名</view>
					<input type="text" placeholder="请输入您的姓名" class="input" v-model="userName" />
				</view>
				<view class="fafee_v2_c1">
					<view :style="isNa?'color: red;':''">*联系电话</view>
					<input type="text" @blur="checkModbile" placeholder="请输入您的联系电话" class="input" v-model="phoneNumber" />
				</view>
			</view>
		</view>
		
		<view class="fafee_v3_a1">
			<view v-for="(item,index) in problemList" :key="index" :style="item.styleCss" @click="selectStyle(index)">{{item.text}}</view>
		</view>
		
		<view class="fafee_v4_a1">
			<textarea placeholder="请描述您的故障问题" class="textarea" v-model="feedbackInfo" />
		</view>
		
		
		<view class="uploadImg">
		  <view class="showimg_box">
		    <view v-for="(item,index) in feedbackUrl" :key="index" class="imgarr">
					<!-- <view class="icon-cuo" @tap="delect(index)">
						<text>-</text>
					</view> -->
					<uni-icons type="minus-filled" color="red" size="30" class="icon-cuo" @tap="delect(index)"></uni-icons>
		      <image class="images" :src="item" @click="lookImg(index)"></image>
		    </view>
		    <view class="show_img" @tap="ChooseImage" v-if="feedbackUrl.length < 3">
					<uni-icons type="plusempty" size="30"></uni-icons>
		    </view>
		  </view>
		  上传照片({{feedbackUrl.length}}/3)
		</view>
		
		<view class="fafee_v6_a1" @click="submit()">提交</view>
		<view class="feedList" @click="skip()">反馈列表</view>
		
		<message ref="message"></message>
		
  </view>
</template>

<script>
  import { insertFaultFeedback } from '@/api/system/user'
	import message from '@/components/popup_message.vue'
	import config from '@/config.js'
  export default {
    data() {
      return {
        imgurlList: 0,
        feedbackUrl: [],
				problemList:[
					{text:'无法开锁',styleCss:'background-color:#64CF59;color:white;'},
					{text:'无法关锁',styleCss:'background-color:#F6F8FA;color:#000000;'},
					{text:'结算异常',styleCss:'background-color:#F6F8FA;color:#000000;'}
				],
				feedbackType:0,
				deviceNumber:'',
				userName:'',
				phoneNumber:'',
				feedbackInfo:'',
				isNa:false
      }
    },
		components:{
			message
		},
		onLoad(e) {
			if(e.deviceNumber) this.deviceNumber=e.deviceNumber
		},
    methods: {
			checkModbile() {
				// console.log('校验号码')
					let re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
					if(!re.test(this.phoneNumber)){
						this.isNa=true
						this.phoneNumber=''
						this.$refs.message.setMsg('warn','号码格式错误')
					}
				},
			scanCode(){
				let _this = this
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						let code = _this.getvl(res.result,'deviceNumber')
						if(code==null || code=='') code=res.result
						_this.deviceNumber=code
						// console.log(code)
					}
				})
			},
			// 对获取到的url进行正则取值
			getvl(url,name) {
				var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
				if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "));
				return "";
			},
			skip(){
				wx.navigateTo({
					url:'/pages/nursingBed/mine/feedbackList'
				})
			},
			selectStyle(index){
				this.problemList.forEach((item,int)=>{
					item.styleCss = 'background-color:#F6F8FA;color:#000000;'
					if(index == int){
						item.styleCss = 'background-color:#64CF59;color:white;'
						this.feedbackType = index
					}
				})
			},
			submit(){
				let length=this.feedbackUrl.length
				if(this.deviceNumber&& this.phoneNumber && this.userName && this.feedbackInfo && length>0){
					this.isNa=false
					let list=[]
					for(let i=0;i<=length;i++){
							wx.uploadFile({
									header:{
										'content-type':'multipart/form-data'
									},
									method: 'POST',
									url: config.baseUrl+'/common/upload', 
									filePath: this.feedbackUrl[i],
									name: 'file',
									success: (realut) => {
										if(realut.data){
											let data =JSON.parse(realut.data)
											// console.log('上传图片成功',data)
											list.push(data.url)
											if(list.length==length)	this.insertFaultFeedback(list)
										}else{
											this.$refs.message.setMsg('error','图片上传失败')
										}
									},
									fail:function(realut){
										// console.log('uploadFile fail',realut);
										this.$refs.message.setMsg('error','图片上传失败')
										// this.$modal.msgError("图片上传失败");
									}
							});			
					}
					
					}else{
						this.$refs.message.setMsg('warn','请完善表单')
					}
			},
			//故障反馈
			async insertFaultFeedback(arry){
					// console.log('arry',arry)
					let list=[]
					list.push(arry)
					let tmp = {
						deviceNumber:this.deviceNumber,
						userName:this.userName,
						phoneNumber:this.phoneNumber,
						feedbackType:this.feedbackType,
						feedbackInfo:this.feedbackInfo,
						feedbackUrl: JSON.stringify(list)
					}
					let res = await insertFaultFeedback(tmp);
					if(res.code==200){
							this.$refs.message.setMsg('success','成功')
							this.feedbackUrl=[]
							this.deviceNumber=''
							this.phoneNumber=''
							this.feedbackInfo=''
							this.userName=''
							this.feedbackType=0
					}else{
						this.$refs.message.setMsg('error','服务异常')
					}
			},
			//删除图片
			delect(index) {
			  uni.showModal({
			    title: "提示",
			    content: "是否要删除该图片",
			    success: (res) => {
			      if (res.confirm) {
			        this.feedbackUrl.splice(index, 1)
			      }
			    }
			  })
			},
			//查看图片
			lookImg(val) {
			  const urls = this.feedbackUrl
			  const current = val
			  uni.previewImage({
			    urls,
			    current
			  })
			},
			//选择图片
			ChooseImage() {
			  var _this = this;
			  uni.chooseImage({
			    count: 3, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album', 'camera'], //从相册选择和拍照
			    success: (res) => {
						if(res.tempFilePaths.length<3){
							res.tempFilePaths.forEach(itm=>{
								_this.feedbackUrl.push(itm)
							})
						}else{
							_this.feedbackUrl=res.tempFilePaths
						}
						// console.log(_this.feedbackUrl)
						
						_this.$forceUpdate()
			    }
			  });
			}
			
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
    background-color:#FFFFFF;
		overflow: auto;
		padding:0rpx 30rpx;
		
		.fafee_v1_a1{
			margin-top:30rpx;
			width:100%;
			height:96rpx;
			background: #F6F8FA;
			border-radius: 6rpx;
			display: flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			padding:0rpx 30rpx;
			
			text{
				font-size:26rpx;
				font-weight:bold;
			}
			
			.search{
				width:400rpx;
				font-size:26rpx;
				position: relative;
				left:-20rpx;
			}
		}
		
		.fafee_v2_a1{
			margin-top:30rpx;
			width:100%;
			
			.fafee_v2_b1{
				font-size:28rpx;
				font-weight:bold;
			}
			
			.fafee_v2_b2{
				margin-top:25rpx;
				width: 100%;
				background: #F6F8FA;
				border-radius: 6rpx;
				padding:0rpx 30rpx;
				
				.fafee_v2_c1{
					display:flex;
					flex-direction:row;
					align-items:center;
					padding:30rpx 0rpx;
					
					view{
						width:160rpx;
						font-size: 26rpx;
						font-weight:bold;
					}
					
					.input{
						font-size: 26rpx;
					}
				}
				.fafee_v2_c2{
					border-bottom:1rpx solid #EEEEEE;
				}
			}
		}
		
		.fafee_v3_a1{
			width:100%;
			height:130rpx;
			display:flex;
			flex-direction:row;
			align-items:center;
			
			view{
				padding:16rpx;
				border-radius: 6rpx;
				background: #F6F8FA;
				font-size: 26rpx;
				font-weight:bold;
				margin-right:30rpx;
			}
		}
		
		.fafee_v4_a1{
			width:100%;
			
			.textarea{
				width:100%;
				height:322rpx;
				background-color: #F6F8FA;
				border-radius: 16rpx;
				font-size:26rpx;
				padding:30rpx;
			}
		}
		
		.uploadImg {
		  width: 100%;
		  background: #fff;
		  padding: 30rpx 30rpx;
		  box-sizing: border-box;
		  font-size: 26rpx;
		  font-family: PingFangSC-Regular, PingFang SC;
		  font-weight: 400;
			color: rgba(0,0,0,0.29);
		
		  .showimg_box {
		    display: flex;
		    align-items: center;
		    margin-top: 20upx;
		
		    .show_img {
		      width: 140upx;
		      height: 140upx;
		      border: 2upx dashed #eee;
		      margin: 20upx 0;
		      background-color: #f7f7f7;
					display: flex;
					justify-content:center;
					align-items:center;
		
		      image {
		        width: 100%;
		        height: 100%;
		        border: 2upx dashed #eee;
		      }
		    }
		
		    .images {
		      width: 140upx;
		      height: 140upx;
		      z-index: 98;
		    }
		
		    .imgarr {
		      display: flex;
		      align-items: center;
		      position: relative;
		      margin: 0 10upx;
		    }
		
		    .icon-cuo {
					background-color:white;
					border-radius:50%;
		      position: absolute;
		      right:-20rpx;
		      top:-20rpx;
		      z-index: 99;
		    }
		  }
		}
		.fafee_v6_a1{
			width: 100%;
			height: 92rpx;
			margin-top:60rpx;
			background: #64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:92rpx;
			color:white;
			font-size: 28rpx;
			font-weight: bold;
		}
		.feedList{
			margin-top:40rpx;
			margin-bottom: 10rpx;
			color: #aaaaaa;
			text-align: center;
		}
  }
</style>
