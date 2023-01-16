import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper";
import s1 from "../../assets/s1.jpg";
import s2 from "../../assets/s2.jpg";
import s3 from "../../assets/s3.jpg";
import s4 from "../../assets/s4.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "./Slider.css";
const Slider = () => {
  return (
    <div className="slider">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectFade,
        ]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        effect="fade"
        autoplay={true}
        pagination={{ clickable: true }}
      >
        <div className="container">
          <SwiperSlide className="slide">
            <img src={s1} alt="" />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img src={s2} alt="" />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img src={s3} alt="" />
          </SwiperSlide>
          <SwiperSlide className="slide">
            <img src={s4} alt="" />
          </SwiperSlide>
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
