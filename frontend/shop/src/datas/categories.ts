import { find, findIndex } from "lodash";

export interface ICategory {
  id: number;
  label: string;
  industryId: number;
  slug: string;
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

export function getCategoryByLabel(label: string) {
  const idx = findIndex(categoriesData, (city) => label === city.label);

  return categoriesData[idx];
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
  {
    id: 1,
    label: "BUSINESS CONSULTATION",
    industryId: 1,
    slug: "business-consultation",
  },
  {
    id: 2,
    label: "MANAGEMENT SOFTWARE",
    industryId: 1,
    slug: "management-software",
  },
  {
    id: 3,
    label: "OFFICE STATIONARIES",
    industryId: 1,
    slug: "office-stationaries",
  },
  {
    id: 4,
    label: "FINANCIAL CONSULTATION",
    industryId: 1,
    slug: "financial-consultation",
  },
  {
    id: 5,
    label: "ACCOUTING SERVICE",
    industryId: 1,
    slug: "accouting-service",
  },
  { id: 6, label: "BUSINESS LAWS", industryId: 1, slug: "business-laws" },
  {
    id: 7,
    label: "CREDITS LOAN SERVICES",
    industryId: 1,
    slug: "credits-loan services",
  },
  { id: 8, label: "RECRUITMENT", industryId: 1, slug: "recruitment" },
  { id: 9, label: "BANKING SERVICES", industryId: 1, slug: "banking-services" },
  {
    id: 10,
    label: "TRANSLATION SERVICES",
    industryId: 1,
    slug: "translation-services",
  },
  {
    id: 11,
    label: "NON-LIFE INSURANCES",
    industryId: 1,
    slug: "non-life insurances",
  },
  {
    id: 12,
    label: "MEDICAL INSURANCES",
    industryId: 1,
    slug: "medical-insurances",
  },

  // Second
  { id: 13, label: "MEDIA SERVICES", industryId: 2, slug: "media-services" },
  {
    id: 14,
    label: "EVENT MANAGEMENT",
    industryId: 2,
    slug: "event-management",
  },
  {
    id: 15,
    label: "HOTELS & RESTAURANTS",
    industryId: 2,
    slug: "hotels-&-restaurants",
  },
  { id: 16, label: "TOURISM", industryId: 2, slug: "tourism" },
  {
    id: 17,
    label: "WINE & BEVERAGES",
    industryId: 2,
    slug: "wine-&-beverages",
  },
  { id: 18, label: "GIFTS", industryId: 2, slug: "gifts" },
  { id: 19, label: "FLOWERS", industryId: 2, slug: "flowers" },
  { id: 20, label: "DECORATIONS", industryId: 2, slug: "decorations" },
  {
    id: 21,
    label: "CAKES & PASTRIES",
    industryId: 2,
    slug: "cakes-& pastries",
  },
  {
    id: 22,
    label: "PHOTOGRAPHY SERVICES",
    industryId: 2,
    slug: "photography-services",
  },
  { id: 23, label: "EXHIBITION", industryId: 2, slug: "exhibition" },

  // Third
  {
    id: 24,
    label: "WEB DESIGN & DEVELOPMENT",
    industryId: 3,
    slug: "web-design-&-development",
  },
  {
    id: 25,
    label: "BRAND DEVELOPMENT",
    industryId: 3,
    slug: "brand-development",
  },
  {
    id: 26,
    label: "STRATEGIC CONSULTATION",
    industryId: 3,
    slug: "strategic-consultation",
  },
  { id: 27, label: "MEDIA SERVICES", industryId: 3, slug: "media-services" },
  { id: 28, label: "GRAPHICS DESIGN", industryId: 3, slug: "graphics-design" },
  { id: 29, label: "VIDEOGRAPHY", industryId: 3, slug: "videography" },
  {
    id: 30,
    label: "RADIO ADVERTISING",
    industryId: 3,
    slug: "radio-advertising",
  },
  {
    id: 31,
    label: "GIFTS FOR EVENTS",
    industryId: 3,
    slug: "gifts-for-events",
  },
  { id: 32, label: "PRINTING", industryId: 3, slug: "printing" },
  {
    id: 33,
    label: "DIGITAL MARKETING",
    industryId: 3,
    slug: "digital-marketing",
  },
  { id: 34, label: "CONTENT", industryId: 3, slug: "content" },
  { id: 35, label: "BILLBOARDS", industryId: 3, slug: "billboards" },

  // Fourth:
  {
    id: 36,
    label: "BUY SELL HIRE FACTORIES",
    industryId: 4,
    slug: "buy-sell-hire-factories",
  },
  {
    id: 37,
    label: "REAL-ESTATE VALUATION",
    industryId: 4,
    slug: "real-estate-valuation",
  },
  {
    id: 38,
    label: "FACTORY ASSETS MANAGEMENT",
    industryId: 4,
    slug: "factory-assets-management",
  },
  { id: 39, label: "INSURANCE", industryId: 4, slug: "insurance-" },
  { id: 40, label: "LEGAL SERVICES", industryId: 4, slug: "legal-services" },
  { id: 41, label: "NOTARY OFFICE", industryId: 4, slug: "notary-office" },
  {
    id: 42,
    label: "REAL-ESTATE ADMIN AND MANAGEMENT",
    industryId: 4,
    slug: "real-estate admin and management",
  },
  {
    id: 43,
    label: "INDUSTRIAL REAL-ESTATE MANAGEMENT",
    industryId: 4,
    slug: "industrial-real-estate management",
  },
  {
    id: 43,
    label: "GUARDS & SECURITY",
    industryId: 4,
    slug: "guards-& security",
  },
  {
    id: 43,
    label: "WORKERS ACCOMODATIONS",
    industryId: 4,
    slug: "workers-accomodations",
  },

  // Fiftg
  {
    id: 44,
    label: "WORKERS ACCOMODATIONS",
    industryId: 5,
    slug: "workers-accomodations",
  },
];
