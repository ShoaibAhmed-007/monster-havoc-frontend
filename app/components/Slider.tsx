"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import { Monster } from "./Game Features/MonsterDB";

function Slider({ data }: { data: Monster[] }) {
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
          <SwiperSlide key={idx}>
            <div className="flex flex-col font-bold gap-2 text-white justify-center items-center">
              <Image
                className="rounded-xl"
                src={monster.img}
                alt="monster"
                height={300}
                width={300}
              />
              <div>{monster.name}</div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;
