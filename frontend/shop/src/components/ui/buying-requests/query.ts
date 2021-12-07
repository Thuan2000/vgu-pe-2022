import { IBrStatus } from "@graphql/types.graphql";
import { getCompanyId } from "@utils/functions";

interface IBrQueryParams {
  offset: number;
  limit: number;
  industryId?: number;
  categoryId?: number;
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
  categoryId,
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
        categoryId,
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
