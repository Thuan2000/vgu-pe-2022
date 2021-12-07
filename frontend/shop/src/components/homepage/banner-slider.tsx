import React from "react";
import ArrowNextIcon from "@assets/icons/arrow-next-icon";
import ArrowPrevIcon from "@assets/icons/arrow-prev-icon";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { COLORS } from "@utils/colors";

import "swiper/css/bundle";

// dummy data
const data = [
  {
    id: 1,
    title: "banner:promotion-slide-one",
    bannerUrl: "/promotion/photo-1.jpg",
  },
  {
    id: 2,
    title: "banner:promotion-slide-two",
    bannerUrl: "/promotion/photo-2.jpg",
  },
  {
    id: 3,
    title: "banner:promotion-slide-three",
    bannerUrl: "/promotion/photo-3.jpg",
  },
  {
    id: 4,
    title: "banner:promotion-slide-four",
    bannerUrl: "/promotion/photo-4.jpg",
  },
  {
    id: 5,
    title: "banner:promotion-slide-five",
    bannerUrl: "/promotion/photo-5.jpg",
  },
];

interface IBannerSliderProps extends React.HTMLAttributes<HTMLDivElement> {}

const offerSliderBreakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  580: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1024: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  1920: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
};

const BannerSlider: React.FC<IBannerSliderProps> = ({}) => {
  const { t } = useTranslation();

  function SlideArrow({
    className,
    children,
  }: {
    className: string;
    children: any;
  }) {
    return (
      <div
        className={`${className} cursor-pointer absolute top-2/4 z-10 -mt-4 md:-mt-5 w-8 h-8 md:w-10 md:h-10 rounded-sm bg-light ring-1 ring-black ring-opacity-10 hover:scale-110 flex-center transition-all duration-200 hover:text-light border-primary`}
        role="button"
      >
        {children}
      </div>
    );
  }

  const arrowSize = 22;

  return (
    <div className="py-1 sm:py-2 md:py-3">
      <div className="relative">
        <Swiper
          id="offer"
          modules={[Navigation, Pagination, Autoplay]}
          breakpoints={offerSliderBreakpoints}
          autoplay
          pagination
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
        >
          {data?.map((d) => (
            <SwiperSlide key={d.id}>
              <div
                className={`w-full h-80 rounded-md overflow-hidden relative`}
              >
                <Image
                  className="w-full h-auto"
                  src={d.bannerUrl}
                  alt={t(d.title)}
                  layout="fill"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SlideArrow className="prev -left-4 md:-left-5">
          <span className="sr-only">{t("common:text-previous")}</span>
          <ArrowPrevIcon
            fill={COLORS.PRIMARY.DEFAULT}
            width={arrowSize}
            height={arrowSize}
          />
        </SlideArrow>
        <SlideArrow className="next -right-4 md:-right-5">
          <span className="sr-only">{t("common:text-next")}</span>
          <ArrowNextIcon
            fill={COLORS.PRIMARY.DEFAULT}
            width={arrowSize}
            height={arrowSize}
          />
        </SlideArrow>
      </div>
    </div>
  );
};
export default BannerSlider;
