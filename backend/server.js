require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDatabase = require("./config/database");

const customerRoutes = require("./routes/customers");
const salesRoutes = require("./routes/sales");
const analyticsRoutes = require("./routes/analytics");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

connectDatabase();

app.use("/api/customers", customerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        system: "Smart Business Analytics System",
        server: "Online",
        database: "MongoDB Atlas",
        status: "Operational"
    });
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Smart Business Analytics API is running",
        version: "1.0.0"
    });
});

app.use(express.static(path.join(__dirname, "../frontend")));

app.listen(PORT, () => {
    console.log("---------------------------------");
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("---------------------------------");
});
