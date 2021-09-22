import Nodemailer, { Transporter } from "nodemailer";

class EmailService {
	private transporter: Transporter;

	constructor() {
		this.initNodemailer();
	}

	private async initNodemailer() {
		const tranportOptions: any = {
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: process.env.SMTP_SECURE, // true for 465, false for other port as strings
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD
			}
		};
		this.transporter = Nodemailer.createTransport(tranportOptions);
	}

	public async sendEmail(
		target: string,
		{ name, message }: { name: string; message: string }
	) {
		try {
			// @TODO Use template for next time
			const info = await this.transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: target,
				subject: "Registration Received", // Subject line
				html: `
					<div>
						<h1>Halo ${name}</h1>
						${message}
					</div>
				`
			});
			console.log(info);
		} catch (err) {
			console.log(err);
		}
	}
}

export default EmailService;
