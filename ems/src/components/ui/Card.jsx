const Card = ({children, className}) => {
    return (
        <div className={
            `bg-white 
            p-5 
            rounded-2xl 
            shadow-sm
            hover:shadow-md
            ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;