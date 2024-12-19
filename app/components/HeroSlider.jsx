import MainSlider from "./MainSlider";
import CategoryMainMenu from "./CategoryMainMenu";
import { getCategoryMenu } from "../services/getCategoryMenu";
import { getHomeSlider } from "../services/getHomeSlider";

export default async function HeroSlider() {
    let categoryMenuOption = [];
    let sliderOptionData = [];

    try {
        // Fetch category menu data
        categoryMenuOption = await getCategoryMenu();
    } catch (error) {
        console.error("Error fetching category menu:", error);
    }

    try {
        // Fetch home slider data
        const sliderData = await getHomeSlider();
        sliderOptionData = sliderData?.results?.sliders || [];
    } catch (error) {
        console.error("Error fetching home slider data:", error);
    }

    return (
        <div className="hero-slider-main-section">
            <div className="container">
                <section className="hero-slider-area">
                    <div className="hero-slider-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="hero-slider-main-box">
                                    <div className="category-menu-holder hero-slider-main-item">
                                        {categoryMenuOption?.length > 0 && (
                                            <CategoryMainMenu
                                                categoryMenu={categoryMenuOption}
                                            />
                                        )}
                                    </div>
                                    {sliderOptionData?.length > 0 && (
                                        <MainSlider
                                            sliderOptionData={sliderOptionData}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
