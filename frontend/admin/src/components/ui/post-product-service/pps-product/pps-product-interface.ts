import { ICategory } from "src/datas/categories";
import { IIndustry } from "@datas/industries";
import { IVietnamCity } from "@utils/vietnam-cities";
import { ITagWithNewRecord } from "@utils/interfaces";
import { IGroupFormValues } from "./product-group-form";
import { IProductVariation } from "./ppsp-variation-price/pppspvp-manager";
import { IDUFile } from "@components/ui/storybook/document-uploader/document-uploader";

export interface IPPSFCategorySection {
  name: string;
  category: ICategory;
  industry: IIndustry;
}

export interface IPPSFAttachmentSection {}

export interface IPPSFPricingSection {
  price: number;
  groups: IGroupFormValues[];
  variations: IProductVariation[];
}

export interface IPPSFGeneralSection {
  description: string;
  minOrder: number;
  images: IDUFile[];
  videos?: IDUFile[];
  certificates?: IDUFile[];
}

export interface IProductDimension {
  measureUnit: string;
  width: number;
  length: number;
  height: number;
  weight: number;
  weightUnit: string;
}

export interface IProductStatus {
  id: string;
  value: string;
}

export interface IProductWarranty {
  id: string;
  type: string;
  period: number;
}
export interface IPPSFDetailsSection {
  brandName: string;
  tags: ITagWithNewRecord[];
  status?: IProductStatus;
  location: IVietnamCity;
  isCustom: boolean;
  isPreorder: boolean;
  baseDimension: IProductDimension;
  packagedDimension: IProductDimension;
  warranty: IProductWarranty;
}

export interface IPostProductFormValues {
  category: IPPSFCategorySection;
  details: IPPSFDetailsSection;
  pricing: IPPSFPricingSection;
  general: IPPSFGeneralSection;
}
