import { getMeDataFromCookie, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { company } = getMeDataFromCookie(req.cookies);
  if (!isAuthenticated(req.cookies as any) && req.url !== ROUTES.LOGIN)
    NextResponse.redirect(ROUTES.LOGIN);

  if (!company.approved) NextResponse.redirect(ROUTES.LOGIN);
}
