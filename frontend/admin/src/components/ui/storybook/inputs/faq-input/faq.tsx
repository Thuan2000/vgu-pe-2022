import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import Typography from "../../typography";
import FAQCreator from "./faq-creator";
import { IFaq } from "./faq-list-creator";

interface IFAQProps {
  faq: IFaq;
  onEdited: (f: IFaq) => void;
}

const FAQ: React.FC<IFAQProps> = ({ faq, onEdited }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  function handleEdited(newFaq: IFaq) {
    onEdited(newFaq);
    setIsEditing(false);
  }

  return (
    <>
      <div className="border border-gray-200 p-3 rounded-sm">
        <div className="flex items-center justify-between">
          <Typography text={faq.question} size="md" variant="smallTitle" />
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            type="button"
            className="!text-secondary-1 text-sm"
          >
            {t("edit-label")}
          </button>
        </div>
        <Typography text={faq.answer} size="xs" className="text-gray-200" />
      </div>
      {isEditing && <FAQCreator onCreate={handleEdited} initValue={faq} />}
    </>
  );
};
export default FAQ;
