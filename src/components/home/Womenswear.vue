<template>
  <div class="womenswear">
    <ul>
      <li v-for="(item,index) in womenswearList" :key="index" >
        <img  :src="item.imgUrl" alt="" />
      </li>
    </ul>

  </div>
</template>

<script>
export default {
name:'Womenswear',
props:{
  womenswearList:Array
},
methods:{

}
}
</script>
<style lang="less" scoped>
.womenswear{
    width: 100%;
    img{
         width: 100%;
        height: 3.6rem;
    }
}
</style>