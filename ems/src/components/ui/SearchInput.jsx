import { Search } from 'lucide-react'
import React from 'react'

const SearchInput = ({value,onChange,placeholder = "Search..."}) => {
  return (
    <>
    <div className='relative max-w-md mb-4'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400'>
            <Search size={22} />   
        </div>
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="lg:w-full w-fit pl-12 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-800 transition duration-300 ease-in-out"
        />
    </div>
    </>
  )
}

export default SearchInput