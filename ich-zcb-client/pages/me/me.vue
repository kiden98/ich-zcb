<template>
	<view>
		me: {{userInfo._id}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//存储微信登陆后（loginByWeixin）返回的用户信息
				userInfo:{}
			}
		},
		onShow() {			
			//判断用户是否登陆
			let that = this;
			if (!vk.checkToken()) {
			  // token无效
			  //微信静默登陆
			  vk.userCenter.loginByWeixin({			   
			    success: (data) => {
			      // 成功后的逻辑
				  if(data.userInfo._id){
					  vk.toast("登陆成功");
					  that.UserInfo = data.userInfo;
				  }			  
			    }
			  });
			} else {
			  // token有效
			  that.userInfo = vk.getVuex('$user.userInfo');
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
