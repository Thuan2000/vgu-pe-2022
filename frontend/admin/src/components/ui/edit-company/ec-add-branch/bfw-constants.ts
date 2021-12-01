import { IFile } from "@graphql/types.graphql";
import { IVietnamCity } from "@utils/vietnam-cities";

export interface IRawBFW {
  id: string;
  name: string;
  location: IVietnamCity;
  address: string;
  images: IFile[];
}

export interface IBFWInput extends IRawBFW {
  isForSiblingToo?: boolean;
}
