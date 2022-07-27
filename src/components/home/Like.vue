<template>
  <div class="like">
    <Card>
        <span>猜你喜欢</span>
    </Card>
    <ul>
        <li v-for="(item,index) in likeList" :key="index"  @click="goDetail(item._id)" >
            <h2>
                <img v-lazy="item.imgUrl" alt="">
            </h2>
            <h3>
                {{item.name}}
            </h3>
            <div class="price">
                    <div class="pic">
                        <span>￥</span>
                        <b>{{item.price}}</b>
                    </div>
                    <div class="btn">立即购买</div>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Card from '@/components/home/Card.vue'
export default {
name:'Like',
props:{
likeList:Array
},
data() {
    return {
        
    }
},
components:{
    Card
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
.like{
    // 手机浏览器访问，全屏模式不加
    // margin-bottom:3.2rem;
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            h2{
                img{
                    width: 4.69333rem;
                    height: 4.6933rem;
                }
                img[lazy=loading] {
                    width: 4.69333rem;
                    height: 4.6933rem;
                    background: #f7f7f7;
                }
            }
            h3{
                padding:0 .16rem;
                width: 93%;
                font-size: .4267rem;
                color:#222;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
            }
            .price{
                    width: 93%;
                    display: flex;
                    justify-content: space-between;
                    font-size: .3733rem;
                    padding: .2667rem 0;
                    .pic{
                        display: flex;
                        align-items: flex-end;
                        color: #b0352f;
                        span{
                            font-size: .4267rem;
                        }
                        b{
                            font-size: .48rem;
                        }
                        .pay{
                            border-radius: .16rem;
                            color: #999;
                            margin: 0 .1333rem;
                            font-size: .2133rem;
                        }
                    }
                    .btn{
                        margin-right: .1333rem;
                        color: #fff;
                        background: #b0352f;
                        padding: .08rem .16rem;
                        border-radius: .16rem;
                    }
                }
        }
    }

}
</style>