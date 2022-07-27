import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, ITEM_CHECK } from './mutations-types'
import { Toast, Dialog } from 'vant';
import request from '@/api/requset'
export default {
    state: {
        list: [],//购物车数据
        selectList: [] //选中的数据  存储的是每一个选中的id值
    },
    getters: {
        isCheckedAll(state) {
            return state.list.length == state.selectList.length
        },
        //计算总价
        total(state) {
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v => {
                if (v.checked) {
                    total.num += v.goods_num
                    total.price += v.goods_price * v.goods_num
                }
            })
            return total
        }
    },
    mutations: {
        [CART_LIST](state, cartArr) {
            state.list = cartArr
            state.selectList = []
            console.log(state.selectList);
            cartArr.forEach(v => {
                state.selectList.push(v._id)
            })
        },
        //全选
        [CHECK_ALL](state) {
            state.selectList = state.list.map(v => {
                v.checked = true
                return v._id
            })
        },
        //全不选
        [UN_CHECK_ALL](state) {
            state.list.forEach(v => {
                v.checked = false
            })
            state.selectList = []
        },
        //单选
        [ITEM_CHECK](state, index) {
            let id = state.list[index]._id
            let i = state.selectList.indexOf(id)
            //如果能找到
            if (i > -1) {
                return state.selectList.splice(i, 1)
            } else {
                //之前没选中就添加一个id
                state.selectList.push(id)
            }
        },
        //删除
        delGoods(state) {
            state.list = state.list.filter(v => {
                return state.selectList.indexOf(v._id) == -1
            })
        }
    },
    actions: {
        checkALLFn({ commit, getters }) {
            getters.isCheckedAll ? commit('UN_CHECK_ALL') : commit('CHECK_ALL')
        },
        //删除
        delGoodsFn({ commit, state }, id) {
            //没有选中
            if (state.selectList.length == 0) {
                Toast('请选择商品');
            }
            //删除多个存储_id
            let arrCart = []
            //提示消息弹出框
            Dialog.confirm({
                message: '确定要删除吗？',
            }).then(() => {
                //单个删除
                if (typeof id == 'string') {
                    request.$axios({
                        url: '/api/deleteCart/one',
                        method: 'post',
                        data: {
                            cartsGoodsId: id
                        }
                    }).then(res => {
                        let index = state.list.findIndex(v => {
                            return v._id == id
                        })
                        state.list.splice(index, 1)
                        state.selectList = []
                        state.list.forEach(v => {
                            state.selectList.push(v._id)
                        })
                        console.log(state.selectList);
                        if (res.success) {
                            Toast(res.msg);
                        }
                    })
                } else {
                    //多选删除
                    arrCart = state.selectList
                    request.$axios({
                        url: '/api/deleteCart/many',
                        method: 'post',
                        data: {
                            cartsGoodsId: arrCart
                        }
                    }).then(res => {
                        commit('delGoods')
                        //全不选
                        commit('UN_CHECK_ALL')
                        if (res.success) {
                            Toast(res.msg);
                        }
                    })
                }

            })
        }
    }
}