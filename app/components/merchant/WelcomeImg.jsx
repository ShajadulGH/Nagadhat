import Image from "next/image";

const WelcomeImg = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant01.jpg`}
                        width={1370}
                        height={550}
                        alt="image"
                        className=" img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default WelcomeImg;
