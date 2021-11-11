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

/**
 * This function handling uploadCompanyLicenses
 * @param companyName String
 * @param licenseFiles File[]
 * @returns {key} file path on the s3 bucket
 * @returns {location} url of the file
 */
export async function uploadCompanyLicenses(companyName, licenseFiles: any[]) {
	try {
		return await licenseFiles.map(async file => {
			const {
				createReadStream,
				filename: fileName,
				mimetype: contentType
			} = await file;

			const fileStream = createReadStream();

			const res = await s3.uploadCompanyLicense({
				companyName,
				fileName,
				fileStream,
				type: "licenses",
				contentType
			});
			const { Key: key, Location: location } = res;

			return { key, location };
		});
	} catch (error) {
		console.log(error);
	}
}

export async function uploadImage(companyName, img: any) {
	try {
		const {
			createReadStream,
			filename: fileName,
			mimetype: contentType
		} = await img;

		const fileStream = createReadStream();

		const { thumbRes } = await resizeImage(fileStream);

		const res = await s3.uploadPublicFile({
			companyName,
			fileName,
			fileStream: thumbRes,
			type: "images",
			contentType
		});

		const { Key: key, Location: location } = res;

		return await { key, location };
	} catch (error) {
		console.log(error);
	}
}

export async function uploadImages(companyName, images: any[]) {
	try {
		return await (await images)?.map(async img => {
			const {
				createReadStream,
				filename: fileName,
				mimetype: contentType
			} = await img;

			const fileStream = createReadStream();

			const { thumbRes } = await resizeImage(fileStream);

			// return;
			const res = await s3.uploadPublicFile({
				companyName,
				fileName,
				fileStream: thumbRes,
				type: "images",
				contentType
			});

			const { Key: key, Location: location } = res;

			return { key, location };
		});
	} catch (error) {
		console.log(error);
	}
}
