import Nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

import { EEMailTemplates } from "@utils/email_constants";
import AWS from "aws-sdk";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class EmailService {
	private transporter: Transporter;
	private templatesDir: string = path.join(__dirname, "html-templates");

	constructor() {
		this.initNodemailer();
	}

	private async initNodemailer() {
		const tranportOptions: SMTPTransport.Options = {
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT),
			secure: !!process.env.SMTP_SECURE, // true for 465, false for other port as strings
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD
			}
		};

		const ses = new AWS.SES({
			apiVersion: "2010-12-01",
			region: "ap-southeast-1"
		});

		this.transporter = Nodemailer.createTransport({
			SES: { ses, aws: AWS }
		});
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
			template: EEMailTemplates;
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
