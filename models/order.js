const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    startDate: {
        type: Object,
        required: true
    },
    dueDate: {
        type: Object,
        required: true
    },
    project:{
        type: String,
        required: true
    },
    period:{
        type: String,
        required: true
    },
    priority:{
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }})

module.exports = mongoose.model('Orders', orderSchema);