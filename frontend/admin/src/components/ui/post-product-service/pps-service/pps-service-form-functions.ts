import {
  IPPIPackage,
  IPPIRow,
} from "@components/ui/storybook/inputs/package-pricing-input/ppi-interfaces";
import { PPI_PACKAGE_PRICE_NAME } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import { getCategory } from "@datas/categories";
import { getIndustry } from "@datas/industries";
import { IService } from "@graphql/types.graphql";
import {
  removeTypenameFromArray,
  addIdAndRemoveTypenameFromArray,
} from "@utils/functions";
import { getLocationByName } from "@utils/vietnam-cities";
import { findIndex } from "lodash";
import { IPostServiceFormValues } from "./pps-service-interface";

function processPackages(packages: IPPIPackage[]) {
  const processed = packages.map(
    ({ __typename, id, price, packageRows }: any) => {
      const processedPRs = packageRows?.map(
        ({ __typename, rowId, value }: any) => ({
          rowId,
          value: JSON.parse(value),
        })
      );

      return { id, price, packageRows: processedPRs };
    }
  );

  return processed;
}

export function generateDefaultValues(initValue: IService) {
  const {
    description,
    name,
    location,
    categoryId,
    industryId,
    certificates,
    images,
    videos,
    faqs,
    tags,
    price,
    coverImage,
    packages,
    packageRows,
  } = initValue;

  let getImages = !!images?.length ? images : [];

  const defaultValue: IPostServiceFormValues = {
    attachment: {
      certificates: removeTypenameFromArray(certificates || []),
      images: removeTypenameFromArray(getImages || []),
      videos: removeTypenameFromArray(videos || []),
    },
    general: {
      name,
      description,
      location: getLocationByName(location),
      category: getCategory(categoryId),
      industry: getIndustry(industryId),
    },
    details: {
      faqs: addIdAndRemoveTypenameFromArray(faqs || []),
      tags: addIdAndRemoveTypenameFromArray(tags || []),
    },
    pricing: {
      isSinglePrice: !!price,
      price,
      ...(!!packageRows?.length && !!packages?.length
        ? {
            packages: {
              rows: removeTypenameFromArray(packageRows || []),
              packages: processPackages((packages as any) || []),
            },
          }
        : ({} as any)),
    },
  };

  return defaultValue;
}

/**
 *
 * @param rawPackages All the packages and the rows
 * @returns {formattedPackages[], lowestPrice, maximumPrice}
 */
export function processRawPackages(
  packages: IPPIPackage[] = [],
  rows: IPPIRow[] = []
) {
  let minPrice = Number.MAX_VALUE;
  let maxPrice = Number.MIN_VALUE;
  if (!packages?.length) return;
  const formatedPackages = packages.map((pkg) => {
    const newPackage = Object.assign({}, pkg);
    delete newPackage.packageRows;

    const newPrs = pkg?.packageRows?.flatMap((pr) => {
      const idx = findIndex(rows, (r) => r.id === pr.rowId);

      if (idx === -1) return [];
      const row = rows[idx];

      // Getting the price
      if (row.name === PPI_PACKAGE_PRICE_NAME && pr.value <= minPrice)
        minPrice = pr.value;
      if (row.name === PPI_PACKAGE_PRICE_NAME && pr.value >= maxPrice)
        maxPrice = pr.value;

      return {
        ...pr,
        value: JSON.stringify(pr?.value),
      };
    });
    newPackage.packageRows = newPrs as any;

    return newPackage;
  });

  return { formatedPackages, minPrice, maxPrice };
}
