import CompanySubscription from "@models/CompanySubscription";
import Subscription from "@models/Subscription";
import { MONTH_IN_MS } from "@utils/constants";
import { getCurrentDateInMilis } from "@utils/functions";
import { errorResponse, successResponse } from "@utils/responses";
import AlreadyPaidCompanyController from "./already-paid-company.controller";

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
			const res = { ...subscriptionDetail || {}, ...rest || {} };

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
				attributes: ["subscriptionAttempt", "endAt"],
				order: [["id", "DESC"]]
			});

			const compSubAttempt = (compWithSubAttempt?.toJSON() as any)
				?.subscriptionAttempt;
			const currentSubsDurationRest =
				(compWithSubAttempt?.toJSON() as any)?.endAt -
				getCurrentDateInMilis();
			const subscriptionAttempt = compSubAttempt + 1;
			const endAt = expDate;

			await CompanySubscription.create({
				companyId,
				subscriptionId,
				startAt: getCurrentDateInMilis(),
				endAt,
				subscriptionAttempt
			});

			await AlreadyPaidCompanyController.seIsSubscribedTrue(
				alreadyPaidId
			);

			const respWord = `Company With Id : ${companyId} success subscribe until ${new Date(
				expDate + currentSubsDurationRest
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
