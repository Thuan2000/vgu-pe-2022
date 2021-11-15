import { ICategory } from "@utils/categories";
import { IIndustry } from "@utils/industries";
import { IFAQ } from "@utils/interfaces";
import { IVietnamCity } from "@utils/vietnam-cities";

interface ICategorySection {
  name: string;
  category: ICategory;
  industry: IIndustry;
}

interface IGeneralSection {
  description: string;
  images: any[];
  videos: any[];
  certificates: any[];
}

interface IDetailsSection {
  keywords: string[];
  location: IVietnamCity;
  faqs: IFAQ[];
}

export interface IPostServiceFormValues {
  category: ICategorySection;
  general: IGeneralSection;
  details: IDetailsSection;
}
