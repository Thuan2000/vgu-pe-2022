export const MinusIcon: React.FC<React.SVGAttributes<{}>> = ({
  fill,
  ...props
}) => (
  <svg width="12" height="2" viewBox="0 0 12 2" fill="none" {...props}>
    <path
      d="M5.25 0.25H6.75H11.25C11.6642 0.25 12 0.585787 12 1C12 1.41421 11.6642 1.75 11.25 1.75H6.75L5.25 1.75L0.75 1.75C0.335786 1.75 0 1.41421 0 1C0 0.585787 0.335786 0.25 0.75 0.25H5.25Z"
      fill={fill || "#A3ADB4"}
    />
  </svg>
);
