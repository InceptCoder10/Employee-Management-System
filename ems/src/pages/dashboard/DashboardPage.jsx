import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeaders from "../../components/ui/PageHeaders";
import StatCard from "../../components/dashboard/StatCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { statsData } from "../../utils/dashboardData";
import QuickActions from "../../components/dashboard/QuickActions";

import CreateEmployeeModal from "../../components/ui/CreateEmployeeModal";
import { employeeService } from "../../services/employeeService";

import { useState } from "react";

const DashboardPage = () => {

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateEmployee = async (formData) => {
    try {
      await employeeService.createEmployee(formData);
      setIsCreateOpen(false); // Close the modal
      setRefreshKey(oldKey => oldKey + 1); // Trigger table refresh
      alert("Employee created successfully!");
    } catch (error) {
      console.error("Failed to create employee", error);
      alert("Error creating employee. Check the console.");
    }
  };

  return (
    <div>
      <PageHeaders
        title="Dashboard"
        subtitle="Gaurav Yadav"
        description="Welcome to the dashboard"
      />

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        {statsData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            growth={item.growth}
            icon={item.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        <div>
            <QuickActions 
            className={"h-full"}
            onOpenCreate={() => setIsCreateOpen(true)}/>
        </div>
      </div>
      {isCreateOpen && (
        <CreateEmployeeModal 
          onClose={() => setIsCreateOpen(false)} 
          onSave={handleCreateEmployee} 
        />
      )}
    </div>
  );
};

export default DashboardPage;
