import React from 'react'
import { NavLink } from 'react-router-dom'
import { sidebarLinks } from '../../utils/navigation'
import { X } from 'lucide-react'

const Sidebar = ({isOpen,toggleSidebar}) => {
  return (
    <>
    {isOpen && 
    <div className='fixed inset-0 bg-black/50 z-40 md:hidden' 
    onClick={toggleSidebar}/>
    }

    <aside className={`fixed inset-y-0 left-0 text-white h-screen w-64 bg-zinc-900 p-6 z-50 shadow-sm transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>

      <div className="flex justify-between items-center mb-10">
          <h1 className='text-2xl font-bold'>EMS</h1>
          
          {/* Close button - Only visible on mobile */}
          <button 
            onClick={toggleSidebar} 
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            <X size={24} />
          </button>
        </div>


      <nav className='flex flex-col gap-2'>
        {sidebarLinks.map((link)=>{
          const Icon = link.icon
          return(
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleSidebar()
                }
              }}
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
    </>
    
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