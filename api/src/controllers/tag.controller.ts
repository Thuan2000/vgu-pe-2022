import Tag from "@models/Tag";

class TagController {
	static async getTags(locale: string) {
		const tags = await Tag.findAll({
			attributes: ["name"],
			where: { locale: locale || "vi" }
		});

		return tags || [];
	}
}

export default TagController;
