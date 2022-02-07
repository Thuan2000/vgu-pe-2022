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
  return categoriesData[id - 1];
}

export function getIndustryCategories(industryId: number) {
  // @TODO find better way than loop all of them
  const categories = categoriesData.filter(
    (category) => category.industryId === industryId
  );

  return categories || [];
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

  // Fourth
  { id: 36, label: "BUY SELL HIRE FACTORIES", industryId: 4 },
  { id: 37, label: "REAL-ESTATE VALUATION", industryId: 4 },
  { id: 38, label: "FACTORY ASSETS MANAGEMENT", industryId: 4 },
  { id: 39, label: "INSURANCE", industryId: 4 },
  { id: 40, label: "LEGAL SERVICES", industryId: 4 },
  { id: 41, label: "NOTARY OFFICE", industryId: 4 },
  { id: 42, label: "REAL-ESTATE ADMIN AND MANAGEMENT", industryId: 4 },
  { id: 43, label: "INDUSTRIAL REAL-ESTATE MANAGEMENT", industryId: 4 },
  { id: 44, label: "GUARDS & SECURITY", industryId: 4 },
  { id: 45, label: "WORKERS' ACCOMODATIONS", industryId: 4 },

  //Fifth
  { id: 46, label: "CONSTRUCTION DESIGN", industryId: 5 },
  { id: 47, label: "FACTORY CONSTRUCTION", industryId: 5 },
  { id: 48, label: "ELECTRONIC CABLE SUPPLIER", industryId: 5 },
  { id: 49, label: "ELECTRONIC & WATER CONSTRUCTION", industryId: 5 },
  { id: 50, label: "INTERIOR DESIGNER", industryId: 5 },
  { id: 51, label: "M&E COMPANY", industryId: 5 },
  { id: 52, label: "TEMP HOUSE", industryId: 5 },
  { id: 53, label: "REFRIGERATION SYSTEM", industryId: 5 },
  { id: 54, label: "LIGHTING SYSTEM", industryId: 5 },
  { id: 55, label: "INFRASTRUCTURE - ROAD", industryId: 5 },
  { id: 56, label: "FIRE SAFETY", industryId: 5 },

  //6th
  { id: 58, label: "FIRE SAFETY", industryId: 6 },
  { id: 59, label: "CAMERA", industryId: 6 },
  { id: 60, label: "SECURITY SERVICE", industryId: 6 },
  { id: 61, label: "BODYGUARD SERVICE", industryId: 6 },
  { id: 63, label: "PERSONAL DETECTIVE SERVICE", industryId: 6 },
  { id: 64, label: "SECURITY SYSTEM", industryId: 6 },
  { id: 65, label: "IN/OUT CHECK SYSTEM", industryId: 6 },
  { id: 66, label: "RESCUE SYSTEM", industryId: 6 },
  { id: 67, label: "CYBERSECURITY TECH", industryId: 6 },
  { id: 68, label: "CCTV SYSTEM", industryId: 6 },
  
  //7th
  { id: 69, label: "PETROL", industryId: 7 },
  { id: 70, label: "LO HOI", industryId: 7 },
  { id: 71, label: "LIQUEFIED PETROLEUM GAS", industryId: 7 },
  { id: 72, label: "LUB OIL", industryId: 7 },
  { id: 73, label: "SOLAR ENERGY", industryId: 7 },
  { id: 74, label: "ELECTRICITY", industryId: 7 },
  { id: 75, label: "WOOD STUFFS", industryId: 7 },
  { id: 76, label: "PRESSED COAL", industryId: 7 },
  { id: 77, label: "WOOD", industryId: 7 },
  { id: 78, label: "BIOFUEL", industryId: 7 },
  { id: 79, label: "GARBAGE INCINERATOR", industryId: 7 },

  //8th
  { id: 80, label: "LEATHER BOOT MATERIAL", industryId: 8 },
  { id: 81, label: "TEXTILE MATERIAL", industryId: 8 },
  { id: 82, label: "ELECTRONICS MATERIAL", industryId: 8 },
  { id: 83, label: "MECHANICAL MATERIAL", industryId: 8 },
  { id: 84, label: "PLASTICS MATERIAL", industryId: 8 },
  { id: 85, label: "ARGICUTURAL MATERIAL", industryId: 8 },
  { id: 86, label: "WOOD MATERIAL", industryId: 8 },
  { id: 87, label: "FOOD MATERIAL", industryId: 8 },
  { id: 88, label: "PACKAGE WRAP MATERIAL", industryId: 8 },
  { id: 89, label: "CRAFTS MATERIAL", industryId: 8 },
  { id: 90, label: "CONSTRUCTION MATERIAL", industryId: 8 },
  { id: 91, label: "SCIENCE - TECH - MATERIAL", industryId: 8 },
  { id: 92, label: "FODDER MATERIAL", industryId: 8 },

  //9th
  { id: 93, label: "FARBIC", industryId: 9 },
  { id: 94, label: "YARN", industryId: 9 },
  { id: 95, label: "FIBER", industryId: 9 },
  { id: 96, label: "BUTTON", industryId: 9 },
  { id: 97, label: "SEWING THREAD", industryId: 9 },
  { id: 98, label: "ZIP", industryId: 9 },
  { id: 99, label: "ELASTIC WAIST", industryId: 9 },
  { id: 100, label: "SMOCKING SEWING THREAD", industryId: 9 },
  { id: 101, label: "NEEDLE & NON-WOVEN FARBIC", industryId: 9 },
  { id: 102, label: "COTTON THREAD GLUE", industryId: 9 },
  { id: 103, label: "SHOULDER PADS & CHEST CUP", industryId: 9 },
  { id: 104, label: "MEX - MEX", industryId: 9 },

  //10th
  { id: 105, label: "LEATHERETTE FARBIC", industryId: 10 },
  { id: 106, label: "LEATHER", industryId: 10 },
  { id: 107, label: "SOLE", industryId: 10 },
  { id: 108, label: "BOOTS SEWING THREAD", industryId: 10 },
  { id: 109, label: "BOOTS GLUE", industryId: 10 },
  { id: 110, label: "HOOK", industryId: 10 },
  { id: 111, label: "PLASTIC BEAD", industryId: 10 },
  { id: 112, label: "PU", industryId: 10 },
  { id: 113, label: "PRESSED LEATHER HEEL", industryId: 10 },
  { id: 114, label: "MAT GOT", industryId: 10 },
  { id: 115, label: "INSOLE", industryId: 10 },
  { id: 116, label: "PHO MUI", industryId: 10 },

  //11th
  { id: 117, label: "BATTERY", industryId: 11 },
  { id: 118, label: "CHIP", industryId: 11 },
  { id: 119, label: "SEMICONDUCTOR COMPONENT", industryId: 11 },
  { id: 120, label: "IC", industryId: 11 },
  { id: 121, label: "COMPUTER COMPONENT", industryId: 11 },
  { id: 122, label: "MOBILE-PHONE COMPONENT", industryId: 11 },
  { id: 123, label: "HOUSEWARE E-COMPONENT", industryId: 11 },
  { id: 124, label: "AUTOMATICAL E-COMPONENT", industryId: 11 },
  { id: 125, label: "SOLDERING COMPONENT", industryId: 11 },
  { id: 126, label: "PCB COMPONENT", industryId: 11 },
  { id: 127, label: "ADAPTOR", industryId: 11 },
  { id: 128, label: "ARDUINO", industryId: 11 },


  //12th
  { id: 130, label: "CNC", industryId: 12 },
  { id: 131, label: "POWER COATING", industryId: 12 },
  { id: 132, label: "DIP PLATING", industryId: 12 },
  { id: 133, label: "STEEL", industryId: 12 },
  { id: 134, label: "INOX", industryId: 12 },
  { id: 135, label: "ALUMIUM", industryId: 12 },
  { id: 136, label: "BRONZE", industryId: 12 },
  { id: 137, label: "CAST IRON", industryId: 12 },
  { id: 138, label: "JIG", industryId: 12 },
  { id: 139, label: "MOLD", industryId: 12 },
  { id: 140, label: "TURNING MILLING PLANING GRINDING", industryId: 12 },

  //13th
  { id: 141, label: "PLASTIC & RUBBER", industryId: 13 },
  { id: 142, label: "COMPOSITE", industryId: 13 },
  { id: 143, label: "PLATIC BEADS & ADDITIVES", industryId: 13 },
  { id: 144, label: "INDUSTRIAL PLASTIC", industryId: 13 },
  { id: 145, label: "PLASTIC PRODUCT", industryId: 13 },
  { id: 146, label: "PLASTIC RUBBER EQUIQMENT", industryId: 13 },
  { id: 147, label: "PLASTIC TARPAULIN", industryId: 13 },
  { id: 148, label: "PE", industryId: 13 },
  { id: 149, label: "FIBERGLASS FARBIC", industryId: 13 },
  { id: 150, label: "CHEMICAL-RESISTANT PLASTIC MATERIAL", industryId: 13 },
  { id: 151, label: "PLASTIC CANS", industryId: 13 },

  //14th
  { id: 152, label: "COFFEE", industryId: 14 },
  { id: 153, label: "CASHEW", industryId: 14 },
  { id: 154, label: "RICE", industryId: 14 },
  { id: 155, label: "TEA", industryId: 14 },
  { id: 156, label: "FRUIT", industryId: 14 },
  { id: 157, label: "FRUIT OIL", industryId: 14 },
  { id: 158, label: "DRAGON FRUIT", industryId: 14 },
  { id: 159, label: "LYCHEE", industryId: 14 },
  { id: 160, label: "PEPPER", industryId: 14 },

  //15
  { id: 161, label: "HAND TOOL", industryId: 15 },
  { id: 162, label: "TOOL", industryId: 15 },
  { id: 163, label: "SOLDERING DEVICE", industryId: 15 },
  { id: 164, label: "CUT TOOL", industryId: 15 },
  { id: 165, label: "PLASTIC TANK", industryId: 15 },
  { id: 166, label: "CHEMICAL TANK", industryId: 15 },
  { id: 167, label: "BIOGAS TANK", industryId: 15 },
  { id: 168, label: "SILO", industryId: 15 },
  { id: 169, label: "HEAT TANK", industryId: 15 },
  { id: 170, label: "TANK GLUE", industryId: 15 },
  { id: 171, label: "TANK MAKING SERVICE", industryId: 15 },
  { id: 172, label: "COMPRESSED AIR TANK", industryId: 15 },
  { id: 173, label: "INDUSTRIAL TANK", industryId: 15 },
  { id: 174, label: "COMPOSITE TANK", industryId: 15 },
  { id: 175, label: "INOX TANK", industryId: 15 },
  { id: 213, label: "TOLSEN TOOL", industryId: 15 },

  
  //16th
  { id: 176, label: "STATIONERY", industryId: 16 },
  { id: 177, label: "OFFICE EQUIMENT", industryId: 16 },
  { id: 178, label: "RENTAL OFFICE EQUIMENT", industryId: 16 },
  { id: 179, label: "CLEAN ROOM EQUIMENT", industryId: 16 },
  { id: 180, label: "PROCHURE", industryId: 16 },
  { id: 181, label: "SAFETY GEAR", industryId: 16 },
  { id: 182, label: "CONTRUCTION STUFFS", industryId: 16 },
  { id: 183, label: "COMPANY HOUSEWARE", industryId: 16 },
  { id: 184, label: "CLEAN ROOM DEVICE", industryId: 16 },
  { id: 185, label: "GIFT", industryId: 16 },

  //17th
  { id: 186, label: "OFFICE FURNITURE", industryId: 17 },
  { id: 187, label: "CURTAIN", industryId: 17 },
  { id: 189, label: "TREE DECORATION", industryId: 17 },
  { id: 190, label: "OFFICE DECORATION", industryId: 17 },
  { id: 191, label: "OFFICE FURNITURE", industryId: 17 },

  //18th
  { id: 192, label: "LIGHTING SYSTEM", industryId: 18 },
  { id: 193, label: "INDUSTRY LIGTH", industryId: 18 },
  { id: 194, label: "ELECTRICITY INDUSTRY SUPPLIER", industryId: 18 },
  { id: 195, label: "WATER INDUSTRY MATERIAL", industryId: 18 },
  { id: 196, label: "INDUSTRY FAN", industryId: 18 },
  { id: 197, label: "CLEANING TOOL", industryId: 18 },
  { id: 198, label: "REFRIGERATION SYSTEM", industryId: 18 },
  { id: 199, label: "ELECTRIC GENERATOR", industryId: 18 },
  { id: 200, label: "WATER BUMP", industryId: 18 },

  //19TH
  { id: 201, label: "CUSTOMS DECLARATION", industryId: 19 },
  { id: 202, label: "SHIPPING", industryId: 19 },
  { id: 203, label: "DELIVERING", industryId: 19 },
  { id: 204, label: "SHIPPING PLACE RENTAL", industryId: 19 },
  { id: 205, label: "GOODS MANAGEMENT", industryId: 19 },
  { id: 206, label: "WAREHOUSE RENTAL", industryId: 19 },
  { id: 207, label: "COLD WAREHOUSE", industryId: 19 },
  { id: 208, label: "LOADING & UN SERVICE", industryId: 19 },
  { id: 209, label: "CHECK GOOD", industryId: 19 },
  { id: 210, label: "PRODUCT TESTING CENTER", industryId: 19 },
  { id: 211, label: "CONTAINER TRANSACTION", industryId: 19 },
  { id: 212, label: "GOOD INSURANCE", industryId: 19 },


  //20TH
  { id: 212, label: "CHEMISTRY", industryId: 20 },
  
  //21th
  { id: 214, label: "ENVIRONMENT CLEANING SERVICE", industryId: 21 },
  { id: 215, label: "TREE SUPPLIER", industryId: 21 },
  { id: 216, label: "INDUSTRY CLEANING", industryId: 21 },
  { id: 217, label: "ENVIRONMENT SERVICE", industryId: 21 },



  { id: 218, label: "PERSONAL EMERGENCY SERVICE", industryId: 22 },
];

