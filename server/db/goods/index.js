const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goodsListSchema = new Schema({
    name: String,
    content: String,
    price: Number,
    class: String,
    imgUrl: String,
    num: Number,
    goodsid: Number,
    details: Array
})


const goodsModel = mongoose.model("goods", goodsListSchema);


module.exports = goodsModel