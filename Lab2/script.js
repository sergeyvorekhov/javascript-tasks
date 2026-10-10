// Which table currently shows form?
let activeFormEntity = null;

// 1. Data of cars
const cars = [
    {
        id: 1,
        brand: "BMW",
        model: "X5",
        year: 2023,
        color: "White",
        price: 75000,
        fuel: "Disel"
    },
    {
        id: 2,
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        color: "Red",
        price: 60000,
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
];

// 4. Data of Brands
const brands = [
    {
        id: 1,
        name: "BMW",
        producer: "Shevchenko",
        country: "Germany",
        registrationDate: "2025-02-12"
    },
    {
        id: 2,
        name: "Tesla",
        producer: "Musk",
        country: "USA",
        registrationDate: "2025-05-05"
    }
];

// ======================================
// 2. DESCRIPTION OF SKIN IRRIGATION
// ======================================

const schemas = {
    cars: {
        title: "Add Car",
        data: cars,
        formId: "cars-form",
        tableBodyId: "cars-body",
        fields: [
            { name: "brand", label: "Brand", type: "text" },
            { name: "model", label: "Model", type: "text" },
            { name: "year", label: "Year", type: "number" },
            { name: "color", label: "Color", type: "text" },
            { name: "price", label: "Price (€)", type: "number" },
            { name: "fuel", label: "Fuel Type", type: "text" }
        ]
    },

    employees: {
        title: "Add Worker",
        data: employees,
        formId: "employees-form",
        tableBodyId: "employees-body",
        fields: [
            { name: "firstName", label: "Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "position", label: "Position", type: "text" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "salary", label: "Salary (€)", type: "number" },
            { name: "hireDate", label: "Hire Date", type: "date" }
        ]
    },

    clients: {
        title: "Add Customer",
        data: clients,
        formId: "clients-form",
        tableBodyId: "clients-body",
        fields: [
            { name: "firstName", label: "Name", type: "text" },
            { name: "lastName", label: "Last Name", type: "text" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "email", label: "Email", type: "email" },
            { name: "city", label: "City", type: "text" },
            {
                name: "registrationDate",
                label: "Registration Date",
                type: "date"
            }
        ]
    },

    brands: {
        title: "Add Brand",
        data: brands,
        formId: "brands-form",
        tableBodyId: "brands-body",
        fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "producer", label: "Producer", type: "text" },
            { name: "country", label: "Country", type: "text" },
            { name: "registrationDate", label: "Registration Date", type: "date" },
            {
                name: "registrationDate",
                label: "Registration Date",
                type: "date"
            }
        ]
    }
};

// ======================================
// 3. DISPLAYING DATA IN A TABLE
// ======================================

function renderTable(entity) { 
    
    const config = schemas[entity]; 
    const tbody = document.getElementById( config.tableBodyId ); 

    // Clear the table before redrawing 
    tbody.replaceChildren(); 
    
    // Display all existing records 
    config.data.forEach(item => { 
            const row = document.createElement("tr");
            const values = [ 
                item.id, ...config.fields.map(field => item[field.name]) 
            ]; 
    values.forEach(value => { 
        const cell = document.createElement("td"); 
        cell.textContent = value; row.appendChild(cell); }); tbody.appendChild(row); }); 
// If the form is open for this table, 
// place it in the first free row 
        if (activeFormEntity === entity) { 
            const row = document.createElement("tr"); 
        const cell = document.createElement("td"); 
// Cell occupies the entire width of the table 
        cell.colSpan = config.fields.length + 1; row.appendChild(cell); 
        tbody.appendChild(row); createForm(entity, cell); 
        } 
}

// ======================================
// 4. CREATION OF FORMS
// ======================================

function createForm(entity, container) 
{ 
    const config = schemas[entity]; 
    const form = document.createElement("form"); 
    form.id = `${entity}-form`; 
    form.className = "add-form"; 
    // Form title
    const title = document.createElement("h3"); 
    title.textContent = config.title; 
    form.appendChild(title); 
    // Create form fields automatically
    config.fields.forEach(field => 
        { 
            const label = document.createElement("label"); 
            label.textContent = `${field.label}: `; 
            const input = document.createElement("input"); 
            input.type = field.type; 
            input.name = field.name; input.required = true; 
    // Limitations for numeric fields 
        if (field.type === "number") 
            { 
                input.min = "0"; input.step = "any"; 
            } 
            label.appendChild(input); 
        form.appendChild(label); 
        }); 
    // Save button
    const saveButton = document.createElement("button"); 
    saveButton.type = "submit"; 
    saveButton.textContent = "Save"; 
    // Cancel button
    const cancelButton = document.createElement("button"); 
    cancelButton.type = "button"; 
    cancelButton.textContent = "Cancel"; cancelButton.addEventListener("click", () => { activeFormEntity = null; renderTable(entity); }); 

    form.appendChild(saveButton); 
    form.appendChild(cancelButton);
    form.addEventListener("submit", event => { event.preventDefault(); 
// Receive entered data 
    const formData = new FormData(form); const newItem = {}; config.fields.forEach(field => { const value = formData.get(field.name); if (field.type === "number") { newItem[field.name] = Number(value); } else { newItem[field.name] = value.trim(); } }); 
// Check numeric values 
    const invalidNumber = config.fields.some(field => { if (field.type !== "number") { return false; } const value = newItem[field.name]; return ( !Number.isFinite(value) || value < 0 ); }); if (invalidNumber) { alert( "Введіть коректні числові значення!" ); return; } 
// Generate unique next ID 
    if (config.data.length > 0) { newItem.id = Math.max( ...config.data.map(item => item.id) ) + 1; } else { newItem.id = 1; } 
    // Add the new record to the array 
    config.data.push(newItem); 
// Close the form and re-render the table 
    activeFormEntity = null; 
// Update the table to show the new record
    renderTable(entity); alert("Record added successfully"); }); 
// Insert the form into the cell of the first empty row.
    container.appendChild(form); 
}

document.querySelectorAll(".add-button").forEach(button => 
    { 
        button.addEventListener("click", () => 
            { 
                const entity = button.dataset.entity; 
        // Remember, for which table we are opening the form 
        activeFormEntity = entity; 
        // Update all tables. 
        // The form will remain only in the selected table. 
        Object.keys(schemas).forEach(key => { 
            renderTable(key); }); }); 
    });

    const tabs = document.querySelectorAll(".tab"); 
    const contents = document.querySelectorAll( ".tab-content" ); 
    tabs.forEach(tab => 
        { 
            tab.addEventListener("click", () => { 
    // Delete active state from all tabs 
        tabs.forEach(item => 
            { 
                item.classList.remove("active"); }); 
    // Hide all sections 
        contents.forEach(item => 
            { 
                item.classList.remove("active"); }); 
    // Activate the selected tab 
        tab.classList.add("active"); 
        const contentId = tab.dataset.tab; 
        document .getElementById(contentId) .classList.add("active"); }); 
    });

    Object.keys(schemas).forEach(entity => 
        { renderTable(entity); });