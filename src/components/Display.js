import "./Display.css"

const Display = ({value}) => {
    return (
        <div className="display" mode="single" max={50}> {value} </div>
    )
}

export default Display;