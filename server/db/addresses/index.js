const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressesListSchema = new Schema({
    uId: ObjectId,
    name: String,
    tel: String,
    province: String,
    city: String,
    county: String,
    addressDetail: String,
    isDefault: Number,
    areaCode: String
})


const addressesModel = mongoose.model("addresses", addressesListSchema);


module.exports = addressesModel