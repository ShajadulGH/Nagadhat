"use client";
import LodingFixed from "@/app/components/LodingFixed";
import NoDataFound from "@/app/components/NoDataFound";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

const ContainerHorizontalScroll = ({
    activeContainerData,
    isPending,
    containerActiveId,
    setContainerActiveId,
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const handleWheel = (event) => {
            event.preventDefault();
            container.scrollLeft += event.deltaY;
        };
        container.addEventListener("wheel", handleWheel);
        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const handleActiveContainer = (activeID, activeStatus) => {
        if (activeStatus === 0) {
            Swal.fire({
                title: "Container Date Line Expired!",
                text: "This container is no longer available.",
                icon: "error",
            });
        }
        setContainerActiveId(activeID);
    };

    return (
        <div ref={containerRef} className="scroll-container">
            {isPending ? (
                <LodingFixed />
            ) : (
                <div className="scroll-content">
                    {activeContainerData?.length > 0 ? (
                        activeContainerData.map((item) => {
                            const {
                                container_name,
                                container_value,
                                quantity,
                                status,
                                id,
                            } = item;

                            const isDisabled = status === 0;

                            return (
                                <div
                                    key={id}
                                    className={`box one p-3 ${
                                        isDisabled
                                            ? "disabled bg-gray-300 opacity-50 "
                                            : "active-container-bg"
                                    } ${
                                        containerActiveId === id
                                            ? "after-click-bg"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleActiveContainer(id, status)
                                    }
                                >
                                    <div className="overflow-hidden w-100 d-flex flex-column justify-content-center align-content-center">
                                        <div className="d-flex align-items-center justify-content-between pb-2">
                                            <div className="flex-1">
                                                <p>Container Number</p>
                                            </div>
                                            <div className="flex-1 ps-2">
                                                <strong>
                                                    {container_name || "----"}
                                                </strong>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between pb-2">
                                            <div className="flex-1">
                                                <p>Container Value</p>
                                            </div>
                                            <div className="flex-1 ps-2">
                                                <strong>
                                                    ৳{" "}
                                                    {container_value.toFixed(
                                                        2
                                                    ) || "----"}
                                                </strong>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between pb-2">
                                            <div className="flex-1">
                                                <p>Quantity</p>
                                            </div>
                                            <div className="flex-1 ps-2">
                                                <strong>{quantity}</strong>
                                            </div>
                                        </div>

                                        {/* <div className="d-flex align-items-center justify-content-between pb-2">
                                            <div className="flex-1">
                                                Item
                                            </div>
                                            <div className="ps-2 flex-1 d-flex align-items-center flex-wrap gap-1">
                                                <span className="container-top-tags px-2 py-1 bg-black text-white">
                                                    Hello
                                                </span>
                                                <span className="container-top-tags px-2 py-1 bg-black text-white">
                                                    world
                                                </span>
                                                <span className="container-top-tags px-2 py-1 bg-black text-white">
                                                    Hello
                                                </span>
                                                <span className="container-top-tags px-2 py-1 bg-black text-white">
                                                    world
                                                </span>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <NoDataFound />
                    )}
                </div>
            )}
        </div>
    );
};

export default ContainerHorizontalScroll;
