import Image from "next/image";

const MerchantVisitNow = () => {
    return (
        <div className="row py-1 g-2">
            <div className="col-md-4 col-sm-6 col-12">
                <div className="">
                    <Image
                        src={`/images/merchan08.jpg`}
                        width={550}
                        height={310}
                        alt="image"
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
                <div className="">
                    <Image
                        src={`/images/merchan09.jpg`}
                        width={550}
                        height={310}
                        alt="image"
                        className="img-fluid"
                    />
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-12">
                <div className="">
                    <Image
                        src={`/images/merchan10.jpg`}
                        width={550}
                        height={310}
                        alt="image"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantVisitNow;
