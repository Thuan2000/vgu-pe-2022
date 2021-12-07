/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Copyright © 2021 - Present, Emolyze Tech Limited
 * All rights reserved.
 *
 * High-quality codes make the world a better place.
 * Emolyze Tech: Changing the world since 2021.
 */

/**
 * This files is where upload files handler placed
 */
import S3 from "@services/s3.service";
import { resizeImage } from "./image-resizer.repository";

const s3 = new S3();

class UploaderRepository {
	/**
	 * This function handling uploadCompanyLicenses
	 * @param companyName String
	 * @param licenseFiles File[]
	 * @param fileAccessControl AWS ACL
	 * @returns {location} file path on the s3 bucket
	 * @returns {location} url of the file
	 */
	static async uploadDocuments(
		companyName,
		licenseFiles: any[],
		fileAccessControl
	) {
		try {
			const data = await Promise.all(
				licenseFiles.map(async file => {
					const {
						createReadStream,
						filename: fileName,
						mimetype: contentType
					} = await file;

					const fileStream = createReadStream();

					const res = await s3.uploadDocuments({
						companyName,
						fileName,
						fileStream,
						type: "document",
						contentType,
						fileAccessControl
					});
					const { Key: location, Location: url } = res;

					return { location, url, fileName, fileType: contentType };
				})
			);
			return data;
		} catch (error) {
			console.log(error);
		}
	}

	static async uploadImage(companyName, img: any, fileAccessControl) {
		try {
			const {
				createReadStream,
				filename: fileName,
				mimetype: contentType
			} = await img;

			const fileStream = createReadStream();

			const { thumbRes } = await resizeImage(fileStream);

			const res = await s3.uploadFile({
				companyName,
				fileName,
				fileStream: thumbRes,
				type: "images",
				contentType,
				fileAccessControl
			});

			const { Key: location, Location: url } = res;

			return { location, url, fileName, fileType: contentType };
		} catch (error) {
			console.log(error);
		}
	}

	static async uploadImages(companyName, images: any[], fileAccessControl) {
		try {
			const data = await Promise.all(
				images?.map(async img => {
					const {
						createReadStream,
						filename: fileName,
						mimetype: fileType
					} = await img;

					const fileStream = createReadStream();

					const { thumbRes } = await resizeImage(fileStream);

					// return;
					const res = await s3.uploadFile({
						companyName,
						fileName,
						fileStream: thumbRes,
						type: "images",
						contentType: fileType,
						fileAccessControl
					});

					const { Key: location, Location: url } = res;

					return { location, url, fileName, fileType };
				})
			);

			return data;
		} catch (error) {
			console.log(error);
		}
	}

	static async uploadVideos(companyName, videos: any[], fileAccessControl) {
		try {
			const data = await Promise.all(
				videos?.map(async img => {
					const {
						createReadStream,
						filename: fileName,
						mimetype: fileType
					} = await img;

					const fileStream = createReadStream();

					const { thumbRes } = await resizeImage(fileStream);

					// return;
					const res = await s3.uploadFile({
						companyName,
						fileName,
						fileStream: thumbRes,
						type: "images",
						contentType: fileType,
						fileAccessControl
					});

					const { Key: location, Location: url } = res;

					return { location, url, fileName, fileType };
				})
			);

			return data;
		} catch (error) {
			console.log(error);
		}
	}
}

export default UploaderRepository;
