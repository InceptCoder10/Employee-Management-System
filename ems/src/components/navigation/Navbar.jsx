import { Bell, Menu, Search } from "lucide-react";

const Navbar = ({ toggleSidebar}) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-1">
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-gray-600 hover:text-gray-100 rounded-lg">
          <Menu size={22} />
        </button>
      </div>

      {/* Search bar */}
      <div className="hidden sm:flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg w-full max-w-[320px]">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      <div className="flex items-center gap-5 md:gap-5">
        <button className="relative p-2 text-gray-600 hover:text-gray-100 rounded-lg">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="hidden sm:block">
            <p className="font-medium text-sm md:text-base">Gaurav</p>
            <p className="text-xs md:text-sm text-gray-500">Admin</p>
          </div>
          {/* <span>John Doe</span> */}
        </div>  
      </div>
    </header>
  );
};

export default Navbar;

 // <div className='h-16 bg-amber-800 shadow px-6 flex items-center text-white'>
    //   Navbar
    // </div>

//Toggle Sidebar button
{/* <button onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button> */}