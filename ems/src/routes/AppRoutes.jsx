import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import EmployeesPage from "../pages/employees/EmployeesPage";
import NotFound from "../pages/NotFound";
import Defaultpage from "../pages/Defaultpage";
import { Attendance } from "../pages/attendance/attendance";
import { DepartmentsPage } from "../pages/departments/DepartmentsPage";
import { Settings } from "../pages/settings/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Defaultpage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/attendance" element={<Attendance />} /> 
        <Route path="/departments" element={<DepartmentsPage />} /> 
        <Route path="/settings" element={<Settings />} /> 
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
