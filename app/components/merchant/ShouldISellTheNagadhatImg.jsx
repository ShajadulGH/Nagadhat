import Image from "next/image";

const ShouldISellTheNagadhatImg = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant3.png`}
                        width={1370}
                        height={400}
                        alt="image"
                        className=" img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShouldISellTheNagadhatImg;
