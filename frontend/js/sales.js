const SALES_API = "/api/sales";

document.addEventListener("DOMContentLoaded", () => {
    loadSales();

    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.tab === "sales") {
                loadSales();
            }
        });
    });
});

async function loadSales() {
    const tableBody = document.getElementById("sales-table-body");

    if (!tableBody) {
        return;
    }

    try {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">Loading sales...</td>
            </tr>
        `;

        const response = await fetch(SALES_API);
        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Invalid sales data");
        }

        const sales = result.data;

        let totalQuantity = 0;
        let totalRevenue = 0;

        tableBody.innerHTML = "";

        sales.forEach(sale => {

            totalQuantity += Number(sale.quantity);
            
            if (sale.status === "Completed") {
                totalRevenue += Number(sale.amount);
            }

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${sale.order_id}</td>
                <td>${sale.customer_id}</td>
                <td>${sale.product_id}</td>
                <td>${sale.quantity}</td>
                <td>${formatCurrency(sale.amount)}</td>
                <td>${formatDate(sale.date)}</td>
                <td>
                    <span class="status-badge ${getStatusClass(sale.status)}">
                        ${sale.status}
                    </span>
                </td>
            `;

            tableBody.appendChild(row);
        });

        document.getElementById("sales-order-count").textContent =
            sales.length;

        document.getElementById("sales-quantity").textContent =
            totalQuantity;

        document.getElementById("sales-revenue").textContent =
            formatCurrency(totalRevenue);

        console.log("Sales loaded successfully:", sales.length);

    } catch (error) {

        console.error("Sales loading error:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load sales data.
                </td>
            </tr>
        `;
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}

function formatDate(value) {
    return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function getStatusClass(status) {

    if (status === "Completed") {
        return "completed";
    }

    if (status === "Pending") {
        return "pending";
    }

    return "cancelled";
}
