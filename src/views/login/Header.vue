<template>
	<header>
		<div @click="goBack()">
			<i class='iconfont icon-fanhui'></i>
		</div>
		<div>
			<slot>
				<span>登录</span>
			</slot>
		</div>
		<div @click="goHome">
			<i class="iconfont icon-zhuye"></i>
		</div>
	</header>
</template>

<script>
export default{
	methods:{
		goBack(){
			 this.$router.back()
		},
		goHome(){
			this.$router.push('/home')
		}
	}
}
</script>

<style scoped lang="less">
header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 1.173333rem;
	line-height: 2.6667rem;
	color:#fff;
	background-color: #b0352f;
	span{
		font-size:0.48rem;
	}
	i{
		padding:0 0.4rem;
		font-size:0.586666rem;
	}
}
</style>
