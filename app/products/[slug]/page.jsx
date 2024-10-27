import React from "react";
// import ProductSinglePage from "../../components/ProductDetails";
import Head from "next/head";
import { getProductDetails } from "@/app/services/getProductDetails";
import ProductSinglePage from "@/app/components/ProductDetails";
export async function generateMetadata( productDetails) {
    
    try {

        if (!productDetails) {
            throw new Error("No product details found");
        }

        return {
            title: productDetails?.product_name || "Default Title",
            description:
                productDetails?.short_description || "Default Description",
            openGraph: {
                title: productDetails?.product_name || "Default Title",
                description:
                    productDetails?.short_description || "Default Description",
                url: `https://nagadhat-dev.vercel.app/products/get-product-details?outlet_id=${productDetails?.outlet_id}&product_id=${productDetails?.id}`,
                siteName: "Nagad Hut Bangladesh",
                images: [
                    {
                        url: `https://v3.nagadhat.com/${productDetails?.product_thumbnail}`,
                        width: 800,
                        height: 600,
                        alt: "Product Image",
                    },
                ],
                locale: "en_US",
                type: "website",
            },
        };
    } catch (error) {
        console.error("Error fetching product details:", error); // Detailed error logging
        // Handle error or return fallback metadata
        return {
            title: "Product Not Found",
            description: "Could not load product details",
            openGraph: {
                title: "Product Not Found",
                description: "Could not load product details",
                url: "https://nagadhat-dev.vercel.app/products",
                siteName: "Nagad Hut Bangladesh",
                images: [
                    {
                        url: "https://v3.nagadhat.com/default-thumbnail.jpg",
                        width: 800,
                        height: 600,
                        alt: "Default Image",
                    },
                ],
                locale: "en_US",
                type: "website",
            },
        };
    }
}

const ProductDetailsShows = async ({ searchParams }) => {
    const { outlet_id, product_id } = searchParams;
    
    const productData = await getProductDetails(
        ` outlet_id=${outlet_id}&product_id=${product_id}`
    ); // Wait until data is fetched successfully
    let productDetails = productData?.results;
    return (
        <>
            <div>
                <Head>
                    {outlet_id &&
                        product_id &&
                        generateMetadata(
                            productDetails
                        )}
                </Head>
                <ProductSinglePage
                    productInfo={productDetails}
                ></ProductSinglePage>
            </div>
        </>
    );
};

export default ProductDetailsShows;
