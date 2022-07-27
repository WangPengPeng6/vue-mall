<template>
  <div class="searchList">
    <div class="headers">
        <Header/>
        <ul>
            <li v-for="(item,index) in searchList.data" :key="index" @click="changeTab(index)">
                <div :class="index==searchList.currentIndex?'active':''"  class="list">{{item.name}}</div>
                <div class="search-arrow" v-if="index!=0">
                    <i  class="iconfont icon-arrow_up_fat" :class="item.status==1?'active':''"></i>
                    <i   class="iconfont icon-arrow_down_fat" :class="item.status==-1?'active':''"></i>
                </div>
            </li>
        </ul>
    </div>
    
    <section>
        <ul  v-if="goodsList.length">
            <li v-for="(item,index) in goodsList" :key="index">
                <img v-lazy="item.imgUrl" alt="">
                <h3>{{item.name}}</h3>
                <div class="price">
                    <div class="pic">
                        <span>￥</span>
                        <b>{{item.price}}</b>
                        <span class="pay">{{item.num}}付款</span>
                    </div>
                    <div class="btn">立即购买</div>
                </div>
            </li>
        </ul>
        <div v-else class="notGoods">暂无商品....</div>
    </section>
    <Tabber/>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabber from '@/components/common/Tabber.vue'
import requset from '@/api/requset'
export default {
name:'SearchList',
data() {
    return {
        goodsList:[],
        searchList:{
            currentIndex:0,
            data:[
                // status:0 都不亮
                // status:1 上箭头亮
                // status:-1 下箭头亮
               
                {name:'综合',key:'comprehensive'},
                {name:'价格',status:0,key:'price'},
                {name:'销量',status:0,key:'num'}
            ]
        }
    }
},
computed:{
    orderBy(){
        //知道当前是那个对象
        let obj=this.searchList.data[this.searchList.currentIndex]
        let val=obj.status=='1'?'asc':'desc';
        return{
            [obj.key]:val
        }
    }
},
components:{
    Header,
    Tabber
},
created() {
    this.getData()
},
methods:{
    getData(){
        requset.$axios({
            url:`/api/goods/shopList`,
            params:{
                searchName:this.$route.query.key,
                ...this.orderBy
            }
        }).then(res=>{
            this.goodsList=res
        })
    },
    changeTab(index){
        this.searchList.currentIndex=index
        let item =this.searchList.data[index]
        //循环让所有的status变为0
        this.searchList.data.forEach((v,i)=>{
            if(i!=index){
                v.status=0
            }
        })
        if(index==this.searchList.currentIndex){
            item.status=item.status=='1'?'-1':'1';
        }
        //发送请求进行排序
        this.getData()
    },
},
watch:{
    $route(){
        this.getData()
    }
}
}
</script>

<style lang="less" scoped>
.searchList{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .headers{
        display: flex;
        flex-direction: column;
        ul{
            display: flex;
            justify-content: space-around;
            font-size: .3733rem;
            li{
                padding: .1333rem;
                display: flex;
                align-items: center;
                .list{
                    font-weight: 600;
                    margin-right: .08rem;
                }
                .search-arrow{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    i{
                        color: #ccc;
                        font-size: .32rem;
                    }
                }
            }
        }
    }
    section{
        flex: 1; 
        background: #f5f5f5;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                width: 50%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0.26666rem;
                img{
                    widows: 4.5333rem;
                    height: 4.5333rem;
                }
                img[lazy=loading] {
                    width: 4.69333rem;
                    height: 4.6933rem;
                    background: #f7f7f7;
                }
                h3{
                    width: 100%;
                    font-size: 0.373333rem;
                    font-weight: 600;
                    color: #222;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .price{
                    width: 100%;
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
                        color: #fff;
                        background: #b0352f;
                        padding: .08rem .16rem;
                        border-radius: .16rem;
                    }
                }
            }
        }
        .notGoods{
            padding-top: .5333rem;
            text-align: center;
            color: #ccc;
        }
    }
}
.active{
    color: red !important;;
}
</style>