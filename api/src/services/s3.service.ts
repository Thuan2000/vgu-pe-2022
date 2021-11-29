import AWS from "aws-sdk";
import { ENODE_ENV, generateUUID, NODE_ENV } from "@utils";
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
	private s3: AWS.S3;
	private bucket: string;

	constructor() {
		this.initS3();
	}

	private processAccessControl(ac: IFileAccessControl) {
		return ac.replace(/\_/g, "-").toLowerCase();
	}

	private initS3() {
		if (NODE_ENV === ENODE_ENV.DEVELOPMENT) {
			const {
				AWS_REGION,
				DEV_AWS_ACCESS_KEY,
				DEV_AWS_SECRET_KEY
			} = process.env;
			this.updateAWSConfig(
				AWS_REGION,
				DEV_AWS_ACCESS_KEY,
				DEV_AWS_SECRET_KEY
			);
			this.bucket = process.env.DEV_S3_BUCKET_NAME;
		} else {
			const {
				AWS_REGION,
				PROD_AWS_ACCESS_KEY,
				PROD_AWS_SECRET_KEY
			} = process.env;
			this.updateAWSConfig(
				AWS_REGION,
				PROD_AWS_ACCESS_KEY,
				PROD_AWS_SECRET_KEY
			);
			this.bucket = process.env.PROD_S3_BUCKET_NAME;
		}
		this.s3 = new AWS.S3({ apiVersion: "2006-03-01" });
	}

	private updateAWSConfig(
		region: string,
		accessKeyId: string,
		secretAccessKey: string
	) {
		AWS.config.update({
			region,
			accessKeyId,
			secretAccessKey
		});
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
