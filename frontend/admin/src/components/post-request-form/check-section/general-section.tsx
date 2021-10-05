import { useTranslation } from "next-i18next";
import React from "react";
import { GeneralFormValue } from "../post-request-schema";
import ImagesSection from "./images-section";

interface IGeneralSection {
  formValues: GeneralFormValue;
  changeSection: (id: number) => void;
  images: any[];
  hasImage: boolean;
}

const GeneralSection: React.FC<IGeneralSection> = ({
  formValues,
  changeSection,
  hasImage,
  images,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <div className={`w-full ${hasImage && "md:w-2/3"}`}>
        <div className="flex justify-between mb-5">
          <h3>{t("general-information-check-title")}</h3>
          <p
            className="text-blue cursor-pointer"
            onClick={() => changeSection(2)}
          >
            {t("edit-label")}
          </p>
        </div>
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-request-name")}</p>
          <p className="font-semibold">{formValues?.name}</p>
        </div>
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-dueTime-label")}</p>
          <p className="font-semibold">{formValues?.endDate}</p>
        </div>
        <div className="mb-5">
          <p className="text-dark-blue">{t("check-location-label")}</p>
          <p className="font-semibold">{formValues?.location?.name}</p>
        </div>
        {formValues?.description && (
          <div className="mb-5">
            <p className="text-dark-blue">{t("check-desctiption-label")}</p>
            <p className="font-semibold">{formValues?.description}</p>
          </div>
        )}
      </div>
      {hasImage && (
        <ImagesSection
          images={images}
          className="hidden md:block ml-12 mb-10"
          changeSection={changeSection}
          imgWidth={250}
          imgHeight={190}
        />
      )}
    </div>
  );
};
export default GeneralSection;
