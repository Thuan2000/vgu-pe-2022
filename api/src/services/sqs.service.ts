import AWS, { SQS } from "aws-sdk";

class Sqs {
	static queueUrl = process.env.QUEUE_URL;
	static sqs = new SQS({
		apiVersion: "2012-11-05"
	});

	static async sendMessage() {
		const params = {
			QueueUrl: this.queueUrl
		};

		this.sqs.receiveMessage(params, (e, data) => {
			console.log(e);
			console.log(data);
		});
	}
}

export default Sqs;
