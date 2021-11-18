import TrashCanIcon from "@assets/icons/trash-can-icon";
import Form from "@components/form";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Button from "../../button";
import CreateableSelectInput from "../../createable-select/createable-select-input";
import Input from "../input";
import NumberInput from "../number-input";
import TextArea from "../text-area";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { createUUID, preventSubmitOnEnter } from "@utils/functions";
import { ILocale, IUnitInput } from "@graphql/types.graphql";
import { useRouter } from "next/dist/client/router";
import { useUnitsQuery } from "@graphql/unit.graphql";

interface IServiceFormProps {
  onCreate: (e: IService) => void;
  initValue?: IService;
  isDisabled?: boolean;
}

type Key = "name" | "description" | "minPrice" | "maxPrice" | "unit";

interface IUnit {
  id: string;
  name: string;
}

export interface IServiceFormValue {
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  unit: IUnit;
}

export interface IService extends IServiceFormValue {
  id: string;
}

const serviceSchema = yup.object({
  name: yup.string().required("service-error-name-required"),
  description: yup.string().required("service-error-description-required"),
  minPrice: yup.number().required("service-error-minPrice-required"),
  maxPrice: yup
    .number()
    .required("service-error-maxPrice-required")
    .min(yup.ref("minPrice"), "post-request-maxPrice-more-than-error"),
  unit: yup.object().required("service-error-unit-required"),
});

const GPIServiceForm: React.FC<IServiceFormProps> = ({
  isDisabled,
  onCreate,
  initValue,
}) => {
  const { t } = useTranslation("form");
  const { locale } = useRouter();
  const keys: Key[] = ["name", "description", "minPrice", "maxPrice", "unit"];
  const { data } = useUnitsQuery({ variables: { locale: locale as any } });
  const units = data?.units || [];
  const {
    control,
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<IServiceFormValue>({
    resolver: yupResolver(serviceSchema),
  });

  async function triggerAll() {
    keys.forEach((k) => trigger(k));
  }

  function getAllValues(): IService {
    const values: any = {};

    keys.forEach((k) => (values[k] = getValues(k)));

    return values;
  }

  async function createService() {
    triggerAll();
    if (!isValid) return;

    const newService: IService = {
      ...getAllValues(),
      id: initValue?.id || createUUID(),
    };
    onCreate(newService);
  }

  function createNewUnit(name: string) {
    const newUnit: IUnitInput = {
      locale: locale as ILocale,
      name,
    };
    const newOpt = { id: createUUID(), ...newUnit };
    return newOpt;
  }

  return (
    <div className="bg-gray-10 border p-5 w-full space-y-3">
      <Input
        labelFontSize={"sm"}
        {...register("name")}
        onChange={(e) => {
          register("name").onChange(e);
          trigger("name");
        }}
        defaultValue={initValue?.name}
        label={t("group-price-service-name-label")}
        required
        placeholder={t("group-price-service-name-placholder")}
        error={errors.name?.message}
        {...preventSubmitOnEnter()}
        disabled={isDisabled}
      />
      <TextArea
        labelFontSize={"sm"}
        {...register("description")}
        onChange={(e) => {
          register("description").onChange(e);
          trigger("description");
        }}
        defaultValue={initValue?.description}
        label={t("group-price-service-description-name")}
        required
        placeholder={t("group-price-service-description-placholder")}
        error={errors.description?.message}
        disabled={isDisabled}
      />
      <div className="flex items-start justify-between space-x-5">
        <NumberInput
          className="w-full"
          control={control}
          name="minPrice"
          onChange={(_) => trigger("minPrice")}
          defaultValue={initValue?.minPrice}
          suffix={` ${t("budget-sign")}`}
          labelFontSize={"sm"}
          label={t("group-price-service-minPrice-label")}
          required
          error={errors.minPrice?.message}
          {...preventSubmitOnEnter()}
          disabled={isDisabled}
        />
        <NumberInput
          className="w-full"
          control={control}
          name="maxPrice"
          defaultValue={initValue?.maxPrice}
          onChange={(_) => trigger("maxPrice")}
          suffix={` ${t("budget-sign")}`}
          labelFontSize={"sm"}
          label={t("group-price-service-maxPrice-label")}
          required
          error={errors.maxPrice?.message}
          disabled={isDisabled}
        />
      </div>

      <CreateableSelectInput
        control={control}
        labelFontSize={"sm"}
        name="unit"
        onChange={(_) => trigger("unit")}
        label={t("group-price-service-unit-label")}
        required
        placeholder={t("group-price-service-unit-placeholder")}
        options={units}
        getOptionLabel={(opt) => opt.label || opt.name}
        getOptionValue={(opt) => opt.name}
        maxMenuHeight={155}
        createNewOption={createNewUnit}
        defaultValue={initValue?.unit}
        error={(errors.unit as any)?.message}
        isDisabled={isDisabled}
      />

      <div className="flex items-center space-x-5 justify-between">
        {initValue && (
          <Button variant="cancel" className="w-1/2.5">
            <TrashCanIcon className="w-4 h-4 mr-4" />
            {t("delete-button-label")}
          </Button>
        )}
        <Button
          onClick={createService}
          className={`${initValue ? "w-1/2.5" : "w-full"}`}
        >
          {t("submit-button-label")}
        </Button>
      </div>
    </div>
  );
};
export default GPIServiceForm;
