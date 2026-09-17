const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");

// Get all customers
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find().sort({ customer_id: 1 });

        res.json({
            success: true,
            count: customers.length,
            data: customers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve customers",
            error: error.message
        });
    }
});

// Get a single customer
router.get("/:customerId", async (req, res) => {
    try {
        const customer = await Customer.findOne({
            customer_id: req.params.customerId
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve customer",
            error: error.message
        });
    }
});

module.exports = router;