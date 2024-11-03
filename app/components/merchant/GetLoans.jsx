import Image from "next/image";

const GetLoans = () => {
    return (
        <div className="row">
            <div className="col-md-12 ">
                <div className="py-1">
                    <Image
                        src={`/images/merchant06.jpg`}
                        width={1370}
                        height={320}
                        alt="image"
                        className="img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default GetLoans;
