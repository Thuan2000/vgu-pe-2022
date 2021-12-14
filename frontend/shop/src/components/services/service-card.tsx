import { IServiceListItem } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import { formatMoneyAmount, getMoneySuffix, trimText } from "@utils/functions";
import Checkbox from "@components/ui/storybook/checkbox";
import ThreeDotIcon from "@assets/icons/three-dot-icon";
import Button from "@components/ui/storybook/button";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import RemoveIcon from "@assets/icons/remove-icon";
import { COLORS } from "@utils/colors";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { ROUTES } from "@utils/routes";
import Link from "../ui/link";

interface IServiceCardProps {
  service: IServiceListItem;
}

const ServiceCard: React.FC<IServiceCardProps> = ({ service }) => {
  const { t } = useTranslation();

  const {
    coverImage,
    name,
    slug,
    location,
    maxPrice,
    minPrice,
    price,
    rating,
    company,
  } = service;

  function getPrice() {
    if (!maxPrice && !minPrice)
      return `${formatMoneyAmount(price)}${t(getMoneySuffix(price))} ${t(
        "budget-sign"
      )}`;

    return `${formatMoneyAmount(minPrice!)}${t(getMoneySuffix(price))} ${t(
      "budget-sign"
    )} - ${formatMoneyAmount(maxPrice!)}${t(getMoneySuffix(price))} ${t(
      "budget-sign"
    )}`;
  }

  return (
    <div className={`shadow-top rounded-lg relative h-fit-content`}>
      <div className="relative w-full h-40">
        <Image
          src={coverImage?.url || siteSettings.logo.url}
          layout="fill"
          objectFit="cover"
          alt={service.name + "preview"}
        />
      </div>

      <div className={`p-4 font-semibold space-y-[2px]`}>
        <div>
          <div className="flex items-center justify-between">
            <Link
              href={`${ROUTES.SERVICES}/${slug}`}
              target={"_blank"}
              className="border-b border-transparent hover:border-black new-tab-link"
              rel="noreferrer"
            >
              <Typography text={trimText(name, 25)} element="h3" size="md" />
            </Link>
          </div>
          <Typography text={location} color="gray" size="md" />
        </div>
        <Typography
          text={trimText(company.name, 25)}
          color="primary"
          size="md"
        />
        <Typography text={`${getPrice()}`} color="secondary-1" />
      </div>
    </div>
  );
};
export default ServiceCard;
