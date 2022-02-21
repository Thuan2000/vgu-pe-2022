import UploaderRepository from "@repositories/uploads.repository";
import { IUploadFilesInput } from "@graphql/types";
import S3 from "@services/s3.service";
import { successResponse } from "@utils/responses";

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

	static async deleteFile(location: string) {
		await S3.deleteFile(location);

		return successResponse();
	}
}

export default UploaderController;
