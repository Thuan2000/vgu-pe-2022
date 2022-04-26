import { IFile } from "@graphql/types.graphql";
import { UploadFilesMutation } from "@graphql/upload.graphql";
import {
  generateBlobs,
  getUploadedFiles,
  removeTypenameOfChildrens,
} from "@utils/functions";
import { isEmpty } from "lodash";
import { IRawBFW } from "./ec-add-branch/bfw-constants";

export async function turnLocationToString(
  uploadFiles: any,
  { location, gallery, ...bfw }: IRawBFW
) {
  const oldGallery = gallery.filter((img) => !img.isNew);
  const newGallery: any = gallery.flatMap(({ isNew, ...img }) =>
    isNew ? img : []
  );
  const galleryBlobs = await generateBlobs(newGallery);
  const uploadedNewGallery = await getUploadedFiles(uploadFiles, galleryBlobs);

  return {
    ...bfw,
    location: location?.name || location,
    ...(gallery.length > 0
      ? {
          gallery: [
            ...removeTypenameOfChildrens(oldGallery || []),
            ...uploadedNewGallery,
          ],
        }
      : {}),
  };
}

/**
 * To get the Branch Factory Warehouse
 * @param uploadFiles Upload files function from mutation
 * @param bfws IRawBFW
 * @returns
 */
export async function getBfws(uploadFiles?: any, bfws?: IRawBFW[]) {
  if (!bfws || isEmpty(bfws)) return [];
  return await Promise.all(
    bfws?.map(async (bfw: any) => await turnLocationToString(uploadFiles, bfw))
  );
}
