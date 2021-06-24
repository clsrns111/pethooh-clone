import React, { useRef, useState } from "react";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function SlideEvent() {
  const img1 =
    "https://m.pethooh.com/_fm/image/main/mainbanner/banner_app_m.png";
  const img2 =
    "https://m.pethooh.com/_fm/image/main/mainbanner/banner_membership_m.jpg";
  const img3 =
    "https://m.pethooh.com/_fm/image/main/mainbanner//banner_withpethooh_m.jpg";
  const img4 =
    "https://m.pethooh.com/_fm/image/main/mainbanner/banner_new_jerky_m.jpg";

  const images = [img1, img2, img3, img4];
  const Next = ({ onclick }) => {
    return (
      <div className="arrow next" onclick={onclick}>
        <FaArrowRight></FaArrowRight>
      </div>
    );
  };

  const Pre = ({ onclick }) => {
    return (
      <div className="arrow pre" onclick={onclick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setimageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <Next />,
    prevArrow: <Pre />,
    beforeChange: (current, next) => setimageIndex(next),
  };

  return <div className="slider"></div>;
}

export default SlideEvent;
