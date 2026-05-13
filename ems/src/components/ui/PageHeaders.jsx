import React from 'react'

const PageHeaders = ({title,subtitle,description}) => {
  return (
    <div className='mb-6'>
      <h1 className='text-3xl font-bold text-gray-800'>
        {title}
      </h1>
      {subtitle && 
      <h2 className='text-gray-700 font-medium text-lg mt-2'>
        {subtitle}
      </h2>}

      {description && 
      <p className='text-gray-650 text-sm mt-1'>
        {description}
      </p>}
    </div>
  )
}

export default PageHeaders;
