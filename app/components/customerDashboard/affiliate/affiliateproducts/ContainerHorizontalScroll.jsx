import { useEffect, useRef } from "react";

const ContainerHorizontalScroll = () => {
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

    return (
        <>
            <div ref={containerRef} className="scroll-container">
                <div className="scroll-content">
                    <div className="box one p-3">
                        <div className="overflow-hidden w-100 d-flex flex-column justify-content-center align-content-center">
                            <div className="d-flex align-items-center justify-content-between pb-2">
                                <div className="fs-6 flex-1">
                                    Container Number{" "}
                                </div>
                                <div className="fs-6 flex-1">01</div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between pb-2">
                                <div className="fs-6 flex-1">
                                    Container Value{" "}
                                </div>
                                <div className="fs-6 flex-1">$ 5861</div>
                            </div>

                            <div className="d-flex align-items-center justify-content-between pb-2">
                                <div className="fs-6 flex-1">Quantity </div>
                                <div className="fs-6 flex-1">1520</div>
                            </div>

                            <div className="d-flex align-items-center justify-content-between pb-2">
                                <div className="fs-6 flex-1">Item </div>
                                <div className=" flex-1 d-flex align-items-center flex-wrap gap-1">
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
                            </div>
                        </div>
                    </div>
                    <div className="box two">2</div>
                    <div className="box three">3</div>
                    <div className="box four">Last</div>
                    <div className="box one">1</div>
                    <div className="box two">2</div>
                    <div className="box three">3</div>
                    <div className="box four">Last</div>
                </div>
            </div>
        </>
    );
};

export default ContainerHorizontalScroll;
