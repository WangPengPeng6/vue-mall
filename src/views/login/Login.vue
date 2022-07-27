<template>
	<div class='login container'>
		<Header></Header>
		<section>
			<div class='login-tel'>
				<input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*">
			</div>
			<div class='login-code'>
				<input type="text" v-model="userCode" placeholder="请输入短信验证码" pattern="[0-9]*">
				<button @click="sendCode" :disabled="disabled">{{codeMsg}}</button>
			</div>
			<div class='login-btn'  @click="login">登 录</div>
			<div class='tab'>
				<span @click='goUserLogin'>密码登录</span>
				<span @click="goRegister">快速注册</span>
			</div>
		</section>
		<Tabber></Tabber>
	</div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import Header from "./Header.vue";
import { Toast } from 'mint-ui';
import request from '@/api/requset'
import { mapMutations } from 'vuex';
export default{
	components:{
		Header,
		Tabber
	},
	data() {
		return {
			userTel:'',
			userCode:'',
			disabled:false,
			codeNum:6,
			codeMsg:'获取短信验证码',
			code:'',
			//验证规则
			rules:{
				//手机号验证
				userTel:{
					rule:/^1[23456789]\d{9}$/,
					msg:'手机号不能为空，并且是11位数字'
				}
			}
		}
	},
	methods:{
		...mapMutations(['USER_LOGIN']),
		//获取验证码
		sendCode(){
			//前端验证
			if( !this.validate('userTel') ) return;
			//请求验证码接口
			//发送请求，后端验证
			request.$axios({
				url:'/api/code',
				method:'POST',
				data:{
					phone:this.userTel
				}
			}).then(res=>{
				if(res.success){
					this.code=res.data
				}
				
			})
			//禁用按钮
			this.disabled=true
			//倒计时
			let timer=setInterval(()=>{
				--this.codeNum
				this.codeMsg=`重新发送${this.codeNum}`
			},1000)
			//判断什么时候停止
			setTimeout(()=>{
				clearInterval(timer)
				this.codeNum=6
				this.disabled=false
				this.codeMsg='获取短信验证码'
			},6000)
		},
		goUserLogin(){
			this.$router.push('/userLogin');
		},
		//验证信息提示
		validate( key ){
			let bool = true;
			if( !this.rules[key].rule.test( this[key])  ){
				//提示信息
				Toast(this.rules[key].msg);
				bool = false;
				return false;
			}
			return bool;
		},
		//点击登录
		login(){
			if(this.code==this.userCode){
			//发送请求，后端验证
			request.$axios({
				url:'/api/addUser',
				method:'POST',
				data:{
					phone:this.userTel
				}
			}).then(res=>{
				if( !res.success ) return;
				// //登录成功 ==>>跳转页面，存储用户信息
				this.USER_LOGIN(res.data) //存储到vuex
				this.$router.push('/main')
			})
			}
		},
		//注册
		goRegister(){
			this.$router.push('/register')
		}	
	}
}
</script>

<style scoped lang='less'>
section{
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color:#f5f5f5;
	font-size: .32rem;
	div{
		width: 8.933333rem;
		height: 1.173333rem;
		margin: 0.266666rem 0;
	}
	input{
		box-sizing: border-box;
		padding:0 0.266666rem;
		line-height: 1.173333rem;
		background-color: #FFFFFF;
		border:1px solid #ccc;
		border-radius: 6px;
	}
	.login-tel{
		margin-top:0.8rem;
		input{
			width: 8.933333rem;
		}
	}
	.login-code{
		display: flex;
		input{
			flex:1;
		}
		button{
			width: 3.6rem;
			padding:0 0.533333rem;
			line-height: 1.173333rem;
			color:#fff;
			background-color: #b0352f;
			border:0;
			border-radius: 6px;
		}
	}
	.login-btn{
		line-height: 44px;
		color:#fff;
		text-align: center;
		background-color: #b0352f;
		border-radius: 6px;
		font-size: 0.48rem;;
	}
	.tab{
		display: flex;
		justify-content: space-between;
		font-size:0.373333rem;
	}
}
</style>
