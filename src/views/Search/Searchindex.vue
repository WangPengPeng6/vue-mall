<template>
  <div class="search">
    <Header />
    <section>
        <div class="search-history" v-if="searchArr.length">
          <h2>
            <i class="iconfont icon-shijian"></i>
            <span>历史搜索</span>
            <span class="empty" @click="deleteStorage">清空历史记录</span>
          </h2>
          <ul>
            <li v-for="(item,index) in searchArr" :key="index" @click="goSearchList(item)" >{{item}}</li>
          </ul>
        </div>
        <div class="no-history" v-else >暂无搜索记录...</div>
        <div>
            <h1>推荐商品</h1>
            <Like/>
        </div>
    </section>
    <Tabber/>
  </div>
</template>

<script>
import Header from '@/components/search/Header.vue'
import Tabber from '@/components/common/Tabber.vue'
import Like from '@/components/home/Like.vue'
import { MessageBox } from 'mint-ui'
export default {
  name:'Search',
  data() {
    return {
      searchArr:[]
    }
  },
  components: { 
    Tabber,
    Header,
    Like
},
created(){
  //JSON.parse将字符串转化为数组
  this.searchArr=JSON.parse(localStorage.getItem('searchList'))||[]
},
  methods:{
    deleteStorage(){
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      }).then(res=>{
        if(res=='confirm'){
          localStorage.removeItem('searchList')
          this.searchArr=[]
        }
      })
    },
    goSearchList(item){
     this.$router.push({
            name:'SearchList',
            query:{
                key:item
            }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    section{
        flex: 1; 
        background: #f5f5f5;
        .search-history{
          h2{
            padding: .2667rem;
            font-size: .48rem;
            font-weight: 700;
            position: relative;
            i{
              color: #cb2017;
              margin-right: .1333rem;
            }
            .empty{
              position: absolute;
              right: .2667rem;
            }
          }
          ul{
             display: flex;
             flex-wrap: wrap;
             padding:.2667rem;
             li{
              margin: .1333rem .2667rem;
              padding:0.08rem 0.16rem;
              font-size: .3733rem;
              border: 1px solid #ccc;
             }
          }
          
        }
        .no-history{
          padding: .2133rem 0;
          text-align: center;
          font-size: .4267rem;
          color: #9999;
        }
    }
}
</style>