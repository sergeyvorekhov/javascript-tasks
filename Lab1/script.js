// 1. Data of cars
const cars = [
    {
        id: 1,
        brand: "Toyota",
        model: "Camry",
        year: 2022,
        color: "Black",
        price: 25000,
        fuel: "Gasoline"
    },
    {
        id: 2,
        brand: "BMW",
        model: "X5",
        year: 2023,
        color: "White",
        price: 55000,
        fuel: "Disel"
    },
    {
        id: 3,
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        color: "Red",
        price: 40000,
        fuel: "Electro"
    }
];

// 2. Data of Workers
const employees = [
    {
        id: 1,
        firstName: "Serg",
        lastName: "Orekhov",
        position: "Manager",
        phone: "+380501112233",
        salary: 2500,
        hireDate: "2023-04-10"
    },
    {
        id: 2,
        firstName: "Nikolay",
        lastName: "Kovalenko",
        position: "Saler",
        phone: "+380671234567",
        salary: 1800,
        hireDate: "2024-01-15"
    },
    {
        id: 3,
        firstName: "Andrey",
        lastName: "Golovashin",
        position: "Mecanics",
        phone: "+380931234567",
        salary: 2000,
        hireDate: "2022-08-20"
    }
];

// 3. Data of Customers
const clients = [
    {
        id: 1,
        firstName: "Mary",
        lastName: "Shevchenko",
        phone: "+380501234567",
        email: "maria@example.com",
        city: "Kharkiv",
        registrationDate: "2025-02-12"
    },
    {
        id: 2,
        firstName: "Vera",
        lastName: "Orange",
        phone: "+380671112233",
        email: "oleh@example.com",
        city: "Kharkiv",
        registrationDate: "2025-03-18"
    },
    {
        id: 3,
        firstName: "Anne",
        lastName: "Tkach",
        phone: "+380931112233",
        email: "anna@example.com",
        city: "Odesa",
        registrationDate: "2025-05-05"
    }
];

// 4. Data of Brands
const brands = [
    {
        id: 1,
        Name: "BMW",
        Producer: "Shevchenko",
        country: "Germany",
        registrationDate: "2025-02-12"
    },
    {
        id: 2,
        Name: "Fiat",
        Producer: "Fiat",
        country: "Italy",
        registrationDate: "2025-03-18"
    },
    {
        id: 3,
        Name: "Tesla",
        Producer: "Musk",
        country: "USA",
        registrationDate: "2025-05-05"
    }
];

// Function of Table Row Creation
function renderTable(data, tableBodyId, fields) {
    const tbody = document.getElementById(tableBodyId);

    tbody.innerHTML = data.map(item => {
        const cells = fields.map(field =>
            `<td>${item[field]}</td>`
        ).join("");

        return `<tr>${cells}</tr>`;
    }).join("");
}

// Show cars
renderTable(cars, "cars-body", [
    "id",
    "brand",
    "model",
    "year",
    "color",
    "price",
    "fuel"
]);

// Show workers
renderTable(employees, "employees-body", [
    "id",
    "firstName",
    "lastName",
    "position",
    "phone",
    "salary",
    "hireDate"
]);

// Show customers
renderTable(clients, "clients-body", [
    "id",
    "firstName",
    "lastName",
    "phone",
    "email",
    "city",
    "registrationDate"
]);

// Show brands
renderTable(brands, "brands-body", [
    "id",
    "Name",
    "Producer",
    "country",
    "registrationDate"
]);

// Switch the tabs
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // We select the active state for all tabs
        tabs.forEach(item => item.classList.remove("active"));
        contents.forEach(item => item.classList.remove("active"));

        // Activate the pressed tab
        tab.classList.add("active");

        // Showing the summary table
        const contentId = tab.dataset.tab;
        document.getElementById(contentId).classList.add("active");
    });
});