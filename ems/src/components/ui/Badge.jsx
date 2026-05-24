import { useState } from "react";

const Badge = ({ text, status}) => {

  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    default: "bg-gray-100 text-gray-700",
  };

  let newstatus = "default";
  if (status === "Active") newstatus = "active";
  if (status === "On Leave") newstatus = "inactive";

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        whitespace-nowrap
        text-center
        ${styles[newstatus]}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;