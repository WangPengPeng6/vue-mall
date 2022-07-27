import { USER_LOGIN, INIT_USER } from './mutations-types'
import { MessageBox } from 'mint-ui';
export default {
    state: {
        //登录状态
        loginStatus: false,
        //token
        token: null,
        //用户信息
        userInfo: {}
    },
    getters: {},
    mutations: {
        //设置
        [USER_LOGIN](state, userInfo) {
            state.loginStatus = true  //登录状态变为true
            state.token = userInfo.token //token
            state.userInfo = userInfo //用户信息

            //持久化存储=》本地存储
            localStorage.setItem('vue-mallUserInfo', JSON.stringify(userInfo))
        },
        //读取
        [INIT_USER](state) {
            let userInfo = JSON.parse(localStorage.getItem('vue-mallUserInfo'))
            if (userInfo) {
                state.loginStatus = true  //登录状态变为true
                state.token = userInfo.token //token
                state.userInfo = userInfo //用户信息
            }
        },
        //退出
        loginOut(state) {
            MessageBox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            });
            MessageBox.confirm('确定执行此操作?').then(action => {
                state.loginStatus = false  //登录状态变为true
                state.token = null //token
                state.userInfo = {}//用户信息
                localStorage.removeItem('vue-mallUserInfo')
            });

        }
    },
    actions: {},
}