import { IBrStatus } from "@graphql/types.graphql";

interface IBrQueryParams {
  offset: number;
  limit: number;
  industryId?: number;
  status?: IBrStatus;
  minBudget?: string;
  maxBudget?: string;
  productName?: string;
  location?: string;
  searchValue?: string;
}

export const brQueryParams = ({
  offset,
  limit,
  industryId,
  status,
  minBudget,
  maxBudget,
  productName,
  location,
  searchValue,
}: IBrQueryParams) => {
  return {
    variables: {
      input: {
        offset,
        industryId,
        status,
        minBudget,
        maxBudget,
        productName,
        location,
        searchValue,
        limit,
      },
    },
  };
};
