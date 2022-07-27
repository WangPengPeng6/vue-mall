const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const ordersListSchema = new Schema({
    uId: ObjectId,
    order_id: String,
    goods_name: Array,
    goods_price: String,
    goods_num: String,
    order_status: String
})


const ordersModel = mongoose.model("orders", ordersListSchema);


module.exports = ordersModel