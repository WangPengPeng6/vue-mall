<template>
    <div class='path-index container'>
        <Header>
            <span v-if="pathStatus">添加地址</span>
            <span v-else>编辑地址</span>
        </Header>
        <section>
            <van-address-edit
                v-if="pathStatus"
                :area-list="areaList"
                show-set-default
                @save="onAdd"
            />

            <van-address-edit
                v-else
                :area-list="areaList"
                :address-info="AddressInfo"
                show-delete
                show-set-default
                show-search-result
                @save="onUpdate"
                @delete="onDelete"
            />
        </section>
        <Tabber></Tabber>
    </div>
</template>

<script>
import { Toast } from 'vant';
import Header from '@/components/path/Header.vue'
import Tabber from '@/components/common/Tabber.vue'
import request from '@/api/requset'
export default{
    data() {
        return {
            pathStatus:false,
            areaList:{
                province_list: {
                  110000: '北京市',
                  120000: '天津市',
                },
                city_list: {
                  110100: '北京市',
                  120100: '天津市',
                },
                county_list: {
                  110101: '东城区',
                  110102: '西城区',
                  120101: '塘沽区',
                },
            },
            AddressInfo:{}
        };
    },
    components:{
        Header,
        Tabber
    },
    created(){
        let key=JSON.parse(this.$route.params.key)
        //通过点击添加进来
        if(key=='add'){
            this.pathStatus=true
        }else{
            //编辑进来的
            this.AddressInfo=key
    console.log(key);
            this.AddressInfo.isDefault=this.AddressInfo.isDefault==1?true:false
        }
    },
    methods: {
        //点击保存 增加
        onAdd(content) {
            content.isDefault=content.isDefault==true?1:0
            request.$axios({
				url:'/api/addAddress',
                method:'post',
				headers:{
                    token:true
                },
                data:{
                    ...content
                }
			}).then(res=>{
                if(res.success){
                    this.$router.push('/path')
                    Toast(res.msg);
                }
            })
          
        },
        //删除
        onDelete(content) {
            request.$axios({
				url:'/api/deleteAddress',
                method:'post',
				headers:{
                    token:true
                },
                data:{
                    id:content._id
                }
			}).then(res=>{
                if(res.success){
                    this.$router.push('/path')
                    Toast('删除成功');
                }
            })
        },
         //点击保存 修改
        onUpdate(content){
            content.isDefault=content.isDefault==true?1:0
            request.$axios({
				url:'/api/updateAddress',
                method:'post',
				headers:{
                    token:true
                },
                data:{
                    ...content
                }
			}).then(res=>{
                if(res.modifiedCount){
                    this.$router.push('/path')
                    Toast('地址修改成功');
                }
            })
        }
    },
}
</script>

<style lang='less' scoped>
section{
    background-color: #F7F7F7;
    .van-address-edit{
        padding: 0;
    }
    ::v-deep .van-address-edit__buttons{
        display: flex;
        justify-content: center;
        align-items:center;
        flex-wrap: wrap;
    }
    ::v-deep .van-button--danger{
        width: 8rem;
        height: 1.066666rem;
        background-color: #b0352f;
    }
    ::v-deep .van-button--default{
        width: 8rem;
        height: 1.066666rem;
    }
}
::v-deep .tabbar{
    border-top:2px solid #ccc;
}
</style>
