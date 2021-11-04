import { getMeData } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { company, user } = getMeData();

  if ((!company || !user) && req.url !== ROUTES.LOGIN)
    NextResponse.redirect(ROUTES.LOGIN);
}
