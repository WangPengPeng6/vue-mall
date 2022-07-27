<template>
  <div class="header">
    <h1>
        <img src="@/assets/images/logo1.png" alt="" >
    </h1>
    <div class="search" @click="goSearch">
        <i class="iconfont icon-sousuo"></i>
        <span>搜您喜欢的...</span>
    </div>
    <div class="kefu">
        <i class="iconfont icon-kefu"></i>
    </div>
  </div>
</template>

<script>
export default {
name:"Header",
methods:{
    goSearch(){
      this.$router.push('/search')
    },
}
}
</script>
<style lang="less" scoped>
.header{
    background: #b0352f;
    display: flex;
    align-items: center;
    width:100%;
    height: 1.3867rem;
    h1{
        display: flex;
        width:4rem;
        height:1.3333rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .search{
        display: flex;
        align-items: center;
        width: 5rem;
        height: .8rem;
        background: #FFF;
        border-radius: .32rem;
        i{
            font-size: .5333rem;
            padding-left: .1333rem;
            color: #999;
        }
        span{
            font-size: .3733rem;
            color: #999;
        }
    }
    .kefu{
        i{
            font-size:.8rem;
            color: #fff;
            padding: 0 .1333rem;
            line-height: 2.6667rem;
        }
    }
}
</style>