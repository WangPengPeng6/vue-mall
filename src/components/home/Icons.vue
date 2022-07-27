<template>
  <ul class="icons">
    <li v-for="(item,index) in iconsList" :key="index">
        <img :src="item.imgUrl" alt="">
        <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
name:'Icons',
props:{
    iconsList:Array
},
data() {
    return {
    }
},
}
</script>

<style lang="less" scoped>
.icons{
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding:.5333rem 0;
    li{
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
            width: 1.0667rem;
            height: 1.0667rem;
        }
        span{
            font-size: 0.426666rem;
            padding: .1333rem 0;
        }
    }
}
</style>