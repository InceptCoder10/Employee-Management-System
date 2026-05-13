import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    // <div className='h-16 bg-amber-800 shadow px-6 flex items-center text-white'>
    //   Navbar
    // </div>
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-lg w-80">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">Gaurav</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          {/* <span>John Doe</span> */}
        </div>  
      </div>
    </header>
  );
};

export default Navbar;
