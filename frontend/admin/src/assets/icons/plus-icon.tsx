export const PlusIcon: React.FC<React.SVGAttributes<{}>> = ({
  stroke,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 23 23"
    width="40px"
    height="40px"
    stroke={stroke || "currentColor"}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
