import Chip from "@components/ui/chip";
import { IBuyingRequest } from "@graphql/types.graphql";
import React from "react";
import { useTranslation } from "react-i18next";
interface IBRCGeneralInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  minOrder: number;
  status: string;
  location: string;
  unit: string;
}
const BRCGeneralInfo: React.FC<IBRCGeneralInfoProps> = ({
  name,
  minOrder,
  status,
  location,
  unit,
  ...props
}) => {
  const { t } = useTranslation("common");
  return (
    <div {...props}>
      <h5 className="text-dark-blue md:text-md">{name}</h5>
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
