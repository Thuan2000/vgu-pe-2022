import { find } from "lodash";

export interface ICategory {
  id: number;
  label: string;
  industryId: number;
}

export function getCategories(categoryIds: number[]) {
  if (!categoryIds) return [];
  // @TODO find if there's better option
  const categories = categoryIds.map((id) => getCategory(id));

  return categories;
}

export function getCategory(id: number) {
  if (id <= 0) return;
  return categoriesData[id - 1];
}

export function getIndustryCategories(industryId: number) {
  // @TODO find better way than loop all of them
  const categories = categoriesData.filter(
    (category) => category.industryId === industryId
  );

  return categories;
}

export const categoriesData = [
  // 1st category: Business Services.
  { id: 1, label: "BUSINESS CONSULTATION", industryId: 1 },
  { id: 2, label: "MANAGEMENT SOFTWARE", industryId: 1 },
  { id: 3, label: "OFFICE STATIONARIES", industryId: 1 },
  { id: 4, label: "FINANCIAL CONSULTATION", industryId: 1 },
  { id: 5, label: "ACCOUTING SERVICE", industryId: 1 },
  { id: 6, label: "BUSINESS LAWS", industryId: 1 },
  { id: 7, label: "CREDITS LOAN SERVICES", industryId: 1 },
  { id: 8, label: "RECRUITMENT", industryId: 1 },
  { id: 9, label: "BANKING SERVICES", industryId: 1 },
  { id: 10, label: "TRANSLATION SERVICES", industryId: 1 },
  { id: 11, label: "NON-LIFE INSURANCES", industryId: 1 },
  { id: 12, label: "MEDICAL INSURANCES", industryId: 1 },

  // Second
  { id: 13, label: "MEDIA SERVICES", industryId: 2 },
  { id: 14, label: "EVENT MANAGEMENT", industryId: 2 },
  { id: 15, label: "HOTELS & RESTAURANTS", industryId: 2 },
  { id: 16, label: "TOURISM", industryId: 2 },
  { id: 17, label: "WINE & BEVERAGES", industryId: 2 },
  { id: 18, label: "GIFTS", industryId: 2 },
  { id: 19, label: "FLOWERS", industryId: 2 },
  { id: 20, label: "DECORATIONS", industryId: 2 },
  { id: 21, label: "CAKES & PASTRIES", industryId: 2 },
  { id: 22, label: "PHOTOGRAPHY SERVICES", industryId: 2 },
  { id: 23, label: "EXHIBITION", industryId: 2 },

  // Third
  { id: 24, label: "WEB DESIGN & DEVELOPMENT", industryId: 3 },
  { id: 25, label: "BRAND DEVELOPMENT", industryId: 3 },
  { id: 26, label: "STRATEGIC CONSULTATION", industryId: 3 },
  { id: 27, label: "MEDIA SERVICES", industryId: 3 },
  { id: 28, label: "GRAPHICS DESIGN", industryId: 3 },
  { id: 29, label: "VIDEOGRAPHY", industryId: 3 },
  { id: 30, label: "RADIO ADVERTISING", industryId: 3 },
  { id: 31, label: "GIFTS FOR EVENTS", industryId: 3 },
  { id: 32, label: "PRINTING", industryId: 3 },
  { id: 33, label: "DIGITAL MARKETING", industryId: 3 },
  { id: 34, label: "CONTENT", industryId: 3 },
  { id: 35, label: "BILLBOARDS", industryId: 3 },

  // Fourth:
  { id: 36, label: "BUY SELL HIRE FACTORIES", industryId: 4 },
  { id: 37, label: "REAL-ESTATE VALUATION", industryId: 4 },
  { id: 38, label: "FACTORY ASSETS MANAGEMENT", industryId: 4 },
  { id: 39, label: "INSURANCE", industryId: 4 },
  { id: 40, label: "LEGAL SERVICES", industryId: 4 },
  { id: 41, label: "NOTARY OFFICE", industryId: 4 },
  { id: 42, label: "REAL-ESTATE ADMIN AND MANAGEMENT", industryId: 4 },
  { id: 43, label: "INDUSTRIAL REAL-ESTATE MANAGEMENT", industryId: 4 },
  { id: 43, label: "GUARDS & SECURITY", industryId: 4 },
  { id: 43, label: "WORKERS' ACCOMODATIONS", industryId: 4 },
];
