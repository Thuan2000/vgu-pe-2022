import { IBfw } from "@graphql/types.graphql";
import { useTranslation } from "next-i18next";
import React from "react";
import ECBFWItem from "../edit-company/ec-add-branch/bfw-item";
import Typography from "../storybook/typography";

interface ICDBfwProps {
  bfws: IBfw[];
  noBfwMessage: string;
  bfwFor: "branch" | "warehouse" | "factory" | "products" | "services";
}

const CDBfw: React.FC<ICDBfwProps> = ({ bfws, noBfwMessage, bfwFor }) => {
  const { t } = useTranslation();
  return (
    <div className={`space-y-1 relative border-1 rounded-sm p-3`}>
      <div className="fic space-x-2">
        <Typography
          variant="smallTitle"
          element="h3"
          size="md"
          text={t(`singularCompany${bfwFor}-title`)}
        />
        <Typography
          variant="question"
          size="xs"
          text={`${bfws?.length} ${t(`pluralCompany${bfwFor}-title`)}`}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-10">
        {!!bfws?.length ? (
          bfws?.slice(0, 2).map((b) => {
            return (
              <div key={b.name + b.id + b.location}>
                <ECBFWItem bfw={b as any} />
              </div>
            );
          })
        ) : (
          <div className={`flex-center h-full w-full py-10 col-span-3`}>
            <Typography text={noBfwMessage} size="md" />
          </div>
        )}
      </div>
    </div>
  );
};
export default CDBfw;
