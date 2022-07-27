const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartsListSchema = new Schema({
    uId: ObjectId,
    goods_id: ObjectId,
    goods_name: String,
    goods_price: Number,
    goods_num: Number,
    goods_imgUrl: String
})


const cartsModel = mongoose.model("carts", cartsListSchema);


module.exports = cartsModel