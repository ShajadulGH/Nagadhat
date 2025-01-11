import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/placeholder--image.jpg";

const ViewAllCategoryItems = ({ items, isCategory }) => {
    const { title, slug: path, logo } = items;
    const imageUrl = logo ? `${NagadhatPublicUrl}/${logo}` : img;
    
    return (
        <div className="nh-categories-item">
            {isCategory ? (
                <Link href={`/category/${path}`}>
                    <div className="nh-categories-item-bg nh-hover-box-shadow">
                        <div className="nh-categories-img image-hover-effect">
                            <Image
                                src={imageUrl}
                                className="img-fluid"
                                alt={title}
                                fill={true}
                            />
                        </div>
                        <div className="nh-categories-info text-hover-effect text-capitalize text-center">
                            <h4>{title}</h4>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="nh-categories-item-bg nh-hover-box-shadow">
                    <div className="nh-categories-img image-hover-effect">
                        <Image
                            src={imageUrl}
                            className="img-fluid"
                            alt={title}
                            fill={true}
                        />
                    </div>
                    <div className="nh-categories-info text-hover-effect text-capitalize text-center">
                        <h4>{title}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewAllCategoryItems;
