<template>
	<view class="show">
		<image :src="itm" v-for="itm in data.urlRows" ></image>
	</view>
</template>

<script>
	export default{
		data() {
		  return {
					data:''
				}
		},
		onLoad(val) {
				this.data=JSON.parse(val.data)
				console.log(this.data)
		}
	}
</script>

<style scoped lang="less">
	.show{
		background-color: #FFF;
		height: 100%;
		width: 100%;
		image{
			width: 100%;
		}
	}
</style>