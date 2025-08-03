import {
  GallerySection,
  StatsDestinationsSection,
  TestimonialSection,
  VideoExpansionSectionComponent,
} from "@/components/home";
import HeroSection from "@/components/home/hero-section";
export default function Home() {
  return (
    <>
      <HeroSection />
      <GallerySection />

      <StatsDestinationsSection
        locations={[
          { name: "Toronto", country: "Canada", users: 125000, growth: "+15%" },
          {
            name: "Melbourne",
            country: "Australia",
            users: 89000,
            growth: "+12%",
          },
          { name: "Berlin", country: "Germany", users: 67000, growth: "+18%" },
          {
            name: "Amsterdam",
            country: "Netherlands",
            users: 54000,
            growth: "+22%",
          },
          { name: "Dublin", country: "Ireland", users: 98000, growth: "+25%" },
          {
            name: "Wellington",
            country: "New Zealand",
            users: 34000,
            growth: "+20%",
          },
        ]}
      />

      <TestimonialSection />

      <VideoExpansionSectionComponent />
    </>
  );
}
