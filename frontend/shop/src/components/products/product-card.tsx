import { IProductListItem, IServiceListItem } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import {
  formatMoneyAmount,
  getCompanyId,
  getMoneySuffix,
  trimText,
} from "@utils/functions";
import { ROUTES } from "@utils/routes";
import Link from "../ui/link";
import MessageIcon from "@assets/icons/message-icon";
import Button from "@components/ui/storybook/button";
import ChatNowButton from "@components/ui/chat-now-button";
import RecordCardName from "@components/ui/record-card-name";

interface IProductCardProps {
  product: IProductListItem;
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { t } = useTranslation();

  const {
    coverImage,
    name,
    slug,
    warehouseLocation,
    maxPrice,
    minPrice,
    price,
    company,
  } = product;

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
          alt={product.name + "preview"}
        />
      </div>

      <div className={`p-4 font-semibold`}>
        <div>
          <RecordCardName href={`${ROUTES.PRODUCTS}/${slug}`} title={name} />
          <Typography
            text={company?.name}
            color="primary"
            className={`truncate`}
            size="xs"
          />
        </div>
        <Typography text={warehouseLocation!} color="gray" size="xs" />
        <Typography text={`${getPrice()}`} color="secondary-1" size="xs" />
        <ChatNowButton
          ownStuffMessage={t("yourProduct-message-label")}
          company={company}
          className={`w-full !h-7 !mt-1`}
        />
      </div>
    </div>
  );
};
export default ProductCard;
