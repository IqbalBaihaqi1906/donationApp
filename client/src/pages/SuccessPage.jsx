import React from 'react'
import { useHistory } from 'react-router-dom'

function SuccessPage() {
    const history = useHistory()

    const donateAgain = () => {
        localStorage.removeItem('donated')
        history.push('/')
    }

    return (
        <div>
            <h1>This is Success page</h1>
            <button onClick={donateAgain}> Donate Again</button>
        </div>
    )
}

export default SuccessPage
