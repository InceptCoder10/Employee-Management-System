import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import  Sidebar  from '../components/navigation/Sidebar'
import  Navbar  from '../components/navigation/Navbar'

export const MainLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='flex h-screen w-screen bg-gray-100 overflow-hidden'>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
        <div className='flex flex-col flex-1 overflow-hidden'>
            <Navbar toggleSidebar={toggleSidebar}/>
            
            {/* flex-1 lets it fill remaining height, overflow-y-auto makes it scroll */}
            <main className='flex-1 overflow-y-auto p-6'>
                <Outlet />
            </main>
        </div>
        
    </div>
  )
}

export default MainLayout