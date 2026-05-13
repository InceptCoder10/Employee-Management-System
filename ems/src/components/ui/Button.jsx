const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) => {
  const baseStyle = "py-2 px-4 rounded-lg transition-all duration-200";

  const variants = {
    primary: "bg-amber-800 text-white hover:bg-amber-900",
    secondary: "bg-gray-100 text-amber-800 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={baseStyle + " " + variants[variant] + " " + className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

// if (variant === 'primary') {
//         return (
//             <button
//                 type={type}
//                 onClick={onClick}
//                 className={baseStyle + ' ' + className}
//             >
//                 {children}
//             </button>
//         );
//     }

// const Button = ({children}) => {
//     return (
//         <button className="bg-amber-800 text-white py-2 px-4 rounded-md">{children}</button>
//     )
// }
