const express = require("express");
const router = express.Router();

const Sale = require("../models/Sale");

// Get all sales
router.get("/", async (req, res) => {
    try {
        const sales = await Sale.find().sort({ date: -1 });

        res.json({
            success: true,
            count: sales.length,
            data: sales
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve sales",
            error: error.message
        });
    }
});

// Get sales by customer
router.get("/customer/:customerId", async (req, res) => {
    try {
        const sales = await Sale.find({
            customer_id: req.params.customerId
        }).sort({ date: -1 });

        res.json({
            success: true,
            count: sales.length,
            data: sales
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve customer sales",
            error: error.message
        });
    }
});

module.exports = router;