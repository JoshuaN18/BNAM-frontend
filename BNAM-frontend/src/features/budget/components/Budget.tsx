import { AuthContext } from "../../auth/context/AuthContext";
import React, { useContext } from 'react';

function Budget() {
    const { logoutUser } = useContext(AuthContext)
    return <>
    <h1>Budget View</h1>
    <button onClick={logoutUser}>Logout</button>
    </>
}

export default Budget;