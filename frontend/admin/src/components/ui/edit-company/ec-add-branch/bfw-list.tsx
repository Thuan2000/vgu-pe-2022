import { PlusIcon } from "@assets/icons/plus-icon";
import { COLORS } from "@utils/colors";
import { findIndex } from "lodash";
import React, { useEffect, useState } from "react";
import { useModal } from "src/contexts/modal.context";
import Button from "../../storybook/button";
import InputLabel from "../../storybook/inputs/input-label";
import { IRawBFW, IBFWInput } from "./bfw-constants";
import AddBFWForm from "./add-bfw-form";
import ECBFWItem from "./bfw-item";

export interface IBFWList {
  label: string;
  buttonLabel: string;
  onChange?: (bwfs: IRawBFW[]) => void;
  value?: IRawBFW[];
  siblingCheckboxLabel?: string;
  handleAddedSibling?: (b: IRawBFW) => void;
  formTitle: string;
}

const BFWList: React.FC<IBFWList> = ({
  value = [],
  onChange,
  label,
  buttonLabel,
  siblingCheckboxLabel,
  handleAddedSibling,
  formTitle,
}) => {
  const { openModal, closeModal } = useModal();
  const [Bfws, setBfws] = useState<IRawBFW[]>(value);

  // @TODO : Find the better way than this,
  // @PROBLEM : this run every second
  // useEffect(() => {
  //   if (value !== Bfws) setBfws(value);
  // }, [value]);

  function addBranch() {
    openModal(
      (
        <AddBFWForm
          formTitle={formTitle}
          siblingCheckboxLabel={siblingCheckboxLabel}
          onCreated={handleAddedBfw}
          onCancel={closeModal}
        />
      ) as any
    );
  }

  function handleDeleteBFW(bfw: IRawBFW) {
    const idx = findIndex(Bfws, ({ id }) => id === bfw.id);
    Bfws.splice(idx, 1);
    setBfws([...Bfws]);
    if (onChange) onChange(Bfws);
  }

  function handleAddedBfw({ isForSiblingToo, ...b }: IBFWInput) {
    if (isForSiblingToo && handleAddedSibling) handleAddedSibling(b);

    const newBfws = [...Bfws, b];
    setBfws(newBfws);
    if (onChange) onChange(newBfws);
    closeModal();
  }

  return (
    <div className="space-y-2">
      <InputLabel label={label} />
      {Bfws.length > 0 && (
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {Bfws.map((b) => (
            <ECBFWItem
              key={b.id + "bfw-id"}
              onDelete={handleDeleteBFW}
              bfw={b}
            />
          ))}
        </div>
      )}
      <Button
        onClick={addBranch}
        className="w-1/3"
        variant="outline"
        color="secondary-1"
      >
        <PlusIcon
          fill={COLORS["SECONDARY-1"].DEFAULT}
          className="w-4 h-4 mr-2"
        />
        {buttonLabel}
      </Button>
    </div>
  );
};
export default BFWList;
