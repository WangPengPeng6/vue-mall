import { INIT_ORDER } from './mutations-types'
export default {
    state: {
        list: [],
        order_id: localStorage.getItem('vue-mall_orderId') || ''
    },
    mutations: {
        [INIT_ORDER](state, orderId) {
            state.list = orderId
            //存储订单号
            state.order_id = orderId.order_id
            //设置一个id号
            localStorage.setItem('vue-mall_orderId', orderId.order_id)
        }
    }
}