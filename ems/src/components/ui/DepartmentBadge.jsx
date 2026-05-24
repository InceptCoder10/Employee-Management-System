import React from "react";
import deptIcons from "../../utils/deptIcons";

const DepartmentBadge = ({ department }) => {
  if (!department) return null;

  const Icon =
    deptIcons[
      department.toLowerCase().replace(/\s/g, "")
    ];

  return (
    <span className="flex items-center gap-2 border border-zinc-300 px-3 py-2 rounded-full justify-center text-xs bg-zinc-50 min-w-30 w-fit text-gray-800 h-full">
      {Icon && <Icon size={14} />}

      {department.length > 12
        ? `${department.substring(0, 12)}...`
        : department}
    </span>
  );
};

export default DepartmentBadge;

// const DepartmentBadge = ({dept}) => {
//   return (
//     <span className="flex items-center gap-2 border border-zinc-300 px-3 py-2 rounded-full justify-center text-xs bg-zinc-50 min-w-30 w-fit text-gray-800 h-full">
//     {(() => {
//         const Icon = deptIcons[emp.department?.toLowerCase()];
//         return Icon ? <Icon size={14} /> : null;
//       })()}
//     {emp.department}
//     </span>
//   )
// }