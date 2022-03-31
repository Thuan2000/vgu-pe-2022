import Company from "@models/Company";
import CompanySubscription from "@models/CompanySubscription";
import Subscription from "@models/Subscription";
import { MONTH_IN_MS } from "@utils/constants";
import { getCurrentDateInMilis } from "@utils/functions";
import { errorResponse, successResponse } from "@utils/responses";
import AlreadyPaidCompanyController from "./already-paid-company.controller";
import CompanyController from "./company.controller";

class CompanySubscriptionController {
	static async getSubscription(companyId: number) {
		try {
			const sub = await CompanySubscription.findOne({
				where: { companyId },
				order: [["id", "DESC"]],
				attributes: ["endAt", "startAt", "subscriptionAttempt"],
				include: [
					{
						model: Subscription,
						as: "subscriptionDetail",
						attributes: [
							"nameEn",
							"nameVn",
							"description",
							"monthlyPrice",
							"isTrial"
						]
					}
				]
			});

			const { subscriptionDetail, ...rest } = sub?.toJSON() as any;
			const res = { ...(subscriptionDetail || {}), ...(rest || {}) };

			return res;
		} catch (error) {
			console.error(error);
		}
	}

	static async subscribe(
		companyId: number,
		subscriptionId: number,
		alreadyPaidId: number,
		expDate
	) {
		try {
			const compWithSubAttempt = await CompanySubscription.findOne({
				where: { companyId },
				attributes: ["subscriptionAttempt"],
				order: [["id", "DESC"]]
			});

			const compSubAttempt = compWithSubAttempt?.getDataValue(
				"subscriptionAttempt"
			);
			const subscriptionAttempt = compSubAttempt + 1;
			const endAt = expDate;

			await CompanySubscription.create({
				companyId,
				subscriptionId,
				startAt: getCurrentDateInMilis(),
				endAt,
				subscriptionAttempt
			});

			// Update company on es
			const company = await CompanyController.getCompany(companyId);
			Company.updateEsCompany(companyId, company);

			// Set the is subscribed for paid company
			await AlreadyPaidCompanyController.seIsSubscribedTrue(
				alreadyPaidId
			);

			const respWord = `Company With Id : ${companyId} success subscribe until ${new Date(
				endAt
			)} as the ${subscriptionAttempt} attempt`;
			console.log(respWord);
			return successResponse(respWord);
		} catch (error) {
			console.error(error);
			return errorResponse(error.toString());
		}
	}
}

export default CompanySubscriptionController;
