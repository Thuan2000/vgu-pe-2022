import { isLogin } from "@utils/auth-utils";
import { firePleaseLoginSwal } from "@utils/functions";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import router from "next/router";
import Swal from "sweetalert2";

const useLoginChecker = () => {
  const { t } = useTranslation();

  async function checkLogin() {
    const isLoggedIn = isLogin();
    if (isLoggedIn) return;

    // The cancel button and confirm button is swapped
    const { isDenied } = await firePleaseLoginSwal(t, Swal);
    if (isDenied) router.replace(ROUTES.LOGIN);
    else router.replace(ROUTES.HOMEPAGE);
  }

  return checkLogin;
};
export default useLoginChecker;
