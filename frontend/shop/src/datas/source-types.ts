export interface ISourceType {
  id: number;
  label: string;
}

export function getSourceType(id?: number) {
  if (!id) return;

  return sourceTypes[id - 1];
}

export const sourceTypes = [
  { id: 1, label: "CUSTOMIZED_SOURCE" },
  { id: 2, label: "UNCUSTOMIZED_SOURCE" },
];
