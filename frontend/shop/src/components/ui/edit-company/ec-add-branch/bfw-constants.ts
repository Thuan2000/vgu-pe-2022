import { IVietnamCity } from "@datas/vietnam-provinces";
import { IFile } from "@graphql/types.graphql";

export interface IRawBFW {
  id: string;
  name: string;
  location: IVietnamCity;
  address: string;
  gallery: IFile[];
}

export interface IBFWInput extends IRawBFW {
  isForSiblingToo?: boolean;
}
