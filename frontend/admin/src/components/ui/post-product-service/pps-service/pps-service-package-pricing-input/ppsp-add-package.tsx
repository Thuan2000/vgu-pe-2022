import { useTranslation } from "next-i18next";
import React from "react";
import TableIndividualWrapper from "./table-individual-wrapper";

interface IPPSPAddPackageProps {}

const PPSPAddPackage: React.FC<IPPSPAddPackageProps> = ({}) => {
  const { t } = useTranslation("form");

  const packages = [1, 2, 3, 4, 5];
  const rows = [1, 2, 3, 4, 5];

  return (
    <div className="text-center border flex rounded-md overflow-hidden">
      <div className="flex-shrink-0 border-r bg-gray-100">
        {rows.map((row, idx) => {
          const isHead = idx === 0;
          const isLast = idx === rows.length - 1;
          return (
            <TableIndividualWrapper
              key={row + "SDF"}
              isLast={isLast}
              isHead={isHead}
            >
              {!isHead && "Mantul sadadsfasd"}
            </TableIndividualWrapper>
          );
        })}
      </div>
      <div className="w-full overflow-auto">
        {rows.map((_, idx) => {
          const isHead = idx === 0;

          return (
            <div
              key={idx + "sdfvds"}
              className={`flex w-full
                ${isHead && "bg-gray-100"}
              `}
            >
              {packages.map((pkg, idx) => {
                const isLast = idx === packages.length - 1;
                return (
                  <TableIndividualWrapper
                    key={pkg + "row"}
                    isLast={isLast}
                    className="w-1/4"
                  >
                    {"mantuad" + pkg}
                  </TableIndividualWrapper>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PPSPAddPackage;
