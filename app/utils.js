// For Live
export const apiBaseUrl = "https://v3.nagadhat.com/api";
export const NagadhatPublicUrl = "https://v3.nagadhat.com";

// For Live staging way
// export const apiBaseUrl = "https://v3.staging.nagadhat.com/api";
// export const NagadhatPublicUrl = "https://v3.staging.nagadhat.com";

// For Localhost 1 way
// export const apiBaseUrl = "http://nagadhat-v3.test/api";
// export const NagadhatPublicUrl = "http://nagadhat-v3.test";

// For Localhost 2 way
// export const apiBaseUrl = "http://127.0.0.1:8000/api";
// export const NagadhatPublicUrl = "http://127.0.0.1:8000";

export const filterByStatus = (arr) => {
    if (!Array.isArray(arr) || arr.length < 1) {
        return [];
    }
    return arr.filter((item) => {
        if (item.status === 1) {
            if (item.child_categories && item.child_categories.length > 0) {
                item.child_categories = filterByStatus(item.child_categories);
            }
            return true;
        } else {
            return false;
        }
    });
};
// Function to truncate title
export const truncateTitle = (title, maxLength = 24) => {
    if (title?.length > maxLength) {
        return title.slice(0, maxLength) + "...";
    }
    return title;
};

export const filterByHomePageTopMenu = (arr) => {
    if (!Array.isArray(arr) || arr.length < 1) {
        return [];
    }
    return arr.filter((item) => {
        if (item.home_page_top_menu === 1) {
            if (item.child_categories && item.child_categories.length > 0) {
                item.child_categories = filterByHomePageTopMenu(
                    item.child_categories
                );
            }
            return true;
        } else {
            return false;
        }
    });
};

export const filterBySliderMenuView = (arr) => {
    if (!Array.isArray(arr) || arr.length < 1) {
        return [];
    }
    return arr.filter((item) => {
        if (item.on_slider_menu_view === 1) {
            if (item.child_categories && item.child_categories.length > 0) {
                item.child_categories = filterBySliderMenuView(
                    item.child_categories
                );
            }
            return true;
        } else {
            return false;
        }
    });
};

//define meta data for product details page
export const productDetailsPageMetaDataHandler = (productInfo) => {
    return {
        openGraph: {
            title: productInfo?.product_name,
            description: productInfo?.Short_description,
            url: "https://nagadhat.com.bd/",
            siteName: "nagadhat.com.bd",
            images: [
                {
                    url: `${NagadhatPublicUrl}/${productInfo?.product_thumbnail}`, // Must be an absolute URL
                    width: 800,
                    height: 600,
                },
                {
                    url: `${NagadhatPublicUrl}/${productInfo?.product_thumbnail}`, // Must be an absolute URL
                    width: 1800,
                    height: 1600,
                    alt: "My custom alt",
                },
            ],
            locale: "en_US",
            type: "website",
        },
    };
};

// check the name is existing this array
export const existingIndex = (arr, name) => {
    return arr?.findIndex((item) => item.name === name);
};

//* Shortens a string to a specified length.
export function shortenString(str, length) {
    if (typeof str !== "string" || typeof length !== "number") {
        console.log(
            "Invalid input: First argument must be a string and second argument must be a number."
        );
    }

    if (length <= 0) {
        return "";
    }

    if (str.length <= length) {
        return str;
    }

    return str.slice(0, length) + "...";
}

// This function set recent view product id

export function storeProductId(productId) {
    console.log(productId);
    if (typeof localStorage === "undefined") {
        return;
    }

    let storedProductIds = JSON.parse(localStorage.getItem("recentlyViewProductIds")) || [];
    
    const existingProductIndex = storedProductIds.indexOf(productId);

    if (existingProductIndex === -1) {
        storedProductIds = [productId, ...storedProductIds];
        if (storedProductIds.length > 12) {
            storedProductIds.pop(); // Remove the last element (oldest)
        }
    } else {
        storedProductIds.splice(existingProductIndex, 1);
        storedProductIds = [productId, ...storedProductIds];
    }

    // Update localStorage with the modified array
    localStorage.setItem(
        "recentlyViewProductIds",
        JSON.stringify(storedProductIds)
    );
}


// recent view product List
export function recentViewProductList() {
    if (typeof localStorage === "undefined") {
        return; // Local storage not available
    }
    const product =
        JSON.parse(localStorage.getItem("recentlyViewProducts")) || [];
    return product;
}

