import HeroSlider from "./components/HeroSlider";
import Partner from "./components/Partner";
import Category from "./components/Category";
import Sales from "./components/Sales";
import JustForYou from "./components/JustForYou";
import Service from "./components/Service";
export default async function Home() {
    return (
        <>
            {/* <HeroSlider />
            <Partner />
            <Sales isHome={true} />
            <Category />
            <JustForYou />
            <div className="pb-5">
                <Service />
            </div> */}
            <div className=" w-100 h-100 d-flex align-items-center justify-content-center py-5">
                <div
                    className="py-5"
                    style={{ maxWidth: "600px", margin: "0 auto" }}
                >
                    <h1>📢 Dear Users,</h1>
                    <p className="fs-5">
                        Our website will be temporarily unavailable for 30
                        minutes due to maintenance. We apologize for any
                        inconvenience and appreciate your patience.
                    </p>
                    <strong className="d-block fs-6">
                        🔹 Downtime: 30 minutes
                    </strong>
                    <strong className="d-block fs-6">
                        🔹 We’ll be back shortly!
                    </strong>
                    <p className="fs-6">Thank you for your understanding. 🙏</p>
                </div>
            </div>
        </>
    );
}
