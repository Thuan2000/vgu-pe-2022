import base64 from "base-64";
import { IDUFile } from "@components/ui/storybook/document-uploader/document-uploader";
import { IFile } from "@graphql/types.graphql";
import { isEmpty } from "lodash";
import { getMeData } from "./auth-utils";
import {
  BILLION,
  BILLION_COUNT,
  IS_FULL_INFO_COMP,
  MILLION,
  MILLION_COUNT,
  MOBILE_SIZE,
} from "./constants";
import Cookies from "js-cookie";
import { TFunction } from "next-i18next";
import { SweetAlertResult, SweetAlertOptions } from "sweetalert2";
import { COLORS } from "./colors";

export function checkIsMobile(width: number) {
  return width >= MOBILE_SIZE.min && width <= MOBILE_SIZE.max;
}

export function trimText(text: string, limit: number) {
  if (!text) return "";

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

export function viDateFormat(dateString: string | number) {
  const date = new Date(dateString);
  const day = date.getDate() < 10 ? `0${date.getDay()}` : date.getDate();
  const month = (date.getMonth() as number) + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
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

export function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
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

export function getMoneySuffix(amount: number) {
  if (amount >= BILLION) return "billion-suffix";
  if (amount >= MILLION) return "million-suffix";
  return "";
}

export function getActivePath(pathname: string) {
  return `/${pathname.split("/")[1]}`;
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

export function getCompanySlug() {
  const { company } = getMeData();
  return company?.slug as string;
}

export function getCompanyChatId() {
  const { company } = getMeData();
  return company?.chatId;
}

export function getCompanyName() {
  const { company } = getMeData();
  return company?.name;
}

export function getLoggedInUser() {
  const { user } = getMeData();
  return user;
}

export function getObjectIds(array: any[]) {
  if (!array?.length) return;

  const ids = array.map((obj) => {
    if (typeof obj.id === "string") return parseInt(obj.id);
    return obj.id;
  });

  return ids;
}

export function preventSubmitOnEnter() {
  return {
    onKeyDown: (e: React.KeyboardEvent<any>) => {
      if (e.keyCode === 13) e.preventDefault();
    },
  };
}

export function callOnEnter(handler: (e: React.KeyboardEvent<any>) => void) {
  return {
    onKeyDown: (e: React.KeyboardEvent<any>) => {
      if (e.keyCode === 13) handler(e);
    },
  };
}

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

export function getExtXversion(ext: string[]) {
  let t = "";

  ext.forEach((e) => (t += `${e}, ${e}x,`));

  return t;
}

export function getDocumentAccept() {
  return `.pdf, ${getExtXversion(["doc", "xls", "ppt"])}`;
}

export function removeTypenameOfChildrens(childrens: any[] = []) {
  return childrens.map((child) => {
    const { __typename, ...c } = child;
    return c;
  });
}

export function removeTypename(data: any) {
  const { __typename, ...dataWithoutTypename } = data || {};
  return dataWithoutTypename;
}

export function getYear(stringDate: string) {
  if (!stringDate) return "";
  const year = new Date(stringDate).getFullYear();
  return year;
}

export function removeTypenameFromArray(withTypename: any[] = []) {
  const withoutTypename = withTypename?.map(({ __typename, ...wt }: any) => wt);

  return withoutTypename;
}

export function addIdAndRemoveTypenameFromArray(arr: any[] = []) {
  return arr.map(({ __typename, ...a }: any) => ({ id: generateUUID(), ...a }));
}

export function isEmptyObject(obj: any) {
  if (isEmpty(obj)) return true;

  let empty = true;
  Object.keys(obj).forEach((key) => {
    if (!!obj[key]) empty = false;
  });

  return empty;
}

/**
 * Normalize the string with special anotation
 * @param str
 * @returns normalized string
 */
export function normalizeString(str: string) {
  if (!str) return "";
  const normalized = str.normalize("NFD")?.replace(/[\u0300-\u037f]/g, "");
  return normalized.replace(/[^a-zA-Z0-9]/g, "");
}

export async function getBlob(file: IFile) {
  const d = await fetch(file.url);
  const blob = await d.blob();
  (blob as any).name = file.fileName;

  return blob;
}

export async function generateBlobs(files?: IDUFile[]) {
  if (!files || isEmpty(files)) return [];

  const blobs = await Promise.all(
    files.map(async (f) => {
      const blob = await getBlob(f);
      return blob;
    })
  );

  return blobs;
}

export async function getUploadedFiles(uploadFiles: any, blobs: Blob[]) {
  if (!uploadFiles || !blobs || isEmpty(blobs)) return [];

  const { data } = await uploadFiles({
    variables: {
      input: {
        files: blobs,
        uploadsFileInputType: "image" as any, // IFileType,
        companyName: getCompanyName()!,
        fileAccessControl: "PUBLIC_READ" as any, // IFileAccessControl ,
      },
    },
  });

  const uploadedImages = removeTypenameFromArray(data?.uploadFiles);

  return uploadedImages;
}

export function encodeString(text: string) {
  const b64Encoded = base64.encode(text);

  return b64Encoded;
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

// The cancel button and confirm button is swapped
export async function firePleaseFillCompanySwal(
  t: TFunction,
  Swal: any,
  texts?: {
    confirmButton?: string;
    denyButton?: string;
  }
): Promise<SweetAlertResult> {
  const data = await Swal.fire({
    icon: "info",
    title: t("common:you-need-to-fill-company-detail-to-access-title"),
    text: t("common:you-need-to-fill-company-detail-to-access-text"),
    confirmButtonText: texts?.denyButton || t("common:stay-button-label"),
    confirmButtonColor: COLORS.GRAY[400],
    showDenyButton: true,
    focusDeny: true,
    denyButtonColor: COLORS.PRIMARY.DEFAULT,
    denyButtonText:
      texts?.confirmButton || t("common:to-edit-company-page-button-label"),
    allowOutsideClick: false,
  } as SweetAlertOptions);

  return data;
}

export function removeLocaleFromRoute(route: string) {
  const locales = ["en", "vi"];
  locales.forEach((l) => (route = route.replace(`/${l}`, "")));
  return route;
}

export function getPathnameOnly(route: string) {
  return route.split("?")?.[0];
}

export function getFormattedPathnameRoute(route: string) {
  return getPathnameOnly(removeLocaleFromRoute(route));
}

// Print server info because currently it's a bit harder to see all the info
export function printServerInfo() {
  console.log(`Server endpoints info`);
  console.log(
    `API server endpoint : `,
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
  );
  console.log(`Chat web endpoint : `, process.env.NEXT_PUBLIC_CHAT_URL);
  console.log(
    `Chat server endpoint : `,
    process.env.NEXT_PUBLIC_CHAT_SERVER_URL
  );
}

/**
 * Get days different
 * @param date: Date to compare
 * @param otherDate: Date to compare
 * @returns days in number
 */
export function diffDays(
  date: Date,
  otherDate: Date
): { days?: number; months?: number; years?: number } {
  const daysDiff = Math.ceil(
    Math.abs((date as any) - (otherDate as any)) / (1000 * 60 * 60 * 24)
  );
  const monthsDiff = Math.max(Math.ceil(daysDiff / 30), 0);
  const yearsDiff = Math.max(Math.ceil(monthsDiff / 12), 0);

  if (!!yearsDiff)
    return {
      years: yearsDiff,
    };
  if (!!monthsDiff)
    return {
      months: monthsDiff,
    };
  return { days: daysDiff };
}

/**
 * Returning subscription information
 * @param t TFunction
 * @param name Subscription name from context
 * @param endAt Subscription endTime from context
 */
export function getSubscriptionInfoText(
  t: TFunction,
  name: string,
  endAt: Date
) {
  const remainDate = diffDays(new Date(endAt), new Date());
  return `${name} ${t("plan-text")}, ${t("expires-in-text")} ${
    remainDate.years || remainDate.months || remainDate.days
  } ${t(
    !!remainDate.years
      ? "years-text"
      : remainDate.months
      ? "month-text"
      : "days-text"
  )}`;
}
