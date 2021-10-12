import React, { ChangeEvent, useEffect } from "react";
import Image from "next/image";

import { IBuyingRequest } from "@graphql/types.graphql";
import { useTranslation } from "react-i18next";
import BRCGeneralInfo from "./brc-general-info";
import Checkbox from "@components/ui/storybook/checkbox";
import { siteSettings } from "@settings/site.settings";
import BrcExtras from "./brc-extras";
import BRCExternalInfo from "./brc-external-info";
import { useBRContext } from "src/contexts/buying-request.context";
import { indexOf, remove } from "lodash";
import { useRouter } from "next/dist/client/router";

interface IBuyingRequestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({
  br,
  className,
  ...props
}) => {
  const { t } = useTranslation("common");
  const { query, pathname, ...router } = useRouter();
  const { selecteds, setSelecteds } = useBRContext();

  const isSelected = indexOf(selecteds, parseInt(br.id)) !== -1;

  function addToSelecteds(id: number) {
    const index = indexOf(selecteds, id);
    if (index !== -1) return;

    const newSelecteds: any = [...selecteds, id];
    setSelecteds(newSelecteds);
  }

  function removeFromSelecteds(id: number) {
    const index = indexOf(selecteds, id);
    if (index === -1) return;

    selecteds.splice(index, 1);
    const newSelecteds: any = [...selecteds];
    setSelecteds(newSelecteds);
  }

  function handleSelectChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) addToSelecteds(parseInt(e.target.id));
    else if (!e.target.checked) removeFromSelecteds(parseInt(e.target.id));
  }

  function toBRDetails() {
    router.push({
      pathname: `buying-requests/${br.slug}`,
    });
  }

  return (
    <div
      className={`border rounded-md shadow-md flex relative bg-${
        isSelected ? "primary bg-opacity-20 border-primary" : "white"
      } md:w-49p ${className} max-h-44`}
      onClick={toBRDetails}
      {...props}
    >
      <div className="absolute left-4 top-4 z-50">
        <Checkbox name={br.id} className="z-50" onChange={handleSelectChange} />
      </div>
      <div className="relative w-32 md:w-40 flex-center flex-shrink-0">
        <Image
          src={br.gallery?.at(0)?.location || siteSettings?.logo?.url}
          alt={br.name}
          className="m-5 rounded-l-md"
          layout="fill"
        />
      </div>
      <div className="ml-2 md:ml-5 py-4 w-full">
        <BRCGeneralInfo
          name={br.name}
          minOrder={br.minOrder}
          status={br.status}
          location={br.location}
          unit={br.unit}
        />
        <BRCExternalInfo
          className="my-2"
          commentsCount={br.commentsCount}
          bidsCount={br.bidsCount}
          projectsCount={br.projectsCount}
        />
        <BrcExtras updatedAt={br.updatedAt} />
      </div>
    </div>
  );
};
export default BuyingRequestCard;
