const mongoose = require('mongoose')
//和数据库建立连接  端口号为27017可以省略
mongoose.connect('mongodb://127.0.0.1:27017/vue_mall');

//监听数据库是否连接成功
mongoose.connection.once('open', function () {
    console.log('数据库连接成功~~~');
})

//监听数据库断开连接
mongoose.connection.once("close", function () {
    console.log("数据库已断开连接~~~")
})