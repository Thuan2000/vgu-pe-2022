import PdfIcon from "@assets/icons/files/pdf-icon";
import SearchIcon from "@assets/icons/search-icon";
import { siteSettings } from "@settings/site.settings";
import React, { ChangeEvent, useState } from "react";
import Checkbox from "./storybook/checkbox";
import Input from "./storybook/inputs/input";
import InputLabel, { IInputLabelProps } from "./storybook/inputs/input-label";
import Loader from "./storybook/loader/loader";

interface IRequestSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  numberQueue?: number | string;
  note?: string;
  className?: string;
  label?: string;
  queueBackground?: string;
  loading: boolean;
  createNewLabel: string;
  noProjectMessage: string;
  requests: any[];
  getBrCoverSrc: (br: any) => any;
  getBrLabel: (br: any) => any;
  getBrChecked: (br: any) => any;
  onBrSelectionChange: (e: ChangeEvent<HTMLInputElement>, br: any) => void;
}

const RequestSelector: React.FC<IRequestSelectorProps> = ({
  requests,
  loading,
  label,
  numberQueue,
  note,
  queueBackground,
  noProjectMessage,
  onBrSelectionChange,
  getBrCoverSrc,
  getBrLabel,
  getBrChecked,
  ...props
}) => {
  const projectList = requests.map((br) => {
    return (
      <button
        className="flex items-center w-full pl-5 py-2 active:bg-gray-10 relative"
        key={br.name}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBrCoverSrc(br) || siteSettings?.logo?.url}
          width={30}
          alt="br-cover"
          height={30}
          className="mr-3"
        />
        <p className="font-semibold text-dark-blue text-md">{getBrLabel(br)}</p>
        <Checkbox
          name={br.id}
          defaultChecked={getBrChecked(br)}
          className="absolute right-3"
          onChange={(e) => onBrSelectionChange(e, br)}
        />
      </button>
    );
  });

  return (
    <div {...props}>
      <div className="flex flex-col items-start bg-white pt-5 w-full">
        <InputLabel
          label={label}
          numberQueue={numberQueue}
          note={note}
          queueBackground={queueBackground}
        />
        <div className="border w-full rounded-md">
          <div className="flex items-center w-full border-b py-1">
            {/* @TODO make this searchable */}
            <Input
              noLabel
              noBorder
              className="h-9 w-full focus:none"
              placeholder="Tìm kiếm"
            />
            <button className="border-gray-200 p-3 flex-center border-l">
              <SearchIcon />
            </button>
          </div>
          {loading ? (
            <Loader className="max-h-60" />
          ) : (
            <div className="max-h-[150px] w-full mt-1 overflow-auto">
              {!!projectList.length ? (
                projectList
              ) : (
                <h3 className="text-center mt-5">{noProjectMessage}</h3>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RequestSelector;
