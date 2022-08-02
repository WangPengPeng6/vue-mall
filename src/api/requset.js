import axios from 'axios';
import { Indicator } from 'mint-ui';
import store from '@/store'
import router from '@/router'
export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {}
    },
    $axios(options = {}) {
        options.method = options.method || this.common.method;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;
        options.headers = options.headers || this.common.headers;
        //请求前 显示加载中....
        Indicator.open('Loading...');

        //是否是登录状态
        if (options.headers.token) {
            options.headers.token = store.state.user.token;
            if (!options.headers.token) {
                router.push('/login');
            }
        }
        //如果token过期重新登录
        return axios(options).then(v => {
            let data = v.data.data
            let code = v.data.code
            if (code == 1000) {
                Indicator.close();
                return router.push('/login');
            }
            return new Promise((res, rej) => {
                if (!v) return rej();
                //请求结束  关闭加载中
                setTimeout(() => {
                    Indicator.close();
                }, 500)
                res(data)
            })
        })
    }
}