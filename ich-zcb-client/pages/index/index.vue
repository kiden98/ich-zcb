<template>
	<view class="wrap">
		<view class="search-wrap">
			<u-search shape="square" bg-color="#f3f4f6" :show-action="false" :disabled="true" @click="pageTo('/pages/search/search')"></u-search>	
		</view>
		<view class="swiper-wrap">
			<u-swiper :list="swipperList" @click="clickSwiper()"></u-swiper>	
		</view>
		<view class="category-wrap u-skeleton">
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(category,index) in categoryList" :key="index" @click="clickCategory(category._id)">
					<u-image :src="category.image" width="150" height="150" class="u-skeleton-rect"></u-image>
					<view class="grid-text u-skeleton-rect">{{category.name}}</view>
				</u-grid-item>
			</u-grid>
			<!--引用骨架屏-->
			<u-skeleton :loading="categorySkeletonloading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
		<view class="product-wrap">
			<view class="product-title">
				<u-line color="#e32a42"></u-line>
				<view class="product-title-txt">
					热卖商品
				</view>
				<u-line color="#e32a42"></u-line>		
			</view>				
			<view class="product-list">
				<view class="product-item" v-for="(item,index) in productList" :key="index" @click="clickProduct(item._id)">
					<u-lazy-load threshold="300" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="product-name line2">
						{{item.name ||""}}
					</view>
					<view class="product-price">
						<view class="product-price-txt">
							<!-- vue 过滤器格式 {{值 | 过滤器}} -->
							{{item.price | formatPrice}}
						</view>
						<view class="product-sales">
							已售{{item.sales || 0}}
						</view>
					</view>
					<view class="product-ot-price">
						<view class="product-ot-price-txt">
							{{item.ot_price | formatPrice}}
						</view>
						<view class="shopping-cart">
							<!--这里的点击会冒泡到上一层的click事件，所以不能用@click，需要用@tap.stop -->
							<u-icon name="shopping-cart-fill" color="#dd6161" size="40" @tap.stop="clickShoppingCart(item._id)"></u-icon>
						</view>
					</view>
				</view>
			</view>			
			<u-loadmore :status="productLoadStatus" bg-color="$u-light-color" @loadmore="loadProduct"/>
		</view>
	</view>
</template>


<script>
	import {addCart} from '@/utils'
	export default {
		data() {
			// 页面数据变量
			return {
				//定义页面上保存云函数查询返回的数据变量
				categorySkeletonloading:true,
				swipperList:[],
				//初始化8个骨架屏
				categoryList: Array(4).fill({}),
				productList:[],
				productPageIndex:1,
				productHasMore: true,
				productLoadStatus: 'loadmore'
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			vk = uni.vk;
			this.options = options;
			this.init(options);
		},
		onReachBottom() {
			this.loadProduct()
		},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options){
				// vk.reLaunch("/pages_template/uni-id/index/index");
				this.loadSwipper();
				this.loadCategory();
				this.loadProduct();
			},
			//获取轮播图
			async loadSwipper(){				
				const res = await this.api.getSwipperList({
						// 查询表单数据源，可在此设置默认值
						formData:{
							is_show:true
						},
						// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
						columns:[
							{ key:"is_show",  mode:"=" },
						]
					})
				this.swipperList = res.rows
			},			
			//获取分类
			async loadCategory(){				
				const res = await this.api.getCategroyList({
						// 查询表单数据源，可在此设置默认值
						formData:{
							is_home_show:true
						},
						// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
						columns:[
							{ key:"is_home_show",  mode:"=" },
						]
					})
				this.categoryList = res.rows
				//数据加载完成后隐藏骨架屏
				this.categorySkeletonloading  = false
			},
			
			//获取分类
			async loadProduct(){
				if(! this.productHasMore) {
					return
				}
				const res = await this.api.getProductList({
						// 查询表单数据源，可在此设置默认值
						formData:{
							is_hot:true,
							is_sale:true
						},
						// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
						columns:[
							{ key:"is_hot",  mode:"="},
							{ key:"is_sale",  mode:"="},
						],
						pageSize: 4,
						pageIndex: this.productPageIndex,
					})
				if(!res.hasMore) {
					this.productLoadStatus = 'nomore'
				}
				if(this.productPageIndex == 1) {
					this.productList = res.rows
				} else {
					this.productList = this.productList.concat(res.rows)
				}
				this.productHasMore = res.hasMore
				this.productPageIndex += 1
			},
			clickSwiper(index){
				this.pageTo('/pages/detail/detail?_id=' + this.swipperList[index].product_id)
			},
			clickCategory(categoryId){
				//跳转到tarbar的时候调用的是wx.switchTab: url 不支持query传递参数。可以先把参数存放在
				//store中，目标页面在store中获取
				vk.setVuex('$category.categoryId',categoryId)
				this.pageTo('/pages/category/category')
			},
			clickProduct(index) {
				this.pageTo('/pages/detail/detail?_id=' + index)
			},
			clickShoppingCart(productId) {
				addCart(productId,10)
				console.log(productId)
			},
		},
		// 监听器
		watch:{
			
		},
		// 计算属性
		computed:{
			
		}
	}
</script>
<style lang="scss" scoped>
	.search-wrap,
	.swiper-wrap,
	.category-wrap{
		margin-bottom: 20rpx;
	}
	.category-wrap{
		.grid-text{
			height: 32rpx;
			font-size: 28rpx;
			margin-top: 4rpx;
			color: $u-tips-color;
		}
	}
	.product-wrap{
		.product-title{
			display: flex;
			margin: 10px 0;
			align-items: center;
			.product-title-txt{
				color: $u-main-color;
				text-align: center;
				flex: 1;
				font-size: 36rpx;
			}
		}
		.product-list{
			//水平显示
			display: flex;
			//项目均匀分布在行中，周围空间相等
			justify-content: space-around;
			//主轴显示不下时，自动换行
			flex-wrap: wrap;
			.product-item{
				width: 48%;
				border-radius: 10rpx;
				margin: 5px 0;
				background-color: $u-primary-bg-color;
				padding: 8px;
				.product-name{
					width: 100%;
					font-size: 30rpx;
					margin-top: 5px;
					color: $u-main-color;					
				}
				.product-price{
					margin-top: 5px;
					display: flex;
					//沿着交叉轴方向，按照项目内的文字对齐
					align-items: baseline;
					justify-content: space-between;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					.product-price-txt{
						font-size: 36rpx;
						color: $u-primary-price-color;
					}
					.product-sales{
						margin-left: 10rpx;
						font-size: 30rpx;
						color: $u-tips-color;
						
					}
				}
				.product-ot-price{
					margin-top: 5px;
					display: flex;
					justify-content: space-between;
					.product-ot-price-txt{
						color: $u-light-color;
						text-decoration: line-through;
					}
				}
			}
		}
	}
</style>