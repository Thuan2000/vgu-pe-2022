import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

import { IBuyingRequest } from "@graphql/types.graphql";
import { useTranslation } from "react-i18next";
import BRCGeneralInfo from "./brc-general-info";
import Checkbox from "@components/ui/storybook/checkbox";
import { siteSettings } from "@settings/site.settings";
import BrcExtras from "./brc-extras";
import BRCExternalInfo from "./brc-external-info";
import { useBRContext } from "src/contexts/buying-request.context";
import { findIndex, indexOf, remove } from "lodash";
import { useRouter } from "next/dist/client/router";

interface IBuyingRequestCardProps extends React.HTMLAttributes<HTMLDivElement> {
  br: IBuyingRequest;
  refreshBr: () => void;
}

const BuyingRequestCard: React.FC<IBuyingRequestCardProps> = ({
  br,
  className,
  refreshBr,
  ...props
}) => {
  const { t } = useTranslation("common");
  const { query, pathname, ...router } = useRouter();
  const { selecteds, setSelecteds } = useBRContext();
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    const indexOnSelecteds = findIndex(
      selecteds,
      (selected) => selected.id === br.id
    );
    const isSelected =
      indexOnSelecteds !== -1 &&
      !(selecteds?.at(indexOnSelecteds) as any)?.unChecked === true;

    setIsSelected(isSelected);
  }, [br.id, selecteds]);

  function addToSelecteds() {
    const index = findIndex(
      selecteds,
      (selected: any) => selected.id === br.id
    );

    if (index !== -1) return;

    const newSelecteds: any = [...selecteds, br];
    setSelecteds(newSelecteds);
  }

  function removeFromSelecteds() {
    const index = findIndex(
      selecteds,
      (selected: any) => selected.id === br.id
    );

    if (index === -1) return;

    selecteds.splice(index, 1);
    const newSelecteds: any = [...selecteds];
    setSelecteds(newSelecteds);
  }

  function handleSelectChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) addToSelecteds();
    else if (!e.target.checked) removeFromSelecteds();
  }

  return (
    <div
      className={`border rounded-md shadow-md flex relative bg-${
        isSelected ? "primary bg-opacity-20 border-primary" : "white"
      } md:w-49p ${className} max-h-44`}
      {...props}
    >
      <div className="absolute left-4 top-4 z-20">
        <Checkbox
          name={`${br.id}${br.name}`}
          className="z-10"
          onChange={handleSelectChange}
          checked={isSelected}
        />
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
          slug={br.slug}
        />
        <BRCExternalInfo
          className="my-2"
          bidsCount={br.bidIds?.length || 0}
          projectsCount={br.projectIds?.length || 0}
          commentsCount={br.commentIds?.length || 0}
        />
        <BrcExtras
          refreshBr={refreshBr}
          brId={parseInt(br.id)}
          updatedAt={br.updatedAt}
        />
      </div>
    </div>
  );
};
export default BuyingRequestCard;
