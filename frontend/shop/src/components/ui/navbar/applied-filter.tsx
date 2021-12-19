import { keys } from "lodash";
import { useRouter } from "next/dist/client/router";
import React from "react";
import AppliedFilterItem from "./applied-filter-item";

interface IAppliedFilterProps {}

const AppliedFilter: React.FC<IAppliedFilterProps> = ({}) => {
  const { query } = useRouter();

  return (
    <div className="fic ml-16 justify-start w-2/3 flex-wrap">
      {(keys(query) as any)?.map((q: any) => {
        if (q === "slug") return;
        return (
          <AppliedFilterItem
            key={q + "applied-search"}
            queryKey={q}
            value={query[q] as string}
          />
        );
      })}
    </div>
  );
};
export default AppliedFilter;
