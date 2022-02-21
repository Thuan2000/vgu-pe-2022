import { IServiceListItem } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import React from "react";
import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import { formatMoneyAmount, getMoneySuffix, trimText } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import Link from "../ui/link";
import ChatNowButton from "@components/ui/chat-now-button";

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
    <div className={`border overflow-hidden rounded-lg relative`}>
      <div className="relative w-full h-40">
        <Image
          src={coverImage?.url || siteSettings.logo.url}
          layout="fill"
          objectFit="cover"
          alt={service.name + "preview"}
        />
      </div>

      <div className={`p-4 font-semibold`}>
        <div>
          <Link
            href={`${ROUTES.SERVICES}/${slug}`}
            target={"_blank"}
            className="border-b border-transparent hover:border-black new-tab-link flex w-fit-content pr-2"
            rel="noreferrer"
          >
            <Typography className={`truncate`} text={name} size="sm" />
          </Link>
          <Typography text={location} color="gray" size="xs" />
        </div>
        <Typography
          text={trimText(company.name, 25)}
          color="primary"
          size="xs"
        />
        <Typography text={`${getPrice()}`} color="secondary-1" size="xs" />
        <ChatNowButton company={company} className={`w-full !h-7 mt-1 `} />
      </div>
    </div>
  );
};
export default ServiceCard;
