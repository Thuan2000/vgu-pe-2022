export interface IBusinessType {
  label: string;
  id: number;
}

export function getBusinessType(id: number) {
  return businessTypes[id - 1];
}

export const businessTypes = [
  {
    id: 1,
    label: "SERVICE",
  },
  {
    id: 2,
    label: "TRADING_COMPANY",
  },
  {
    id: 3,
    label: "MANUFACTURER",
  },
];
