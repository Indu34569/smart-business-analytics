const Sale = require("../models/Sale");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

const getAnalytics = async () => {
    const sales = await Sale.find();
    const customers = await Customer.find();
    const products = await Product.find();

    const completedSales = sales.filter(
        (sale) => sale.status === "Completed"
    );

    const totalRevenue = completedSales.reduce(
        (total, sale) => total + sale.amount,
        0
    );

    const totalOrders = completedSales.length;

    const totalQuantity = completedSales.reduce(
        (total, sale) => total + sale.quantity,
        0
    );

    const averageOrderValue =
        totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Monthly revenue
    const monthlyRevenue = {};

    completedSales.forEach((sale) => {
        const month = new Date(sale.date).toLocaleString("en-IN", {
            month: "short"
        });

        monthlyRevenue[month] =
            (monthlyRevenue[month] || 0) + sale.amount;
    });

    // Category revenue
    const categoryRevenue = {};

    completedSales.forEach((sale) => {
        const product = products.find(
            (item) => item.product_id === sale.product_id
        );

        if (product) {
            categoryRevenue[product.category] =
                (categoryRevenue[product.category] || 0) +
                sale.amount;
        }
    });

    // Product revenue
    const productRevenue = {};

    completedSales.forEach((sale) => {
        const product = products.find(
            (item) => item.product_id === sale.product_id
        );

        if (product) {
            productRevenue[product.name] =
                (productRevenue[product.name] || 0) +
                sale.amount;
        }
    });

    // Customer spending
    const customerSpending = {};

    completedSales.forEach((sale) => {
        customerSpending[sale.customer_id] =
            (customerSpending[sale.customer_id] || 0) +
            sale.amount;
    });

    const topCustomerEntry = Object.entries(customerSpending)
        .sort((a, b) => b[1] - a[1])[0];

    let topCustomer = null;

    if (topCustomerEntry) {
        const customer = customers.find(
            (item) => item.customer_id === topCustomerEntry[0]
        );

        if (customer) {
            topCustomer = {
                customer_id: customer.customer_id,
                name: customer.name,
                spending: topCustomerEntry[1]
            };
        }
    }

    // Customer type distribution
    const customerTypes = {};

    customers.forEach((customer) => {
        customerTypes[customer.customer_type] =
            (customerTypes[customer.customer_type] || 0) + 1;
    });

    // City distribution
    const cityDistribution = {};

    customers.forEach((customer) => {
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
};

module.exports = {
    getAnalytics
};