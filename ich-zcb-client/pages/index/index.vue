<template>
	<view class="wrap">
		<view class="search-wrap">
			<u-search shape="square" bg-color="#f3f4f6" :show-action="false" :disabled="true" @click="pageTo('/pages/search/search')"></u-search>	
		</view>
		<view class="swiper-wrap">
			<u-swiper :list="swipperList" @click="clickSwiper()"></u-swiper>	
		</view>
		<view class="category-wrap">
			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(category,index) in categoryList" :key="index">
					<u-image :src="category.image" width="150" height="150"></u-image>
					<view class="grid-text">{{category.name}}</view>
				</u-grid-item>
			</u-grid>
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
				<view class="product-item" v-for="(item,index) in productList" :key="index">
					<u-lazy-load threshold="300" border-radius="10" :image="item.image" :index="index"></u-lazy-load>
					<view class="product-name">
						{{item.name ||""}}
					</view>
					<view class="product-price">
						<view class="product-price-txt">
							{{item.price || 0}}
						</view>
						<view class="product-sales">
							已售{{item.sales || 0}}
						</view>
					</view>
					<view class="product-ot-price">
						<view class="product-ot-price-txt">
							{{item.ot_price || 0}}
						</view>
						<view class="shopping-cart">
							<u-icon name="shopping-cart-fill" color="#dd6161" size="40"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script>
	var vk = uni.vk;
	export default {
		data() {
			// 页面数据变量
			return {
				//定义页面上保存云函数查询返回的数据变量
				swipperList:[],
				categoryList:[],
				productList:[],
				
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
			},
			
			//获取分类
			async loadProduct(){				
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
						]
					})
				this.productList = res.rows
			},
			clickSwiper(index){
				this.pageTo('/pages/detail/detail?_id=' + this.swipperList[index].product_id)
			},
			pageTo(path){
				vk.navigateTo(path);
			}
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
	
	
</style>