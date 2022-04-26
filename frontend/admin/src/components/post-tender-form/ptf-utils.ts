import { IBuyingRequest } from "@graphql/types.graphql";
import { getCategory } from "src/datas/categories";
import { getIndustry } from "@datas/industries";
import { getSourceType } from "src/datas/source-type";

import { PostRequestFormValue } from "./post-request-schema";
import { IFileWithTypename } from "@components/ui/storybook/document-uploader/document-uploader";
import { removeTypenameFromArray } from "@utils/functions";
import { getLocationByName } from "@utils/vietnam-cities";

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
    minOrder,
    unit,
    gallery,
    industryId,
    minSupplierExperience,
    minSupplierSells,
    categoryId,
    sourceTypeId,
  } = initValue;
  const data: PostRequestFormValue = {
    general: {
      name,
      gallery: removeTypenameFromArray(gallery || []),
      description: description as string,
      industry: getIndustry(industryId),
      category: getCategory(categoryId),
    },
    details: {
      endDate: new Date(endDate),
      minBudget,
      maxBudget,
      minOrder,
      location: getLocationByName(location),
      unit,
      sourceType: getSourceType(sourceTypeId as number),
      allowedCompany: {
        minSupplierExperience: minSupplierExperience as number,
        minSupplierSells: minSupplierSells as number,
      },
    },
  };

  return data;
}
