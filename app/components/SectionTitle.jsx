"use client";
import Link from "next/link";
import useScreenSize from "../hooks/useScreenSize";

function SectionTitle({
    title = "Flash Sale",
    path = "/viewall",
    children,
    isSale = false,
    showViewAll = true,
    districtId
}) {
    
    const { width } = useScreenSize();
    const MAX_SCREEN_SIZE = 490;
    return (
        <div className="row nh-common-title-area">
            <div className="col-md-12">
                <div
                    className={`nh-common-title d-flex align-items-center justify-content-between`}
                >
                    <div className="nh-common-item d-flex align-items-center">
                        <h3>{title}</h3>
                        <div className="common-border"></div>
                    </div>
                    
                    {
                        isSale && width > MAX_SCREEN_SIZE ? <div>{children}</div> : ""
                    }
                    {showViewAll && (
                        <div className="nh-common-item">
                            {districtId ? (
                                <Link
                                    href={{
                                        pathname: path,
                                        query: { districtId }
                                    }}

                                >
                                    View All
                                </Link>
                            ) : (
                                <Link href={path}>View All</Link>
                            )}
                        </div>
                    )}
                </div>
                {
                    isSale && width < MAX_SCREEN_SIZE ? <div className="pt-2">{children}</div> : ""
                }
            </div>
        </div>
    );
}

export default SectionTitle;
