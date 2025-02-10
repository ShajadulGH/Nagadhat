import HeroSlider from "./components/HeroSlider";
import Partner from "./components/Partner";
import Category from "./components/Category";
import Sales from "./components/Sales";
import JustForYou from "./components/JustForYou";
import Service from "./components/Service";
import DownTimeMode from "./components/DownTimeMode";
export default async function Home() {
    return (
        <>
            <HeroSlider />
            <Partner />
            <Sales isHome={true} />
            <Category />
            <JustForYou />
            <div className="pb-5">
                <Service />
            </div>
            {/* <DownTimeMode/> */}
        </>
    );
}
