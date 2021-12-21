import { IFaq } from "@components/ui/storybook/inputs/faq-input/faq-list-creator";
import { IFile, ITag } from "@graphql/types.graphql";
import { ICategory } from "src/datas/categories";
import { IIndustry } from "@datas/industries";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IPPIValue } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import { ITagWithNewRecord } from "@utils/interfaces";

export interface IPPSFCategorySection {
  name: string;
  category: ICategory;
  industry: IIndustry;
}

export interface IPPSFAttachmentSection {
  images: IFile[];
  videos: IFile[];
  certificates: IFile[];
}

export interface IPPSFPricingSection {
  price: number;
  packages: IPPIValue;
}

export interface IPPSFDetailsSection {
  description: string;
  tags: ITagWithNewRecord[];
  location: IVietnamCity;
  faqs: IFaq[];
}

export interface IPostProductFormValues {
  category: IPPSFCategorySection;
  attachment: IPPSFAttachmentSection;
  details: IPPSFDetailsSection;
  pricing: IPPSFPricingSection;
}
