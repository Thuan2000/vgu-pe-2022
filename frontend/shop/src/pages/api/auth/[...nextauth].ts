import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	// All login providers should be defined here
	providers: [
		Providers.Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],

	// Long string to sign or Encrypt JWT, and to sign cookies
	secret: process.env.AUTH_SECRET,

	// Debug mode if it's on development
	debug: process.env.NODE_ENV === "development"
});
