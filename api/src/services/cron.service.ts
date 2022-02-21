import BuyingRequestController from "@controllers/buying-request.controller";
import NodeCron from "node-cron";

class CronService {
	static async scheduleBrStatusCheck() {
		try {
			NodeCron.schedule(
				"0 0 12 * * *",
				BuyingRequestController.refreshStatus
			);
		} catch (e) {
			console.error(e);
		}
	}
}

export default CronService;
