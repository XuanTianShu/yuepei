<template>
	<view class="">
		就这个页面了
	</view>
</template>

<script>
	
	import {   maintenanceListssss,devicelistttt,maintenancellll } from '@/api/system/hospital'
	export default {
	  data() {
	    return {
			
		}
		},
		onLoad() {
			this.getlist()
		},
		methods:{
			async getlist(){
				console.log('000');
				let res= await  maintenancellll()
				
			}
		}
}
		
</script>

<style>
</style>