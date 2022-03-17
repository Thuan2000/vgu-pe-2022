import CompanySubscription from "@models/CompanySubscription";
import Subscription from "@models/Subscription";
import { MONTH_IN_MS } from "@utils/constants";
import { getCurrentDateInMilis } from "@utils/functions";
import { errorResponse, successResponse } from "@utils/responses";

class CompanySubscriptionController {
	static async getSubscription(companyId: number) {
		try {
			const sub = await CompanySubscription.findOne({
				where: { companyId },
				order: [["id", "DESC"]],
				include: [{ model: Subscription, as: "subscriptionDetail" }]
			});

			const { subscriptionDetail, ...rest } = sub.toJSON() as any;
			const res = { ...subscriptionDetail, ...rest };

			return res;
		} catch (error) {
			console.error(error);
		}
	}

	static async subscribe(
		companyId: number,
		subscriptionId: number,
		// This function will not be called unless it's a pro subscription (1 month length)
		expDate = getCurrentDateInMilis() + MONTH_IN_MS
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
