require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = require("./config/database");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Sale = require("./models/Sale");

const customers = [
    {
        customer_id: "C001",
        name: "Ananya",
        age: 24,
        city: "Bengaluru",
        customer_type: "Returning"
    },
    {
        customer_id: "C002",
        name: "Rahul",
        age: 29,
        city: "Chennai",
        customer_type: "New"
    },
    {
        customer_id: "C003",
        name: "Priya",
        age: 26,
        city: "Hyderabad",
        customer_type: "Returning"
    },
    {
        customer_id: "C004",
        name: "Arjun",
        age: 32,
        city: "Mumbai",
        customer_type: "Returning"
    },
    {
        customer_id: "C005",
        name: "Meera",
        age: 23,
        city: "Pune",
        customer_type: "New"
    },
    {
        customer_id: "C006",
        name: "Karthik",
        age: 35,
        city: "Bengaluru",
        customer_type: "Returning"
    },
    {
        customer_id: "C007",
        name: "Sneha",
        age: 28,
        city: "Delhi",
        customer_type: "New"
    },
    {
        customer_id: "C008",
        name: "Vikram",
        age: 31,
        city: "Kolkata",
        customer_type: "Returning"
    },
    {
        customer_id: "C009",
        name: "Divya",
        age: 27,
        city: "Chennai",
        customer_type: "Returning"
    },
    {
        customer_id: "C010",
        name: "Rohan",
        age: 30,
        city: "Mumbai",
        customer_type: "New"
    }
];

const products = [
    {
        product_id: "P001",
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499
    },
    {
        product_id: "P002",
        name: "Smart Watch",
        category: "Electronics",
        price: 3999
    },
    {
        product_id: "P003",
        name: "Laptop Backpack",
        category: "Accessories",
        price: 1499
    },
    {
        product_id: "P004",
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1999
    },
    {
        product_id: "P005",
        name: "Running Shoes",
        category: "Fashion",
        price: 2999
    },
    {
        product_id: "P006",
        name: "Cotton T-Shirt",
        category: "Fashion",
        price: 799
    },
    {
        product_id: "P007",
        name: "Travel Backpack",
        category: "Accessories",
        price: 1899
    },
    {
        product_id: "P008",
        name: "Desk Lamp",
        category: "Home",
        price: 999
    }
];

