import { PlusIcon } from "@assets/icons/plus-icon";
import InlineLabel from "@components/post-tender-form/inline-label";
import { COLORS } from "@utils/colors";
import { generateUUID, preventSubmitOnEnter } from "@utils/functions";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../button";
import Input from "../input";
import GPIServiceListItem from "./gpi-service-list-item";
import GPIServiceForm, { IService } from "./gpi-service-form";
import { findIndex } from "lodash";
import { IGroup } from "./gpi-manager";
import Typography from "../../typography";

interface IGPIFormProps {
  onChange: (e: IGroup) => void;
  initValue: IGroup;
}

const GPIForm: React.FC<IGPIFormProps> = ({ onChange, initValue }) => {
  const { t } = useTranslation("form");
  const [name, setName] = useState(initValue?.name || "");
  const [nameErrorM, setNameErrorM] = useState("");
  const [services, setServices] = useState<IService[]>(
    initValue?.services || []
  );
  const [isCreatingService, setIsCreatingService] = useState(
    services.length === 0
  );
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const newGroup = {
      id: initValue.id || generateUUID(),
      name,
      services,
    };
    onChange(newGroup);
  }, [name, services]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) setNameErrorM("error-name-has-to-be-setted");
    else setNameErrorM("");
    setName(e.target.value);
  }

  function Wrapper({ children, className, shouldItemStart }: any) {
    return (
      <div
        className={`flex ${
          shouldItemStart ? "items-start" : "items-center"
        } w-full ${className}`}
      >
        {children}
      </div>
    );
  }

  function handleCreateService(newService: IService) {
    setServices([...services, newService]);
    setIsCreatingService(false);
  }

  function handleDelete(serviceId: string) {
    const newServices = services.filter((s) => s.id !== serviceId);
    if (newServices.length === 0) setIsCreatingService(true);
    setServices(newServices);
  }

  function handleUpdateService(newService: IService) {
    const idx = findIndex(services, (s) => newService.id === s.id);

    services[idx] = newService;
    setServices([...services]);
  }

  const labelWidth = "70px";

  return (
    <div className="p-5 rounded-sm bg-gray-10 space-y-3 bg-opacity-50 border relative">
      <Wrapper shouldItemStart={!!nameErrorM}>
        <InlineLabel
          text={t("group-price-groupName-input-label")}
          textClass="font-semibold opacity-90"
          className={`flex-shrink-0 text-right ${!!nameErrorM && "mt-1"}`}
          labelWidth={labelWidth}
          narrowColon
        />
        <Input
          className="w-full"
          autoFocus
          {...preventSubmitOnEnter()}
          onChange={handleNameChange}
          value={name}
          error={nameErrorM}
          placeholder={t("group-price-groupName-input-placeholder")}
        />
      </Wrapper>

      {services.map((s, idx) => {
        if (!name) return <></>;
        return (
          <GPIServiceListItem
            key={s.id + "Service"}
            label={`${t("group-price-service-input-label")} ${idx + 1}`}
            service={s}
            onUpdate={handleUpdateService}
            onDelete={handleDelete}
            labelWidth={labelWidth}
          />
        );
      })}

      <Wrapper className={`${isCreatingService && "!items-start"}`}>
        <>
          <InlineLabel
            text={`${t("group-price-service-input-label")} ${
              !!name ? services.length + 1 : 1
            }`}
            textClass="font-semibold opacity-90"
            className="flex-shrink-0 text-right"
            labelWidth={labelWidth}
            narrowColon
          />
          <Typography
            className={`${!!name && "hidden"}`}
            text={t("please-set-group-name-first")}
            variant="description"
          />

          {isCreatingService && (
            <div className={`${!name && "hidden"} w-full`}>
              <GPIServiceForm
                isDisabled={!name}
                onCreate={handleCreateService}
              />
            </div>
          )}
          {!isCreatingService && (
            <div className={`w-full ${!name && "hidden"}`}>
              <Button
                variant="outline"
                color="secondary-1"
                className="hover:bg-secondary-1-hover w-full"
                onClick={() => setIsCreatingService(true)}
              >
                <PlusIcon
                  className="mr-2"
                  fill={COLORS["SECONDARY-1"].DEFAULT}
                />
                {t("group-price-createService-button-label")}
              </Button>
            </div>
          )}
        </>
      </Wrapper>
    </div>
  );
};
export default GPIForm;
