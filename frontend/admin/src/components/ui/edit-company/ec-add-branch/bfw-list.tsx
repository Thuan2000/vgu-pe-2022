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
import Modal from "@components/ui/modal";
import { useFormContext } from "react-hook-form";
import { ECFormValues } from "../ec-schema";

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
  const [Bfws, setBfws] = useState<IRawBFW[]>(value);
  const [isAddingBFW, setIsAddingBFW] = useState(false);

  useEffect(() => {
    if (value !== Bfws) setBfws(value);
  }, [value]);

  function addBranch() {
    setIsAddingBFW(true);
  }

  function handleDeleteBFW(bfw: IRawBFW) {
    const idx = findIndex(Bfws, ({ id }) => id === bfw.id);
    Bfws.splice(idx, 1);
    setBfws([...Bfws]);
    if (onChange) onChange(Bfws);
  }

  function closeModal() {
    setIsAddingBFW(false);
  }

  function handleAddedBfw({ isForSiblingToo, ...b }: IBFWInput) {
    if (isForSiblingToo && handleAddedSibling) handleAddedSibling(b);

    const newBfws = [...Bfws, b];
    setBfws(newBfws);
    if (onChange) onChange(newBfws);
    closeModal();
  }

  return (
    <>
      <Modal
        isOpen={isAddingBFW}
        onClose={closeModal}
        isPhoneFullScreenContent={false}
      >
        <AddBFWForm
          formTitle={formTitle}
          siblingCheckboxLabel={siblingCheckboxLabel}
          onCreated={handleAddedBfw}
          onCancel={closeModal}
        />
      </Modal>
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
          className="w-1/3 hover:!bg-secondary-1"
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
    </>
  );
};
export default BFWList;
