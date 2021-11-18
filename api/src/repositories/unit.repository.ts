import { IUnitInput } from "@graphql/types";
import Unit from "@models/Unit";

class UnitRepository {
	static async createUnit(input: IUnitInput) {
		const newUnit = await (await Unit.create(input)).save();

		return newUnit.getDataValue("id");
	}

	static async createUnits(input: IUnitInput[]) {
		const newUnit = await Unit.bulkCreate(input);

		const ids = newUnit.map(nu => nu.getDataValue("id"));
		return ids;
	}
}

export default UnitRepository;
