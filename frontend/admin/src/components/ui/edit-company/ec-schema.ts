import { IBusinessType } from "@datas/businessTypes";
import { IIndustry } from "@datas/industries";
import { IFile } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";
import { IDUFile } from "../storybook/document-uploader/document-uploader";
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
  profileImage?: IDUFile;
  coverImage?: IDUFile[];
  mainProducts?: string[];
};

export interface ECDetailsFormValues {
  branches?: IRawBFW[];
  factories?: IRawBFW[];
  warehouses?: IRawBFW[];
}

export interface ECAdditionalFormValues {
  gallery: IDUFile[];
  certificates: IDUFile[];
}

export type ECFormValues = {
  general: ECGeneralFormValues;
  details: ECDetailsFormValues;
  additional: ECAdditionalFormValues;
};
