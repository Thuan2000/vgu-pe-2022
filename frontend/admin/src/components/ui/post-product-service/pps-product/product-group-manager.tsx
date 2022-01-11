import RequiredSign from "@components/ui/storybook/inputs/required-sign";
import Typography from "@components/ui/storybook/typography";
import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { useFormContext } from "react-hook-form";
import { IPostProductFormValues } from "./pps-product-interface";
import PGAddGroupButton from "./product-group-add-group-button";
import ProductGroupForm, { IGroupFormValues } from "./product-group-form";

export interface IProductGroupManagerProps {
  value: IGroupFormValues[];
  onChange: (e: IGroupFormValues[]) => void;
}

const ProductGroupManager: React.FC<IProductGroupManagerProps> = ({
  value: groups = [],
  onChange,
}) => {
  const { t } = useTranslation("form");
  const { setValue } = useFormContext<IPostProductFormValues>();
  function getIsAddButtonDisabled() {
    return (
      !!groups.length &&
      !groups[groups.length - 1]?.name &&
      !groups[groups.length - 1]?.classifications?.length
    );
  }

  function generatePackage() {
    if (getIsAddButtonDisabled()) return;

    if (groups.length <= 1) setValue("pricing.price", "" as any);

    const newPackage: IGroupFormValues = {
      id: generateUUID(),
      name: "",
    } as any;

    onChange([...groups, newPackage]);
  }

  function handleGroupChange(group: IGroupFormValues) {
    const idx = findIndex(groups, (g) => g.id === group.id);
    if (idx === -1) return;

    groups[idx] = group;
    onChange([...groups]);
  }

  function handleGroupDelete(group: IGroupFormValues) {
    const idx = findIndex(groups, (g) => g.id === group.id);
    if (idx === -1) return;

    groups.splice(idx, 1);
    onChange([...groups]);
  }

  return (
    <div className={`space-y-7`}>
      {groups.map((v, idx) => {
        return (
          <div key={v.id + "group"} className="flex items-start space-x-5">
            <div className="flex items-baseline flex-shrink-0">
              <Typography
                weight="bold"
                color="black"
                className={`flex-shrink-0 mt-3`}
                text={`${t("product-group-input-label")} ${idx + 1}`}
              />
              <RequiredSign />
              <span className={`ml-2`}>:</span>
            </div>
            <div className={`w-full relative space-y-8`}>
              <ProductGroupForm
                onDeleteGroup={handleGroupDelete}
                onChange={handleGroupChange}
                defaultValue={v}
                key={v.id}
              />
            </div>
          </div>
        );
      })}

      <div className="flex items-start space-x-5">
        <Typography
          weight="bold"
          color="black"
          className={`flex-shrink-0 mt-3`}
          text={`${t("variation-price-input-label")} : `}
        />

        <div className={`w-full relative`}>
          <PGAddGroupButton onClick={generatePackage} groups={groups} />
        </div>
      </div>
    </div>
  );
};
export default ProductGroupManager;
