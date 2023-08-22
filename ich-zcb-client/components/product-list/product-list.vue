<template>
	<view class="product-list">
		<view class="product-item" v-for="(item,index) in productList" :key="index" @tap="clickProduct(item._id)">
			<view class="product-image">
				<u-lazy-load threshold="0" border-radius="10" :image="item.image"></u-lazy-load>
			</view>
			<view class="product-info">
				<view class="product-name line2">
					{{item.name || ""}}
				</view>
				<view class="product-price">
					<view class="product-price-txt">
						{{item.price | formatPrice}}
					</view>
					<view class="shopping-cart">
						<u-icon name="shopping-cart-fill" color="#dd6161" size="40" @tap.stop="clickCart(item._id)"></u-icon>
					</view>
				</view>
			</view>
		</view>				
		<view class="empty-wrap" v-if="productList.length == 0">
			<u-empty text="没有找到相关商品" mode="data"></u-empty>
		</view>
	</view>
</template>

<script>
	import {addCart} from '@/utils'
	export default {
		//组件的名称
		name:"product-list",
		//组价的属性
		props:{
			//商品列表
			productList:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			clickProduct(_id) {
				this.pageTo('/pages/detail/detail?_id=' + _id)
			},
			clickCart(_id){
				addCart(_id,1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-item{
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		background-color: $u-primary-bg-color;
		.product-image{
			flex: 1;
			width: 100%;
			margin-right: 20rpx;
		}
		.product-info{
			flex: 3;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.product-name{
				width: 400rpx;
				font-size: 30rpx;
				margin-top: 5px;
				color: $u-main-color;
			}
			.product-price{
				display: flex;
				justify-content: space-between;
				.product-price-txt{
					font-size: 32rpx;
					color: $u-primary-price-color;
				}
			}
		}
	}
</style>
