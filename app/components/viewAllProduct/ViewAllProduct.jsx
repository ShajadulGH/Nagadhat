import { Suspense } from "react";
import NoDataFound from "../NoDataFound";
import ViewAllProductItems from "./ViewAllProductItems";
import DefaultLoader from "../defaultloader/DefaultLoader";

const ViewAllProduct = ({ viewProductData, loading }) => {
    return (
        <Suspense fallback={<DefaultLoader />}>
            <div className="row just-for-random-product view-all-product-area">
                <div className="col-md-12">
                    {viewProductData?.length > 0 ? (
                        <div className="flash-sale-content-area">
                            {
                                viewProductData?.map((viewProductItem) => (
                                    <ViewAllProductItems
                                        key={viewProductItem.id}
                                        items={viewProductItem}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        !loading && <NoDataFound />
                    )}
                </div>
            </div>
        </Suspense>
    );
};

export default ViewAllProduct;
