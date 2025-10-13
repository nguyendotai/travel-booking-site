import CategoriesImage from "./components/uiHome/CategoriesImage";
import IntroSection from "./components/uiHome/IntroSection";
import TourDomestic from "./components/uiHome/TourDomestic";
import TourInternational from "./components/uiHome/TourInternational";
import HotDeals from "./components/uiHome/HotDeals";
import Testimonials from "./components/uiHome/Testimonials";
import TopDestinations from "./components/uiHome/TopDestinations";
import Newsletter from "./components/uiHome/Newsletter";

export default function Home() {
  return (
    <div className="max-w-full mx-auto">
      <div className="max-w-4xl my-2 mx-auto">
          <CategoriesImage />
      </div>
      <div className="w-full mx-auto my-10">
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
         <TopDestinations categoryId={1} title="Điểm đến nổi bật trong nước" />
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <TopDestinations categoryId={2} title="Điểm đến nổi bật nước ngoài" />
      </div>
      <div className="max-w-7xl my-20 mx-auto">
        <Newsletter ></Newsletter>
      </div>
    </div>
  );
}
