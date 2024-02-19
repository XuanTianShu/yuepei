<template>
	<view class="popup_message">
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
	</view>
</template>

<script>
	 export default {
		 data() {
		   return {
		 		msgType:'',
		 		messageText:''
		   }
		 },
		 methods:{
			 setMsg(type,text){
					this.msgType=type
					this.messageText=text
					this.$refs.message.open()
			 }
		 }
	 }
</script>

<style>
</style>