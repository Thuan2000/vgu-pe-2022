import React, { useEffect } from "react";
import { UseFormGetValues } from "node_modules/react-hook-form";
import { PostRequestFormValue } from "./post-request-schema";
import GeneralSection from "./check-section/general-section";
import DetailsSection from "./check-section/details-section";
import { useTranslation } from "react-i18next";
import Divider from "@components/ui/divider";
import AdditionalSection from "./check-section/additional-section";

interface ICheckSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  getValues: UseFormGetValues<PostRequestFormValue>;
  changeSection: (id: number) => void;
}

const CheckSection: React.FC<ICheckSectionProps> = ({
  getValues,
  changeSection,
  ...props
}) => {
  const { t } = useTranslation();

  const details = getValues("details");
  const general = getValues("general");
  const additional = getValues("additional");

  useEffect(() => {
    if (!general) {
      changeSection(1);
      return;
    } else if (!details) {
      changeSection(2);
      return;
    }
  });

  return (
    <div>
      <h3 className="text-md sm:text-lg my-10">
        {t("check-section-title-label")}
      </h3>
      {details?.images?.length > 0 && (
        <div className="relative border-2 border-gray-200 my-5 md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={details?.images[0]?.localUrl || ""}
            alt={details?.productName?.name || ""}
            width={340}
            height={200}
            className="p-3"
          />
          <p
            className="absolute w-full bottom-0 text-white bg-primary flex-center py-3"
            onClick={() => changeSection(2)}
          >
            {t("change-photo-label")}
          </p>
        </div>
      )}
      <div className="flex flex-col">
        <GeneralSection formValues={general} changeSection={changeSection} />
        <Divider className="mb-7" />
        <DetailsSection formValues={details} changeSection={changeSection} />
        {additional && (
          <AdditionalSection
            formValues={additional}
            changeSection={changeSection}
          />
        )}
      </div>
    </div>
  );
};
export default CheckSection;
