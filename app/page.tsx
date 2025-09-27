import CategoriesImage from "./components/uiHome/CategoriesImage";
import IntroSection from "./components/uiHome/IntroSection";
import TourDomestic from "./components/uiHome/TourDomestic";
import TourInternational from "./components/uiHome/TourInternational";
import HotDeals from "./components/uiHome/HotDeals";
import Testimonials from "./components/uiHome/Testimonials";
import TopDestinationsDomestic from "./components/uiHome/TopDestinationsDomestic";
import TopDestinationsInternational from "./components/uiHome/TopDestinationsInternational";
import Newsletter from "./components/uiHome/Newsletter";

export default function Home() {
  return (
    <div className="max-w-full mx-auto">
      <div className="max-w-4xl my-20 mx-auto">
          <CategoriesImage />
      </div>
      <div className="w-full mx-auto my-20">
          <IntroSection></IntroSection>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <HotDeals></HotDeals>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <TourDomestic></TourDomestic>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <TourInternational></TourInternational>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <Testimonials></Testimonials>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <TopDestinationsDomestic></TopDestinationsDomestic>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <TopDestinationsInternational></TopDestinationsInternational>
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <Newsletter ></Newsletter>
      </div>
    </div>
  );
}
