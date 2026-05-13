const Badge = ({ text, status = "default" }) => {

  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${styles[status]}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;