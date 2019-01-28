import React from 'react'

const ShowCode = (props) => {

    return (
        <pre>
            {props.children}
        </pre>
    )
}

export default ShowCode