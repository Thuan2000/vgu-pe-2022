import { IFaq } from "@components/ui/storybook/inputs/faq-input/faq-list-creator";
import { IFile, ITag } from "@graphql/types.graphql";
import { ICategory } from "src/datas/categories";
import { IIndustry } from "@datas/industries";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IPPIValue } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";
import { ITagInput } from "@graphql/types.graphql";
import { ITagWithNewRecord } from "@utils/interfaces";
import { IDUFile } from "@components/ui/storybook/document-uploader/document-uploader";

export interface IPPSFGeneralSection {
  name: string;
  description: string;
  location: IVietnamCity;
  industry: IIndustry;
  category: ICategory;
}

export interface IPPSFAttachmentSection {
  images: IDUFile[];
  videos?: IDUFile[];
  certificates?: IDUFile[];
}

export interface IPPSFPricingSection {
  isSinglePrice: boolean;
  price: number;
  packages: IPPIValue;
}

export interface IPPSFDetailsSection {
  tags: ITagWithNewRecord[];
  faqs: IFaq[];
}

export interface IPostServiceFormValues {
  general: IPPSFGeneralSection;
  attachment: IPPSFAttachmentSection;
  details: IPPSFDetailsSection;
  pricing: IPPSFPricingSection;
}
