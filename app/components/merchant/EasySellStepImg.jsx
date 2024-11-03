import Image from "next/image";

const EasySellStepImg = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant02.jpg`}
                        width={1370}
                        height={450}
                        alt="image"
                        className=" img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default EasySellStepImg;
