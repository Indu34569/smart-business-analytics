# Smart Business Analytics and Customer Insights System

## Live Project

🌐 **Live Website:**  
https://smart-business-analytics.vercel.app/

💻 **GitHub Repository:**  
https://github.com/Indu34569/smart-business-analytics

---

## Project Overview

The Smart Business Analytics and Customer Insights System is a web-based business intelligence platform developed to analyze customer, product, and sales data stored in MongoDB.

The system retrieves data from MongoDB Atlas, processes the information using a Node.js and Express.js backend, calculates important business metrics, and presents the results through an interactive web dashboard.

The project provides both visual analytics and text-based business insights to make business data easier to understand.

---

## Objectives

- Store business data using MongoDB.
- Retrieve customer, product, and sales information through APIs.
- Process and validate the retrieved data.
- Calculate important business performance metrics.
- Analyze customer and sales behavior.
- Display results using interactive charts and tables.
- Generate business performance reports.
- Provide a publicly accessible web application.

---

## Main Features

### 1. Dashboard

The dashboard provides an overview of business performance including:

- Total customers
- Total products
- Total orders
- Total revenue
- Average order value
- Monthly revenue
- Customer distribution
- Recent transactions
- System status

### 2. Customer Management

The Customers section displays customer information stored in MongoDB.

It includes:

- Customer ID
- Customer name
- Age
- City
- Customer type
- Customer statistics

### 3. Sales Analysis

The Sales section displays sales transactions including:

- Order ID
- Customer ID
- Product ID
- Quantity
- Amount
- Date
- Order status

### 4. Business Analytics

The Analytics section provides:

- Revenue analysis
- Monthly sales analysis
- Category-wise revenue
- Product-wise revenue
- Customer spending
- Customer type distribution
- City distribution
- Top customer identification

### 5. Reports

The Reports section generates a business performance summary containing:

- Total revenue
- Total orders
- Total customers
- Average order value
- Top revenue category
- Top product
- Highest spending customer
- Business insights

### 6. Data Processing Pipeline

The system demonstrates the complete data processing workflow:

MongoDB Atlas  
↓  
Data Retrieval  
↓  
Data Validation  
↓  
Data Processing  
↓  
Analytics Engine  
↓  
REST API  
↓  
Frontend Dashboard

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js

### Backend

- Node.js
- Express.js
- Mongoose
- REST API

### Database

- MongoDB Atlas

### Deployment

- GitHub
- Vercel

---

## Database Structure

The project uses the following MongoDB database:

**Database:** `business_db`

### Collections

- `customers`
- `products`
- `sales`

---

## Current Dataset

The deployed project currently contains:

| Data | Count |
|---|---:|
| Customers | 10 |
| Products | 8 |
| Sales | 24 |
| Total Revenue | ₹75,164 |

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │     business_db     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Data Retrieval    │
                    │      Mongoose       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Data Processing   │
                    │  Node.js / Express  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Analytics Engine  │
                    │ Revenue / Customer  │
                    │      Analysis       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      REST API       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Frontend Dashboard  │
                    │ HTML/CSS/JavaScript │
                    │     + Chart.js      │
                    └─────────────────────┘