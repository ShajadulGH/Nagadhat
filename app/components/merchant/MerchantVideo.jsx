import Image from "next/image";

const MerchantVideo = () => {
    return (
        <div className="row g-2 align-items-center ">
            <div className="col-md-8">
                <div>
                    <iframe
                        width="100%"
                        height="452"
                        src="https://www.youtube.com/embed/CdLsU7ficaA?si=tRfwnSCZOvA2xxwc"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="col-md-4">
                <div className="">
                    <Image
                        src="/images/o-que-e-seller.jpg"
                        width={550}
                        height={0} // or remove height
                        alt="image"
                        style={{
                            maxWidth: "100%",
                            objectFit: "cover",
                            height: "auto",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantVideo;
