import "./Button.css"

const Button = ({number, isOperation, onClick}) => {
    return (
        <div className={`${isOperation ? "clear": "button"}`} onClick={onClick}>{number}</div>
    )
};

export default Button;
