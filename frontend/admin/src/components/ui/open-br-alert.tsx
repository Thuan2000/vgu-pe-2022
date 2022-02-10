import XIcon from "@assets/icons/x-icon";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./storybook/button";
import { Datepicker } from "./storybook/inputs/date-input";
import InputLabel from "./storybook/inputs/input-label";

interface IOpenBrAlertProps {
  isLoading: boolean;
  onConfirm: (val: Date) => void;
  onClose: () => void;
  iconProps?: React.HTMLAttributes<React.SVGAttributes<{}>>;
  icon?: React.FC<any>;
}

const OpenBrAlert: React.FC<IOpenBrAlertProps> = ({
  isLoading,
  onConfirm,
  onClose,
  icon: Icon,
  iconProps,
}) => {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleNegative() {
    onClose();
  }
  function handlePositif() {
    onConfirm(selectedDate);
  }

  function handleChange(e: Date) {
    setSelectedDate(e);
  }

  return (
    <div
      className={`flex flex-col items-center text-center relative min-w-[320px] sm:min-w-[461px] min-h-[315px] bg-white px-4 py-6 pt-8 rounded-lg shadow-xl`}
    >
      <button onClick={() => onClose()}>
        <XIcon className="absolute right-5 top-5" />
      </button>
      {Icon && <Icon {...iconProps} />}
      <h1 className="mt-5">{t("open-br-modal-title")}</h1>
      <p className="mt-1">{t("open-br-modal-message")}</p>
      <div className={`mt-5`}>
        <InputLabel required label={t("date-input-label")} />
        <div className={`border h-fit-content pl-4 rounded-sm overflow-hidden`}>
          <Datepicker
            onChange={handleChange}
            value={selectedDate as any}
            minDate={new Date()}
            className="!pr-0 !outline-none !ring-0"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-full mx-10 mt-10">
        <Button
          className="border-gray-200 border p-3 w-[48%]"
          color="error"
          onClick={handleNegative}
        >
          {t("cancel-button-label")}
        </Button>
        <Button
          loading={isLoading}
          className="border-gray-200 border p-3 w-[48%]"
          onClick={handlePositif}
        >
          {t("open-request-modal-button-label")}
        </Button>
      </div>
    </div>
  );
};
export default OpenBrAlert;
