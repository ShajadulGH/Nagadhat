"use client";
import { useState, useEffect, useRef } from "react";
import SectionTitle from "./SectionTitle";
import ProductCard from "./ProductCard";
import { getHomeJustForYouProduct } from "../services/getHomeJustForYouProduct";
import LoadMore from "./LoadMore";

function JustForYou() {
    const [jfyProducts, setJfyProducts] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef(null);

    useEffect(() => {
        const initialDistrictId = localStorage.getItem("districtId");
        setDistrictId(initialDistrictId ? parseInt(initialDistrictId) : 47);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const justForYouList = await getHomeJustForYouProduct(
                    districtId,
                    page,
                    24
                );
                const newProducts = justForYouList?.results?.just_for_you?.data || [];
                
                setJfyProducts((prevProducts) => [...prevProducts, ...newProducts]);
            } catch (error) {
                console.error("Error fetching 'Just For You' products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (districtId) {
            fetchProducts();
        }
    }, [districtId, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loading]);

    return (
        <div className="container">
            <div className="nh-just-for-you">
                <SectionTitle
                    title="Just For You"
                    target="justForYou"
                    path="/viewallproduct"
                />

                <div className="row just-for-random-product">
                    <div className="col-md-12">
                        <div className="flash-sale-content-area">
                            {jfyProducts?.map((product, index) => (
                                <ProductCard
                                    key={`${product.id}-${product.slug}-${index}`}
                                    item={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {loading && <LoadMore title={"Loading more products..."}/> }
                <div ref={observerRef}/>
            </div>
        </div>
    );
}

export default JustForYou;
