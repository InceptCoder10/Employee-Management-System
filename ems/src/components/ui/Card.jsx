const Card = ({children, className}) => {
    return (
        <div className={
            `bg-white 
            p-5 
            rounded-2xl 
            shadow-md
            hover:shadow-lg
            ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;