import AWS from "aws-sdk";
import { generateUUID } from "@utils";
import { IFileAccessControl } from "@graphql/types";

interface S3UploadParams {
	companyName: string;
	fileName: string;
	type: string;
	fileStream: any;
	contentType: string;
	fileAccessControl: IFileAccessControl;
}

class S3 {
	private static s3: AWS.S3 = new AWS.S3({ apiVersion: "2006-03-01" });
	private static bucket: string = process.env.S3_BUCKET_NAME;

	private static processAccessControl(ac: IFileAccessControl) {
		return ac.replace(/\_/g, "-").toLowerCase();
	}

	public static async uploadFile({
		companyName,
		type,
		fileName,
		fileStream,
		contentType,
		fileAccessControl
	}: S3UploadParams) {
		try {
			const uploadParams = {
				Bucket: this.bucket,
				Key: `${companyName}/${type}/${generateUUID()}-${fileName}`,
				Body: fileStream,
				ContentType: contentType,
				ACL: this.processAccessControl(fileAccessControl)
			};
			const resp = await this.s3.upload(uploadParams).promise();
			return resp;
		} catch (error) {
			console.log(error);
		}
	}

	public static async uploadDocuments({
		companyName,
		fileName,
		type,
		fileStream,
		contentType,
		fileAccessControl
	}: S3UploadParams) {
		try {
			const uploadParams = {
				Bucket: this.bucket,
				Key: `${companyName}/${type}/${generateUUID()}-${fileName}`,
				Body: fileStream,
				ContentType: contentType,
				ACL: this.processAccessControl(fileAccessControl)
			};
			const resp = await this.s3.upload(uploadParams).promise();

			return resp;
		} catch (error) {
			console.log(error);
		}
	}

	public static async getFile(fileName: string) {
		try {
			const getObjectParams = {
				Bucket: this.bucket,
				Key: fileName
			};
			const resp = await this.s3.getObject(getObjectParams).promise();

			return resp;
		} catch (error) {
			console.log(error);
		}
	}

	public static async deleteFile(location: string) {
		try {
			return await this.s3
				.deleteObject({
					Bucket: this.bucket,
					Key: location
				})
				.promise();
		} catch (error) {
			console.error(error);
		}
	}
}

export default S3;
