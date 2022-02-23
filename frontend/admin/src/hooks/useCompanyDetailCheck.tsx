import { useIsCompanyFullInfoMutation } from "@graphql/company.graphql";
import { setIsFullInfoTrue } from "@utils/auth-utils";
import {
  getIsCompanyFullInfo,
  firePleaseLoginSwal,
  getCompanyId,
  getCompanySlug,
} from "@utils/functions";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const useCompanyDetailCheck = () => {
  const { t } = useTranslation();
  const isFullInfo = useRef(getIsCompanyFullInfo());
  const [checkFullInfo] = useIsCompanyFullInfoMutation();
  const { replace } = useRouter();

  async function check() {
    if (isFullInfo.current) return;

    const { data } = await checkFullInfo({ variables: { id: getCompanyId() } });
    const isFull = data?.isCompanyFullInfo;
    if (isFull) {
      setIsFullInfoTrue();
      return;
    }

    const res = await firePleaseLoginSwal(t, Swal);
    if (res) replace(`/${getCompanySlug()}/edit`);
  }

  return check;
};
export default useCompanyDetailCheck;
