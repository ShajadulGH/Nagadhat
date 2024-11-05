import React from "react";
// import ProductSinglePage from "../../components/ProductDetails";
// import Head from "next/head";
import { getProductDetails } from "@/app/services/getProductDetails";
import ProductSinglePage from "@/app/components/ProductDetails";

// import { getHomeJustForYouProduct } from "@/app/services/getHomeJustForYouProduct";
// import { getHomeFlashSalesProduct } from "@/app/services/getHomeFlashSalesProduct";
// import { getHomeCategory } from "@/app/services/getHomeCategory";

// export async function generateMetadata( productDetails) {

//     try {

//         if (!productDetails) {
//             throw new Error("No product details found");
//         }

//         return {
//             title: productDetails?.product_name || "Default Title",
//             description:
//                 productDetails?.short_description || "Default Description",
//             openGraph: {
//                 title: productDetails?.product_name || "Default Title",
//                 description:
//                     productDetails?.short_description || "Default Description",
//                 url: `https://nagadhat-dev.vercel.app/products/get-product-details?outlet_id=${productDetails?.outlet_id}&product_id=${productDetails?.id}`,
//                 siteName: "Nagad Hut Bangladesh",
//                 images: [
//                     {
//                         url: `https://v3.nagadhat.com/${productDetails?.product_thumbnail}`,
//                         width: 800,
//                         height: 600,
//                         alt: "Product Image",
//                     },
//                 ],
//                 locale: "en_US",
//                 type: "website",
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching product details:", error); // Detailed error logging
//         // Handle error or return fallback metadata
//         return {
//             title: "Product Not Found",
//             description: "Could not load product details",
//             openGraph: {
//                 title: "Product Not Found",
//                 description: "Could not load product details",
//                 url: "https://nagadhat-dev.vercel.app/products",
//                 siteName: "Nagad Hut Bangladesh",
//                 images: [
//                     {
//                         url: "https://v3.nagadhat.com/default-thumbnail.jpg",
//                         width: 800,
//                         height: 600,
//                         alt: "Default Image",
//                     },
//                 ],
//                 locale: "en_US",
//                 type: "website",
//             },
//         };
//     }
// }

const ProductDetailsShows = async ({ searchParams, params }) => {
    const { outlet_id } = searchParams;
    let outletInfo = null;
    let productDetails = null;

    const { slug } = params;
    try {
        const productInfo = await getProductDetails(
            `slug=${slug}&outlet_id=${outlet_id}`
        );
    
        if (productInfo?.message === "Product found in other outlets.") {
            outletInfo = productInfo?.available_outlets;
        }
        if (
            productInfo?.results &&
            productInfo.message != "Product found in other outlets."
        ) {
            productDetails = productInfo.results;
        }
    } catch (error) {
        console.error(error);
    }

    

    return (
        <>
            <div>
                {/* <Head>
                    {outlet_id &&
                        product_id &&
                        generateMetadata(
                            productDetails
                        )}
                </Head> */}
                <ProductSinglePage
                    productInfo={productDetails}
                    outletInfo={outletInfo}
                />
            </div>
        </>
    );
};
 
// export async function generateStaticParams() {
//     const districtId = 47; // Replace with actual district ID

//     try {
//         // Fetch Just For You Products
//         const justForYouData = await getHomeJustForYouProduct(districtId);
//         const justForYouProducts =
//             justForYouData?.results?.just_for_you?.data || [];

//         // Fetch Flash Sales Products
//         const flashSalesData = await getHomeFlashSalesProduct(districtId);
//         const flashSalesProducts =
//             flashSalesData?.results?.flash_sales_product?.data || [];

//         // Fetch Flash Sales Products
//         const categoryList = await getHomeCategory();
//         const categoryInfo = categoryList?.results?.category?.data || [];

//         // Combine product slugs from both datasets
//         const allProducts = [
//             ...justForYouProducts,
//             ...flashSalesProducts,
//             ...categoryInfo,
//         ];

//         return allProducts.map((product) => ({
//             slug: product.slug,
//         }));
//     } catch (error) {
//         console.error("Error fetching product parameters:", error);
//         return [];
//     }
// }

export default ProductDetailsShows;
