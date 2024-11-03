"use client"
import React, { useEffect, useState } from 'react';
import { fetchRecentViewProducts } from '../services/getRecentViewProduct';
import SectionTitle from './SectionTitle';
import Slider from 'react-slick';
import { useSession } from 'next-auth/react';
import ProductCard from './ProductCard';
import { getRecentViewProductsById } from '../services/getRecentViewProductsById';

const RecentViewProduc = () => {
    const [recentViewProductList, setRecentViewProductList] = useState([]);
    const [outletId, setOutletId] = useState(null);

    // Fetch outlet ID from localStorage
    useEffect(() => {
        const initialOutletId = localStorage.getItem('outletId');
        setOutletId(initialOutletId ? parseInt(initialOutletId) : 3);
    }, []);

    // Fetch recent view products based on session or local storage
    useEffect(() => {
        const recentViewConfigure = async () => {
            if (typeof window !== 'undefined' && outletId) {
                try {
                    const storedProducts = JSON.parse(localStorage.getItem('recentlyViewProductIds')) || [];

                    if (storedProducts.length > 0) {
                        const recentViewProducts = await getRecentViewProductsById(outletId, storedProducts);
                        if (recentViewProducts.code == 200) {
                            setRecentViewProductList(recentViewProducts?.results?.product_information
                            );
                        } else {
                            console.warn('No recent view products fetched');
                        }
                    }
                } catch (error) {
                    console.error('Error fetching recently viewed products:', error);
                }
            }
        };

        recentViewConfigure();
    }, [outletId]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: true,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: true,
                    initialSlide: 0,
                },
            },
        ],
    };

    return (
        <>
            {recentViewProductList.length > 0 &&
                <section className="bg-white">
                    <div className="container">
                        <SectionTitle
                            title="Recent View"
                            path="/all-recent-view-product"
                        />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="flash-sale-content-area-grid">
                                    <Slider {...settings}>
                                        {recentViewProductList.map((product) => (
                                                <ProductCard key={product.id} item={product} />
                                            ))
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default RecentViewProduc;
