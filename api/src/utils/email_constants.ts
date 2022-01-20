export const EMAIL_SUBJECTS = {
	REGISTERED: "[Thông báo]: Đã nhận hồ sơ đăng ký",
	VERIFIED: "Chúc mừng! Tài khoản công ty đã được duyệt"
};

export const EMAIL_MESSAGES = {
	REGISTERED: `Tài khoản của bạn đã được tạo thành công. SDConnect đang xác thực
							 thông tin và sẽ liên hệ lại bạn trong thời gian sớm nhất.`,
	VERIFIED: `Xin chúc mừng, doanh nghiệp của bạn đã được xác thực thành công. 
						 Bạn có thể đăng nhập vào cửa hàng thông qua https://tmdt.sdconnect.vn 
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
