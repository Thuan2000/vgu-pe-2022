import UnitController from "@controllers/unit.controller";

export const Query = {
	units: (_, { locale }) => UnitController.getUnits(locale)
};
