import React from 'react'

const EmployeeTableHeader = ({ employees}) => {
  return (
     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-600" />
          <h2 className="text-sm font-medium text-gray-900">Employees</h2>
          <span className="text-xs text-gray-400">{employees.length} total</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Search...
        </div>
      </div>
    </div>
  )
}

export default EmployeeTableHeader
