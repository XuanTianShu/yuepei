<template>
	<view class="select-y" >
			<view class="placeholder" :style="style" @click="check()">
					<text :style="title?'':'opacity: 0.5;'">
							{{title?title:data.placeholder}}
					</text>
					<image v-if="!title" :class="!options?'triangle':''" :src="data.icon"></image>
					<image class="close" v-else @click.stop="clear" src="https://www.yp10000.com/static/img/user/15.png" ></image>
			</view>
			<view class="options select-y" v-show="options"	>
					<view class="option placeholder" :class="title==item.title?'OnActive':''" v-for="(item,index) in data.list" :key="index" @click="change(item)">
							<text>{{item.title}}</text>
					</view>
			</view>
	</view>
</template>
  
<script>
	export default{
		data(){
			return{
				options:false,
				data:{
					placeholder:'请选择...',
					icon:'/static/images/triangle.png',
					list:[],
				},
				title:'',
				style:'',
				characteristic:''//特征
			}
		},
		methods:{
				check(){
					this.options=!this.options
					this.$parent.sx=this.characteristic
				},
				change(e) {
						this.options=!this.options
						this.title=e.title
						this.$parent.change(e)
				},
				clear(){
					this.title=''
					this.$parent.sx=this.characteristic
					this.$parent.change()
				}
				
		},
	}
</script>

<style lang="less" scoped>
	.select-y{
		width: 100%;
		background-color: #fff;
		position: relative;
		image{
			width: 20rpx;height: 15rpx;
		}
		.close{
			width: 36rpx;height: 36rpx;
		}
			
		.options{
			border: 1rpx solid rgba(216, 216, 216, 0.8);
			border-radius: 8rpx;
			border-top: unset;
			position: absolute;
			.option{
				padding:0 15rpx;
				background-color: #FFF;
				border-radius: unset;
				position: relative;
				z-index: 1;
			}
			.OnActive{
				color:  #0055ff;
				background-color: rgba(236, 236, 236, 1);
			}
		}
		
		.placeholder{
				background-color: rgba(236, 236, 236, 0.5);
				width: 100%;
				height: 80rpx;
				border-radius: 8rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:1rpx 20rpx;
				
				.triangle{
					transform: rotate(180deg);
				}
		 }
		
	}
</style>