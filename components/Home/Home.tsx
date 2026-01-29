"use client";

import ContactForm from "../Common/ContactForm/ContactForm";
import ContactInfo from "../Common/ContactInfo/ContactInfo";
import FAQ from "../Common/FAQ/FAQ";
import Partners from "../Common/Partners/Partners";
import Pricing from "../Common/Pricing/Pricing";
import WhyChooseUs from "../Common/WhyChooseUs/WhyChooseUs";
import About from "./About/About";
import Autodialer from "./Autodialer/Autodialer";
import FeatureSection from "./FeatureSection/FeatureSection";
import Hero from "./Hero/Hero";
import Pbx from "./Pbx/Pbx";
import Services from "./Services/Services";
import TextToSpeech from "./TextToSpeech/TextToSpeech";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <section id="about">
        <About />
      </section>
      <Services />
      <FeatureSection />
      <Autodialer />
      <TextToSpeech />
      <Pbx />
      <WhyChooseUs />
      <Partners />
      <Pricing />
      <FAQ />
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default Home;
