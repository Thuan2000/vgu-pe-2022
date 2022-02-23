import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useIsEditedFormHandler = (isEdited: boolean) => {
  const { t } = useTranslation();
  const router = useRouter();

  const preventRouteChange = (url: string) => {
    if (router.pathname !== url && !confirm(t("change-will-discarded-title"))) {
      router.events.emit("routeChangeError");
      throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
    }
  };

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
