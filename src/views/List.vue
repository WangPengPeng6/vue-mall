<template>
  <div class="list">
    <header>
      <div class="back" @click="goBack">
        <i class="iconfont icon-fanhui" ></i>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <span>搜你喜欢.....</span>
      </div>
      <div class="home">
        <i class="iconfont icon-zhuye"></i>
      </div>
    </header>
    <section>
      <div class="list-l left" >
        <ul class="l-item" >
          <li  :class="{active:index===currentIndex}" v-for="(item,index) in leftData" :key="index" @click="goScroll(index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="list-r" ref="right">
        <div ref="good" class="good"> 
          <div class="goodimg">
          <img src="/images/爆款.png" alt="">
          </div>
          <ul class="r-list" v-for="(item,index) in rightData" :key="index">
            <li v-for="(i,k) in item" :key="k">
              <h2>{{i.name}}</h2>
              <ul class="r-content">
                <li v-for="(a,b) in i.list" :key="b">
                  <img :src="a.imgUrl" alt="">
                  <span>{{a.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Tabber/>
  </div>
</template>

<script>
import Tabber from '@/components/common/Tabber.vue'
import requset from '@/api/requset';

//引入插件
import BetterScroll from 'better-scroll'
export default {
  name: "ListView",
  data() {
    return {
      leftData:[],//左侧数据
      rightData:[],//右侧数据

      rightBScroll:'',//右侧滑动BScroll
      allHeight:[],//承载右侧每一块的高度值
      scrollY:'',//右侧滚动距离
    }
  },
  components:{
    Tabber
  },
  computed:{
    currentIndex(){
      return this.allHeight.findIndex((item,index)=>{
        return this.scrollY>=item&&this.scrollY<this.allHeight[index+1]
      })
    }
  },
  methods:{
    goBack(){
        this.$router.push('/home')
    },
    goScroll(index){
      this.rightBScroll.scrollTo(0,-this.allHeight[index],500)
    }
  },
  async created(){
    let res=await requset.$axios({
      url:'/api/goods/list'
    })
    let leftArr=[]
    let rightArr=[]
    res.forEach(element => {
      leftArr.push({
        id:element.id,
        name:element.name
      })
      rightArr.push(element.data)
    });
    this.leftData=leftArr
    this.rightData=rightArr


     //当所有DOM节点加载完毕后执行 $nextTick
        this.$nextTick(()=>{
          //左侧滑动
          new BetterScroll('.left',{
            click:true
          })
          //右侧滑动
          this.rightBScroll=new BetterScroll(this.$refs.right,{
            click:true,
            probeType:3
          })

          //统计右侧所有板块高度值
          let height=113
          this.allHeight.push(height)
          //获取右侧每一块高度
        
          let uls= this.$refs.right.getElementsByClassName('r-list');
          //把dom对象转换为数组
          Array.from(uls).forEach(v=>{
            height+=v.clientHeight
            this.allHeight.push(height)
          })
         
         //得到右侧滚动的值
         this.rightBScroll.on('scroll',(pos)=>{
           this.scrollY=Math.abs(pos.y)
         })
      })
  }
};
</script>

<style lang="less" scoped>
.list{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.3333rem;
    width: 100%;
    background: #b0352f;
    color: #fff;
    .back{
      i{
        font-size: .7467rem;
        padding: .2667rem;
        line-height: 2.6667rem;
      }
    }
    .search{
      background: #fff;
      border-radius: .32rem;
      padding: 0 .2667rem;
      color: #999;
      height: 60%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;
      i{
        font-size: .5333rem;
        padding-right: .1333rem;
      }
      span{
        width: 100%;
        font-size:.3733rem;
      }
    }
    .home{
      i{
        font-size: .7467rem;
        padding: 0 .2667rem;
        line-height: 2.6667rem;
      }
    }
  }
  section{
    flex: 1; 
    display: flex;
    overflow: hidden;
    .list-l{
      width: 2.48rem;
      background: #fff;
      overflow: hidden;
      border-right: 1px solid #ccc;
      .l-item{
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-items: center;
        li{
          width: 100%;
         padding: .08rem 0;
         margin: .533333rem 0;
          text-align: center;
          font-size: .3733rem;
        }
      }
    }
    .list-r{
      flex: 1;
      .good{
       padding-bottom:9.8rem;
      }
      .goodimg{
        margin-top: .1333rem;
        width: 100%;
        height: 3.0133rem;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
          width: 95%;
        }
      }
      .r-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
           width: 100%;
            h2{
            margin: .5333rem 0;
            text-align: center;
            font-size: .5333rem;
            font-weight:600;
          }
        }
         
        .r-content{
          display: flex;
          flex-wrap: wrap;
      
         li{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.3%;
          height: 2.48rem;
           img{
            width: 1.4133rem;
            height: 1.4133rem;
           }
           span{
            font-size: .3733rem;
           }
         }
        }
      }
    }
  }
  .active{
    color: #b0352f;
    border-left: 3px solid #b0352f;
  } 
}
</style>