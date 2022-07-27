<template>
    <header>
        <div class="header-return" @click="goBack">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="search-main">
            <i class="iconfont icon-sousuo"></i>
            <form action="" onsubmit="return false" @keyup.enter="goSearchList">
                <input type="search" placeholder="搜索你喜欢的商品..." v-model="searchInputValue" autofocus ref="myInput">
            </form>
        </div>
        <div class="search-btn" @click="goSearchList">搜索</div>
    </header>
</template>

<script>
export default {
name:'Header',
data() {
    return {
        //拿到传过去的值或者为空
        searchInputValue:this.$route.query.key||'',
        searchArr:[]
    }
},
mounted(){
    //键盘监听事件
    window.addEventListener('touchmove',this.myTouchMove,true)
},
methods:{
    //失去焦点
    myTouchMove(){
        this.$refs.myInput.blur()
    },
    goBack(){
        this.$router.back()
    },
    goSearchList(){
        if(!this.searchInputValue) return;

        if(!localStorage.getItem('searchList')){
            localStorage.setItem('searchList','[]')
        }else{
            this.searchArr=JSON.parse(localStorage.getItem('searchList'))
        }
        //先给数组添加数据
        this.searchArr.unshift(this.searchInputValue)
        //ES6去重
        let newArr=new Set(this.searchArr)
        //将newArr转换为真正的数组 再给本地存储添加 转换为真正的数组Array.from
        localStorage.setItem('searchList',JSON.stringify(Array.from(newArr)))
        //判断跳转的是不是同一个一面
        if(this.searchInputValue===this.$route.query.key) return;
        this.$router.push({
            name:'SearchList',
            query:{
                key:this.searchInputValue
            }
        })
    }
}
}
</script>

<style lang="less" scoped>
header{
    font-size: .32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #b0352f;
    color: #fff;
    width: 100%;
    height: 1.3333rem;
    .header-return i{
        font-size: .7467rem;
        padding:.2667rem;
        
        line-height: 2.6667rem;
    
    }
    .search-main{
        background: #FFF;
        border-radius: .32rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0.8rem;
        width: 7.4667rem;
        i{
            padding: 0 6px;
            font-size: .48rem;
            color:black;
        }
        form{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            input{
                width: 100%;
                color: black;
            }
        }
    }
    .search-btn{
        padding: 0 .1333rem;
        font-size: .4267rem;
    }
}
</style>