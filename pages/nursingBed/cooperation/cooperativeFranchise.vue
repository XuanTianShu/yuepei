<template>
  <view class="cooperation">
		
		<u-navbar :autoBack="true" bgColor="rgba(0,0,0,0)" leftIconColor="white" />
		
		<view class="cofr_v1_a1">
			<view>悦陪共享陪护床</view>
			<text>合作加盟</text>
		</view>
		
		<view class="cofr_v2_a1">
			<view class="cofr_v2_b1">
				<view>*姓名</view>
				<input type="text" placeholder="请输入您的姓名" v-model="userName" />
			</view>
			<view class="cofr_v2_b1">
				<view :style="isNa?'color: red;':''">*联系电话</view>
				<input type="text" placeholder="请输入您的联系电话" @blur="checkModbile(phoneNumber)" v-model="phoneNumber" />
			</view>
			
			<picker @change="bindPickerChange" mode="region">
				<view class="cofr_v2_b4">
					<view class="cofr_v2_c1">*所在地区</view>
					<view class="cofr_v2_c2" v-if="region == ''">请选择地区</view>
					<view class="cofr_v2_c2 cofr_v2_c3" v-else>{{region}}</view>
				</view>
			</picker>
			
			<view class="cofr_v2_b3">
				<textarea placeholder="请描述您的具体加盟需求" class="textarea" v-model="applyfor" />
			</view>
			
			<view class="subit" @click="insertJoinIn()">提交</view>
			<view class="skipTxt" @click="skip('/pages/nursingBed/cooperation/joinList')">加盟列表</view>
		</view>
		
  </view>
</template>

<script>
  import { insertJoinIn } from '@/api/system/user'
  export default {
    data() {
      return {
				region:'',
				userName:'',
				phoneNumber:'',
				address:'',
				applyfor:'',
				isNa:false
			}
    },
    methods: {
			checkModbile(mobile) {
					let re = /^1[3,4,5,6,7,8,9][0-9]{9}$/;
					
					if(!re.test(mobile)){
						this.isNa=true
						this.phoneNumber=''
						this.$modal.alert("号码格式错误");
						return
					}else{
						this.isNa=false
					}
				},
			bindPickerChange(e){
				this.region = e.detail.value[0] +' '+ e.detail.value[1] +' '+ e.detail.value[2]
			},
			//和作加盟
			async insertJoinIn(){
				
				if(this.userName &&this.region && this.applyfor && this.phoneNumber){
					let tmp = {
						userName:this.userName,
						phoneNumber:this.phoneNumber,
						address:this.region,
						applyfor:this.applyfor
					}
					
					let res = await insertJoinIn(tmp);
					
					if(res.code == 200){
						this.$modal.msgSuccess("提交成功");
						this.userName =''
						this.region =''
						this.applyfor =''
						this.phoneNumber =''
						// this.skip('/pages/nursingBed/cooperation/joinList')
					}
				}else{
					this.$modal.msgError("提交数据不能为空");
				}
			},
			skip(url){
				uni.navigateTo({
					url:url
				});
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
    background-color:#FFFFFF;
		
		.cofr_v1_a1{
			width:100%;
			height:470rpx;
			background-image:url('https://images.weserv.nl/?url=https://www.yp10000.com/static/img/franc_img.png');
			background-size:100% 100%;
			background-repeat:no-repeat;
			
			view{
				padding-top:200rpx;
				padding-left:30rpx;
				margin-bottom:14rpx;
				font-size:48rpx;
				font-weight:bold;
				color:white;
			}
			text{
				padding-left:30rpx;
				font-size:28rpx;
				font-weight:400;
				color:white;
			}
		}
		
		.cofr_v2_a1{
			width:100%;
			background-color: #FFFFFF;
			border-radius: 36rpx 36rpx 0px 0px;
			position:relative;
			top:-80rpx;
			padding:30rpx;
			
			.cofr_v2_b1{
				width:100%;
				border-bottom:1rpx solid #EEEEEE;
				display:flex;
				flex-direction:row;
				align-content: center;
				padding:30rpx;
				
				view{
					width:30%;
					font-size: 28rpx;
				}
				
				input{
					width:65%;
					font-size: 28rpx;
				}
			}
			
			.cofr_v2_b4{
				width:100%;
				display:flex;
				flex-direction:row;
				align-content: center;
				padding:30rpx;
				font-size: 28rpx;
				
				.cofr_v2_c1{
					width:30%;
				}
				.cofr_v2_c2{
					width:70%;
					color:silver;
				}
				.cofr_v2_c3{
					color:black;
				}
			}
			
			.cofr_v2_b3{
				margin-top:15rpx;
				width:100%;
				
				.textarea{
					width:100%;
					height:268rpx;
					background-color: #F6F8FA;
					border-radius: 16rpx;
					font-size:28rpx;
					padding:30rpx;
				}
			}
			
			.subit{
				margin-top:100rpx;
				width: 100%;
				height: 92rpx;
				background: #64CF59;
				border-radius: 16rpx;
				text-align:center;
				line-height:92rpx;
				font-size:28rpx;
				font-weight:bold;
				color:white;
			}
			
			.skipTxt{
				width:300rpx;
				font-size:26rpx;
				color: #007AFF;
				margin:48rpx auto;
				text-align:center;
			}
		}
		
  }
</style>
