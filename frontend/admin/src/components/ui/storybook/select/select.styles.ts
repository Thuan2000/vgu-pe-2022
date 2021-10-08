export const selectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: "0.875rem",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 8,
    paddingBottom: 8,
    cursor: "pointer",
    borderBottom: "1px solid #E5E7EB",
    color: !state.isSelected && state.isFocused ? "#fff" : "#6B7280",
    backgroundColor: state.isSelected
      ? "#E5E7EB"
      : state.isFocused
      ? "var(--color-primary-hover)"
      : "#ffffff",
  }),
  control: (_: any, state: any) => ({
    display: "flex",
    alignItems: "center",
    minHeight: 45,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    border: "1px solid #D1D5DB",
    borderColor: state.isFocused ? "var(--color-primary)" : "#D1D5DB",
    boxShadow:
      state.menuIsOpen &&
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "var(--color-primary)" : "#cccccc",
    "&:hover": {
      color: "var(--color-primary)",
    },
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? "var(--color-primary)" : "#cccccc",
    padding: 0,
    cursor: "pointer",

    "&:hover": {
      color: "var(--color-primary)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 5,
    borderColor: "var(--color-primary)",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  valueContainer: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 16,
  }),
  singleValue: (provided: any, _: any) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "#4B5563",
  }),
  multiValue: (provided: any, _: any) => ({
    ...provided,
    backgroundColor: "#FFF",
    border: "1px solid #00d796",
    borderRadius: 9999,
    overflow: "hidden",
    boxShadow:
      "0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  multiValueLabel: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 10,
    fontSize: "0.875rem",
    color: "var(--color-primary)",
  }),
  multiValueRemove: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 8,
    color: "var(--color-primary)",
    cursor: "pointer",

    "&:hover": {
      color: "#F3F4F6",
      transform: "scale(1.2)",
    },
  }),
  placeholder: (provided: any, _: any) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "rgba(107, 114, 128, 0.7)",
  }),
  noOptionsMessage: (provided: any, _: any) => ({
    ...provided,
    fontSize: "0.875rem",
    color: "rgba(107, 114, 128, 0.7)",
  }),
};
