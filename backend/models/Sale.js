const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        order_id: {
            type: String,
            required: true,
            unique: true
        },

        customer_id: {
            type: String,
            required: true
        },

        product_id: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        amount: {
            type: Number,
            required: true,
            min: 0
        },

        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["Completed", "Pending", "Cancelled"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Sale", saleSchema);