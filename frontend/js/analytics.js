const ANALYTICS_API = "/api/analytics";

let categoryChart = null;
let productChart = null;

document.addEventListener("DOMContentLoaded", () => {
    loadAnalytics();

    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.tab === "analytics") {
                loadAnalytics();
            }
        });
    });
});

async function loadAnalytics() {

    try {

        const response = await fetch(ANALYTICS_API);
        const result = await response.json();

        if (!result.success) {
            throw new Error("Analytics request failed");
        }

        const data = result.data;

        createCategoryChart(data.categoryRevenue);
        createProductChart(data.productRevenue);
        displayCustomerSpending(data.customerSpending);

        console.log("Analytics loaded successfully");

    } catch (error) {

        console.error("Analytics loading error:", error);

    }
}


function createCategoryChart(data) {

    const canvas = document.getElementById("categoryRevenueChart");

    if (!canvas) return;

    if (categoryChart) {
        categoryChart.destroy();
    }

    const entries = Object.entries(data)
        .sort((a, b) => b[1] - a[1]);

    categoryChart = new Chart(canvas, {

        type: "bar",

        data: {
            labels: entries.map(item => item[0]),

            datasets: [{
                label: "Revenue",
                data: entries.map(item => item[1]),
                borderWidth: 2
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
                        callback: value => "₹" + value
                    }
                }

            }

        }

    });
}


function createProductChart(data) {

    const canvas = document.getElementById("productRevenueChart");

    if (!canvas) return;

    if (productChart) {
        productChart.destroy();
    }

    const entries = Object.entries(data)
        .sort((a, b) => b[1] - a[1]);

    productChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: entries.map(item => item[0]),

            datasets: [{
                label: "Revenue",
                data: entries.map(item => item[1]),
                borderWidth: 2
            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            indexAxis: "y",

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {

                x: {
                    beginAtZero: true,

                    ticks: {
                        callback: value => "₹" + value
                    }
                }

            }

        }

    });
}


function displayCustomerSpending(data) {

    const container =
        document.getElementById("customer-spending-list");

    if (!container) return;

    const entries = Object.entries(data)
        .sort((a, b) => b[1] - a[1]);

    container.innerHTML = "";

    entries.forEach(([customerId, amount]) => {

        const row = document.createElement("div");

        row.className = "category-row";

        row.innerHTML = `
            <span>${customerId}</span>
            <strong>${formatCurrency(amount)}</strong>
        `;

        container.appendChild(row);

    });

}


function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(value);

}
