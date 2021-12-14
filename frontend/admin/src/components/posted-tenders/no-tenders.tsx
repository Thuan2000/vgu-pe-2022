import DocumentAddIcon from "@assets/icons/document-add-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import Typography from "@components/ui/storybook/typography";
import React from "react";

interface INoPostedProps {
  text: string;
  href: string;
  buttonLabel: string;
}

const NoPosted: React.FC<INoPostedProps> = ({ text, href, buttonLabel }) => {
  return (
    <div className="bg-white md:py-10 rounded-sm md:rounded-lg py-10 text-dark-blue">
      <div className="font-semibold flex-center flex-col">
        <Typography className="mb-5" text={text} variant="bigTitle" />
        <Link href={href}>
          <Button>
            <DocumentAddIcon className="mr-2" />
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NoPosted;
