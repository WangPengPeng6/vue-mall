<template>
	<div class='detail'>
		<header>
			<div class='header-returns' v-show='isShow'>
				<div @click='goBack'>
					<i class='iconfont icon-fanhui'></i>
				</div>
				<div @click="goHome">
					<i class='iconfont icon-zhuye'></i>
				</div>
			</div>
			
			<div 
				class='header-bar' 
				v-show='!isShow'
				:style='styleOption'
			>
				<div @click='goBack'>
					<i class='iconfont icon-fanhui'></i>
				</div>
				<div class="change">
					<span :class="sw==1?'active-bottom':''" class="span1" @click="sw=1">商品详情</span>
					<span :class="sw==2?'active-bottom':''" @click="sw=2">商品评价</span>
				</div>
				<div>
					<i class='iconfont icon-zhuye'></i>
				</div>
			</div>
		</header>
		<section ref='wrapper'>
			<div v-if="sw==1">
				<div class='swiper-main'>
					<swiper :options="swiperOption">
					  <swiper-slide 
						v-for='(item,index) in swiperList' 
						:key='index'
					   >
						<img :src="item.imgUrl" alt="">
					  </swiper-slide>
					</swiper>
					<div class="swiper-pagination"></div> 
				</div>
				<div class='goods-name'>
					<h1>{{goods.name}}</h1>
					<div>性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
				</div>
				<div class='goods-price'>
					<div class='oprice'>
						<span>¥</span>
						<b>{{goods.price}}</b>
					</div>
					<div class='pprice'>
						<span>价格:</span>
						<del>¥{{goods.price}}</del>
					</div>
				</div>
				<div class="ensure">
					<div class="give">
						<b>鱼币</b> <span>买就送34鱼币</span>
					</div>
					<div class="ens">
						<div>
							<b>服务</b> <span><i class="iconfont icon-huaban24 duihao" ></i>132132</span>
						</div>
						<div><i class="iconfont icon-jinrujiantou jinru"></i></div>
					</div>
				</div>
				<div class="goodsinfo">
					<h3>商品详情</h3>
					<img v-for="(item,index) in goods.details" :key="index" :src="item"  alt="">
					<img :src="goods.imgUrl" alt="">
				</div>
			</div>
			<div v-if="sw==2">
				我是评价
			</div>
		</section>
		<footer>
			<div class="left">
				<div class="kefu">
					<i class="iconfont icon-kefu i1"></i>
					<span>客服</span>
				</div>
				<div class="card">
					<i class="iconfont icon-31gouwuche i2"></i>
					<span>购物车</span>
				</div>
				<div class="collect">
					<i class="iconfont icon-shoucang i3 "></i>
					<span>收藏</span>
				</div>
			</div>
			<div class="right">
				<div class='add-cart' @click="addCart">加入购物车</div>
				<div class="buy">立即购买</div>
			</div>
		</footer>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BetterScroll from 'better-scroll'
import request from '@/api/requset'
import { Toast } from 'mint-ui';
export default{
	name:'Detail',
	data(){
	  return{
			sw:1,
			id:0,
			goods:{},
			detailsList:{},
			styleOption:{},
			BetterScroll:'',
		    isShow:true,
			swiperOption: {
				autoplay: {delay: 2000},
				speed: 1000,
				pagination: {
					el: '.swiper-pagination',
					type:'fraction'
				}
			},
			swiperList:[
				{
					imgUrl:'./images/goods1.jpg'
				},
				{
					imgUrl:'./images/goods2.jpg'
				},
				{
					imgUrl:'./images/goods3.jpg'
				}
			]
	  }
	},
	components: {
	  swiper,
	  swiperSlide
	},
	created(){
		
		this.id= this.$route.query.id;
		
		this.getData();
	},
	mounted(){
		this.sw=1,

		this.BetterScroll = new BetterScroll(this.$refs.wrapper, {
			probeType: 3,
			bounce: false,
			click:true,
		})
		this.BetterScroll.on('scroll',(pos)=>{
			let posY = Math.abs( pos.y );
			let opacity = posY / 180;
			
			opacity = opacity > 1 ? 1 : opacity;
			
			this.styleOption = {
				opacity:opacity
			}
				
			if( posY >= 50 ){
				this.isShow = false;
			}else{
				this.isShow = true;
			}
		})
	},
	activated(){
		
		//判断当前url , id和之前id是否一致
		if(  this.$route.query.id != this.id ){
			this.getData();
			this.id = this.$route.query.id;
		}
		
	},
	methods:{
		async getData(){
			let id = this.$route.query.id;
			let res = await request.$axios({
				url:'/api/goods/id',
				params:{
					id
				}
			})
			this.goods = res;
			this.detailsList=res.details;
		},
		//返回上一页
		goBack(){
			this.$router.back();
		},
		goHome(){
			this.$router.push('/home')
		},
		//加入购物车
		addCart(){
			let id=this.$route.query.id
				request.$axios({
				url:'/api/addCart',
				method:"post",
				data:{
					goodsId:id
				},
				headers:{
					token:true,  //true代表验证，false代表不验证
				}
				}).then(res=>{
					console.log(res);
					if(!res.success){
						//未登录状态
						Toast(res.msg);
					}else{
						//登录状态
						//提示信息
						Toast(res.msg);
					}
				})
		}	
	}
}
</script>

