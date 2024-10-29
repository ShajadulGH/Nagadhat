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
    const [districtId, setDistrictId] = useState(null);

    const flashSaleArrow = flashSaleProductList?.length > 6 ? true : false;

    useEffect(() => {
        const initialDistrictId = localStorage.getItem("districtId");
        setDistrictId(initialDistrictId ? parseInt(initialDistrictId) : 47);
    }, []);

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
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    arrows: flashSaleArrow,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    arrows: flashSaleArrow,
                    initialSlide: 0,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: flashSaleArrow,
                    initialSlide: 0,
                },
            },
        ],
    };

    return (
        <>
            {flashSaleProductList?.length > 0 &&
                flashSaleEndsTime?.end_time &&
                flashSaleEndsTime?.status &&
                flashSaleEndsTime?.show_on_home && (
                    <section className={`flash-sale-area `}>
                        <div className="container">
                            <SectionTitle
                                isSale={true}
                                title={`Flash Sale`}
                                target={"flashSale"}
                                path="/viewallproduct"
                            >
                                {flashSaleEndsTime?.end_time && (
                                    <FlipClock
                                        endsAt={flashSaleEndsTime?.end_time}
                                    />
                                )}
                            </SectionTitle>
                            <div className="row">
                                <div className="col-md-12">
                                    <div
                                        className={`${"flash-sale-content-area-grid "}`}
                                    >
                                        <Slider {...settings}>
                                            {flashSaleProductList?.length > 0 &&
                                                flashSaleProductList?.map(
                                                    (product) => (
                                                        <ProductCard
                                                            key={product.id}
                                                            item={product}
                                                        />
                                                    )
                                                )}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
        </>
    );
}

export default Sales;
