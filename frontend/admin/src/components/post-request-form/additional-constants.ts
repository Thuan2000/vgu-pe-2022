export const baseOpts = {
  allowNegative: false,
};

export const ALLOWED_COMPANY_QUESTIONS = [
  {
    label: "supplierExperience-label",
    value: "minSupplierExperience",
    valueOptions: {
      placeholder: "supplierExperience-label",
      suffix: "experience-suffix-years",
      max: 40,
      ...baseOpts,
    },
  },
  {
    label: "rating-label",
    value: "minSupplierRating",
    valueOptions: {
      placeholder: "rating-label",
      max: 5,
      suffix: "rating-suffix",
      ...baseOpts,
    },
  },

  {
    label: "minSuplierSells-label",
    value: "minSuplierSells",
    valueOptions: {
      ...baseOpts,
      max: 100000,
      suffix: "sells-suffix",
    },
  },
];
