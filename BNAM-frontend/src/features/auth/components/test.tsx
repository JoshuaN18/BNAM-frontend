import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Test = () => {
    const {authenticated, setAuthenticated} = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogin = () => {
        setAuthenticated(true)
        console.log(authenticated)
        navigate('/budget')
    }
    return (
        <div>
            <button onClick={() => handleLogin()}>Authenticated</button>
        </div>
    )
}

export default Test