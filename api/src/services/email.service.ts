import Nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

import { EMailTemplates } from "@utils/email_constants";

class EmailService {
	private transporter: Transporter;
	private templatesDir: string = path.join(__dirname, "@html-templates");

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

	/**
	 *
	 * @param targets string | string[]
	 * @param param1
	 */
	public async sendEmail(
		targets: string[] | string,
		{
			name,
			message,
			subject,
			template
		}: {
			name: string;
			message: string;
			subject: string;
			template: EMailTemplates;
		}
	) {
		try {
			const templateVariables = {
				title: subject,
				name,
				message,
				email: typeof targets === "string" ? targets : targets[0]
			};

			const html = this.readEmailTemplate(template);
			const htmlTemplate = handlebars.compile(html);

			const htmlWithVariables = htmlTemplate(templateVariables);

			const info = await this.transporter.sendMail({
				from: process.env.SMTP_FROM,
				to: targets,
				subject,
				html: htmlWithVariables
			});

			console.log(info);
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * This is used to read email template and return it
	 */
	private readEmailTemplate(templateName: string) {
		const htmlFile = fs.readFileSync(
			path.join(this.templatesDir, templateName),
			"utf-8"
		);

		return htmlFile;
	}
}

export default EmailService;
