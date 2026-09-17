const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Customer = require("../backend/models/Customer");
const Sale = require("../backend/models/Sale");
const Product = require("../backend/models/Product");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

async function connectDatabase() {
    if (isConnected) {
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI environment variable is not configured");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "business_db"
    });

    isConnected = true;

    console.log("MongoDB Connected Successfully");
}

async function getAnalytics() {
    const sales = await Sale.find();
    const customers = await Customer.find();
    const products = await Product.find();

    const completedSales = sales.filter(
        sale => sale.status === "Completed"
    );

    const totalRevenue = completedSales.reduce(
        (total, sale) => total + Number(sale.amount),
        0
    );

    const totalOrders = completedSales.length;

    const totalQuantity = completedSales.reduce(
        (total, sale) => total + Number(sale.quantity),
        0
    );

    const averageOrderValue =
        totalOrders > 0
            ? totalRevenue / totalOrders
            : 0;

    const monthlyRevenue = {};

    completedSales.forEach(sale => {
        const month = new Date(sale.date).toLocaleString("en-IN", {
            month: "short"
        });

        monthlyRevenue[month] =
            (monthlyRevenue[month] || 0) +
            Number(sale.amount);
    });

    const categoryRevenue = {};
    const productRevenue = {};
    const customerSpending = {};

    completedSales.forEach(sale => {
        const product = products.find(
            item => item.product_id === sale.product_id
        );

        if (product) {
            categoryRevenue[product.category] =
                (categoryRevenue[product.category] || 0) +
                Number(sale.amount);

            productRevenue[product.name] =
                (productRevenue[product.name] || 0) +
                Number(sale.amount);
        }

        customerSpending[sale.customer_id] =
            (customerSpending[sale.customer_id] || 0) +
            Number(sale.amount);
    });

    const topCustomerEntry = Object.entries(customerSpending)
        .sort((a, b) => b[1] - a[1])[0];

    let topCustomer = null;

    if (topCustomerEntry) {
        const customer = customers.find(
            item => item.customer_id === topCustomerEntry[0]
        );

        if (customer) {
            topCustomer = {
                customer_id: customer.customer_id,
                name: customer.name,
                spending: topCustomerEntry[1]
            };
        }
    }

    const customerTypes = {};

    customers.forEach(customer => {
        customerTypes[customer.customer_type] =
            (customerTypes[customer.customer_type] || 0) + 1;
    });

    const cityDistribution = {};

    customers.forEach(customer => {
        cityDistribution[customer.city] =
            (cityDistribution[customer.city] || 0) + 1;
    });

    return {
        summary: {
            totalCustomers: customers.length,
            totalProducts: products.length,
            totalOrders,
            totalRevenue,
            totalQuantity,
            averageOrderValue
        },
        monthlyRevenue,
        categoryRevenue,
        productRevenue,
        customerSpending,
        customerTypes,
        cityDistribution,
        topCustomer
    };
}

app.get("/api/status", async (req, res) => {
    try {
        await connectDatabase();

        res.json({
            success: true,
            system: "Smart Business Analytics System",
            server: "Online",
            database: "MongoDB Atlas",
            status: "Operational"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Smart Business Analytics API is running",
        version: "1.0.0"
    });
});

app.get("/api/customers", async (req, res) => {
    try {
        await connectDatabase();

        const customers = await Customer.find().sort({
            customer_id: 1
        });

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

app.get("/api/customers/:customerId", async (req, res) => {
    try {
        await connectDatabase();

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

app.get("/api/sales", async (req, res) => {
    try {
        await connectDatabase();

        const sales = await Sale.find().sort({
            date: -1
        });

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

app.get("/api/sales/customer/:customerId", async (req, res) => {
    try {
        await connectDatabase();

        const sales = await Sale.find({
            customer_id: req.params.customerId
        }).sort({
            date: -1
        });

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

app.get("/api/analytics", async (req, res) => {
    try {
        await connectDatabase();

        const analytics = await getAnalytics();

        res.json({
            success: true,
            data: analytics
        });
    } catch (error) {
        console.error(
            "Analytics error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Failed to generate analytics",
            error: error.message
        });
    }
});

module.exports = app;