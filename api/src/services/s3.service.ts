import AWS from "aws-sdk";
import { ENODE_ENV, NODE_ENV } from "@utils";

interface S3UploadParams {
	companyName: string;
	fileName: string;
	type: string;
	fileStream: any;
	contentType: string;
}

class S3 {
	private s3: AWS.S3;
	private bucket: string;

	constructor() {
		this.initS3();
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

	public uploadPublicFile({
		companyName,
		type,
		fileName,
		fileStream,
		contentType
	}: S3UploadParams) {
		const uploadParams = {
			Bucket: this.bucket,
			Key: `${companyName}/${type}/${new Date().getTime()}-${fileName}`,
			Body: fileStream,
			ContentType: contentType,
			ACL: "public-read-write"
		};

		return this.s3.upload(uploadParams).promise();
	}

	public uploadCompanyLicense({
		companyName,
		fileName,
		type,
		fileStream
	}: S3UploadParams) {
		const uploadParams = {
			Bucket: this.bucket,
			Key: `${companyName}/${type}/${new Date().getTime()}-${fileName}`,
			Body: fileStream
		};

		return this.s3.upload(uploadParams).promise();
	}

	public getFile(fileName: string) {
		const getObjectParams = {
			Bucket: this.bucket,
			Key: fileName
		};

		return this.s3.getObject(getObjectParams).promise();
	}
}

export default S3;