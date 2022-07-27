import usersModel from "./index"
//验证数据库中的用户相关内容
const User = {
    queryUserTel(option) {
        return 'userModel.findOne({ tel:' + option.userTel + '})'
    },
    queryUserTel(option) {
        return 'userModel.findOne({ tel:' + option.userTel, +'pwd:' + option.userPwd + '})'
    }
}


exports = module.exports = User