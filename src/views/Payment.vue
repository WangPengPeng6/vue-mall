<template>
  <div>
    <div v-if="payStatus">
    恭喜您！支付成功
    </div>
    <div v-else>
      支付失败
    </div>
  </div>
</template>

<script>
import request from '@/api/requset'
import qs from 'qs'
export default {
  data() {
    return {
      payStatus:false
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let data={
        out_trade_no:this.$route.query.out_trade_no,
        trade_no:this.$route.query.trade_no
      }
      
      request.$axios({
          url:'/api/successPayment',
          method:'post',
          headers:{
              token:true,
          },
          data:qs.stringify(data)
        }).then(res=>{
          if(res.code==2){
              this.payStatus=true
          }
        })
    }
  }
}
</script>

<style>

</style>