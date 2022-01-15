export const EMAIL_SUBJECTS = {
	REGISTERED: "Tài khoản đã đăng ký",
	VERIFIED: "Tài khoản đã xác minh"
};

export const EMAIL_MESSAGES = {
	REGISTERED: `Tài khoản của bạn đã được tạo thành công. SDConnect đang xác thực
							 thông tin và sẽ liên hệ lại bạn trong thời gian sớm nhất. Trong khi
							 đó, bạn có thể trở về trang chủ và dạo vòng quanh xem SDConnect có gì
							 nhé.`,
	VERIFIED: `Xin chúc mừng, doanh nghiệp của bạn đã được xác thực thành công. 
						 Bạn có thể đăng nhập vào cửa hàng thông qua https://shop.sdconnect.vn 
						 và trải nghiệm 15 ngày dùng thử miễn phí các dịch vụ của chúng tôi.
						`
};

export const EMAIL_TITLES = {
	REGISTERED: "Tài khoản đã được xác thực!"
};

export enum EEMailTemplates {
	REGISTRATION = "register.html",
	VERIFICATION = "verified.html"
}
