import { Spinner } from "react-bootstrap"

function Loader() {
    return (
        <Spinner animation="border" role="status" style={{
            width: "100 px",
            height: "100 px",
            margin: "auto",
            display: "block"
        }} ></Spinner>
    )
}

export default Loader
