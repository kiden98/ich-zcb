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
			<!-- 使用自定义的组件，父组件向子组件传递属性值 -->
			<ProductList :productList = "productList"></ProductList>
		</view>
	</view>
</template>

<script>
	// import {addCart} from '@/utils'
	//引入自定义组件
	import ProductList from '@/components/product-list/product-list.vue'
	export default {
		//注册组件，否则不显示
		components:{
			ProductList
		},
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
			},
			clearHistory(){
				this.keywordHistory = []
				vk.setStorageSync('keywordHistory',this.keywordHistory)
			},
			clickHistory(item){
				this.keyword = item
				this.onSearch()
			},
			
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
	

</style>
