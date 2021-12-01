import { getMeDataFromCookie, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { company } = getMeDataFromCookie(req.cookies);
  if (!isAuthenticated(req.cookies as any)) NextResponse.redirect(ROUTES.LOGIN);

  if (!company?.approved) return NextResponse.redirect(ROUTES.LOGIN);
}
