import { IFile } from "@components/ui/storybook/document-uploader";
import { IFaq } from "@components/ui/storybook/inputs/faq-input/faq-list-creator";
import { ITag } from "@graphql/types.graphql";
import { ICategory } from "src/datas/categories";
import { IIndustry } from "@datas/industries";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IFile as IServerFile } from "@graphql/types.graphql";
import { IPPIPackage } from "@components/ui/storybook/inputs/package-pricing-input/ppi-interfaces";
import { IPPIValue } from "@components/ui/storybook/inputs/package-pricing-input/ppi-package-manager";

export interface IPPSFCategorySection {
  name: string;
  category: ICategory;
  industry: IIndustry;
}

export interface IPPSFAttachmentSection {
  images: IFile[] | IServerFile[];
  videos: IFile[] | IServerFile[];
  certificates: IFile[] | IServerFile[];
}

// export interface PackageRows

// export interface IPPSServicePackage {
//   id: string;
// }

export interface IPPSFPricingSection {
  price: number;
  packages: IPPIValue;
}

export interface IPPSFDetailsSection {
  description: string;
  tags: ITag[];
  location: IVietnamCity;
  faqs: IFaq[];
}

export interface IPostServiceFormValues {
  category: IPPSFCategorySection;
  attachment: IPPSFAttachmentSection;
  details: IPPSFDetailsSection;
  pricing: IPPSFPricingSection;
}
