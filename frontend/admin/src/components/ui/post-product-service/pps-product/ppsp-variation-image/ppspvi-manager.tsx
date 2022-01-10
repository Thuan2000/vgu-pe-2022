import { find, findIndex, remove } from "lodash";
import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IPostProductFormValues } from "../pps-product-interface";
import { IProductVariation } from "../ppsp-variation-price/pppspvp-manager";
import { getCartesianVariation, getVariationDetails } from "../pppsp-util";
import { IGroupFormValues } from "../product-group-form";
import Typography from "@components/ui/storybook/typography";
import { useTranslation } from "react-i18next";
import CirclePlusIcon from "@assets/icons/circle-plus-icon";
import DocumentUploader from "@components/ui/storybook/document-uploader";
import PPSProductInlineLabel from "../pps-product-inline-label";
import { IFile } from "@graphql/types.graphql";

interface IPPSPVIManagerProps {
  value: IProductVariation[];
  onChange: (e: IProductVariation[]) => void;
}

const PPSPVIManager: React.FC<IPPSPVIManagerProps> = ({
  value = [],
  onChange,
}) => {
  const { t } = useTranslation();

  const { control } = useFormContext<IPostProductFormValues>();
  const groups: IGroupFormValues[] = useWatch<IPostProductFormValues>({
    control,
    name: "pricing.groups",
  }) as any;
  const variationOptions = getCartesianVariation(groups);

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else synchronizeValueAndVDs();
  }, [groups]);

  function synchronizeValueAndVDs() {
    const variationDetails = getVariationDetails(variationOptions);
    const synchronized = variationDetails.map(
      ({ image, price, title, ...rest }) => {
        const idx = findIndex(value, (v) => v.title === title);
        const curr = value[idx];

        return {
          title,
          price: curr?.price || price,
          image: curr?.image || image,
          ...rest,
        };
      }
    );

    onChange(synchronized);
  }

  function handleImageChange(id: string, image: IFile) {
    const idx = findIndex(value, (v) => v.id === id);
    if (idx === -1) return;

    value[idx].image = image;
    onChange([...value]);
  }

  if (!variationOptions?.length) return <div />;

  return (
    <div className="flex items-start space-x-5">
      <PPSProductInlineLabel label={t("variationImage-input-label")} />

      <div className={`fic flex-wrap space-x-4`}>
        {value.map(({ id, image, title }) => {
          return (
            <div key={id + "variation-image"} className={`space-y-2`}>
              <DocumentUploader
                hideUploadButton
                thumbOnInput
                multiple={false}
                value={image ? [image] : []}
                inputClassName="border-gray-200 w-32 h-32"
                onChange={(e) => handleImageChange(id, e?.[0])}
                dropZonePlaceholder={(<CirclePlusIcon />) as any}
                accept={"image/*"}
                inputFileType={"image"}
              />

              <Typography text={title} align="center" color="gray-400" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PPSPVIManager;
