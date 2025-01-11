import { NagadhatPublicUrl } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

const ViewAllCategoryItems = ({ items, isCategory }) => {
    let imageUrl = "/images/flash-img1.jpg";
    const { title, slug: path, logo } = items;
    if (logo) {
        imageUrl = `${NagadhatPublicUrl}/${logo}`;
    }
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
