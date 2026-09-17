const CUSTOMER_API = "/api/customers";

let customersLoaded = false;

async function loadCustomers() {
    const tableBody = document.getElementById("customers-table-body");

    if (!tableBody) {
        console.error("customers-table-body not found");
        return;
    }

    tableBody.innerHTML = `
        <tr>
            <td colspan="5">Loading customers...</td>
        </tr>
    `;

    try {
        const response = await fetch(CUSTOMER_API);

        if (!response.ok) {
            throw new Error("Customer API returned " + response.status);
        }

        const result = await response.json();

        console.log("CUSTOMER DATA:", result);

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Invalid customer data");
        }

        const customers = result.data;

        document.getElementById("customer-count").textContent =
            customers.length;

        document.getElementById("returning-count").textContent =
            customers.filter(c => c.customer_type === "Returning").length;

        document.getElementById("new-count").textContent =
            customers.filter(c => c.customer_type === "New").length;

        tableBody.innerHTML = "";

        customers.forEach(customer => {

            const row = document.createElement("tr");

            const customerId = document.createElement("td");
            customerId.textContent = customer.customer_id;

            const name = document.createElement("td");
            name.innerHTML = `<strong>${customer.name}</strong>`;

            const age = document.createElement("td");
            age.textContent = customer.age;

            const city = document.createElement("td");
            city.textContent = customer.city;

            const type = document.createElement("td");
            type.textContent = customer.customer_type;

            row.appendChild(customerId);
            row.appendChild(name);
            row.appendChild(age);
            row.appendChild(city);
            row.appendChild(type);

            tableBody.appendChild(row);
        });

        customersLoaded = true;

        console.log("Customers displayed successfully:", customers.length);

    } catch (error) {

        console.error("CUSTOMER ERROR:", error);

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    Customer data could not be loaded.
                </td>
            </tr>
        `;
    }
}


function setupCustomerSearch() {

    const searchBox = document.getElementById("customer-search");

    if (!searchBox) {
        return;
    }

    searchBox.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const rows = document.querySelectorAll(
            "#customers-table-body tr"
        );

        rows.forEach(row => {

            const text = row.textContent.toLowerCase();

            row.style.display =
                text.includes(searchText) ? "" : "none";

        });

    });
}


document.addEventListener("DOMContentLoaded", function () {

    console.log("Customers JavaScript loaded");

    loadCustomers();

    setupCustomerSearch();

    document.querySelectorAll(".nav-item").forEach(button => {

        button.addEventListener("click", function () {

            if (this.dataset.tab === "customers") {
                loadCustomers();
            }

        });

    });

});
