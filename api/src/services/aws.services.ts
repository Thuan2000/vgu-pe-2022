import { config } from "aws-sdk";

class AWSService {
	static init() {
		const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
		config.update({
			region: AWS_REGION,
			accessKeyId: AWS_ACCESS_KEY,
			secretAccessKey: AWS_SECRET_KEY
		});
	}
}

export default AWSService;
