import React from 'react'

const FilterBar = ({selectedStatus, onStatusChange}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mb-4">
    <div className='w-full sm:w-48'>
        <select
        value={selectedStatus}
        onChange={onStatusChange}
        className='w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-800 transition duration-300 ease-in-out cursor-pointer'>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="On Leave">On Leave</option>
        <option value="Pending">Pending</option>
        </select>
    </div>

    </div>
  )
}

export default FilterBar