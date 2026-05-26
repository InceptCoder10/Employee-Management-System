import React from "react";
import deptIcons from "../../utils/deptIcons";

const DepartmentBadge = ({ department }) => {
  if (!department) return null;

  const deptString = typeof department === 'string' ? department : String

  const Icon =
    deptIcons[
      department.toLowerCase().replace(/\s/g, "")
    ];

  return (
    <span className="inline-flex items-center gap-1.5 border border-zinc-300 px-2.5 py-1 rounded-lg justify-center font-medium text-xs bg-zinc-50 min-w-30 w-fit text-gray-800">
      {Icon && <Icon size={14} className='text-gray-500 shrink-0'/>}

      <span className="truncate max-w-27.5">
        {deptString}
      </span>
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