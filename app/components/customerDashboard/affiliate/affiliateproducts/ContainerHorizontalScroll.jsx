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
                    <div className="box one">1</div>
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