// add to cart button in local storage
export function addToCartInLocalStorage(product) {
    if (typeof localStorage === "undefined") {
        return; // Local storage not available
    }

    let storedProducts = JSON.parse(localStorage.getItem("addToCart")) || [];

    // Check if product already exists (by id and variation id)
    const existingProductIndex = storedProducts.findIndex(
        (p) =>
            p.product_id === product.product_id &&
            p.outlet_id === product.outlet_id &&
            p.product_variation_id === product.product_variation_id
    );

    if (existingProductIndex === -1) {
        // If product is unique, add it to the array
        storedProducts = [product, ...storedProducts];
    } else {
        // If product exists, increment its quantity
        storedProducts[existingProductIndex].quantity += product.quantity;
    }

    // Update localStorage with the modified array
    localStorage.setItem("addToCart", JSON.stringify(storedProducts));
}

export function addToCartProductList() {
    if (typeof localStorage === "undefined") {
        return; // Local storage not available
    }
    const product = JSON.parse(localStorage.getItem("addToCart")) || [];
    return product;
}
// Function to store buy now product data in local storage
export const setProductData = (productData) => {
    // Check if 'window' is defined (i.e., ensure this code runs only on the client side)
    if (typeof window !== "undefined") {
        const dataSet = [productData];
        localStorage.setItem("buy-now", JSON.stringify(dataSet));
    }
};

// Function to retrieve buy now product data from local storage
export const getBuyNowProductData = () => {
    // Check if 'window' is defined (i.e., ensure this code runs only on the client side)
    if (typeof window !== "undefined") {
        const productData = localStorage.getItem("buy-now");
        // Return parsed product data if it exists, otherwise return null
        return productData ? JSON.parse(productData) : null;
    }
    return null;
};
// Function to delete buy now product data from local storage
export const deleteBuyNowProductData = () => {
    // Check if 'window' is defined (i.e., ensure this code runs only on the client side)
    if (typeof window !== "undefined") {
        localStorage.removeItem("buy-now");
    }
};

// storeUserAgent function captures the user agent using navigator.userAgent and stores it in local storage.
export function storeUserAgent() {
    if (typeof window !== "undefined") {
        const userAgent = navigator.userAgent;
        localStorage.setItem("userAgent", userAgent);
    }
}

//getUserAgent function retrieves the user agent from local storage.
export function getUserAgent() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("userAgent");
    }
    return null;
}

// utils.js

export function resendOTP() {
    const otpResatTime = 10;

    const element = document.getElementById("resend-otp");
    if (!element) {
        console.error("Element with ID 'resend-otp' not found");
        return;
    }

    let countdownTime = otpResatTime;
    const otpInterval = setInterval(function () {
        countdownTime -= 1;
        element.innerHTML = `${countdownTime} s`;
    }, 1000);

    const myTimeout = setTimeout(myGreeting, otpResatTime * 1000);
    function myGreeting() {
        element.innerHTML = "";
        document.getElementById("resend-otp-btn").classList.remove("d-none");
        clearInterval(otpInterval);
    }
}

//get location id, outlet id
export function outletLocationInfo() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("");
    }
    return null;
}

// function that takes an array as an argument and returns the total quantity of products:
export function getTotalQuantity(products) {
    let totalQuantity = 0;

    products?.forEach((product) => {
        totalQuantity += product?.quantity;
    });

    return totalQuantity;
}

//set selected Card id's
export function setSelectedCardIds(cartIds) {
    if (typeof window !== "undefined") {
        localStorage.setItem("selectedCardIds", JSON.stringify(cartIds));
    }
}
//get selected card id's
export const getSelectedCardIds = () => {
    if (typeof window !== "undefined") {
        const productData = localStorage.getItem("selectedCardIds");
        return JSON.parse(productData);
    }
};

export function requestPage(route) {
    if (typeof window !== "undefined") {
        localStorage.setItem("requestPage", JSON.stringify(route));
    }
}

//getUserAgent function retrieves the user agent from local storage.
export function getRequestPath() {
    if (typeof window !== "undefined") {
        const requestRoute =
            (localStorage.getItem("requestPage") &&
                JSON.parse(localStorage.getItem("requestPage"))) ||
            "/dashboard";
        return requestRoute;
    }
    return null;
}
export function removeRequestPath() {
    if (typeof window !== "undefined") {
        const requestRoute = localStorage.removeItem("requestPage");
        return requestRoute;
    }
    return null;
}

// get oulate localstorage

export function getOutletInfo() {
    if (typeof window !== "undefined") {
        if (typeof window !== "undefined") {
            return localStorage.getItem("outletId") || 3;
        }
    }
    return 3;
}
