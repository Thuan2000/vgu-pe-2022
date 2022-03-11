/* eslint-disable @typescript-eslint/interface-name-prefix */
import Nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";

import { EEMailTemplates } from "@utils/email_constants";
import AWS from "aws-sdk";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IEmailVariable {
	name: string;
	message: string;
	subject: string;
	template: EEMailTemplates;
	password?: string;
	forgotPasswordTokenLink?: string;
}

class EmailService {
	private static transporter: Transporter = Nodemailer.createTransport({
		SES: {
			ses: new AWS.SES({
				apiVersion: "2010-12-01",
				region: "ap-southeast-1",
				secretAccessKey: process.env.AWS_SECRET_KEY,
				accessKeyId: process.env.AWS_ACCESS_KEY
			}),
			aws: AWS
		}
	});

	private static templatesDir: string = path.join(
		__dirname,
		"html-templates"
	);

	/**
	 *
	 * @param targets string | string[]
	 * @param param1
	 */
	public static async sendEmail(
		targets: string[] | string,
		{
			name,
			message,
			subject,
			password,
			template,
			forgotPasswordTokenLink
		}: IEmailVariable
	) {
		try {
			console.log(
				"Sending email to : ",
				typeof targets === "string" ? targets : targets?.[0]
			);

			const templateVariables = {
				title: subject,
				name,
				message,
				password: password ? password : "",
				shopUrl: process.env.SHOP_URL,
				forgotPasswordTokenLink,
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
			console.error("Email Error : ", err);
		}
	}

	/**
	 * This is used to read email template and return it
	 */
	private static readEmailTemplate(templateName: string) {
		const htmlFile = fs.readFileSync(
			path.join(this.templatesDir, templateName),
			"utf-8"
		);

		return htmlFile;
	}
}

export default EmailService;
