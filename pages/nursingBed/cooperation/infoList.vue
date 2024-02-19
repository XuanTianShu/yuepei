<template>
	<view class="infoList">
		<view class="car" v-for="(item,index) in list" :key="index" @click="open(item)">
			<view  class="">{{title}}:{{item.id}}</view>
			<view v-if="from" class=""><text>医院:</text> <text>{{item.hospitalName}}</text></view>
			<view v-if="from" class=""><text>科室:</text> <text>{{item.sectionName}}</text></view>
			<image :src="item.urlRows[0]" ></image>
		</view>
	</view>

</template>

<script>
	import {selectByUserId,selectUserCaseByUserId} from '@/api/system/user.js'
	export default {
	  data() {
	    return {
			list:[]	,
			title:'保险合作',
			from:false,
		}
	  },
	  onLoad(val) {
		if(val.index=='1'){
			
			this.selectByUserId()
		}else{
			this.from=true
			this.title='病例记录'
			this.selectUserCaseByUserId()
		}
	  	
	  },
	  methods:{
		  open(itm) {
		  	uni.navigateTo({
		  		url:'show?data='+JSON.stringify(itm)
		  	})
		  },
		  async selectByUserId(){
			  let res=await selectByUserId()
			  // console.log(res.data)
			  this.list=res.data
			  this.list.forEach((i,index)=>{
				  let arr=[]
				  arr.push(i.urlRows)
				  this.list[index].urlRows=arr
			  })
			  
			  
		  },
		  async selectUserCaseByUserId(){
		  		let res=await selectUserCaseByUserId()
				this.list=res.data
				this.list.forEach((itm,index)=>{
					let arr= itm.urlRow.split(",")
					// console.log(arr)
					this.list[index].urlRows=arr
				})
				
		  }
	  }
	}
</script>

<style lang="less" scoped>
	.infoList{
		width: 100%;height: 100%;padding: 20rpx;
		.bto{
			width: 90%;
			height: 800rpx;
		}
		.car{
			width: 100%;
			padding:20rpx;
			background-color: white;
			margin-bottom: 20rpx;
			view{
				display: flex;
				justify-content: space-between;
				padding-right: 50rpx;
			}
			image{
				display: block;
				height: 80rpx;
				width:80rpx;
				margin: 10rpx 0;
			}
		}
	}
</style>