<template>
	<view class="wrap">
		<view class="swiper-wrap">			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productId:'',
				productDetail:{}
			}
		},
		onLoad(options) {
			console.log(options)
			this.productId = options._id
			this.getProductDetail()
		},
		methods: {
			async getProductDetail(){
				const res = await this.api.getProductDetail({
					_id:this.productId
				})
				this.productDetail = res.item
			},
		}
	}
</script>

<style>

</style>
