export const errorResponse = (message?: string) => {
	return { message: message || "SOMETHING_WENT_WRONG", success: false };
};
export const successResponse = (message?: string) => {
	return {
		message: message || "SUCCESS",
		success: true
	};
};
