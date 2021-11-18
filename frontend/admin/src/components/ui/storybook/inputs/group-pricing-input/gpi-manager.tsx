import { createUUID } from "@utils/functions";
import { findIndex } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../button";
import GPIForm from "./gpi-form";
import { IService } from "./gpi-service-form";

interface IGPIManagerProps {
  onChange: (value: IGroup[]) => void;
  value: IGroup[];
}

export interface IGroup {
  id: string;
  name: string;
  services?: IService[];
}

const INIT_VALUE = (id: string) => ({
  id,
  name: "",
  services: [],
});

const GPIManager: React.FC<IGPIManagerProps> = ({ onChange, value }) => {
  const { t } = useTranslation("form");
  const [groups, setGroups] = useState<IGroup[]>([
    ...(value || [INIT_VALUE(createUUID())]),
  ]);
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else onChange(groups);
  }, [groups]);

  function addGroups() {
    setGroups([...groups, INIT_VALUE(createUUID())]);
  }

  function handleChange(newGroup: IGroup) {
    const idx = findIndex(groups, (g) => g.id === newGroup.id);
    groups[idx] = newGroup;
    onChange(groups);
  }

  return (
    <div className="space-y-3">
      {groups.map((g) => {
        return (
          <GPIForm
            key={g.id + "service-group"}
            onChange={handleChange}
            initValue={g}
          />
        );
      })}
      <Button
        className="hover:bg-secondary-1"
        variant="outline"
        color="secondary-1"
        onClick={addGroups}
      >
        {t("groupPricing-add-button-label")}
      </Button>
    </div>
  );
};
export default GPIManager;
