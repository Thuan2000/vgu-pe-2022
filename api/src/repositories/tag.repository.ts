import { ITagInput } from "@graphql/types";
import Tag from "@models/Tag";

class TagRepository {
	static async createTag(input: ITagInput) {
		const exist = await Tag.findOne({
			where: {
				locale: input.locale,
				name: input.name
			}
		});

		if (!!exist) return exist.getDataValue("id");

		const newTag = await (await Tag.create(input)).save();

		return newTag.getDataValue("id");
	}

	static async createTags(input: ITagInput[]) {
		const names = input.map(i => i.name);
		// @TODO || update this algorithm,
		// I wrote this because headache
		const existTags = await Tag.findAll({
			where: {
				locale: input?.at(0).locale,
				name: names
			}
		});

		const nonExist = input.filter(i => {
			return (
				existTags.findIndex(
					et => et.getDataValue("name") !== i.name
				) === -1
			);
		});

		const newTag = await Tag.bulkCreate(nonExist);
		const ids = newTag.map(nt => nt.getDataValue("id"));
		return ids;
	}
}

export default TagRepository;
