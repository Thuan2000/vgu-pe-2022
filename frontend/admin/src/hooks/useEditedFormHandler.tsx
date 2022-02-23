import { COLORS } from "@utils/colors";
import { getFormattedPathnameRoute } from "@utils/functions";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Swal, { SweetAlertOptions } from "sweetalert2";

const useIsEditedFormHandler = (isEdited: boolean) => {
  const { t } = useTranslation();
  const router = useRouter();
  async function preventRouteChange(nextRoute: string) {
    // TODO: Prevent route change using next router
    return false;
    const fNextRoute = getFormattedPathnameRoute(nextRoute);
    const fBaseRoute = getFormattedPathnameRoute(router.asPath);
    if (fNextRoute === fBaseRoute) return;

    const { isDenied } = await Swal.fire({
      icon: "info",
      title: t("change-will-discarded-title"),
      text: t("change-will-discarded-text"),
      denyButtonText: t("discard-change-button-label"),
      denyButtonColor: COLORS.PRIMARY.DEFAULT,
      showDenyButton: true,
      focusDeny: true,
      confirmButtonText: t("cancel-button-label"),
      confirmButtonColor: COLORS.GRAY[100],
      allowOutsideClick: false,
    });

    return isDenied;
  }

  function preventReload() {
    return confirm(t("change-will-discarded-title"));
  }

  function addListener() {
    if (!isEdited) return;
    router.events.on("routeChangeStart", preventRouteChange);
    window.onbeforeunload = preventReload;
    // router.events.on("beforeHistoryChange", preventRouteChange);
  }

  function removeListener() {
    if (!isEdited) return;
    router.events.off("routeChangeStart", preventRouteChange);
    router.events.off("beforeHistoryChange", preventRouteChange);
    window.onbeforeunload = null;
  }

  useEffect(() => {
    addListener();
    return removeListener;
  }, [isEdited]);
};
export default useIsEditedFormHandler;
