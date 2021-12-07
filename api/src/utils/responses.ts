export const errorResponse = (message?: string) => {
	return { message: message || "SOMETHING_WENT_WRONG", success: false };
};
export const successResponseWithPayload = (payload = {}) => {
	return {
		payload: JSON.stringify(payload),
		message: "SUCCESS",
		success: true
	};
};

export const successResponse = (message?: string) => {
	return {
		message: message || "SUCCESS",
		success: true
	};
};

export const createSuccessResponse = (id: number) => {
	return {
		id,
		message: "SUCCESS",
		success: true
	};
};
