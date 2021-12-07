import { ITagInput } from "@graphql/types";
import Tag from "@models/Tag";

class TagRepository {
	static async createTag(input: ITagInput) {
		Tag.create(input);
	}

	static async createTags(input: ITagInput[]) {
		Tag.bulkCreate(input);
	}
}

export default TagRepository;
