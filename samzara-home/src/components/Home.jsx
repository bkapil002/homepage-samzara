import React, { useEffect } from "react";
import deaddiction from "../Image/de-addiction.jpg";
import doctor from "../Image/doctor.jpg";
import ThreeDSlider from "./ThreeDSlider";
import JoinMember from "./JoinMember";
import TopRehabs from "./TopRehabs";
import video from "../Image/video.mp4";

// AOS imports
import AOS from "aos";
import "aos/dist/aos.css";
import BlogSlider from "./BlogSlider";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div>
      {/* Hero Section with Video */}
      <div
        className="w-full mt-3 overflow-hidden px-4 sm:px-8 md:px-19 lg:px-16"
        data-aos="fade-in"
      >
        <video
          src={video}
          autoPlay
          loop
          muted
          className="w-full rounded-2xl h-[90vh] md:h-auto lg:h-auto object-cover"
        />
      </div>

      {/* De-Addiction Section */}
      <div
        className="w-full py-8 md:py-12 px-4 sm:px-8 md:px-19 lg:px-16"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        {/* Heading */}
        <h1
          className="text-2xl sm:text-4xl md:text-[50px] text-center md:text-right text-[#2A2A72] mb-6"
          data-aos="fade-up"
        >
          De-Addiction Anonymous
        </h1>

        <div className="mx-auto flex flex-col md:flex-row items-center gap-6">
          {/* Left Side - Image */}
          <div
            className="flex-1 w-full"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <img
              src={deaddiction}
              alt="De-addiction group"
              className="max-w-full h-auto rounded-md"
            />
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 flex flex-col w-full" data-aos="fade-up">
            <p className="text-gray-700 text-center md:text-right mb-6 text-sm sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>

            {/* Button aligned right */}
            <div
              className="flex justify-center md:justify-end"
              data-aos="fade-up"
              data-aos-anchor-placement="center-bottom"
            >
              <a
                href="https://community.samzara.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2A2A72] flex justify-center items-center cursor-pointer text-[14px] text-white px-5 py-2 rounded-md w-full sm:w-auto transition"
              >
                Join Online Meeting
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div
        className="w-full py-8 md:py-12 px-4 sm:px-8 md:px-19 lg:px-16"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        {/* Heading */}
        <h1
          className="text-2xl sm:text-4xl md:text-[50px] text-center md:text-left text-[#2A2A72] mb-6"
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
        >
          De-Addiction Anonymous
        </h1>

        {/* Flex container for image + text */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div
            className="flex justify-center lg:ml-30 ml-0 md:ml-0 w-full order-1 md:order-2"
            data-aos="fade-up"
          >
            <img
              src={doctor}
              alt="doctor illustration"
              className="max-w-full h-auto lg:h-[380px] rounded-md"
            />
          </div>

          {/* Text block */}
          <div
            className="flex flex-col w-full order-2 md:order-1"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
          >
            <p className="text-[#3C3C3C] mb-6 text-center md:text-left text-sm sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown
            </p>

            <h4 className="font-semibold text-[#3C3C3C] mb-3 text-center md:text-left">
              Doctors in high demand
            </h4>

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
              {[
                "Methamp",
                "Weed",
                "Inhalants Acidic",
                "Ganja",
                "Alcoholics",
                "MDMA",
                "Cannabinoids",
                "Crocodile",
                "Ganja",
                "Methamp",
                "Weed",
                "Ganja",
              ].map((item, index) => (
                <span
                  key={index}
                  className="bg-[#707070] text-white text-[10px] px-4 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="text-[#3C3C3C] mb-6 text-center md:text-left text-sm sm:text-base">
              Printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also
              the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets Ipsum.
            </p>

            {/* Button */}
            <div className="flex justify-center md:justify-start">
              <a
                href="https://findrehabcentres.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2A2A72] flex justify-center items-center cursor-pointer text-[14px] text-white px-6 py-2 rounded-md w-full sm:w-auto transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Components */}
      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <ThreeDSlider />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <TopRehabs />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <JoinMember />
      </div>
       <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
        <BlogSlider/>
      </div>
    </div>
  );
};

export default Home;
