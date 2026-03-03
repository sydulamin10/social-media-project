import React from "react";
import { StoriesData } from "./storiesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

const Stories = () => {
  return (
    <>
      <div>
        <h4 className="font-Gilroy-Bold text-lg text-black-color capitalize">
          Stories
        </h4>
      </div>
      <div className="">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[EffectFade]}
          effect="Flip"
        >
          {StoriesData.map((data, index) => (
            <SwiperSlide key={index}>
              <div
                style={{ background: `url(${data.bgPicture})` }}
                className="bg-cover bg-no-repeat bg-center h-[200px] rounded-md overflow-hidden"
              >
                <div className="w-10 h-10 overflow-hidden object-cover rounded-full mt-2 ml-2 border-2 border-primary-bg">
                  <img src={data.picture} alt="" />
                </div>
                <div className=""></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Stories;
