import { IProductListItem, IServiceListItem } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import React, { useState } from "react";
import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import { formatMoneyAmount, getMoneySuffix, trimText } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import Link from "../ui/link";

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

      <div className={`p-4 font-semibold space-y-[2px]`}>
        <div>
          <Link
            href={`${ROUTES.PRODUCTS}/${slug}`}
            target={"_blank"}
            rel="noreferrer"
            className="border-b border-transparent hover:border-black new-tab-link flex"
          >
            <Typography className={`truncate`} text={name} size="md" />
          </Link>
          <Typography
            text={company?.name}
            color="primary"
            className={`truncate`}
            size="md"
          />
        </div>
        <Typography text={warehouseLocation!} color="gray" size="md" />

        <Typography text={`${getPrice()}`} color="secondary-1" />
      </div>
    </div>
  );
};
export default ProductCard;
