import { useTranslation } from "next-i18next";
import React from "react";
import { GeneralFormValue } from "../post-request-schema";
import ImagesSection from "./images-section";
import { IFile } from "@components/ui/storybook/document-uploader";
import { IFile as IServerFile } from "@graphql/types.graphql";

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
  const { industry, category, name, description } = formValues || {};
  const { t } = useTranslation("form");
  return (
    <div className="flex">
      <div className={`w-full ${hasImage && "md:w-2/3"}`}>
        <div className="flex justify-between mb-5">
          <h3>{t("general-information-check-title")}</h3>
          <p
            className="text-blue cursor-pointer"
            onClick={() => changeSection(1)}
          >
            {t("edit-label")}
          </p>
        </div>
        <div className="mb-5">
          <p className="text-semibold font-semibold">
            {t("check-request-name")}
          </p>
          <p className="">{name}</p>
        </div>

        <div className="mb-5">
          <p className="text-semibold font-semibold">
            {t("check-industry-label")}
          </p>
          <p className="">
            <span>{t("industry:" + industry?.label)}</span>
            <span className="mx-2">{">"}</span>
            <span>{t("industry:" + industry?.label)}</span>
          </p>
        </div>

        {description && (
          <div className="mb-5">
            <p className="text-semibold font-semibold">
              {t("check-desctiption-label")}
            </p>
            <p className="">{description}</p>
          </div>
        )}
      </div>
      {hasImage && (
        <ImagesSection
          getImageSrc={(img) =>
            !(img as IFile)?.localUrl
              ? ((img as IServerFile)?.path as string)
              : (img as IFile).localUrl
          }
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
