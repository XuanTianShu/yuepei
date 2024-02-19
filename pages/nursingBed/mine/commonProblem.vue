<template>
  <view class="mine">
		<uni-nav-bar @clickLeft="$tab.navigateBack()"  left-icon="left" :title="title" style="font-weight:bold;" :fixed="true" :statusBar="true" />
		<view class="comp_v1_a1" v-for="(item,index) in list" :key="index">
			<uni-collapse>
				<uni-collapse-item title-border="none" :border="false">
					<view slot="title" class="comp_v1_b1">
						<image src="https://images.weserv.nl/?url=https://www.yp10000.com/static/img/problem.png" class="image"></image>
						<view class="title" v-if="item.commonProblemTitle">{{item.commonProblemTitle}}</view>
						<view class="title" v-if="item.healthProblemTitle">{{item.healthProblemTitle}}</view>
						<view class="title" v-if="item.medicalProblemTitle">{{item.medicalProblemTitle}}</view>
					</view>
					<view class="content">
						<view v-if="item.commonProblemTitle" class="text" v-html="item.commonProblemSolution"></view>
						<view v-if="item.healthProblemTitle" class="text" v-html="item.healthProblemSolution"></view>
						<view v-if="item.medicalProblemTitle" class="text" v-html="item.medicalProblemSolution"></view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		
  </view>
</template>

<script>
  import { selectCommonProblemList,selectMedicalProblem,selectHealthProblemList } from '@/api/system/user'
  export default {
    data() {
      return {
				title:'常见问题',
				list:[
					// {
					// 	commonProblemTitle:'康复训练',
					// 	commonProblemSolution:'三点睡，五点起，阎王夸我好身体'
					// },{
					// 	commonProblemTitle:'养生知识',
					// 	commonProblemSolution:'多吃饭多睡觉，少吃零食多看报'
					// },
				],
				
      }
    },
		onLoad(e) {
			 if(e.tml==1){
				 this.title='医疗字典'
				 this.list=[
						// {
						// 	commonProblemTitle:'常见病例',
						// 	commonProblemSolution:'新冠，艾滋，猴豆'
						// },{
						// 	commonProblemTitle:'养生知识',
						// 	commonProblemSolution:'保温杯里泡枸杞'
						// },
				 ]
				  this.selectMedicalProblem()
			 }
			 else if(e.tml==2){
			 		this.title='康养知识'
					this.selectHealthProblemList()
			 }
			 else{
				 this.selectCommonProblemList()
			 }
			
			// console.log(this.list)
	},
		
    methods: {
			async selectCommonProblemList(){ //常见问题
				let res = await selectCommonProblemList();
				if(res.data)
				this.list = res.data
			},
			async selectMedicalProblem(){ //医疗字典
				let res = await selectMedicalProblem();
				if(res.data)
				this.list = res.data
			},
			async selectHealthProblemList(){//康养知识
				let res = await selectHealthProblemList();
				if(res.data)
				this.list = res.data
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
    background-color:#F6F8FA;
		padding:30rpx;
		
		.comp_v1_a1{
			width:100%;
			margin-bottom:30rpx;
			box-shadow: 0px -2rpx 14rpx -10rpx rgba(0,0,0,0.3);
			border-radius: 16rpx;
			overflow:hidden;
			padding-top: 25rpx;
			.comp_v1_b1{
				padding:25rpx;
				display:flex;
				flex-direction:row;
				align-items:center;
				
				.image{
					width: 40rpx;
					height:40rpx;
				}
				.title{
					margin-left:16rpx;
					font-size:28rpx;
					max-width:450rpx;
				}
			}
			
			.content{
				padding:0 40rpx;
				color:rgba(0,0,0,0.8);
				.text{
					padding: 20rpx 0;
					border-top: 1px solid rgba(139, 139, 139, 0.5);
				}
			}
		}
  }
</style>
