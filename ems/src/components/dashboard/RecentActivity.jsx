const activities = [
  "Rahul joined the Design Team",
  "Ananya submitted leave request",
  "Payroll updated successfully",
  "New department created",
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">

      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="
              border-b
              pb-3
              last:border-none
            "
          >
            <p className="text-gray-700">
              {activity}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentActivity;