import { isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!isAuthenticated(req.cookies as any)) NextResponse.redirect(ROUTES.LOGIN);

  // const { company } = getMeDataFromCookie(req.cookies);
  // if (!company?.approved) return NextResponse.redirect(ROUTES.LOGIN);
}
