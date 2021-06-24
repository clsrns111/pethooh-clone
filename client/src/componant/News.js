import React, { useEffect, useRef, useState, Component } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import AliceCarousel from "react-alice-carousel";
import Carousel from "react-elastic-carousel";
import Slider from "react-slick";

function News() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="news">
      <h4 className="title">펫후 소식</h4>
      <div className="slide-wrapper">
        <div className="slides">
          <Carousel responsive={responsive}>
            <img src="https://pethooh.co.kr/img/banner_news_01.jpg" />

            <img src="https://pethooh.co.kr/img/banner_news_02.jpg" />

            <img src="https://pethooh.co.kr/img/banner_news_03.jpg" />
          </Carousel>
        </div>
        {/*   <div className="controle">
          <button className="pre">pre</button>
          <button className="next">next</button>
        </div> */}
      </div>
    </div>
  );
}

export default News;
