import React from "react";
import Image from "next/image";

import Typography from "@components/ui/storybook/typography";
import { IRawBFW } from "./bfw-constants";
import Button from "@components/ui/storybook/button";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";

interface IECBFWItemProps {
  bfw: IRawBFW;
  onDelete?: (b: IRawBFW) => void;
}

const ECBFWItem: React.FC<IECBFWItemProps> = ({ bfw, onDelete }) => {
  const { t } = useTranslation("form");

  function generateAddress(b: IRawBFW) {
    const location = b.location.name || b.location;
    const address = b.address;

    return `${location}, ${address}`;
  }

  return (
    <div
      className="border w-full bg-gray-10 p-3 relative rounded-md"
      key={bfw.id}
    >
      <Typography variant="BRTitle" text={bfw.name} />
      <div className="fic space-x-1">
        <Typography variant="description" text={`${t("location-text")}:`} />
        <Typography text={generateAddress(bfw)} />
      </div>
      <div className="fic space-x-3 mt-2">
        {bfw.gallery?.map((bi) => {
          return (
            <div
              key={bi.url}
              className="relative rounded-sm overflow-hidden w-28 h-28"
            >
              <Image
                layout="fill"
                src={bi.url}
                alt={bi.fileName + "alt-props"}
              />
            </div>
          );
        })}
      </div>

      {!!onDelete && (
        <Button
          onClick={() => onDelete(bfw)}
          variant="custom"
          className="absolute top-3 right-3"
        >
          <TrashCanIcon fill={COLORS.BOLDER} />
        </Button>
      )}
    </div>
  );
};
export default ECBFWItem;
