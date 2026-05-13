import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Building2,
  Settings,
} from "lucide-react";

export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Departments",
    path: "/departments",
    icon: Building2,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];