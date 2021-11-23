import { getMeData, isAuthenticated } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!isAuthenticated(req.cookies as any) && req.url !== ROUTES.LOGIN)
    NextResponse.redirect(ROUTES.LOGIN);
}
