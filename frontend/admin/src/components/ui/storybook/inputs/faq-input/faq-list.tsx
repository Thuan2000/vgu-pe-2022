import React from "react";
import FAQ from "./faq";
import { IFaq } from "./faq-list-creator";

interface IFAQListProps {
  faqs: IFaq[];
  onEditedFaq?: (f: IFaq) => void;
  onDeletedFaq?: (f: IFaq) => void;
}

const FAQList: React.FC<IFAQListProps> = ({
  faqs = [],
  onEditedFaq,
  onDeletedFaq,
}) => {
  return (
    <div className="mt-2 space-y-2">
      {!!faqs.length &&
        faqs.map((faq) => (
          <FAQ
            key={faq.id + "faq-qa"}
            onEdited={onEditedFaq}
            onDelete={onDeletedFaq}
            faq={faq}
          />
        ))}
    </div>
  );
};
export default FAQList;
