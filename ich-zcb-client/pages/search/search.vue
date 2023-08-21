<template>
	<view class="wrap">
		<view class="search-wrap">
			<u-search
				bg-color="#f3f4f6"
				:animation="false"
				shape="square"
				v-model="keyword"
				@search="handleSearch"
				@custom="handleSearch"
				@focus="handleFocus"
				>				
			</u-search>
		</view>
		<view class="history-wrap" v-if="!isSearched && keywordHistory.length > 0">
			<view class="history-head">
				<view class="history-title">
					最近搜索
				</view>
				<u-icon name="trash" size="40" @tap = "clearHistory"></u-icon>
			</view>
			<view class="history-content">
				<view class="history-item" v-for="(item,index) in keywordHistory" :key="index" @tap="clickHistory(item)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="product-wrap" v-if="isSearched">
			<view class="product-list">
				<view class="product-item" v-for="(item,index) in productList" :key="index">
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
								<u-icon name="shopping-cart-fill" color="#dd6161" size="40" ></u-icon>
							</view>
						</view>
					</view>
				</view>				
				<view class="empty-wrap" v-if="productList.length == 0">
					<u-empty text="没有找到相关商品" mode="data"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:"",
				productList:[],
				keywordHistory: vk.getStorageSync('keywordHistory') || [],
				isSearched:false,
			}
		},
		methods: {
			handleSearch(){
				//处理历史记录
				const keywordHistory = vk.getStorageSync('keywordHistory') || []
				const newKeywordHistory = [... keywordHistory,this.keyword]
				const keywordHistorySet = new Set(newKeywordHistory)
				this.keywordHistory = [... keywordHistorySet]
				vk.setStorageSync('keywordHistory',this.keywordHistory)
				//查询
				this.onSearch()
			},			
			async onSearch(){
				this.isSearched = true
				const res = await this.api.getProductList({
						// 查询表单数据源，可在此设置默认值
						formData:{
							name:this.keyword,
							is_sale:true
						},
						// 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
						columns:[
							{ key:"name",  mode:"%%"},
							{ key:"is_sale",  mode:"="},
						],
						pageSize: 200,
						pageIndex: 1
					})
					this.productList = res.rows
			},
			handleFocus(){
				this.isSearched=false
				this.productList = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-wrap{
		margin-bottom: 20rpx;
	}
	.history-wrap{
		.history-head{
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
			.history-title{
				color: $u-type-info-dark;
			}
		}
		.history-content{
			display: flex;
			flex-wrap: wrap;
			.history-item{
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				background-color: $u-type-info-light;
				padding: 10rpx;
				border-radius: 10rpx;
			}
		}
	}
	.product-wrap{
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
	}

</style>
