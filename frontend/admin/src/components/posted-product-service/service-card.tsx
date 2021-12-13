import { IServiceListItem } from "@graphql/types.graphql";
import { siteSettings } from "@settings/site.settings";
import React from "react";
import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "next-i18next";
import { formatMoneyAmount } from "@utils/functions";
import Checkbox from "@components/ui/storybook/checkbox";
import ThreeDotIcon from "@assets/icons/three-dot-icon";

interface IServiceCardProps {
  service: IServiceListItem;
  onSelect: (isChecked: boolean, service: IServiceListItem) => void;
  isSelected: boolean;
}

const ServiceCard: React.FC<IServiceCardProps> = ({
  service,
  onSelect,
  isSelected,
}) => {
  const { t } = useTranslation();

  const {
    coverImage,
    name,
    location,
    maxPrice,
    minPrice,
    price,
    rating,
    company,
  } = service;

  function getPrice() {
    if (!maxPrice && !minPrice)
      return `${formatMoneyAmount(price)} ${t("form:budget-sign")}`;

    return `${formatMoneyAmount(minPrice!)} ${t(
      "form:budget-sign"
    )} - ${formatMoneyAmount(maxPrice!)} ${t("form:budget-sign")}`;
  }

  return (
    <div className={`shadow-top rounded-lg relative`}>
      <div className="relative w-full h-40">
        <Image src={coverImage || siteSettings.logo.url} layout="fill" />
      </div>

      <div className={`p-4 font-semibold space-y-[2px]`}>
        <div>
          <Typography text={name} size="md" />
          <Typography text={location} color="gray" size="md" />
        </div>
        <Typography text={company.name} color="primary" size="md" />
        <Typography text={`${getPrice()}`} color="secondary-1" />
      </div>

      <div className={`absolute top-3 px-3 fic justify-between w-full`}>
        <Checkbox
          checked={isSelected}
          name={service.id + "service-is-check"}
          className="z-10"
          onChange={(e) => {
            onSelect(e.target.checked, service);
          }}
        />
        <ThreeDotIcon />
      </div>
    </div>
  );
};
export default ServiceCard;
