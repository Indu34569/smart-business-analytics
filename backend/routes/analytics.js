const express = require("express");
const router = express.Router();

const { getAnalytics } = require("../services/analyticsService");

// Complete analytics
router.get("/", async (req, res) => {
    try {
        const analytics = await getAnalytics();

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate analytics",
            error: error.message
        });
    }
});

module.exports = router;