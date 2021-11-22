import {
  CreateOptionActionMeta,
  RemoveValueActionMeta,
  SelectOptionActionMeta,
} from "react-select";

export function getCreateActionMeta(option: any) {
  const meta: CreateOptionActionMeta<any> = {
    action: "create-option",
    option,
  };
  return meta;
}

export function getSelectActionMeta(option: any) {
  const meta: SelectOptionActionMeta<any> = {
    action: "select-option",
    option,
  };
  return meta;
}

export function getRemoveActionMeta(removedValue: any) {
  const meta: RemoveValueActionMeta<any> = {
    action: "remove-value",
    removedValue,
  };
  return meta;
}
