import CustomerReviews from "@/components/home/CustomerReviews";
import DealsOffers from "@/components/home/DealsOffers";
import FeaturedHotels from "@/components/home/FeaturedHotels";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Newsletter from "@/components/home/Newsletter";
import PopularDestinations from "@/components/home/PopularDestinations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { getAllHotels } from "@/fetures/auth/services/hotelApi";
import React, { useCallback, useEffect, useState } from "react";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [homeSearch, sethomeSearch] = useState([]);

  useEffect(() => {
    if (!destination.trim()) {
      sethomeSearch([]);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await getAllHotels(
          {
            location: destination,
          },
          controller.signal,
        );

        sethomeSearch(res);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [destination]);
  return (
    <div>
      <HeroSection
        setDestination={setDestination}
        homeSearch={homeSearch}
        destination={destination}
      />
      <PopularDestinations />
      <FeaturedHotels />
      <WhyChooseUs />
      <DealsOffers />
      <CustomerReviews />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
