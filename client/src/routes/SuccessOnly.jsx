import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const SuccessOnly = props => {
    const isdonated = localStorage.getItem('donated');

    return (
        isdonated ? <Route exact path={props.path} component={props.component} /> : <Redirect to="/"/> 
    )
}

export default SuccessOnly