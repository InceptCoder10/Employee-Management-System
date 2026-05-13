import React from 'react'
import { NavLink } from 'react-router-dom'
import { sidebarLinks } from '../../utils/navigation'

const Sidebar = () => {
  return (
    <aside className='w-64 min-h-screen bg-zinc-900 text-white p-5'>
      <h1 className='text-2xl font-bold mb-10'>
        EMS
      </h1>
      <nav className='flex flex-col gap-2'>
        {sidebarLinks.map((link)=>{
          const Icon = link.icon
          return(
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                'flex items-center gap-3 py-3 px-4 rounded-md transition-all duration-200 ' +  
                (isActive ? 'bg-amber-800 text-white' : 'text-gray-400 hover:bg-amber-800 hover:text-white')
              }
            >
              <Icon />
              <span>{link.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

{/* <aside>
      <nav>
        <ul>
          {sidebarLinks.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'bg-gray-100 text-amber-800'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-amber-800'
                }
              >
                <Icon />
                <span>{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside> */}