const sales = [
    {
        order_id: "ORD1001",
        customer_id: "C001",
        product_id: "P001",
        quantity: 2,
        amount: 4998,
        date: "2026-01-05",
        status: "Completed"
    },
    {
        order_id: "ORD1002",
        customer_id: "C002",
        product_id: "P003",
        quantity: 1,
        amount: 1499,
        date: "2026-01-12",
        status: "Completed"
    },
    {
        order_id: "ORD1003",
        customer_id: "C003",
        product_id: "P002",
        quantity: 1,
        amount: 3999,
        date: "2026-01-18",
        status: "Completed"
    },
    {
        order_id: "ORD1004",
        customer_id: "C004",
        product_id: "P005",
        quantity: 1,
        amount: 2999,
        date: "2026-02-03",
        status: "Completed"
    },
    {
        order_id: "ORD1005",
        customer_id: "C005",
        product_id: "P006",
        quantity: 3,
        amount: 2397,
        date: "2026-02-11",
        status: "Completed"
    },
    {
        order_id: "ORD1006",
        customer_id: "C006",
        product_id: "P004",
        quantity: 2,
        amount: 3998,
        date: "2026-02-20",
        status: "Completed"
    },
    {
        order_id: "ORD1007",
        customer_id: "C007",
        product_id: "P008",
        quantity: 2,
        amount: 1998,
        date: "2026-03-04",
        status: "Completed"
    },
    {
        order_id: "ORD1008",
        customer_id: "C008",
        product_id: "P007",
        quantity: 1,
        amount: 1899,
        date: "2026-03-15",
        status: "Completed"
    },
    {
        order_id: "ORD1009",
        customer_id: "C009",
        product_id: "P001",
        quantity: 1,
        amount: 2499,
        date: "2026-03-22",
        status: "Completed"
    },
    {
        order_id: "ORD1010",
        customer_id: "C010",
        product_id: "P002",
        quantity: 1,
        amount: 3999,
        date: "2026-04-02",
        status: "Completed"
    },
    {
        order_id: "ORD1011",
        customer_id: "C001",
        product_id: "P004",
        quantity: 1,
        amount: 1999,
        date: "2026-04-10",
        status: "Completed"
    },
    {
        order_id: "ORD1012",
        customer_id: "C003",
        product_id: "P005",
        quantity: 2,
        amount: 5998,
        date: "2026-04-18",
        status: "Completed"
    },
    {
        order_id: "ORD1013",
        customer_id: "C006",
        product_id: "P003",
        quantity: 2,
        amount: 2998,
        date: "2026-05-03",
        status: "Completed"
    },
    {
        order_id: "ORD1014",
        customer_id: "C008",
        product_id: "P006",
        quantity: 2,
        amount: 1598,
        date: "2026-05-14",
        status: "Completed"
    },
    {
        order_id: "ORD1015",
        customer_id: "C009",
        product_id: "P002",
        quantity: 1,
        amount: 3999,
        date: "2026-05-28",
        status: "Completed"
    },
    {
        order_id: "ORD1016",
        customer_id: "C002",
        product_id: "P007",
        quantity: 1,
        amount: 1899,
        date: "2026-06-06",
        status: "Completed"
    },
    {
        order_id: "ORD1017",
        customer_id: "C004",
        product_id: "P001",
        quantity: 1,
        amount: 2499,
        date: "2026-06-19",
        status: "Completed"
    },
    {
        order_id: "ORD1018",
        customer_id: "C005",
        product_id: "P008",
        quantity: 3,
        amount: 2997,
        date: "2026-07-01",
        status: "Completed"
    },
    {
        order_id: "ORD1019",
        customer_id: "C007",
        product_id: "P005",
        quantity: 1,
        amount: 2999,
        date: "2026-07-15",
        status: "Completed"
    },
    {
        order_id: "ORD1020",
        customer_id: "C010",
        product_id: "P004",
        quantity: 2,
        amount: 3998,
        date: "2026-08-05",
        status: "Completed"
    },
    {
        order_id: "ORD1021",
        customer_id: "C001",
        product_id: "P002",
        quantity: 1,
        amount: 3999,
        date: "2026-08-12",
        status: "Completed"
    },
    {
        order_id: "ORD1022",
        customer_id: "C003",
        product_id: "P001",
        quantity: 2,
        amount: 4998,
        date: "2026-08-20",
        status: "Completed"
    },
    {
        order_id: "ORD1023",
        customer_id: "C006",
        product_id: "P005",
        quantity: 1,
        amount: 2999,
        date: "2026-09-02",
        status: "Completed"
    },
    {
        order_id: "ORD1024",
        customer_id: "C009",
        product_id: "P007",
        quantity: 1,
        amount: 1899,
        date: "2026-09-08",
        status: "Completed"
    }
];

const seedDatabase = async () => {
    try {
        await connectDatabase();

        console.log("Clearing existing project data...");

        await Customer.deleteMany({});
        await Product.deleteMany({});
        await Sale.deleteMany({});

        console.log("Inserting customers...");
        await Customer.insertMany(customers);

        console.log("Inserting products...");
        await Product.insertMany(products);

        console.log("Inserting sales...");
        await Sale.insertMany(sales);

        console.log("");
        console.log("=================================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("=================================");
        console.log(`Customers inserted: ${customers.length}`);
        console.log(`Products inserted: ${products.length}`);
        console.log(`Sales inserted: ${sales.length}`);
        console.log("=================================");

        await mongoose.connection.close();

        console.log("MongoDB connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Database seeding failed:");
        console.error(error.message);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedDatabase();