import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageHeaders from "../../components/ui/PageHeaders";
import StatCard from "../../components/dashboard/StatCard";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { statsData } from "../../utils/dashboardData";

const DashboardPage = () => {
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
    <Card className="lg:flex justify-start  flex-col">

        <div >
          <h2 className="text-xl font-semibold">
            Employee Management
          </h2>

          <p className="text-gray-500 mt-1">
            Add and manage employees
          </p>
        </div>

        <div className="mt-4 flex gap-3 ">
          <Button>
          Add Employee
        </Button>
        <Button>
          Edit Employee
        </Button>
        </div>
      </Card>
  </div>

</div>


    </div>
  );
};

export default DashboardPage;