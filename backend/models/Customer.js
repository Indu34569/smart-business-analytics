const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        customer_id: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        customer_type: {
            type: String,
            enum: ["New", "Returning"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);