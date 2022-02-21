import React from "react";
import ArrowNextIcon from "@assets/icons/arrow-next-icon";
import ArrowPrevIcon from "@assets/icons/arrow-prev-icon";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { COLORS } from "@utils/colors";

import "swiper/css/bundle";
import { offerSliderBreakpoints } from "./bs-constants";
import { useBannersQuery } from "@graphql/banner.graphql";

interface IBannerSliderProps extends React.HTMLAttributes<HTMLDivElement> {}

const BannerSlider: React.FC<IBannerSliderProps> = ({}) => {
  const { t } = useTranslation();

  const { data } = useBannersQuery();

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

  const banners = data?.banners;

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
          {banners?.map((d) => (
            <SwiperSlide key={d.imgUrl}>
              <div
                className={`w-full h-80 rounded-md overflow-hidden relative`}
              >
                <Image
                  className="w-full h-auto"
                  src={d.imgUrl}
                  alt={t(d.imgUrl)}
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
