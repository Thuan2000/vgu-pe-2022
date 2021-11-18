import { ILocale, IUnitInput } from "@graphql/types.graphql";
import { useUnitsQuery } from "@graphql/unit.graphql";
import { createUUID } from "@utils/functions";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import CreateableSelect from "../../createable-select/createable-select";

interface IPPIUnitInputProps {
  onChange: (value: any) => void;
  value: any;
  disabled?: boolean;
}

const PPIUnitInput: React.FC<IPPIUnitInputProps> = ({
  onChange,
  value,
  disabled,
}) => {
  const { locale, defaultLocale } = useRouter();
  const { data } = useUnitsQuery({ variables: { locale: locale as any } });
  const firstRun = useRef(true);
  const [units, setUnits] = useState(data?.units || []);

  useEffect(() => {
    if (firstRun.current) firstRun.current = false;
    else setUnits(data?.units || []);
  }, [data?.units]);
  function handleCreateNewOption(name: string) {
    const newUnit: IUnitInput = {
      locale: (locale as ILocale) || (defaultLocale as ILocale) || "vi",
      name,
    };

    return {
      id: createUUID(),
      ...newUnit,
    };
  }

  return (
    <CreateableSelect
      createNewOption={handleCreateNewOption}
      onChange={(v) => onChange(v)}
      getOptionLabel={(opt) => opt.label || opt.name}
      getOptionValue={(opt) => opt.name}
      menuPosition="fixed"
      inputClassName="shadow-none !max-w-[100px] !min-w-[100px] !border-none !rounded-none"
      value={value}
      options={units}
      isDisabled={disabled}
    />
  );
};
export default PPIUnitInput;
