import { PlusIcon } from "@assets/icons/plus-icon";
import Button from "@components/ui/storybook/button";
import { COLORS } from "@utils/colors";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IGroupClassification, IGroupFormValues } from "./product-group-form";

interface IPGAddGroupButtonProps {
  groups: IGroupFormValues[];
  onClick: () => void;
}

const PGAddGroupButton: React.FC<IPGAddGroupButtonProps> = ({
  groups,
  onClick,
}) => {
  const { t } = useTranslation("form");

  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(
    getIsAddButtonDisabled()
  );

  useEffect(() => {
    setIsAddButtonDisabled(getIsAddButtonDisabled());
  }, [JSON.stringify(groups)]);

  function getIsValidGroupClassifications(
    classifications: IGroupClassification[]
  ) {
    if (!classifications?.length) return;

    return classifications.every((c) => {
      return !!c.name;
    });
  }

  function getIsAddButtonDisabled() {
    return (
      !!groups.length &&
      !groups[groups.length - 1]?.name &&
      !getIsValidGroupClassifications(groups[groups.length - 1].classifications)
    );
  }

  return (
    <Button
      variant="outline"
      color="secondary-1"
      disabled={isAddButtonDisabled}
      className={`w-full hover:!bg-transparent ${
        !isAddButtonDisabled && "hover:!text-secondary-1"
      }`}
      onClick={onClick}
    >
      <PlusIcon
        className={`mr-3 `}
        fill={
          isAddButtonDisabled ? COLORS.GRAY[300] : COLORS["SECONDARY-1"].DEFAULT
        }
      />
      {t("add-product-group-button-label")}
    </Button>
  );
};
export default PGAddGroupButton;
