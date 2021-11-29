import { TFunction } from "next-i18next";
import { getMeData } from "./auth-utils";
import {
  BILLION,
  BILLION_COUNT,
  MILLION,
  MILLION_COUNT,
  MOBILE_SIZE,
} from "./constants";

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

export function formatMoneyAmount(ma: number) {
  let maInString = ma?.toString() || "";

  if (maInString.length >= BILLION_COUNT) {
    const takenNumber = maInString.slice(0, maInString.length - 9);
    const decimal = maInString.slice(-1, -BILLION_COUNT);

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

export function getActivePath(pathname: string) {
  return `/${pathname.split("/")[1]}`;
}

export function getCompanyId() {
  const { company } = getMeData();

  return company?.id as number;
}
export function getCompanyName() {
  const { company } = getMeData();

  return company?.name;
}
export function getLoggedInUser() {
  const { user } = getMeData();

  return user;
}
export function loggedInUser() {
  const { user } = getMeData();
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
