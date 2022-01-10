import { IBusinessType } from "@datas/businessTypes";
import { IIndustry } from "@datas/industries";
import { IFile } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IRawBFW } from "./ec-add-branch/bfw-constants";

export type ECGeneralFormValues = {
  name: string;
  contactNumber: string;
  employeeAmount: number;
  description: string;
  establishmentDate: Date;
  industry: IIndustry;
  businessTypes: IBusinessType[];
  location: IVietnamCity;
  address: string;
  profileImage?: IFile;
  coverImage?: IFile[];
  mainProducts?: string[];
};

export interface ECDetailsFormValues {
  branches?: IRawBFW[];
  factories?: IRawBFW[];
  warehouses?: IRawBFW[];
}

export interface ECAdditionalFormValues {
  gallery: IFile[];
  certificates: IFile[];
}

export type ECFormValues = {
  general: ECGeneralFormValues;
  details: ECDetailsFormValues;
  additional: ECAdditionalFormValues;
};
