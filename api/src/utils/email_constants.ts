export const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL;

export const EMAIL_SUBJECTS = {
	FORGOT_PASSWORD: "Password Reset Link",
	REGISTERED: "[Thông báo]: Đã nhận hồ sơ đăng ký",
	VERIFIED: "Chúc mừng! Tài khoản công ty đã được duyệt"
};

export const EMAIL_MESSAGES = {
	FORGOT_PASSWORD: "To reset your password please click this link : ",
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
	VERIFICATION = "verified.html",
	FORGOT_PASSWORD = "forgot-password.html",
	NEW_COMPANY_REGISTERED = "verified.html"
}
