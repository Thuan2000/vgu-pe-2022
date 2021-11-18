import React, { useEffect, useState } from "react";
import FAQCreator from "./faq-creator";
import InputLabel, { IInputLabelProps } from "../input-label";
import FAQList from "./faq-list";
import Button from "../../button";
import { PlusIcon } from "@assets/icons/plus-icon";
import { useTranslation } from "react-i18next";
import { findIndex } from "lodash";
import ValidationError from "../../validation-error";

export interface IFaq {
  id: number;
  question: string;
  answer: string;
}

export interface IFAQListCreatorProps extends IInputLabelProps {
  onChange?: (e: IFaq[]) => void;
  value?: IFaq[];
  error?: string;
}

const FAQListCreator: React.FC<IFAQListCreatorProps> = ({
  className,
  numberQueue,
  name,
  onChange,
  note,
  queueBackground,
  label,
  value = [],
  required,
  error,
}) => {
  const { t } = useTranslation("form");

  const [faqs, setFaqs] = useState<IFaq[]>(value);
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);

  function handleCreateFaq(faq: IFaq) {
    setFaqs([...faqs, faq]);
    setIsCreatingFaq(false);
  }

  function handleEditedFaq(faq: IFaq) {
    const idx = findIndex(faqs, (f) => f.id === faq.id);

    faqs[idx] = faq;

    setFaqs([...faqs]);
  }

  function handleDeletedFaq(faq: IFaq) {
    const idx = findIndex(faqs, (f) => f.id === faq.id);

    faqs.splice(idx, 1);

    setFaqs([...faqs]);
  }

  useEffect(() => {
    if (faqs.length && onChange) onChange(faqs);
  }, [faqs]);

  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center">
          <InputLabel
            numberQueue={numberQueue}
            name={name}
            note={note}
            className={"!mb-0"}
            queueBackground={queueBackground}
            label={label}
            required={required}
          />
          <Button
            onClick={() => setIsCreatingFaq(true)}
            variant="custom"
            className="bg-gray-100 !rounded-3xl !text-xs"
          >
            {t("addFaq-button-label")}
            <PlusIcon className="ml-1 w-3 h-3" />
          </Button>
        </div>
      )}
      <div className={`space-y-3 ${!!numberQueue && "ml-8"}`}>
        <FAQList
          onEditedFaq={handleEditedFaq}
          faqs={faqs}
          onDeletedFaq={handleDeletedFaq}
        />
        {(faqs.length === 0 || isCreatingFaq) && (
          <FAQCreator
            onCancel={() => setIsCreatingFaq(false)}
            faqsLength={faqs.length}
            onCreate={handleCreateFaq}
          />
        )}
      </div>
      <ValidationError message={error} />
    </div>
  );
};
export default FAQListCreator;
