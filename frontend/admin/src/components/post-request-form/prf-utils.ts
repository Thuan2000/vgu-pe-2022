import { IBuyingRequest } from "@graphql/types.graphql";
import { getCategories } from "@utils/categories";
import { getIndustry } from "@utils/industries";

import { PostRequestFormValue } from "./post-request-schema";

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

  const { __typename, ...removedTypenameAC } = (allowedCompany as any) || {};

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
      allowedCompany: removedTypenameAC,
    },
  };

  return data;
}
