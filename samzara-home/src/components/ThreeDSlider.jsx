import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import services from "../Image/services.png";

const Container = styled.div`
  width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  @media (max-width: 640px) {
    padding: 20px 0;
    min-height: auto;
  }
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  color: #20318c;
  margin-bottom: 8px;
  text-align: right;

  @media (max-width: 640px) {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 4px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 32px;
  text-align: left;

  @media (max-width: 640px) {
    font-size: 0.95rem;
    margin-bottom: 18px;
    text-align: center;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 80vw;
  max-width: 900px;
  height: 500px;

  .swiper-pagination-bullets {
    bottom: 20px;
  }

  @media (max-width: 900px) {
    width: 95vw;
    height: 500px;
  }
  @media (max-width: 640px) {
    width: 100vw;
    height: 340px;
  }
`;

const SlideContent = styled.div`
  background: #ececec;
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 2px 12px #0002;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 32px;

  @media (max-width: 640px) {
    padding: 18px 8px;
    border-radius: 10px;
  }
`;

const RequirementTitle = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  letter-spacing: 0.13em;
  color: #43424c;
  margin: 18px 0 15px 0;

  @media (max-width: 640px) {
    font-size: 1rem;
    margin: 10px 0 8px 0;
  }
`;

const RequirementText = styled.p`
  text-align: justify;
  font-size: 13px;
  color: #636363;
  line-height: 1.5;

  @media (max-width: 640px) {
    font-size: 10px;
    padding: 0 4px;
  }
`;

const Img = styled.img`
  width: 80%;
  max-width: 320px;
  margin-bottom: 24px;
  margin-top: 40px;

  @media (max-width: 640px) {
    width: 70%;
    max-width: 150px;
    margin-bottom: 14px;
    margin-top: 18px;
  }
`;

const Button = styled.button`
  margin-top: 38px;
  background: #2a2a72;
  color: #fff;
  border-radius: 100px;
  border: none;
  font-size: 12px;
  padding: 14px 38px;
  cursor: pointer;
  box-shadow: 0 2px 8px #20318c44;
  transition: background 0.2s;

  &:hover {
    background: #16236b;
  }

  @media (max-width: 640px) {
    font-size: 11px;
    padding: 10px 22px;
    margin-top: 18px;
  }
`;

const SLIDES = [
  {
    img: services,
    title: "Professional Support",
    text: "Connect with qualified clinical experts and de-addiction specialists. Receive personalized advice and support tailored to your needs.",
  },
  {
    img: services,
    title: "Anonymity",
    text: "Engage in Confidential Conversations. Share your stories and experiences without fear of judgment. Experience mutual support and a sense of belonging with SamZara.",
  },
  {
    img: services,
    title: "Socialize and Empower ",
    text: "Get access to a wealth of resources. Blogs, articles, videos, and guides. All aimed at promoting mental health, well-being, and personal development",
  },
  {
    img: services,
    title: "Interactive Sessions",
    text: "Attend live events and workshops led by experts. Uncover stress management, addiction recovery, and personal growth.",
  },
];

export default function ThreeDSlider() {
  return (
    <Container>
      <Title>Services by Samzara</Title>
      <Subtitle>Post your post for millions of Addicts</Subtitle>
      <StyledSwiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 220,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
      >
        {SLIDES.map((slide, idx) => (
          <SwiperSlide key={idx} style={{ width: "400px", maxWidth: "95vw" }}>
            <SlideContent>
              <Img src={slide.img} alt="People" />
              <RequirementTitle>{slide.title}</RequirementTitle>
              <div
                className="w-30 h-[2px] rounded-3xl -mt-2 mb-3 bg-[#f86925] "
                style={{
                  width: "80px",
                  height: "2px",
                  borderRadius: "16px",
                  marginTop: "-8px",
                  marginBottom: "12px",
                  background: "#f86925",
                  maxWidth: "80vw",
                }}
              ></div>
              <RequirementText>{slide.text}</RequirementText>
            </SlideContent>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  );
}