import Database from "@services/database.service";
import { DataTypes, Model } from "sequelize";
import BuyingRequest from "./BuyingRequest";
import Company from "./Company";

class Bid extends Model {
	buyingRequestId: number;
	companyId: number;
	deliveryDate: number;
	budget: number;
	createdBy: number;
	message: string;
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}

Bid.init(
	{
		buyingRequestId: DataTypes.INTEGER,
		companyId: DataTypes.INTEGER,
		deliveryDate: DataTypes.DATE,
		budget: DataTypes.BIGINT,
		createdById: DataTypes.INTEGER,
		message: DataTypes.STRING
	},
	{
		sequelize: Database.stcSequelize,
		modelName: "Bid",
		tableName: "bids"
	}
);

Bid.belongsTo(BuyingRequest);
Bid.belongsTo(Company);
BuyingRequest.hasMany(Bid, { as: "bids" });

export default Bid;
