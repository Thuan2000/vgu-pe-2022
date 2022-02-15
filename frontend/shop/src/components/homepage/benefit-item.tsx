import Image from "next/image";
import Typography from "@components/ui/storybook/typography";
import React from "react";

interface IBenefitItemProps {
  count: number;
  title: string;
  imgUrl: string;
}

const BenefitItem: React.FC<IBenefitItemProps> = ({ count, title, imgUrl }) => {
  return (
    <div className={`border-2 rounded-sm flex px-5 items-center`}>
      <Typography
        text={`${count}`}
        className={`text-[36pt] text-dark-blue`}
        weight="bold"
      />

      <Typography
        text={title}
        weight="bold"
        size="xl"
        className={`w-52 ml-6 mr-20`}
      />

      <div className={`relative w-32 h-32`}>
        <Image src={imgUrl} alt={title} layout="fill" />
      </div>
    </div>
  );
};
export default BenefitItem;
