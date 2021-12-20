export interface IBusinessType {
  label: string;
  id: number;
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

export function getBusinessType(id: number) {
  return businessTypes[id - 1];
}

export function getBusinessTypes(ids: number[]) {
  const bts = ids.map((id) => businessTypes[id - 1]) as any;
  return bts;
}
