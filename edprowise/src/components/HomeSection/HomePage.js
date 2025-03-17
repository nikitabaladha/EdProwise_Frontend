import HomeMainSection from "./HomeMainSection";
import Category from "./Category";
import VisionMissionSection from "./MissionVision";
import WhyChooseEdProwise from "./WhyChooseEdProwise";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialSection from "./Testimonial";
import EdprowiseTalk from "./EdprowiseTalk";
import BlogSection from "./BlogSection";
// import RequestDemoSteps from "./RequestDemoSteps";
import FaqContactUsComponent from "./FaqContactUsComponent";
const HomePage = () => {
  return (
    <>
      <HomeMainSection />
      <Category />
      <VisionMissionSection />
      <WhyChooseEdProwise />
      <WhyChooseUs />
      <TestimonialSection />
      <EdprowiseTalk />
      <BlogSection />
      
      <FaqContactUsComponent/>
    </>
  );
};

export default HomePage;
