import { IVariationOption } from "@graphql/types.graphql";
import { cartesian } from "@utils/cartesian";
import { generateUUID } from "@utils/functions";
import { isEmpty } from "lodash";
import { IGroupFormValues } from "./product-group-form";
import {
  IProductVariation,
  IVariationOpt,
} from "./ppsp-variation-price/pppspvp-manager";

export function getVariationTitle(variation: IVariationOpt | IVariationOpt[]) {
  return Array.isArray(variation)
    ? variation?.map((v) => v.value).join(" / ")
    : variation.value;
}

export function getVariationOptions(
  variation: IVariationOpt | IVariationOpt[]
) {
  return Array.isArray(variation) ? variation?.map((v) => v) : [variation];
}

export function getCartesianVariation(
  groups: IGroupFormValues[]
): IVariationOpt[][] {
  const formattedValues = groups
    ?.map((g) =>
      g.classifications?.flatMap((c) => {
        if (!c.name) return [];
        return { name: g.name, value: c.name };
      })
    )
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

export function getVariationDetails(variationOptions: IVariationOption[][]) {
  const variationsDetails = variationOptions.map((variation) => {
    const vd: IProductVariation = {
      id: generateUUID(),
      title: getVariationTitle(variation),
      price: 0,
      options: getVariationOptions(variation),
    };

    return vd;
  });

  return variationsDetails as IProductVariation[];
}
