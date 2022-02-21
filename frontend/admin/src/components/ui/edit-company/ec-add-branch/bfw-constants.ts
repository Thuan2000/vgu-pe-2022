import { IDUFile } from "@components/ui/storybook/document-uploader/document-uploader";
import { IVietnamCity } from "@utils/vietnam-cities";

export interface IRawBFW {
  id: string;
  name: string;
  location: IVietnamCity;
  address: string;
  gallery: IDUFile[];
}

export interface IBFWInput extends IRawBFW {
  isForSiblingToo?: boolean;
}
