import TrashCanIcon from "@assets/icons/trash-can-icon";
import Button from "@components/ui/storybook/button";
import Input from "@components/ui/storybook/inputs/input";
import { generateUUID } from "@utils/functions";
import { findIndex } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { IGroupClassification } from "./product-price-input";

interface IProductGroupClassificationInputProps {
  control: Control<any>;
  name: string;
}

const ProductGroupClassificationInput: React.FC<
  IProductGroupClassificationInputProps
> = ({ control, name, ...props }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <ClassificationInput value={value} onChange={onChange} />
      )}
    />
  );
};

interface IClassInputProps {
  value: IGroupClassification[];
  onChange: (e: IGroupClassification[]) => void;
}

const defaultValue: IGroupClassification[] = [
  {
    id: generateUUID(),
    name: "",
  },
];

function ClassificationInput({
  onChange,
  value: classifications = defaultValue,
}: IClassInputProps) {
  const { t } = useTranslation();

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

  return (
    <div className={`w-full space-y-4`}>
      {classifications.map((c) => {
        return (
          <div className={`fic w-full space-x-3`}>
            <Input className={`w-full`} />

            <TrashCanIcon
              className={`cursor-pointer ${
                classifications.length < 2 && "invisible"
              }`}
              onClick={() => deleteClassification(c)}
            />
          </div>
        );
      })}

      <Button
        variant="outline"
        color="secondary-1"
        onClick={addClassification}
        className="hover:!bg-secondary-1 w-full"
      >
        {t("pgci-add-classification-button-label")}
      </Button>
    </div>
  );
}

export default ProductGroupClassificationInput;
