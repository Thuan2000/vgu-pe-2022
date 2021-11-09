import { IAllowedCompany, IBuyingRequest } from "@graphql/types.graphql";
import { getCategories } from "@utils/categories";
import { getIndustry } from "@utils/industries";
import { isString } from "lodash";
import { PostRequestFormValue } from "./post-request-schema";

function getAllowedCompanyInArray({
  __typename,
  ...allowedCompany
}: IAllowedCompany | any): any {
  const participantFilter = Object.keys(allowedCompany).flatMap((key) => {
    if (!(allowedCompany as any)[key]) return [];
    return { key, value: (allowedCompany as any)[key] };
  });

  if (participantFilter.length < 3) {
    participantFilter.push({} as any);
  }

  return participantFilter;
}

export function getDefaultValue(initValue?: IBuyingRequest) {
  if (!initValue)
    return {
      general: {
        endDate: new Date(),
      },
    };

  const {
    name,
    endDate,
    location,
    description = "",
    minBudget,
    maxBudget,
    productName,
    minOrder,
    unit,
    gallery,
    industryId,
    categoryIds,
    allowedCompany,
  } = initValue;

  const data: PostRequestFormValue = {
    general: {
      endDate: new Date(endDate),
      name,
      location: location as any,
      description: description as string,
    },
    details: {
      productName: productName as any,
      minBudget,
      maxBudget,
      minOrder,
      gallery,
      unit,
      industry: getIndustry(industryId),
      categories: getCategories(categoryIds) as any,
    },
    additional: {
      allowedCompany: getAllowedCompanyInArray(allowedCompany),
    },
  };

  return data;
}
