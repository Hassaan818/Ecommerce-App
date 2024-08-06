/* eslint-disable react/prop-types */
import { Alert } from "react-bootstrap"

function Message({variant, children}) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

Message.defaultPros = {
    variant: 'info'
}

export default Message
