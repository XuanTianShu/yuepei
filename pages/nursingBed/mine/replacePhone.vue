<template>
  <view class="mine">
		
		<view class="rep_vi_a1" >
			<view class="rep_vi_b1" v-if="phone">
				<text class="rep_vi_c1">原手机号码</text>
				<text class="rep_vi_c2">+86</text>
				<input type="text" :disabled="phone" v-model="phone" placeholder="请输入手机号">
			</view>
			
			<view class="rep_vi_b1">
				<text class="rep_vi_c1" >新手机号码</text>
				<!-- <button class="rep_vi_c1" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">新手机号码</button> -->
				<text class="rep_vi_c2">+86</text>
				<input type="text" v-model="newPhone" @blur="check" placeholder="请输入手机号">
			</view>
			
			<view class="rep_vi_b2">
				<view class="rep_vi_c3">
					<input type="text" v-model="code" placeholder="请输入验证码">
				</view>
				<view class="rep_vi_c4" @click="getCode()" v-if="isDisable == true">获取验证码</view>
				<view class="rep_vi_c4 rep_vi_c5" v-else>{{timeCode}}S</view>
			</view>
			
			<view class="rep_submit" @click="updateUserPhoneNumber()">确定</view>
		</view>
		
		<message ref="message"></message>
  </view>
</template>

<script>
  import { getCode,updateUserPhoneNumber } from '@/api/system/user'
	import message from '@/components/popup_message.vue'
  export default {
    data() {
      return {
				phone:'',
				newPhone:'',
				code:'',
				timeCode:60,
				timeout:'',
				isDisable:true
      }
    },
		onLoad(e){
			if(e.phone) this.phone=e.phone
		},
		components:{
			message
		},
    methods: {
			check(){
				if(this.phone==this.newPhone){
					this.$refs.message.setMsg('warn','新旧号码相同')
					this.newPhone=''
					return
				}
			},
			getPhoneNumber(e){
				console.log(e.detail.code)
			},
			async getCode(){
				if(this.newPhone){
					if(!(/^1[3-9]\d{9}$/.test(this.newPhone))) {
						this.$modal.msgError("手机号错误");
					}else{
						
						let data = {
							oldPhoneNumber:this.phone,
							newPhoneNumber:this.newPhone
						}
						
						let res = await getCode(data);
						
						if(res.code == 200){
							this.$modal.msg("发送成功");
							
							this.isDisable = false
							
							this.timeout = setInterval(() => {
								setTimeout(()=>{//清除定时器队列
										if(this.timeCode > 0) {
											this.timeCode--;
										}else {
											clearInterval(this.timeout)
											this.timeCode = 60;
											this.isDisable = true
										}
								},0)
								
							}, 1000)
							
						}
					}
				}else{
					this.$modal.msgError("手机号不能为空");
				}
			},
			async updateUserPhoneNumber(){
				if(this.code){
					let data = {
						phoneNumber:this.newPhone,
						code:this.code
					}
					
					let res = await updateUserPhoneNumber(data);
					
					if(res.code == 200){
						this.$tab.navigateBack().then(() => {
							this.$modal.msgSuccess("修改成功");
						})
					}
				}else{
					this.$modal.msgError("验证码不能为空");
				}
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
    background-color:white;
		
		.rep_vi_a1{
			width:690rpx;
			background-color: white;
			margin:40rpx auto;
			box-shadow: 0px 10rpx 36rpx 6rpx rgba(0,0,0,0.05);
			border-radius: 20rpx;
			padding:60rpx 35rpx 100rpx 35rpx;
			
			.rep_vi_b1{
				width:620rpx;
				height:90rpx;
				border: 1rpx solid rgba(0,0,0,0.19);
				border-radius: 46rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				overflow:hidden;
				margin-bottom:40rpx;
				
				.rep_vi_c1{
					display: block;
					font-size:28rpx;
					font-weight: 500;
					color: #64CF59;
					margin-left:36rpx;
					margin-right:24rpx;
				}
				input{
					margin-left:40rpx;
					font-size:28rpx;
					width:40vw;
				}
			}
		}
		
		.rep_vi_b2{
			display:flex;
			flex-direction:row;
			align-items:center;
			justify-content:space-between;
			margin-bottom:40rpx;
			
			.rep_vi_c3{
				width:376rpx;
				height:90rpx;
				border: 1rpx solid rgba(0,0,0,0.19);
				border-radius: 46rpx;
				overflow:hidden;
				
				input{
					width:100%;
					height:100%;
					font-size:28rpx;
					text-align:center;
				}
			}
			
			.rep_vi_c4{
				width: 226rpx;
				height: 90rpx;
				border-radius: 46rpx;
				border: 1rpx solid #64CF59;
				text-align:center;
				line-height:90rpx;
				font-size:28rpx;
				color: #64CF59;
			}
			.rep_vi_c5{
				border: 1rpx solid rgba(0,0,0,0.2);
				color: rgba(0,0,0,0.39);
			}
		}
		
		.rep_submit{
			width: 626rpx;
			height: 96rpx;
			background:#64CF59;
			border-radius: 16rpx;
			text-align:center;
			line-height:96rpx;
			color:white;
			font-weight: 500;
			font-size: 28rpx;
			margin-top:60rpx;
		}
		
  }
</style>
