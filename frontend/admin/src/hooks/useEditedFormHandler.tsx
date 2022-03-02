import { getFormattedPathnameRoute } from "@utils/functions";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const useIsEditedFormHandler = () => {
  const { t } = useTranslation();
  const { query, ...router } = useRouter();
  const isEdited = useRef(false);
  const isStopped = useRef(false);
  const slug = query.slug as string;

  const preventRouteChange = (newUrl: string) => {
    if (
      getFormattedPathnameRoute(newUrl) ===
        router.pathname.replace("[slug]", slug) ||
      isStopped.current
    )
      return;

    if (confirm(t("change-will-discarded-title"))) return;

    router.events.emit("routeChangeError");
    throw `Route change to "${newUrl}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
  };

  function preventReload() {
    if (isStopped.current) return;
    return confirm(t("change-will-discarded-title"));
  }

  function addListener() {
    router.events.on("routeChangeStart", preventRouteChange);
    window.onbeforeunload = preventReload;
  }

  function removeListener() {
    if (!isEdited.current) return;
    router.events.off("routeChangeStart", preventRouteChange);
    window.onbeforeunload = null;
  }

  useEffect(() => {
    if (!isStopped.current && isEdited.current) addListener();
    return removeListener;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdited.current]);

  function startListen(newIsEdited: boolean) {
    isEdited.current = newIsEdited;
  }

  function stopListen() {
    isStopped.current = true;
  }

  return { startListen, stopListen };
};
export default useIsEditedFormHandler;
