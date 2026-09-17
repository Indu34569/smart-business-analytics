const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);