<style scoped lang="less">
.detail{
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
header{
	position:fixed;
	left:0;
	top:0;
	z-index: 999;
	width: 100%;
	height: 1.173333rem;
	.header-returns{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 1.173333rem;
		div{
			margin:0 0.266666rem;
			width: 0.933333rem;
			display: flex;
			justify-content: center;
			align-items: center;
			height: .9333rem;
			text-align: center;
			background-color: rgba(0,0,0,0.3);
			border-radius: 50%;
		}
		i{
			font-size:0.693333rem;
			color:#fff;
		}
	}
	.header-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 1.173333rem;
		font-size:0.426666rem;
		background-color: #fff;
		.change{
			display: flex;
			justify-content: space-between;
			width: 4.2667rem;
			span{
			padding:.1333rem 0;
			}
		}
		
		i{
			padding:0 0.266666rem;
			font-size:0.586666rem;
		}
	}
}
section{
	flex:1;
	overflow: hidden;
}
.swiper-main{
	position: relative;
	width: 100%;
	height:10rem;
	overflow: hidden;
}
.swiper-container{
	width: 100%;
	height: 10rem;
}
.swiper-container img{
	width: 100%;
	height: 10rem;
}
.swiper-pagination{
	bottom:0.266666rem;
	width: 100%;
	text-align: right;
	color:#FFFFFF;
	font-size:0.426666rem;
}
.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
	left:-0.533333rem;
}
.goods-name{
	padding:0.533333rem 0.266666rem;
	border-bottom:1px solid #CCCCCC;
	h1{
		font-size:0.533333rem;
		font-weight: 500;
	}
	div{
		padding:0.08rem 0;
		font-size:0.373333rem;
		color: #999999;
	}
}
.goods-price{
	padding:0.533333rem 0.266666rem;
	border-bottom: 20px solid #fcfcfc;
	.oprice{
		color:red;
		span{
			font-size:0.32rem;
		}
	}
	.pprice{
		color:#999999;
		font-size:0.373333rem;
	}
}
.ensure{
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: .4267rem;
	.give,.ens{
		width: 100%;
		display: flex;
		align-items: center;
		height: 1rem;
		border-bottom: 1px solid #cccc;
		b{
			margin-right: .1333rem;
		}
	}
	.ens{
		display:flex;
		justify-content: space-between;
		border-bottom: 20px solid #fcfcfc;
		.duihao{
			color: red;
		}
		.jinru{
			margin-right: .1333rem;
		}
	}
}
.goodsinfo{
display: flex;
flex-direction: column;
width: 100%;
img{
	width: 100%;
	height: 10.6667rem;
}
}
footer{
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	height: 1.306666rem;
	border-top:1px solid #cccccc;
	background-color: #fff;
	.left{
		width: 40%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .32rem;
		.kefu{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.3%;
			height: 100%;
			i{
			display: flex;
			justify-content: center;
			align-items: center;
			
			}
			.i1{
				font-size: .667rem;
			}
		}
		.card{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.3%;
			height: 100%;
			.i2{
				font-size: .6667rem;
			}
		}
		.collect{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 33.3%;
			height: 100%;
			.i3{
				font-size: .6667rem;
			}
		}
	}
	.right{
		height: 100%;
		width: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		div{
		width: 50%;
		line-height: 1.306666rem;
		font-size: 0.426666rem;
		text-align: center;
		color:#fff;
		background-color: red;
		&.add-cart{
			background-color: #FF9500;
		}
	}
	}
}
.active-bottom{
		border-bottom: 2px solid red !important;
	}
</style>
