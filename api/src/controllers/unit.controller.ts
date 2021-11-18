import Unit from "@models/Unit";

class UnitController {
	static async getUnits(locale: string) {
		const units = await Unit.findAll({
			attributes: ["name"],
			where: { locale: locale || "vi" }
		});

		return units.length ? units : [{ name: "Kg", locale: "en" }];
	}
}

export default UnitController;
