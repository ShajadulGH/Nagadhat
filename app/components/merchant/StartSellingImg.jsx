import Image from "next/image";

const StartSellingImg = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant04.jpg`}
                        width={1370}
                        height={200}
                        alt="image"
                        className=" img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default StartSellingImg;
