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
	private s3: AWS.S3 = new AWS.S3({ apiVersion: "2006-03-01" });
	private bucket: string = process.env.S3_BUCKET_NAME;

	private processAccessControl(ac: IFileAccessControl) {
		return ac.replace(/\_/g, "-").toLowerCase();
	}

	public uploadFile({
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

			return this.s3.upload(uploadParams).promise();
		} catch (error) {
			console.log(error);
		}
	}

	public uploadDocuments({
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

			return this.s3.upload(uploadParams).promise();
		} catch (error) {
			console.log(error);
		}
	}

	public getFile(fileName: string) {
		try {
			const getObjectParams = {
				Bucket: this.bucket,
				Key: fileName
			};

			return this.s3.getObject(getObjectParams).promise();
		} catch (error) {
			console.log(error);
		}
	}
}

export default S3;
