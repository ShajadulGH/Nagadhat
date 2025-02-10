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
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
                <div
                    className="bg-white shadow-lg rounded-4 p-5 text-center"
                    style={{ maxWidth: "600px", width: "100%" }}
                >
                    <h1 className="text-danger fw-bold">📢 Dear Users,</h1>
                    <p className="fs-5 text-secondary mt-3">
                        Our website will be temporarily unavailable for{" "}
                        <strong>30 minutes</strong> due to maintenance. We
                        apologize for any inconvenience and appreciate your
                        patience.
                    </p>
                    <div className="mt-4">
                        <strong className="d-block fs-5 text-primary">
                            🔹 Downtime: 30 minutes
                        </strong>
                        <strong className="d-block fs-5 text-success">
                            🔹 We’ll be back shortly!
                        </strong>
                    </div>
                    <p className="fs-6 text-muted mt-4">
                        Thank you for your understanding. 🙏
                    </p>
                </div>
            </div>
        </>
    );
}
