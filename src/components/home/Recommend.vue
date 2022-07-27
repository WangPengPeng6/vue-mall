<template>
  <div class="recommend">
    <!-- 插槽  修改格式<Card>><span>123</span></Card>-->
    <Card></Card>
    <ul>
        <li v-for="(item,index) in recommendList" :key="index"  @click="goDetail(item._id)">
        <h2>
            <img :src="item.imgUrl" alt="">
        </h2>
        <div class="item">
            <h3>{{item.name}}</h3>
            <p>{{item.content}}</p>
            <div class="price">
                    <div class="pic">
                        <span>￥</span>
                        <b>{{item.price}}</b>
                    </div>
                    <div class="btn">立即购买</div>
            </div>
        </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card.vue'
export default {
name:"Recommed",
props:{
    recommendList:Array
},
data() {
    return {
       
    }
},
components:{
    Card
},
created(){
            
},
methods:{
    goDetail(id){
       this.$router.push({
			path:'/detail',
            query:{
                id
            }
		})
    }
}
}
</script>

<style lang="less" scoped>
.recommend{
    ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: .5333rem;
        li{
            width: 9.6rem;
            height: 3.84rem;
            border-radius: 0.32rem;
            margin-bottom: .2667rem;
            background: #f5f6fa;
            position: relative;
            display: flex;
            h2{
                text-align: center;
            }
            img{
                width:3.84rem;
                height: 3.84rem;
            }
            .item{
                position: absolute;
                right: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                padding: .5333rem;
                h3{
                    font-size: .3733rem;
                }
                p{
                    font-size: .32rem;
                }
                // .price{
                //     color:#b0352f;
                //     text-align: right;
                //     margin-top:.5333rem;
                //     span{
                //         font-size: .32rem;
                //     }
                // }
                .price{
                    margin-top:.4267rem;
                    text-align: center;
                    width: 93%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: space-between;
                    font-size: .3733rem;
                    padding: .2667rem 0;
                    .pic{
                        display: flex;
                        align-items: flex-end;
                        color: #b0352f;
                        span{
                            font-size: .32rem;
                        }
                        b{
                            font-size: .5333rem;
                        }
                        .pay{
                            border-radius: .16rem;
                            color: #999;
                            margin: 0 .1333rem;
                            font-size: .2133rem;
                        }
                    }
                    .btn{
                        width:50%;
                        margin-top: .1333rem;
                        color: #fff;
                        background: #b0352f;
                        padding: .08rem .16rem;
                        border-radius: .16rem;
                    }
                }
            }
        }
    }
}
</style>