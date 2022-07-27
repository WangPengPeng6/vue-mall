<template>
	<div class='cart container'>
        <header>
            <div @click="goBack">
                <i class="iconfont icon-fanhui"></i>
            </div>
            <span>购物车</span>
            <span @click="isNavBar" v-text="isNavStatus ? '完成':'编辑'"></span>
        </header>
        <section v-if="list.length">
                    <div class='cart-title'>
                        <van-checkbox @click="checkALLFn" :value="isCheckedAll"></van-checkbox>
                        <span>商品</span>
                    </div>
            <div ref="wrapper" class="wrapper">
                
                    <ul class="content">
                        <li v-for="(item,index) in list" :key="index">
                            <div class='check'>
                                <van-checkbox @click="ITEM_CHECK(index)" v-model="item.checked"></van-checkbox>
                            </div>
                            <h2>
                                <img :src="item.goods_imgUrl" alt="">
                            </h2>
                            <div class='goods'>
                                <div class='goods-title'>
                                    <span>{{item.goods_name}}</span>
                                    <i class='iconfont icon-JC_040 delete' @click="delGoodsFn(item._id)"></i>
                                </div>
                                <div class='goods-price'>¥{{item.goods_price}}</div>
                                <van-stepper @change="changeNum($event,item)" v-model="item.goods_num" integer />
                            </div>
                        </li>
                    </ul>
                
            </div>
        </section>
        <section v-else>
            <div ref="wrapper" class="wrapper">
                <div>
                暂无数据~~~
                <router-link to='/home'>去首页逛逛吧</router-link>
                </div>
            </div>
        </section>
        <footer v-if="list.length">
            <div class='radio'>
                <van-checkbox @click="checkALLFn" :value="isCheckedAll"></van-checkbox>
            </div>
            <div class='total' v-show="!isNavStatus">
                <div>
                    共有
                    <span class='total-active'>{{total.num}}</span>
                    件商品
                </div>
                <div>
                    <span>总计：</span>
                    <span class='total-active'>¥{{total.price.toFixed(2)}} + 0鱼币</span>
                </div>
            </div>
            <div class='order' v-if="isNavStatus" @click="delGoodsFn">删除</div>
            <div class='order' @click="goOrder" v-else>去结算</div>
        </footer>
	</div>
</template>

<script>
import request from '@/api/requset'
//引入插件
import BetterScroll from 'better-scroll'
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { Toast } from 'mint-ui';
export default {
    name: "Cart",
    data () {
        return {
            isNavStatus:false,
            checked:true
        }
    },
    created(){
        this.getData()
    },
    computed:{
        ...mapState({
            list:state=>state.cart.list,
            selectList:state=>state.cart.selectList
        }),
        ...mapGetters(['isCheckedAll','total']),
        goodsList(){
            return this.selectList.map(id=>{
                return this.list.find(v=>v._id == id);
            })
        }
    },
    methods:{
        ...mapMutations(['CART_LIST','ITEM_CHECK','INIT_ORDER']),
        ...mapActions(['checkALLFn','delGoodsFn']),
        goBack(){
        this.$router.back()
        },
        async  getData(){
                let res= await request.$axios({
                    url: '/api/selectCart',
                    method:'post',
                    headers:{
                        token:true
                    }
                });
                if(res.success){
                    res.data.forEach(v=>{
                    v['checked']=true
                    })
                    this.CART_LIST(res.data)

                    //当所有DOM节点加载完毕后执行 $nextTick
                    this.$nextTick(()=>{
                        new BetterScroll(this.$refs.wrapper, {
                        movable: true,
                        zoom: true,
                        click:true,
                        })
                    })
                }else{
                    //未登录状态
						Toast('请先登录');
                }
        },
        //点击编辑||完成
        isNavBar(){
            this.isNavStatus=!this.isNavStatus
        },
        //修改数量
        changeNum(value,item){
            //当前购物车商品id 及数量
            //value 是数量 item._id 是商品id
            request.$axios({
                    url: '/api/updateNum',
                    method:'post',
                    headers:{
                        token:true
                    },
                    data:{
                        id:item._id,
                        num:value
                    }
                }).then(res=>{
                    console.log(res);
                })
        },
        //去结算
        goOrder(){
            if(this.selectList.length){
                let newList=[]
                this.list.forEach(item=>{
                    this.selectList.filter(v=>{
                        if(v==item._id){
                            newList.push(item)
                        }
                    })
                })
                // 生成一个订单
                request.$axios({
                    url: '/api/addOrder',
                    method:'post',
                    headers:{
                        token:true
                    },
                    data:{
                        arr:newList
                    }
                }).then(res=>{
                    if(res.success) {
                        console.log(res);
                        //存储订单号 vuex
                        this.INIT_ORDER(res.data)
                        //进入提交页面
                        this.$router.push({
                            path:'/order', 
                            query:{
                                detail:JSON.stringify(this.selectList),
                                goodsList:JSON.stringify(this.goodsList)
                            }
                        })
                    }
                })
               
            }else{
                Toast('请至少选择一件商品！')
            }
        }
    }
};
</script>
<style scoped lang="less">
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    color:#fff;
    background-color: #b0352f;
    div{
        display: flex;
        height: 1.12rem;
        i{
        padding:0 0.4rem;
        font-size:0.586666rem;
        line-height: 1.12rem;
        }
    }
    span{
        padding:0 0.4rem;
        font-size:0.426666rem;
    }
}
section{
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;

    .cart-title{
        background: #f5f5f5;
        z-index: 3;
        display: flex;
        padding:0.533333rem;
        span{
            padding:0 0.4rem;
            font-weight: 500;
            font-size:0.48rem;
        }
    }
    .wrapper{
        flex: 1;
    //  height: 2.6667rem;
        ul{
        display: flex;
        flex-direction: column;
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0.16rem 0.533333rem;
            background-color: #fff;
            border-bottom:.0533rem solid #ccc;
            .check{
                padding-right:0.373333rem;
            }
            .goods{
                display: flex;
                flex-direction: column;
                padding-left: .4rem;
                font-size:0.32rem;
                margin-top: .08rem;
                flex: 1;
                .goods-title{
                    display: flex;
                    position: relative;
                    font-size: .4267rem;
                    i{
                        font-size:0.586666rem;
                    }
                    .delete{
                        position: absolute;
                        right: .1333rem;
                    }
                }
                .goods-price{
                    padding:0.08rem 0;
                    color:#b0352f;
                    font-size: .4rem;
                }
                ::v-deep .van-stepper{
                    text-align: right;
                }
            }
            img{
                width: 1.973333rem;
                height: 1.973333rem;
            }
        }
    }
    }
    
}
footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.6rem;
    border-top:0.053333rem solid #ccc;
    .radio{
        padding:0 0.4rem;
    }
    .total{
        flex:1;
        font-size:.4267rem;
        .total-active{
            color:#b0352f;
        }
    }
    .order{
        width: 3.2rem;
        line-height: 1.6rem;
        color:#fff;
        text-align: center;
        font-size: .5867rem;
        background-color: #b0352f;
    }
}
</style>