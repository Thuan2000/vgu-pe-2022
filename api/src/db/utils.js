module.exports = {
	timestampGenerator: () => {
		return {
			createdAt: new Date(),
			updatedAt: new Date()
		};
	}
};
