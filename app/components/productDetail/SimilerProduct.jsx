import SectionTitle from "../SectionTitle";
import SimilerProductItems from "./SimilerProductItems";

const SimilerProduct = ({ productData }) => {
    return (
        <div className="similer-product-area">
            <SectionTitle title={`Similer Product`} showViewAll={false} />
            <div className="similer-product-box">
                {productData?.map((item) => {
                    return <SimilerProductItems key={item.id} item={item} />;
                })}
            </div>
        </div>
    );
};

export default SimilerProduct;
