import XIcon from "@assets/icons/x-icon";
import InlineLabel from "@components/post-tender-form/inline-label";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ProductGroupClassificationInput from "./product-group-classification-input";

export interface IGroupClassification {
  id: string;
  name: string;
}

export interface IGroupFormValues {
  id: string;
  name: string;
  classifications: IGroupClassification[];
}

interface IProductPriceInputProps {
  defaultValue: IGroupFormValues;
  onChange: (e: IGroupFormValues) => void;
  onDeleteGroup: (e: IGroupFormValues) => void;
}

const ProductGroupForm: React.FC<IProductPriceInputProps> = ({
  defaultValue,
  onChange,
  onDeleteGroup,
}) => {
  const labelWidth = "100px";
  const { t } = useTranslation("form");
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<IGroupFormValues>({
    defaultValues: defaultValue,
  });

  const inputtedName = getValues("name");
  const nameInputError =
    errors?.name?.message || !inputtedName
      ? t("group-name-required-error")
      : "";

  function getData() {
    const data: IGroupFormValues = {
      id: getValues("id"),
      name: inputtedName,
      classifications: getValues("classifications"),
    };

    return data;
  }

  const [isDisabledClassifactionIput, setIsDisabledClassifactionIput] =
    useState(!inputtedName);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) setIsDisabledClassifactionIput(true);
    else setIsDisabledClassifactionIput(false);

    onChange(getData());
  }

  function handleClassificationsChange() {
    onChange(getData());
  }

  function handleDeleteGroup() {
    onDeleteGroup(getData());
  }

  return (
    <div className="p-5 rounded-sm bg-gray-10 space-y-3 bg-opacity-50 border relative">
      <p className={`text-right`}>
        <Button
          variant="custom"
          className={`self-end !h-5 !p-1`}
          onClick={handleDeleteGroup}
        >
          <XIcon />
        </Button>
      </p>
      <Wrapper shouldItemStart={!!nameInputError}>
        <InlineLabel
          text={t("group-price-groupName-input-label")}
          textClass={`font-semibold opacity-90`}
          className={`flex-shrink-0 text-right ${!!nameInputError && "mt-2"}`}
          labelWidth={labelWidth}
          narrowColon
        />

        <Input
          className={`w-full`}
          {...register("name")}
          autoFocus
          error={nameInputError}
          onChange={(e) => {
            register("name").onChange(e);
            handleNameChange(e);
          }}
        />
      </Wrapper>

      <Wrapper shouldItemStart>
        <InlineLabel
          text={t("group-price-groupClassification-input-label")}
          textClass={`font-semibold opacity-90`}
          className={`flex-shrink-0 text-right ${!!errors.name && "mt-1"} mt-2`}
          labelWidth={labelWidth}
          narrowColon
        />
        <ProductGroupClassificationInput
          onChange={handleClassificationsChange}
          disabled={isDisabledClassifactionIput}
          control={control}
          name="classifications"
        />
      </Wrapper>
    </div>
  );
};

interface IWrapperProps {
  children: any;
  className?: string;
  shouldItemStart?: boolean;
}

function Wrapper({ children, className, shouldItemStart }: IWrapperProps) {
  return (
    <div
      className={`flex ${
        shouldItemStart ? "items-start" : "items-center"
      } w-full ${className}`}
    >
      {children}
    </div>
  );
}
export default ProductGroupForm;
