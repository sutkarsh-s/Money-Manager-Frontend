import { memo } from "react";

const Skeleton = ({ className = "", ...rest }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    aria-hidden
    {...rest}
  />
);

export default memo(Skeleton);
