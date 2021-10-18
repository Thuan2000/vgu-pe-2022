import PdfIcon from "@assets/icons/files/pdf-icon";
import SearchIcon from "@assets/icons/search-icon";
import { siteSettings } from "@settings/site.settings";
import { findIndex } from "lodash";
import React, { ChangeEvent, useState } from "react";
import Checkbox from "./storybook/checkbox";
import Input from "./storybook/inputs/input";
import InputLabel from "./storybook/inputs/input-label";
import Loader from "./storybook/loader/loader";

interface IRequestSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  numberQueue?: number | string;
  note?: string;
  className?: string;
  label?: string;
  queueBackground?: string;
  loading: boolean;
  noRequestMessage: string;
  requests: any[];
  currentBrIds?: number[];
  alreadyAddedMessage: string;
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
  currentBrIds,
  note,
  queueBackground,
  noRequestMessage,
  alreadyAddedMessage,
  onBrSelectionChange,
  getBrCoverSrc,
  getBrLabel,
  getBrChecked,
  ...props
}) => {
  const projectList = requests.flatMap((br) => {
    return (
      <button
        className="flex items-center w-full pl-5 py-2 active:bg-gray-10 relative"
        key={br.name}
        // value={isAddedAlready ? 10 : 0}
        type="button"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBrCoverSrc(br) || siteSettings?.logo?.url}
          width={30}
          alt="br-cover"
          height={30}
          className="mr-3"
        />
        <p className="font-semibold text-dark-blue text-md">
          {getBrLabel(br)}
          <span className="text-error ml-5 italic font-light">
            {/* {isAddedAlready && alreadyAddedMessage} */}
          </span>
        </p>
        <Checkbox
          name={br.id}
          // disabled={isAddedAlready}
          // defaultChecked={getBrChecked(br) && !isAddedAlready}
          defaultChecked={getBrChecked(br)}
          className="absolute right-3"
          onChange={(e) => onBrSelectionChange(e, br)}
        />
      </button>
    );
  });

  projectList.sort((a, b) => {
    // Higher first
    return b.props.value - a.props.value;
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
            <button
              type="button"
              className="border-gray-200 p-3 flex-center border-l"
            >
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
                <h3 className="text-center mt-5">{noRequestMessage}</h3>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RequestSelector;
