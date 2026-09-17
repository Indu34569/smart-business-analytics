const REPORT_API = "/api/analytics";

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("generate-report");

    if (button) {
        button.addEventListener("click", generateReport);
    }

});


async function generateReport() {

    const button = document.getElementById("generate-report");

    if (button) {
        button.textContent = "Generating...";
        button.disabled = true;
    }

    try {

        const response = await fetch(REPORT_API);
        const result = await response.json();

        if (!result.success) {
            throw new Error("Unable to generate report");
        }

        const data = result.data;
        const summary = data.summary;

        document.getElementById("report-date").textContent =
            "Generated on " +
            new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });


        document.getElementById("report-revenue").textContent =
            formatCurrency(summary.totalRevenue);


        document.getElementById("report-orders").textContent =
            summary.totalOrders;


        document.getElementById("report-customers").textContent =
            summary.totalCustomers;


        document.getElementById("report-aov").textContent =
            formatCurrency(summary.averageOrderValue);


        const insightsList =
            document.getElementById("report-insights-list");

        insightsList.innerHTML = "";


        const categoryEntries =
            Object.entries(data.categoryRevenue)
                .sort((a, b) => b[1] - a[1]);


        const productEntries =
            Object.entries(data.productRevenue)
                .sort((a, b) => b[1] - a[1]);


        const cityEntries =
            Object.entries(data.cityDistribution)
                .sort((a, b) => b[1] - a[1]);


        if (categoryEntries.length > 0) {

            const topCategory = categoryEntries[0];

            addInsight(
                insightsList,
                `Top revenue category: ${topCategory[0]} (${formatCurrency(topCategory[1])})`
            );

        }


        if (productEntries.length > 0) {

            const topProduct = productEntries[0];

            addInsight(
                insightsList,
                `Top product by revenue: ${topProduct[0]} (${formatCurrency(topProduct[1])})`
            );

        }


        if (data.topCustomer) {

            addInsight(
                insightsList,
                `Highest spending customer: ${data.topCustomer.name} (${formatCurrency(data.topCustomer.spending)})`
            );

        }


        if (cityEntries.length > 0) {

            addInsight(
                insightsList,
                `Customer concentration is highest in ${cityEntries[0][0]} (${cityEntries[0][1]} customers)`
            );

        }


        addInsight(
            insightsList,
            `Average order value is ${formatCurrency(summary.averageOrderValue)}`
        );


        const reportCard = document.getElementById("report-card");

        if (reportCard) {
            reportCard.classList.add("report-generated");
        }

        console.log("Report generated successfully");

    } catch (error) {

        console.error("Report generation error:", error);

        const insightsList =
            document.getElementById("report-insights-list");

        if (insightsList) {

            insightsList.innerHTML = `
                <li>Unable to generate report. Please try again.</li>
            `;

        }

    } finally {

        if (button) {
            button.textContent = "Generate Report";
            button.disabled = false;
        }

    }

}


function addInsight(list, text) {

    const item = document.createElement("li");

    item.textContent = text;

    list.appendChild(item);

}


function formatCurrency(value) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(value);

}
