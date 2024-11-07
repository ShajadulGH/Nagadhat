import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
const MultipleProductSlider = ({ multipleImage, thum }) => {
    const path = multipleImage?.path;
    return (
        <>
            <div className="product-multiple-photo-item">
                <Image
                    className="img-fluid object-fit-cover"
                    src={path?`${NagadhatPublicUrl}/${path}`:thum}
                    fill={true}
                    alt=" product gallery Image "
                />
            </div>
        </>
    );
};

export default MultipleProductSlider;
