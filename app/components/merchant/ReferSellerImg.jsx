import Image from "next/image";

const ReferSellerImg = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant05.jpg`}
                        width={1370}
                        height={350}
                        alt="image"
                        className=" img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default ReferSellerImg;
