import React, { forwardRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useFormContext } from "react-hook-form";

import { IPostProductFormValues } from "./pps-product-interface";
import NumberInput from "@components/ui/storybook/inputs/number-input";
import DocumentInput from "@components/ui/storybook/document-input";
import { getDocumentAccept } from "@utils/functions";
import Input from "@components/ui/storybook/inputs/input";
import SectionWrapper from "@components/ui/record-navigations/section-wrapper";
import { MINIMUM_PRODUCT_DESC } from "./pps-product-schema";
import Typography from "@components/ui/storybook/typography";
import { useModal } from "src/contexts/modal.context";
import PPSProductCategoryInput from "./pps-product-category-input";
import dynamic from "next/dynamic";
import Modal from "@components/ui/modal";

interface IPPSProductDetailsInputProps {}

const RichTextInput = dynamic(
  import("@components/ui/storybook/inputs/rich-text-input"),
  { ssr: false }
);

const PPSProductGeneralInput = forwardRef<
  HTMLTableSectionElement,
  IPPSProductDetailsInputProps
>(({}, ref) => {
  const { t } = useTranslation("form");
  const [isSelectingIC, setIsSelectingIC] = useState(false);
  const {
    formState: { errors },
    control,
    trigger,
    register,
    getValues,
  } = useFormContext<IPostProductFormValues>();

  const selectedIndustry = getValues("general.industry");
  const selectedCategory = getValues("general.category");
  const selectedICText = !!selectedCategory
    ? `${t("industry:" + selectedIndustry.label)} > ${t(
        "category:" + selectedCategory.label
      )}`
    : t("not-selected");

  const descriptionError = errors.general?.description?.message;

  function closeICModal() {
    setIsSelectingIC(false);
  }

  return (
    <>
      <Modal
        closeOnClickOutside={false}
        onClose={closeICModal}
        isOpen={isSelectingIC}
        isPhoneFullScreenContent={true}
      >
        <PPSProductCategoryInput onSelect={closeICModal} />
      </Modal>
      <SectionWrapper sectionTitle={t("general-nav-label")} ref={ref}>
        <div className="space-y-3" ref={ref}>
          <Input
            required
            {...register("general.name")}
            label={t("productName-input-label")}
            onChange={(e) => {
              register("general.name").onChange(e);
              trigger("general.name");
            }}
            placeholder={t("productName-input-placeholder")}
            error={t(errors.general?.name?.message || "")}
          />
          <RichTextInput
            labelProps={{
              required: true,
              label: t("postProduct-description-input-label"),
            }}
            control={control}
            name="general.description"
            onChange={() => trigger("general.description")}
            error={
              !!descriptionError
                ? `${t(descriptionError)}: ${MINIMUM_PRODUCT_DESC}`
                : ""
            }
          />
          <NumberInput
            label={t("minOrder-input-label")}
            control={control}
            onChange={() => {
              trigger("general.minOrder");
            }}
            required
            placeholder={t("minOrder-input-label")}
            name="general.minOrder"
            error={t(errors.general?.minOrder?.message || "")}
          />
          <DocumentInput
            required
            inputFileType="image"
            control={control}
            multiple
            name="general.images"
            onChange={(_) => trigger("general.images")}
            accept="image/*"
            label={t("postService-image-input-label")}
            error={t((errors.general?.images as any)?.message || "")}
          />
          <DocumentInput
            inputFileType="video"
            control={control}
            multiple
            name="general.videos"
            onChange={(_) => trigger("general.videos")}
            accept="video/*"
            label={t("postService-videos-input-label")}
            error={t((errors.general?.videos as any)?.message || "")}
          />
          <DocumentInput
            control={control}
            inputFileType="application"
            multiple
            name="general.certificates"
            onChange={(_) => trigger("general.certificates")}
            accept={getDocumentAccept()}
            label={t("postService-certificates-input-label")}
            error={t((errors.general?.certificates as any)?.message || "")}
          />
          <div className={`fic space-x-2`}>
            <Typography text={`${t("industry-category-input-label")}:`} />
            <Typography
              text={selectedICText}
              weight="semibold"
              className={`cursor-[pointer] ${
                !!selectedCategory ? "!text-primary" : "!text-red"
              }`}
              onClick={() => setIsSelectingIC(true)}
            />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
});
export default PPSProductGeneralInput;
