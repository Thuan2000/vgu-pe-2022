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
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";

interface IServiceCardProps {
  service: IServiceListItem;
  onSelect: (isChecked: boolean, service: IServiceListItem) => void;
  onDelete: (service: IServiceListItem) => void;
  isSelected: boolean;
}

const ServiceCard: React.FC<IServiceCardProps> = ({
  service,
  onSelect,
  isSelected,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const outsideMenuRef = useOutsideClickRef(hideServiceMenu);

  const {
    coverImage,
    name,
    location,
    slug,
    maxPrice,
    minPrice,
    price,
    rating,
    company,
  } = service;
  function showServiceMenu() {
    setShowMenu(true);
  }

  function hideServiceMenu() {
    setShowMenu(false);
  }

  function fireDeleteServiceCard() {
    onDelete(service);
    hideServiceMenu();
  }

  function getPrice() {
    if (!maxPrice || !minPrice)
      return `${formatMoneyAmount(price)}${t(getMoneySuffix(price))} ${t(
        "form:budget-sign"
      )}`;
    else
      return `${formatMoneyAmount(minPrice)}${t(getMoneySuffix(minPrice))} ${t(
        "form:budget-sign"
      )} - ${formatMoneyAmount(maxPrice)}${t(getMoneySuffix(maxPrice))} ${t(
        "form:budget-sign"
      )}`;
  }
  return (
    <div className={`shadow-top rounded-lg relative`}>
      <div className="relative w-full h-40">
        <Image src={coverImage?.url || siteSettings.logo.url} layout="fill" />
      </div>

      <div className={`p-4 font-semibold space-y-[2px]`}>
        <div>
          <Link href={`${ROUTES.SERVICES}/${slug}`}>
            <Typography text={trimText(name, 25)} size="md" />
          </Link>
          <Typography text={location} color="gray" size="md" />
        </div>
        <Typography
          text={trimText(company.name, 25)}
          color="primary"
          size="md"
        />
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

        <div className={`relative cursor-pointer`}>
          <div onClick={showServiceMenu} className={`p-2`}>
            <ThreeDotIcon />
          </div>
          {showMenu && (
            <div
              className={`absolute bg-white shadow-top z-50 right-0`}
              ref={outsideMenuRef}
            >
              <Button
                onClick={fireDeleteServiceCard}
                variant="custom"
                className={`fic text-gray-300`}
              >
                <TrashCanIcon
                  fill={COLORS.GRAY[300]}
                  className={`w-3 h-3 mr-3`}
                />
                {t("delete-button-label")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;
