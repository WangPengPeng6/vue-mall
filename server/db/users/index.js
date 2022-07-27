const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userListSchema = new Schema({
    imgUrl: String,
    tel: String,
    pwd: String,
    nickName: String,
    token: String
})


const usersModel = mongoose.model("users", userListSchema);


module.exports = usersModel