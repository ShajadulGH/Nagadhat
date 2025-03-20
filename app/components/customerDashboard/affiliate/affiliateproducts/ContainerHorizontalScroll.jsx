"use client";
import LodingFixed from "@/app/components/LodingFixed";
import NoDataFound from "@/app/components/NoDataFound";
import Image from "next/image";
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
        } else {
            setContainerActiveId(activeID);
        }
    };

    return (
        <>
            {isPending && <LodingFixed />}
            <div ref={containerRef} className="scroll-container">
                <div className="scroll-content">
                    {activeContainerData?.length > 0
                        ? activeContainerData.map((item) => {
                              const {
                                  container_name,
                                  container_value,
                                  quantity,
                                  status,
                                  id,
                              } = item;

                              const isDisabled = status === 0;
                              const isOpen = status === 1;

                              return (
                                  <div
                                      key={id}
                                      className={`position-relative box one p-3 ${
                                          isDisabled
                                              ? "disabled bg-gray-300  "
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
                                      {isDisabled && (
                                          <div
                                              className="position-absolute top-0 left-0 w-100 h-100 text-center py-1  rounded-2 container-after-custom"
                                              style={{ zIndex: 1 }}
                                          >
                                              <div className="">
                                                  <Image
                                                      src="/images/Closed-01.png"
                                                      alt="closed image"
                                                      width={300}
                                                      height={200}
                                                      className="img-fluid"
                                                  />
                                              </div>
                                          </div>
                                      )}
                                      {isOpen && (
                                          <div
                                              className="position-absolute top-0 left-0 w-100 h-100 text-center py-1  rounded-2 container-after-isopen"
                                              style={{ zIndex: 1 }}
                                          >
                                              <div className="">
                                                  <Image
                                                      src="/images/Open-01.png"
                                                      alt="closed image"
                                                      width={300}
                                                      height={200}
                                                      className="img-fluid"
                                                  />
                                              </div>
                                          </div>
                                      )}
                                      <div
                                          className="overflow-hidden w-100  position-relative pt-3"
                                          style={{ zIndex: 3 }}
                                      >
                                          <div className="">
                                              <div className="d-flex align-items-center justify-content-between pb-2">
                                                  <div
                                                      className="flex-1 text-white"
                                                  >
                                                      <p>Container Number</p>
                                                  </div>
                                                  <div
                                                      className={`flex-1 text-white ps-2 text-end`}
                                                  >
                                                      <strong>
                                                          {container_name ||
                                                              "----"}
                                                      </strong>
                                                  </div>
                                              </div>
                                              <div className="d-flex align-items-center justify-content-between pb-1">
                                                  <div
                                                      className={`flex-1 text-white`}
                                                  >
                                                      <p>Container Value</p>
                                                  </div>
                                                  <div
                                                      className={`flex-1 text-end text-white ps-2 `}
                                                  >
                                                      <strong>
                                                          ৳{" "}
                                                          {container_value.toFixed(
                                                              2
                                                          ) || "----"}
                                                      </strong>
                                                  </div>
                                              </div>

                                              <div className="d-flex align-items-center justify-content-between pb-2">
                                                  <div
                                                      className={`flex-1 text-white `}
                                                  >
                                                      <p>Quantity</p>
                                                  </div>
                                                  <div
                                                      className={`flex-1 text-end text-white ps-2 `}
                                                  >
                                                      <strong>
                                                          {quantity}
                                                      </strong>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : !isPending && <NoDataFound />}
                </div>
            </div>
        </>
    );
};

export default ContainerHorizontalScroll;
