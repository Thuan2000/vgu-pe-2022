import { Sequelize } from "sequelize";

class CompanyRepository {
	static sequelizeFnGetBranchAmount() {
		return [
			Sequelize.fn(
				"JSON_LENGTH",
				Sequelize.fn(
					"JSON_EXTRACT",
					Sequelize.col("settings"),
					Sequelize.literal(`"$.branches"`)
				)
			),
			"branchAmount"
		];
	}

	static sequelizeFnGetCoverImage() {
		return [
			Sequelize.fn(
				"JSON_EXTRACT",
				Sequelize.col("settings"),
				Sequelize.literal(`"$.profileImage"`)
			),
			"profileImage"
		];
	}

	static sequelizeFnGetMainProducts() {
		return [
			Sequelize.fn(
				"JSON_EXTRACT",
				Sequelize.col("settings"),
				Sequelize.literal(`"$.mainProducts"`)
			),
			"mainProducts"
		];
	}
}

export default CompanyRepository;
