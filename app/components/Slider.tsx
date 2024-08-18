"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function Slider({ data }: { data: { img: string; name: string }[] }) {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      autoplay={{ delay: 3000 }}
      modules={[Autoplay]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((monster, idx) => {
        return (
          <SwiperSlide>
            <div className="flex flex-col font-bold gap-2 text-white justify-center items-center">
              <img className="rounded-xl" src={monster.img} alt="monster" />
              <div>{monster.name}</div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
