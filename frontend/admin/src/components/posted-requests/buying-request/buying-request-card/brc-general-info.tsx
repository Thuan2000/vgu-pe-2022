import Chip from "@components/ui/chip";
import Link from "@components/ui/link";
import { IBuyingRequest } from "@graphql/types.graphql";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useTranslation } from "react-i18next";
interface IBRCGeneralInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  minOrder: number;
  status: string;
  location: string;
  slug: string;
  unit: string;
}
const BRCGeneralInfo: React.FC<IBRCGeneralInfoProps> = ({
  name,
  minOrder,
  status,
  location,
  slug,
  unit,
  ...props
}) => {
  const { t } = useTranslation("common");

  return (
    <div {...props}>
      <Link href={`buying-requests/${slug}`}>
        <h5 className="text-dark-blue md:text-md cursor-pointer">{name}</h5>
      </Link>
      <p className="text-xs md:text-sm text-gray-300 md:my-1">
        {minOrder} {unit}
      </p>
      <div className="flex items-center">
        <Chip text={t(status)} background="secondary-1" className="mr-2" />
        <Chip text={t(location)} background="primary" />
      </div>
    </div>
  );
};
export default BRCGeneralInfo;
