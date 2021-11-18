import PencilIcon from "@assets/icons/pencil-icon";
import TrashCanIcon from "@assets/icons/trash-can-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Typography from "../../typography";
import FAQCreator from "./faq-creator";
import { IFaq } from "./faq-list-creator";

interface IFAQProps {
  faq: IFaq;
  onEdited?: (f: IFaq) => void;
  onDelete?: (f: IFaq) => void;
}

const FAQ: React.FC<IFAQProps> = ({ faq, onEdited, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdited(newFaq: IFaq) {
    if (onEdited) onEdited(newFaq);
    setIsEditing(false);
  }

  function handleDeletedFaq() {
    if (onDelete) onDelete(faq);
  }

  return (
    <>
      <div className="border border-gray-200 p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <Typography text={faq.question} size="md" variant="smallTitle" />
          <div className="fic !space-x-5">
            {!!onEdited && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                type="button"
                className="!text-secondary-1 text-sm"
              >
                <PencilIcon
                  className="w-4 h-4"
                  fill={COLORS["SECONDARY-1"].DEFAULT}
                />
              </button>
            )}

            {!!onDelete && !isEditing && (
              <button
                onClick={handleDeletedFaq}
                type="button"
                className="!text-secondary-1 text-sm"
              >
                <TrashCanIcon
                  className="w-4 h-4"
                  fill={COLORS["SECONDARY-1"].DEFAULT}
                />
              </button>
            )}
          </div>
        </div>
        <Typography text={faq.answer} size="xs" className="text-gray-200" />
      </div>
      {isEditing && (
        <FAQCreator
          onCancel={() => setIsEditing(false)}
          onCreate={handleEdited}
          initValue={faq}
        />
      )}
    </>
  );
};
export default FAQ;
