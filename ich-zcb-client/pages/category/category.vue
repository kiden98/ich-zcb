<template>
	<view>
		category
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			const categoryId = vk.getVuex('$category.categoryId')
			console.log(categoryId)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
