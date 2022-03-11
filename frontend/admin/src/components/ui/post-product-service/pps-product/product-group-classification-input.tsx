import TrashCanIcon from "@assets/icons/trash-can-icon";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { IGroupClassification } from "./product-group-form";

interface IProductGroupClassificationInputProps
  extends Partial<IClassInputProps> {
  control: Control<any>;
  name: string;
  isFocusedGNI: boolean;
}

const ProductGroupClassificationInput: React.FC<
  IProductGroupClassificationInputProps
> = ({ control, name, onChange: parentOnChange, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <ClassificationInput
          value={value}
          onChange={(e) => {
            onChange(e);
            if (!!parentOnChange) parentOnChange(e);
          }}
          {...(props as any)}
        />
      )}
    />
  );
};

interface IClassInputProps {
  isFocusedGNI: boolean;
  disabled: boolean;
  value: IGroupClassification[];
  onChange: (e: IGroupClassification[]) => void;
}

const defaultClassificationValue = (): IGroupClassification[] => [
  {
    id: generateUUID(),
    name: "",
  },
];

function ClassificationInput({
  onChange,
  disabled,
  value: classifications = defaultClassificationValue(),
  isFocusedGNI,
}: IClassInputProps) {
  const { t } = useTranslation("form");

  function addClassification() {
    if (!classifications[classifications.length - 1]?.name) return;

    const newClassification: IGroupClassification = {
      id: generateUUID(),
      name: "",
    };

    onChange([...classifications, newClassification]);
  }

  function deleteClassification(classification: IGroupClassification) {
    const idx = findIndex(classifications, (v) => v.id === classification.id);
    if (idx === -1) return;

    classifications.splice(idx, 1);
    onChange([...classifications]);
  }

  function handleClassificationChange({ id, name }: IGroupClassification) {
    const idx = findIndex(classifications, (v) => v.id === id);
    if (idx === -1) return;

    classifications[idx].name = name;
    onChange([...classifications]);
  }

  return (
    <div className={`w-full space-y-4`}>
      {classifications.map((c, idx) => {
        const error =
          !c.name && !disabled ? t("classification-name-required-error") : "";

        return (
          <div
            key={c.name + c.id + "classification"}
            className={`flex items-${
              !!error ? "start" : "center"
            } w-full space-x-3`}
          >
            <Input
              disabled={disabled}
              onChange={(e) =>
                handleClassificationChange({ id: c.id, name: e.target.value })
              }
              autoFocus={idx === classifications.length - 1 && !isFocusedGNI}
              value={c.name}
              error={error}
              className={`w-full`}
            />

            {classifications.length > 1 && (
              <Button variant="custom" onClick={() => deleteClassification(c)}>
                <TrashCanIcon className={`cursor-pointer`} />
              </Button>
            )}
          </div>
        );
      })}

      <Button
        variant="outline"
        color="secondary-1"
        onClick={addClassification}
        disabled={disabled}
        className={`w-full hover:!bg-white ${
          !disabled && "hover:!text-secondary-1"
        }`}
      >
        {t("pgci-add-classification-button-label")}
      </Button>
    </div>
  );
}

export default ProductGroupClassificationInput;
