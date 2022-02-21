import { TPageName } from "@components/ui/search";
import { IVariation, IVariationOption } from "@graphql/types.graphql";
import base64 from "base-64";
import Cookies from "js-cookie";
import { findIndex, groupBy, isEqual } from "lodash";
import { TFunction } from "next-i18next";
import { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import { getMeData } from "./auth-utils";
import { COLORS } from "./colors";
import {
  BILLION,
  BILLION_COUNT,
  IS_FULL_INFO_COMP,
  MILLION,
  MILLION_COUNT,
  MOBILE_SIZE,
} from "./constants";

export function getMoneySuffix(amount: number) {
  if (amount >= BILLION) return "billion-suffix";
  if (amount >= MILLION) return "million-suffix";
  return "";
}

export function checkIsMobile(width: number) {
  return width >= MOBILE_SIZE.min && width <= MOBILE_SIZE.max;
}

export function trimText(text?: string, limit?: number) {
  if (!text || !limit) return text || "";

  if (text.length < limit) return text;

  return `${text.substring(0, limit)}...`;
}

export function timestampToDate(timestamp: number) {
  const date = new Date(timestamp);

  const day = date.getDate() < 10 ? `0${date.getDay()}` : date.getDate();
  const month = (date.getMonth() as number) + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function appendZeroOnLessTen(count: number) {
  return count < 10 ? `0${count}` : count;
}

export function viDateFormat(dateString: string | number) {
  const date = new Date(dateString);
  const day = appendZeroOnLessTen(date.getDate());
  const month = appendZeroOnLessTen((date.getMonth() as number) + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function viFormatDateToOriginalDate(viDateFormat: string) {
  const [day, month, year]: any = viDateFormat?.split(".") || [];

  return new Date(year, month - 1, day);
}

export function formatDateWithHour(dateString: string | number) {
  const date = new Date(dateString);
  const day = appendZeroOnLessTen(date.getDate());
  const month = appendZeroOnLessTen((date.getMonth() as number) + 1);
  const year = date.getFullYear();
  const hour = appendZeroOnLessTen(date.getHours());
  const minute = appendZeroOnLessTen(date.getMinutes());

  return `${day}.${month}.${year} ${hour}:${minute}`;
}

export function formatMoneyAmount(ma: number) {
  let maInString = ma?.toString() || "";

  if (maInString.length >= BILLION_COUNT) {
    const takenNumber = maInString.slice(0, maInString.length - 9);
    const decimal = maInString.slice(maInString.length - (BILLION_COUNT - 1));

    return `${thousandSeparator(takenNumber)},${decimal.substr(0, 1)}`;
  }
  if (maInString.length >= MILLION_COUNT) {
    const takenNumber = maInString.substring(
      0,
      maInString.length - (MILLION_COUNT - 1)
    );
    const decimal = maInString.slice(maInString.length - (MILLION_COUNT - 1));
    return `${thousandSeparator(takenNumber)},${decimal.substr(0, 1)}`;
  }

  return thousandSeparator(maInString);
}

export function thousandSeparator(x: string | number) {
  if (!x) return;
  return (typeof x === "number" ? x.toString() : x).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
}

export function getSuffix(amount: number) {
  if (amount > BILLION) return "billion-suffix";
  if (amount > MILLION) return "million-suffix";
  return "";
}

export function getActivePagePath(pathname: string) {
  return `/${pathname.split("/")[1]}`;
}

export function getActivePageFromPath(pathname: string) {
  return `${pathname.split("/")[1]}`;
}

export function getLoginCompanySlug() {
  const { company } = getMeData();

  return company?.slug as string;
}

export function getCompanyChatId() {
  const { company } = getMeData();
  return company?.chatId || null;
}
export function getCompanyId() {
  const { company } = getMeData();
  return company?.id as number;
}
export function getIsCompanyFullInfo() {
  const { company } = getMeData();
  const isFullInfoCookie = JSON.parse(
    Cookies.get(IS_FULL_INFO_COMP) || "false"
  );
  return company?.isFullInfo || isFullInfoCookie;
}
export function getCompanyName() {
  const { company } = getMeData();
  return company?.name;
}
export function getLoggedInUser() {
  const { user } = getMeData();
  return user;
}

export function isString(value: any) {
  if (!value) return false;

  return typeof value === "string";
}

export function getBudgetRange(
  minBudget: number,
  maxBudget: number,
  t: TFunction
) {
  return `${formatMoneyAmount(minBudget)} ${t(
    getSuffix(minBudget)
  )} - ${formatMoneyAmount(maxBudget)} ${t(getSuffix(maxBudget))}`;
}

export function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

// @TODO: Check this since it's from stackoverflow
export function generateUUID() {
  let d = new Date().getTime(); //Timestamp
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function isUserApproved() {
  const { company } = getMeData();
  return company?.approved;
}

export function toCamelCaseFromSnakeCase(label: string) {
  label = label.toLowerCase();
  label = setCharAt(label, 0, label[0]?.toUpperCase());
  for (let i = 0; i < label.length; i++) {
    const e = label[i];
    if (e === "-") {
      label = setCharAt(label, i, " ");
      label = setCharAt(label, i + 1, label[i + 1]?.toUpperCase());
    }
  }
  const decodedLabel = label.split("#")[0];
  return decodedLabel;
}

export function getUserFullName() {
  const { user } = getMeData();

  return `${user?.firstName} ${user?.lastName}`;
}

export function getUserFirstName() {
  const { user } = getMeData();

  return `${user?.firstName}`;
}

export function getUserLastName() {
  const { user } = getMeData();

  return `${user?.lastName}`;
}

/**
 *
 * @param date stringDate
 *
 */
export function getCompanyExperience(date: string) {
  const companyYear = new Date(date).getFullYear();
  const nowYear = new Date().getFullYear();

  return {
    amount: companyYear - nowYear,
    timeUnit: "YEAR",
  };
}

export function getYear(stringDate: string) {
  if (!stringDate) return "";
  const year = new Date(stringDate).getFullYear();
  return year;
}

export function getProductVariationGroup(variations?: IVariation[]) {
  if (!variations?.length) return;

  const groups: IVariationOption[] = [];

  // Get options
  variations.forEach((v) => {
    const opts: IVariationOption[] = v?.options || [];
    opts.forEach((o) => {
      const idx = findIndex(groups, (opt) => opt.value === o.value);
      if (idx === -1) groups.push(o);
    });
  });

  return groupBy(groups, "name");
}

export function getSelectedVariation(
  variations: IVariation[],
  selectedOption: { [name: string]: string }
): IVariation {
  return variations?.find((o: any) =>
    isEqual(
      o.options.map((v: any) => v.value).sort(),
      Object.values(selectedOption).sort()
    )
  ) as any;
}

export function generateChatPassword(password: string) {
  const splitted = password.split("@");
  const userName = `${splitted?.[0]}`;

  return userName;
}

export function generateUsername(email: string) {
  const splitted = email.split("@");
  const userName = `${splitted?.[0]}`;

  return userName;
}

export function encodeString(text: string) {
  const b64Encoded = base64.encode(text);

  return b64Encoded;
}

export function decodeString(text: string) {
  const b64Decoded = base64.decode(text);

  return b64Decoded;
}

export function getIsValidEmail(email: string) {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

/**
 * Removed Forward Slash
 * return removed forward slash of a string
 */
export function rfw(v: string) {
  if (v.substring(0, 1) !== "/") return v;

  return v.substring(1);
}

// The cancel button and confirm button is swapped
export async function firePleaseLoginSwal(
  t: TFunction,
  Swal: any,
  texts?: {
    confirmButton?: string;
    denyButton?: string;
  }
): Promise<SweetAlertResult> {
  const data = await Swal.fire({
    icon: "info",
    title: t("common:you-need-to-login-to-access-title"),
    text: t("common:you-need-to-login-to-access-text"),
    denyButtonText: texts?.denyButton || t("common:to-login-page-button-label"),
    denyButtonColor: COLORS.PRIMARY.DEFAULT,
    showDenyButton: true,
    focusDeny: true,
    confirmButtonText:
      texts?.confirmButton || t("common:to-home-page-button-label"),
    confirmButtonColor: COLORS.GRAY[100],
    allowOutsideClick: false,
  } as SweetAlertOptions);

  return data;
}
