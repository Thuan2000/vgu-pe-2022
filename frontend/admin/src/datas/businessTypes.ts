export interface IBusinessType {
  label: string;
  id: number;
}

export function getBusinessType(id: number) {
  return businessTypes[id];
}

export const businessTypes = [
  {
    id: 1,
    label: "BUSINESS_TYPE_1",
  },
];
