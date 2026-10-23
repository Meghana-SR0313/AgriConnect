
"use strict";

/* =========================================
   1. HOMEPAGE FLOWER SEARCH
   ========================================= */

const flowerSearch = document.getElementById("flowerSearch");

if (flowerSearch) {
    flowerSearch.addEventListener("submit", function (event) {
        event.preventDefault();

        const searchInput = document.getElementById("searchInput");
        const query = searchInput ? searchInput.value.trim() : "";

        if (!query) {
            alert("Please enter a flower name or location.");
            return;
        }

        window.location.href =
            "marketplace.html?q=" + encodeURIComponent(query);
    });
}


/* =========================================
   2. MARKETPLACE SAMPLE FLOWER DATA
   Replace sample data with backend data later.
   ========================================= */

const flowers = [
    {
        name: "Rose",
        price: 120,
        quantity: 500,
        location: "Hassan, Karnataka",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiojuoJePUsAu9TmSGuSB3iTPkHt9DxDzLTYfBGiiNqA&s=10"
    },
    {
        name: "Marigold",
        price: 60,
        quantity: 1000,
        location: "Pune, Maharashtra",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1tBWtpSqbUcpz3zbAtUoFdacIm37bM1ms338rw_7Hg&s=10"
    },
    {
        name: "Jasmine",
        price: 200,
        quantity: 300,
        location: "Madurai, Tamil Nadu",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM7jNAHmpfjpa8Ip5pRevIjSs3DXxvifBk4gZdGl9A2Q&s=10"
    },
    {
        name: "Chrysanthemum",
        price: 90,
        quantity: 400,
        location: "Bengaluru, Karnataka",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyE8lVaPElp6-hAaum_Iem47-dRCc7mpitKBh2N1VPLQ&s=10"
    },
    {
        name: "Lily",
        price: 250,
        quantity: 200,
        location: "Shivamogga, Karnataka",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC-8MFOFDkhiumGSw-_u0UX4aispkZ9p8YCmYwu5CKJw&s=10"
    },
    {
        name: "Orchid",
        price: 300,
        quantity: 150,
        location: "Coorg, Karnataka",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAfjhVjxvIHoKNy1Fi-8UZQHB78URT8lJdED3XxosQA&s=10"
    }
];


/* =========================================
   3. MARKETPLACE FILTERS AND LISTINGS
   ========================================= */

const flowerGrid = document.getElementById("flowerGrid");

if (flowerGrid) {
    const flowerType = document.getElementById("flowerType");
    const locationFilter = document.getElementById("locationFilter");
    const maxPrice = document.getElementById("maxPrice");
    const sortBy = document.getElementById("sortBy");
    const resultCount = document.getElementById("resultCount");
    const emptyState = document.getElementById("emptyState");
    const applyFilters = document.getElementById("applyFilters");
    const clearFilters = document.getElementById("clearFilters");

    function renderFlowers() {
        const type = flowerType.value.trim().toLowerCase();
        const location = locationFilter.value.trim().toLowerCase();
        const priceLimit = maxPrice.value.trim();

        let results = flowers.filter(function (flower) {
            const matchesType =
                !type || flower.name.toLowerCase() === type;

            const matchesLocation =
                !location ||
                flower.location.toLowerCase().includes(location);

            const matchesPrice =
                priceLimit === "" ||
                flower.price <= Number(priceLimit);

            return matchesType && matchesLocation && matchesPrice;
        });

        if (sortBy.value === "low") {
            results.sort(function (a, b) {
                return a.price - b.price;
            });
        } else if (sortBy.value === "high") {
            results.sort(function (a, b) {
                return b.price - a.price;
            });
        } else if (sortBy.value === "name") {
            results.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        }

        flowerGrid.innerHTML = "";

        if (resultCount) {
            resultCount.textContent =
                `${results.length} flower listing(s) found`;
        }

        if (emptyState) {
            emptyState.style.display =
                results.length ? "none" : "block";
        }

        results.forEach(function (flower) {
            const column = document.createElement("div");
            column.className = "col-md-6 col-xl-4";

            const card = document.createElement("article");
            card.className = "listing-card";

            const image = document.createElement("img");
            image.className = "listing-image";
            image.src = flower.image;
            image.alt = flower.name;
            image.loading = "lazy";

            image.addEventListener("error", function () {
                image.alt = flower.name + " image unavailable";
            });

            const body = document.createElement("div");
            body.className = "listing-body";

            const title = document.createElement("h5");
            title.className = "fw-bold";
            title.textContent = flower.name;

            const price = document.createElement("p");
            price.className = "price";
            price.textContent = `₹${flower.price} / kg`;

            const quantity = document.createElement("p");
            quantity.className = "listing-meta";
            quantity.textContent =
                `Available quantity: ${flower.quantity} kg`;

            const place = document.createElement("p");
            place.className = "listing-meta";
            place.textContent = `📍 ${flower.location}`;

            const button = document.createElement("a");
            button.className = "btn btn-agri w-100 mt-2";
            button.href = "login.html";
            button.textContent = "Login to connect";

            body.append(title, price, quantity, place, button);
            card.append(image, body);
            column.append(card);
            flowerGrid.append(column);
        });
    }

    if (applyFilters) {
        applyFilters.addEventListener("click", renderFlowers);
    }

    if (clearFilters) {
        clearFilters.addEventListener("click", function () {
            flowerType.value = "";
            locationFilter.value = "";
            maxPrice.value = "";
            sortBy.value = "default";

            renderFlowers();
        });
    }

    if (sortBy) {
        sortBy.addEventListener("change", renderFlowers);
    }

    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");

    if (query) {
        const matchedType = [...flowerType.options].find(
            function (option) {
                return option.value &&
                    option.value.toLowerCase() ===
                    query.trim().toLowerCase();
            }
        );

        if (matchedType) {
            flowerType.value = matchedType.value;
        } else {
            locationFilter.value = query;
        }
    }

    renderFlowers();
}


/* =========================================
   4. LOGIN FORM
   This is only frontend validation.
   Real authentication requires a backend.
   ========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = document.getElementById("loginMessage");

        if (message) {
            message.className = "auth-message text-danger";
            message.textContent =
                "Login UI is ready. Backend authentication is not connected yet.";
        }
    });
}


/* =========================================
   5. REGISTRATION FORM
   Supports Farmer, Seed Supplier, Buyer,
   and Florist. Does not create accounts yet.
   ========================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const passwordInput =
            document.getElementById("registerPassword");

        const confirmPasswordInput =
            document.getElementById("confirmPassword");

        const message =
            document.getElementById("registerMessage");

        const selectedRole =
            document.querySelector('input[name="role"]:checked');

        if (!selectedRole) {
            message.className = "register-message text-danger";
            message.textContent = "Please select your account role.";
            return;
        }

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length < 8) {
            message.className = "register-message text-danger";
            message.textContent =
                "Password must contain at least 8 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.className = "register-message text-danger";
            message.textContent = "Passwords do not match.";
            confirmPasswordInput.focus();
            return;
        }

        const validRoles = [
            "FARMER",
            "SEED_SUPPLIER",
            "BUYER",
            "FLORIST"
        ];

        if (!validRoles.includes(selectedRole.value)) {
            message.className = "register-message text-danger";
            message.textContent = "Please select a valid account role.";
            return;
        }

        message.className = "register-message text-success";
        message.textContent =
            `Form validated for ${selectedRole.value.replace("_", " ").toLowerCase()}. ` +
            "Permanent registration will work after backend integration.";
    });
}


/* =========================================
   6. FARMER DASHBOARD: ADD FLOWER LISTING
   ========================================= */

const addFlowerForm = document.getElementById("addFlowerForm");

