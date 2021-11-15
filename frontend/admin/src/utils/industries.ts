export const industriesData = [
  { id: 1, label: "BUSINESS SERVICES" },
  { id: 2, label: "EVENTS" },
  { id: 3, label: "MARKETING" },
  // { id: 4, label: "INDUSTRIAL-ZONE REAL-ESTATE" },
  // { id: 5, label: "CONSTRUCTION" },
  // { id: 6, label: "SECURITY & SAFETY EQUIPMENTS" },
  // { id: 7, label: "FUEL" },
  // { id: 8, label: "MATERIAL" },
  // { id: 9, label: "GARMENT ACCESSORIES" },
  // { id: 10, label: "FOOTWEAR ACCESSORIES" },
  // { id: 11, label: "ELECTRONIC ACCESSORIES" },
  // { id: 12, label: "MECHANICAL MATERIALS & ACCESSORIES" },
  // { id: 13, label: "PLASTIC ACCESSORIES" },
  // { id: 14, label: "AGRICULTURAL MATERIALS" },
  // { id: 15, label: "MECHANICAL TOOLS" },
  // { id: 16, label: "OFFICE STATIONARIES AND SAFETY EQUIPMENTS" },
  // { id: 17, label: "OFFICE FURNITURES" },
  // { id: 18, label: "WATER-&-ELECTRICITY TOOLS" },
  // { id: 19, label: "LOGISTICS" },
  // { id: 20, label: "CHEMICALS" },
  // { id: 21, label: "BOTANY SERVICE" },
  // { id: 22, label: "HEALTH - MEDICINE" },
];

export function getIndustry(id: number) {
  return industriesData[id - 1];
}

export interface IIndustry {
  id: number;
  label: string;
}
