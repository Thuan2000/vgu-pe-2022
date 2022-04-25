import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import {
  IVariation,
  IVariationOption,
  IProduct,
  IVariationInput,
} from "@graphql/types.graphql";
import {
  generateUUID,
  removeTypenameFromArray,
  isEmptyObject,
  removeTypename,
} from "@utils/functions";
import { getLocationByName } from "@utils/vietnam-cities";
import { groupBy } from "lodash";
import {
  IProductStatus,
  IPostProductFormValues,
} from "./pps-product-interface";
import { IGroupFormValues } from "./product-group-form";

function getStatus(value: string) {
  if (!value) return null;

  const status: IProductStatus = {
    id: generateUUID(),
    value,
  };

  return status;
}

function getDefaultGroups(variations: IVariation[]) {
  if (!variations?.length) return;

  const rawGroups: IVariationOption[] = [];

  variations.forEach((v) => {
    const removedTypenameOptions = removeTypenameFromArray(v?.options!);
    rawGroups.push(...removedTypenameOptions);
  });

  const objClassifications = groupBy(rawGroups, (r) => r.name);

  const groups: IGroupFormValues[] = Object.keys(objClassifications).map(
    (key) => {
      const classifications = objClassifications?.[key].map((c) => ({
        id: generateUUID(),
        name: c.value,
      }));

      const group: IGroupFormValues = {
        id: generateUUID(),
        name: key,
        classifications,
      };

      return group;
    }
  );
  return groups;
}

function getDefaultVariations(variations: IVariation[]) {
  const variants = variations.map(({ price, title, image, options }) => ({
    id: generateUUID(),
    price,
    title,
    image,
    options: removeTypenameFromArray(options!),
  }));

  return variants;
}

export function generateDefaultValues(initValues: IProduct) {
  if (isEmptyObject(initValues)) return;

  const defaultInput: IPostProductFormValues = {
    general: {
      name: initValues.name,
      category: getCategory(initValues.categoryId),
      industry: getIndustry(initValues.industryId),
      description: initValues.description,
      images: removeTypenameFromArray(initValues.gallery || []),
      videos: removeTypenameFromArray(initValues.videos || []),
      certificates: removeTypenameFromArray(initValues.certificates || []),
      minOrder: initValues.minOrder,
    },
    pricing: {
      price: initValues.price,
      ...(!!initValues.variations
        ? {
            groups: getDefaultGroups(initValues.variations),
            variations: getDefaultVariations(initValues.variations),
          }
        : {}),
    } as any,
    details: {
      brandName: initValues.brandName,
      baseDimension: removeTypename(initValues.baseDimension || {}),
      packagedDimension: removeTypename(initValues.packagedDimension || {}),
      tags: removeTypenameFromArray(initValues.tags),
      isPreorder: initValues.isPreorder || false,
      isCustom: initValues.isCustom || false,
      location: getLocationByName(initValues.warehouseLocation),
      ...(!!initValues.status ? { status: getStatus(initValues.status) } : {}),
    } as any,
  };
  return defaultInput;
}

export function getMinMaxPrice(variations: IVariationInput[] = []) {
  const pricing = {
    minPrice: Number.MAX_VALUE,
    maxPrice: Number.MIN_VALUE,
  };

  variations.forEach(({ price }) => {
    if (price < pricing.minPrice) pricing.minPrice = price;
    else if (price > pricing.maxPrice) pricing.maxPrice = price;
  });

  return pricing;
}