if (addFlowerForm) {
    addFlowerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name =
            document.getElementById("newFlower").value.trim();

        const quantity =
            Number(document.getElementById("newQuantity").value);

        const price =
            Number(document.getElementById("newPrice").value);

        const date =
            document.getElementById("newAvailability").value;

        if (
            !name ||
            !Number.isFinite(quantity) ||
            !Number.isFinite(price) ||
            quantity <= 0 ||
            price <= 0 ||
            !date
        ) {
            alert("Please enter valid flower listing details.");
            return;
        }

        const row = document.createElement("tr");

        [name, `${quantity} kg`, `₹${price.toFixed(2)}`]
            .forEach(function (value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const dateCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = "status-badge";
        badge.textContent = date;

        dateCell.appendChild(badge);
        row.appendChild(dateCell);

        document.getElementById("farmerListings").appendChild(row);

        const rows = document.querySelectorAll("#farmerListings tr");

        document.getElementById("listingCount").textContent =
            rows.length;

        let totalQuantity = 0;

        rows.forEach(function (existingRow) {
            const quantityText = existingRow.cells[1].textContent;

            totalQuantity +=
                Number(quantityText.replace(/[^\d.]/g, "")) || 0;
        });

        document.getElementById("quantityCount").textContent =
            `${totalQuantity.toLocaleString()} kg`;

        addFlowerForm.reset();

        const modalElement =
            document.getElementById("addFlowerModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        }

        alert("Demo listing added successfully!");
    });
}


/* =========================================
   7. BUYER DASHBOARD: VIEW FLOWER OFFER
   ========================================= */

function showFlowerMessage(flowerName) {
    alert(
        "You selected " + flowerName +
        ". Farmer offers and ordering will be connected to the backend later."
    );
}


/* =========================================
   8. BUYER DASHBOARD: FLOWER REQUIREMENTS
   ========================================= */

const requirementForm = document.getElementById("requirementForm");

if (requirementForm) {
    requirementForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const dateInput =
            document.getElementById("requiredDate");

        const selectedDate = dateInput.value;

        if (
            !selectedDate ||
            (dateInput.min && selectedDate < dateInput.min)
        ) {
            alert("Please select today or a future delivery date.");
            dateInput.focus();
            return;
        }

        const flower =
            document.getElementById("requiredFlower").value;

        const quantity =
            Number(document.getElementById("requiredQuantity").value);

        const price =
            Number(document.getElementById("requiredPrice").value);

        const location =
            document.getElementById("requiredLocation").value.trim();

        if (
            !flower ||
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isFinite(price) ||
            price <= 0 ||
            !location
        ) {
            alert("Please enter valid requirement details.");
            return;
        }

        const table = document.getElementById("requirementsTable");

        if (!table) {
            alert("The requirements table could not be found.");
            return;
        }

        const row = document.createElement("tr");

        const formattedDate = new Date(selectedDate + "T00:00:00")
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        const values = [
            flower,
            quantity + " kg",
            "₹" + price,
            formattedDate
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        statusBadge.className = "badge text-bg-success";
        statusBadge.textContent = "Active";

        statusCell.appendChild(statusBadge);
        row.appendChild(statusCell);

        table.appendChild(row);

        const count = document.getElementById("requirementCount");

        if (count) {
            count.textContent = Number(count.textContent) + 1;
        }

        requirementForm.reset();

        const modalElement =
            document.getElementById("requirementModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        }

        alert("Requirement added successfully! Demo only; not saved permanently.");
    });
}


/* =========================================
   9. SET MINIMUM DATE TO TODAY
   Uses the user's device-local date.
   ========================================= */

function setMinimumDeliveryDates() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const today = `${year}-${month}-${day}`;

    document.querySelectorAll('input[type="date"]').forEach(
        function (input) {
            input.min = today;
        }
    );
}

setMinimumDeliveryDates();


/* =========================================
   10. SEED SUPPLIER DASHBOARD
   Add seed products and calculate stock.
   ========================================= */

const seedForm = document.getElementById("seedForm");

if (seedForm) {
    seedForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name =
            document.getElementById("seedName").value;

        const variety =
            document.getElementById("seedVariety").value.trim();

        const price =
            Number(document.getElementById("seedPrice").value);

        const stock =
            Number(document.getElementById("seedStock").value);

        if (
            !name ||
            !variety ||
            !Number.isFinite(price) ||
            !Number.isFinite(stock) ||
            price <= 0 ||
            stock < 0
        ) {
            alert("Please enter valid seed product details.");
            return;
        }

        const table = document.getElementById("seedTable");

        if (!table) {
            alert("The seed products table could not be found.");
            return;
        }

        const row = document.createElement("tr");

        const values = [
            name,
            variety,
            "₹" + price.toFixed(2),
            stock + " kg"
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const availabilityCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className =
            stock === 0
                ? "badge text-bg-danger"
                : stock < 20
                    ? "badge text-bg-warning"
                    : "badge text-bg-success";

        badge.textContent =
            stock === 0
                ? "Out of Stock"
                : stock < 20
                    ? "Low Stock"
                    : "In Stock";

        availabilityCell.appendChild(badge);
        row.appendChild(availabilityCell);

        table.appendChild(row);

        const productCount =
            document.getElementById("productCount");

        if (productCount) {
            productCount.textContent =
                Number(productCount.textContent) + 1;
        }

        const stockCount =
            document.getElementById("stockCount");

        if (stockCount) {
            const previousStock =
                Number.parseFloat(stockCount.textContent) || 0;

            stockCount.textContent =
                (previousStock + stock) + " kg";
        }

        seedForm.reset();

        const modalElement =
            document.getElementById("seedModal");

        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        }

        alert("Seed product added! Demo only; not saved permanently.");
    });
}


/* =========================================
   11. AUTOMATIC COPYRIGHT YEAR
   Add class="current-year" where needed.
   ========================================= */

document.querySelectorAll(".current-year").forEach(
    function (element) {
        element.textContent = new Date().getFullYear();
    }
);

/* =========================================
   12. FARMER: REQUEST SEEDS
   Frontend demo only; not saved permanently.
   ========================================= */

function requestSeeds(name, variety, price) {
    document.getElementById("requestedSeed").value = name;
    document.getElementById("requestedVariety").value = variety;
    document.getElementById("requestedPrice").value = price;

    document.getElementById("seedRequestDetails").textContent =
        name + " (" + variety + ") — ₹" + price + " per kg";

    document.getElementById("seedRequestQuantity").value = "";

    const modal = document.getElementById("seedRequestModal");

    bootstrap.Modal.getOrCreateInstance(modal).show();
}

const seedRequestForm = document.getElementById("seedRequestForm");

if (seedRequestForm) {
    seedRequestForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("requestedSeed").value;
        const variety = document.getElementById("requestedVariety").value;
        const price = Number(document.getElementById("requestedPrice").value);
        const quantity = Number(
            document.getElementById("seedRequestQuantity").value
        );

        if (!name || !variety || price <= 0 ||
            !Number.isFinite(quantity) || quantity <= 0) {
            alert("Please enter a valid seed quantity.");
            return;
        }

        const table = document.getElementById("seedRequestsTable");

        if (!table) {
            alert("Seed requests table was not found.");
            return;
        }

        // Remove the initial empty-state row.
        if (
            table.rows.length === 1 &&
            table.rows[0].cells.length === 1
        ) {
            table.innerHTML = "";
        }

        const row = document.createElement("tr");

        const values = [
            name,
            variety,
            quantity + " kg",
            "₹" + (price * quantity).toFixed(2)
        ];

        values.forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "badge text-bg-warning";
        badge.textContent = "Pending";
        statusCell.appendChild(badge);
        row.appendChild(statusCell);

        table.appendChild(row);

        seedRequestForm.reset();

        const modal = document.getElementById("seedRequestModal");
        bootstrap.Modal.getOrCreateInstance(modal).hide();

        alert("Seed request submitted! Demo only; not saved permanently.");
    });
}

