"use client";
import { useEffect, useState } from "react";
import FlipClock from "./FlipClock";
import SectionTitle from "./SectionTitle";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { getFlashSaleProduct } from "../services/getFlashSaleProduct";
// import getAllSettings from "../services/getAllSettings";
import { getHomeFlashSalesProduct } from "../services/getHomeFlashSalesProduct";
import { getFlashSlaeShowOnHomePage } from "../services/getFlashSlaeShowOnHomePage";

function Sales() {
    const [flashSaleProductList, setFlashSaleProductList] = useState([]);
    const [flashSaleEndsTime, setFlashSaleEndsTime] = useState(null);
    const flashSaleArrow = flashSaleProductList?.length > 6 ? true : false;
    const [districtId, setDistrictId] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("districtId") || 47;
        }
        return 47;
    });

    useEffect(() => {
        async function fetchData() {
            const flashSale = await getHomeFlashSalesProduct(districtId);
            let flashProduct = flashSale?.results?.flash_sales_product?.data;
            setFlashSaleProductList(flashProduct);
        }
        fetchData();
    }, [districtId]);

    useEffect(() => {
        async function fetchSettingData() {
            try {
                const settingData = await getFlashSlaeShowOnHomePage();
                const settingAllData = settingData?.results;
                setFlashSaleEndsTime(settingAllData);
            } catch (error) {
                console.error("Failed to fetch setting data", error);
            }
        }
        fetchSettingData();
    }, []);

    const settings = {
        dots: false,
        infinite: flashSaleProductList?.length > 2 ? true : false,
        // infinite: false,
        initialSlide: 0,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        arrows: flashSaleArrow,

        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    arrows: flashSaleProductList?.length > 5 ? true : false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows: flashSaleProductList?.length > 4 ? true : false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: flashSaleProductList?.length > 3 ? true : false,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: flashSaleProductList?.length > 2 ? true : false,
                    initialSlide: 0,
                },
            },
        ],
    };

    return (
        <>
            {flashSaleProductList?.length > 0 && new Date(flashSaleEndsTime?.end_time).getTime() > Date.now() && flashSaleEndsTime?.status &&
                flashSaleEndsTime?.show_on_home  ?
                
                 (
                    <section className={`flash-sale-area `}>
                        <div className="container">
                            <SectionTitle
                                isSale={true}
                                title={`Flash Sale`}
                                districtId={districtId}
                                path={`/all-flashsales-product`}
                            >
                                {flashSaleEndsTime?.end_time && (
                                    <FlipClock
                                        endsAt={flashSaleEndsTime?.end_time}
                                        isflashsalePage={false}
                                    />
                                )}
                            </SectionTitle>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="flash-sale-content-area-grid">
                                        <Slider {...settings}>
                                            {flashSaleProductList?.length > 0 &&
                                                flashSaleProductList?.map(
                                                    (product) => (
                                                        <div className="px-1 px-md-2">
                                                            <ProductCard
                                                                key={product.id}
                                                                item={product}
                                                            />
                                                        </div>
                                                    )
                                                )}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ):""}
        </>
    );
}

export default Sales;
