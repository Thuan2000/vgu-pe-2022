export interface IBusinessType {
  label: string;
  id: number;
}

export const businessTypes = [
  {
    id: 1,
    // old name: SERVICE
    label: "Dịch vụ",
  },
  {
    id: 2,
    // old name: TRADING_COMPANY
    label: "Thương Mại",
  },
  {
    id: 3,
    // old name: MANUFACTURER
    label: "Sản Xuất",
  },
];

export function getBusinessType(id: number) {
  return businessTypes[id - 1];
}

export function getBusinessTypes(ids: number[]) {
  const bts = ids.map((id) => businessTypes[id - 1]) as any;
  return bts;
}
