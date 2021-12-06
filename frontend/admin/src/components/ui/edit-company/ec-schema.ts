import { IBusinessType } from "@datas/businessTypes";
import { IFile } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IRawBFW } from "./ec-add-branch/bfw-constants";

export type ECGeneralFormValues = {
  name: string;
  contactNumber: string;
  employeeAmount: number;
  description: string;
  establishmentDate: Date;
  industry: number;
  businessType: IBusinessType;
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
  licenseFiles: IFile[];
}

export type ECFormValues = {
  general: ECGeneralFormValues;
  details: ECDetailsFormValues;
  additional: ECAdditionalFormValues;
};
