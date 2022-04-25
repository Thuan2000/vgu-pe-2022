import React from "react";
import Typography from "../storybook/typography";

interface ISectionWrapperProps {
  children: React.ReactNode;
  sectionTitle: string;
}

const SectionWrapper = React.forwardRef<
  HTMLTableSectionElement,
  ISectionWrapperProps
>(({ sectionTitle, children }, ref) => {
  return (
    <section
      ref={ref}
      className="bg-white border border-gray-100 md:rounded-sm translate-y-[-2px] px-10 py-6"
    >
      <Typography
        text={sectionTitle}
        variant="smallTitle"
        size="lg"
        className="mb-5"
      />

      {children}
    </section>
  );
});
export default SectionWrapper;
