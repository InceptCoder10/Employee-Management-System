const StatCard = ({
  title,
  value,
  icon: Icon,
  growth,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-5
        shadow-sm
        flex
        justify-between
        items-start
      "
    >

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>

        <p className="text-green-500 text-sm mt-2">
          {growth}
        </p>

      </div>

      <div className="bg-gray-100 p-3 rounded-xl">
        <Icon size={24} />
      </div>

    </div>
  );
};

export default StatCard;