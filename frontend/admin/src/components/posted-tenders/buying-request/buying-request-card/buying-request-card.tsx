import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { IBuyingRequest } from "@graphql/types.graphql";

import BRCGeneralInfo from "./brc-general-info";
import Checkbox from "@components/ui/storybook/checkbox";
import { siteSettings } from "@settings/site.settings";
import BrcExtras from "./brc-extras";
import BRCExternalInfo from "./brc-external-info";
import { useTranslation } from "react-i18next";

export interface IExtraMenu {
  label: string;
  icon: any;
  onClick: (br: IBuyingRequest) => void;
}
interface IBuyingRequestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
  onSelectChange: (
    e: ChangeEvent<HTMLInputElement>,
    br?: IBuyingRequest
  ) => void;
  extraMenus: IExtraMenu[];
  isSelected: boolean;
  postedTextLabel: string;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({
  br,
  className,
  onSelectChange,
  extraMenus,
  isSelected,
  postedTextLabel,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`border rounded-md shadow-md flex relative md:w-49p max-h-44
          ${
            isSelected ? "bg-primary bg-opacity-20 border-primary" : "bg-white"
          } 
          ${className} 
        `}
      {...props}
    >
      <div className="absolute left-4 top-4 z-20">
        <Checkbox
          name={`${br.id}${br.name}`}
          className="z-10"
          onChange={(e) => onSelectChange(e, br)}
          checked={isSelected}
        />
      </div>
      <div className="relative w-32 md:w-40 flex-center flex-shrink-0">
        <Image
          src={br.gallery?.at(0)?.url || siteSettings?.logo?.url}
          alt={br.name}
          className="m-5 rounded-l-md"
          layout="fill"
        />
      </div>
      <div className="ml-2 md:ml-5 py-4 w-full">
        <BRCGeneralInfo
          name={`${t("form:requestNamePrefix-value")} - 
            ${br.name}
            `}
          minOrder={br.minOrder}
          status={br.status}
          location={br.location}
          unit={br.unit}
          slug={br.slug}
        />
        <BRCExternalInfo
          className="my-2"
          projectsCount={br.projects?.length || 0}
          bidsCount={br.bids?.length || 0}
          commentsCount={0}
          // commentsCount={br.comments?.length || 0}
        />
        <BrcExtras
          postedTextLabel={postedTextLabel}
          br={br}
          updatedAt={br.updatedAt}
          extraMenus={extraMenus}
        />
      </div>
    </div>
  );
};
export default BuyingRequestCard;
