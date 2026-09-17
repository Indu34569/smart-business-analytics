const API_BASE = "/api";

let analyticsData = null;
let monthlyRevenueChart = null;
let customerTypeChart = null;

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    displayCurrentDate();
    loadDashboard();
});

function setupNavigation() {

    const buttons = document.querySelectorAll(".nav-item");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const tabName = button.dataset.tab;

            buttons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            document.querySelectorAll(".tab-content").forEach(tab => {
                tab.classList.remove("active");
            });

            const selectedTab =
                document.getElementById(`${tabName}-tab`);

            if (selectedTab) {
                selectedTab.classList.add("active");
            }

            const titles = {
                dashboard: "Dashboard",
                customers: "Customers",
                sales: "Sales Transactions",
                analytics: "Business Analytics",
                reports: "Analytics Reports",
                process: "Data Processing"
            };

            document.getElementById("page-title").textContent =
                titles[tabName] || "Dashboard";

        });

    });

}


function displayCurrentDate() {

    const element =
        document.getElementById("current-date");

    if (!element) return;

    const today = new Date();

    element.textContent =
        today.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

}


async function loadDashboard() {

    try {

        const response =
            await fetch(`${API_BASE}/analytics`);

        const result =
            await response.json();

        if (!result.success) {
            throw new Error("Analytics request failed");
        }

        analyticsData = result.data;

        updateSummary(analyticsData.summary);

        updateTopCustomer(
            analyticsData.topCustomer
        );

        updateCategorySummary(
            analyticsData.categoryRevenue
        );

        createMonthlyRevenueChart(
            analyticsData.monthlyRevenue
        );

        createCustomerTypeChart(
            analyticsData.customerTypes
        );

    } catch (error) {

        console.error(
            "Dashboard loading error:",
            error
        );

    }

}


function updateSummary(summary) {

    document.getElementById("total-customers").textContent =
        summary.totalCustomers;

    document.getElementById("total-revenue").textContent =
        formatCurrency(summary.totalRevenue);

    document.getElementById("total-orders").textContent =
        summary.totalOrders;

    document.getElementById("average-order").textContent =
        formatCurrency(summary.averageOrderValue);

}


function updateTopCustomer(customer) {

    const element =
        document.getElementById("top-customer");

    if (!element) return;

    if (!customer) {

        element.innerHTML = `
            <strong>No data</strong>
            <span>No completed customer transactions found.</span>
        `;

        return;
    }

    element.innerHTML = `
        <strong>${customer.name}</strong>
        <span>
            ${customer.customer_id} •
            ${formatCurrency(customer.spending)}
        </span>
    `;

}


function updateCategorySummary(categories) {

    const element =
        document.getElementById("category-summary");

    if (!element) return;

    element.innerHTML = "";

    Object.entries(categories)
        .sort((a, b) => b[1] - a[1])
        .forEach(([category, revenue]) => {

            const row =
                document.createElement("div");

            row.className = "category-row";

            row.innerHTML = `
                <span>${category}</span>
                <strong>${formatCurrency(revenue)}</strong>
            `;

            element.appendChild(row);

        });

}


function createMonthlyRevenueChart(data) {

    const canvas =
        document.getElementById("monthlyRevenueChart");

    if (!canvas) return;

    if (monthlyRevenueChart) {
        monthlyRevenueChart.destroy();
    }

    const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];

    const labels = [];
    const values = [];

    monthOrder.forEach(month => {

        if (data[month] !== undefined) {

            labels.push(month);
            values.push(data[month]);

        }

    });

    monthlyRevenueChart =
        new Chart(canvas, {

            type: "line",

            data: {

                labels,

                datasets: [{

                    label: "Revenue",

                    data: values,

                    borderWidth: 3,

                    tension: 0.35,

                    fill: true

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            callback: value =>
                                "₹" + value

                        }

                    }

                }

            }

        });

}


function createCustomerTypeChart(data) {

    const canvas =
        document.getElementById("customerTypeChart");

    if (!canvas) return;

    if (customerTypeChart) {
        customerTypeChart.destroy();
    }

    customerTypeChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: Object.keys(data),

                datasets: [{

                    data: Object.values(data),

                    borderWidth: 2

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        position: "bottom"
                    }

                }

            }

        });

}


function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(value);

}
