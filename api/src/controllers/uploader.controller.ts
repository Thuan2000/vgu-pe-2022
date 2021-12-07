import UploaderRepository from "@repositories/uploads.repository";
import { IUploadFilesInput } from "@graphql/types";

class UploaderController {
	static async uploadFiles({
		companyName,
		files,
		uploadsFileInputType,
		fileAccessControl
	}: IUploadFilesInput) {
		const awaitedFiles = await files;
		let data;
		if (uploadsFileInputType === "image")
			data = await UploaderRepository.uploadImages(
				companyName,
				awaitedFiles,
				fileAccessControl
			);
		else if (uploadsFileInputType === "application")
			data = await UploaderRepository.uploadDocuments(
				companyName,
				files,
				fileAccessControl
			);
		else if (uploadsFileInputType === "video")
			data = await UploaderRepository.uploadDocuments(
				companyName,
				files,
				fileAccessControl
			);

		return data;
	}
}

export default UploaderController;
