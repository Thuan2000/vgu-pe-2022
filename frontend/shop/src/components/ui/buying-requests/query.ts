interface IBrQueryParams {
  companyId: number;
  offset: number;
  industryId?: number;
  status?: string;
  minBudget?: string;
  maxBudget?: string;
  productName?: string;
  location?: string;
  searchValue?: string;
}

export const brQueryParams = ({
  companyId,
  offset,
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
        companyId,
        offset,
        industryId,
        status,
        minBudget,
        maxBudget,
        productName,
        location,
        searchValue,
      },
    },
  };
};
