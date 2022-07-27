<template>
  <div class='order container'>
        <header>
            <i class='iconfont icon-fanhui' @click='$router.back()'></i>
            <span>提交订单</span>
            <i class='iconfont icon-zhuye'></i>
        </header>
        <section>
            <div class='path'>
                <h3 class='path-title'>收货信息</h3>
                <div class='path-content' @click="goPath">
                   <div>
                       <span>{{path.name}}</span>
                       <span>{{path.tel}}</span>
                   </div>
                   <div>
                       <span>{{path.province}}</span>
                       <span>{{path.city}}</span>
                       <span>{{path.county}}</span>
                       <span>{{path.addressDetail}}</span>
                   </div>
                </div>
            </div>
            <div class='payment'>
                <div class='payment-title'>支付方式：</div>
                <van-radio-group v-model="radioPayment">
                  <van-radio name="wx">微信支付</van-radio>
                  <van-radio name="ali">支付宝支付</van-radio>
                </van-radio-group>
            </div>
            <div class='goods'>
                <ul>
                    <li
                        v-for='(item,index) in goodsList'
                        :key='index'
                    >
                        <div>
                            <img :src="item.goods_imgUrl" alt="">
                        </div>
                        <div class='goods-content'>
                            <h4>{{item.goods_name}}</h4>
                            <div class='goods-total'>
                                <span>¥{{item.goods_price}}</span>
                                <span>x{{item.goods_num}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <footer>
            <div class='order-total'>
                <span>共</span>
                <b>{{total.num}}</b>
                <span>件,</span>
                <span>总金额：</span>
                <em>¥{{total.price}}</em>
            </div>
            <div class='order-topay' @click="goPayment">
                提交订单
            </div>
        </footer>
    </div>
</template>

<script>
import request from '@/api/requset'
import {mapState,mapGetters,mapMutations} from 'vuex'
import { Toast } from 'mint-ui';
import bus from '@/components/common/bus'
import qs from 'qs'
export default {
     data () {
        return {
            radioPayment:'wx',
            path:{},
            item:[],
            total:{
                price:0,
                num:0
            }
        }
    },
    computed:{
        ...mapState({
            order_id:state=>state.order.order_id,
            selectList:state=>state.cart.selectList
        }),
        ...mapGetters(['defaultPath']),
        
    },
    created() {
         this.goodsList=JSON.parse( this.$route.query.goodsList )
        this.selectAddress()
        
    },
    //运用activated声明周期解决，函数外拿不到值的问题
    activated(){
        bus.$on('selectPath',function(data){
            this.path=JSON.parse(data)
        }.bind(this))
        //选中的商品id号
        this.item = JSON.parse( this.$route.query.detail )
        this.goodsList=JSON.parse( this.$route.query.goodsList )
        this.selectOrder()
    },
    methods:{
        ...mapMutations(['INIT_DATA','INIT_ORDER']),
        //查询地址
        selectAddress(){
            //查询地址
            request.$axios({
				url:'/api/selectAddress',
                method:'post',
				headers:{
                    token:true
                }
			}).then(res=>{
                this.INIT_DATA(res.data)
                //有默认收货地址
                if( this.defaultPath.length ){
                    this.path = this.defaultPath[0];
                }else{
                    this.path = res.data[0];
                }
            })
        },
        //查询订单
        selectOrder(){
            request.$axios({
				url:'/api/selectOrder',
                method:'post',
				headers:{
                    token:true
                },
                data:{
                    order_id:this.order_id
                }
			}).then(res=>{
                this.INIT_ORDER(res.data)
                this.total.price=res.data.goods_price
                this.total.num=res.data.goods_num
            })
        },
        //选择收货地址
        goPath(){
            this.$router.push({
                path:'/path',
                query:{
                    type:'select'
                }
            })
        },
        //提交订单
        goPayment(){
            if( !this.path){
                return Toast('请选择收货地址')
            }else{
                request.$axios({
                    url:'/api/submitOrder',
                    method:'post',
                    headers:{
                        token:true,
                    },
                    data:{
                        order_id:this.order_id,
                        shopArr:this.selectList
                    }
			    }).then(res=>{
                    let Arr=[]
                    this.goodsList.forEach(v => {
                        Arr.push(v.goods_name)                 
                    });
                    //支付传递的参数
                    let dataOrder={
                        order_id:this.order_id,
                        name:Arr.join(''),
                        price:this.total.price
                    }
                        if(res.success){
                            //去支付
                            request.$axios({
                            url:'/api/payment',
                            method:'post',
                            headers:{
                                token:true,
                                'Content-Type': 'application/x-www-form-urlencoded' 
                            },
                            //qs为了增加安全性的序列化
                            data:qs.stringify(dataOrder)
                        }).then(res=>{
                            if( res.success ){
                            //打开支付宝支付的页面
                            window.location.href = res.paymentUrl;
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    color:#fff;
    background-color: #b0352f;
    i{
        padding:0 0.4rem;
        font-size:0.586666rem;
    }
    span{
        font-weight:300;
        font-size:0.48rem;
    }
}
section{
    background-color: #f7f7f7;
    .path-title{
        padding: 0.4rem;
        font-size:0.48rem;
    }
    .path-content{
        padding:0.16rem 0.4rem;
        font-size:0.373333rem;
        background-color: #FFFFFF;
        span{
            padding-right:0.16rem;
        }
    }
    .payment{
        padding:0.16rem 0.4rem;
        margin-top:0.4rem;
        font-size:0.426666rem;
        background-color: #FFFFFF;
        .van-radio-group{
            display: flex;
            padding:0.16rem 0;
            .van-radio{
                padding-right:0.266666rem;
            }
        }
    }
    .goods{
       
        margin-top:0.4rem;
        font-size:0.426666rem;
        background-color: #FFFFFF;
        ul{
            width: 100%;
            li{
                 display: flex;
                 width: 100%;
                 border-bottom: .0533rem solid #ccc;
                img{
                    width: 1.973333rem;
                    height: 1.973333rem;
                }
                .goods-content{
                    flex:1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-left:0.4rem;
                    h4{
                        margin-top: .2133rem;
                    }
                    .goods-total{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
        
    }
}
footer{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.6rem;
    border-top:1px solid #ccc;
    .order-total{
        font-size:0.426666rem;
        span{
            padding:0 0.16rem;
        }
        b{
            color:#b0352f;
        }
        em{
            font-size:0.48rem;
            color:#b0352f;
            font-style:normal
        }
    }
    .order-topay{
        width: 3.2rem;
        line-height: 1.6rem;
        color:#fff;
        font-size:0.426666rem;
        text-align: center;
        background-color: #b0352f;
    }
   
}
</style>