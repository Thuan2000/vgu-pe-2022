export type TTCtrlParam = "auth" | "data";

export function getCtrlParamsWhat(ctrl: any): TTCtrlParam | "" {
  if (!ctrl) return "";
  return ctrl.params?.what;
}
