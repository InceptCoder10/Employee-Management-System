const Input = ({ label,
    type = "text", 
    placeholder, 
    value, 
    onChange 
  }) => {
    return (
      <>
        <div className="flex flex-col gap-2">
          {label && (
            <label c lassName="font-medium text-sm text-gray-700">
              {label}
            </label>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border 
            border-gray-300 
            px-4 
            py-2 
            rounded-lg
            outline-none
            focus:ring-2 
            focus:ring-amber-800"
          />
        </div>
    </>
  );
};

export default Input;
