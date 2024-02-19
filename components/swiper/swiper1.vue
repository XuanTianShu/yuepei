<template>
	<u-swiper
	  :list="banner"
	  previousMargin="20"
	  nextMargin="20"
	  :circular="true"
	  :indicator="true"
	  radius="5"
	  indicatorActiveColor="rgba(0,0,0,0.08)"
	  indicatorInactiveColor="rgba(0,0,0,0.04)"></u-swiper>
</template>

<script>
	export default {
		name:'swiper1',
		props:{
			banner:{
        type: [Array],
        default: []
      }
		},
	  data() {
	    return {
				
				}
		}
	}
</script>

<style>
</style>